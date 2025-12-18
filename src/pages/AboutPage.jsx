import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Zap, Globe, Heart, ArrowRight, Users, Cpu } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 font-sans pt-20">

            {/* --- Background Ambient Effects --- */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">

                {/* --- Hero Section --- */}
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
                        Our Story
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Bridging the Gap Between <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">2D & 3D Reality</span>
                    </h1>
                    <div className="text-slate-400 text-lg leading-relaxed space-y-6 text-left md:text-center">
                        <p>
                            Depthflow.io is an AI-powered platform designed to transform 2D images into immersive 3D
                            depth visuals with ease. Our mission is to make advanced depth and parallax generation
                            accessible to creators, designers, marketers, and developers worldwide—without requiring
                            technical expertise.
                        </p>

                        <p>
                            We leverage modern AI and depth-estimation technologies to generate realistic depth maps
                            and smooth motion effects, enabling users to create engaging 3D visuals for social media,
                            presentations, websites, advertisements, and creative projects.
                        </p>

                        <p>
                            At Depthflow.io, we believe creativity should not be limited by complex tools. Our platform
                            focuses on simplicity, speed, and quality—allowing users to upload an image, customize depth
                            effects, and generate professional results in minutes.
                        </p>

                        <p>
                            We continuously improve our technology to deliver better depth accuracy, faster processing,
                            and scalable solutions for individuals as well as businesses.
                        </p>
                    </div>
                </div>

                {/* --- The Vision Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">

                    {/* Left: Text Content */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-white">Why Choose Depthflow.io?</h2>

                        {/* Intro Paragraph */}
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Depthflow.io is built for creators who want to add depth to their visuals and bring images to life.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-6">

                            {/* Feature 1: AI-Powered */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                                    <Cpu className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">AI-Powered Depth</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Advanced AI-powered depth and parallax generation that analyzes your images instantly.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2: User Friendly */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                                    <Zap className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Simple Interface</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        A simple and user-friendly interface designed for creators of all skill levels.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 3: High Quality */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                                    <Globe className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">High-Quality Outputs</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Generate professional-grade visuals suitable for both creative and commercial projects.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 4: Scalable */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                                    <Users className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Scalable Plans</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Flexible and scalable plans tailored for individuals, professionals, and businesses.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right: Visual Showcase (Unchanged) */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-2xl rounded-3xl -z-10 group-hover:blur-3xl transition-all duration-700"></div>
                        <div className="bg-slate-900/50 border border-slate-700 backdrop-blur-sm rounded-3xl p-2 md:p-4 rotate-3 group-hover:rotate-1 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
                                alt="Team working on AI"
                                className="rounded-2xl w-full object-cover h-64 md:h-96"
                            />
                        </div>
                    </div>
                </div>

                {/* --- Stats / Impact --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
                    {[
                        { label: "Active Users", value: "50K+", color: "text-cyan-400" },
                        { label: "Videos Generated", value: "1M+", color: "text-purple-400" },
                        { label: "AI Models", value: "12", color: "text-blue-400" },
                        { label: "Countries", value: "85+", color: "text-emerald-400" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl text-center hover:bg-slate-900/60 transition-colors">
                            <div className={`text-3xl md:text-4xl font-extrabold mb-2 ${stat.color}`}>{stat.value}</div>
                            <div className="text-slate-500 text-sm uppercase font-bold tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* --- Core Values --- */}
                <div className="mb-32">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Zap />, title: "Innovation", desc: "Pushing the boundaries of what generative AI can achieve in real-time." },
                            { icon: <Heart />, title: "User-Centric", desc: "Building tools that adapt to the creator, not the other way around." },
                            { icon: <Users />, title: "Community", desc: "Fostering a space where creators inspire and learn from each other." }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl hover:border-slate-600 transition-colors">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl flex items-center justify-center text-white mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- CTA Section --- */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-slate-700 p-12 text-center">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start creating?</h2>
                        <p className="text-slate-300 max-w-xl mx-auto mb-8">
                            Join thousands of creators who are transforming their static images into immersive 3D videos today.
                        </p>
                        <Link to="/login">
                            <button className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                                Try DepthFlow for Free <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;