import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config.js'; // Adjust path to your config

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

const UserHistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch ONLY the user's generated history
    const fetchHistory = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsLoading(false);
                return;
            }
            const res = await fetch(`${API_BASE_URL}/ai/history`, { headers: { "Authorization": `Bearer ${token}` } });
            if (res.ok) {
                setHistory(await res.json());
            }
        } catch (error) { 
            console.error("Failed to load history", error); 
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // Scroll to top and fetch data when page loads
        window.scrollTo(0, 0);
        fetchHistory();
        
        const handleEsc = (e) => {
          if (e.key === 'Escape') setSelectedVideo(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [fetchHistory]);

    return (
        <div className="min-h-screen bg-[#070514] pt-24 pb-20 px-6 md:px-20 relative overflow-hidden">
            {/* Background Glows to match workspace theme */}
            <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[45vw] h-[45vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header & Back Button */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide">My Generations</h1>
                        <p className="text-purple-300/70 font-medium">Your complete collection of AI-generated 3D scenes</p>
                    </div>
                    <Link to="/workspace">
                        <button className="px-6 py-2.5 rounded-full bg-[#151029] border border-purple-500/30 text-purple-200 hover:bg-[#291456] hover:text-white hover:border-purple-400 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-semibold">
                            ← Back to Workspace
                        </button>
                    </Link>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                        <span className="text-purple-300 font-mono text-sm uppercase tracking-widest">Fetching your vault...</span>
                    </div>
                ) : history.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-32 bg-[#0b081a]/50 backdrop-blur-md rounded-2xl border border-white/5">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                            <span className="text-3xl">🌌</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No generations yet</h3>
                        <p className="text-gray-400 mb-6">Head back to the workspace to create your first 3D image!</p>
                        <Link to="/workspace">
                            <button className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_5px_20px_rgba(219,39,119,0.4)] hover:scale-105 transition-transform">
                                Create Now
                            </button>
                        </Link>
                    </div>
                ) : (
                    /* Grid Layout (SHOWS ALL USER ITEMS) */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {history.map((item, index) => (
                            <div 
                                key={item.id} 
                                onClick={() => setSelectedVideo(item)}
                                className="group relative cursor-pointer rounded-xl border border-purple-500/20 bg-[#0b081a] overflow-hidden shadow-lg transition-all duration-300 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-1"
                            >
                                <div className="relative w-full aspect-video overflow-hidden bg-black">
                                    <video 
                                        src={item.video_url} 
                                        muted 
                                        loop 
                                        onMouseOver={(e) => e.target.play()}
                                        onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="bg-purple-600/20 backdrop-blur-sm p-3 rounded-full border border-purple-400/30 group-hover:bg-purple-600/80 group-hover:scale-110 transition-all duration-300">
                                            <PlayIcon />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-[#151029] border-t border-white/5 flex justify-between items-center">
                                    <span className="text-xs font-mono text-purple-300/70">Render #{index + 1}</span>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Generated</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* --- VIDEO MODAL --- */}
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
                        className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] bg-[#070514] border border-purple-500/30"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full bg-black flex items-center justify-center">
                            <video src={selectedVideo.video_url} controls autoPlay className="w-full max-h-[80vh] object-contain" />
                        </div>
                        <div className="p-5 bg-[#0b081a] border-t border-purple-500/20 flex justify-between items-center">
                            <h4 className="text-lg text-white font-bold tracking-wide">Scene Render</h4>
                            <button 
                                onClick={() => window.open(selectedVideo.video_url, '_blank')}
                                className="px-5 py-2 rounded-lg bg-white/5 hover:bg-purple-600/30 border border-white/10 hover:border-purple-500 text-sm font-medium text-white transition-all"
                            >
                                Open Original
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserHistoryPage;