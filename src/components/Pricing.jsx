import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  const plans = [
    {
      name: "Free",
      price: { monthly: "0", yearly: "0" },
      period: { monthly: "/ month", yearly: "/ month" },
      description: "2 images per month",
      features: [
        { text: "2 images per month", included: true },
        { text: "720p quality / No download", included: true, info: true }, // Added info icon placeholder logic if needed
        { text: "Watermarked output", included: false },
        { text: "Slow processing queue", included: true, icon: "clock" }, // Custom handling for 'clock' icon if strictly needed, otherwise sticking to check/x
        { text: "No commercial usage", included: false },
      ],
      highlight: false,
      buttonText: "Get Started Free",
      buttonStyle: "border-slate-600 text-white hover:bg-slate-800"
    },
    {
      name: "Basic",
      price: { monthly: "9.99", yearly: "99" },
      originalPrice: { monthly: null, yearly: "120" }, // For strikethrough
      period: { monthly: "/ month", yearly: "/ year" },
      description: "Best for hobbyists",
      features: [
        { text: "50 images per month", included: true, yearlyText: "600 images per year" },
        { text: "HD (1080p) quality", included: true },
        { text: "No watermark", included: true },
        { text: "Standard processing", included: true },
        { text: "Commercial use allowed", included: true },
      ],
      highlight: true, // For the Cyan glow
      badge: "MOST POPULAR",
      buttonText: "Subscribe Basic",
      buttonStyle: "bg-cyan-500 text-black hover:bg-cyan-400 border-none shadow-[0_0_20px_rgba(34,211,238,0.4)]"
    },
    {
      name: "Pro",
      price: { monthly: "19.99", yearly: "199" },
      originalPrice: { monthly: null, yearly: "240" },
      period: { monthly: "/ month", yearly: "/ year" },
      description: "For professionals",
      features: [
        { text: "120 images per month", included: true, yearlyText: "1,440 images per year" },
        { text: "4K UHD quality", included: true },
        { text: "No watermark", included: true },
        { text: "Fast processing queue", included: true, rocket: true },
        { text: "Commercial license included", included: true },
      ],
      highlight: false, // Pro has a specific purple border logic in styling
      isPro: true, // Custom flag for purple styling
      buttonText: "Subscribe Pro",
      buttonStyle: "bg-purple-600 text-white hover:bg-purple-500 border-none shadow-[0_0_20px_rgba(168,85,247,0.4)]"
    }
  ];

  return (
    <section id="pricing" className="px-6 md:px-20 py-20 scroll-mt-2 relative">
       {/* Section Header */}
       <div className="text-center mb-8">
         <h2 className="text-3xl md:text-4xl font-bold text-white">Flexible Pricing Plans</h2>
         <p className="text-gray-400">Choose the perfect plan for your creative needs.</p>
         
         {/* Toggle Switch */}
         <div className="flex justify-center items-center mt-4">
           <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
             Monthly Billing
           </span>
           
           <button 
             onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
             className="w-14 h-7 bg-slate-800 rounded-full p-1 relative transition-colors border border-slate-700 cursor-pointer"
           >
             <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`}></div>
           </button>
           
           <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
             Yearly Billing <span className="text-cyan-400 text-xs ml-1">(Save ~20%)</span>
           </span>
         </div>
       </div>

       {/* Cards Grid */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
         {plans.map((plan, idx) => (
           <div key={idx} className={`relative rounded-3xl p-8 flex flex-col border transition-all duration-300 group
             ${plan.highlight 
                ? 'bg-slate-900/80 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.15)]' 
                : plan.isPro 
                  ? 'bg-slate-900/80 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                  : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
             }
           `}>
             
             {/* Most Popular Badge */}
             {plan.badge && (
               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                 {plan.badge}
               </div>
             )}

             {/* Header */}
             <div className="text-center mb-8 border-b border-slate-800 pb-8">
                <h3 className="text-xl font-medium text-gray-300 mb-4">{plan.name}</h3>
                
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    ${plan.price[billingCycle]}
                  </span>
                  
                  {/* Strikethrough Price (Only for Yearly) */}
                  {billingCycle === 'yearly' && plan.originalPrice?.yearly && (
                    <span className="text-xl text-gray-500 line-through font-medium">
                      ${plan.originalPrice.yearly}
                    </span>
                  )}
                </div>
                
                <span className="text-gray-500 text-sm mt-2 block">
                  {plan.period[billingCycle]}
                </span>
             </div>

             {/* Features List */}
             <ul className="space-y-4 mb-8 flex-1">
               {plan.features.map((feature, fIdx) => (
                 <li key={fIdx} className="flex items-start gap-3 text-sm">
                   {/* Icons Logic */}
                   {feature.included ? (
                      <Check className={`w-5 h-5 shrink-0 ${plan.isPro ? 'text-purple-400' : 'text-cyan-400'}`} />
                   ) : (
                      <X className="w-5 h-5 shrink-0 text-gray-600" />
                   )}
                   
                   <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                     {/* Switch text for Yearly if applicable (e.g. 600 images/year) */}
                     {billingCycle === 'yearly' && feature.yearlyText 
                        ? feature.yearlyText 
                        : feature.text}
                   </span>
                 </li>
               ))}
             </ul>

             {/* Button */}
             <button className={`w-full py-3.5 rounded-full font-semibold transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] border ${plan.buttonStyle}`}>
               {plan.buttonText}
             </button>
           </div>
         ))}
       </div>
    </section>
  );
};

export default Pricing;