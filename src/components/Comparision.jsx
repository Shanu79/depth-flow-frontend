import React from 'react';
import { Check, AlertTriangle, Minus } from 'lucide-react';
import FullLogo from './FullLogo';

const ComparisonTable = () => {
  const features = [
    {
      name: "Working Experience",
      depthflow: "Simple, fast, and clean workspace with improved 2.0 interface and smooth workflow.",
      immersity: "Heavy interface with more loading and complex steps.",
      others: "Often cluttered dashboards and confusing workflows."
    },
    {
      name: "Free Plan & Value",
      depthflow: "Free plan available – Try before you buy. Create your first 3D video instantly.",
      immersity: "Limited free sample with restrictions and watermark.",
      others: "Free plans often very limited or locked behind signup."
    },
    {
      name: "Credit Usage & Quality",
      depthflow: "20 credits = 1 HQ video (MP4). No hidden costs, consistent quality.",
      immersity: "~60 credits per output (~$0.60), higher quality costs more.",
      others: "Credit rules unclear, quality varies and often lower."
    },
    {
      name: "Speed & Results",
      depthflow: "Faster rendering with optimized engine. (Version 2.0 upgrade).",
      immersity: "Slower processing with heavy pipeline.",
      others: "Performance varies, often slow during peak usage."
    },
    {
      name: "Features & Flexibility",
      depthflow: "API Access, Basic & Advanced Modes, up to 30 sec video, multiple options & continuous updates.",
      immersity: "Limited customization, mainly preset-based workflows.",
      others: "Basic features, less control and flexibility."
    },
    {
      name: "Output & Control",
      depthflow: "Full control over duration, quality, and style. Export in high-quality MP4.",
      immersity: "Different formats consume more credits and have limitations.",
      others: "Limited export options and lower customization."
    },
    {
      name: "Overall",
      depthflow: "Best balance of price, performance, flexibility, and developer access.",
      immersity: "Powerful but expensive and less flexible.",
      others: "Often complex, costly, or beginner-unfriendly."
    }
  ];

  return (
    <section className="min-h-screen py-12 px-4 relative overflow-hidden font-sans flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto relative z-10">
        
        {/* Compact Header */}
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Difference</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Why creators choose Depthflow AI Compared to other:
          </p>
        </div>

        {/* --- DESKTOP GRID VIEW (Compact) --- */}
        <div className="hidden lg:grid grid-cols-[1.2fr_1.5fr_1.2fr_1.2fr] border border-white/10 rounded-2xl overflow-hidden bg-slate-900/40 backdrop-blur-md shadow-2xl">
          
          {/* Headers */}
          <div className="p-4 border-b border-r border-white/10 bg-slate-900/50"></div>

          {/* Depthflow Header (Rounded Top & Border) */}
          <div className="p-4 relative bg-slate-800/60 text-center rounded-t-2xl border-t-2 border-x-2 border-purple-500/30 shadow-[0_-5px_20px_rgba(168,85,247,0.1)]">
            <div className="flex items-center justify-center gap-2 h-16">
               <FullLogo />
            </div>
          </div>

          {/* Competitor Headers */}
          <div className="p-4 border-b border-r border-white/10 flex items-center justify-center opacity-50 grayscale">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-1">
              immersity AI
            </h3>
          </div>
          <div className="p-4 border-b border-white/10 flex items-center justify-center opacity-40 grayscale">
            <h3 className="text-sm font-bold text-slate-400">Other Platforms</h3>
          </div>

          {/* Rows */}
          {features.map((item, idx) => {
            const isLast = idx === features.length - 1;
            
            return (
            <React.Fragment key={idx}>
              
              {/* Col 1: Feature Name */}
              <div className={`px-6 py-5 flex items-center gap-4 ${!isLast ? 'border-b border-white/5' : ''}`}>
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                  {idx + 1}
                </div>
                <span className="text-white font-semibold text-[15px]">{item.name}</span>
              </div>

              {/* UPDATED: Depthflow Data (Fixed Borders) */}
              <div className={`
                px-4 py-3 flex items-start gap-2 relative
                border-x-2 border-t-2 border-purple-500/30
                ${isLast ? 'rounded-b-2xl border-b-2 shadow-[0_5px_20px_rgba(168,85,247,0.1)]' : ''}
              `}>
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 pointer-events-none rounded-[inherit]"></div>
                <div className="mt-0.5 min-w-[16px] text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <p className="text-white text-xs font-medium leading-relaxed">
                  {item.depthflow}
                </p>
              </div>

              {/* Immersity Data */}
              <div className={`px-4 py-3 border-r border-white/5 flex items-start gap-2 opacity-50 hover:opacity-100 transition-opacity ${!isLast ? 'border-b' : ''}`}>
                  <div className="mt-0.5 min-w-[16px] text-yellow-500">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {item.immersity}
                  </p>
              </div>

              {/* Others Data */}
              <div className={`px-4 py-3 border-b border-white/10 flex items-start gap-2 opacity-40 hover:opacity-100 transition-opacity`}>
                  <div className="mt-0.5 min-w-[16px] text-slate-500">
                    <Minus className="w-4 h-4" />
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.others}
                  </p>
              </div>

            </React.Fragment>
          )})}
        </div>

        {/* --- MOBILE VIEW (Compact Stack) --- */}
        <div className="lg:hidden space-y-4">
          {features.map((item, idx) => (
            <div key={idx} className="rounded-xl bg-slate-900/50 border border-white/10 overflow-hidden backdrop-blur-sm text-xs">
              <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center gap-2 text-slate-200 font-bold">
                {item.icon} {item.name}
              </div>

              <div className="px-3 py-6 bg-gradient-to-r from-purple-900/20 to-slate-900/20 border-b border-white/5 relative">
                <div className="absolute top-2 right-2 text-[9px] font-bold text-cyan-300 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  DEPTHFLOW 2.0
                </div>
                <div className="flex gap-2">
                  <Check className="w-4 h-4 text-green-400 shrink-0" />
                  <p className="text-white font-medium pr-16">{item.depthflow}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-white/5 bg-black/20">
                <div className="p-3 opacity-50">
                    <p className="text-[9px] uppercase text-slate-500 font-bold mb-1">Immersity</p>
                    <p className="text-slate-400">{item.immersity}</p>
                </div>
                <div className="p-3 opacity-40">
                    <p className="text-[9px] uppercase text-slate-500 font-bold mb-1">Others</p>
                    <p className="text-slate-400">{item.others}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM GLOWING BANNER */}
        <div className="mt-8 mx-auto max-w-fit px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0f0b1d] via-[#201142] to-[#0f0b1d] border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.2)] flex items-center justify-center gap-3 relative z-10">
            <span className="text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">🚀</span>
            <p className="text-white text-sm md:text-[15px] tracking-wide">
                <span className="font-bold">DepthFlow AI – <span className="text-cyan-300">Version 2.0</span> :</span> More Power, More Value, More Possibilities.
            </p>
        </div>

      </div>
    </section>
  );
};

export default ComparisonTable;