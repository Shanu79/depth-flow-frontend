import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ApiSupportContact = () => {
  // State for managing the FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // FAQ Data
  const faqs = [
    {
      question: "How can I contact support?",
      answer: "You can reach us using the contact form on this page or by directly emailing our support team at api@depthflow.io."
    },
    {
      question: "Do you provide technical support for API integration?",
      answer: "Yes, our technical team provides dedicated support to help you successfully integrate our API into your applications."
    },
    {
      question: "What should I do if my API is not working?",
      answer: "First, check our documentation and API status page. If the issue persists, contact support with your error logs and API key."
    },
    {
      question: "Do you offer priority support for higher plans?",
      answer: "Yes, Pro and Custom plan users receive priority email support and faster response times."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen text-slate-300 p-6 md:p-10 font-sans relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Main Content Wrapper */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            Support & Contact
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Get help and assistance with Depthflow AI.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* LEFT COLUMN: Contact Form */}
          <div className="lg:col-span-3 bg-[#111218] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6">Contact Support</h2>
            
            <form className="flex flex-col gap-5">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
                <input 
                  type="text" 
                  className="w-full bg-[#1a1b23] border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea 
                  rows="6"
                  className="w-full bg-[#1a1b23] border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-[#1a1b23] border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button 
                  type="button"
                  className="px-6 py-2.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-slate-200 font-medium text-sm transition-all duration-300 hover:bg-purple-500/20 hover:text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: FAQs & Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* FAQs Box */}
            <div className="bg-[#111218] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6">FAQs</h2>
              
              <div className="flex flex-col divide-y divide-white/5">
                {faqs.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <button 
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between text-left focus:outline-none group"
                    >
                      <span className={`text-sm md:text-base font-medium transition-colors ${openFaqIndex === index ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {faq.question}
                      </span>
                      {openFaqIndex === index ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                      )}
                    </button>
                    
                    {/* FAQ Answer (Accordion Content) */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaqIndex === index ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information Box */}
            <div className="bg-[#111218] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
              
              <div className="space-y-3 text-sm md:text-base text-slate-300">
                <p>
                  Email: <a href="mailto:api@depthflow.io" className="text-purple-400 hover:text-purple-300 transition-colors">api@depthflow.io</a>
                </p>
                <p>
                  Working time - 9:00AM to 6:00PM - EST
                </p>
                <p>
                  Location - (Bharat) INDIA 🇮🇳
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ApiSupportContact;