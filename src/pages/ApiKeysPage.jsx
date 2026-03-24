import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { Key, Copy, RefreshCw, Zap, Server, Code } from 'lucide-react';

const ApiKeysPage = () => {
    const [apiKey, setApiKey] = useState('Loading...');
    const [credits, setCredits] = useState(0);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [copiedKey, setCopiedKey] = useState(false);
    const [copiedBasic, setCopiedBasic] = useState(false);
    const [copiedAdvanced, setCopiedAdvanced] = useState(false);
    const [showKey, setShowKey] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setApiKey(data.api_key || 'No key generated yet');
            setCredits(data.credits || 0);
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    const handleRegenerate = async () => {
        if (!window.confirm("Are you sure? This will immediately invalidate your old API key, and any applications using it will stop working.")) {
            return;
        }

        setIsRegenerating(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/auth/regenerate-api-key`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.api_key) {
                setApiKey(data.api_key);
                setShowKey(true);
            }
        } catch (error) {
            alert("Failed to regenerate API key.");
        } finally {
            setIsRegenerating(false);
        }
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        if (type === 'key') {
            setCopiedKey(true);
            setTimeout(() => setCopiedKey(false), 2000);
        } else if (type === 'basic') {
            setCopiedBasic(true);
            setTimeout(() => setCopiedBasic(false), 2000);
        } else if (type === 'advanced') {
            setCopiedAdvanced(true);
            setTimeout(() => setCopiedAdvanced(false), 2000);
        }
    };

    const payloadExample = JSON.stringify({
        motion: { style: "dolly", amplitude: 0.2, speed: 1.0, focus: 0.0, phase: 0.0, reverse: false, smooth: true, loop: true },
        render: { duration: 5, fps: 30, quality: 50, ssaa: 1.0, edge_fix: 5, invert_depth: 0.0, tiling_mode: "mirror" },
        effects: { dof_enable: false, dof_intensity: 1.0, dof_start: 0.6, dof_end: 1.0, vignette_enable: false, vignette_intensity: 0.4, vignette_decay: 20.0, color_enable: false, color_saturation: 110, color_contrast: 100, color_brightness: 100, color_sepia: 0 },
        plan: "free"
    }, null, 2);

    const getAuthHeader = () => {
        return showKey && apiKey !== 'Loading...' && apiKey !== 'No key generated yet' ? apiKey : 'your_api_key_here';
    };

    const basicCurlCommand = `curl -X POST "${API_BASE_URL}/ai/depthflow/generate-3d" \\
  -H "X-API-Key: ${getAuthHeader()}" \\
  -H "accept: application/json" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@/path/to/your/image.jpg" \\
  -F 'payload={"motion":{"style":"dolly"},"render":{"duration":5},"plan":"free"}'`;

    const advancedCurlCommand = `curl -X POST "${API_BASE_URL}/ai/depthflow/generate-3d" \\
  -H "X-API-Key: ${getAuthHeader()}" \\
  -H "accept: application/json" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@/path/to/your/image.jpg" \\
  -F 'payload={"motion":{"style":"dolly","amplitude":0.2,"speed":1.0,"focus":0.0,"phase":0.0,"reverse":false,"smooth":true,"loop":true},"render":{"duration":5,"fps":30,"quality":50,"ssaa":1.0,"edge_fix":5,"invert_depth":0.0,"tiling_mode":"mirror"},"effects":{"dof_enable":false,"dof_intensity":1.0,"dof_start":0.6,"dof_end":1.0,"vignette_enable":false,"vignette_intensity":0.4,"vignette_decay":20.0,"color_enable":false,"color_saturation":110,"color_contrast":100,"color_brightness":100,"color_sepia":0},"plan":"free"}'`;

    return (
        <div className="flex-1 w-full bg-[#070514] text-white font-sans relative flex flex-col overflow-x-hidden min-h-screen">

            {/* Percentage-Based Background Glows (Matching Workspace) */}
            <div className="absolute top-0 left-0 md:left-[20%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-purple-600/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none z-0"></div>
            <div className="absolute bottom-0 right-0 md:right-[20%] w-[80vw] md:w-[45vw] h-[80vw] md:h-[45vw] bg-indigo-600/10 rounded-full blur-[120px] md:blur-[150px] pointer-events-none z-0"></div>

            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="text-center md:text-left mb-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide flex items-center justify-center md:justify-start gap-3">
                            <Server className="text-purple-400 w-8 h-8" />
                            Developer API
                        </h1>
                        <p className="text-gray-400 mt-3 text-lg">Manage your API keys and integrate the DepthFlow engine into your own applications.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* Left Column: API Key & Stats */}
                        <div className="lg:col-span-1 space-y-6">

                            {/* Status Card */}
                            <div className="bg-[#0b081a]/90 backdrop-blur-xl border-2 border-purple-500/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2.5 bg-purple-900/50 rounded-xl border border-purple-500/30">
                                        <Zap className="w-5 h-5 text-purple-300" />
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Remaining Credits</h3>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">{credits}</p>
                                    <span className="text-gray-400 font-medium">credits</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <p className="text-sm text-gray-400 font-medium">Cost: <span className="text-purple-400 font-bold">20 credits</span> / generation</p>
                                </div>
                            </div>

                            {/* API Key Management */}
                            <div className="bg-[#0b081a]/90 backdrop-blur-xl border-2 border-purple-500/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-2.5 bg-blue-900/30 rounded-xl border border-blue-500/30">
                                        <Key className="w-5 h-5 text-blue-300" />
                                    </div>
                                    <h2 className="text-lg font-bold text-white">Your API Key</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type={showKey ? "text" : "password"}
                                            readOnly
                                            value={apiKey}
                                            className="w-full bg-[#151029] border border-white/10 text-gray-200 text-sm rounded-xl p-3.5 font-mono outline-none focus:border-purple-500/50 shadow-inner"
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowKey(!showKey)}
                                            className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold rounded-xl text-sm transition-colors"
                                        >
                                            {showKey ? 'Hide Key' : 'Reveal Key'}
                                        </button>

                                        <button
                                            onClick={() => copyToClipboard(apiKey, 'key')}
                                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                        >
                                            <Copy className="w-4 h-4" />
                                            {copiedKey ? 'Copied!' : 'Copy Key'}
                                        </button>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-white/10">
                                        <button
                                            onClick={handleRegenerate}
                                            disabled={isRegenerating}
                                            className="w-full flex justify-center items-center space-x-2 px-4 py-2.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 font-medium rounded-xl text-sm transition-colors disabled:opacity-50"
                                        >
                                            <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                                            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate Key'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: API Documentation */}
                        <div className="lg:col-span-2">
                            <div className="bg-[#0b081a]/90 backdrop-blur-xl border-2 border-purple-500/40 rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(168,85,247,0.2)] h-full">

                                <div className="flex items-center gap-3 mb-6">
                                    <Code className="text-purple-400 w-6 h-6" />
                                    <h2 className="text-xl font-bold text-white">Integration Guide</h2>
                                </div>

                                <p className="text-gray-400 mb-8 text-sm md:text-base">DepthFlow uses a unified multipart JSON payload to process renders. Send the image file and a stringified JSON object containing your rendering configurations.</p>

                                <div className="space-y-8">

                                    {/* Endpoint Area */}
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Endpoint</h4>
                                        <div className="flex items-center bg-[#151029] border border-white/10 p-1.5 rounded-xl">
                                            <span className="bg-purple-600/30 text-purple-300 text-xs px-3 py-1.5 rounded-lg font-bold mx-1 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)] shrink-0">POST</span>
                                            <code className="text-sm font-mono text-gray-300 ml-2 overflow-x-auto custom-scrollbar pb-1 whitespace-nowrap px-2">{API_BASE_URL}/ai/depthflow/generate-3d</code>
                                        </div>
                                    </div>

                                    {/* Headers Area */}
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Required Headers</h4>
                                        <div className="bg-black/60 border border-white/5 p-4 rounded-xl shadow-inner overflow-x-auto custom-scrollbar pb-1">
                                            <code className="text-sm font-mono">
                                                <span className="text-indigo-400">X-API-Key</span>
                                                <span className="text-gray-500">: </span>
                                                <span className="text-green-400">{getAuthHeader()}</span>
                                            </code>
                                        </div>
                                    </div>

                                    {/* Parameters Area */}
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Multipart Form Data</h4>
                                        <div className="bg-[#151029] border border-white/10 rounded-xl overflow-hidden">
                                            <div className="p-4 border-b border-white/10 flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                                                <span className="font-mono text-sm text-pink-400 font-bold bg-pink-400/10 px-2 py-1 rounded w-fit">file</span>
                                                <div className="text-sm text-gray-400 mt-1 md:mt-0"><strong className="text-gray-200">Required.</strong> Binary image file (JPG, PNG, WebP).</div>
                                            </div>
                                            <div className="p-4 flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                                                <span className="font-mono text-sm text-blue-400 font-bold bg-blue-400/10 px-2 py-1 rounded w-fit">payload</span>
                                                <div className="text-sm text-gray-400 mt-1 md:mt-0 w-full">
                                                    <strong className="text-gray-200">Required.</strong> A stringified JSON object defining the engine behavior.

                                                    <div className="mt-3 bg-black/50 border border-white/5 rounded-lg p-3 overflow-x-auto custom-scrollbar pb-1">
                                                        <pre className="text-xs font-mono text-gray-300">
                                                            {payloadExample}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* cURL Examples */}
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">cURL Request Examples</h4>

                                        <div className="space-y-6">
                                            {/* Basic Mode */}
                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-semibold text-gray-300">1. Basic Mode <span className="text-gray-500 font-normal">(Minimal Options)</span></span>
                                                </div>
                                                <div className="bg-black/80 border border-purple-500/20 p-5 rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-x-auto custom-scrollbar pb-1 relative group">
                                                    <button
                                                        onClick={() => copyToClipboard(basicCurlCommand, 'basic')}
                                                        className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                                                    >
                                                        <Copy className="w-4 h-4 text-gray-300" />
                                                        {copiedBasic && <span className="text-xs text-white">Copied</span>}
                                                    </button>
                                                    <pre className="text-xs md:text-sm font-mono leading-relaxed whitespace-pre text-gray-300">
                                                        <span className="text-pink-400">curl</span> -X POST <span className="text-green-400">"{API_BASE_URL}/ai/depthflow/generate-3d"</span> \
                                                        -H <span className="text-yellow-300">"X-API-Key: {getAuthHeader()}"</span> \
                                                        -H <span className="text-yellow-300">"accept: application/json"</span> \
                                                        -H <span className="text-yellow-300">"Content-Type: multipart/form-data"</span> \
                                                        -F <span className="text-blue-300">"file=@/path/to/your/image.jpg"</span> \
                                                        -F <span className="text-blue-300">'payload={'{'}"motion":{'{'}"style":"dolly"{'}'},"render":{'{'}"duration":5{'}'},"plan":"free"{'}'}'</span>
                                                    </pre>
                                                </div>
                                            </div>

                                            {/* Advanced Mode */}
                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-semibold text-gray-300">2. Advanced Mode <span className="text-gray-500 font-normal">(All Options)</span></span>
                                                </div>
                                                <div className="bg-black/80 border border-purple-500/20 p-5 rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-x-auto custom-scrollbar pb-1 relative group">
                                                    <button
                                                        onClick={() => copyToClipboard(advancedCurlCommand, 'advanced')}
                                                        className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                                                    >
                                                        <Copy className="w-4 h-4 text-gray-300" />
                                                        {copiedAdvanced && <span className="text-xs text-white">Copied</span>}
                                                    </button>
                                                    <pre className="text-xs md:text-sm font-mono leading-relaxed whitespace-pre text-gray-300">
                                                        <span className="text-pink-400">curl</span> -X POST <span className="text-green-400">"{API_BASE_URL}/ai/depthflow/generate-3d"</span> \
                                                        -H <span className="text-yellow-300">"X-API-Key: {getAuthHeader()}"</span> \
                                                        -H <span className="text-yellow-300">"accept: application/json"</span> \
                                                        -H <span className="text-yellow-300">"Content-Type: multipart/form-data"</span> \
                                                        -F <span className="text-blue-300">"file=@/path/to/your/image.jpg"</span> \
                                                        -F <span className="text-blue-300">'payload={'{'}"motion":{'{'}"style":"dolly","amplitude":0.2,"speed":1.0,"focus":0.0,"phase":0.0,"reverse":false,"smooth":true,"loop":true{'}'},"render":{'{'}"duration":5,"fps":30,"quality":50,"ssaa":1.0,"edge_fix":5,"invert_depth":0.0,"tiling_mode":"mirror"{'}'},"effects":{'{'}"dof_enable":false,"dof_intensity":1.0,"dof_start":0.6,"dof_end":1.0,"vignette_enable":false,"vignette_intensity":0.4,"vignette_decay":20.0,"color_enable":false,"color_saturation":110,"color_contrast":100,"color_brightness":100,"color_sepia":0{'}'},"plan":"free"{'}'}'</span>
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.3); border-radius: 4px; }
      `}} />
        </div>
    );
};

export default ApiKeysPage;