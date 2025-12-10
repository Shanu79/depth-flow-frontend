import {
  Upload,
  Play,
  Download,
  Share2,
  Image as ImageIcon,
  CreditCard,
  ChevronDown,
  LogOut,
  Sliders,
  Layers,
} from "lucide-react";
import { useState } from "react";

const Workspace = () => {
  const [motionStyle, setMotionStyle] = useState("Dolly");
  return (
    <div className="min-h-screen pt-24 pb-10 px-6 md:px-12 bg-slate-950 flex flex-col md:flex-row gap-6">
      {/* LEFT PANEL - Controls */}
      <div className="w-full md:w-1/3 space-y-6">
        <h1 className="text-2xl font-bold text-white">Create 3D Image</h1>

        {/* Upload Box */}
        <div className="relative border-2 border-dashed border-cyan-400 bg-blue-600/20 backdrop-blur-sm rounded-2xl h-48 flex flex-col items-center justify-center text-center p-6 cursor-pointer group hover:bg-blue-600/30 transition-all shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
          <div className="mb-4 transform group-hover:-translate-y-1 transition-transform duration-300">
            <Upload className="text-white w-10 h-10" strokeWidth={1.5} />
          </div>
          <p className="text-white font-medium text-sm">
            Click to Upload Image
          </p>
          <p className="text-white text-xs mt-1">JPG, PNG (Max 10MB)</p>
        </div>

        {/* 3D Effect & Motion */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium flex items-center gap-2">
              <Sliders className="w-4 h-4" /> 3D Effect & Motion
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-300 font-medium">
                <span>Depth Intensity</span>
              </div>
              <input
                type="range"
                className="top-0 left-0 h-full w-full bg-blue-500 rounded-full cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm text-slate-300 font-medium">
                <span>Motion Speed</span>
              </div>
              <input
                type="range"
                className="top-0 left-0 h-full w-full bg-blue-500 rounded-full cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
          </div>

          {/* Motion Style - Segmented Control */}
          {/* Motion Style - Segmented Control */}
          <div>
            <label className="text-sm text-slate-300 block mb-3 font-medium">
              Motion Style
            </label>
            <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800">
              {["Dolly", "Orbit", "Zoom"].map((style) => (
                <button
                  key={style}
                  onClick={() => setMotionStyle(style)} // 2. Updates state on click
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                    motionStyle === style
                      ? "bg-slate-700 text-white shadow-sm" // Active Styles
                      : "text-slate-500 hover:text-white" // Inactive Styles
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Render Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium flex items-center gap-2">
              <Layers className="w-4 h-4" /> Render Settings
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>

          {/* Quality & Ratio Grid */}
          <div className="space-y-5">
            {/* Quality */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300 font-medium">
                Quality
              </span>
              <div className="flex bg-slate-950/50 border border-slate-800 p-1 rounded-lg gap-1">
                <button className="px-4 py-1.5 text-xs font-bold text-white bg-slate-700 rounded-md shadow-sm">
                  HD
                </button>
                <button className="px-4 py-1.5 text-xs font-medium text-slate-500 hover:text-white transition-colors">
                  4K
                </button>
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300 font-medium">
                Aspect Ratio
              </span>
              <div className="flex bg-slate-950/50 border border-slate-800 p-1 rounded-lg gap-1">
                <button className="px-3 py-1.5 text-xs font-bold text-white bg-slate-700 rounded-md shadow-sm">
                  16:9
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-white transition-colors">
                  1:1
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-white transition-colors">
                  9:16
                </button>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button className="w-full py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-extrabold text-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all mt-4">
            Generate 3D Video
          </button>
        </div>
      </div>

      {/* RIGHT PANEL - Preview & Output */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        {/* Main Preview Area */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-800 w-fit p-1 rounded-lg mb-6">
            <button className="px-4 py-1.5 text-sm text-slate-400 hover:text-white">
              Input Image
            </button>
            <button className="px-4 py-1.5 text-sm bg-purple-600 text-white rounded-md shadow-md">
              3D Image Output
            </button>
          </div>

          {/* Video Player Placeholder */}
          <div className="flex-1 bg-black rounded-xl overflow-hidden relative group min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000"
              className="w-full h-full object-cover opacity-80"
              alt="Space"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="fill-white text-white ml-1" />
              </button>
            </div>
            {/* Timeline Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <Play className="w-4 h-4 text-white fill-white" />
              <div className="h-1 bg-slate-600 flex-1 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-purple-500"></div>
              </div>
              <span className="text-xs text-white">00:04</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 hover:shadow-purple-600/40 transition-all">
              <Download className="w-5 h-5" /> Download
            </button>
            <button className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 flex items-center gap-2 transition-all">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 flex items-center gap-2 transition-all">
              <ImageIcon className="w-4 h-4" /> Save
            </button>
          </div>
        </div>

        {/* Recent Creations */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-white font-medium mb-4">Recent Creations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-lg bg-slate-800 overflow-hidden relative group cursor-pointer"
              >
                <img
                  src={`https://source.unsplash.com/random/400x300?3d&sig=${i}`}
                  className="w-full h-full object-cover"
                  alt="Recent"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs text-white border border-white/50 px-2 py-1 rounded backdrop-blur-sm">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
