import React from 'react';
import { Zap, Box, CloudUpload } from 'lucide-react';
import { Cloud, Brain, Download, ArrowRight } from 'lucide-react';


const Features = () => {

    const features = [
    { icon: <Zap className="w-8 h-8 text-cyan-400" />, title: "Lightning Fast", desc: "Generate lightning speed instantly" },
    { icon: <Box className="w-8 h-8 text-purple-400" />, title: "High-Fidelity 3D", desc: "High-fidelity 3D with cube mesh" },
    { icon: <CloudUpload className="w-8 h-8 text-blue-400" />, title: "Easy Upload", desc: "Easy Upload arrays and products" },
  ];

    const steps = [
    { 
      id: 1, 
      icon: <Cloud className="w-8 h-8 text-cyan-400" />, 
      title: "Upload Image", 
      desc: "Choose any photo." 
    },
    { 
      id: 2, 
      icon: <Brain className="w-8 h-8 text-purple-400" />, 
      title: "AI Processing", 
      desc: "Our AI generates the 3D scene." 
    },
    { 
      id: 3, 
      icon: <Download className="w-8 h-8 text-blue-400" />, 
      title: "Download Video", 
      desc: "Get your 3D video instantly." 
    },
  ];

  return (
    <section id="features" className="py-20 px-6 md:px-20 bg-[#050511] border-t border-slate-900 scroll-mt-12">
      <h3 className="text-2xl text-white font-bold mb-8">Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <div key={idx} className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-2xl flex flex-col items-center text-center hover:border-slate-500 transition-colors group">
            <div className="mb-4 p-4 rounded-full bg-[#050511] shadow-inner group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{f.title}</h4>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

        {/* How It Works Section */}
      <h3 className="text-2xl text-white font-bold mb-8 my-8">How It Works</h3>
      <div className="flex flex-col md:flex-row gap-8 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 relative group">
            
            {/* The Card */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative z-10 hover:border-slate-600 transition-colors h-full">
              {/* Step Number */}
              <span className="absolute top-4 left-5 text-slate-600 font-bold text-lg group-hover:text-slate-400 transition-colors">
                {step.id}
              </span>
              
              <div className="flex flex-col items-center text-center mt-2">
                {/* Icon Glow Effect */}
                <div className="mb-6 p-4 rounded-full bg-[#050511] shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] transition-all duration-500">
                  {step.icon}
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            </div>

            {/* Connecting Gradient Arrow (Visible on Desktop, hidden on last item) */}
            {index < steps.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -right-4 w-8 h-8 z-0 transform -translate-y-1/2 translate-x-1/2 items-center justify-center">
                 {/* Visual Line */}
                 <div className="w-full h-[2px] bg-gradient-to-r from-slate-700 to-slate-700 group-hover:from-cyan-500 group-hover:to-purple-500 transition-all duration-500"></div>
                 {/* Arrow Head */}
                 <ArrowRight className="absolute -right-2 w-5 h-5 text-slate-700 group-hover:text-purple-500 transition-colors duration-500" />
              </div>
            )}
            
            {/* Mobile Arrow (Downwards) */}
            {index < steps.length - 1 && (
              <div className="md:hidden flex justify-center py-4">
                <ArrowRight className="w-6 h-6 text-slate-700 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
};
export default Features;
