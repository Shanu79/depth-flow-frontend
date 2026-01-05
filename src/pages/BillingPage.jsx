import React, { useState } from 'react';
import { CreditCard, Zap, Shield, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import useAuthStore from '../stores/authStore';
import { API_BASE_URL } from '../config'; 

const BillingPage = () => {
  const { user, refreshUser } = useAuthStore(); // Ensure refreshUser is available to update UI after cancel
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const PLANS = {
    Free: { price: 0, label: "Free Tier" },
    Basic: { price: 99, label: "Basic Plan" },
    Pro: { price: 199, label: "Pro Plan" }
  };

  const currentPlan = PLANS[user?.plan] ? user.plan : "Free";

  // --- 1. HANDLE CHECKOUT ---
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
      if (!response.ok) throw new Error(data.detail || "Checkout failed");
      if (data.checkout_url) window.location.href = data.checkout_url;
    } catch (error) {
      alert("Payment Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. HANDLE CANCEL SUBSCRIPTION ---
  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel? You will lose access to premium features immediately.")) return;

    setCancelLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/payments/cancel-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Cancellation failed");

      alert("Subscription cancelled successfully.");
      await refreshUser(); // Refresh local user state to reflect "Free" plan
      
    } catch (error) {
      console.error("Cancel Error:", error);
      alert("Failed to cancel: " + error.message);
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-6">
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
            <button 
              onClick={() => handleCheckout("Basic", "monthly")} 
              disabled={loading}
              className="mt-6 w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Buy 550 Credits ($99)"}
            </button>
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
                    {user?.billing_cycle ? `Billed ${user.billing_cycle}` : 'No active subscription'}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                user?.subscription_status === 'active' 
                  ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                  : 'bg-slate-700 text-slate-400 border-slate-600'
              }`}>
                {user?.subscription_status === 'active' ? currentPlan.toUpperCase() : "FREE"}
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mt-2">
              <div>
                <span className="text-3xl font-bold text-white">{PLANS[currentPlan].label}</span>
                <span className="text-slate-400 text-lg ml-2">
                   ${PLANS[currentPlan].price}/{user?.billing_cycle === 'yearly' ? 'yr' : 'mo'}
                </span>
              </div>
              
              <div className="flex gap-3">
                {/* --- FIX: ALLOW UPGRADE IF NOT PRO --- */}
                {currentPlan !== "Pro" && (
                  <button 
                    onClick={() => handleCheckout("Pro", "monthly")}
                    disabled={loading}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Upgrade to Pro"}
                  </button>
                )}

                {/* --- SHOW CANCEL ONLY IF SUBSCRIBED --- */}
                {user?.subscription_status === 'active' && (
                  <button 
                    onClick={handleCancel}
                    disabled={cancelLoading}
                    className="px-4 py-2 bg-slate-800 hover:bg-red-900/30 border border-slate-700 hover:border-red-800 text-slate-300 hover:text-red-400 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                     {cancelLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Cancel Plan"}
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