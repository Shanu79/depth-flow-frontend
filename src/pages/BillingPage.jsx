import React, { useState, useEffect } from 'react';
import { Zap, Shield, Loader2, AlertTriangle, X, CalendarClock, RotateCcw } from 'lucide-react';
import useAuthStore from "../stores/authStore"
import { API_BASE_URL } from '../config'; 

const BillingPage = () => {
  const user = useAuthStore((state) => state.user);
  const refreshUser = useAuthStore((state) => state.refreshUser);
  const syncSubscription = useAuthStore((state) => state.syncSubscription);
  const [loading, setLoading] = useState(false);
  
  // Modal State
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  // --- 1. FIXED PRICES ---
  const PLANS = {
    Trial: { price: 3.99, label: "Trial Plan" },
    Basic: { price: 9.99, label: "Basic Plan" },
    Pro: { price: 19.99, label: "Pro Plan" }
  };

  const currentPlan = PLANS[user?.plan] ? user.plan : "Free";

  // --- HELPER: Check Cancellation Status ---
  const isScheduledForCancel = user?.subscription_status && user.subscription_status.includes("Scheduled for cancellation");
  
  // Extract date using Regex
  const dateMatch = user?.subscription_status?.match(/\d{4}-\d{2}-\d{2}/);
  const cancelDate = dateMatch ? dateMatch[0] : "End of Cycle";

  // --- FORCE SYNC ON MOUNT (Moved to Top Level) ---
  useEffect(() => {
    if (user?.subscription_id) {
      syncSubscription(); 
    }
  }, [user, syncSubscription]);


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
        // Custom message for reactivation vs upgrade
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
      setShowCancelModal(false); 
      
    } catch (error) {
      console.error("Cancel Error:", error);
      alert("Failed to cancel: " + error.message);
    } finally {
      setCancelLoading(false);
    }
  };

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
          <p className="text-slate-400 mt-2">Manage your plan and available credits.</p>
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
              <span className="text-4xl font-bold text-white">{user?.credits || 0}</span>
              <p className="text-sm text-slate-400">credits remaining</p>
            </div>
          </div>

          {/* PLAN CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 col-span-1 md:col-span-2 relative">
            
            {/* --- STATUS BADGE --- */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-slate-200 font-medium">Current Plan</h3>
                  <p className="text-xs text-slate-400">
                    {user.plan=="Trial" ? `One Time` : `Billed ${user.billing_cycle}`}
                  </p>
                </div>
              </div>

              {isScheduledForCancel ? (
                 <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                   <CalendarClock className="w-3 h-3" />
                   Ends {cancelDate}
                 </span>
              ) : user?.subscription_status === 'active' ? (
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
                <span className="text-3xl font-bold text-white">{PLANS[currentPlan].label}</span>
                <span className="text-slate-400 text-lg ml-2">
                   ${PLANS[currentPlan].price}/{user?.billing_cycle === 'yearly' ? 'yr' : 'mo'}
                </span>
                
                {isScheduledForCancel && (
                   <p className="text-amber-500/80 text-xs mt-2 font-medium">
                     Your plan cancels on {cancelDate}. Reactivate now to keep your credits.
                   </p>
                )}
              </div>
              
              <div className="flex gap-3">
                {/* Upgrade Button */}
                {currentPlan !== "Pro" && (
                  <button 
                    onClick={() => handleCheckout("Pro", "monthly")}
                    disabled={loading || isScheduledForCancel} 
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Upgrade to Pro"}
                  </button>
                )}

                {/* Cancel Button (Hidden if already scheduled) */}
                {user?.subscription_status === 'active' && !isScheduledForCancel && (
                  <button 
                    onClick={() => setShowCancelModal(true)} 
                    className="px-4 py-2 bg-slate-800 hover:bg-red-900/30 border border-slate-700 hover:border-red-800 text-slate-300 hover:text-red-400 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                     Cancel Plan
                  </button>
                )}

                {/* --- RESUBSCRIBE BUTTON --- */}
                {isScheduledForCancel && (
                  <button 
                    onClick={() => handleCheckout(currentPlan, user.billing_cycle || "monthly")} 
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
      </div>
    </div>
  );
};

export default BillingPage;