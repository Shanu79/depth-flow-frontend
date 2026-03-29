import { Download } from 'lucide-react';

const ApiBilling = () => {
  return (
    <div className="min-h-screen w-full bg-[#070514] text-white font-sans flex relative overflow-hidden">
      
      {/* Ambient Background Nebulas */}
      <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-[#6b21a8] opacity-[0.15] blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#1d4ed8] opacity-[0.12] blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-8 py-12 relative z-10">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[32px] font-bold text-white mb-1">Billing</h1>
          <p className="text-[#8a8a98] text-[15px]">Manage your payments and invoices</p>
        </div>

        <div className="flex flex-col gap-6">
          
          {/* Current Plan Card */}
          <div className="bg-[#18181d]/80 backdrop-blur-xl border border-[#2e2e38] rounded-2xl p-6 flex justify-between items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <div>
              <p className="text-[#e2e2e8] font-semibold text-[15px] mb-3">Current Plan</p>
              <h2 className="text-[32px] font-bold text-white leading-tight tracking-tight mb-1">Pro Plan</h2>
              <p className="text-[#8a8a98] text-[15px]">Renew date: Oct 20</p>
            </div>
            <div>
              <span className="text-[56px] font-bold text-white tracking-tight leading-none">$49.99</span>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-[#18181d]/80 backdrop-blur-xl border border-[#2e2e38] rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <h3 className="text-white font-semibold text-[16px] mb-6">Payment Method</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {/* Visa Mock Logo */}
                <div className="bg-white px-2 py-1 rounded-[4px] flex items-center justify-center w-12 h-8">
                  <span className="text-[#1a1f71] font-bold text-[13px] tracking-tighter italic">VISA</span>
                </div>
                <span className="text-[#d1d1d6] text-[15px]">Visa ending 4242</span>
                <span className="bg-[#32323e] text-[#a0a0ab] px-3 py-1 rounded-full text-[13px] font-medium ml-2">
                  Default
                </span>
              </div>
              <button className="px-5 py-2.5 rounded-full border border-[#8b5cf6]/60 text-[#d8b4fe] text-[14px] font-medium transition-all hover:bg-[#8b5cf6]/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                Update Payment Method
              </button>
            </div>
          </div>

          {/* Invoices Card */}
          <div className="bg-[#18181d]/80 backdrop-blur-xl border border-[#2e2e38] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] overflow-hidden">
            <div className="p-6 border-b border-[#2e2e38]">
              <h3 className="text-white font-semibold text-[16px]">Invoices</h3>
            </div>
            
            <div className="w-full">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-[#2e2e38] bg-[#1d1d24]/50 text-[#8a8a98] text-[14px] font-medium">
                <div>Invoice ID</div>
                <div>Amount</div>
                <div>Status</div>
                <div>Date</div>
                <div className="text-right pl-4">Download</div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col">
                {/* Row 1 */}
                <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-[#2e2e38]/50 items-center text-[#d1d1d6] text-[14px]">
                  <div>INV-12345</div>
                  <div>$49.99</div>
                  <div>
                    <span className="bg-[#052e16] text-[#4ade80] px-3 py-1 rounded-full text-[13px] font-medium border border-[#14532d]">
                      Paid
                    </span>
                  </div>
                  <div>Sep 20, 2024</div>
                  <div className="flex justify-end pr-2">
                    <button className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
                      <Download size={20} strokeWidth={2} />
                    </button>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-[#2e2e38]/50 items-center text-[#d1d1d6] text-[14px]">
                  <div>INV-12346</div>
                  <div>$49.99</div>
                  <div>
                    <span className="bg-[#052e16] text-[#4ade80] px-3 py-1 rounded-full text-[13px] font-medium border border-[#14532d]">
                      Paid
                    </span>
                  </div>
                  <div>Aug 20, 2024</div>
                  <div className="flex justify-end pr-2">
                    <button className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
                      <Download size={20} strokeWidth={2} />
                    </button>
                  </div>
                </div>

                 {/* Row 3 (Partially visible in design, added for completeness) */}
                 <div className="grid grid-cols-5 gap-4 px-6 py-4 items-center text-[#d1d1d6] text-[14px]">
                  <div>INV-12347</div>
                  <div>$49.99</div>
                  <div>
                    <span className="bg-[#451a03] text-[#fb923c] px-3 py-1 rounded-full text-[13px] font-medium border border-[#7c2d12]">
                      Pending
                    </span>
                  </div>
                  <div>Jul 20, 2024</div>
                  <div className="flex justify-end pr-2">
                    <button className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
                      <Download size={20} strokeWidth={2} />
                    </button>
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

export default ApiBilling;