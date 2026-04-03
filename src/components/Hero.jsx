import HeroImage from "./HeroImage";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore.js";

const Hero = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-16 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between min-h-screen">

      {/* FIXED: Changed -z-10 to z-0 so it doesn't hide behind the App background */}
      <div className="absolute top-[-2vw] left-[-2vw] w-[50vw] md:w-[20vw] h-[25vw] md:h-[11.5vw] bg-gradient-to-br from-purple-700/40 via-blue-700/4 to-cyan-700/40  rounded-full blur-[60px] pointer-events-none z-0"></div>
      
      {/* FIXED: Added 'relative z-10' to ensure the text stays layered above the glow */}
      <div className="relative z-10 w-full min-w-[40%] flex flex-col justify-center space-y-6 text-center lg:text-left p-8">
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.15]">
          Transform Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
            Images
          </span>{" "}
          to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            3D
          </span>{" "}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Depth
          </span>{" "}
          Instantly
        </h1>

        {/* Subheading */}
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-light tracking-wide mt-2">
          AI-powered platform to convert static images into immersive 3D depth
          motion visuals.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-normal gap-5 mt-6">
          {/* Primary Glow Button */}
          <button
            onClick={() => navigate("/workspace")}
            className="px-8 py-3.5 rounded-full text-white font-semibold text-sm md:text-base 
                             bg-gradient-to-r from-cyan-600/40 via-blue-700/40 to-purple-700/40 
                             border border-purple-400/30 
                             shadow-[0_0_20px_-5px_rgba(59,130,246,0.4),0_0_20px_-5px_rgba(168,85,247,0.4)] 
                             hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.6),0_0_25px_-5px_rgba(168,85,247,0.6)] 
                             transition-all duration-300"
          >
            {user ? "Continue to Workspace" : "Generate 3D Image Now"}
          </button>

          {/* Secondary Outline Button */}
          <button
            className="px-8 py-3.5 rounded-full text-white font-medium text-sm md:text-base 
                             border border-gray-600 hover:bg-white/10 
                             transition-colors duration-300"
          >
            Watch Demo
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full md:flex flex-col items-center justify-center relative z-10">
        <div className="w-full h-full overflow-hidden relative">
          <div className="flex justify-center mb-20 scale-[0.73] lg:scale-[0.67] xl:scale-[0.8]">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;