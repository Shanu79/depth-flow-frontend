import React, { useState, useEffect } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { API_BASE_URL } from "../../config";

const ApiBilling = () => {
  const [billingData, setBillingData] = useState(null);
  const [billingLoading, setBillingLoading] = useState(true);
  
  const [invoices, setInvoices] = useState([]);
  const [invoicesLoading, setInvoicesLoading] = useState(true);

  // Define API Prices mapping
  const API_PRICES = {
    "Free": "$0.00",
    "Basic": "$19.99",
    "Pro": "$49.99"
  };

  useEffect(() => {
    // 1. Fetch Billing Details
    const fetchBillingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = API_BASE_URL || "http://localhost:8000";

        const response = await fetch(`${apiUrl}/ai/depthflow/billing`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setBillingData(data);
        } else {
          console.error("Failed to fetch billing data");
        }
      } catch (err) {
        console.error("Billing fetch error:", err);
      } finally {
        setBillingLoading(false);
      }
    };

    // 2. Fetch Payment/Invoice History
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = API_BASE_URL || "http://localhost:8000";

        const response = await fetch(`${apiUrl}/payments/history`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setInvoices(data);
        }
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setInvoicesLoading(false);
      }
    };

    fetchBillingDetails();
    fetchInvoices();
  }, []);

  // Show a loading spinner while fetching data
  if (billingLoading) {
    return (
      <div className="min-h-screen w-full bg-[#070514] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#8b5cf6] animate-spin" />
      </div>
    );
  }

  // Extract dynamic values using the API specific payload from /billing
  const apiData = billingData?.api || {};
  const planName = apiData.plan || "Free";
  const renewDate = apiData.next_billing_date !== "N/A" ? apiData.next_billing_date : "End of Cycle";
  const price = API_PRICES[planName] || "$0.00";

  return (
    <div className="min-h-screen w-full bg-[#070514] text-white font-sans flex relative overflow-hidden">
      
      {/* Ambient Background Nebulas */}
      <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-[#6b21a8] opacity-[0.15] blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#1d4ed8] opacity-[0.12] blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-8 py-12 relative z-10">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white tracking-wide">API Billing</h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">Manage your developer plan and API invoices</p>
        </div>

        <div className="flex flex-col gap-6">
          
          {/* Current Plan Card (DYNAMIC) */}
          <div className="bg-[#18181d]/80 backdrop-blur-xl border border-[#2e2e38] rounded-2xl p-6 flex justify-between items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <div>
              <p className="text-[#e2e2e8] font-semibold text-[15px] mb-3">Current API Plan</p>
              <h2 className="text-[32px] font-bold text-white leading-tight tracking-tight mb-1">{planName}</h2>
              <p className="text-[#8a8a98] text-[15px]">Renew date: {renewDate}</p>
            </div>
            <div>
              <span className="text-[56px] font-bold text-white tracking-tight leading-none">{price}</span>
            </div>
          </div>

          {/* Payment Method Card (STATIC PLACEHOLDER) */}
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

          {/* Invoices Card (DYNAMIC) */}
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

              {invoicesLoading ? (
                 <div className="p-8 flex justify-center items-center">
                   <Loader2 className="w-6 h-6 text-[#8b5cf6] animate-spin" />
                 </div>
              ) : invoices.length === 0 ? (
                 <div className="p-8 text-center text-[#8a8a98] text-sm">
                   No invoices found.
                 </div>
              ) : (
                /* Table Rows */
                <div className="flex flex-col max-h-[400px] overflow-y-auto">
                  {invoices.map((invoice, index) => {
                    const dateObj = new Date(invoice.created_at);
                    const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                    
                    return (
                      <div key={invoice.id || index} className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-[#2e2e38]/50 items-center text-[#d1d1d6] text-[14px] hover:bg-white/[0.02] transition-colors">
                        <div className="font-mono text-[#8a8a98]">
                          {invoice.id ? invoice.id : `INV-${Math.floor(Math.random() * 90000) + 10000}`}
                        </div>
                        <div>${(invoice.amount / 100).toFixed(2) || "0.00"}</div>
                        <div>
                          {invoice.status === 'paid' ? (
                            <span className="bg-[#052e16] text-[#4ade80] px-3 py-1 rounded-full text-[13px] font-medium border border-[#14532d]">
                              Paid
                            </span>
                          ) : (
                            <span className="bg-[#451a03] text-[#fb923c] px-3 py-1 rounded-full text-[13px] font-medium border border-[#7c2d12]">
                              Pending
                            </span>
                          )}
                        </div>
                        <div>{formattedDate}</div>
                        <div className="flex justify-end pr-2">
                          <button 
                            onClick={() => window.open(invoice.invoice_url, '_blank')}
                            disabled={!invoice.invoice_url}
                            className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Download Invoice"
                          >
                            <Download size={20} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ApiBilling;