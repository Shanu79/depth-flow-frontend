import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import useAuthStore from '../../stores/authStore.js';

// --- API FAQ DATA ---
const apiFaqs = [
  {
    question: "How does API work?",
    answer: "Depthflow API uses a simple credit-based system. Each API request consumes credits depending on the render type, duration, and quality. This allows you to scale usage based on your needs without fixed limitations."
  },
  {
    question: "How many credits are used per request?",
    answer: "A standard 3D render typically consumes 20 credits. Longer durations or higher-quality outputs may require additional credits."
  },
  {
    question: "Can I upgrade or downgrade my API plan anytime?",
    answer: "Yes, you can upgrade or downgrade your API plan at any time based on your usage. Changes take effect instantly or from the next billing cycle."
  },
  {
    question: "What happens if I run out of credits?",
    answer: "If your credits are exhausted, API requests will stop processing. You can either upgrade your plan or purchase additional credits to continue using the service."
  },
  {
    question: "Do unused credits roll over to the next month?",
    answer: "No, unused credits do not roll over. We recommend choosing a plan that matches your expected usage for maximum value."
  },
  {
    question: "Is the API suitable for commercial use?",
    answer: "Yes, all paid API plans allow commercial usage. You can integrate Depthflow into your apps, tools, or platforms and use the outputs for business purposes."
  },
  {
    question: "Is payment secure and available worldwide?",
    answer: "Yes, all payments are securely processed, and we support global payments in multiple currencies, making it easy to subscribe from anywhere in the world."
  }
];

// --- API PLANS DATA CONFIGURATION ---
const apiPlans = [
  {
    id: "starter",
    name: "Starter API",
    price: "99",
    period: "/month",
    credits: "10000",
    features: ["Upto 10K credits", "Standard speed", "Basic support"],
    isCustom: false,
    isHighlighted: false,
    styles: {
      wrapper: "border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.03)]",
      // Increased inset shadow opacity and size
      headerBadge: "border border-purple-500/40 bg-purple-500/[0.03] shadow-[inset_0_0_20px_rgba(168,85,247,0.25)]",
      headerText: "text-gray-100",
      featureText: "text-[#9a9aa8]",
      bullet: "bg-[#5a5a68]",
      buttonActive: "bg-[#9d5cff] hover:bg-[#8d4bef]",
      buttonDisabled: "bg-[#9d5cff]/50 cursor-not-allowed",
      buttonShadow: "shadow-[0_0_20px_rgba(157,92,255,0.25)]",
    }
  },
  {
    id: "growth",
    name: "Growth API",
    price: "249",
    period: "/month",
    credits: "30000",
    features: ["Upto 30K credits", "Faster processing", "Priority support"],
    isCustom: false,
    isHighlighted: false,
    styles: {
      wrapper: "border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.03)]",
      // Increased inset shadow opacity and size (Blue)
      headerBadge: "border border-blue-500/40 bg-blue-500/[0.03] shadow-[inset_0_0_20px_rgba(59,130,246,0.25)]",
      headerText: "text-gray-100",
      featureText: "text-[#9a9aa8]",
      bullet: "bg-[#5a5a68]",
      buttonActive: "bg-[#5294ff] hover:bg-[#4183ef]",
      buttonDisabled: "bg-[#5294ff]/50 cursor-not-allowed",
      buttonShadow: "shadow-[0_0_20px_rgba(82,148,255,0.25)]",
    }
  },
  {
    id: "pro",
    name: "Pro API",
    price: "499",
    period: "/month",
    credits: "65000",
    features: ["Upto 65K credits", "Fastest processing", "Commercial usage"],
    isCustom: false,
    isHighlighted: true, 
    styles: {
      wrapper: "border-purple-400/40 shadow-[0_0_50px_rgba(168,85,247,0.15)] z-10",
      // Added an inset white glow combined with its outer drop shadow
      headerBadge: "bg-gradient-to-r from-[#6b8cff] to-[#a45cff] shadow-[inset_0_0_20px_rgba(255,255,255,0.35),0_4px_15px_rgba(164,92,255,0.2)]",
      headerText: "text-white",
      featureText: "text-[#e2e2e8] font-medium",
      bullet: "bg-[#a45cff] shadow-[0_0_5px_#a45cff]",
      buttonActive: "bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] hover:from-[#7c3aed] hover:to-[#4f46e5]",
      buttonDisabled: "bg-gradient-to-r from-[#8b5cf6]/50 to-[#6366f1]/50 cursor-not-allowed",
      buttonShadow: "shadow-[0_0_25px_rgba(139,92,246,0.4)]",
    }
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom pricing",
    period: "",
    credits: null,
    features: ["Limit Less Credits", "Dedicated support"],
    isCustom: true, 
    customLink: "mailto:contact@depthflow.ai",
    isHighlighted: false,
    styles: {
      wrapper: "border-gray-600/30",
      // Increased inset shadow opacity and size (Gray/Silver)
      headerBadge: "border border-gray-600/40 bg-gray-600/[0.03] shadow-[inset_0_0_20px_rgba(255,255,255,0.15)]",
      headerText: "text-gray-100",
      featureText: "text-[#9a9aa8]",
      bullet: "bg-[#5a5a68]",
      buttonActive: "border border-gray-500/50 text-[#ceceda] hover:bg-white/5 hover:text-white shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] text-center block",
      buttonDisabled: "",
      buttonShadow: "",
    }
  }
];

// --- FAQ COMPONENT ---
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mt-8 max-w-3xl mx-auto w-full px-4 relative z-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-4 tracking-wide">
        API Pricing FAQs
      </h2>
      <p className="text-gray-400 text-center mb-12 text-sm md:text-sm">
        Everything you need to know about our API pricing and billing.
      </p>

      <div className="space-y-4">
        {apiFaqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-xl transition-all duration-300 ${
              openIndex === index
                ? 'bg-[#151124] border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                : 'bg-[#151124]/50 border-white/5 hover:border-white/10'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className="font-medium text-gray-200 text-base md:text-lg pr-4">
                {faq.question}
              </span>
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-purple-400 flex-shrink-0" />
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
                <div className="px-6 pb-6 text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4 mt-2">
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

// --- MAIN API PRICING COMPONENT ---
const ApiPricing = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  const isScheduledForCancel = user?.api_subscription_status && user.api_subscription_status.includes("Scheduled for cancellation");

  // Determines dynamic button state
  const getButtonState = (planName) => {
    const isCurrentPlan = user?.api_plan === planName;
    let text = "Subscribe";
    let disabled = false;

    if (loading) {
      text = "Processing...";
      disabled = true;
    } else if (isCurrentPlan) {
      if (isScheduledForCancel) {
        text = "Resume Subscription";
        disabled = false;
      } else {
        text = "Current Plan";
        disabled = true;
      }
    }

    return { text, disabled };
  };

  const handleSubscribe = (plan) => {
    navigate("/payment", {
      state: {
        planName: plan.name,
        price: plan.price,
        billingCycle: "monthly",
        credits: plan.credits,
      },
    });
  };

  return (
    <div className="w-full relative text-white font-sans flex flex-col items-center overflow-hidden pb-20">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Main Content */}
      <main className="flex-1 relative z-10 w-full px-4 py-8 lg:py-12 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12 shrink-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">API Pricing Plans</h1>
          <p className="text-gray-400 mt-3 text-sm md:text-base">Choose the right plan for your application</p>
        </div>

        {/* Pricing Grid - Changed to Grid for perfect single-line laptop layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto w-full pb-10">
          
          {apiPlans.map((plan) => {
            const { text: btnText, disabled: btnDisabled } = getButtonState(plan.name);
            const zIndexClass = plan.isHighlighted ? "relative z-10" : "";

            return (
              <div 
                key={plan.id} 
                className={`w-full bg-[#151124]/80 backdrop-blur-xl border rounded-[28px] p-6 lg:p-7 flex flex-col relative ${plan.styles.wrapper}`}
              >
                {/* Highlight Inner Glow */}
                {plan.isHighlighted && (
                  <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-purple-500/15 to-transparent rounded-t-[28px] pointer-events-none"></div>
                )}

                <div className={`rounded-[20px] py-2.5 mb-8 text-center ${plan.styles.headerBadge}`}>
                  <h3 className={`text-[15px] font-semibold tracking-wide ${plan.styles.headerText}`}>
                    {plan.name}
                  </h3>
                </div>

                <div className={`mb-6 flex ${plan.isCustom ? 'items-center h-[50px]' : 'items-baseline'} ${zIndexClass}`}>
                  {plan.isCustom ? (
                    <span 
                      className="text-[26px] xl:text-[28px] font-bold text-white tracking-tight leading-none"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {plan.price}
                    </span>
                  ) : (
                    <>
                      <span 
                        className="text-[38px] xl:text-[42px] font-bold text-white tracking-tight"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        ${plan.price}
                      </span>
                      <span className="text-[#7a7a8a] text-sm ml-1 font-medium">{plan.period}</span>
                    </>
                  )}
                </div>

                <div className={`h-px w-full bg-[#2a2a35] mb-7 ${zIndexClass}`}></div>
                
                <ul className={`flex-1 space-y-4 mb-9 ${zIndexClass}`}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center text-[14px] xl:text-[15px] ${plan.styles.featureText}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 ${plan.styles.bullet}`}></span> 
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.isCustom ? (
                  <a 
                    href={plan.customLink} 
                    className={`w-full py-3.5 rounded-2xl text-[15px] font-medium transition-colors mt-auto ${plan.styles.buttonActive}`}
                  >
                    Contact Us
                  </a>
                ) : (
                  <button 
                    onClick={() => !btnDisabled && handleSubscribe(plan)}
                    disabled={btnDisabled}
                    className={`w-full py-3.5 rounded-2xl text-white text-[15px] font-medium transition-all mt-auto ${zIndexClass} ${plan.styles.buttonShadow} ${
                      btnDisabled ? plan.styles.buttonDisabled : plan.styles.buttonActive
                    }`}
                  >
                    {btnText}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <FAQSection />

      </main>
    </div>
  );
};

export default ApiPricing;