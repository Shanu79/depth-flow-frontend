import {
  Upload, X, Download, Share2, Loader2, MoveDiagonal2, AlertCircle, Clock, Trash2, Sparkles, RefreshCw, Play
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config.js';
import useAuthStore from '../stores/authStore.js';

const GENERATION_COST = 20;

// --- Helper Components (Same as Workspace.jsx) ---
const CreditAlertModal = ({ isOpen, onClose, currentCredits }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-2">
            <AlertCircle className="w-6 h-6" />
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Insufficient Credits</h3>
        <p className="text-slate-400 mb-6 leading-relaxed">
          This generation requires <span className="text-white font-bold">{GENERATION_COST} credits</span>,
          but you only have <span className="text-red-400 font-bold">{currentCredits}</span> available.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors">Cancel</button>
          <button onClick={() => navigate('/pricing')} className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all">Upgrade Plan</button>
        </div>
      </div>
    </div>
  );
};

const ExpiryTimer = ({ seconds, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => { setTimeLeft(seconds); }, [seconds]);
  useEffect(() => {
    if (timeLeft <= 0) { if (onExpire) onExpire(); return; }
    const timer = setInterval(() => { setTimeLeft(prev => prev - 1); }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);
  if (timeLeft <= 0) return <span className="text-red-500 text-xs font-bold">Expired</span>;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  return (
    <div className="flex items-center gap-1 text-xs text-orange-400 font-mono bg-orange-500/10 px-2 py-1 rounded backdrop-blur-md">
      <Clock className="w-3 h-3" />{mins}:{secs < 10 ? `0${secs}` : secs}
    </div>
  );
};

const DepthFlowWorkspace = () => {
  const [sidebarWidth, setSidebarWidth] = useState(450);
  const [isResizing, setIsResizing] = useState(false);
  const [previewHeight, setPreviewHeight] = useState(null);
  const [isVerticalResizing, setIsVerticalResizing] = useState(false);

  const [motionStyle, setMotionStyle] = useState(() => localStorage.getItem("df_motionStyle") || "Dolly");
  const [depth, setDepth] = useState(() => Number(localStorage.getItem("df_depth")) || 7);
  const [speed, setSpeed] = useState(() => Number(localStorage.getItem("df_speed")) || 5);
  const [duration, setDuration] = useState(() => Number(localStorage.getItem("df_duration")) || 5);

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

  // --- FETCH HISTORY ---
  const fetchHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(`${API_BASE_URL}/ai/history`, { headers: { "Authorization": `Bearer ${token}` } });
      if (res.ok) setHistory(await res.json());
    } catch (error) { console.error("Failed to load history", error); }
  }, []);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  const handleVideoError = (id) => {
    setFailedLoadIds(prev => new Set(prev).add(id));
  };

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          let step = prev < 30 ? 2 : prev < 80 ? 0.5 : prev < 95 ? 0.1 : 0;
          return prev + step;
        });
      }, 100);
    } else setProgress(0);
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    const restoreFile = async () => {
      const savedPreview = localStorage.getItem("df_previewUrl");
      if (savedPreview && !selectedFile) {
        try {
          const res = await fetch(savedPreview);
          const blob = await res.blob();
          setSelectedFile(new File([blob], "restored_image.png", { type: blob.type }));
        } catch (e) { console.error("Restore failed", e); }
      }
    };
    restoreFile();
  }, []);

  useEffect(() => {
    localStorage.setItem("df_motionStyle", motionStyle);
    localStorage.setItem("df_depth", depth);
    localStorage.setItem("df_speed", speed);
    localStorage.setItem("df_duration", duration);
  }, [motionStyle, depth, speed, duration]);

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      try { localStorage.setItem("df_previewUrl", await fileToBase64(file)); } catch (err) {}
      setResultVideoUrl(null);
      localStorage.removeItem("df_resultVideoUrl");
      setActiveTab("input");
      setPreviewHeight(null);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPreviewUrl(null); setSelectedFile(null); setResultVideoUrl(null);
    localStorage.removeItem("df_previewUrl"); localStorage.removeItem("df_resultVideoUrl");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ==========================================
  // --- NEW: BLOB HANDLING FOR DEPTHFLOW ---
  // ==========================================
  const handleGenerate = async () => {
    if (!selectedFile) return alert("Please upload an image first!");
    if (credits !== null && credits < GENERATION_COST) { setShowCreditModal(true); return; }

    setIsLoading(true);
    setProgress(0);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in first.");

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("style", motionStyle);
      formData.append("depth", depth);
      formData.append("speed", speed);
      formData.append("duration", duration);

      // Hit the new DepthFlow endpoint
      const response = await fetch(`${API_BASE_URL}/ai/depthflow/generate-3d`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (response.status === 402) { setShowCreditModal(true); return; }
      if (!response.ok) throw new Error("Generation failed.");

      // 1. Read the custom headers sent by FastAPI
      const remainingCredits = response.headers.get("X-Remaining-Credits");
      const savedVideoUrl = response.headers.get("X-Video-URL"); // The static/ link

      // 2. The response body is the actual .mp4 file (Blob)
      const blob = await response.blob();
      
      // 3. Create a local URL so the browser can play it instantly
      const localVideoUrl = URL.createObjectURL(blob);
      
      setProgress(100);
      setResultVideoUrl(localVideoUrl);
      localStorage.setItem("df_resultVideoUrl", savedVideoUrl || localVideoUrl);
      
      if (remainingCredits) updateCredits(parseInt(remainingCredits, 10));
      
      setActiveTab("output");
      setPreviewHeight(null);
      fetchHistory();

    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
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
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', "depthflow_pro.mp4");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) { window.open(url, '_blank'); }
  };

  // Resizing functions
  const startResizing = useCallback(() => { setIsResizing(true); document.body.style.userSelect = 'none'; document.body.style.cursor = 'col-resize'; }, []);
  const stopResizing = useCallback(() => { setIsResizing(false); document.body.style.userSelect = ''; document.body.style.cursor = ''; }, []);
  const resize = useCallback((e) => { if (isResizing && e.clientX > 320 && e.clientX < 800) setSidebarWidth(e.clientX); }, [isResizing]);
  const startVerticalResizing = useCallback((e) => { e.preventDefault(); setIsVerticalResizing(true); document.body.style.userSelect = 'none'; document.body.style.cursor = 'sw-resize'; if (!previewHeight && previewRef.current) setPreviewHeight(previewRef.current.offsetHeight); }, [previewHeight]);
  const stopVerticalResizing = useCallback(() => { setIsVerticalResizing(false); document.body.style.userSelect = ''; document.body.style.cursor = ''; }, []);
  const resizeVertical = useCallback((e) => { if (isVerticalResizing && previewRef.current) { const newHeight = e.clientY - previewRef.current.getBoundingClientRect().top; if (newHeight > 300 && newHeight < 1200) setPreviewHeight(newHeight); } }, [isVerticalResizing]);

  useEffect(() => {
    if (isResizing) { window.addEventListener("mousemove", resize); window.addEventListener("mouseup", stopResizing); }
    if (isVerticalResizing) { window.addEventListener("mousemove", resizeVertical); window.addEventListener("mouseup", stopVerticalResizing); }
    return () => { window.removeEventListener("mousemove", resize); window.removeEventListener("mouseup", stopResizing); window.removeEventListener("mousemove", resizeVertical); window.removeEventListener("mouseup", stopVerticalResizing); };
  }, [isResizing, resize, stopResizing, isVerticalResizing, resizeVertical, stopVerticalResizing]);

  return (
    <div className="min-h-screen bg-[#050511] flex flex-col md:flex-row overflow-hidden relative">
      <CreditAlertModal isOpen={showCreditModal} onClose={() => setShowCreditModal(false)} currentCredits={credits} />

      {/* LEFT PANEL */}
      <div className={`relative flex-shrink-0 flex flex-col pt-24 px-6 space-y-6 overflow-y-auto scrollbar-hide border-r border-slate-800 bg-[#050511] z-10 w-full md:w-[var(--sidebar-width)] ${isResizing ? 'transition-none' : 'transition-[width] duration-300 ease-out'}`} style={{ '--sidebar-width': `${sidebarWidth}px` }}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Pro Workspace</h1>
        </div>

        {/* Upload Box */}
        <div onClick={() => fileInputRef.current.click()} className="relative border-2 border-dashed border-pink-500 bg-pink-600/10 backdrop-blur-sm rounded-2xl h-48 flex flex-col items-center justify-center text-center p-6 cursor-pointer group hover:bg-pink-600/20 transition-all overflow-hidden">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg" />
          {previewUrl ? (
            <div className="relative h-full w-full flex items-center justify-center">
              <img src={previewUrl} alt="Preview" className="h-full object-contain rounded-lg" />
              <button onClick={handleRemoveImage} className="absolute top-0 right-0 p-1.5 bg-slate-900/80 hover:bg-red-500 text-white rounded-full transition-colors shadow-lg border border-slate-700"><X size={16} /></button>
            </div>
          ) : (
            <>
              <div className="mb-4 transform group-hover:-translate-y-1 transition-transform duration-300"><Upload className="text-white w-10 h-10" strokeWidth={1.5} /></div>
              <p className="text-white font-medium text-sm">Upload High-Res Image</p>
              <p className="text-slate-400 text-xs mt-2 max-w-[80%]">Powered by Modal Cloud GPUs</p>
            </>
          )}
        </div>

        {/* Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-3"><span className="text-sm text-slate-300 font-medium flex justify-between">Depth Intensity<span>{depth}</span></span><input type="range" min="1" max="10" value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="w-full bg-pink-500 rounded-full cursor-pointer accent-pink-400" /></div>
            <div className="space-y-3"><span className="text-sm text-slate-300 font-medium flex justify-between">Motion Speed<span>{speed}x</span></span><input type="range" min="1" max="10" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full bg-pink-500 rounded-full cursor-pointer accent-pink-400" /></div>
            <div className="space-y-3"><span className="text-sm text-slate-300 font-medium flex justify-between">Video Length<span>{duration}s</span></span><input type="range" min="1" max="10" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full bg-pink-500 rounded-full cursor-pointer accent-pink-400" /></div>
          </div>
          <div className="flex bg-[#050511]/50 p-1 rounded-xl border border-slate-800">
            {["Dolly", "Orbit", "Zoom"].map((style) => (
              <button key={style} onClick={() => setMotionStyle(style)} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${motionStyle === style ? "bg-slate-700 text-white shadow-sm" : "text-slate-500 hover:text-white"}`}>{style}</button>
            ))}
          </div>
        </div>

        <button onClick={handleGenerate} disabled={isLoading || !selectedFile} className={`relative w-full py-4 rounded-xl flex items-center justify-center gap-2 font-extrabold text-lg transition-all mt-4 overflow-hidden ${isLoading || !selectedFile ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-500/20'}`}>
          {isLoading ? <><Loader2 className="animate-spin w-5 h-5" /><span>Rendering on GPU...</span></> : `Render Pro Video`}
        </button>
      </div>

      <div onMouseDown={startResizing} className="hidden md:flex w-4 -ml-2 cursor-col-resize hover:bg-pink-500/10 transition-all items-center justify-center z-50 group absolute h-full" style={{ left: `${sidebarWidth}px` }}><div className="w-[1px] h-full bg-slate-800 group-hover:bg-pink-500/50 transition-colors" /></div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col pt-24 pb-10 px-6 md:px-12 bg-[#050511] h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col mb-6 shrink-0">
          <div className="flex gap-1 bg-slate-800 w-fit p-1 rounded-lg mb-6 flex-shrink-0">
            <button onClick={() => setActiveTab("input")} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${activeTab === "input" ? 'bg-pink-600 text-white' : 'text-slate-400'}`}>Input</button>
            <button onClick={() => resultVideoUrl && setActiveTab("output")} disabled={!resultVideoUrl} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'output' ? 'bg-pink-600 text-white' : 'text-slate-400'} ${!resultVideoUrl ? 'opacity-50' : 'hover:text-white'}`}>Result</button>
          </div>

          <div ref={previewRef} className="w-full aspect-video max-h-[60vh] bg-black rounded-xl overflow-hidden relative group flex items-center justify-center transition-all duration-75 ease-linear" style={{ height: previewHeight ? `${previewHeight}px` : 'auto' }}>
            {isLoading ? <div className="flex flex-col items-center gap-3"><Loader2 className="w-12 h-12 text-pink-500 animate-spin" /><span className="text-pink-400 font-mono text-sm">Compiling Shaders...</span></div> :
              activeTab === 'output' && resultVideoUrl ? <video src={resultVideoUrl} controls autoPlay loop className="w-full h-full object-contain" onError={() => { alert("Video expired."); setResultVideoUrl(null); setActiveTab('input'); }} /> :
              previewUrl ? <img src={previewUrl} className="w-full h-full object-contain" alt="Preview" /> : <div className="text-slate-600">No Image Selected</div>
            }
            <div onMouseDown={startVerticalResizing} className="absolute bottom-0 left-0 w-8 h-8 bg-black/50 hover:bg-pink-600 cursor-sw-resize flex items-end justify-start p-1 rounded-tr-xl transition-colors z-20"><MoveDiagonal2 className="w-4 h-4 text-white/70" /></div>
          </div>

          <div className="flex gap-3 mt-6 flex-shrink-0">
            <button onClick={() => handleDownload(resultVideoUrl)} disabled={!resultVideoUrl && !isLoading} className={`relative flex-1 py-3 rounded-xl overflow-hidden flex items-center justify-center gap-2 font-semibold transition-all ${(!resultVideoUrl && !isLoading) ? 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/25'}`}>
              {isLoading && <div className="absolute left-0 top-0 h-full bg-pink-800/80 transition-all duration-300 ease-linear shadow-[0_0_20px_rgba(236,72,153,0.6)] z-0" style={{ width: `${progress}%` }}><div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/50 shadow-[0_0_10px_white]" /></div>}
              <div className="relative z-10 flex items-center gap-2">{isLoading ? <><Loader2 className="animate-spin w-5 h-5" /><span>Processing... {Math.round(progress)}%</span></> : <><Download className="w-5 h-5" /> Download</>}</div>
            </button>
            <button className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 flex items-center gap-2"><Share2 className="w-4 h-4" /> Share</button>
          </div>
        </div>

        {/* History Section */}
        <div className="flex-shrink-0 mt-auto pt-6 border-t border-slate-800/50">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-pink-500/10 rounded-lg text-pink-400"><Clock className="w-4 h-4" /></div>
              <div><h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase">Pro Generations</h3></div>
            </div>
            <button onClick={fetchHistory} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"><RefreshCw className="w-3.5 h-3.5" /><span>Refresh</span></button>
          </div>
          {history.length === 0 ? (
            <div className="h-32 border border-dashed border-slate-800/60 bg-slate-900/20 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500"><Sparkles className="w-5 h-5 opacity-40" /><span className="text-sm font-medium">No pro videos generated yet</span></div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-6 pt-2 px-1 snap-x scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {history.map((item) => {
                const isDead = item.is_expired || failedLoadIds.has(item.id);
                return (
                  <div key={item.id} onClick={() => { if (!isDead) { setResultVideoUrl(item.video_url); setActiveTab('output'); } }} className={`relative group flex-shrink-0 snap-start w-48 aspect-video rounded-2xl overflow-hidden transition-all duration-300 ${isDead ? 'bg-slate-900/40 border border-dashed border-slate-800 cursor-not-allowed grayscale opacity-60' : 'bg-black cursor-pointer hover:shadow-[0_0_20px_-5px_rgba(236,72,153,0.4)]'}`}>
                    {isDead ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center"><Trash2 className="w-6 h-6 text-slate-600 mb-1" /><span className="text-[10px] font-bold text-slate-600 uppercase">Expired</span></div>
                    ) : (
                      <><video src={item.video_url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" muted loop onMouseOver={e => e.target.play()} onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }} onError={() => handleVideoError(item.id)} />
                      <button onClick={(e) => { e.stopPropagation(); handleDownload(item.video_url); }} className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 hover:bg-pink-600 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"><Download className="w-3.5 h-3.5" /></button></>
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