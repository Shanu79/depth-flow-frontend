import {
  Upload,
  Download,
  Share2,
  Image as ImageIcon,
  ChevronDown,
  Sliders,
  Loader2,
  GripVertical
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";

const Workspace = () => {
  // --- UI State for Resizing ---
  const [sidebarWidth, setSidebarWidth] = useState(450);
  const [isResizing, setIsResizing] = useState(false);

  // --- Logic State ---
  const [motionStyle, setMotionStyle] = useState("Dolly");
  const [depth, setDepth] = useState(7);
  const [speed, setSpeed] = useState(5);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultVideoUrl, setResultVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const fileInputRef = useRef(null);

  // --- Resize Handlers ---
  const startResizing = useCallback(() => {
    setIsResizing(true);
    // Prevent text selection while dragging to stop visual glitches
    document.body.style.userSelect = 'none'; 
    document.body.style.cursor = 'col-resize';
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    // Re-enable text selection
    document.body.style.userSelect = ''; 
    document.body.style.cursor = '';
  }, []);

  const resize = useCallback(
    (mouseEvent) => {
      if (isResizing) {
        const newWidth = mouseEvent.clientX;
        // Constraint: Min 320px, Max 800px
        if (newWidth > 320 && newWidth < 800) {
            setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultVideoUrl(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleGenerate = async () => {
    if (!selectedFile) return alert("Please upload an image first!");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("style", motionStyle);
      formData.append("depth", depth);
      formData.append("speed", speed);

      const response = await fetch("http://localhost:8000/generate-3d", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Generation failed");
      const data = await response.json();
      setResultVideoUrl(data.video_url);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate video.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden relative">
      
      {/* ------------------------------------------- */}
      {/* LEFT PANEL - CONTROLS (RESIZABLE)           */}
      {/* ------------------------------------------- */}
      <div 
        className={`
            relative flex-shrink-0 flex flex-col pt-24 pb-10 px-6 space-y-6 overflow-y-auto scrollbar-hide border-r border-slate-800 bg-slate-950 z-10 w-full md:w-[var(--sidebar-width)]
            /* PERFORMANCE FIX: Only apply transition when NOT dragging */
            ${isResizing ? 'transition-none' : 'transition-[width] duration-300 ease-out'}
        `}
        style={{ '--sidebar-width': `${sidebarWidth}px` }}
      >
        <h1 className="text-2xl font-bold text-white">Create 3D Image</h1>

        {/* Upload Box */}
        <div 
            onClick={handleUploadClick}
            className="relative border-2 border-dashed border-cyan-400 bg-blue-600/20 backdrop-blur-sm rounded-2xl h-48 flex flex-col items-center justify-center text-center p-6 cursor-pointer group hover:bg-blue-600/30 transition-all shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/png, image/jpeg"
          />
          
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="h-full object-contain rounded-lg" />
          ) : (
            <>
                <div className="mb-4 transform group-hover:-translate-y-1 transition-transform duration-300">
                    <Upload className="text-white w-10 h-10" strokeWidth={1.5} />
                </div>
                <p className="text-white font-medium text-sm">Click to Upload Image</p>
                <p className="text-white text-xs mt-1">JPG, PNG (Max 10MB)</p>
            </>
          )}
        </div>

        {/* 3D Effect & Motion */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium flex items-center gap-2">
              <Sliders className="w-4 h-4" /> 3D Effect & Motion
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-300 font-medium">
                <span>Depth Intensity ({depth})</span>
              </div>
              <input
                type="range" min="1" max="10" value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="w-full bg-purple-500 rounded-full cursor-pointer accent-purple-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm text-slate-300 font-medium">
                <span>Motion Speed ({speed}s)</span>
              </div>
              <input
                type="range" min="1" max="10" value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="w-full bg-purple-500 rounded-full cursor-pointer accent-purple-400"
              />
            </div>
          </div>

          {/* Motion Style - Segmented Control */}
          <div>
            <label className="text-sm text-slate-300 block mb-3 font-medium">Motion Style</label>
            <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800">
              {["Dolly", "Orbit", "Zoom"].map((style) => (
                <button
                  key={style}
                  onClick={() => setMotionStyle(style)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                    motionStyle === style
                      ? "bg-slate-700 text-white shadow-sm"
                      : "text-slate-500 hover:text-white"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button 
            onClick={handleGenerate}
            disabled={isLoading || !selectedFile}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-slate-900 font-extrabold text-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all mt-4
            ${isLoading || !selectedFile ? 'bg-slate-600 cursor-not-allowed' : 'bg-slate-600 hover:bg-slate-500 text-white'}`}
        >
            {isLoading ? <Loader2 className="animate-spin" /> : "Generate 3D Video"}
        </button>
      </div>

      
      {/* ------------------------------------------- */}
      {/* DRAG HANDLE (Desktop Only)                  */}
      {/* ------------------------------------------- */}
      <div 
        onMouseDown={startResizing}
        className="hidden md:flex w-4 -ml-2 cursor-col-resize hover:bg-purple-500/10 transition-all items-center justify-center z-50 group absolute h-full"
        // Positioned absolutely based on sidebar width
        style={{ left: `${sidebarWidth}px` }}
      >
        <div className="w-[1px] h-full bg-slate-800 group-hover:bg-purple-500/50 transition-colors" />
      </div>


      {/* ------------------------------------------- */}
      {/* RIGHT PANEL - PREVIEW (Fills remaining)     */}
      {/* ------------------------------------------- */}
      <div className="flex-1 flex flex-col gap-6 pt-24 pb-10 px-6 md:px-12 bg-slate-950 overflow-hidden min-w-0">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col h-full">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-800 w-fit p-1 rounded-lg mb-6">
            <button className={`px-4 py-1.5 text-sm rounded-md transition-colors ${!resultVideoUrl ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>
              Input Image
            </button>
            <button className={`px-4 py-1.5 text-sm rounded-md transition-colors ${resultVideoUrl ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>
              3D Output
            </button>
          </div>

          {/* Video Player / Image Display */}
          <div className="flex-1 bg-black rounded-xl overflow-hidden relative group min-h-[300px] flex items-center justify-center">
            {isLoading ? (
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-2" />
                    <p className="text-slate-400 text-sm">Generating AI Animation...</p>
                </div>
            ) : resultVideoUrl ? (
                <video 
                    src={resultVideoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    className="w-full h-full object-contain" 
                />
            ) : previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-contain opacity-100" alt="Preview" />
            ) : (
                <div className="text-slate-600">No Image Selected</div>
            )}
            
            {resultVideoUrl && !isLoading && (
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none" />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 hover:shadow-purple-600/40 transition-all">
              <Download className="w-5 h-5" /> Download
            </button>
            <button className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 flex items-center gap-2 transition-all">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Workspace;