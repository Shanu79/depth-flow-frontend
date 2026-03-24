import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const ApiKeysPage = () => {
  const [apiKey, setApiKey] = useState('Loading...');
  const [credits, setCredits] = useState(0);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);

  // Define your base URL here (or pull from .env / config)
  const BASE_URL = "https://api.depthflow.io";

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
    if (!window.confirm("Are you sure? This will immediately invalidate your old API key and any applications using it will stop working.")) {
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Developer API</h1>
          <p className="text-gray-500 mt-2">Manage your API keys and access documentation to integrate DepthFlow into your own applications.</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Remaining Credits</h3>
            <p className="text-4xl font-extrabold text-blue-600 mt-2">{credits}</p>
            <p className="text-sm text-gray-500 mt-2">Cost: 20 credits per generation</p>
          </div>
        </div>

        {/* API Key Management */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your API Key</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative w-full">
              <input 
                type={showKey ? "text" : "password"} 
                readOnly 
                value={apiKey}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 font-mono"
              />
            </div>
            
            <button 
              onClick={() => setShowKey(!showKey)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors"
            >
              {showKey ? 'Hide' : 'Reveal'}
            </button>

            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors whitespace-nowrap"
            >
              {copied ? 'Copied!' : 'Copy Key'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">Compromised key? Generate a new one to secure your account.</p>
            <button 
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 font-medium rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              {isRegenerating ? 'Regenerating...' : 'Regenerate Key'}
            </button>
          </div>
        </div>

        {/* API Documentation */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Integration Guide</h2>
          <p className="text-gray-600 mb-6">Use the endpoint below to programmatically generate 3D videos from images.</p>

          <div className="space-y-4">
            <div>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold mr-2">POST</span>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono text-gray-800">{BASE_URL}/ai/generate-3d</code>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Required Headers</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                X-API-Key: {showKey && apiKey !== 'Loading...' && apiKey !== 'No key generated yet' ? apiKey : 'your_api_key_here'}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Form Data Parameters</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                <li><code className="text-blue-600 font-bold bg-blue-50 px-1 rounded">file</code>: (Required) The image file to process.</li>
                <li><code className="text-blue-600 font-bold bg-blue-50 px-1 rounded">style</code>: (Optional) "Dolly", "Orbit", or "Zoom" (Default: "Dolly").</li>
                <li><code className="text-blue-600 font-bold bg-blue-50 px-1 rounded">depth</code>: (Optional) 1-10 intensity scale (Default: 5).</li>
                <li><code className="text-blue-600 font-bold bg-blue-50 px-1 rounded">speed</code>: (Optional) 1-10 velocity multiplier (Default: 5).</li>
                <li><code className="text-blue-600 font-bold bg-blue-50 px-1 rounded">duration</code>: (Optional) Length of video in seconds (Default: 5).</li>
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-bold text-gray-900 mb-2">cURL Example</h4>
              <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre">
{`curl -X POST "${BASE_URL}/ai/generate-3d" \\
  -H "X-API-Key: ${showKey && apiKey !== 'Loading...' && apiKey !== 'No key generated yet' ? apiKey : 'your_api_key_here'}" \\
  -H "accept: application/json" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@/path/to/your/image.jpg" \\
  -F "style=Dolly" \\
  -F "depth=5" \\
  -F "speed=5" \\
  -F "duration=5"`}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ApiKeysPage;