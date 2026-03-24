import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const ApiKeysPage = () => {
  const [apiKey, setApiKey] = useState('Loading...');
  const [credits, setCredits] = useState(0);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* 2. Main Content Wrapper with top padding for fixed navbars */}
      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Developer API</h1>
            <p className="text-gray-500 mt-2 text-lg">Manage your API keys and access documentation to integrate DepthFlow.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: API Key & Stats (Takes up 1/3) */}
            <div className="lg:col-span-1 space-y-8">
              {/* Status Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Remaining Credits</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mt-4">{credits}</p>
                <p className="text-sm text-gray-500 mt-2 font-medium">Cost: <span className="text-blue-600 font-bold">20 credits</span> / generation</p>
              </div>

              {/* API Key Management */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Your API Key</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type={showKey ? "text" : "password"} 
                      readOnly 
                      value={apiKey}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl p-3.5 font-mono focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowKey(!showKey)}
                      className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
                    >
                      {showKey ? 'Hide Key' : 'Reveal Key'}
                    </button>

                    <button 
                      onClick={copyToClipboard}
                      className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
                    >
                      {copied ? 'Copied!' : 'Copy Key'}
                    </button>
                  </div>

                  <div className="pt-5 mt-5 border-t border-gray-100">
                    <button 
                      onClick={handleRegenerate}
                      disabled={isRegenerating}
                      className="w-full flex justify-center items-center space-x-2 px-4 py-2.5 border-2 border-red-100 text-red-600 hover:bg-red-50 font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>{isRegenerating ? 'Regenerating...' : 'Regenerate Key'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: API Documentation (Takes up 2/3) */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm h-full">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Integration Guide</h2>
                <p className="text-gray-500 mb-6">Use the endpoint below to programmatically generate 3D videos from your backend or scripts.</p>

                <div className="space-y-8">
                  
                  {/* Endpoint Area */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Endpoint</h4>
                    <div className="flex items-center bg-gray-50 border border-gray-200 p-1 rounded-lg">
                      <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-md font-bold mx-1">POST</span>
                      <code className="text-sm font-mono text-gray-800 ml-2 overflow-x-auto">{API_BASE_URL}/ai/generate-3d</code>
                    </div>
                  </div>

                  {/* Headers Area */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Required Headers</h4>
                    <div className="bg-gray-900 p-4 rounded-xl shadow-inner overflow-x-auto">
                      <code className="text-sm font-mono">
                        <span className="text-blue-400">X-API-Key</span>
                        <span className="text-gray-400">: </span>
                        <span className="text-green-400">{showKey && apiKey !== 'Loading...' && apiKey !== 'No key generated yet' ? apiKey : 'your_api_key_here'}</span>
                      </code>
                    </div>
                  </div>

                  {/* Parameters */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Form Data Parameters</h4>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start"><span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mr-3 border border-blue-100">file</span> <span className="mt-0.5"><strong className="text-gray-900">Required.</strong> The raw image file to process.</span></li>
                        <li className="flex items-start"><span className="font-bold text-gray-700 bg-white px-2 py-0.5 rounded mr-3 border border-gray-200">style</span> <span className="mt-0.5">Optional. "Dolly", "Orbit", or "Zoom" (Default: "Dolly").</span></li>
                        <li className="flex items-start"><span className="font-bold text-gray-700 bg-white px-2 py-0.5 rounded mr-3 border border-gray-200">depth</span> <span className="mt-0.5">Optional. 1-10 intensity scale (Default: 5).</span></li>
                        <li className="flex items-start"><span className="font-bold text-gray-700 bg-white px-2 py-0.5 rounded mr-3 border border-gray-200">speed</span> <span className="mt-0.5">Optional. 1-10 velocity multiplier (Default: 5).</span></li>
                        <li className="flex items-start"><span className="font-bold text-gray-700 bg-white px-2 py-0.5 rounded mr-3 border border-gray-200">duration</span> <span className="mt-0.5">Optional. Length of video in seconds (Default: 5).</span></li>
                      </ul>
                    </div>
                  </div>

                  {/* cURL Example */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">cURL Request Example</h4>
                    <div className="bg-gray-900 p-5 rounded-xl shadow-inner overflow-x-auto">
                      <pre className="text-sm font-mono text-gray-300 leading-relaxed">
<span className="text-pink-400">curl</span> -X POST <span className="text-green-400">"{API_BASE_URL}/ai/generate-3d"</span> \
  -H <span className="text-yellow-300">"X-API-Key: {showKey && apiKey !== 'Loading...' && apiKey !== 'No key generated yet' ? apiKey : 'your_api_key_here'}"</span> \
  -H <span className="text-yellow-300">"accept: application/json"</span> \
  -H <span className="text-yellow-300">"Content-Type: multipart/form-data"</span> \
  -F <span className="text-blue-300">"file=@/path/to/your/image.jpg"</span> \
  -F <span className="text-blue-300">"style=Dolly"</span> \
  -F <span className="text-blue-300">"depth=5"</span> \
  -F <span className="text-blue-300">"speed=5"</span> \
  -F <span className="text-blue-300">"duration=5"</span>
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

export default ApiKeysPage;