import { useState, useRef } from "react";
import {
  Check,
  Plus,
  Minus,
  Calendar,
  Infinity,
  AlertCircle,
} from "lucide-react";
import useAuthStore from "../stores/authStore.js";
import { useNavigate } from "react-router-dom";

// --- REUSABLE SPARKLE COMPONENT ---
function Sparkle({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

// --- ADD-ON CREDIT PACK COMPONENT ---
const AddOnCreditPack = ({ navigate }) => {
  return (
    <div className="mt-24 md:mt-32 w-full max-w-5xl mx-auto px-4 relative">
      {/* Main Title */}
      <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 md:mb-10 relative z-10">
        Add-on Credit Pack
      </h3>

      {/* Credit Pack Pill Component */}
      <div className="relative z-10 w-full bg-gradient-to-r from-[#1E152A] to-[#120F21] rounded-3xl md:rounded-full p-1 shadow-2xl shadow-purple-900/20">
        <div className="bg-[#161123] rounded-[22px] md:rounded-full p-6 md:p-8 md:pr-10 flex flex-col md:flex-row items-center justify-between border border-purple-500/20 relative overflow-hidden gap-6 md:gap-0">
          {/* Top Right Gradient Glow */}
          <div className="absolute top-[-50%] right-[-20%] w-[80%] md:w-[60%] h-[150%] bg-gradient-to-bl from-purple-600/40 via-indigo-600/20 to-transparent blur-[60px] rounded-full pointer-events-none"></div>

          {/* Subtle sparkles */}
          <Sparkle className="absolute top-4 right-6 md:right-16 w-3 h-3 text-white opacity-70 animate-pulse" />
          <Sparkle className="absolute top-8 right-10 md:right-10 w-2 h-2 text-white opacity-50" />

          {/* Left Section: Price */}
          <div className="flex flex-col relative z-20 text-center md:text-left min-w-fit">
            <span className="text-purple-300/80 text-sm font-medium mb-1">
              Credit Pack
            </span>
            <div className="flex items-baseline justify-center md:justify-start">
              <span className="text-4xl font-bold text-white mr-2">$15</span>
              <span className="text-purple-300/70 text-sm font-medium whitespace-nowrap">
                / One Time
              </span>
            </div>
          </div>

          {/* Divider (Mobile Only) */}
          <div className="md:hidden w-full h-px bg-white/5" />

          {/* Divider (Desktop Only) */}
          <div className="hidden md:block w-px h-12 bg-white/10 mx-6" />

          {/* Middle Section: Details & Credits */}
          <div className="flex flex-col relative z-20 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 mb-2 text-purple-300/70 text-xs md:text-sm">
              <div className="flex items-center whitespace-nowrap">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>One-time purchase</span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <Infinity className="w-4 h-4 mr-1.5" />
                <span>No expiration</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight whitespace-nowrap">
              900 Credits
            </h2>
          </div>

          {/* Right Section: Buy Button */}
          <div className="w-full md:w-auto relative z-20">
            <button
              onClick={() =>
                navigate("/payment", {
                  state: {
                    planName: "Credit Pack",
                    price: "15",
                    billingCycle: "onetime",
                    credits: "900",
                  },
                })
              }
              className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-3 px-8 md:px-10 rounded-xl md:rounded-full transition-all duration-200 shadow-lg shadow-purple-600/30 active:scale-95 whitespace-nowrap"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FAQ DATA ---
const faqs = [
  {
    question: "Do unused credits expire?",
    answer:
      "Monthly plan credits reset at the end of each billing cycle. Credits cannot be carried forward to the next month. Trial credits are limited and meant for preview use only.",
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer:
      "Yes. You can upgrade or change your plan anytime from your account dashboard. Upgrades take effect immediately without losing access.",
  },
  {
    question: "Are there any hidden fees or extra charges?",
    answer:
      "No. Depthflow follows transparent pricing. You only pay for the plan you choose — there are no hidden fees or surprise charges.",
  },
  {
    question: "Is my payment secure on Depthflow?",
    answer:
      "Yes. All payments on Depthflow are processed through secure and trusted payment gateways. We do not store your card or payment details on our servers.",
  },
  {
    question: "Can I pay from any country or in any currency?",
    answer:
      "Yes. Depthflow supports global payments, allowing users from most countries to pay using their local currency and available payment methods.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can cancel your subscription anytime from your account dashboard. Your access will remain active until the end of your current billing period.",
  },
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
                ? "bg-slate-900 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
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
                openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
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
  const [billingCycle, setBillingCycle] = useState("yearly"); // 'monthly' or 'yearly'
  const IS_MAINTENANCE = false;

  // 1. Create a reference for the Credit Pack section
  const creditPackRef = useRef(null);

  // 2. Helper function to handle scrolling
  const scrollToCreditPack = () => {
    creditPackRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // --- HELPER: Check Cancellation Status ---
  const isScheduledForCancel =
    user?.subscription_status &&
    user.subscription_status.includes("Scheduled for cancellation");

  const plans = [
    {
      name: "Free",
      price: { monthly: "0", yearly: "0" },
      checkoutPrice: { monthly: "0", yearly: "0" },
      period: { monthly: "/ One Time", yearly: "/ One Time" },
      description: "For testing waters",
      features: [
        { text: "20 credits only", included: true },
        { text: "Watermarked result", included: true },
        { text: "Slow processing queue", included: true },
        { text: "No commercial usage", included: true },
      ],
      highlight: false,
    },
    {
      name: "Basic",
      price: { monthly: "10", yearly: "9" }, // Displayed as $9/month
      checkoutPrice: { monthly: "10", yearly: "108" }, // Billed as $108
      originalPrice: { monthly: null, yearly: "10" }, // Crossed out $10
      period: { monthly: "/ month", yearly: "/ month" },
      description: "Most Popular",
      features: [
        {
          text: "600 credits per month",
          included: true,
          yearlyText: "7,200 credits per year",
        },
        { text: "2D to 3D Depth Motion", included: true },
        { text: "No watermark", included: true },
        { text: "MP4 HD (720p) quality", included: true },
        { text: "Standard processing", included: true },
        { text: "Commercial use allowed", included: true },
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: { monthly: "20", yearly: "18" },
      checkoutPrice: { monthly: "20", yearly: "216" },
      originalPrice: { monthly: null, yearly: "20" },
      period: { monthly: "/ month", yearly: "/ month" },
      description: "For professionals",
      features: [
        {
          text: "1,500 credits per month",
          included: true,
          yearlyText: "18,000 credits per year",
        },
        { text: "2D to 3D Depth Motion", included: true },
        { text: "No watermark", included: true },
        { text: "MP4 upto (1080p) quality", included: true },
        { text: "Fast processing queue", included: true },
        { text: "Fully Commercial use", included: true },
        { text: "Premium Support", included: true },
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: { monthly: "40", yearly: "36" },
      checkoutPrice: { monthly: "40", yearly: "432" },
      originalPrice: { monthly: null, yearly: "40" },
      period: { monthly: "/ month", yearly: "/ month" },
      description: "For enterprises",
      features: [
        {
          text: "4,000 credits per month",
          included: true,
          yearlyText: "48,000 credits per year",
        },
        { text: "2D to 3D Depth Motion", included: true },
        { text: "No watermark", included: true },
        { text: "MP4 upto 4k quality", included: true },
        { text: "Fast processing queue", included: true },
        { text: "Fully Commercial use", included: true },
        { text: "Dedicated Support", included: true },
      ],
      highlight: false,
    },
  ];

  return (
    <section className="min-h-screen bg-[#050511] px-4 md:px-8 lg:px-20 py-20 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white my-4 tracking-tight">
          Flexible Pricing Plans
        </h2>
        <p className="text-slate-400 text-lg mb-8">
          Choose the perfect plan for your creative needs.
        </p>

        {/* IMPORTANT NOTICE BANNER */}
        {IS_MAINTENANCE && (
          <div className="max-w-3xl mx-auto mb-10 p-5 md:p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-left relative overflow-hidden">
            <div className="flex items-start gap-3 md:gap-4 relative z-10">
              <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-lg font-bold text-orange-400 mb-2">
                  Important Notice
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-2">
                  Generation is currently facing a technical issue and our team
                  is working to fix it. The solution may take a few days or up
                  to one week. You may purchase one-time plans now and use them
                  later, or wait until the issue is fixed before buying.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mb-2">
                  Once this notice is removed from the site, it means the issue
                  has been resolved and you can safely purchase a plan.
                </p>
                <p className="text-orange-300/80 text-sm font-medium mt-3">
                  Thank you for your patience.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CONTROLS CONTAINER: Switch + Scroll Button */}
        <div className="relative flex flex-col md:flex-row justify-center items-center mt-8 w-full max-w-7xl mx-auto">
          {/* 1. Centered Toggle Group */}
          <div className="flex justify-center items-center gap-4 z-10">
            <span
              className={`text-sm font-medium ${billingCycle === "monthly" ? "text-white" : "text-slate-500"}`}
            >
              Monthly
            </span>

            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly",
                )
              }
              className={`w-14 h-8 rounded-full p-1 relative transition-colors border border-slate-700 cursor-pointer ${billingCycle === "yearly" ? "bg-purple-600 border-purple-500" : "bg-slate-800"}`}
            >
              <div
                className={`w-6 h-6 rounded-full shadow-md transform transition-all duration-300 ${billingCycle === "yearly" ? "translate-x-6 bg-white" : "translate-x-0 bg-slate-400/80"}`}
              ></div>
            </button>

            <span
              className={`text-sm font-medium flex items-center gap-2 ${billingCycle === "yearly" ? "text-white" : "text-slate-500"}`}
            >
              Yearly
              <span className="bg-green-500/10 text-green-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-500/20">
                10% off
              </span>
            </span>
          </div>
          {/* 2. Right-Aligned Action Button (Absolute on Desktop, Stacked on Mobile) */}
          <div className="mt-6 md:mt-0 md:absolute md:right-0 z-10">
            <button
              onClick={scrollToCreditPack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 text-sm font-medium transition-all group shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              <Sparkle className="w-4 h-4 text-purple-400 group-hover:text-white transition-colors" />
              <span>Buy Credit Pack</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, idx) => {
          const isCurrentPlan =
            user?.plan?.toLowerCase() === plan.name.toLowerCase();
          const isHighlighted = plan.highlight;

          const displayPrice =
            typeof plan.price === "string"
              ? plan.price
              : plan.price[billingCycle];
          const displayOriginalPrice = plan.originalPrice
            ? plan.originalPrice[billingCycle]
            : null;

          // ACTUAL checkout price to pass to the payment page
          const checkoutPrice = plan.checkoutPrice
            ? plan.checkoutPrice[billingCycle]
            : displayPrice;

          // --- LOGIC: DETERMINE BUTTON STATE ---
          let buttonText = "Get started";
          let isButtonDisabled = false;

          if (loading) {
            buttonText = "Processing...";
            isButtonDisabled = true;
          } else if (isCurrentPlan) {
            if (plan.name !== "Trial" && isScheduledForCancel) {
              buttonText = "Resume Subscription";
              isButtonDisabled = false;
            } else {
              buttonText = "Current Plan";
              isButtonDisabled = true;
            }
          }

          return (
            <div
              key={idx}
              className={`relative group flex flex-col h-full transition-transform duration-300 
          ${isHighlighted ? "scale-105 z-10" : "scale-100 z-0"}
        `}
            >
              {/* Glow Background for Highlighted Card (Outer Glow) */}
              {isHighlighted && (
                <div className="absolute -inset-1 bg-purple-500/40 rounded-3xl blur-lg opacity-100 pointer-events-none" />
              )}

              {/* Ambient background blob */}
              {isHighlighted && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/10 blur-[90px] -z-10 rounded-full" />
              )}

              <div
                className={`relative h-full rounded-3xl p-6 lg:p-8 flex flex-col transition-all duration-300 backdrop-blur-lg overflow-hidden
            ${
              isHighlighted
                ? "bg-[#080810] border border-white/10 shadow-xl"
                : "bg-[#080810] border-2 border-white/5 hover:border-white/10"
            }
          `}
              >
                {/* --- SHINY CARD EFFECTS (Only for Highlighted) --- */}
                {isHighlighted && (
                  <>
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#1a103c] from-0% via-purple-500/40 via-25% to-transparent to-50% pointer-events-none" />

                    <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none z-0">
                      <Sparkle className="absolute top-12 right-6 w-5 h-5 text-purple-100 opacity-90" />
                      <Sparkle className="absolute top-5 right-14 w-3 h-3 text-purple-200 opacity-70" />
                      <Sparkle className="absolute top-4 right-5 w-2.5 h-2.5 text-purple-300 opacity-60" />
                      <div className="absolute top-8 right-24 w-0.5 h-0.5 bg-white rounded-full opacity-50" />
                      <div className="absolute top-10 right-10 w-0.5 h-0.5 bg-white rounded-full opacity-40" />
                    </div>

                    <div className="absolute top-8 -right-11 w-[170px] text-center rotate-45 bg-gradient-to-r from-purple-500 to-rose-600 text-white text-[10px] font-bold py-2 tracking-widest uppercase shadow-lg shadow-rose-900/50 border-y border-white/20 z-20 pointer-events-none">
                      Most Popular
                    </div>
                  </>
                )}

                {/* Card Header */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <h3
                      className={`text-lg font-medium ${isHighlighted ? "text-white" : "text-slate-300"}`}
                    >
                      {plan.name}
                    </h3>
                    {isHighlighted ? (
                      <div className="bg-purple-600/30 text-purple-100 text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold border border-purple-500/50 shadow-sm backdrop-blur-md">
                        MOST POPULAR
                      </div>
                    ) : (
                      plan.description && (
                        <div className="bg-slate-700/50 text-slate-200 text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold border border-slate-600/50 shadow-sm backdrop-blur-md">
                          {plan.description}
                        </div>
                      )
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span
                        className="text-4xl lg:text-5xl font-bold text-white tracking-tight"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        ${displayPrice}
                      </span>
                      {displayOriginalPrice && (
                        <span className="text-lg text-slate-500 line-through font-medium mr-1">
                          ${displayOriginalPrice}
                        </span>
                      )}
                    </div>

                    {/* NEW: Explicitly show the yearly billed amount to avoid confusion */}
                    {billingCycle === "yearly" &&
                      plan.checkoutPrice &&
                      plan.checkoutPrice.yearly !== "0" && (
                        <div className="text-xs text-purple-300/70 mt-2 font-medium">
                          Billed annually at ${plan.checkoutPrice.yearly}
                        </div>
                      )}
                      {/* NEW: Explicitly show the yearly billed amount to avoid confusion */}
                    {billingCycle === "monthly" &&
                      plan.checkoutPrice &&
                      plan.checkoutPrice.yearly !== "0" && (
                        <div className="text-xs text-purple-300/70 mt-2 font-medium">
                          Billed monthly
                        </div>
                      )}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    if (isButtonDisabled) return;
                    const creditAmount = plan.features[0].text.split(" ")[0];
                    navigate("/payment", {
                      state: {
                        planName: plan.name,
                        price: checkoutPrice, // Passes the real checkout price (e.g. 108)
                        billingCycle: billingCycle,
                        credits: creditAmount,
                      },
                    });
                  }}
                  disabled={isButtonDisabled}
                  className={`w-full py-3 rounded-xl font-medium text-sm transition-all duration-300 mb-8 relative z-10 
              ${
                isHighlighted
                  ? "bg-gradient-to-b from-[#9061F9] to-[#6D28D9] text-white border-t border-white/20 shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),0_4px_20px_rgba(124,58,237,0.3)] hover:shadow-[inset_0_1px_0px_rgba(255,255,255,0.5),0_0_20px_rgba(124,58,237,0.6)] hover:brightness-110"
                  : "bg-gradient-to-b from-slate-900 to-slate-800 text-white border border-slate-700 shadow-[inset_0_1px_0px_rgba(255,255,255,0.1)] hover:brightness-110 hover:shadow-[inset_0_1px_0px_rgba(255,255,255,0.2)]"
              }
              ${isButtonDisabled ? "opacity-50 cursor-not-allowed active:scale-100" : "active:scale-95"}
            `}
                >
                  {buttonText}
                </button>

                {/* Divider */}
                <div
                  className={`h-px w-full mb-8 ${isHighlighted ? "bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" : "bg-slate-800"}`}
                />

                {/* Features List */}
                <div className="flex-1 relative z-10">
                  <ul className="space-y-4">
                    {plan.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-3 text-sm group"
                      >
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border 
                    ${
                      feature.included
                        ? isHighlighted
                          ? "border-purple-500/50 bg-purple-500/10"
                          : "border-slate-700 bg-slate-800/50"
                        : "border-slate-800 bg-transparent"
                    }`}
                        >
                          {feature.included && (
                            <Check
                              className="w-3 h-3 text-white"
                              strokeWidth={3}
                            />
                          )}
                        </div>

                        <span
                          className={`${feature.included ? "text-slate-300" : "text-slate-600"}`}
                        >
                          {feature.text}
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

      {/* --- ADD-ON COMPONENT (Attached the Ref here) --- */}
      <div ref={creditPackRef}>
        <AddOnCreditPack navigate={navigate} />
      </div>

      {/* FAQ SECTION */}
      <FAQSection />
    </section>
  );
};

export default PricingPage;
