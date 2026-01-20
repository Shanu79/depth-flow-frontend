import React from 'react';
import { Check, AlertTriangle, Minus, Zap, DollarSign, Image as ImageIcon, Gift, Layers, Layout } from 'lucide-react';
import FullLogo from './FullLogo';

const ComparisonTable = () => {
    const features = [
        {
            name: "Working Experience",
            icon: <Layout className="w-5 h-5" />,
            depthflow: "Simple, fast, and clean workspace with smooth flow and minimal loading",
            immersity: "Heavy interface with more loading and complex steps",
            others: "Often cluttered dashboards and confusing workflows"
        },
        {
            name: "Starting Plans",
            icon: <DollarSign className="w-5 h-5" />,
            depthflow: "Very affordable, starts at $3.99 / use anytime (flexible)",
            immersity: "Starts at $4.99 / monthly with limited flexibility",
            others: "Mostly higher-priced plans or locked subscriptions"
        },
        {
            name: "Credit Usage & Quality",
            icon: <ImageIcon className="w-5 h-5" />,
            depthflow: "Only 20 credits for a full high-quality MP4 video. No extra charges, any style, smooth download",
            immersity: "~60 credits (~$0.60) for output; higher quality costs more, slower processing, often limited to 720p with lag",
            others: "Credit rules unclear; quality varies and often lower"
        },
        {
            name: "Speed & Results",
            icon: <Zap className="w-5 h-5" />,
            depthflow: "Easy to use and fast results with stable performance",
            immersity: "Slower and heavy processing; delayed results",
            others: "Performance varies; can be slow during peak times"
        },
        {
            name: "Offers & Discounts",
            icon: <Gift className="w-5 h-5" />,
            depthflow: "Regular coupon codes and offers to reduce pricing further",
            immersity: "No coupons or offers typically available",
            others: "Discounts are rare or limited to special deals"
        },
        {
            name: "Overall",
            icon: <Layers className="w-5 h-5" />,
            depthflow: "Best balance of speed, price, simplicity, and quality — ideal for creators and businesses",
            immersity: "Powerful tech but slower and more expensive for regular use",
            others: "Often complex, costly, and less beginner-friendly"
        }
    ];

    return (
        <section className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden font-sans">
            {/* Background Ambience (Galaxy effect) */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Difference</span>
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Why creators choose Depthflow AI over other 2D to 3D tools
                    </p>
                </div>

                {/* --- DESKTOP GRID VIEW --- */}
                <div className="hidden lg:grid grid-cols-[1.2fr_1.5fr_1.2fr_1.2fr] gap-0 border border-white/10 rounded-3xl overflow-hidden bg-slate-900/40 backdrop-blur-md">

                    {/* HEADERS */}
                    {/* Label Header */}
                    <div className="p-8 border-b border-r border-white/10 flex items-center bg-slate-900/50">
                        {/* Empty/Logo Space */}
                    </div>

                    {/* Depthflow Header (Highlighted) */}
                    <div className="p-8 border-b border-white/10 relative bg-gradient-to-b from-purple-900/40 to-slate-900/40">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="text-2xl font-bold text-white flex items-center gap-2">
                                <FullLogo/>
                            </div>
                        </div>
                    </div>

                    {/* Immersity Header (Dimmed) */}
                    <div className="p-8 border-b border-r border-white/10 flex items-center justify-center opacity-50 grayscale">
                        <h3 className="text-xl font-bold text-slate-300 flex items-center gap-2">
                            immersity AI
                        </h3>
                    </div>

                    {/* Others Header (Dimmed) */}
                    <div className="p-8 border-b border-white/10 flex items-center justify-center opacity-40 grayscale">
                        <h3 className="text-xl font-bold text-slate-400">Other AI 3D Platforms</h3>
                    </div>

                    {/* ROWS */}
                    {features.map((item, idx) => (
                        <React.Fragment key={idx}>

                            {/* Feature Label */}
                            <div className="p-6 border-b border-r border-white/10 flex items-center gap-3 text-slate-300 font-medium bg-slate-900/30">
                                {item.icon && <span className="text-slate-500">{item.icon}</span>}
                                {item.name}
                            </div>

                            {/* Depthflow Data (Highlighted) */}
                            <div className="p-6 border-b border-white/10 bg-purple-900/10 flex items-start gap-4 relative">
                                {/* Glow effect behind active cell */}
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>

                                <div className="mt-1 min-w-[20px] text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                                    <Check className="w-5 h-5 stroke-[3]" />
                                </div>
                                <p className="text-white text-sm font-medium leading-relaxed">
                                    {item.depthflow}
                                </p>
                            </div>

                            {/* Immersity Data (Dimmed) */}
                            <div className="p-6 border-b border-r border-white/10 flex items-start gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300">
                                <div className="mt-1 min-w-[20px] text-yellow-500">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {item.immersity}
                                </p>
                            </div>

                            {/* Others Data (Dimmed) */}
                            <div className="p-6 border-b border-white/10 flex items-start gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300">
                                <div className="mt-1 min-w-[20px] text-slate-500">
                                    <Minus className="w-5 h-5" />
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {item.others}
                                </p>
                            </div>

                        </React.Fragment>
                    ))}
                </div>

                {/* --- MOBILE VIEW (Stack) --- */}
                <div className="lg:hidden space-y-6">
                    {features.map((item, idx) => (
                        <div key={idx} className="rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden backdrop-blur-sm">
                            {/* Feature Header */}
                            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center gap-3 text-slate-200 font-bold">
                                {item.icon} {item.name}
                            </div>

                            {/* Depthflow Section (Bright) */}
                            <div className="px-5 py-12 bg-gradient-to-r from-purple-900/20 to-slate-900/20 border-b border-white/5 relative">
                                <div className="absolute top-3 right-3 text-[10px] font-bold text-cyan-300 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-500/30">
                                    DEPTHFLOW AI
                                </div>
                                <div className="flex gap-3">
                                    <Check className="w-5 h-5 text-green-400 shrink-0" />
                                    <p className="text-white text-sm font-medium">{item.depthflow}</p>
                                </div>
                            </div>

                            {/* Competitors (Dimmed) */}
                            <div className="grid grid-cols-1 divide-y divide-white/5 bg-black/20">
                                <div className="p-4 flex gap-3 opacity-50">
                                    <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Immersity AI</p>
                                        <p className="text-slate-400 text-xs">{item.immersity}</p>
                                    </div>
                                </div>
                                <div className="p-4 flex gap-3 opacity-40">
                                    <Minus className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Others</p>
                                        <p className="text-slate-400 text-xs">{item.others}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ComparisonTable;