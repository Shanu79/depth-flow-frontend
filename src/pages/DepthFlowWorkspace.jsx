import {
  Upload, X, Download, Share2, Loader2, MoveDiagonal2, AlertCircle, Clock, Trash2, Sparkles, RefreshCw, Play,
  Settings2, Film, Wand2, ChevronDown, ChevronRight
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config.js';
import useAuthStore from '../stores/authStore.js';

const GENERATION_COST = 20;

// --- Helper UI Components ---
const SectionHeader = ({ title, icon: Icon, isOpen, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 transition-colors border-b border-slate-700/50">
    <div className="flex items-center gap-2 text-slate-200 font-semibold"><Icon className="w-4 h-4 text-pink-400" />{title}</div>
    {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
  </button>
);

const ControlSlider = ({ label, value, min, max, step, onChange, unit = "" }) => (
  <div className="space-y-2 mb-4">
    <div className="flex justify-between text-xs font-medium"><span className="text-slate-400">{label}</span><span className="text-slate-200">{value}{unit}</span></div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500" />
  </div>
);

const ControlToggle = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between mb-4">
    <span className="text-xs font-medium text-slate-400">{label}</span>
    <button onClick={() => onChange(!checked)} className={`w-8 h-4 rounded-full transition-colors relative ${checked ? 'bg-pink-500' : 'bg-slate-700'}`}>
      <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  </div>
);

// --- Credit Modal & Timer ---
const CreditAlertModal = ({ isOpen, onClose, currentCredits }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex justify-between items-start mb-4"><div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-2"><AlertCircle className="w-6 h-6" /></div><button onClick={onClose} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button></div>
        <h3 className="text-xl font-bold text-white mb-2">Insufficient Credits</h3>
        <p className="text-slate-400 mb-6">Requires <span className="text-white font-bold">{GENERATION_COST} credits</span>, but you have <span className="text-red-400 font-bold">{currentCredits}</span>.</p>
        <div className="flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800">Cancel</button><button onClick={() => navigate('/pricing')} className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold">Upgrade Plan</button></div>
      </div>
    </div>
  );
};

const ExpiryTimer = ({ seconds, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => { setTimeLeft(seconds); }, [seconds]);
  useEffect(() => {
    if (timeLeft <= 0) { if (onExpire) onExpire(); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);
  if (timeLeft <= 0) return <span className="text-red-500 text-xs font-bold">Expired</span>;
  return <div className="flex items-center gap-1 text-xs text-orange-400 font-mono bg-orange-500/10 px-2 py-1 rounded"><Clock className="w-3 h-3" />{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</div>;
};

// --- MAIN WORKSPACE ---
const DepthFlowWorkspace = () => {
  const [sidebarWidth, setSidebarWidth] = useState(450);
  const [isResizing, setIsResizing] = useState(false);
  const [previewHeight, setPreviewHeight] = useState(null);
  const [isVerticalResizing, setIsVerticalResizing] = useState(false);
  
  // Accordion State
  const [openSection, setOpenSection] = useState('motion');

  // --- ADVANCED STATE DICTIONARIES ---
  const [motion, setMotion] = useState({ style: "dolly", amplitude: 1.5, speed: 1.0, focus: 0.5, phase: 0.0, reverse: false, smooth: true, loop: true });
  const [render, setRender] = useState({ duration: 5, fps: 30, quality: 80, ssaa: 1.0, edge_fix: 5, invert_depth: 0.0, tiling_mode: "mirror" });
  const [effects, setEffects] = useState({
    dof_enable: false, dof_intensity: 1.0, dof_start: 0.6, dof_end: 1.0,
    vignette_enable: true, vignette_intensity: 0.4, vignette_decay: 20.0,
    color_enable: false, color_saturation: 110, color_contrast: 100, color_brightness: 100, color_sepia: 0
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(() => localStorage.getItem("df_previewUrl") || null);
  const [resultVideoUrl, setResultVideoUrl] = useState(() => localStorage.getItem("df_resultVideoUrl") || null);

  const [history, setHistory] = useState([]);
  const [failedLoadIds, setFailedLoadIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("df_resultVideoUrl") ? "output" : "input");
  const [showCreditModal, setShowCreditModal] = useState(false);

  const { user, updateCredits } = useAuthStore();
  const credits = user?.credits || 0;
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);

  const fetchHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(`${API_BASE_URL}/ai/history`, { headers: { "Authorization": `Bearer ${token}` } });
      if (res.ok) setHistory(await res.json());
    } catch (error) { console.error("Failed to load history", error); }
  }, []);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => { setProgress(prev => prev < 30 ? prev + 2 : prev < 80 ? prev + 0.5 : prev < 95 ? prev + 0.1 : prev); }, 100);
    } else setProgress(0);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultVideoUrl(null); localStorage.removeItem("df_resultVideoUrl"); setActiveTab("input"); setPreviewHeight(null);
      const reader = new FileReader();
      reader.onload = () => { try { localStorage.setItem("df_previewUrl", reader.result); } catch (e) {} };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); setPreviewUrl(null); setSelectedFile(null); setResultVideoUrl(null);
    localStorage.removeItem("df_previewUrl"); localStorage.removeItem("df_resultVideoUrl");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!selectedFile) return alert("Please upload an image first!");
    if (credits !== null && credits < GENERATION_COST) { setShowCreditModal(true); return; }

    setIsLoading(true); setProgress(0);

    try {
      const token = localStorage.getItem("token");
      
      // We package the entire complex state into a single JSON payload
      const payload = { render, motion, effects };
      
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("payload", JSON.stringify(payload)); // Send exact specs

      const response = await fetch(`${API_BASE_URL}/ai/depthflow/generate-3d`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
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
      setActiveTab("output"); fetchHistory();

    } catch (error) { console.error("Error:", error); alert(error.message);
    } finally { setTimeout(() => { setIsLoading(false); setProgress(0); }, 500); }
  };

  const handleDownload = async (url) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const blobUrl = window.URL.createObjectURL(await response.blob());
      const link = document.createElement('a'); link.href = blobUrl; link.setAttribute('download', "depthflow_pro.mp4");
      document.body.appendChild(link); link.click(); document.body.removeChild(link); window.URL.revokeObjectURL(blobUrl);
    } catch (e) { window.open(url, '_blank'); }
  };

  // Resizing logic
  const resize = useCallback((e) => { if (isResizing && e.clientX > 320 && e.clientX < 800) setSidebarWidth(e.clientX); }, [isResizing]);
  const resizeVertical = useCallback((e) => { if (isVerticalResizing && previewRef.current) { const h = e.clientY - previewRef.current.getBoundingClientRect().top; if (h > 300 && h < 1200) setPreviewHeight(h); } }, [isVerticalResizing]);
  useEffect(() => {
    if (isResizing) { window.addEventListener("mousemove", resize); window.addEventListener("mouseup", () => setIsResizing(false)); }
    if (isVerticalResizing) { window.addEventListener("mousemove", resizeVertical); window.addEventListener("mouseup", () => setIsVerticalResizing(false)); }
  }, [isResizing, isVerticalResizing, resize, resizeVertical]);

  return (
    <div className="min-h-screen bg-[#050511] flex flex-col md:flex-row overflow-hidden relative">
      <CreditAlertModal isOpen={showCreditModal} onClose={() => setShowCreditModal(false)} currentCredits={credits} />

      {/* LEFT PANEL */}
      <div className="relative flex-shrink-0 flex flex-col pt-24 px-6 space-y-4 overflow-y-auto scrollbar-hide border-r border-slate-800 bg-[#050511] z-10 w-full md:w-[var(--sidebar-width)] transition-[width]" style={{ '--sidebar-width': `${sidebarWidth}px` }}>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Pro Workspace</h1>

        {/* Upload Box */}
        <div onClick={() => fileInputRef.current.click()} className="relative border-2 border-dashed border-pink-500/50 bg-pink-600/5 backdrop-blur-sm rounded-xl h-40 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-pink-600/10 transition-all overflow-hidden shrink-0">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg" />
          {previewUrl ? (
            <div className="relative h-full w-full flex items-center justify-center p-2">
              <img src={previewUrl} alt="Preview" className="h-full object-contain rounded-lg shadow-2xl" />
              <button onClick={handleRemoveImage} className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-red-500 text-white rounded-md transition-colors"><X size={14} /></button>
            </div>
          ) : (
            <><Upload className="text-pink-400 w-8 h-8 mb-2" /><p className="text-white font-medium text-sm">Upload High-Res Image</p><p className="text-slate-500 text-xs mt-1">Modal Cloud Rendering Engine</p></>
          )}
        </div>

        {/* --- SETTINGS ACCORDION --- */}
        <div className="flex-1 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/50 shadow-inner scrollbar-hide">
          
          {/* 1. MOTION SETTINGS */}
          <SectionHeader title="Camera Motion" icon={Settings2} isOpen={openSection === 'motion'} onClick={() => setOpenSection(openSection === 'motion' ? '' : 'motion')} />
          {openSection === 'motion' && (
            <div className="p-4 bg-slate-900/80 space-y-4 animate-in slide-in-from-top-2">
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-400">Trajectory Style</span>
                <div className="grid grid-cols-3 gap-2">
                  {["dolly", "orbit", "zoom", "horizontal", "vertical", "circle"].map((s) => (
                    <button key={s} onClick={() => setMotion({...motion, style: s})} className={`py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${motion.style === s ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>{s}</button>
                  ))}
                </div>
              </div>
              <ControlSlider label="Amplitude (Intensity)" value={motion.amplitude} min={0} max={5} step={0.1} onChange={(v) => setMotion({...motion, amplitude: v})} />
              <ControlSlider label="Speed Multiplier" value={motion.speed} min={0.1} max={3} step={0.1} onChange={(v) => setMotion({...motion, speed: v})} unit="x" />
              <ControlSlider label="Focal Point Depth" value={motion.focus} min={0} max={1} step={0.05} onChange={(v) => setMotion({...motion, focus: v})} />
              <div className="flex gap-4 pt-2 border-t border-slate-800">
                <div className="flex-1"><ControlToggle label="Reverse" checked={motion.reverse} onChange={(v) => setMotion({...motion, reverse: v})} /></div>
                <div className="flex-1"><ControlToggle label="Smooth" checked={motion.smooth} onChange={(v) => setMotion({...motion, smooth: v})} /></div>
              </div>
            </div>
          )}

          {/* 2. RENDER SETTINGS */}
          <SectionHeader title="Render Pipeline" icon={Film} isOpen={openSection === 'render'} onClick={() => setOpenSection(openSection === 'render' ? '' : 'render')} />
          {openSection === 'render' && (
            <div className="p-4 bg-slate-900/80 space-y-4 animate-in slide-in-from-top-2">
              <ControlSlider label="Duration" value={render.duration} min={1} max={20} step={1} onChange={(v) => setRender({...render, duration: v})} unit="s" />
              <ControlSlider label="Framerate" value={render.fps} min={12} max={60} step={1} onChange={(v) => setRender({...render, fps: v})} unit=" fps" />
              <ControlSlider label="Shader Quality" value={render.quality} min={10} max={100} step={5} onChange={(v) => setRender({...render, quality: v})} unit="%" />
              <ControlSlider label="Super Sampling (SSAA)" value={render.ssaa} min={0.5} max={4} step={0.5} onChange={(v) => setRender({...render, ssaa: v})} unit="x" />
              <ControlSlider label="Edge Dilation (Tearing Fix)" value={render.edge_fix} min={0} max={20} step={1} onChange={(v) => setRender({...render, edge_fix: v})} unit="px" />
              
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-400">Tiling Strategy</span>
                <select value={render.tiling_mode} onChange={(e) => setRender({...render, tiling_mode: e.target.value})} className="w-full bg-slate-800 text-xs text-slate-200 rounded-md p-2 outline-none border border-slate-700">
                  <option value="mirror">Mirror (Best for Landscapes)</option>
                  <option value="repeat">Repeat</option>
                  <option value="none">Clamp to Edge</option>
                </select>
              </div>
            </div>
          )}

          {/* 3. POST-PROCESSING (EFFECTS) */}
          <SectionHeader title="Post-Processing" icon={Wand2} isOpen={openSection === 'effects'} onClick={() => setOpenSection(openSection === 'effects' ? '' : 'effects')} />
          {openSection === 'effects' && (
            <div className="p-4 bg-slate-900/80 space-y-6 animate-in slide-in-from-top-2">
              
              {/* DOF */}
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-800/80">
                <ControlToggle label="Cinematic Depth of Field" checked={effects.dof_enable} onChange={(v) => setEffects({...effects, dof_enable: v})} />
                {effects.dof_enable && (
                  <>
                    <ControlSlider label="Blur Intensity" value={effects.dof_intensity} min={0} max={2} step={0.1} onChange={(v) => setEffects({...effects, dof_intensity: v})} />
                    <ControlSlider label="Focal Start" value={effects.dof_start} min={0} max={1} step={0.05} onChange={(v) => setEffects({...effects, dof_start: v})} />
                  </>
                )}
              </div>

              {/* Color Grading */}
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-800/80">
                <ControlToggle label="Color Grading" checked={effects.color_enable} onChange={(v) => setEffects({...effects, color_enable: v})} />
                {effects.color_enable && (
                  <>
                    <ControlSlider label="Saturation" value={effects.color_saturation} min={0} max={200} step={5} onChange={(v) => setEffects({...effects, color_saturation: v})} unit="%" />
                    <ControlSlider label="Contrast" value={effects.color_contrast} min={0} max={200} step={5} onChange={(v) => setEffects({...effects, color_contrast: v})} unit="%" />
                    <ControlSlider label="Brightness" value={effects.color_brightness} min={0} max={200} step={5} onChange={(v) => setEffects({...effects, color_brightness: v})} unit="%" />
                  </>
                )}
              </div>
              
              {/* Vignette */}
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-800/80">
                <ControlToggle label="Lens Vignette" checked={effects.vignette_enable} onChange={(v) => setEffects({...effects, vignette_enable: v})} />
                {effects.vignette_enable && (
                  <ControlSlider label="Vignette Opacity" value={effects.vignette_intensity} min={0} max={1} step={0.1} onChange={(v) => setEffects({...effects, vignette_intensity: v})} />
                )}
              </div>
            </div>
          )}
        </div>

        <button onClick={handleGenerate} disabled={isLoading || !selectedFile} className={`relative w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-extrabold text-[15px] transition-all shrink-0 ${isLoading || !selectedFile ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-500/20'}`}>
          {isLoading ? <><Loader2 className="animate-spin w-4 h-4" /><span>Compiling Shaders...</span></> : `Render GPU Video`}
        </button>
      </div>

      <div onMouseDown={() => setIsResizing(true)} className="hidden md:flex w-3 -ml-1.5 cursor-col-resize hover:bg-pink-500/10 transition-all items-center justify-center z-50 absolute h-full" style={{ left: `${sidebarWidth}px` }}><div className="w-[1px] h-full bg-slate-800 transition-colors" /></div>

      {/* RIGHT PANEL (Viewer & History remains unchanged visually from earlier, functionally identical) */}
      <div className="flex-1 flex flex-col pt-24 pb-10 px-6 md:px-10 bg-[#050511] h-full overflow-y-auto scrollbar-hide">
        <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col mb-6 shrink-0 shadow-2xl">
          <div className="flex gap-1 bg-slate-800/80 w-fit p-1 rounded-lg mb-6 shrink-0">
            <button onClick={() => setActiveTab("input")} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${activeTab === "input" ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>Input Image</button>
            <button onClick={() => resultVideoUrl && setActiveTab("output")} disabled={!resultVideoUrl} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${activeTab === 'output' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400'} ${!resultVideoUrl ? 'opacity-50' : 'hover:text-white'}`}>Final Render</button>
          </div>

          <div ref={previewRef} className="w-full aspect-video max-h-[60vh] bg-black rounded-xl overflow-hidden relative group flex items-center justify-center transition-all border border-slate-800" style={{ height: previewHeight ? `${previewHeight}px` : 'auto' }}>
            {isLoading ? <div className="flex flex-col items-center gap-4"><Loader2 className="w-10 h-10 text-pink-500 animate-spin" /><span className="text-pink-400 font-mono text-xs uppercase tracking-widest">Raymarching Scene...</span></div> :
              activeTab === 'output' && resultVideoUrl ? <video src={resultVideoUrl} controls autoPlay loop className="w-full h-full object-contain" onError={() => { alert("Video expired."); setResultVideoUrl(null); setActiveTab('input'); }} /> :
              previewUrl ? <img src={previewUrl} className="w-full h-full object-contain" alt="Preview" /> : <div className="text-slate-600 text-sm font-medium">Awaiting Input</div>
            }
            <div onMouseDown={(e) => { e.preventDefault(); setIsVerticalResizing(true); }} className="absolute bottom-0 left-0 w-8 h-8 bg-black/50 hover:bg-pink-600 cursor-sw-resize flex items-end justify-start p-1.5 rounded-tr-xl transition-colors z-20"><MoveDiagonal2 className="w-3.5 h-3.5 text-white/70" /></div>
          </div>

          <div className="flex gap-3 mt-6 shrink-0">
            <button onClick={() => handleDownload(resultVideoUrl)} disabled={!resultVideoUrl && !isLoading} className={`relative flex-1 py-3 rounded-xl overflow-hidden flex items-center justify-center gap-2 font-bold text-sm transition-all ${(!resultVideoUrl && !isLoading) ? 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/25'}`}>
              {isLoading && <div className="absolute left-0 top-0 h-full bg-pink-800/80 transition-all duration-300" style={{ width: `${progress}%` }}><div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/50 shadow-[0_0_10px_white]" /></div>}
              <div className="relative z-10 flex items-center gap-2">{isLoading ? <><Loader2 className="animate-spin w-4 h-4" /><span>{Math.round(progress)}% Complete</span></> : <><Download className="w-4 h-4" /> Export Media</>}</div>
            </button>
            <button className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-bold text-sm hover:bg-slate-800 hover:text-white flex items-center gap-2 transition-colors"><Share2 className="w-4 h-4" /> Share</button>
          </div>
        </div>

        {/* History Gallery */}
        <div className="shrink-0 mt-auto pt-4 border-t border-slate-800/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><div className="p-1.5 bg-pink-500/10 rounded-lg text-pink-400"><Clock className="w-4 h-4" /></div><h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase">Pro Generations</h3></div>
            <button onClick={fetchHistory} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"><RefreshCw className="w-3 h-3" /><span>Refresh</span></button>
          </div>
          {history.length === 0 ? (
            <div className="h-28 border border-dashed border-slate-800 bg-slate-900/20 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500"><Sparkles className="w-5 h-5 opacity-30" /><span className="text-xs font-medium">No exports found</span></div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {history.map((item) => {
                const isDead = item.is_expired || failedLoadIds.has(item.id);
                return (
                  <div key={item.id} onClick={() => { if (!isDead) { setResultVideoUrl(item.video_url); setActiveTab('output'); } }} className={`relative group shrink-0 snap-start w-40 aspect-video rounded-xl overflow-hidden transition-all duration-300 ${isDead ? 'bg-slate-900/40 border border-dashed border-slate-800 cursor-not-allowed grayscale opacity-50' : 'bg-black cursor-pointer ring-1 ring-white/10 hover:ring-pink-500 hover:shadow-[0_0_15px_-3px_rgba(236,72,153,0.4)]'}`}>
                    {isDead ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3"><Trash2 className="w-5 h-5 text-slate-600" /><span className="text-[9px] font-bold text-slate-500 uppercase">Expired</span></div>
                    ) : (
                      <><video src={item.video_url} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" muted loop onMouseOver={e => e.target.play()} onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }} onError={() => setFailedLoadIds(p => new Set(p).add(item.id))} />
                      <button onClick={(e) => { e.stopPropagation(); handleDownload(item.video_url); }} className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/60 hover:bg-pink-600 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"><Download className="w-3 h-3" /></button></>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepthFlowWorkspace;