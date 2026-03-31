import React, { useState, useEffect } from 'react';
import { Zap, Shield, Loader2, AlertTriangle, X, CalendarClock, RotateCcw, Download, Receipt } from 'lucide-react';
import useAuthStore from "../stores/authStore";
import { API_BASE_URL } from '../config'; 

const BillingPage = () => {
  const refreshUser = useAuthStore((state) => state.refreshUser);
  const syncSubscription = useAuthStore((state) => state.syncSubscription);
  
  const [loading, setLoading] = useState(false);
  
  // --- NEW: Billing Endpoint State ---
  const [billingData, setBillingData] = useState(null);
  const [billingLoading, setBillingLoading] = useState(true);

  // Invoice History State
  const [invoicesLoading, setInvoicesLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  
  // Modal State
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  // --- 1. FIXED PRICES ---
  const PLANS = {
    Trial: { price: 3.99, label: "Trial Plan" },
    Basic: { price: 9.99, label: "Basic Plan" },
    Pro: { price: 19.99, label: "Pro Plan" }
  };

  // --- FETCH BILLING DATA ---
  const fetchBillingDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      // Make sure this matches where your router is mounted (e.g., /ai/depthflow/billing)
      const response = await fetch(`${API_BASE_URL}/ai/depthflow/billing`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setBillingData(data);
      }
    } catch (err) {
      console.error("Billing fetch error:", err);
    } finally {
      setBillingLoading(false);
    }
  };

  // --- FORCE SYNC AND FETCH ON MOUNT ---
  useEffect(() => {
    const init = async () => {
      await syncSubscription(); // Sync with Dodo first
      await fetchBillingDetails(); // Then fetch the updated DB info
    };
    init();
  }, [syncSubscription]);

  // --- FETCH PAYMENT / INVOICE HISTORY ---
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/payments/history`, {
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
    fetchInvoices();
  }, []);

  // --- EXTRACT DYNAMIC VALUES FROM API ---
  const platformData = billingData?.platform || {};
  const currentPlanName = platformData.plan || "Free";
  const currentPlan = PLANS[currentPlanName] ? currentPlanName : "Free";
  const statusStr = platformData.status || "Inactive";
  const credits = billingData?.credits || 0;
  const billingCycle = platformData.billing_cycle || "monthly";

  // Check Cancellation Status directly from the string
  const isScheduledForCancel = statusStr.toLowerCase().includes("scheduled for cancellation");
  
  // The backend already formatted the date nicely in platformData.next_billing_date!
  const cancelDate = platformData.next_billing_date !== "N/A" ? platformData.next_billing_date : "End of Cycle";

  // --- 2. HANDLE CHECKOUT / RESUBSCRIBE ---
  const handleCheckout = async (planName, cycle = "monthly") => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/payments/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ plan_name: planName, billing_cycle: cycle, quantity: 1 })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.detail || "Request failed");

      if (data.action === "updated") {
        await refreshUser();
        await fetchBillingDetails(); // Refresh our billing UI!
        if (isScheduledForCancel && planName === currentPlan) {
             alert("Subscription successfully reactivated!");
        } else {
             alert(data.message);
        }
      } else if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. EXECUTE CANCELLATION ---
  const confirmCancellation = async () => {
    setCancelLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/payments/cancel-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Cancellation failed");

      await refreshUser(); 
      await fetchBillingDetails(); // Refresh UI to show cancellation status
      setShowCancelModal(false); 
      
    } catch (error) {
      console.error("Cancel Error:", error);
      alert("Failed to cancel: " + error.message);
    } finally {
      setCancelLoading(false);
    }
  };

  if (billingLoading) {
    return (
      <div className="min-h-screen bg-[#050511] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050511] pt-28 pb-12 px-6 relative">
      
      {/* --- CUSTOM CANCEL MODAL --- */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-2">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button 
                onClick={() => setShowCancelModal(false)}
                className="text-slate-500 hover:text-white transition-colors"
                disabled={cancelLoading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cancel Subscription?</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Are you sure? Your plan will be set to <strong>cancel automatically</strong> at the end of your billing cycle. You will retain access until then.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={cancelLoading}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors"
              >
                Keep Plan
              </button>
              <button
                onClick={confirmCancellation}
                disabled={cancelLoading}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold hover:shadow-lg hover:shadow-red-500/25 transition-all flex items-center justify-center gap-2"
              >
                {cancelLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
          <p className="text-slate-400 mt-2">Manage your plan, credits, and payment history.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CREDIT CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-24 h-24 text-amber-500" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-slate-200 font-medium">Available Credits</h3>
            </div>
            <div className="space-y-1">
              <span className="text-4xl font-bold text-white">{credits}</span>
              <p className="text-sm text-slate-400">credits remaining</p>
            </div>
          </div>

          {/* PLAN CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 col-span-1 md:col-span-2 relative">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-slate-200 font-medium">Current Plan</h3>
                  <p className="text-xs text-slate-400">
                    {currentPlan === "Trial" ? `One Time` : `Billed ${billingCycle}`}
                  </p>
                </div>
              </div>

              {isScheduledForCancel ? (
                 <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                   <CalendarClock className="w-3 h-3" />
                   Ends {cancelDate}
                 </span>
              ) : platformData.is_active ? (
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  ACTIVE
                </span>
              ) : (
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-700 text-slate-400 border border-slate-600">
                  FREE
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mt-2">
              <div>
                <span className="text-3xl font-bold text-white">{PLANS[currentPlan]?.label || "Free Plan"}</span>
                {currentPlan !== "Free" && (
                  <span className="text-slate-400 text-lg ml-2">
                    ${PLANS[currentPlan]?.price}/{billingCycle === 'yearly' ? 'yr' : 'mo'}
                  </span>
                )}
                
                {isScheduledForCancel && (
                   <p className="text-amber-500/80 text-xs mt-2 font-medium">
                     Your plan cancels on {cancelDate}. Reactivate now to keep your credits.
                   </p>
                )}
              </div>
              
              <div className="flex gap-3">
                {currentPlan !== "Pro" && (
                  <button 
                    onClick={() => handleCheckout("Pro", "monthly")}
                    disabled={loading || isScheduledForCancel} 
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Upgrade to Pro"}
                  </button>
                )}

                {platformData.is_active && !isScheduledForCancel && (
                  <button 
                    onClick={() => setShowCancelModal(true)} 
                    className="px-4 py-2 bg-slate-800 hover:bg-red-900/30 border border-slate-700 hover:border-red-800 text-slate-300 hover:text-red-400 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                     Cancel Plan
                  </button>
                )}

                {isScheduledForCancel && (
                  <button 
                    onClick={() => handleCheckout(currentPlan, billingCycle)} 
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-green-500/20"
                  >
                     {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <><RotateCcw className="w-4 h-4" /> Resubscribe</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- PAYMENT HISTORY / INVOICES --- */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mt-8">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <div>
              <h3 className="text-xl font-bold text-white">Payment History</h3>
              <p className="text-sm text-slate-400 mt-1">View and download your previous invoices.</p>
            </div>
            <Receipt className="w-5 h-5 text-slate-500" />
          </div>

          <div className="w-full overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-slate-800 bg-slate-800/30 text-slate-400 text-sm font-medium min-w-[600px]">
              <div>Invoice ID</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Date</div>
              <div className="text-right pr-4">Download</div>
            </div>

            {invoicesLoading ? (
              <div className="p-12 flex justify-center items-center">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              </div>
            ) : invoices.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-slate-400">No payment history found.</p>
              </div>
            ) : (
              <div className="flex flex-col min-w-[600px]">
                {invoices.map((invoice, index) => {
                  const dateObj = new Date(invoice.created_at);
                  const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                  
                  return (
                    <div key={invoice.id || index} className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-slate-800/50 items-center text-slate-300 text-sm hover:bg-slate-800/20 transition-colors">
                      <div className="font-mono text-slate-400">{invoice.id || `INV-${Math.floor(Math.random() * 90000) + 10000}`}</div>
                      <div className="font-medium">${(invoice.amount / 100).toFixed(2) || "0.00"}</div>
                      <div>
                        {invoice.status === 'paid' ? (
                          <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/20">
                            Paid
                          </span>
                        ) : (
                          <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-medium border border-amber-500/20">
                            Pending
                          </span>
                        )}
                      </div>
                      <div>{formattedDate}</div>
                      <div className="flex justify-end pr-4">
                        <button 
                          onClick={() => window.open(invoice.invoice_url, '_blank')}
                          disabled={!invoice.invoice_url}
                          className="text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed p-2 hover:bg-purple-500/10 rounded-lg"
                          title="Download Invoice"
                        >
                          <Download size={18} strokeWidth={2} />
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
    </div>
  );
};

export default BillingPage;