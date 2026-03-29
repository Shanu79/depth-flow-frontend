import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import { Key, Copy, RefreshCw, Code } from "lucide-react";

const ApiKeysPage = () => {
  const [apiKey, setApiKey] = useState("Loading...");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedAdvanced, setCopiedAdvanced] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setApiKey(data.api_key || "No key generated yet");
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const handleRegenerate = async () => {
    if (
      !window.confirm(
        "Are you sure? This will immediately invalidate your old API key.",
      )
    )
      return;
    setIsRegenerating(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/auth/regenerate-api-key`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
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
    if (type === "key") {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedAdvanced(true);
      setTimeout(() => setCopiedAdvanced(false), 2000);
    }
  };

  const getAuthHeader = () =>
    showKey && apiKey !== "Loading..." && apiKey !== "No key generated yet"
      ? apiKey
      : "your_api_key_here";

  const advancedCurlCommand = `curl -X POST "${API_BASE_URL}/ai/depthflow/generate-3d" \\
  -H "X-API-Key: ${getAuthHeader()}" \\
  -H "accept: application/json" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@/path/to/your/image.jpg" \\
  -F 'payload={"motion":{"style":"dolly","amplitude":0.2},"render":{"duration":5},"plan":"free"}'`;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-wide">
          API Keys
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Manage your API keys to authenticate requests to the DepthFlow engine.
        </p>
      </div>

      <div className="space-y-8">
        {/* API Key Management */}
        <div className="bg-[#0b081a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 bg-blue-900/30 rounded-xl border border-blue-500/30">
              <Key className="w-5 h-5 text-blue-300" />
            </div>
            <h2 className="text-lg font-bold text-white">Live Secret Key</h2>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                readOnly
                value={apiKey}
                className="w-full bg-[#151029] border border-white/10 text-gray-200 text-sm rounded-xl p-3.5 font-mono outline-none focus:border-purple-500/50"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowKey(!showKey)}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold rounded-xl text-sm transition-colors"
              >
                {showKey ? "Hide" : "Reveal"}
              </button>

              <button
                onClick={() => copyToClipboard(apiKey, "key")}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copiedKey ? "Copied!" : "Copy"}
              </button>

              <div className="flex-1"></div>

              <button
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="px-4 py-2.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 font-medium rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`}
                />
                <span>{isRegenerating ? "Regenerating..." : "Roll Key"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Integration Quick Start */}
        <div className="bg-[#0b081a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Code className="text-purple-400 w-6 h-6" />
            <h2 className="text-xl font-bold text-white">
              Integration Quick Start
            </h2>
          </div>

          <div className="bg-black/80 border border-purple-500/20 p-5 rounded-xl overflow-x-auto relative group custom-scrollbar">
            <button
              onClick={() => copyToClipboard(advancedCurlCommand, "advanced")}
              className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded transition-opacity flex items-center gap-1"
            >
              <Copy className="w-4 h-4 text-gray-300" />
              {copiedAdvanced && (
                <span className="text-xs text-white">Copied</span>
              )}
            </button>
            <pre className="text-xs font-mono leading-relaxed whitespace-pre text-gray-300">
              <span className="text-pink-400">curl</span> -X POST{" "}
              <span className="text-green-400">
                "{API_BASE_URL}/ai/depthflow/generate-3d"
              </span>{" "}
              \ -H{" "}
              <span className="text-yellow-300">
                "X-API-Key: {getAuthHeader()}"
              </span>{" "}
              \ -H{" "}
              <span className="text-yellow-300">
                "Content-Type: multipart/form-data"
              </span>{" "}
              \ -F{" "}
              <span className="text-blue-300">"file=@/path/to/image.jpg"</span>{" "}
              \ -F{" "}
              <span className="text-blue-300">
                'payload={"{"}"motion":{"{"}"style":"dolly"{"}"},"render":{"{"}
                "duration":5{"}"}
                {"}"}'
              </span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysPage;
