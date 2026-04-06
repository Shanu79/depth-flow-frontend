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

  // Check if their API plan is scheduled for cancellation
  const isScheduledForCancel = user?.api_subscription_status && user.api_subscription_status.includes("Scheduled for cancellation");

  // Helper function to generate dynamic button state and checkout logic
  const getButtonProps = (planName, price, credits) => {
    // Check if this is the user's current API plan
    const isCurrentPlan = user?.api_plan === planName;
    
    let text = "Subscribe";
    let disabled = false;

    if (loading) {
      text = "Processing...";
      disabled = true;
    } else if (isCurrentPlan) {
      if (isScheduledForCancel) {
        text = "Resume Subscription";
        disabled = false; // Allow them to click to resubscribe/resume
      } else {
        text = "Current Plan";
        disabled = true;
      }
    }

    return {
      text,
      disabled,
      onClick: () => {
        if (disabled) return;
        navigate("/payment", {
          state: {
            planName: planName,
            price: price,
            billingCycle: "monthly", // Defaulting to monthly based on your UI
            credits: credits,
          },
        });
      }
    };
  };

  // Generate props for each specific plan
  const starterProps = getButtonProps("Starter API", "99", "10000");
  const growthProps = getButtonProps("Growth API", "249", "30000");
  const proProps = getButtonProps("Pro API", "499", "65000");

  return (
    <div className="w-full relative text-white font-sans flex flex-col items-center overflow-hidden pb-20">
      
      {/* Background Glows to match the application's ambiance */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Main Content */}
      <main className="flex-1 relative z-10 w-full px-4 py-8 lg:py-12 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-12 shrink-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">API Pricing Plans</h1>
          <p className="text-gray-400 mt-3 text-sm md:text-base">Choose the right plan for your application</p>
        </div>

        {/* Pricing Grid */}
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
            <button 
              onClick={starterProps.onClick}
              disabled={starterProps.disabled}
              className={`w-full py-3.5 rounded-2xl text-white text-[15px] font-medium transition-colors shadow-[0_0_20px_rgba(157,92,255,0.25)] mt-auto 
                ${starterProps.disabled ? "bg-[#9d5cff]/50 cursor-not-allowed" : "bg-[#9d5cff] hover:bg-[#8d4bef]"}
              `}
            >
              {starterProps.text}
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
            <button 
              onClick={growthProps.onClick}
              disabled={growthProps.disabled}
              className={`w-full py-3.5 rounded-2xl text-white text-[15px] font-medium transition-colors shadow-[0_0_20px_rgba(82,148,255,0.25)] mt-auto
                ${growthProps.disabled ? "bg-[#5294ff]/50 cursor-not-allowed" : "bg-[#5294ff] hover:bg-[#4183ef]"}
              `}
            >
              {growthProps.text}
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
            <button 
              onClick={proProps.onClick}
              disabled={proProps.disabled}
              className={`w-full py-3.5 rounded-2xl text-white text-[15px] font-medium transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)] relative z-10 mt-auto
                ${proProps.disabled ? "bg-gradient-to-r from-[#8b5cf6]/50 to-[#6366f1]/50 cursor-not-allowed" : "bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] hover:from-[#7c3aed] hover:to-[#4f46e5]"}  
              `}
            >
              {proProps.text}
            </button>
          </div>

          {/* Enterprise Card */}
          <div className="w-full sm:w-[280px] bg-[#151124]/80 backdrop-blur-xl border border-gray-600/30 rounded-[28px] p-7 flex flex-col relative shrink-0">
            <div className="border border-gray-600/40 rounded-[20px] py-2.5 mb-8 text-center bg-gray-600/[0.03] shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
              <h3 className="text-[15px] font-semibold text-gray-100 tracking-wide">Enterprise</h3>
            </div>
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
            <a 
              href="mailto:contact@depthflow.ai" 
              className="w-full py-3.5 rounded-2xl border border-gray-500/50 text-[#ceceda] text-[15px] font-medium hover:bg-white/5 hover:text-white transition-colors shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] mt-auto text-center block"
            >
              Contact Us
            </a>
          </div>

        </div>

        {/* --- FAQ SECTION INJECTED HERE --- */}
        <FAQSection />

      </main>
    </div>
  );
};

export default ApiPricing;