import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import { Key, Copy, RefreshCw, Code, Check } from "lucide-react";

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
    <div className="flex-1 h-full relative overflow-hidden w-full font-sans text-white">
      {/* Background Glows to match the application's ambiance */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-8 relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white tracking-wide mb-2">
            API Keys
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Manage your API keys to authenticate requests to the DepthFlow
            engine.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* API Key Management Card */}
          <div className="bg-[#151124]/80 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] p-8 shrink-0">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/30 shadow-inner">
                <Key className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-lg font-bold text-white">Live Secret Key</h2>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  readOnly
                  value={apiKey}
                  className="w-full bg-[#0a0710] border border-white/10 text-gray-200 text-base rounded-xl p-4 font-mono outline-none focus:border-purple-500/50 shadow-inner transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold rounded-xl text-sm transition-colors"
                >
                  {showKey ? "Hide Key" : "Reveal Key"}
                </button>

                <button
                  onClick={() => copyToClipboard(apiKey, "key")}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2"
                >
                  {copiedKey ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copiedKey ? "Copied!" : "Copy Key"}
                </button>

                <div className="flex-1 min-w-[20px]"></div>

                <button
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className="px-5 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-medium rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`}
                  />
                  <span>{isRegenerating ? "Regenerating..." : "Roll Key"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Integration Quick Start Card */}
          <div className="bg-[#151124]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.2)] shrink-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/30 shadow-inner">
                <Code className="text-purple-400 w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Integration Quick Start
              </h2>
            </div>

            <div className="bg-[#0a0710] border border-purple-500/20 p-6 rounded-xl overflow-x-auto relative group shadow-inner custom-scrollbar">
              <button
                onClick={() => copyToClipboard(advancedCurlCommand, "advanced")}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                {copiedAdvanced ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-white" />
                )}
                {copiedAdvanced && (
                  <span className="text-xs text-green-400 font-medium">
                    Copied
                  </span>
                )}
              </button>

              <pre className="text-[13px] font-mono leading-loose text-gray-300">
                <span className="text-pink-400">curl</span> -X POST{" "}
                <span className="text-green-400">
                  "{API_BASE_URL}/ai/depthflow/generate-3d"
                </span>{" "}
                \
                <br /> -H{" "}
                <span className="text-yellow-300">
                  "X-API-Key: {getAuthHeader()}"
                </span>{" "}
                \
                <br /> -H{" "}
                <span className="text-yellow-300">
                  "accept: application/json"
                </span>{" "}
                \
                <br /> -H{" "}
                <span className="text-yellow-300">
                  "Content-Type: multipart/form-data"
                </span>{" "}
                \
                <br /> -F{" "}
                <span className="text-blue-300">
                  "file=@/path/to/your/image.jpg"
                </span>{" "}
                \
                <br /> -F{" "}
                <span className="text-blue-300">
                  'payload={"{"}"motion":{"{"}"style":"dolly","amplitude":0.2
                  {"}"},"render":{"{"}"duration":5{"}"},"plan":"free"{"}"}'
                </span>
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiKeysPage;
