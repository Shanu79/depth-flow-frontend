import { Upload, Play, Download, Share2, Image as ImageIcon, CreditCard, ChevronDown, LogOut, Sliders, Layers } from 'lucide-react';

const Workspace = () => {
  return (
    <div className="min-h-screen pt-24 pb-10 px-6 md:px-12 bg-slate-950 flex flex-col md:flex-row gap-6">
      
      {/* LEFT PANEL - Controls */}
      <div className="w-full md:w-1/3 space-y-6">
        <h1 className="text-2xl font-bold text-white">Create 3D Image</h1>
        
        {/* Upload Box */}
        <div className="border-2 border-dashed border-cyan-500/30 bg-slate-900/50 rounded-2xl h-48 flex flex-col items-center justify-center text-center p-6 hover:border-cyan-500/60 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Upload className="text-cyan-400 w-6 h-6" />
          </div>
          <p className="text-cyan-400 font-medium text-sm">Click to Upload Image</p>
          <p className="text-slate-500 text-xs mt-1">JPG, PNG (Max 10MB)</p>
        </div>

        {/* 3D Effect Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
           <div className="flex justify-between items-center">
             <span className="text-white font-medium flex items-center gap-2"><Sliders className="w-4 h-4" /> 3D Effect & Motion</span>
           </div>
           
           {/* Sliders */}
           <div className="space-y-4">
             <div>
               <div className="flex justify-between text-xs text-slate-400 mb-2">
                 <span>Depth Intensity</span>
                 <span>80%</span>
               </div>
               <input type="range" className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full" />
             </div>
             <div>
               <div className="flex justify-between text-xs text-slate-400 mb-2">
                 <span>Motion Speed</span>
                 <span>Normal</span>
               </div>
               <input type="range" className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full" />
             </div>
           </div>

           {/* Motion Style Dropdown */}
           <div>
             <label className="text-xs text-slate-400 block mb-2">Motion Style</label>
             <select className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg p-3 outline-none focus:border-cyan-500">
               <option>Dolly Zoom</option>
               <option>Orbit</option>
               <option>Perspective Shift</option>
             </select>
           </div>
        </div>

        {/* Render Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
           <span className="text-white font-medium flex items-center gap-2"><Layers className="w-4 h-4" /> Render Settings</span>
           
           <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Quality</span>
              <div className="flex bg-slate-800 rounded-lg p-1">
                <button className="px-3 py-1 text-xs rounded-md bg-slate-700 text-white font-medium">HD</button>
                <button className="px-3 py-1 text-xs rounded-md text-slate-400 hover:text-white">4K</button>
              </div>
           </div>
           
           <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Aspect Ratio</span>
              <div className="flex bg-slate-800 rounded-lg p-1 gap-1">
                <button className="px-3 py-1 text-xs rounded-md bg-slate-700 text-white font-medium">16:9</button>
                <button className="px-3 py-1 text-xs rounded-md text-slate-400 hover:text-white">1:1</button>
                <button className="px-3 py-1 text-xs rounded-md text-slate-400 hover:text-white">9:16</button>
              </div>
           </div>
           
           <button className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all">
             Generate 3D Image
           </button>
        </div>
      </div>

      {/* RIGHT PANEL - Preview & Output */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        
        {/* Main Preview Area */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-800 w-fit p-1 rounded-lg mb-6">
            <button className="px-4 py-1.5 text-sm text-slate-400 hover:text-white">Input Image</button>
            <button className="px-4 py-1.5 text-sm bg-purple-600 text-white rounded-md shadow-md">3D Image Output</button>
          </div>

          {/* Video Player Placeholder */}
          <div className="flex-1 bg-black rounded-xl overflow-hidden relative group min-h-[300px]">
             <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000" className="w-full h-full object-cover opacity-80" alt="Space" />
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
             {[1,2,3,4].map((i) => (
                <div key={i} className="aspect-video rounded-lg bg-slate-800 overflow-hidden relative group cursor-pointer">
                  <img src={`https://source.unsplash.com/random/400x300?3d&sig=${i}`} className="w-full h-full object-cover" alt="Recent" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs text-white border border-white/50 px-2 py-1 rounded backdrop-blur-sm">View</span>
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