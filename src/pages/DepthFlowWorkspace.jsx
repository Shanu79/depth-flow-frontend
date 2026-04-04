import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload,
  Download,
  Share2,
  Orbit,
  ZoomIn,
  ArrowRight,
  MoveHorizontal,
  MoveVertical,
  Circle,
  Clock,
  ChevronDown,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Ensure these point to your actual config and store
import { API_BASE_URL } from "../config.js";
import useAuthStore from "../stores/authStore.js";

const GENERATION_COST = 20;

// ==========================================
// --- HELPER COMPONENTS ---
// ==========================================

const SliderControl = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  unit = "",
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2.5 w-full group">
      <div className="flex justify-between items-center w-full">
        <span className="text-xs text-gray-300 font-medium transition-colors duration-300 group-hover:text-purple-300 tracking-wide">
          {label}
        </span>
        <span className="text-[10px] md:text-xs font-mono font-medium bg-black/40 text-purple-200 px-2.5 py-1 rounded-md border border-purple-500/20 text-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
          {value}
          {unit}
        </span>
      </div>
      <div className="relative w-full flex items-center h-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none transition-all
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-4 
                        [&::-webkit-slider-thumb]:h-4 
                        [&::-webkit-slider-thumb]:bg-white 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(217,70,239,0.8)]
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-purple-200
                        [&::-webkit-slider-thumb]:transition-transform
                        [&::-webkit-slider-thumb]:hover:scale-125
                        [&::-moz-range-thumb]:w-4 
                        [&::-moz-range-thumb]:h-4 
                        [&::-moz-range-thumb]:bg-white 
                        [&::-moz-range-thumb]:rounded-full 
                        [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(217,70,239,0.8)]
                        [&::-moz-range-thumb]:border-2
                        [&::-moz-range-thumb]:border-purple-200
                        [&::-moz-range-thumb]:transition-transform
                        [&::-moz-range-thumb]:hover:scale-125"
          style={{
            background: `linear-gradient(to right, #6366f1 0%, #d946ef ${percentage}%, #1f2937 ${percentage}%, #1f2937 100%)`,
          }}
        />
      </div>
    </div>
  );
};

const SelectControl = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-300 truncate w-[30%]">{label}</span>
      <div className="relative w-[65%] shrink-0" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between bg-white/5 border transition-all duration-200 text-xs rounded-lg px-3 py-2 outline-none
            ${
              isOpen
                ? "border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.3)] text-white"
                : "border-white/10 text-gray-200 hover:border-white/20 hover:bg-white/10"
            }`}
        >
          <span className="truncate pr-2">{selectedOption?.label}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-purple-400" : "text-gray-400"}`}
          />
        </button>

        <div
          className={`absolute top-[calc(100%+6px)] right-0 w-full bg-[#130f2d]/95 backdrop-blur-xl border border-purple-500/30 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 overflow-hidden origin-top transition-all duration-200 ease-out
            ${isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible pointer-events-none"}`}
        >
          <div className="max-h-[250px] overflow-y-auto custom-scrollbar flex flex-col p-1.5 gap-0.5">
            {options.map((opt, i) => {
              const isActive = value === opt.value;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`text-left px-2.5 py-2 text-xs rounded-md transition-colors flex items-center justify-between
                    ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600/40 to-indigo-600/40 text-purple-200 font-medium"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_5px_rgba(168,85,247,0.8)] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const MotionButton = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col lg:flex-row items-center justify-center gap-1.5 p-2 rounded-lg text-[11px] font-medium border transition-colors min-w-0 w-full
    ${
      active
        ? "bg-purple-600/30 border-purple-500 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200"
    }`}
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
      <div className="bg-[#0f0c29] border border-purple-500/30 rounded-2xl w-full max-w-md p-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-2">
            <AlertCircle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Insufficient Credits
        </h3>
        <p className="text-gray-400 mb-6 text-sm">
          Requires{" "}
          <span className="text-white font-bold">
            {GENERATION_COST} credits
          </span>
          , but you have{" "}
          <span className="text-red-400 font-bold">{currentCredits}</span>.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-300 font-medium hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("/pricing")}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          >
            Upgrade Plan
          </button>
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
  const [activeMode, setActiveMode] = useState("basic");
  const [activeTab, setActiveTab] = useState(() =>
    localStorage.getItem("df_resultVideoUrl") ? "result" : "input",
  );
  const [showCreditModal, setShowCreditModal] = useState(false);

  // Core Engine States
  const [motion, setMotion] = useState({
    style: "dolly",
    amplitude: 0.2,
    speed: 1.0,
    focus: 0.0,
    phase: 0.0,
    reverse: false,
    smooth: true,
    loop: true,
  });

  const [render, setRender] = useState({
    duration: 5,
    fps: 30,
    quality: 50,
    ssaa: 1.0,
    edge_fix: 5,
    invert_depth: 0.0,
    tiling_mode: "mirror",
  });

  const [effects, setEffects] = useState({
    dof: { enable: false, intensity: 1.0, start: 0.6, end: 1.0 },
    color: {
      enable: false,
      saturation: 110,
      contrast: 100,
      brightness: 100,
      sepia: 0,
    },
    vignette: { enable: false, intensity: 0.4, decay: 20.0 },
  });

  // File & API States
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    () => localStorage.getItem("df_previewUrl") || null,
  );
  const [resultVideoUrl, setResultVideoUrl] = useState(
    () => localStorage.getItem("df_resultVideoUrl") || null,
  );
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { user, updateCredits } = useAuthStore();
  const credits = user?.credits || 0;
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const currentCost =
    GENERATION_COST +
    (render.duration > 20 ? 10 : render.duration > 10 ? 5 : 0);

  const fetchHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(`${API_BASE_URL}/ai/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setHistory(await res.json());
    } catch (error) {
      console.error("Failed to load history", error);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prev) =>
          prev < 30
            ? prev + 2
            : prev < 80
              ? prev + 0.5
              : prev < 95
                ? prev + 0.1
                : prev,
        );
      }, 100);
    } else setProgress(0);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultVideoUrl(null);
      localStorage.removeItem("df_resultVideoUrl");
      setActiveTab("input");
      const reader = new FileReader();
      reader.onload = () => {
        try {
          localStorage.setItem("df_previewUrl", reader.result);
        } catch (e) {}
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile && !previewUrl)
      return alert("Please upload an image first!");
    if (credits !== null && credits < currentCost) {
      setShowCreditModal(true);
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in first.");

      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      } else {
        const res = await fetch(previewUrl);
        const blob = await res.blob();
        formData.append("file", blob, "cached_image.jpg");
      }

      const flattenedEffects = {
        dof_enable: effects.dof.enable,
        dof_intensity: effects.dof.intensity,
        dof_start: effects.dof.start,
        dof_end: effects.dof.end,
        vignette_enable: effects.vignette.enable,
        vignette_intensity: effects.vignette.intensity,
        vignette_decay: effects.vignette.decay,
        color_enable: effects.color.enable,
        color_saturation: effects.color.saturation,
        color_contrast: effects.color.contrast,
        color_brightness: effects.color.brightness,
        color_sepia: effects.color.sepia,
      };

      const engine_payload = {
        render,
        motion,
        effects: flattenedEffects,
        plan: user?.plan || user?.tier || "free",
      };
      formData.append("payload", JSON.stringify(engine_payload));
      formData.append("request_source", "workspace");

      const response = await fetch(`${API_BASE_URL}/ai/depthflow/generate-3d`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.status === 402) {
        setShowCreditModal(true);
        return;
      }
      if (!response.ok) throw new Error("Generation failed.");

      const remainingCredits = response.headers.get("X-Remaining-Credits");
      const savedVideoUrl = response.headers.get("X-Video-URL");
      const blob = await response.blob();
      const localVideoUrl = URL.createObjectURL(blob);

      setProgress(100);
      setResultVideoUrl(localVideoUrl);
      localStorage.setItem("df_resultVideoUrl", savedVideoUrl || localVideoUrl);

      if (remainingCredits) updateCredits(parseInt(remainingCredits, 10));
      setActiveTab("result");
      fetchHistory();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  const handleDownload = async (url) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "depthify_3d.mp4");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex-1 w-full bg-[#070514] text-white font-sans relative flex flex-col min-h-screen overflow-x-hidden">
      <CreditAlertModal
        isOpen={showCreditModal}
        onClose={() => setShowCreditModal(false)}
        currentCredits={credits}
      />

      {/* Percentage-Based Background Glows */}
      <div className="absolute top-0 left-0 lg:left-[20%] w-[80vw] lg:w-[40vw] h-[80vw] lg:h-[40vw] bg-purple-600/20 rounded-full blur-[100px] lg:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 lg:right-[20%] w-[100vw] lg:w-[45vw] h-[100vw] lg:h-[45vw] bg-indigo-600/10 rounded-full blur-[120px] lg:blur-[150px] pointer-events-none"></div>

      {/* Floor grid effect */}
      <div
        className="absolute bottom-0 left-0 w-full h-[20vh] pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(transparent 95%, #a855f7 100%), linear-gradient(90deg, transparent 95%, #a855f7 100%)",
          backgroundSize: "40px 40px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      ></div>

      {/* Main Content Area */}
      <main className="relative z-10 w-[95%] max-w-[95%] mx-auto md:pt-[12vh] pt-[5vh] pb-[5vh] flex flex-col flex-1 h-auto md:min-h-[80vh]">
        <h1 className="text-2xl md:text-3xl font-bold mt-[10vh] mb-[2vh] md:my-[1vh] tracking-wide text-center md:text-left flex flex-col items-center md:items-start">
          Create 3D Image
          <span className="text-sm md:text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)] px-1">
            Version 2.0✨
          </span>
        </h1>

        {/* ======================================================= */}
        {/* ================= LAYOUT SPLIT WRAPPER ================= */}
        {/* CHANGED: Added relative positioning so the left sidebar can be pinned to its exact boundaries */}
        <div className="relative flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 flex-1 h-full items-stretch w-full">
          {/* ================= INVISIBLE SPACER ================= */}
          {/* CHANGED: This invisible spacer keeps the layout intact on desktop, while letting the right workspace dictate the exact height of the row. */}
          <div className="hidden lg:block lg:w-[320px] xl:w-[380px] shrink-0 pointer-events-none"></div>

          {/* ================= LEFT SIDEBAR (CONTROLS) ================= */}
          {/* CHANGED: Added `lg:absolute lg:top-0 lg:bottom-0 lg:left-0 z-10` to pin the sidebar strictly to the flex container's height */}
          <aside className="w-full lg:w-[320px] xl:w-[380px] flex flex-col shrink-0 lg:absolute lg:top-0 lg:bottom-0 lg:left-0 z-10">
            <div className="bg-[#0b081a]/90 backdrop-blur-xl border-2 border-purple-500/40 rounded-2xl p-4 flex shadow-[0_0_30px_rgba(168,85,247,0.3)] flex-col h-full">
              {/* Basic / Advanced Toggle */}
              <div className="flex p-1 bg-[#151029] rounded-full mb-4 border border-white/5 shrink-0 shadow-inner">
                <button
                  onClick={() => setActiveMode("basic")}
                  className={`flex-1 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all truncate ${activeMode === "basic" ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-[0_2px_10px_rgba(168,85,247,0.4)] text-white" : "text-gray-400 hover:text-white"}`}
                >
                  Basic Mode
                </button>
                <button
                  onClick={() => setActiveMode("advanced")}
                  className={`flex-1 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all truncate ${activeMode === "advanced" ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-[0_2px_10px_rgba(168,85,247,0.4)] text-white" : "text-gray-400 hover:text-white"}`}
                >
                  Advanced Mode
                </button>
              </div>

              {/* Scrollable Container (Scrolls independently based on strict parent height) */}
              <div className="flex-1 min-h-0 overflow-x-hidden overflow-y-visible lg:overflow-y-auto custom-scrollbar lg:pr-2 pb-2">
                {activeMode === "basic" ? (
                  <div className="flex flex-col gap-4 animate-in fade-in">
                    {/* Render Compartment */}
                    <div className="bg-[#151029]/60 border border-white/5 rounded-xl p-4">
                      <h3 className="text-sm font-semibold mb-5 text-white">
                        Render
                      </h3>
                      <div className="space-y-6">
                        <SliderControl
                          label="Motion Amplitude"
                          value={motion.amplitude}
                          min={0.1}
                          max={3.0}
                          step={0.1}
                          onChange={(v) =>
                            setMotion({ ...motion, amplitude: v })
                          }
                        />
                        <SliderControl
                          label="Motion Speed"
                          value={motion.speed}
                          min={0.1}
                          max={3}
                          step={0.1}
                          onChange={(v) => setMotion({ ...motion, speed: v })}
                          unit="x"
                        />
                        <SliderControl
                          label="Video Length"
                          value={render.duration}
                          min={1}
                          max={15}
                          step={1}
                          onChange={(v) =>
                            setRender({ ...render, duration: v })
                          }
                          unit="s"
                        />
                      </div>
                    </div>

                    {/* Camera Motion Compartment */}
                    <div className="bg-[#151029]/60 border border-white/5 rounded-xl p-4">
                      <h3 className="text-sm font-semibold mb-4 text-white">
                        Camera Motion
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <MotionButton
                          icon={<ArrowRight size={14} />}
                          label="Dolly"
                          active={motion.style === "dolly"}
                          onClick={() =>
                            setMotion({ ...motion, style: "dolly" })
                          }
                        />
                        <MotionButton
                          icon={<Orbit size={14} />}
                          label="Orbit"
                          active={motion.style === "orbit"}
                          onClick={() =>
                            setMotion({ ...motion, style: "orbit" })
                          }
                        />
                        <MotionButton
                          icon={<ZoomIn size={14} />}
                          label="Zoom"
                          active={motion.style === "zoom"}
                          onClick={() =>
                            setMotion({ ...motion, style: "zoom" })
                          }
                        />
                        <MotionButton
                          icon={<MoveHorizontal size={14} />}
                          label="Horizontal"
                          active={motion.style === "horizontal"}
                          onClick={() =>
                            setMotion({ ...motion, style: "horizontal" })
                          }
                        />
                        <MotionButton
                          icon={<MoveVertical size={14} />}
                          label="Vertical"
                          active={motion.style === "vertical"}
                          onClick={() =>
                            setMotion({ ...motion, style: "vertical" })
                          }
                        />
                        <MotionButton
                          icon={<Circle size={14} />}
                          label="Circle"
                          active={motion.style === "circle"}
                          onClick={() =>
                            setMotion({ ...motion, style: "circle" })
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 animate-in fade-in">
                    {/* Render Compartment */}
                    <div className="bg-[#151029]/60 border border-white/5 rounded-xl p-4">
                      <h3 className="text-sm font-semibold mb-4 text-white">
                        Render
                      </h3>
                      <div className="space-y-5">
                        <SliderControl
                          label="Duration"
                          value={render.duration}
                          min={1}
                          max={30}
                          step={1}
                          onChange={(v) =>
                            setRender({ ...render, duration: v })
                          }
                          unit="s"
                        />
                        <SelectControl
                          label="SSAA"
                          value={render.ssaa}
                          options={[
                            { label: "1.0x", value: 1.0 },
                            { label: "1.5x", value: 1.5 },
                            { label: "2.0x", value: 2.0 },
                          ]}
                          onChange={(v) =>
                            setRender({ ...render, ssaa: parseFloat(v) })
                          }
                        />
                        <SelectControl
                          label="FPS"
                          value={render.fps}
                          options={[
                            { label: "24p", value: 24 },
                            { label: "30p", value: 30 },
                            { label: "60p", value: 60 },
                          ]}
                          onChange={(v) =>
                            setRender({ ...render, fps: parseInt(v) })
                          }
                        />
                      </div>
                    </div>

                    {/* Camera & Motions Compartment */}
                    <div className="bg-[#151029]/60 border border-white/5 rounded-xl p-4">
                      <h3 className="text-sm font-semibold mb-4 text-white">
                        Camera & Motions
                      </h3>
                      <div className="space-y-5">
                        <SelectControl
                          label="Style"
                          value={motion.style}
                          options={[
                            { label: "Orbit", value: "orbit" },
                            { label: "Dolly", value: "dolly" },
                            { label: "Zoom", value: "zoom" },
                            { label: "Horizontal", value: "horizontal" },
                            { label: "Vertical", value: "vertical" },
                            { label: "Circle", value: "circle" },
                            { label: "Dolly Zoom", value: "dolly_zoom" },
                          ]}
                          onChange={(v) => setMotion({ ...motion, style: v })}
                        />

                        <div className="flex gap-2 w-full">
                          <button
                            onClick={() =>
                              setMotion({ ...motion, reverse: !motion.reverse })
                            }
                            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors truncate ${motion.reverse ? "bg-purple-600/80 border border-purple-500 text-white" : "bg-white/5 border border-white/10 text-gray-300"}`}
                          >
                            Reverse
                          </button>
                          <button
                            onClick={() =>
                              setMotion({ ...motion, smooth: !motion.smooth })
                            }
                            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors truncate ${motion.smooth ? "bg-purple-600/80 border border-purple-500 text-white" : "bg-white/5 border border-white/10 text-gray-300"}`}
                          >
                            Smooth
                          </button>
                          <button
                            onClick={() =>
                              setMotion({ ...motion, loop: !motion.loop })
                            }
                            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors truncate ${motion.loop ? "bg-purple-600/80 border border-purple-500 text-white" : "bg-white/5 border border-white/10 text-gray-300"}`}
                          >
                            Loop
                          </button>
                        </div>

                        <SliderControl
                          label="Speed"
                          value={motion.speed}
                          min={0.5}
                          max={3}
                          step={0.1}
                          onChange={(v) =>
                            setMotion({ ...motion, speed: parseFloat(v) })
                          }
                        />

                        <SliderControl
                          label="Focus"
                          value={motion.focus}
                          min={0}
                          max={1}
                          step={0.05}
                          onChange={(v) => setMotion({ ...motion, focus: v })}
                        />
                      </div>
                    </div>

                    {/* Cinematic Effects Compartment */}
                    <div className="bg-[#151029]/60 border border-white/5 rounded-xl p-4">
                      <h3 className="text-sm font-semibold mb-4 text-white">
                        Cinematic Effects
                      </h3>
                      <div className="space-y-5">
                        <SliderControl
                          label="Intensity"
                          value={effects.dof.intensity}
                          min={0}
                          max={2}
                          step={0.1}
                          onChange={(v) =>
                            setEffects({
                              ...effects,
                              dof: { ...effects.dof, intensity: v },
                            })
                          }
                        />
                        <SelectControl
                          label="Bokeh Quality"
                          value={render.quality}
                          options={[
                            { label: "High (100)", value: 100 },
                            { label: "Medium (80)", value: 80 },
                            { label: "Low (50)", value: 50 },
                          ]}
                          onChange={(v) =>
                            setRender({ ...render, quality: parseInt(v) })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Section: Cost & Generate Button */}
              <div className="shrink-0 w-full mt-auto pt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center bg-[#151029]/80 border border-white/5 px-4 py-2.5 rounded-xl shadow-inner transition-colors duration-300">
                  <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                    <span className="text-yellow-400/80">⚡</span> Cost
                  </span>
                  <div className="flex items-center gap-1.5">
                    {render.duration > 10 && (
                      <span className="text-[10px] text-gray-500 line-through mr-1">
                        20
                      </span>
                    )}
                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.3)]">
                      {currentCost} Credits
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isLoading || (!selectedFile && !previewUrl)}
                  className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm md:text-base tracking-wide
                ${
                  isLoading || (!selectedFile && !previewUrl)
                    ? "bg-[#151029] text-gray-500 cursor-not-allowed border border-white/10"
                    : "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)]"
                }`}
                >
                  Generate 3D Image
                </button>
              </div>
            </div>
          </aside>

          {/* ================= RIGHT MAIN AREA (VIEWER) ================= */}
          <section className="flex-1 flex flex-col min-w-0 md:h-full md:min-h-0 w-full relative">
            {/* Asymmetrical Outer Background Glow */}
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-bl from-transparent via-purple-600/20 to-purple-500/50 blur-md pointer-events-none hidden md:block"></div>

            <div className="relative flex flex-col w-full h-full bg-gradient-to-bl from-white/5 via-purple-500/40 to-purple-400 p-[1px] rounded-2xl shadow-[-15px_15px_40px_-10px_rgba(168,85,247,0.4)]">
              <div className="bg-[#0b081a]/95 backdrop-blur-xl rounded-2xl p-4 md:p-6 flex flex-col h-full w-full relative z-10">
                {/* Input / Result Tabs */}
                <div className="flex p-1 bg-[#130c27] rounded-lg mb-5 border border-purple-500/20 w-fit shrink-0 shadow-inner mx-auto lg:mx-0">
                  <button
                    onClick={() => setActiveTab("input")}
                    className={`px-8 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === "input" ? "bg-[#3b1d75] text-purple-100 shadow-[0_2px_10px_rgba(88,33,167,0.4)]" : "text-gray-400 hover:text-white"}`}
                  >
                    Input
                  </button>
                  <button
                    onClick={() => resultVideoUrl && setActiveTab("result")}
                    disabled={!resultVideoUrl}
                    className={`px-8 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === "result" ? "bg-[#3b1d75] text-purple-100 shadow-[0_2px_10px_rgba(88,33,167,0.4)]" : "text-gray-400 hover:text-white"} ${!resultVideoUrl ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Result
                  </button>
                </div>

                {/* Upload Area / Viewer */}
                <div className="w-full min-h-[350px] lg:min-h-[500px] flex-1 bg-[#05030e] border border-purple-500/30 rounded-2xl flex flex-col relative shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
                  <div className="absolute inset-3 lg:inset-4 border border-dashed border-purple-500/40 rounded-xl pointer-events-none z-0"></div>

                  <div className="flex-1 w-full h-full relative group transition-colors flex flex-col items-center justify-center p-4 lg:p-6 z-10">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/png, image/jpeg, image/webp"
                    />

                    {isLoading ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-[#070514]/80 backdrop-blur-sm">
                        <Loader2 className="w-12 h-12 text-purple-400 animate-spin drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                        <span className="text-purple-300 font-mono text-xs lg:text-sm uppercase tracking-widest text-center px-4">
                          Raymarching Shaders...
                        </span>
                      </div>
                    ) : activeTab === "result" && resultVideoUrl ? (
                      <video
                        src={resultVideoUrl}
                        controls
                        autoPlay
                        loop
                        className="absolute inset-0 w-full h-full object-contain p-4 z-10"
                      />
                    ) : previewUrl ? (
                      <>
                        <img
                          src={previewUrl}
                          className="absolute inset-0 w-full h-full object-contain p-4 z-10"
                          alt="Preview"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewUrl(null);
                            setSelectedFile(null);
                          }}
                          className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-500 text-white rounded-lg backdrop-blur-md transition-colors z-20 border border-white/10"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current.click()}
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10 p-6"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>

                        <Upload
                          className="text-purple-200 w-12 h-12 mb-4 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                          strokeWidth={1.5}
                        />

                        <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white text-center tracking-wide">
                          Click to Upload Image
                        </h2>

                        <div className="flex items-center gap-3 text-purple-400/70 mb-5 w-full max-w-[280px] justify-center">
                          <div className="h-px flex-1 border-t-2 border-dotted border-purple-500/50"></div>
                          <span className="text-sm lg:text-base font-medium text-purple-300/80">
                            or Drag & Drop
                          </span>
                          <div className="h-px flex-1 border-t-2 border-dotted border-purple-500/50"></div>
                        </div>

                        <p className="text-xs lg:text-sm text-gray-300 font-medium bg-white/5 border border-white/10 px-6 py-2 rounded-full text-center shadow-inner">
                          Supports: JPG, PNG, WebP (Max 20MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-row gap-3 lg:gap-4 mt-5 shrink-0 w-full">
                  <button
                    onClick={() => handleDownload(resultVideoUrl)}
                    disabled={!resultVideoUrl && !isLoading}
                    className={`relative flex-1 py-3.5 rounded-xl overflow-hidden flex items-center justify-center gap-2 text-sm lg:text-lg font-bold transition-all tracking-wide
    ${
      !resultVideoUrl && !isLoading
        ? "bg-[#151029] text-gray-500 cursor-not-allowed border border-white/10"
        : "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)]"
    }`}
                  >
                    {isLoading && (
                      <div
                        className="absolute left-0 top-0 h-full bg-[#3b0764]/80 transition-all duration-300 ease-linear shadow-[0_0_20px_rgba(168,85,247,0.6)] z-0"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/50 shadow-[0_0_10px_white]" />
                      </div>
                    )}

                    <div className="relative z-10 flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5" />
                          <span className="hidden sm:inline">Processing</span>
                          {Math.round(progress)}%
                        </>
                      ) : (
                        <>
                          <Download
                            size={20}
                            className="lg:w-[22px] lg:h-[22px]"
                          />
                          Download
                        </>
                      )}
                    </div>
                  </button>
                  <button className="px-6 lg:px-8 flex items-center gap-2 bg-[#151029] border border-white/5 hover:bg-white/10 py-3.5 rounded-xl text-sm lg:text-base font-medium transition-colors shrink-0 text-white shadow-sm">
                    <Share2 size={18} className="lg:w-[20px] lg:h-[20px]" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-8 pt-6 border-t border-purple-500/20 w-full md:w-[87%] mx-auto flex flex-col gap-4">
            {/* Section Header */}
            <div className="flex items-center justify-between px-1">
              <h3 className="text-base lg:text-lg font-bold text-white flex items-center gap-2 tracking-wide">
                <div className="p-1.5 bg-purple-500/10 rounded-lg text-purple-400">
                  <Clock className="w-4 h-4" />
                </div>{" "}
                Recent Generations
              </h3>
              <span className="text-[10px] lg:text-xs font-medium text-purple-200 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 shadow-inner">
                {history.length} Total
              </span>
            </div>

            {/* Horizontal Scroll Container (Scrolls on mobile, static on desktop) */}
            <div className="flex gap-3 lg:gap-4 overflow-x-auto pb-4 custom-scrollbar w-full items-center snap-x">
              {/* Show exactly 5 videos */}
              {history.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setResultVideoUrl(item.video_url);
                    setActiveTab("result");
                  }}
                  className="w-28 lg:w-48 aspect-video bg-[#0b081a] rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] shrink-0 relative group transition-all duration-300 snap-start"
                >
                  {/* Video Thumbnail */}
                  <video
                    src={item.video_url}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    muted
                    loop
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => e.target.pause()}
                  />

                  {/* Premium Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070514]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2 pointer-events-none">
                    <span className="text-[10px] font-semibold text-purple-100 tracking-wider bg-purple-600/40 px-2 py-0.5 rounded backdrop-blur-md border border-purple-400/50 shadow-sm">
                      Preview
                    </span>
                  </div>
                </div>
              ))}

              {/* View All Button - Only shows if there are MORE than 5 total videos */}
              {history.length > 5 && (
                <button
                  onClick={() => navigate("/history")}
                  className="w-28 lg:w-48 aspect-video rounded-xl shrink-0 relative group border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-[#151029] hover:from-purple-800/40 hover:to-[#291456] backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(168,85,247,0.15)] snap-start"
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-400/10 to-pink-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>

                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black/40 border border-purple-500/40 flex items-center justify-center mb-1.5 lg:mb-2 group-hover:bg-purple-500/30 transition-all duration-300 relative z-10 shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-purple-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[10px] lg:text-xs font-bold text-purple-200 tracking-wider uppercase relative z-10 group-hover:text-white transition-colors">
                    View All
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.3); border-radius: 4px; }
      `,
        }}
      />
    </div>
  );
};

export default DepthFlowWorkspace;
