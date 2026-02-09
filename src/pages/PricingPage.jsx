import { useState } from 'react';
import { Check, X, Sparkles, Plus, Minus } from 'lucide-react';
import useAuthStore from '../stores/authStore.js';
import { useNavigate } from 'react-router-dom';

// --- FAQ DATA ---
const faqs = [
  {
    question: "What is included in the $3.99 Trial plan?",
    answer: "The Trial plan is a one-time preview option that lets you experience Depthflow’s workflow and output quality. It includes limited credits, 720p output, slow processing, and is meant for testing before upgrading."
  },
  {
    question: "Do unused credits expire?",
    answer: "Monthly plan credits reset at the end of each billing cycle. Credits cannot be carried forward to the next month. Trial credits are limited and meant for preview use only."
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer: "Yes. You can upgrade or change your plan anytime from your account dashboard. Upgrades take effect immediately without losing access."
  },
  {
    question: "Are there any hidden fees or extra charges?",
    answer: "No. Depthflow follows transparent pricing. You only pay for the plan you choose — there are no hidden fees or surprise charges."
  },
  {
    question: "Is my payment secure on Depthflow?",
    answer: "Yes. All payments on Depthflow are processed through secure and trusted payment gateways. We do not store your card or payment details on our servers."
  },
  {
    question: "Can I pay from any country or in any currency?",
    answer: "Yes. Depthflow supports global payments, allowing users from most countries to pay using their local currency and available payment methods."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can cancel your subscription anytime from your account dashboard. Your access will remain active until the end of your current billing period."
  }
];

// --- FAQ COMPONENT ---
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mt-32 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-slate-400 text-center mb-12">
        Everything you need to know about Depthflow AI.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`border rounded-xl transition-all duration-300 ${
              openIndex === index 
                ? 'bg-slate-900 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="font-medium text-slate-200 text-lg pr-4">
                {faq.question}
              </span>
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-purple-400 flex-shrink-0" />
              ) : (
                <Plus className="w-5 h-5 text-slate-500 flex-shrink-0" />
              )}
            </button>
            
            <div 
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4 mt-2">
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

// --- MAIN PRICING PAGE COMPONENT ---
const PricingPage = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Trial",
      price: { monthly: "3.99", yearly: "3.99" },
      period: { monthly: "/ One Time", yearly: "/ One Time" },
      description: "For testing waters",
      features: [
        { text: "120 credits only", included: true },
        { text: "No watermark", included: true },
        { text: "Slow processing queue", included: true },
        { text: "No commercial usage", included: true },
      ],
      highlight: false,
    },
    {
      name: "Basic",
      price: { monthly: "9.99", yearly: "99" },
      originalPrice: { monthly: null, yearly: "120" },
      period: { monthly: "/ month", yearly: "/ year" },
      description: "Most Popular",
      features: [
        { text: "550 credits per month", included: true, yearlyText: "6,600 credits per year" },
        { text: "2D to 3D Depth Motion", included: true },
        { text: "No watermark", included: true },
        { text: "MP4 HD (720p) quality", included: true },
        { text: "Standard processing", included: true },
        { text: "Commercial use allowed", included: true },
      ],
      highlight: true,
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
        { text: "MP4 upto (1080p) quality", included: true },
        { text: "Fast processing queue", included: true },
        { text: "Fully Commercial use", included: true },
        { text: "Premium Support", included: true },
      ],
      highlight: false,
    }
  ];

  return (
    <section className="min-h-screen bg-[#050511] px-4 md:px-20 py-20 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white my-4 tracking-tight">Flexible Pricing Plans</h2>
        <p className="text-slate-400 text-lg">Choose the perfect plan for your creative needs.</p>

        {/* Toggle Switch */}
        <div className="flex justify-center items-center mt-8 gap-4">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>
            Monthly
          </span>

          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={`w-14 h-8 rounded-full p-1 relative transition-colors border border-slate-700 cursor-pointer ${billingCycle === 'yearly' ? 'bg-purple-600 border-purple-500' : 'bg-slate-800'}`}
          >
            <div className={`w-6 h-6 rounded-full shadow-md transform transition-all duration-300 ${billingCycle === 'yearly' ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-400/80'}`}></div>
          </button>

          <span className={`text-sm font-medium flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-500'}`}>
            Yearly
            <span className="bg-green-500/10 text-green-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-500/20">
              20% off
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      {/* UPDATE: Removed 'items-center' to allow default stretch behavior */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, idx) => {
          const isCurrentPlan = user?.plan?.toLowerCase() === plan.name.toLowerCase();
          const isHighlighted = plan.highlight;
          
          const displayPrice = typeof plan.price === 'string' ? plan.price : plan.price[billingCycle];
          const displayPeriod = typeof plan.period === 'string' ? plan.period : plan.period[billingCycle];
          const displayOriginalPrice = plan.originalPrice ? plan.originalPrice[billingCycle] : null;

          return (
            <div 
              key={idx} 
              // UPDATE: Added 'h-full' here
              className={`relative group flex flex-col h-full transition-transform duration-300 
                ${isHighlighted ? 'scale-105 z-10' : 'scale-100 z-0'}
              `}
            >
              {/* Glow Background for Highlighted Card */}
              {isHighlighted && (
                <div className="absolute -inset-[1px] bg-gradient-to-b from-purple-500/40 via-purple-500/10 to-transparent rounded-3xl blur-md opacity-100 pointer-events-none" />
              )}
              {isHighlighted && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/10 blur-[60px] -z-10 rounded-full" />
              )}

              <div
                // UPDATE: Added 'h-full' here to ensure inner background fills the height
                className={`relative h-full rounded-3xl p-8 flex flex-col transition-all duration-300 backdrop-blur-sm
                  ${isHighlighted
                    ? 'bg-[#0b0b15] border border-purple-500/30 shadow-[0_0_50px_-10px_rgba(124,58,237,0.15)]' 
                    : 'bg-[#080810] border border-white/5 hover:border-white/10'
                  }
                `}
              >
                {/* Top Inner Glow for Highlighted */}
                {isHighlighted && (
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
                )}
                {isHighlighted && (
                  <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-purple-500/10 to-transparent rounded-t-3xl pointer-events-none" />
                )}

                {/* Sparkles */}
                {isHighlighted && (
                  <>
                    <Sparkles className="absolute top-5 right-6 text-purple-300 w-5 h-5 opacity-80 animate-pulse" />
                    <Sparkles className="absolute top-12 right-12 text-purple-300 w-3 h-3 opacity-60" />
                  </>
                )}

                {/* Card Header */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className={`text-lg font-medium ${isHighlighted ? 'text-white' : 'text-slate-300'}`}>
                      {plan.name}
                    </h3>
                    {plan.description && (
                      <div className="bg-slate-700/50 text-slate-200 text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold border border-slate-600/50 shadow-sm backdrop-blur-md">
                        {plan.description}
                      </div>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1">
                    {displayOriginalPrice && (
                        <span className="text-lg text-slate-500 line-through font-medium mr-1">
                            ${displayOriginalPrice}
                        </span>
                    )}
                    <span className="text-5xl font-bold text-white tracking-tight">
                      ${displayPrice}
                    </span>
                    <span className="text-slate-500 text-sm font-medium">
                      {displayPeriod}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    if (isCurrentPlan) return;
                    const creditAmount = plan.features[0].text.split(' ')[0];
                    navigate('/payment', {
                      state: {
                        planName: plan.name,
                        price: displayPrice,
                        billingCycle: billingCycle,
                        credits: creditAmount
                      }
                    });
                  }}
                  disabled={loading || isCurrentPlan}
                  className={`w-full py-3 rounded-xl font-medium text-sm transition-all mb-8 relative z-10
                    ${isHighlighted
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white shadow-lg shadow-purple-500/25 border-t border-white/20'
                      : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/5 hover:border-white/10'
                    }
                    ${isCurrentPlan ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
                  `}
                >
                  {loading
                    ? "Processing..."
                    : (isCurrentPlan ? "Current Plan" : "Get started")
                  }
                </button>

                {/* Divider */}
                <div className={`h-px w-full mb-8 ${isHighlighted ? 'bg-gradient-to-r from-transparent via-purple-500/20 to-transparent' : 'bg-slate-800'}`} />

                {/* Features List */}
                <div className="flex-1 relative z-10">
                  <ul className="space-y-4">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm group">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border 
                          ${feature.included 
                            ? (isHighlighted ? 'border-purple-500/50 bg-purple-500/10' : 'border-slate-700 bg-slate-800/50') 
                            : 'border-slate-800 bg-transparent'
                          }`}
                        >
                          {feature.included && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                        </div>

                        <span className={`${feature.included ? 'text-slate-300' : 'text-slate-600'}`}>
                          {billingCycle === 'yearly' && feature.yearlyText
                            ? feature.yearlyText
                            : feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ SECTION */}
      <FAQSection />
      
    </section>
  );
};

export default PricingPage;