import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';
import video4 from '../assets/video4.mp4';
import video5 from '../assets/video5.mp4';
import video6 from '../assets/video6.mp4';

// Simple SVG Icons to avoid external dependencies
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

export const galleryItems = [
    { id: 1, src: video1, title: "Transformation Project 1" },
    { id: 2, src: video2, title: "AI Animation 2" },
    { id: 3, src: video3, title: "3D Environment 3" },
    { id: 4, src: video4, title: "Character Design 4" },
    { id: 5, src: video5, title: "Motion Graphics 5" },
    { id: 6, src: video6, title: "Visual Effects 6" },
  ];

const HomeGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <section id="gallery" className="px-6 md:px-20 py-20 bg-slate-950 scroll-mt-3 min-h-screen">
        <h3 className="text-3xl text-white font-bold mb-8 text-center md:text-left">
            Gallery
        </h3>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedVideo(item)}
              className="group relative cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-1"
            >
              {/* Thumbnail Container (Using Video as thumbnail) */}
              <div className="relative w-full h-64 overflow-hidden">
                <video 
                  src={item.src} 
                  muted 
                  loop 
                  preload="metadata"
                  // Play on hover for effect
                  onMouseOver={(e) => e.target.play()}
                  onMouseOut={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                />
                
                {/* Center Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-purple-600/20 backdrop-blur-sm p-4 rounded-full border border-purple-400/30 group-hover:bg-purple-600/80 group-hover:scale-110 transition-all duration-300">
                        <PlayIcon />
                    </div>
                </div>

                {/* Bottom Gradient Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-6 pt-12">
                   <p className="text-white font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                     {item.title}
                   </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      {/* --- SEE MORE BUTTON --- */}
        <div className="flex justify-center mt-12">
            <Link to="/gallery">
                <button className="px-10 py-3 rounded-full bg-transparent border border-purple-500 text-purple-400 font-semibold hover:bg-purple-500 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
                    See More Projects
                </button>
            </Link>
        </div>
      </section>

      {/* ================= VIDEO MODAL ================= */}
      {selectedVideo && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedVideo(null)} // Click background to close
        >
          {/* Close Button */}
          <button 
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
          >
            <XIcon />
          </button>

          {/* Video Player Wrapper */}
          <div 
            className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl bg-black border border-slate-800"
            onClick={(e) => e.stopPropagation()} // Prevent clicking video from closing modal
          >
             <video 
               src={selectedVideo.src} 
               controls 
               autoPlay 
               className="w-full max-h-[85vh] object-contain"
             />
             <div className="p-4 bg-slate-900 border-t border-slate-800">
                <h4 className="text-lg text-white font-semibold">{selectedVideo.title}</h4>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeGallery;