import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { galleryItems } from '../components/HomeGallery'; // Import the shared data array from Gallery.jsx

// Reuse Icons
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-white drop-shadow-lg">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M7 4v16l13 -8z" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);

const Gallery = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);
        
        const handleEsc = (e) => {
          if (e.key === 'Escape') setSelectedVideo(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-6 md:px-20">
            
            {/* Header & Back Button */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Gallery</h1>
                    <p className="text-slate-400">Explore our complete collection of works</p>
                </div>
                <Link to="/">
                    <button className="px-6 py-2 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2">
                        ← Back to Home
                    </button>
                </Link>
            </div>

            {/* Grid Layout (SHOWS ALL ITEMS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleryItems.map((item) => (
                    <div 
                        key={item.id} 
                        onClick={() => setSelectedVideo(item)}
                        className="group relative cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-1"
                    >
                        <div className="relative w-full h-64 overflow-hidden">
                            <video 
                                src={item.src} 
                                muted 
                                loop 
                                onMouseOver={(e) => e.target.play()}
                                onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-purple-600/20 backdrop-blur-sm p-4 rounded-full border border-purple-400/30 group-hover:bg-purple-600/80 group-hover:scale-110 transition-all duration-300">
                                    <PlayIcon />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-6 pt-12">
                                <p className="text-white font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- VIDEO MODAL (Identical Logic) --- */}
            {selectedVideo && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedVideo(null)}
                >
                    <button 
                        onClick={() => setSelectedVideo(null)}
                        className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
                    >
                        <XIcon />
                    </button>

                    <div 
                        className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl bg-black border border-slate-800"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <video src={selectedVideo.src} controls autoPlay className="w-full max-h-[85vh] object-contain" />
                        <div className="p-4 bg-slate-900 border-t border-slate-800">
                            <h4 className="text-lg text-white font-semibold">{selectedVideo.title}</h4>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;