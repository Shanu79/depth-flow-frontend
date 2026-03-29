import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import {
  Copy,
  Info,
  Check
} from 'lucide-react';

const ApiDashboard = () => {
  const [activeTab, setActiveTab] = useState('cURL');
  
  // State for API Data
  const [apiKey, setApiKey] = useState('Loading...');
  const [credits, setCredits] = useState(0);
  const [showKey, setShowKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Fetch Data on Mount
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
      setApiKey('Error loading key');
    }
  };

  const copyToClipboard = (text) => {
    if (text === 'Loading...' || text === 'No key generated yet' || text === 'Error loading key') return;
    
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const getAuthHeader = () => {
    return showKey && apiKey !== 'Loading...' && apiKey !== 'No key generated yet' ? apiKey : 'YOUR_API_KEY';
  };

  // Helper to mask the key for display when hidden
  const getDisplayKey = () => {
    if (apiKey === 'Loading...' || apiKey === 'No key generated yet' || apiKey === 'Error loading key') {
      return apiKey;
    }
    return showKey ? apiKey : `df_live_${'•'.repeat(24)}`;
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 relative min-h-screen pb-6 bg-[#070514] overflow-hidden">
      {/* Background Glows (Matching your reference) */}
      <div className="absolute top-[-10%] left-[10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Dashboard Content */}
      <main className="flex-1 px-8 my-8 z-10">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-white tracking-wide">Dashboard</h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">Overview of your Depthflow account and API access.</p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Left Column (Spans 2) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Remaining Credits Card */}
              <div className="bg-gradient-to-br from-[#1c1a3b] to-[#120f26] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-purple-500/5 blur-[80px]"></div>
                <div className="relative z-10">
                  <h3 className="text-sm font-semibold text-white mb-2">Remaining Credits</h3>
                  <div className="mt-2 mb-8">
                    <span className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      {credits.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/10 pt-4 mt-2">
                    <span>Total credits available</span>
                    <span>Renew date: <span className="text-white">Oct 20</span></span>
                  </div>
                </div>
              </div>

              {/* API Access Card */}
              <div className="bg-[#0b081a] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">API Access</h3>

                <div className="bg-[#151029] border border-white/10 rounded-xl p-3 flex items-center justify-between mb-4">
                  <code className="text-sm font-mono text-gray-300 overflow-hidden text-ellipsis">
                    {getDisplayKey()}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(apiKey)}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    title="Copy to clipboard"
                  >
                    {copiedKey ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowKey(!showKey)}
                    className="flex-1 py-2.5 bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 font-medium rounded-xl text-sm transition-colors"
                  >
                    {showKey ? 'Hide Key' : 'Reveal Key'}
                  </button>
                  <button 
                    onClick={() => copyToClipboard(apiKey)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-medium rounded-xl text-sm transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)] flex justify-center items-center gap-2"
                  >
                    {copiedKey ? 'Copied!' : 'Copy Key'}
                  </button>
                </div>
              </div>

              {/* Optional Info Card */}
              <div className="bg-[#0b081a] border border-white/5 rounded-2xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-gray-300 block mb-0.5">(Optional)</span>
                  <p className="text-sm text-gray-400 leading-snug">
                    Start integrating Depthflow API into your applications.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column (Spans 3) */}
            <div className="lg:col-span-3">
              <div className="bg-[#0b081a] border border-white/5 rounded-2xl p-6 h-full">
                <h2 className="text-xl font-bold text-white mb-6">Integration Guide</h2>

                <div className="space-y-6">
                  {/* Endpoint */}
                  <div>
                    <h4 className="text-sm text-gray-300 mb-2">API Endpoint (POST)</h4>
                    <div className="bg-[#151029] border border-white/10 rounded-xl p-3">
                      <code className="text-sm font-mono text-gray-300">
                        https://api.depthflow.ai/v1/process
                      </code>
                    </div>
                  </div>

                  {/* Headers */}
                  <div>
                    <h4 className="text-sm text-gray-300 mb-2">Headers</h4>
                    <div className="bg-[#151029] border border-white/10 rounded-xl p-4">
                      <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                        Authorization: Bearer {getAuthHeader()}{'\n'}
                        Content-Type: application/json
                      </pre>
                    </div>
                  </div>

                  {/* Request Example */}
                  <div>
                    <h4 className="text-sm text-gray-300 mb-2">Request Example</h4>
                    <div className="bg-[#151029] border border-white/10 rounded-xl overflow-hidden">
                      {/* Tabs */}
                      <div className="flex border-b border-white/10 px-2 bg-[#0d091a]">
                        {['cURL', 'JavaScript', 'Python'].map(tab => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                                activeTab === tab
                                ? 'border-purple-500 text-white'
                                : 'border-transparent text-gray-500 hover:text-gray-300'
                              }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                      
                      {/* Code Box */}
                      <div className="p-4 overflow-x-auto custom-scrollbar">
                        {activeTab === 'cURL' && (
                          <pre className="text-sm font-mono leading-relaxed text-gray-300">
                            <span className="text-pink-400">curl</span> -X POST <span className="text-green-400">"https://api.depthflow.ai/v1/process"</span> \
                            <br />  -H <span className="text-yellow-300">"Authorization: Bearer {getAuthHeader()}"</span> \
                            <br />  -H <span className="text-yellow-300">"Content-Type: multipart/form-data"</span> \
                            <br />  -F <span className="text-blue-300">"file=@/path/to/image.jpg"</span> \
                            <br />  -F <span className="text-blue-300">'payload={'{'}"motion":{'{'}"style":"dolly"{'}'},"render":{'{'}"duration":5{'}'}{'}'}'</span>
                          </pre>
                        )}

                        {activeTab === 'JavaScript' && (
                          <pre className="text-sm font-mono leading-relaxed text-gray-300">
                            <span className="text-purple-400">const</span> formData = <span className="text-purple-400">new</span> <span className="text-yellow-200">FormData</span>();
                            <br />formData.<span className="text-blue-300">append</span>(<span className="text-green-400">"file"</span>, fileInput.files[<span className="text-orange-400">0</span>]);
                            <br />formData.<span className="text-blue-300">append</span>(<span className="text-green-400">"payload"</span>, JSON.<span className="text-blue-300">stringify</span>({'{'}
                            <br />  motion: {'{'} style: <span className="text-green-400">"dolly"</span> {'}'},
                            <br />  render: {'{'} duration: <span className="text-orange-400">5</span> {'}'}
                            <br />{'}'}));
                            <br /><br /><span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> <span className="text-blue-300">fetch</span>(<span className="text-green-400">"https://api.depthflow.ai/v1/process"</span>, {'{'}
                            <br />  method: <span className="text-green-400">"POST"</span>,
                            <br />  headers: {'{'}
                            <br />    <span className="text-green-400">"Authorization"</span>: <span className="text-green-400">`Bearer <span className="text-blue-200">${'{'}</span>YOUR_API_KEY<span className="text-blue-200">{'}'}</span>`</span>
                            <br />  {'}'},
                            <br />  body: formData
                            <br />{'}'});
                            <br /><br /><span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> response.<span className="text-blue-300">json</span>();
                          </pre>
                        )}

                        {activeTab === 'Python' && (
                          <pre className="text-sm font-mono leading-relaxed text-gray-300">
                            <span className="text-purple-400">import</span> requests
                            <br /><span className="text-purple-400">import</span> json
                            <br /><br />url = <span className="text-green-400">"https://api.depthflow.ai/v1/process"</span>
                            <br />headers = {'{'} <span className="text-green-400">"Authorization"</span>: <span className="text-green-400">f"Bearer {'{'}YOUR_API_KEY{'}'}"</span> {'}'}
                            <br />payload = {'{'}
                            <br />    <span className="text-green-400">"motion"</span>: {'{'} <span className="text-green-400">"style"</span>: <span className="text-green-400">"dolly"</span> {'}'},
                            <br />    <span className="text-green-400">"render"</span>: {'{'} <span className="text-green-400">"duration"</span>: <span className="text-orange-400">5</span> {'}'}
                            <br />{'}'}
                            <br /><br />files = {'{'}
                            <br />    <span className="text-green-400">"file"</span>: <span className="text-blue-300">open</span>(<span className="text-green-400">"/path/to/image.jpg"</span>, <span className="text-green-400">"rb"</span>),
                            <br />    <span className="text-green-400">"payload"</span>: (<span className="text-orange-400">None</span>, json.<span className="text-blue-300">dumps</span>(payload), <span className="text-green-400">"application/json"</span>)
                            <br />{'}'}
                            <br /><br />response = requests.<span className="text-blue-300">post</span>(url, headers=headers, files=files)
                            <br /><span className="text-blue-300">print</span>(response.<span className="text-blue-300">json</span>())
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Response Preview */}
                  <div>
                    <h4 className="text-sm text-gray-300 mb-2">Response Preview</h4>
                    <div className="bg-[#151029] border border-white/10 rounded-xl p-4 relative">
                      <span className="absolute top-3 right-3 text-xs text-gray-500 font-mono border border-white/10 rounded px-2 py-0.5 bg-black/20">JSON</span>
                      <pre className="text-sm font-mono leading-relaxed text-gray-300">
                        {'{'}<br />
                        {'  '}<span className="text-blue-300">"response"</span>: <span className="text-green-400">"success"</span><br />
                        {'}'}
                      </pre>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
};

export default ApiDashboard;