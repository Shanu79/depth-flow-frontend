import React from 'react';
import { Check, AlertTriangle, Minus, Zap, DollarSign, Image as ImageIcon, Gift, Layers, Layout } from 'lucide-react';
import FullLogo from './FullLogo';

const ComparisonTable = () => {
  const features = [
    {
      name: "Working Experience",
      icon: <Layout className="w-4 h-4" />,
      depthflow: "Simple, fast, and clean workspace with smooth flow.",
      immersity: "Heavy interface with more loading and complex steps.",
      others: "Often cluttered dashboards and confusing workflows."
    },
    {
      name: "Starting Plans",
      icon: <DollarSign className="w-4 h-4" />,
      depthflow: "Starts at $3.99 / use anytime (flexible).",
      immersity: "$4.99 / monthly with limited flexibility.",
      others: "Mostly higher-priced plans or locked subscriptions."
    },
    {
      name: "Credit Usage & Quality",
      icon: <ImageIcon className="w-4 h-4" />,
      depthflow: "20 credits = 1 HQ video. No extra charges, any style.",
      immersity: "~60 credits (~$0.60) per output; higher quality costs more.",
      others: "Credit rules unclear; quality varies and often lower."
    },
    {
      name: "Speed & Results",
      icon: <Zap className="w-4 h-4" />,
      depthflow: "Easy to use, fast results, stable performance.",
      immersity: "Slower and heavy processing; delayed results.",
      others: "Performance varies; can be slow during peak times."
    },
    {
      name: "Offers & Discounts",
      icon: <Gift className="w-4 h-4" />,
      depthflow: "Regular coupon codes to reduce pricing further.",
      immersity: "No coupons or offers typically available.",
      others: "Discounts are rare or limited to special deals."
    },
    {
      name: "Overall",
      icon: <Layers className="w-4 h-4" />,
      depthflow: "Best balance of speed, price, and quality.",
      immersity: "Powerful tech but slower and pricey.",
      others: "Often complex, costly, and less beginner-friendly."
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
            Why creators choose Depthflow AI
          </p>
        </div>

        {/* --- DESKTOP GRID VIEW (Compact) --- */}
        <div className="hidden lg:grid grid-cols-[1.2fr_1.5fr_1.2fr_1.2fr] border border-white/10 rounded-2xl overflow-hidden bg-slate-900/40 backdrop-blur-md shadow-2xl">
          
          {/* Headers */}
          <div className="p-4 border-b border-r border-white/10 bg-slate-900/50"></div>

          {/* Depthflow Header */}
          <div className="p-4 border-b border-white/10 relative bg-gradient-to-b from-purple-900/40 to-slate-900/40 text-center">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
            <div className="flex items-center justify-center gap-2 text-white font-bold text-lg">
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
          {features.map((item, idx) => (
            <React.Fragment key={idx}>
              
              {/* Feature Label */}
              <div className="px-4 py-3 border-b border-r border-white/10 flex items-center gap-2 text-slate-300 text-xs font-semibold bg-slate-900/30">
                {item.icon && <span className="text-slate-500">{item.icon}</span>}
                {item.name}
              </div>

              {/* Depthflow Data */}
              <div className="px-4 py-3 border-b border-white/10 bg-purple-900/10 flex items-start gap-2 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
                <div className="mt-0.5 min-w-[16px] text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <p className="text-white text-xs font-medium leading-relaxed">
                  {item.depthflow}
                </p>
              </div>

              {/* Immersity Data */}
              <div className="px-4 py-3 border-b border-r border-white/10 flex items-start gap-2 opacity-50 hover:opacity-100 transition-opacity">
                 <div className="mt-0.5 min-w-[16px] text-yellow-500">
                    <AlertTriangle className="w-4 h-4" />
                 </div>
                 <p className="text-slate-300 text-xs leading-relaxed">
                   {item.immersity}
                 </p>
              </div>

              {/* Others Data */}
              <div className="px-4 py-3 border-b border-white/10 flex items-start gap-2 opacity-40 hover:opacity-100 transition-opacity">
                 <div className="mt-0.5 min-w-[16px] text-slate-500">
                    <Minus className="w-4 h-4" />
                 </div>
                 <p className="text-slate-400 text-xs leading-relaxed">
                   {item.others}
                 </p>
              </div>

            </React.Fragment>
          ))}
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
                  DEPTHFLOW
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

      </div>
    </section>
  );
};

export default ComparisonTable;