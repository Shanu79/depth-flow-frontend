import React from 'react';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';
import video4 from '../assets/video4.mp4';
import video5 from '../assets/video5.mp4';
import video6 from '../assets/video6.mp4';

const Gallery = () => {
  // Placeholder images matching the 3D/Fantasy vibe
  const galleryImages = [
    video1,
    video2,
    video3,
    video4,
    video5,
    video6,
  ];

  return (
    <section id="gallery" className="px-6 md:px-20 py-20 bg-slate-950 scroll-mt-3">
      <h3 className="text-2xl text-white font-bold mb-8">Gallery</h3>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((src, idx) => (
          <div 
            key={idx} 
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300"
          >
            {/* Image */}
            <video 
              src={src} 
              alt={`Gallery item ${idx + 1}`} 
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" 
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white text-sm font-medium">View Project</span>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-12">
        <button className="px-8 py-3 rounded-full bg-slate-900 border border-slate-700 text-gray-300 hover:text-white hover:bg-slate-800 hover:border-slate-600 transition-all">
          See More
        </button>
      </div>
    </section>
  );
};

export default Gallery;