const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between min-h-screen overflow-hidden">
      {/* Text Content */}
      <div className="lg:w-1/2 z-10 space-y-6 text-center lg:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Turn Images into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Stunning 3D Videos
          </span> <br />
          Instantly.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-lg mx-auto lg:mx-0">
          AI-powered platform to transform static photos into dynamic, volumetric 3D scenes.
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
            Generate 3D Video Now
          </button>
          <button className="px-8 py-3 rounded-full bg-transparent border border-slate-600 text-white hover:bg-slate-800 transition-all">
            Watch Demo
          </button>
        </div>
      </div>

        {/* Visual Content */}
      <div className="lg:w-1/2 mt-16 lg:mt-0 relative flex justify-center w-full">
        
        {/* Glowing connector line effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 blur-sm"></div>
        
        {/* Container*/}
        <div className="relative flex gap-2 md:gap-6 items-center">
          
          {/* Card 1 (w-32 mobile, w-48 desktop) */}
          <div className="w-32 h-44 md:w-48 md:h-64 bg-slate-800/80 rounded-lg border border-slate-700 overflow-hidden shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
             <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" alt="3D Landscape" className="w-full h-full object-cover" />
          </div>
          
          {/* Connection Animation UI */}
          <div className="z-20 p-1 md:p-2 rounded-full bg-slate-900 border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
             <div className="text-[10px] md:text-xs text-white font-mono whitespace-nowrap px-1 md:px-2">
                AI Transformation
             </div>
          </div>

          {/* Card 2 */}
          <div className="w-32 h-44 md:w-48 md:h-64 bg-slate-800/80 rounded-lg border border-purple-500/50 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)] transform rotate-6 hover:rotate-0 transition-transform duration-500">
            <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop" alt="3D Art" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};

export default Hero;