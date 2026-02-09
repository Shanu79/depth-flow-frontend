import React, { useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';

// --- FAQ DATA ---
const faqs = [
  {
    question: "What is included in the $3.99 Trial plan?",
    answer: "The Trial plan is a one-time preview option that includes 120 credits, no watermarks, and 720p output quality with standard processing speeds."
  },
  {
    question: "Do unused credits expire?",
    answer: "Yes, monthly credits reset at the end of each billing cycle. They do not roll over to the next month."
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer: "Yes, you can change your plan at any time from your account settings. Changes take effect immediately."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, the price you see is the price you pay. All taxes and fees are transparently displayed at checkout."
  }
];

// --- FAQ COMPONENT ---
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mt-32 max-w-3xl mx-auto px-4 pb-20">
      <h2 className="text-3xl font-bold text-center text-white mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-400 text-center mb-12">
        Everything you need to know about the service.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`border rounded-xl transition-all duration-300 overflow-hidden ${
              openIndex === index 
                ? 'bg-[#0f0f22] border-violet-500/30' 
                : 'bg-[#0a0a16] border-white/5 hover:border-white/10'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="font-medium text-gray-200 text-lg pr-4">
                {faq.question}
              </span>
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-violet-400 flex-shrink-0" />
              ) : (
                <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            <div 
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN PRICING PAGE ---
const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Trial",
      // Trial is always One Time, so we use the same value for both
      price: { monthly: "3.99", yearly: "3.99" },
      period: { monthly: "/ One Time", yearly: "/ One Time" },
      description: "Trial",
      features: [
        "120 credits only",
        "No watermark",
        "Slow processing queue",
        "No commercial usage"
      ],
      highlight: false,
      buttonStyle: "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
    },
    {
      name: "Basic Plan",
      // Yearly price calculated with approx 20% discount (9.99 * 12 * 0.8 = ~95.90)
      price: { monthly: "9.99", yearly: "95.90" },
      period: { monthly: "/ month", yearly: "/ year" },
      description: "Basic Plan",
      badge: "Most Popular",
      features: [
        "550 credits per month",
        "2D to 3D Depth Motion",
        "No watermark",
        "MP4 HD (720p) quality",
        "Standard processing",
        "Commercial use allowed"
      ],
      highlight: true,
      buttonStyle: "bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 text-white"
    },
    {
      name: "Pro Plan",
      // Yearly price calculated with approx 20% discount (19.99 * 12 * 0.8 = ~191.90)
      price: { monthly: "19.99", yearly: "191.90" },
      period: { monthly: "/ month", yearly: "/ year" },
      description: "Pro Plan",
      features: [
        "1,200 credits per month",
        "2D to 3D Depth Motion",
        "No watermark",
        "MP4 upto (1080p) quality",
        "Fast processing queue",
        "Fully Commercial use",
        "Premium Support"
      ],
      highlight: false,
      buttonStyle: "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050511] text-white font-sans selection:bg-violet-500 selection:text-white relative overflow-hidden">
      
      {/* Background Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-violet-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Side decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-violet-900/5 to-transparent skew-x-12 opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-900/5 to-transparent -skew-x-12 opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        
        {/* Header Section */}
        <div className="text-center mb-16 z-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
            Flexible Pricing Plans
          </h1>
          <p className="text-gray-400 text-lg">
            Choose the perfect plan for your creative needs.
          </p>

          {/* Toggle Switch */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-white/10 rounded-full p-1 transition-colors duration-300 hover:bg-white/15 cursor-pointer"
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isYearly ? 'translate-x-7' : 'translate-x-0'}`} 
              />
            </button>
            
            <span className={`text-sm font-medium flex items-center gap-2 ${isYearly ? 'text-white' : 'text-gray-400'}`}>
              Yearly 
              <span className="bg-[#1f3b2d] text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/20">
                20% off
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 flex flex-col h-full
                ${plan.highlight 
                  ? 'bg-[#0f0f22]/90 border-violet-500/50 shadow-[0_0_60px_-15px_rgba(124,58,237,0.3)] z-10 scale-105' 
                  : 'bg-[#0a0a16]/60 border-white/5 hover:border-white/10'
                }`}
            >
              {/* Highlight Glow Effect for Center Card */}
              {plan.highlight && (
                <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent rounded-2xl pointer-events-none" />
              )}

              {/* Card Header */}
              <div className="mb-8 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-400 font-medium text-sm">{plan.description}</h3>
                  {plan.badge && (
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {plan.badge}
                    </span>
                  )}
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    ${plan.price[isYearly ? 'yearly' : 'monthly']}
                  </span>
                  <span className="text-gray-500 text-sm font-medium">
                    {plan.period[isYearly ? 'yearly' : 'monthly']}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all mb-8 ${plan.buttonStyle}`}>
                Get started
              </button>

              {/* Features List */}
              <div className="space-y-5 flex-1">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 p-0.5 rounded-full border flex items-center justify-center w-5 h-5 shrink-0 
                      ${plan.highlight 
                        ? 'border-violet-500 text-violet-400 bg-violet-500/10' 
                        : 'border-gray-700 text-gray-400 bg-transparent'
                      }`}>
                       <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-gray-300 text-sm font-normal">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <FAQSection />

      </div>
    </div>
  );
};

export default PricingPage;