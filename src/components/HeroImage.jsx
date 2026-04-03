import heroImage from "../assets/Hero Section 2D image.png"
import heroVideo from "../assets/Hero Section 3D image.mp4";

const HeroImage = () => {
    return (
        <>
            {/* Hero Image Section */}
            <div className="relative w-full max-w-3xl mx-auto p-12 flex justify-center items-center">
                {/* --- Main Container for Cards --- */}
                <div className="relative w-full flex justify-center items-center">

                    {/* Background ambient glow for atmosphere */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-900/20 blur-[100px] rounded-full pointer-events-none" />

                    {/* --- Main Container --- */}
                    <div className="relative z-10 flex items-center"
                    style={{ perspective: "1000px" }}
                    >

                        {/* ================= LEFT CARD (Source - 2D) ================= */}
                        <div
                            className="relative group w-48 h-64 md:w-72 md:h-96 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
                            style={{ transform: "rotateY(20deg)" }} // Explicit CSS rotation
                        >
                            {/* Card Frame */}
                            <div className="w-full h-full rounded-2xl border border-cyan-500/30 shadow-[0_0_30px_-5px_rgba(34,211,238,0.2)] overflow-hidden">
                                <img
                                    src={heroImage}
                                    alt="Original"
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                {/* Scanline overlay effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-700/15 to-transparent bg-[length:100%_4px] pointer-events-none" />
                            </div>

                            {/* Bottom Connection Point (Visual anchor for the line) */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-500 rounded-full blur-[2px] shadow-[0_0_10px_#22d3ee]" />
                        </div>

                        {/* ================= CENTER (Energy Beam) ================= */}
                        {/* This SVG creates the electric wave effect between the cards */}
                        <div className="relative  w-20 md:w-24  h-32  opacity-80">
                            <div className="absolute inset-0 flex items-center justify-center opacity-80 mix-blend-screen">
                                {/* Simulated Energy Waves using blurred gradients */}
                                <div className="w-48 h-1 bg-cyan-400 blur-md rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_#22d3ee]"></div>
                                <div className="w-48 h-1 bg-purple-500 blur-md rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 mix-blend-lighten"></div>
                                <div className="w-48 h-1 bg-blue-500 blur-md rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 mix-blend-lighten"></div>

                                {/* Central Bright Core */}
                                <div className="w-12 h-12 bg-transparent blur-xl rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"></div>

                                {/* SVG Wave Lines for detail */}
                                <svg className="absolute w-64 h-24 overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
                                    <path d="M0,50 C50,20 150,80 200,50" stroke="url(#grad1)" strokeWidth="2" fill="none" className="opacity-70 blur-[1px]" />
                                    <path d="M0,50 C50,80 150,20 200,50" stroke="url(#grad2)" strokeWidth="2" fill="none" className="opacity-70 blur-[1px]" />
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                                            <stop offset="50%" stopColor="#22d3ee" />
                                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                                        </linearGradient>
                                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                                            <stop offset="50%" stopColor="#a855f7" />
                                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                        </div>

                        {/* ================= RIGHT CARD (Result - Holographic) ================= */}
                        <div
                            className="relative group w-48 h-64 md:w-72 md:h-96 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
                            style={{ transform: "rotateY(-20deg)" }} // Explicit CSS rotation
                        >
                            {/* 1. The Holographic "Container" (Glass Shell) */}
                            {/* Note: This is larger than the content to create the 'glass edge' effect */}
                            <div className="absolute -inset-4 rounded-3xl border border-purple-500/40 bg-purple-900/10 backdrop-blur-sm shadow-[0_0_50px_-10px_rgba(168,85,247,0.5)] z-0"></div>

                            {/* 2. Magical Swirl Particles (Simulated via gradient/divs) */}
                            <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-[40px] rounded-full animate-pulse" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-purple-400/20 shadow-[0_0_30px_inset_rgba(168,85,247,0.2)] opacity-50" />
                                {/* Sparkles */}
                                <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-ping" />
                                <div className="absolute bottom-10 -left-4 w-1.5 h-1.5 bg-pink-400 rounded-full shadow-[0_0_10px_pink] animate-pulse" />
                            </div>

                            {/* 3. The Content (Video) */}
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-400/60 z-10">
                                <video
                                    src={heroVideo}
                                    className="w-full h-full object-cover opacity-90 mix-blend-screen"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                                {/* Gradient Overlay for blending */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent mix-blend-overlay" />
                            </div>

                            {/* Bottom Connection Point */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full blur-[2px] shadow-[0_0_10px_#d946ef]" />
                        </div>

                    </div>
                </div>

                {/* --- Bottom Connector Line & Badge --- */}
                <div className="absolute bottom-6 left-0  w-full flex justify-center pointer-events-none z-20">
                    {/* Adjusted width to align with the visual centers of the tilted cards */}
                    <div className="relative w-[24rem] md:w-[32rem] h-28 md:h-24">

                        {/* AI Energy Connector */}
                        <div className="w-full max-w-lg p-10 flex justify-center items-center">
                            <svg
                                width="150%"
                                height="150"
                                viewBox="0 0 400 120"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    {/* Global Gradient spanning the whole width */}
                                    <linearGradient
                                        id="aiGradient"
                                        x1="0"
                                        y1="0"
                                        x2="400"
                                        y2="0"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="0%" stopColor="#00FFFF" /> {/* Cyan */}
                                        <stop offset="100%" stopColor="#D946EF" /> {/* Purple/Pink */}
                                    </linearGradient>

                                    {/* Glow Filter */}
                                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                {/* --- GROUP 1: LEFT SIDE (Cyan) --- */}

                                {/* Start Dot */}
                                <circle cx="20" cy="20" r="5" fill="#00FFFF" filter="url(#glow)" />

                                {/* Left Path: Down then Right to Pill */}
                                <path
                                    d="M 20 20 L 20 70 Q 20 90 40 90 L 100 90"
                                    stroke="url(#aiGradient)"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    filter="url(#glow)"
                                />

                                {/* --- GROUP 2: CENTER PILL --- */}

                                {/* Pill Background (Solid to hide lines behind if needed, usually transparent in this design) */}
                                {/* Pill Border */}
                                <rect
                                    x="100"
                                    y="70"
                                    width="200"
                                    height="40"
                                    rx="20"
                                    stroke="url(#aiGradient)"
                                    strokeWidth="2"
                                    fill="rgba(255, 255, 255, 0.1)"
                                    className="backdrop-blur-sm"
                                />

                                {/* Text */}
                                <text
                                    x="200"
                                    y="96"
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="16"
                                    fontWeight="500"
                                    fontFamily="sans-serif"
                                    style={{ textShadow: "0px 0px 8px rgba(255,255,255,0.3)" }}
                                >
                                    AI Transformation
                                </text>

                                {/* --- GROUP 3: RIGHT SIDE (Purple) --- */}

                                {/* Right Path: Right from Pill then Up */}
                                <path
                                    d="M 300 90 L 360 90 Q 380 90 380 70 L 380 30"
                                    stroke="url(#aiGradient)"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    filter="url(#glow)"
                                />

                                {/* Arrow Head (Manual path to ensure gradient fill) */}
                                <path
                                    d="M 380 15 L 374 28 L 386 28 Z"
                                    fill="url(#aiGradient)"
                                    filter="url(#glow)"
                                />
                            </svg>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
};

export default HeroImage;