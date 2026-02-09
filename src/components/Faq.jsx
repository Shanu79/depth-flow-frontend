import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What is Depthflow AI?",
    answer: "Depthflow is an AI-powered platform that converts 2D images into realistic 3D depth and motion renders. You can create engaging 3D-style videos from a single image in just a few clicks."
  },
  {
    question: "How does the credit system work?",
    answer: "Depthflow AI uses a credit-based system. 1 image conversion = 20 credits. Credits are deducted only when a render is successfully generated."
  },
  {
    question: "What output format do I get?",
    answer: "All renders are delivered as MP4 videos, making them easy to share on social media, websites, and presentations."
  },
  {
    question: "Can I use the generated renders for commercial projects?",
    answer: "Yes. Commercial usage is allowed on Basic and Pro plans. The Free plan is for personal and testing purposes only."
  },
  {
    question: "Do my unused credits expire?",
    answer: "Monthly plan credits reset at the end of each billing cycle. Yearly plan credits remain valid for the full subscription year."
  },
  {
    question: "Are my uploaded images safe and private?",
    answer: "Yes. Your images are used only for processing and are not shared or sold. We take data privacy and security seriously."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes. You can cancel your subscription anytime from your account dashboard. You will continue to have access until the end of your billing period."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 px-6 md:px-20 bg-[#050511] border-t border-slate-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-center mb-12">
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
                <span className="font-medium text-gray-200 text-lg pr-4">
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
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;