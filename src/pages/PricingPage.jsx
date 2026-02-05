import { useState } from 'react';
import { Check, X, Sparkles, Plus, Minus } from 'lucide-react';
import useAuthStore from '../stores/authStore.js';
import { useNavigate } from 'react-router-dom';

// --- FAQ DATA (UPDATED) ---
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
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

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
      buttonText: "Get started",
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
      badge: "Most Popular",
      buttonText: "Get started",
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
      buttonText: "Get started",
    }
  ];

  return (
    <section className="min-h-screen bg-slate-950 px-4 md:px-20 py-20 relative overflow-hidden font-sans">
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

      {/* Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-center mb-20">
        {plans.map((plan, idx) => {
          const isCurrentPlan = user?.plan?.toLowerCase() === plan.name.toLowerCase();
          const isHighlighted = plan.highlight;

          return (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300
                ${isHighlighted
                  ? 'bg-slate-900/80 border border-purple-500 shadow-[0_0_50px_rgba(139,92,246,0.3)] z-10 scale-105 md:-mt-4'
                  : 'bg-slate-900/40 border border-slate-800 hover:border-slate-700'
                }
              `}
            >
              {/* Most Popular Badge & Sparkles */}
              {isHighlighted && (
                <>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-800/80 border border-purple-500/30 backdrop-blur-md text-white text-xs font-medium px-4 py-1 rounded-full shadow-lg">
                    {plan.badge}
                  </div>
                  <Sparkles className="absolute top-6 right-6 text-purple-400 w-5 h-5 opacity-80 animate-pulse" />
                  <Sparkles className="absolute top-12 right-12 text-purple-300 w-3 h-3 opacity-60" />
                </>
              )}

              {/* Card Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg text-slate-300 font-medium">{plan.name}</h3>
                  {isHighlighted && <div className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">Most Popular</div>}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white tracking-tight">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="text-slate-500 text-sm font-medium">
                    {plan.period[billingCycle]}
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
                      price: plan.price[billingCycle],
                      billingCycle: billingCycle,
                      credits: creditAmount
                    }
                  });
                }}
                disabled={loading || isCurrentPlan}
                className={`w-full py-3 rounded-xl font-medium transition-all mb-8
                  ${isHighlighted
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/20'
                    : 'bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700'
                  }
                  ${isCurrentPlan ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'}
                `}
              >
                {loading
                  ? "Processing..."
                  : (isCurrentPlan ? "Current Plan" : plan.buttonText)
                }
              </button>

              {/* Features List */}
              <div className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm group">
                      <div className={`mt-0.5 rounded-full p-0.5 border flex items-center justify-center w-5 h-5 shrink-0
                        ${feature.included
                          ? 'border-slate-600 bg-slate-800'
                          : 'border-slate-800 bg-transparent opacity-50'
                        }`}>
                        {feature.included ? (
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        ) : (
                          <X className="w-3 h-3 text-slate-500" />
                        )}
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
          );
        })}
      </div>

      {/* FAQ SECTION */}
      <FAQSection />
      
    </section>
  );
};

export default PricingPage;