import { Mail, MessageSquare, User, Send, CheckCircle, HelpCircle } from 'lucide-react';

const ContactPage = () => {

  return (
    <div className="min-h-screen bg-[#050511] text-white selection:bg-cyan-500/30 font-sans pt-20">
      
      {/* --- Background Ambient Effects --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
              Support
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
             Contact Us
           </h1>
           <p className="text-xl text-slate-400">
             We’re here to help.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* --- LEFT COLUMN: Info & Instructions --- */}
          <div className="space-y-8">
            
            {/* Intro Text */}
            <div className="prose prose-invert">
              <p className="text-slate-400 text-lg leading-relaxed">
                If you have any questions about our platform, pricing, features, or technical support, 
                feel free to reach out to us. Our team aims to respond as quickly as possible.
              </p>
            </div>

            {/* Email Card */}
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-5 hover:border-cyan-500/50 transition-colors group">
               <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                 <Mail className="w-6 h-6 text-cyan-400" />
               </div>
               <div>
                 <p className="text-sm text-slate-400 mb-1">Email us directly at</p>
                 <a href="mailto:support@depthflow.io" className="text-xl font-bold text-white hover:text-cyan-400 transition-colors">
                   support@depthflow.io
                 </a>
               </div>
            </div>

            {/* "Faster Assistance" Checklist */}
            <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
               {/* Decorative Glow */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl"></div>

               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                 <HelpCircle className="w-5 h-5 text-purple-400" />
                 For faster assistance:
               </h3>
               <p className="text-slate-400 text-sm mb-6">
                 Please include the following details in your message to help us serve you better:
               </p>
               
               <ul className="space-y-4">
                 <li className="flex gap-3 text-slate-300 text-sm">
                   <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                   <span>Your registered email address</span>
                 </li>
                 <li className="flex gap-3 text-slate-300 text-sm">
                   <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                   <span>A brief description of your issue or request</span>
                 </li>
               </ul>
            </div>

            {/* Bottom Note */}
            <p className="text-slate-500 text-sm italic border-l-2 border-slate-700 pl-4">
              "We value your feedback and are always open to suggestions that help us improve Depthflow.io"
            </p>

          </div>

          {/* --- RIGHT COLUMN: Contact Form --- */}
          <div className="relative">
             <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-3xl blur-md opacity-50"></div>
             <form className="relative bg-[#050511] border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
                
                <h3 className="text-xl font-bold text-white mb-2">Send us a message</h3>
                
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                    <textarea 
                      rows="4"
                      placeholder="How can we help you?"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all placeholder:text-slate-600 resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Message
                </button>

             </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;