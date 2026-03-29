import React from 'react';

const ApiDocumentation = () => {
  return (
    <div className="min-h-screen w-full bg-[#070514] text-white font-sans flex relative overflow-hidden">
      
      {/* Ambient Background Nebulas */}
      <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-[#6b21a8] opacity-[0.15] blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#1d4ed8] opacity-[0.12] blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-8 py-12 relative z-10">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[32px] font-bold text-white mb-2 tracking-tight">API Documentation</h1>
          <p className="text-[#8a8a98] text-[15px]">Learn how to integrate Depthflow into your applications.</p>
        </div>

        {/* Top Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Authentication Card */}
          <div className="bg-[#18181d]/80 backdrop-blur-xl border border-[#2e2e38] rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <h2 className="text-[17px] font-semibold text-white mb-3">Authentication</h2>
            <p className="text-[#8a8a98] text-[14px] leading-relaxed mb-6 pr-4">
              All requests require an API key passed in the<br/>Authorization header as a Bearer token.
            </p>
            <p className="text-[#d1d1d6] text-[14px] mb-3 font-medium">Example</p>
            <div className="bg-[#121216] border border-[#2e2e38] rounded-xl p-3.5 font-mono text-[13px] text-[#e2e2e8] overflow-x-auto">
              Authorization: Bearer YOUR_API_KEY
            </div>
          </div>

          {/* Endpoint & Headers Card */}
          <div className="bg-[#18181d]/80 backdrop-blur-xl border border-[#2e2e38] rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <h2 className="text-[17px] font-semibold text-white mb-3">Endpoint</h2>
            <div className="bg-[#121216] border border-[#2e2e38] rounded-xl p-3.5 font-mono text-[13px] text-[#e2e2e8] mb-6 overflow-x-auto">
              POST https://api.depthflow.ai/v1/process
            </div>
            
            <h2 className="text-[17px] font-semibold text-white mb-3">Headers</h2>
            <div className="bg-[#121216] border border-[#2e2e38] rounded-xl p-3.5 font-mono text-[13px] text-[#e2e2e8] leading-relaxed overflow-x-auto">
              Authorization: Bearer YOUR_API_KEY<br/>
              Content-Type: application/json
            </div>
          </div>

        </div>

        {/* Request Example Card */}
        <div className="bg-[#18181d]/80 backdrop-blur-xl border border-[#2e2e38] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] mb-6 overflow-hidden">
          {/* Card Header with Tabs */}
          <div className="px-6 pt-5 pb-0 flex justify-between items-end border-b border-[#2e2e38]/0">
            <h2 className="text-[17px] font-semibold text-white pb-3">Request Example</h2>
            <div className="flex gap-6 text-[13px] font-medium">
              <button className="text-[#6a6a78] hover:text-[#d1d1d6] transition-colors pb-3">cURL</button>
              <button className="text-[#6a6a78] hover:text-[#d1d1d6] transition-colors pb-3">JS</button>
              <button className="text-[#e2e2e8] border-b-2 border-[#8b5cf6] pb-3 -mb-[2px] relative">Python</button>
            </div>
          </div>
          
          {/* Code Area */}
          <div className="p-6 pt-4">
            <div className="bg-[#121216] border border-[#2e2e38] rounded-xl p-5 font-mono text-[13px] leading-relaxed overflow-x-auto shadow-inner">
              <pre className="text-[#a0a0ab]">
                <span className="text-[#c678dd]">import</span> requests{'\n\n'}
                url = <span className="text-[#98c379]">"https://api.depthflow.ai/v1/process"</span>{'\n'}
                headers = &#123;<span className="text-[#98c379]">"Authorization"</span>: <span className="text-[#98c379]">"Bearer YOUR_API_KEY"</span>, <span className="text-[#98c379]">"Content-Type"</span>: <span className="text-[#98c379]">"application/json"</span>&#125;{'\n'}
                data = &#123;<span className="text-[#98c379]">"prompt"</span>: <span className="text-[#98c379]">"Modern landscape design"</span>, <span className="text-[#98c379]">"style"</span>: <span className="text-[#98c379]">"realistic"</span>, <span className="text-[#98c379]">"duration"</span>: <span className="text-[#d19a66]">10</span>&#125;{'\n'}
                response = requests.post(url, headers=headers, json=data){'\n'}
                <span className="text-[#56b6c2]">print</span>(response.json())
              </pre>
            </div>
          </div>
        </div>

        {/* Response Example Card */}
        <div className="bg-[#18181d]/80 backdrop-blur-xl border border-[#2e2e38] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] overflow-hidden">
          <div className="px-6 py-5 pb-2">
            <h2 className="text-[17px] font-semibold text-white">Response Example</h2>
          </div>
          
          {/* Code Area */}
          <div className="p-6 pt-3">
            <div className="bg-[#121216] border border-[#2e2e38] rounded-xl p-5 font-mono text-[13px] leading-relaxed overflow-x-auto shadow-inner">
              <pre className="text-[#a0a0ab]">
                &#123;{'\n'}
                {'  '}<span className="text-[#56b6c2]">"status"</span>: <span className="text-[#98c379]">"success"</span>,{'\n'}
                {'  '}<span className="text-[#56b6c2]">"image_url"</span>: <span className="text-[#98c379]">"https://storage.depthflow.ai/v1/images/generated_id.png"</span>,{'\n'}
                {'  '}<span className="text-[#56b6c2]">"request_id"</span>: <span className="text-[#98c379]">"df_req_x4z1b2v3"</span>,{'\n'}
                {'  '}<span className="text-[#56b6c2]">"duration_ms"</span>: <span className="text-[#d19a66]">1150</span>{'\n'}
                &#125;
              </pre>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ApiDocumentation;