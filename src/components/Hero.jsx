import HeroImage from "./HeroImage";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between min-h-screen overflow-hidden">
      {/* Text Content */}
      <div className="lg:w-1/2 z-10 space-y-6 text-center lg:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Turn Images into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Stunning 3D Images
          </span> <br />
          Instantly.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-lg mx-auto lg:mx-0">
          AI-powered platform to transform static photos into dynamic, volumetric 3D scenes.
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
            Generate 3D Image Now
          </button>
          <button className="px-8 py-3 rounded-full bg-transparent border border-slate-600 text-white hover:bg-slate-800 transition-all">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end w-full z-10">
        {/* Assuming HeroImage is another component that renders the image */}
        <HeroImage />
      </div>

      
    </section>
  );
};

export default Hero;