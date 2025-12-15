import heroImage from "../assets/Hero Section 2D image.png"
import heroVideo from "../assets/Hero Section 3D image.mp4";
import React from "react";

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
                    <div className="relative z-10 flex items-center">

                        {/* ================= LEFT CARD (Source) ================= */}
                        <div className="group relative flex flex-col items-center">

                            {/* Card Container */}
                            <div className="relative w-44 h-60 md:w-72 md:h-96 rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105">
                                {/* Inner Image */}
                                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 border border-cyan-600">
                                    <img
                                        src={heroImage}
                                        alt="Original Landscape"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>


                        </div>

                        {/* ================= CENTER (Energy Beam) ================= */}
                        {/* This SVG creates the electric wave effect between the cards */}
                        <div className="relative  w-24 md:w-32  h-32  opacity-80">
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
                            <svg
                                viewBox="0 0 200 100"
                                className="w-full h-full drop-shadow-[0_0_8px_rgba(100,200,255,0.8)]"
                                preserveAspectRatio="none"
                            >
                                <defs>
                                    <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
                                        <stop offset="50%" stopColor="#ffffff" /> {/* White Center */}
                                        <stop offset="100%" stopColor="#d946ef" /> {/* Fuchsia */}
                                    </linearGradient>
                                </defs>
                                {/* Multiple paths to create the "chaotic energy" look */}
                                <path
                                    d="M0,50 C50,30 150,70 200,50"
                                    fill="none"
                                    stroke="url(#beamGradient)"
                                    strokeWidth="4"
                                    className="animate-pulse"
                                />
                                <path
                                    d="M0,50 C60,20 140,80 200,50"
                                    fill="none"
                                    stroke="url(#beamGradient)"
                                    strokeWidth="2"
                                    className="opacity-60 blur-[1px]"
                                />
                                <path
                                    d="M0,50 C40,60 160,40 200,50"
                                    fill="none"
                                    stroke="url(#beamGradient)"
                                    strokeWidth="2"
                                    className="opacity-40 blur-[2px]"
                                />
                            </svg>


                        </div>

                        {/* ================= RIGHT CARD (Hologram/Result) ================= */}
                        <div className="group relative flex flex-col items-center">

                            {/* Holographic Outer Glass Frame */}
                            {/* We use a larger padding here to create the 'glass edge' effect seen in the image */}
                            <div className="relative w-44 h-60 md:w-72 md:h-96 rounded-2xl border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)] transform transition-transform duration-500 hover:scale-105">

                                {/* Floating particles/sparkles (Simulated with absolute divs) */}
                                <div className="absolute -top-4 -right-4 w-2 h-2 bg-purple-400 rounded-full blur-[1px] animate-ping" />
                                <div className="absolute top-1/2 -left-2 w-1 h-1 bg-pink-400 rounded-full blur-[0px]" />
                                <div className="absolute bottom-10 -right-2 w-1.5 h-1.5 bg-purple-300 rounded-full blur-[1px]" />

                                {/* Inner Video Container */}
                                <div className="relative w-full h-full rounded-lg overflow-hidden border border-purple-400/50 shadow-inner">
                                    <video
                                        src={heroVideo}
                                        className="w-full h-full object-cover opacity-90"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    {/* Overlay Gradient for that "magical" sheen */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-pink-500/20 pointer-events-none mix-blend-screen" />
                                </div>
                            </div>

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

            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        </>
    )
};

export default HeroImage;