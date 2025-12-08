import React from 'react';

const Pricing = () => {
  return (
    <section id="pricing" className="px-6 md:px-20 py-20 scroll-mt-12">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
         
         {/* Basic Plan */}
         <div className="bg-slate-900/50 backdrop-blur border border-slate-700 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            <h3 className="text-gray-300 text-xl mb-2">Basic</h3>
            <h2 className="text-4xl text-white font-bold mb-8">free</h2>
            <ul className="space-y-4 text-gray-400 text-sm mb-8 flex-1">
              <li>5 images/mo</li>
              <li>Standard quality</li>
              <li>Community support</li>
              <li>Watermark</li>
            </ul>
            <button className="w-full py-3 rounded-full bg-slate-800 text-white border border-slate-600 hover:bg-slate-700 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              Choose Plan
            </button>
         </div>

         {/* Pro Plan (Highlighted) */}
         <div className="relative group">
           {/* Gradient Border Effect */}
           <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-400 to-purple-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
           <div className="relative bg-slate-900 rounded-3xl p-8 flex flex-col items-center text-center h-full">
              <h3 className="text-gray-300 text-xl mb-2">Pro</h3>
              <div className="flex items-end mb-8">
                 <h2 className="text-4xl text-white font-bold">$2.9</h2>
                 <span className="text-gray-500 text-sm mb-1">/monthly</span>
              </div>
              <ul className="space-y-4 text-gray-300 text-sm mb-8 flex-1">
                <li className="text-white">Unlimited images</li>
                <li>High-Fi 3D</li>
                <li>Priority support</li>
                <li>No watermark</li>
                <li>Commercial use</li>
                <li>API access</li>
              </ul>
              <button className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30">
                Choose Plan
              </button>
           </div>
         </div>

         {/* Enterprise Plan */}
         <div className="bg-slate-900/50 backdrop-blur border border-slate-700 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
            <h3 className="text-gray-300 text-xl mb-2">Enterprise</h3>
            <h2 className="text-4xl text-white font-bold mb-8">Custom</h2>
            <ul className="space-y-4 text-gray-400 text-sm mb-8 flex-1">
              <li>Dedicated account manager</li>
              <li>Custom AI models</li>
              <li>24/7 support</li>
              <li>Team seats</li>
              <li>White-labeling</li>
              <li>Advanced analytics</li>
            </ul>
            <button className="w-full py-3 rounded-full bg-slate-800 text-white border border-slate-600 hover:bg-slate-700 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              Choose Plan
            </button>
         </div>

       </div>
    </section>
  );
};

export default Pricing;