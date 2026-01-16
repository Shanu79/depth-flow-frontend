import { useState } from 'react';
import { Check, X } from 'lucide-react';
import useAuthStore from '../stores/authStore.js';
import { useNavigate, useLocation } from 'react-router-dom';

const PricingPage = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const location = useLocation();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  const plans = [
     {
      name: "Trial",
      price: { monthly: "3.99", yearly: "3.99"},
      period: { monthly: "One Time", yearly: "One Time"},
      description: "150 credits",
      features: [
        { text: "150 credits", included: true },
        { text: "2D to 3D Depth Motion", included: true },
        { text: "No watermark", included: true },
        { text: "720p quality", included: true, info: true },
        { text: "Slow processing queue", included: true, icon: "clock" },
        { text: "No commercial usage", included: true },
      ],
      highlight: false,
      buttonText: "Subscribe Trial",
      buttonStyle: "border-slate-600 text-white hover:bg-slate-800"
    },
    {
      name: "Basic",
      price: { monthly: "9.99", yearly: "99" },
      originalPrice: { monthly: null, yearly: "120" }, 
      period: { monthly: "/ month", yearly: "/ year" },
      description: "Best for hobbyists",
      features: [
        { text: "550 credits per month", included: true, yearlyText: "6,600 credits per year" },
        { text: "2D to 3D Depth Motion", included: true },
        { text: "No watermark", included: true },
        { text: "MP4 upto HD (1080p) quality", included: true },
        { text: "Standard processing", included: true },
        { text: "Commercial use allowed", included: true },
      ],
      highlight: true, 
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
        { text: "1,200 credits per month", included: true, yearlyText: "14,400 credits per year" },
        { text: "2D to 3D Depth Motion", included: true },
        { text: "No watermark", included: true },
        { text: "MP4 upto UHD quality", included: true },
        { text: "Fast processing queue", included: true, icon: "rocket" },
        { text: "Commercial use allowed", included: true },
      ],
      highlight: false,
      isPro: true,
      buttonText: "Subscribe Pro",
      buttonStyle: "bg-purple-600 text-white hover:bg-purple-500 border-none shadow-[0_0_20px_rgba(168,85,247,0.4)]"
    }
  ];

  return (
    <section id="pricing" className="px-6 md:px-20 py-20 relative">
      {/* Section Header */}
      <div className="text-center my-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Flexible Pricing Plans</h2>
        <p className="text-gray-400">Choose the perfect plan for your creative needs.</p>

        {/* Toggle Switch */}
        <div className="flex justify-center items-center mt-6 gap-4">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
            Monthly Billing
          </span>

          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={`w-14 h-7 ${billingCycle === 'yearly' ? 'bg-cyan-400' : 'bg-slate-800'} rounded-full p-1 relative transition-colors border border-slate-700 cursor-pointer`}
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
        {plans.map((plan, idx) => {
          const isCurrentPlan = user?.plan?.toLowerCase() === plan.name.toLowerCase();

          return (
            <div key={idx} className={`relative rounded-3xl p-8 flex flex-col border transition-all duration-300 group
                ${plan.highlight
                ? 'bg-slate-900/80 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.15)]'
                : plan.isPro
                  ? 'bg-slate-900/80 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                  : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
              }
            `}>

              {/* Badge */}
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

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm">
                    {feature.included ? (
                      <Check className={`w-5 h-5 shrink-0 ${plan.isPro ? 'text-purple-400' : 'text-cyan-400'}`} />
                    ) : (
                      <X className="w-5 h-5 shrink-0 text-gray-600" />
                    )}

                    <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                      {billingCycle === 'yearly' && feature.yearlyText
                        ? feature.yearlyText
                        : feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => {
                  if (isCurrentPlan) return;
                  
                  const featureText = billingCycle === 'yearly' && plan.features[0].yearlyText
                    ? plan.features[0].yearlyText
                    : plan.features[0].text;
                    
                  const creditAmount = featureText.split(' ')[0];

                  navigate('/payment', {
                    state: {
                      planName: plan.name,
                      price: plan.price[billingCycle],
                      billingCycle: billingCycle,
                      credits: creditAmount // Sends "6,600" for yearly, "550" for monthly
                    }
                  });
                }}
                disabled={loading || isCurrentPlan}
                className={`w-full py-3.5 rounded-full font-semibold transition-all shadow-lg border 
                  ${isCurrentPlan 
                    ? 'bg-slate-700 text-gray-300 border-slate-600 cursor-not-allowed opacity-80' 
                    : `${plan.buttonStyle} hover:scale-[1.02] active:scale-[0.98]`
                  }`}
              >
                {loading 
                  ? "Please wait..." 
                  : (isCurrentPlan ? "Subscribed" : plan.buttonText)
                }
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PricingPage;