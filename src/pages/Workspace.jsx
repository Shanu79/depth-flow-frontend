import {
  Upload,
  X,
  Download,
  Share2,
  Loader2,
  MoveDiagonal2,
  AlertCircle
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config.js';
import useAuthStore from '../stores/authStore.js';

// --- Credit Alert Modal Component ---
const CreditAlertModal = ({ isOpen, onClose }) => {
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
        <h3 className="text-xl font-bold text-white mb-2">Out of Credits</h3>
        <p className="text-slate-400 mb-6 leading-relaxed">
          You have reached your credit limit. To continue generating stunning 3D videos, please upgrade your plan or purchase a credit pack.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/pricing')}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
};

const Workspace = () => {
  // --- UI State ---
  const [sidebarWidth, setSidebarWidth] = useState(450);
  const [isResizing, setIsResizing] = useState(false);
  const [previewHeight, setPreviewHeight] = useState(null);
  const [isVerticalResizing, setIsVerticalResizing] = useState(false);

  // --- Logic State ---
  // Initialize state from LocalStorage if available
  const [motionStyle, setMotionStyle] = useState(() => localStorage.getItem("ws_motionStyle") || "Dolly");
  const [depth, setDepth] = useState(() => Number(localStorage.getItem("ws_depth")) || 7);
  const [speed, setSpeed] = useState(() => Number(localStorage.getItem("ws_speed")) || 5);
  const [duration, setDuration] = useState(() => Number(localStorage.getItem("ws_duration")) || 5); // NEW PARAMETER
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(() => localStorage.getItem("ws_previewUrl") || null);
  const [resultVideoUrl, setResultVideoUrl] = useState(() => localStorage.getItem("ws_resultVideoUrl") || null);
  
  const [isLoading, setIsLoading] = useState(false);
  // If we have a result on load, default to output tab
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("ws_resultVideoUrl") ? "output" : "input");

  const [showCreditModal, setShowCreditModal] = useState(false);
  const { user, updateCredits } = useAuthStore();
  const credits = user?.credits || 0;

  const fileInputRef = useRef(null);
  const previewRef = useRef(null);
  const navigate = useNavigate();

  // --- 1. RESTORE FILE OBJECT ON LOAD ---
  useEffect(() => {
    const restoreFile = async () => {
      const savedPreview = localStorage.getItem("ws_previewUrl");
      if (savedPreview && !selectedFile) {
        try {
          const res = await fetch(savedPreview);
          const blob = await res.blob();
          const file = new File([blob], "restored_image.png", { type: blob.type });
          setSelectedFile(file);
        } catch (e) {
          console.error("Failed to restore file from storage", e);
        }
      }
    };
    restoreFile();
  }, []);

  // --- 2. PERSIST SETTINGS ---
  useEffect(() => {
    localStorage.setItem("ws_motionStyle", motionStyle);
    localStorage.setItem("ws_depth", depth);
    localStorage.setItem("ws_speed", speed);
    localStorage.setItem("ws_duration", duration); // Persist Duration
  }, [motionStyle, depth, speed, duration]);

  // --- HELPER: Convert File to Base64 ---
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Save to LocalStorage
      try {
        const base64 = await fileToBase64(file);
        localStorage.setItem("ws_previewUrl", base64);
      } catch (err) {
        console.warn("Image too large to save locally", err);
      }

      setResultVideoUrl(null);
      localStorage.removeItem("ws_resultVideoUrl"); 
      
      setActiveTab("input");
      setPreviewHeight(null);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setSelectedFile(null);
    setResultVideoUrl(null);
    
    // Clear LocalStorage
    localStorage.removeItem("ws_previewUrl");
    localStorage.removeItem("ws_resultVideoUrl");
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) return alert("Please upload an image first!");

    if (credits !== null && credits <= 0) {
      setShowCreditModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in first.");

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("style", motionStyle);
      formData.append("depth", depth);
      formData.append("speed", speed);
      formData.append("duration", duration); // Sending new param to backend

      const response = await fetch(`${API_BASE_URL}/ai/generate-3d`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (response.status === 402) {
        setShowCreditModal(true);
        setIsLoading(false);
        return;
      }

      if (!response.ok) throw new Error("Generation failed.");

      const data = await response.json();
      
      setResultVideoUrl(data.video_url);
      localStorage.setItem("ws_resultVideoUrl", data.video_url); 
      
      updateCredits(data.remaining_credits);
      setActiveTab("output");
      setPreviewHeight(null);

    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resultVideoUrl) return;

    try {
      const response = await fetch(resultVideoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const filename = resultVideoUrl.split('/').pop() || "generated-video.mp4";
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(resultVideoUrl, '_blank');
    }
  };

  // --- RESIZING LOGIC ---
  const startResizing = useCallback(() => { setIsResizing(true); document.body.style.userSelect = 'none'; document.body.style.cursor = 'col-resize'; }, []);
  const stopResizing = useCallback(() => { setIsResizing(false); document.body.style.userSelect = ''; document.body.style.cursor = ''; }, []);
  const resize = useCallback((e) => { if (isResizing) { const newWidth = e.clientX; if (newWidth > 320 && newWidth < 800) setSidebarWidth(newWidth); } }, [isResizing]);
  const startVerticalResizing = useCallback((e) => { e.preventDefault(); setIsVerticalResizing(true); document.body.style.userSelect = 'none'; document.body.style.cursor = 'sw-resize'; if (!previewHeight && previewRef.current) setPreviewHeight(previewRef.current.offsetHeight); }, [previewHeight]);
  const stopVerticalResizing = useCallback(() => { setIsVerticalResizing(false); document.body.style.userSelect = ''; document.body.style.cursor = ''; }, []);
  const resizeVertical = useCallback((e) => { if (isVerticalResizing && previewRef.current) { const rect = previewRef.current.getBoundingClientRect(); const newHeight = e.clientY - rect.top; if (newHeight > 300 && newHeight < 1200) setPreviewHeight(newHeight); } }, [isVerticalResizing]);

  useEffect(() => {
    if (isResizing) { window.addEventListener("mousemove", resize); window.addEventListener("mouseup", stopResizing); }
    if (isVerticalResizing) { window.addEventListener("mousemove", resizeVertical); window.addEventListener("mouseup", stopVerticalResizing); }
    return () => { window.removeEventListener("mousemove", resize); window.removeEventListener("mouseup", stopResizing); window.removeEventListener("mousemove", resizeVertical); window.removeEventListener("mouseup", stopVerticalResizing); };
  }, [isResizing, resize, stopResizing, isVerticalResizing, resizeVertical, stopVerticalResizing]);


  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden relative">

      <CreditAlertModal
        isOpen={showCreditModal}
        onClose={() => setShowCreditModal(false)}
      />

      {/* LEFT PANEL */}
      <div
        className={`relative flex-shrink-0 flex flex-col pt-24 pb-10 px-6 space-y-6 overflow-y-auto scrollbar-hide border-r border-slate-800 bg-slate-950 z-10 w-full md:w-[var(--sidebar-width)] ${isResizing ? 'transition-none' : 'transition-[width] duration-300 ease-out'}`}
        style={{ '--sidebar-width': `${sidebarWidth}px` }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Create 3D Image</h1>
        </div>

        {/* Upload Box */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="relative border-2 border-dashed border-cyan-400 bg-blue-600/20 backdrop-blur-sm rounded-2xl h-48 flex flex-col items-center justify-center text-center p-6 cursor-pointer group hover:bg-blue-600/30 transition-all overflow-hidden"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg"
          />

          {previewUrl ? (
            <div className="relative h-full w-full flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full object-contain rounded-lg"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 p-1.5 bg-slate-900/80 hover:bg-red-500 text-white rounded-full transition-colors shadow-lg border border-slate-700"
                title="Remove and upload another"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 transform group-hover:-translate-y-1 transition-transform duration-300">
                <Upload className="text-white w-10 h-10" strokeWidth={1.5} />
              </div>
              <p className="text-white font-medium text-sm">Click to Upload Image</p>
              <p className="text-slate-400 text-xs mt-2 max-w-[80%]">
                Note: Larger image sizes will take longer to process.
              </p>
            </>
          )}
        </div>

        {/* Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-4">

            {/* 1. INTENSITY SLIDER */}
            <div className="space-y-3">
              <span className="text-sm text-slate-300 font-medium flex justify-between">
                Depth Intensity
                <span>{depth}</span>
              </span>
              <input
                type="range"
                min="1"
                max="10"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                className="w-full bg-purple-500 rounded-full cursor-pointer accent-purple-400"
              />
            </div>

            {/* 2. SPEED SLIDER (Velocity) */}
            <div className="space-y-3">
              <span className="text-sm text-slate-300 font-medium flex justify-between">
                Motion Speed
                <span>{speed}x</span>
              </span>
              <input
                type="range"
                min="1"
                max="10"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full bg-purple-500 rounded-full cursor-pointer accent-purple-400"
              />
            </div>

            {/* 3. DURATION SLIDER (Time) */}
            <div className="space-y-3">
              <span className="text-sm text-slate-300 font-medium flex justify-between">
                Video Length
                <span>{duration}s</span>
              </span>
              <input
                type="range"
                min="1"
                max="10"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-cyan-600 rounded-full cursor-pointer accent-cyan-400"
              />
            </div>

          </div>

          {/* STYLE BUTTONS */}
          <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800">
            {["Dolly", "Orbit", "Zoom"].map((style) => (
              <button
                key={style}
                onClick={() => setMotionStyle(style)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${motionStyle === style
                  ? "bg-slate-700 text-white shadow-sm"
                  : "text-slate-500 hover:text-white"
                  }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleGenerate} disabled={isLoading || !selectedFile} className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-extrabold text-lg transition-all mt-4 ${isLoading || !selectedFile ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'}`}>
          {isLoading ? <Loader2 className="animate-spin" /> : `Generate 3D Image`}
        </button>
      </div>

      {/* DRAG HANDLE */}
      <div onMouseDown={startResizing} className="hidden md:flex w-4 -ml-2 cursor-col-resize hover:bg-purple-500/10 transition-all items-center justify-center z-50 group absolute h-full" style={{ left: `${sidebarWidth}px` }}><div className="w-[1px] h-full bg-slate-800 group-hover:bg-purple-500/50 transition-colors" /></div>

      {/* RIGHT PANEL - PREVIEW */}
      <div className="flex-1 flex flex-col gap-6 pt-24 pb-10 px-6 md:px-12 bg-slate-950 overflow-hidden min-w-0">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col h-fill">

          {/* Tabs */}
          <div className="flex gap-1 bg-slate-800 w-fit p-1 rounded-lg mb-6">
            <button onClick={() => setActiveTab("input")} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${activeTab === "input" ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>Input</button>
            <button onClick={() => resultVideoUrl && setActiveTab("output")} disabled={!resultVideoUrl} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'output' ? 'bg-purple-600 text-white' : 'text-slate-400'} ${!resultVideoUrl ? 'opacity-50' : 'hover:text-white'}`}>Result</button>
          </div>

          {/* Viewer */}
          <div
            ref={previewRef}
            className="bg-black rounded-xl overflow-hidden relative group min-h-[50vh] flex items-center justify-center transition-all duration-75 ease-linear"
            style={{ height: previewHeight ? `${previewHeight}px` : 'auto', maxHeight: previewHeight ? 'none' : '65vh' }}
          >
            {isLoading ? <Loader2 className="w-12 h-12 text-purple-400 animate-spin" /> :
              activeTab === 'output' && resultVideoUrl ? <video src={resultVideoUrl} controls autoPlay loop className="w-full h-full object-contain" /> :
                previewUrl ? <img src={previewUrl} className="w-full h-full object-contain" alt="Preview" /> :
                  <div className="text-slate-600">No Image Selected</div>
            }

            {/* Corner Resize Handle */}
            <div onMouseDown={startVerticalResizing} className="absolute bottom-0 left-0 w-8 h-8 bg-black/50 hover:bg-purple-600 cursor-sw-resize flex items-end justify-start p-1 rounded-tr-xl transition-colors z-20"><MoveDiagonal2 className="w-4 h-4 text-white/70" /></div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleDownload}
              disabled={!resultVideoUrl}
              className={`flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center justify-center gap-2 ${!resultVideoUrl ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/25 transition-all'}`}
            >
              <Download className="w-5 h-5" /> Download
            </button>

            <button className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;