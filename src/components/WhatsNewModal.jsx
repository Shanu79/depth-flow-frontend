import React, { useState } from "react";
import {
  X,
  Smartphone,
  MonitorSmartphone,
  Zap,
  Gift,
  Coins,
  Code2,
  ToggleRight,
  Film,
  SlidersHorizontal,
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const WhatsNewModal = ({ isOpen = true, onClose }) => {
  const navigate = useNavigate();
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("mobile");

  if (!isOpen) return null;

  // --- LATEST UPDATE: MOBILE APP ---
  const mobileFeatures = [
    {
      id: "i.",
      icon: <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />,
      title: "Pocket-Sized Power",
      description:
        "Generate immersive 3D videos anytime, anywhere directly from your Android device.",
    },
    {
      id: "ii.",
      icon: <MonitorSmartphone className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />,
      title: "Cross-Platform Sync",
      description:
        "Your credits, workspaces, and generated videos sync seamlessly between web and mobile.",
    },
    {
      id: "iii.",
      icon: <Zap className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />,
      title: "Lightning Fast Creation",
      description:
        "Optimized mobile interface designed specifically for quick edits and instant rendering.",
    },
    {
      id: "iv.",
      icon: <Gift className="w-5 h-5 md:w-6 md:h-6 text-cyan-300" />,
      title: "Exclusive Mobile Perks",
      description:
        "Download the app today and unlock special bonus credits to kickstart your mobile journey.",
    },
  ];

  // --- PREVIOUS UPDATE: VERSION 2.0 ---
  const v2Features = [
    {
      id: "i.",
      icon: <Gift className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />,
      title: "Free Plan Introduced",
      description:
        "Start with a free render and explore Depthflow before upgrading.",
    },
    {
      id: "ii.",
      icon: <Coins className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />,
      title: "More Credits, Better Pricing",
      description:
        "Get higher value with increased credits and optimized pricing plans.",
    },
    {
      id: "iii.",
      icon: <Code2 className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />,
      title: "API Access for Developers",
      description:
        "Integrate 2D to 3D rendering directly into your apps, tools, or workflows.",
    },
    {
      id: "iv.",
      icon: <ToggleRight className="w-5 h-5 md:w-6 md:h-6 text-cyan-300" />,
      title: "New Workspace Experience",
      description:
        "Switch between Basic Mode for quick edits and Advanced Mode for full control.",
    },
    {
      id: "v.",
      icon: <Film className="w-5 h-5 md:w-6 md:h-6 text-indigo-300" />,
      title: "Extended Video Duration",
      description:
        "Create cinematic 3D videos up to 30 seconds with smooth depth motion.",
    },
    {
      id: "vi.",
      icon: <SlidersHorizontal className="w-5 h-5 md:w-6 md:h-6 text-purple-300" />,
      title: "Advanced Controls & Customization",
      description:
        "Fine-tune depth, motion, and rendering settings with multiple new options.",
    },
    {
      id: "vii.",
      icon: <Rocket className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />,
      title: "Faster Rendering Engine",
      description:
        "Optimized performance for quicker results and smoother processing.",
    },
  ];

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md selection:bg-purple-500/30">
      {/* 1. MODAL CONTAINER */}
      <div className="relative w-full max-w-[750px] max-h-[90vh] flex flex-col overflow-hidden bg-[#0a0f1c] border border-slate-700/50 rounded-3xl shadow-2xl shadow-cyan-900/20">
        {/* Internal Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors z-20 bg-slate-900/50 rounded-full p-1 md:bg-transparent md:p-0"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 2. SCROLLABLE INNER CONTENT */}
        <div className="relative z-10 w-full h-full overflow-y-auto custom-scrollbar p-6 py-10 md:p-12 flex flex-col items-center">
          
          {/* --- TAB SWITCHER --- */}
          <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-700/50 rounded-full p-1 mb-8 shadow-inner">
            <button
              onClick={() => setActiveTab("mobile")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "mobile"
                  ? "bg-slate-700 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              Latest: App Launch
            </button>
            <button
              onClick={() => setActiveTab("v2")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "v2"
                  ? "bg-slate-700 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              Version 2.0 Updates
            </button>
          </div>

          {/* =========================================
              VIEW 1: MOBILE APP LAUNCH
          ========================================== */}
          {activeTab === "mobile" && (
            <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="px-5 py-1.5 mb-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-400/30 text-cyan-50 text-xs md:text-sm font-medium shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                New App Launch 🎉
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center tracking-tight">
                Depthflow is now on Mobile! 📱
              </h2>
              <p className="text-slate-300 text-sm md:text-base text-center max-w-lg mb-10 font-light tracking-wide leading-relaxed">
                Experience the power of AI depth motion generation right from your pocket. Now officially available on Android.
              </p>

              <div className="w-full flex flex-col gap-5 md:gap-6 mb-10 max-w-xl">
                {mobileFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 md:gap-5 group">
                    <span className="text-slate-500 font-serif text-sm md:text-base min-w-[20px] pt-1 text-right">
                      {feature.id}
                    </span>
                    <div className="flex-shrink-0 p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all mt-0.5">
                      {feature.icon}
                    </div>
                    <div className="pt-0.5 leading-relaxed">
                      <span className="text-slate-100 font-semibold text-sm md:text-[15px] tracking-wide block sm:inline mr-2">
                        {feature.title} <span className="hidden sm:inline text-slate-500 font-normal mx-1">—</span>
                      </span>
                      <span className="text-slate-400 text-sm font-light">
                        {feature.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <a
                  href="https://play.google.com/store/apps/details?id=com.shin.depthflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3 rounded-full text-slate-900 bg-white shadow-[0_0_30px_-5px_rgba(34,211,238,0.5),0_0_30px_-5px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.7),0_0_40px_-5px_rgba(168,85,247,0.7)] hover:scale-105 transition-all duration-300"
                >
                  <svg viewBox="0 0 512 512" className="w-6 h-6">
                    <path fill="#4285f4" d="M32.6 15.6c-4.4 4.6-6.6 11.2-6.6 19.3v442.2c0 8.1 2.2 14.7 6.6 19.3l1.1 1.1 247-247v-2.1l-247-247-1.1 1.2z" />
                    <path fill="#ea4335" d="M362.4 345l-81.7-81.7v-2.1l81.7-81.7 1.2.7 97 55.1c27.6 15.7 27.6 41.4 0 57.1l-97 55.1-1.2-2.5z" />
                    <path fill="#fbbc04" d="M280.7 261.2l-248 248.1c8.4 9 22.8 10.3 40.5 0l207.5-118 81.7-81.7-81.7-81.7z" />
                    <path fill="#34a853" d="M321.2 131.2l-207.5-118c-17.7-10.3-32.1-9-40.5 0l248 248.1 81.7-81.7-81.7-48.4z" />
                  </svg>
                  <div className="flex flex-col text-left justify-center">
                    <span className="text-[10px] text-slate-600 font-bold uppercase leading-[1]">Get it on</span>
                    <span className="text-[16px] text-slate-900 font-extrabold tracking-tight leading-[1.1] mt-[1px]">Google Play</span>
                  </div>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full text-slate-200 font-medium text-sm border border-slate-600 hover:bg-slate-800 hover:text-white transition-colors duration-300"
                >
                  Continue to Web
                </button>
              </div>
            </div>
          )}

          {/* =========================================
              VIEW 2: VERSION 2.0 UPDATES
          ========================================== */}
          {activeTab === "v2" && (
            <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="px-5 py-1.5 mb-6 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs md:text-sm font-medium">
                Previous Update
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center tracking-tight">
                Depthflow 2.0 is Here 🚀
              </h2>
              <p className="text-slate-400 text-sm md:text-base text-center max-w-lg mb-10 font-light tracking-wide leading-relaxed">
                A faster, smarter, and more powerful way to turn your 2D images into stunning 3D motion videos.
              </p>

              <div className="w-full flex flex-col gap-5 md:gap-6 mb-10 max-w-xl opacity-90">
                {v2Features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 md:gap-5 group">
                    <span className="text-slate-500 font-serif text-sm md:text-base min-w-[20px] pt-1 text-right">
                      {feature.id}
                    </span>
                    <div className="flex-shrink-0 p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all mt-0.5">
                      {feature.icon}
                    </div>
                    <div className="pt-0.5 leading-relaxed">
                      <span className="text-slate-200 font-semibold text-sm md:text-[15px] tracking-wide block sm:inline mr-2">
                        {feature.title} <span className="hidden sm:inline text-slate-500 font-normal mx-1">—</span>
                      </span>
                      <span className="text-slate-400 text-sm font-light">
                        {feature.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <button
                  onClick={() => {
                    navigate("/workspace-2_0");
                    onClose();
                  }}
                  className="w-full sm:w-auto px-8 py-3 rounded-full text-slate-200 font-medium text-sm bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:text-white transition-colors duration-300"
                >
                  Go to Workspace
                </button>
                <button
                  onClick={() => {
                    navigate("/pricing");
                    onClose();
                  }}
                  className="w-full sm:w-auto px-8 py-3 rounded-full text-slate-400 font-medium text-sm hover:text-white transition-colors duration-300"
                >
                  View Pricing
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default WhatsNewModal;