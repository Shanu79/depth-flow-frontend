import React from 'react';
import { 
  X, 
  Gift, 
  Coins, 
  Code2, 
  ToggleRight, 
  Film, 
  SlidersHorizontal, 
  Rocket 
} from 'lucide-react';

const WhatsNewModal = ({ isOpen = true, onClose }) => {
  if (!isOpen) return null;

  const features = [
    {
      id: 'i.',
      icon: <Gift className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />,
      title: "Free Plan Introduced",
      description: "Start with a free render and explore Depthflow before upgrading"
    },
    {
      id: 'ii.',
      icon: <Coins className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />,
      title: "More Credits, Better Pricing",
      description: "Get higher value with increased credits and optimized pricing plans"
    },
    {
      id: 'iii.',
      icon: <Code2 className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />,
      title: "API Access for Developers",
      description: "Integrate 2D to 3D rendering directly into your apps, tools, or workflows"
    },
    {
      id: 'iv.',
      icon: <ToggleRight className="w-5 h-5 md:w-6 md:h-6 text-cyan-300" />,
      title: "New Workspace Experience",
      description: "Switch between Basic Mode for quick edits and Advanced Mode for full control"
    },
    {
      id: 'v.',
      icon: <Film className="w-5 h-5 md:w-6 md:h-6 text-indigo-300" />,
      title: "Extended Video Duration",
      description: "Create cinematic 3D videos up to 30 seconds with smooth depth motion"
    },
    {
      id: 'vi.',
      icon: <SlidersHorizontal className="w-5 h-5 md:w-6 md:h-6 text-purple-300" />,
      title: "Advanced Controls & Customization",
      description: "Fine-tune depth, motion, and rendering settings with multiple new options"
    },
    {
      id: 'vii.',
      icon: <Rocket className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />,
      title: "Faster Rendering Engine",
      description: "Optimized performance for quicker results and smoother processing"
    }
  ];

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm selection:bg-purple-500/30">
      
      {/* 1. MODAL CONTAINER - Fixed width and height constraints */}
      <div className="relative w-full max-w-[750px] max-h-[90vh] flex flex-col overflow-hidden bg-[#0a0f1c] border border-slate-700/50 rounded-3xl shadow-2xl shadow-purple-900/20">
        
        {/* Internal Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Subtle Stars/Dots */}
        <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full opacity-50 shadow-[0_0_10px_white] pointer-events-none"></div>
        <div className="absolute bottom-32 right-24 w-1.5 h-1.5 bg-white rounded-full opacity-30 blur-[1px] pointer-events-none"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-cyan-200 rounded-full opacity-40 shadow-[0_0_10px_cyan] pointer-events-none"></div>

        {/* Close Button (Kept absolute to the top right of the whole modal) */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors z-20 bg-slate-900/50 rounded-full p-1 md:bg-transparent md:p-0"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 2. SCROLLABLE INNER CONTENT - Allows scrolling if screen is too small */}
        <div className="relative z-10 w-full h-full overflow-y-auto custom-scrollbar p-6 py-10 md:p-12 flex flex-col items-center">
          
          {/* Version Pill */}
          <div className="px-5 py-1.5 mb-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-50 text-xs md:text-sm font-medium shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            Version 2.0 Update
          </div>

          {/* Headers */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center tracking-tight">
            Depthflow 2.0 is Here 🚀
          </h2>
          <p className="text-slate-300 text-sm md:text-base text-center max-w-lg mb-10 font-light tracking-wide leading-relaxed">
            A faster, smarter, and more powerful way to turn your 2D images into stunning 3D motion videos.
          </p>

          {/* Features List */}
          <div className="w-full flex flex-col gap-5 md:gap-6 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 md:gap-5 group">
                {/* Roman Numeral */}
                <span className="text-slate-500 font-serif text-sm md:text-base min-w-[20px] pt-1 text-right">
                  {feature.id}
                </span>
                
                {/* Icon */}
                <div className="flex-shrink-0 p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all mt-0.5">
                  {feature.icon}
                </div>
                
                {/* Text Content */}
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

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            {/* Primary Glowing Button */}
            <button className="w-full sm:w-auto px-8 py-3 rounded-full text-slate-900 font-bold text-sm
                             bg-gradient-to-r from-cyan-200 via-blue-100 to-purple-200 
                             shadow-[0_0_30px_-5px_rgba(34,211,238,0.5),0_0_30px_-5px_rgba(168,85,247,0.5)] 
                             hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.7),0_0_40px_-5px_rgba(168,85,247,0.7)] 
                             hover:scale-105 transition-all duration-300">
              Explore Now
            </button>
            
            {/* Secondary Outline Button */}
            <button className="w-full sm:w-auto px-8 py-3 rounded-full text-slate-200 font-medium text-sm 
                             border border-slate-600 hover:bg-slate-800 hover:text-white
                             transition-colors duration-300">
              View Pricing
            </button>
          </div>

          {/* Learn More Link */}
          <a href="#learn-more" className="mt-6 text-sm text-slate-400 underline decoration-slate-600 underline-offset-4 hover:text-slate-200 transition-colors">
            Learn More
          </a>

        </div>
      </div>
    </div>
  );
};

export default WhatsNewModal;