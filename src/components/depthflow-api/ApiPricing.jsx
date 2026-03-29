import React from 'react';

const ApiPricing = () => {
  return (
    <div className="flex w-full bg-[#070514] text-white font-sans relative">
      
      {/* Background Glows to match the application's ambiance */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Main Content - Removed justify-center to fix top cutoff, added padding for correct spacing */}
      <main className="flex-1 relative z-10 w-full px-4 sm:px-8 py-8 lg:py-12 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-12 shrink-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">API Pricing Plans</h1>
          <p className="text-gray-400 mt-3 text-sm md:text-base">Choose the right plan for your application</p>
        </div>

        {/* Pricing Grid - Added pb-10 to ensure shadows aren't cut off at the bottom of the scroll */}
        <div className="flex flex-wrap justify-center gap-6 max-w-[1200px] mx-auto w-full pb-10">
          
          {/* Starter API Card */}
          <div className="w-full sm:w-[280px] bg-[#151124]/80 backdrop-blur-xl border border-purple-500/20 rounded-[28px] p-7 flex flex-col shadow-[0_0_40px_rgba(168,85,247,0.03)] relative shrink-0">
            <div className="border border-purple-500/40 rounded-[20px] py-2.5 mb-8 text-center bg-purple-500/[0.03] shadow-[inset_0_0_15px_rgba(168,85,247,0.05)]">
              <h3 className="text-[15px] font-semibold text-gray-100 tracking-wide">Starter API</h3>
            </div>
            <div className="mb-6 flex items-baseline">
              <span className="text-[42px] font-bold text-white tracking-tight">$99</span>
              <span className="text-[#7a7a8a] text-sm ml-1 font-medium">/month</span>
            </div>
            <div className="h-px w-full bg-[#2a2a35] mb-7"></div>
            <ul className="flex-1 space-y-4 mb-9">
              <li className="flex items-center text-[#9a9aa8] text-[15px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5a5a68] mr-3"></span> Upto 10K credits
              </li>
              <li className="flex items-center text-[#9a9aa8] text-[15px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5a5a68] mr-3"></span> Standard speed
              </li>
              <li className="flex items-center text-[#9a9aa8] text-[15px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5a5a68] mr-3"></span> Basic support
              </li>
            </ul>
            <button className="w-full py-3.5 rounded-2xl bg-[#9d5cff] hover:bg-[#8d4bef] text-white text-[15px] font-medium transition-colors shadow-[0_0_20px_rgba(157,92,255,0.25)] mt-auto">
              Subscribe
            </button>
          </div>

          {/* Growth API Card */}
          <div className="w-full sm:w-[280px] bg-[#151124]/80 backdrop-blur-xl border border-blue-500/20 rounded-[28px] p-7 flex flex-col shadow-[0_0_40px_rgba(59,130,246,0.03)] relative shrink-0">
            <div className="border border-blue-500/40 rounded-[20px] py-2.5 mb-8 text-center bg-blue-500/[0.03] shadow-[inset_0_0_15px_rgba(59,130,246,0.05)]">
              <h3 className="text-[15px] font-semibold text-gray-100 tracking-wide">Growth API</h3>
            </div>
            <div className="mb-6 flex items-baseline">
              <span className="text-[42px] font-bold text-white tracking-tight">$249</span>
              <span className="text-[#7a7a8a] text-sm ml-1 font-medium">/month</span>
            </div>
            <div className="h-px w-full bg-[#2a2a35] mb-7"></div>
            <ul className="flex-1 space-y-4 mb-9">
              <li className="flex items-center text-[#9a9aa8] text-[15px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5a5a68] mr-3"></span> Upto 27K credits
              </li>
              <li className="flex items-center text-[#9a9aa8] text-[15px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5a5a68] mr-3"></span> Faster processing
              </li>
              <li className="flex items-center text-[#9a9aa8] text-[15px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5a5a68] mr-3"></span> Priority support
              </li>
            </ul>
            <button className="w-full py-3.5 rounded-2xl bg-[#5294ff] hover:bg-[#4183ef] text-white text-[15px] font-medium transition-colors shadow-[0_0_20px_rgba(82,148,255,0.25)] mt-auto">
              Subscribe
            </button>
          </div>

          {/* Pro API Card (Highlighted) */}
          <div className="w-full sm:w-[280px] bg-[#151124]/80 backdrop-blur-xl border border-purple-400/40 rounded-[28px] p-7 flex flex-col shadow-[0_0_50px_rgba(168,85,247,0.15)] relative z-10 shrink-0">
            {/* Top inner glow for highlighted card */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-purple-500/15 to-transparent rounded-t-[28px] pointer-events-none"></div>

            <div className="bg-gradient-to-r from-[#6b8cff] to-[#a45cff] rounded-[20px] py-2.5 mb-8 text-center shadow-[0_4px_15px_rgba(164,92,255,0.2)]">
              <h3 className="text-[15px] font-semibold text-white tracking-wide">Pro API</h3>
            </div>
            <div className="mb-6 flex items-baseline relative z-10">
              <span className="text-[42px] font-bold text-white tracking-tight">$499</span>
              <span className="text-[#7a7a8a] text-sm ml-1 font-medium">/month</span>
            </div>
            <div className="h-px w-full bg-[#2a2a35] mb-7 relative z-10"></div>
            <ul className="flex-1 space-y-4 mb-9 relative z-10">
              <li className="flex items-center text-[#e2e2e8] text-[15px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a45cff] mr-3 shadow-[0_0_5px_#a45cff]"></span> Upto 60K credits
              </li>
              <li className="flex items-center text-[#e2e2e8] text-[15px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a45cff] mr-3 shadow-[0_0_5px_#a45cff]"></span> Fastest processing
              </li>
              <li className="flex items-center text-[#e2e2e8] text-[15px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a45cff] mr-3 shadow-[0_0_5px_#a45cff]"></span> Commercial usage
              </li>
            </ul>
            <button className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] hover:from-[#7c3aed] hover:to-[#4f46e5] text-white text-[15px] font-medium transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)] relative z-10 mt-auto">
              Subscribe
            </button>
          </div>

          {/* Enterprise Card */}
          <div className="w-full sm:w-[280px] bg-[#151124]/80 backdrop-blur-xl border border-gray-600/30 rounded-[28px] p-7 flex flex-col relative shrink-0">
            <div className="border border-gray-600/40 rounded-[20px] py-2.5 mb-8 text-center bg-gray-600/[0.03] shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
              <h3 className="text-[15px] font-semibold text-gray-100 tracking-wide">Enterprise</h3>
            </div>
            {/* Fixed height to align with $ price layout */}
            <div className="mb-6 flex items-center h-[50px]">
              <span className="text-[28px] font-bold text-white tracking-tight leading-none">Custom pricing</span>
            </div>
            <div className="h-px w-full bg-[#2a2a35] mb-7"></div>
            <ul className="flex-1 space-y-4 mb-9">
              <li className="flex items-center text-[#9a9aa8] text-[15px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5a5a68] mr-3"></span> Limit Less Credits
              </li>
              <li className="flex items-center text-[#9a9aa8] text-[15px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5a5a68] mr-3"></span> Dedicated support
              </li>
            </ul>
            <button className="w-full py-3.5 rounded-2xl border border-gray-500/50 text-[#ceceda] text-[15px] font-medium hover:bg-white/5 hover:text-white transition-colors shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] mt-auto">
              Contact Us
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ApiPricing;