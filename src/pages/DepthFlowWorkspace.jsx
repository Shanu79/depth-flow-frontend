import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Upload, Download, Share2, Orbit, ZoomIn, ArrowRight, 
  MoveHorizontal, MoveVertical, Circle, ChevronDown, Settings, 
  Loader2, AlertCircle, Clock, Trash2, X, Sparkles, RefreshCw
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

// Ensure these point to your actual config and store
import { API_BASE_URL } from '../config.js';
import useAuthStore from '../stores/authStore.js';

const GENERATION_COST = 20;

// ==========================================
// --- HELPER COMPONENTS ---
// ==========================================

const SliderControl = ({ label, value, min, max, step, onChange, unit = "" }) => (
  <div className="flex items-center gap-4">
    <span className="text-xs text-gray-300 w-24 shrink-0 truncate">{label}</span>
    <input 
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 min-w-0" 
    />
    <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded border border-white/5 min-w-[36px] text-center shrink-0">
      {value}{unit}
    </span>
  </div>
);

const SelectControl = ({ label, value, options, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-300 truncate pr-2">{label}</span>
    <div className="relative w-32 shrink-0">
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 text-xs rounded-lg px-3 py-1.5 appearance-none text-gray-200 outline-none focus:border-purple-500/50 truncate pr-8"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value} className="bg-gray-900">{opt.label}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-2 top-2 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

const MotionButton = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-center gap-1.5 px-1 py-2 rounded-lg text-[11px] font-medium border transition-colors min-w-0
    ${active 
      ? 'bg-purple-600/30 border-purple-500 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.2)]' 
      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'}`}
  >
    <div className="shrink-0">{icon}</div>
    <span className="truncate">{label}</span>
  </button>
);

const CreditAlertModal = ({ isOpen, onClose, currentCredits }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0f0c29] border border-purple-500/30 rounded-2xl max-w-md w-full p-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-2">
            <AlertCircle className="w-6 h-6" />
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Insufficient Credits</h3>
        <p className="text-gray-400 mb-6 text-sm">Requires <span className="text-white font-bold">{GENERATION_COST} credits</span>, but you have <span className="text-red-400 font-bold">{currentCredits}</span>.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-300 font-medium hover:bg-white/5">Cancel</button>
          <button onClick={() => navigate('/pricing')} className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">Upgrade Plan</button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// --- MAIN WORKSPACE ---
// ==========================================

const DepthFlowWorkspace = () => {
  // UI State
  const [activeMode, setActiveMode] = useState('basic'); // 'basic' or 'advanced'
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("df_resultVideoUrl") ? "result" : "input");
  const [showCreditModal, setShowCreditModal] = useState(false);

  // Core Engine States
  const [motion, setMotion] = useState({ style: "dolly", amplitude: 1.5, speed: 1.0, focus: 0.5, phase: 0.0, reverse: false, smooth: true, loop: true });
  const [render, setRender] = useState({ duration: 8, fps: 30, quality: 80, ssaa: 1.0, edge_fix: 5, invert_depth: 0.0, tiling_mode: "mirror" });
  const [effects, setEffects] = useState({
    dof: { enable: true, intensity: 1.0, start: 0.6, end: 1.0 },
    color: { enable: false, saturation: 110, contrast: 100, brightness: 100, sepia: 0 },
    vignette: { enable: true, intensity: 0.4, decay: 20.0 }
  });

  // File & API States
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(() => localStorage.getItem("df_previewUrl") || null);
  const [resultVideoUrl, setResultVideoUrl] = useState(() => localStorage.getItem("df_resultVideoUrl") || null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { user, updateCredits } = useAuthStore();
  const credits = user?.credits || 0;
  const fileInputRef = useRef(null);

  // Fetch History
  const fetchHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(`${API_BASE_URL}/ai/history`, { headers: { "Authorization": `Bearer ${token}` } });
      if (res.ok) setHistory(await res.json());
    } catch (error) { console.error("Failed to load history", error); }
  }, []);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  // Progress Bar effect
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => { setProgress(prev => prev < 30 ? prev + 2 : prev < 80 ? prev + 0.5 : prev < 95 ? prev + 0.1 : prev); }, 100);
    } else setProgress(0);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultVideoUrl(null); localStorage.removeItem("df_resultVideoUrl"); setActiveTab("input");
      const reader = new FileReader();
      reader.onload = () => { try { localStorage.setItem("df_previewUrl", reader.result); } catch (e) {} };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile && !previewUrl) return alert("Please upload an image first!");
    if (credits !== null && credits < GENERATION_COST) { setShowCreditModal(true); return; }

    setIsLoading(true); setProgress(0);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in first.");

      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      } else {
        // Fallback if testing with cached image
        const res = await fetch(previewUrl);
        const blob = await res.blob();
        formData.append("file", blob, "cached_image.jpg");
      }

      const engine_payload = { render, motion, effects };
      formData.append("payload", JSON.stringify(engine_payload)); 

      const response = await fetch(`${API_BASE_URL}/ai/depthflow/generate-3d`, {
        method: "POST", headers: { "Authorization": `Bearer ${token}` }, body: formData,
      });

      if (response.status === 402) { setShowCreditModal(true); return; }
      if (!response.ok) throw new Error("Generation failed.");

      const remainingCredits = response.headers.get("X-Remaining-Credits");
      const savedVideoUrl = response.headers.get("X-Video-URL");
      const blob = await response.blob();
      const localVideoUrl = URL.createObjectURL(blob);
      
      setProgress(100); setResultVideoUrl(localVideoUrl);
      localStorage.setItem("df_resultVideoUrl", savedVideoUrl || localVideoUrl);
      
      if (remainingCredits) updateCredits(parseInt(remainingCredits, 10));
      setActiveTab("result"); fetchHistory();

    } catch (error) { 
      console.error("Error:", error); alert(error.message);
    } finally { 
      setTimeout(() => { setIsLoading(false); setProgress(0); }, 500); 
    }
  };

  const handleDownload = async (url) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a'); link.href = blobUrl; link.setAttribute('download', "depthify_3d.mp4");
      document.body.appendChild(link); link.click(); document.body.removeChild(link); window.URL.revokeObjectURL(blobUrl);
    } catch (e) { window.open(url, '_blank'); }
  };

  return (
    <div className="min-h-screen bg-[#070514] text-white font-sans overflow-hidden relative flex flex-col">
      <CreditAlertModal isOpen={showCreditModal} onClose={() => setShowCreditModal(false)} currentCredits={credits} />

      {/* Background Glows (Matching Design) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div 
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(transparent 95%, #a855f7 100%), linear-gradient(90deg, transparent 95%, #a855f7 100%)',
          backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'bottom'
        }}
      ></div>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-[1600px] w-full mx-auto px-6 py-24 flex flex-col flex-1 h-[calc(100vh-80px)]">
        <h1 className="text-2xl font-bold mb-6">Create 3D Image</h1>

        <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
          
          {/* ================= LEFT SIDEBAR (Controls) ================= */}
          <aside className="w-full md:w-[340px] flex flex-col shrink-0">
            {/* Added overflow-x-hidden here to strictly prevent horizontal scrolling */}
            <div className="bg-[#0f0c29]/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-5 flex-1 shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col overflow-x-hidden overflow-y-auto custom-scrollbar">
              
              {/* Basic / Advanced Toggle */}
              <div className="flex p-1 bg-black/40 rounded-full mb-6 border border-white/5 shrink-0">
                <button 
                  onClick={() => setActiveMode('basic')}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all truncate ${activeMode === 'basic' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Basic Mode
                </button>
                <button 
                  onClick={() => setActiveMode('advanced')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium transition-all truncate ${activeMode === 'advanced' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <span className="truncate">Advanced Mode</span> <Settings size={14} className="shrink-0" />
                </button>
              </div>

              {/* Dynamic Controls based on Active Mode */}
              <div className="flex-1 overflow-x-hidden overflow-y-auto pr-2 custom-scrollbar">
                {activeMode === 'basic' ? (
                  // BASIC MODE (Matches Image 1)
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h3 className="text-sm font-semibold mb-4 flex justify-between text-white">Render <ChevronDown size={16}/></h3>
                      <div className="space-y-4">
                        <SliderControl label="Depth Intensity" value={motion.amplitude} min={0} max={5} step={0.1} onChange={(v) => setMotion({...motion, amplitude: v})} />
                        <SliderControl label="Motion Speed" value={motion.speed} min={0.1} max={3} step={0.1} onChange={(v) => setMotion({...motion, speed: v})} unit="x" />
                        <SliderControl label="Video Length" value={render.duration} min={1} max={15} step={1} onChange={(v) => setRender({...render, duration: v})} unit="s" />
                      </div>
                    </div>

                    <div className="h-px bg-white/10 my-6"></div>

                    <div>
                      <h3 className="text-sm font-semibold mb-4 flex justify-between text-white">Camera Motion <ChevronDown size={16}/></h3>
                      <div className="grid grid-cols-3 gap-1.5">
                        <MotionButton icon={<ArrowRight size={14}/>} label="Dolly" active={motion.style === 'dolly'} onClick={() => setMotion({...motion, style: 'dolly'})} />
                        <MotionButton icon={<Orbit size={14}/>} label="Orbit" active={motion.style === 'orbit'} onClick={() => setMotion({...motion, style: 'orbit'})} />
                        <MotionButton icon={<ZoomIn size={14}/>} label="Zoom" active={motion.style === 'zoom'} onClick={() => setMotion({...motion, style: 'zoom'})} />
                        <MotionButton icon={<MoveHorizontal size={14}/>} label="Horizontal" active={motion.style === 'horizontal'} onClick={() => setMotion({...motion, style: 'horizontal'})} />
                        <MotionButton icon={<MoveVertical size={14}/>} label="Vertical" active={motion.style === 'vertical'} onClick={() => setMotion({...motion, style: 'vertical'})} />
                        <MotionButton icon={<Circle size={14}/>} label="Circle" active={motion.style === 'circle'} onClick={() => setMotion({...motion, style: 'circle'})} />
                      </div>
                    </div>
                  </div>
                ) : (
                  // ADVANCED MODE (Matches Image 2)
                  <div className="space-y-6 animate-in fade-in">
                     <div>
                      <h3 className="text-sm font-semibold mb-4 flex justify-between text-white">Render <ChevronDown size={16}/></h3>
                      <div className="space-y-4">
                        <SliderControl label="Duration" value={render.duration} min={1} max={15} step={1} onChange={(v) => setRender({...render, duration: v})} unit="s" />
                        <SelectControl label="SSAA" value={render.ssaa} options={[{label: '1.0x', value: 1.0}, {label: '2.0x', value: 2.0}, {label: '4.0x', value: 4.0}]} onChange={(v) => setRender({...render, ssaa: parseFloat(v)})} />
                        <SelectControl label="FPS" value={render.fps} options={[{label: '24p', value: 24}, {label: '30p', value: 30}, {label: '60p', value: 60}]} onChange={(v) => setRender({...render, fps: parseInt(v)})} />
                      </div>
                    </div>

                    <div className="h-px bg-white/10 my-4"></div>

                    <div>
                      <h3 className="text-sm font-semibold mb-4 flex justify-between text-white">Camera & Motions <ChevronDown size={16}/></h3>
                      <div className="space-y-4">
                        <SelectControl label="Style" value={motion.style} options={[{label: 'Dolly', value: 'dolly'}, {label: 'Orbit', value: 'orbit'}, {label: 'Zoom', value: 'zoom'}]} onChange={(v) => setMotion({...motion, style: v})} />
                        <div className="flex gap-2">
                          <button onClick={() => setMotion({...motion, reverse: !motion.reverse})} className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-colors truncate ${motion.reverse ? 'bg-purple-600/80 border border-purple-500 text-white' : 'bg-white/5 border border-white/10 text-gray-300'}`}>Reverse</button>
                          <button onClick={() => setMotion({...motion, smooth: !motion.smooth})} className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-colors truncate ${motion.smooth ? 'bg-purple-600/80 border border-purple-500 text-white' : 'bg-white/5 border border-white/10 text-gray-300'}`}>Smooth</button>
                          <button onClick={() => setMotion({...motion, loop: !motion.loop})} className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-colors truncate ${motion.loop ? 'bg-purple-600/80 border border-purple-500 text-white' : 'bg-white/5 border border-white/10 text-gray-300'}`}>Loop</button>
                        </div>
                        <SelectControl label="Speed" value={motion.speed} options={[{label: '0.5x', value: 0.5}, {label: '1.0x', value: 1.0}, {label: '2.0x', value: 2.0}]} onChange={(v) => setMotion({...motion, speed: parseFloat(v)})} />
                        <SliderControl label="Focus" value={motion.focus} min={0} max={1} step={0.05} onChange={(v) => setMotion({...motion, focus: v})} />
                      </div>
                    </div>

                    <div className="h-px bg-white/10 my-4"></div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-white truncate">Cinematic Effects</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-gray-400">{effects.dof.enable ? 'ON' : 'OFF'}</span>
                          <button 
                            onClick={() => setEffects({...effects, dof: {...effects.dof, enable: !effects.dof.enable}})}
                            className={`w-8 h-4 rounded-full transition-colors relative ${effects.dof.enable ? 'bg-purple-500' : 'bg-gray-600'}`}
                          >
                            <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${effects.dof.enable ? 'left-4.5 translate-x-[14px]' : 'left-0.5'}`}></div>
                          </button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <SliderControl label="Intensity" value={effects.dof.intensity} min={0} max={2} step={0.1} onChange={(v) => setEffects({...effects, dof: {...effects.dof, intensity: v}})} />
                        <SelectControl label="Bokeh Quality" value={render.quality} options={[{label: 'High (100)', value: 100}, {label: 'Medium (80)', value: 80}, {label: 'Low (50)', value: 50}]} onChange={(v) => setRender({...render, quality: parseInt(v)})} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <div className="pt-4 shrink-0">
                <button 
                  onClick={handleGenerate} 
                  disabled={isLoading || (!selectedFile && !previewUrl)}
                  className={`w-full py-3 rounded-xl font-semibold shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all flex items-center justify-center gap-2
                    ${isLoading || (!selectedFile && !previewUrl) ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/10' : 'bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white'}`}
                >
                  {isLoading ? <><Loader2 className="animate-spin w-4 h-4" /> Generating {Math.round(progress)}%...</> : 'Generate 3D Image'}
                </button>
              </div>
            </div>
          </aside>

          {/* ================= RIGHT MAIN AREA ================= */}
          <section className="flex-1 flex flex-col min-w-0">
            <div className="bg-[#0f0c29]/60 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)] rounded-2xl p-6 flex flex-col flex-1">
              
              {/* Input / Result Tabs */}
              <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => setActiveTab('input')}
                  className={`px-6 py-2 rounded-t-lg text-sm font-medium transition-colors ${activeTab === 'input' ? 'bg-purple-600/20 text-purple-300 border-t border-l border-r border-purple-500/30' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Input
                </button>
                <button 
                  onClick={() => resultVideoUrl && setActiveTab('result')}
                  disabled={!resultVideoUrl}
                  className={`px-6 py-2 rounded-t-lg text-sm font-medium transition-colors ${activeTab === 'result' ? 'bg-purple-600/20 text-purple-300 border-t border-l border-r border-purple-500/30' : 'text-gray-400'} ${!resultVideoUrl ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-200'}`}
                >
                  Result
                </button>
              </div>

              {/* Upload Area / Viewer - Fully Absolutely Positioned to maintain perfect static outer bounds */}
              <div className="flex-1 w-full min-h-[350px] border-2 border-dashed border-purple-500/30 rounded-xl bg-black/20 relative overflow-hidden group hover:border-purple-400/50 transition-colors">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/webp" />
                
                {isLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-black/40 backdrop-blur-sm">
                    <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                    <span className="text-purple-300 font-mono text-sm uppercase tracking-widest">Raymarching Shaders...</span>
                  </div>
                ) : activeTab === 'result' && resultVideoUrl ? (
                  <video src={resultVideoUrl} controls autoPlay loop className="absolute inset-0 w-full h-full object-contain p-2 z-10" />
                ) : previewUrl ? (
                  <>
                    <img src={previewUrl} className="absolute inset-0 w-full h-full object-contain p-2 z-10" alt="Preview" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setPreviewUrl(null); setSelectedFile(null); }} 
                      className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-500 text-white rounded-lg backdrop-blur-md transition-colors z-20"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>
                    <div className="w-16 h-16 rounded-full border border-purple-500/30 flex items-center justify-center mb-4 bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                      <Upload size={28} className="text-purple-300" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-white">Click to Upload Image</h2>
                    <div className="flex items-center gap-4 text-purple-400/70 mb-4 w-full max-w-xs">
                      <div className="h-px flex-1 bg-purple-500/30 border-dashed border-t border-purple-500/30"></div>
                      <span className="text-sm shrink-0">or Drag & Drop</span>
                      <div className="h-px flex-1 bg-purple-500/30 border-dashed border-t border-purple-500/30"></div>
                    </div>
                    <p className="text-xs text-gray-400 bg-white/5 px-4 py-1.5 rounded-full">Supports: JPG, PNG, WebP (Max 20MB)</p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex gap-4 mt-6">
                <button 
                  onClick={() => handleDownload(resultVideoUrl)} 
                  disabled={!resultVideoUrl}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${!resultVideoUrl ? 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'}`}
                >
                  <Download size={18} /> Download
                </button>
                <button className="px-6 flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-xl text-sm font-medium transition-colors">
                  <Share2 size={16} /> Share
                </button>
              </div>

              {/* History Row */}
              {history.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                    {history.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => { setResultVideoUrl(item.video_url); setActiveTab('result'); }} 
                        className="w-24 h-16 bg-black rounded-lg overflow-hidden cursor-pointer border border-white/10 hover:border-purple-500 shrink-0 relative group"
                      >
                         <video src={item.video_url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" muted loop onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </section>

        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.3); border-radius: 4px; }
      `}} />
    </div>
  );
};

export default DepthFlowWorkspace;