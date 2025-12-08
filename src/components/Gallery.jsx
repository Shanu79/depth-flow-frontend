import React from 'react';

const Gallery = () => {
  // Placeholder images matching the 3D/Fantasy vibe
  const galleryImages = [
    "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614726365723-49faaa5bf20f?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-d09347e0c766?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
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
            <img 
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