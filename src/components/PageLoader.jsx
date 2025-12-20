import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-slate-800"></div>
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-cyan-400 border-r-purple-500 border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        
        {/* Text with pulse effect */}
        <p className="text-gray-400 font-medium animate-pulse tracking-widest text-sm">
          LOADING...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;