import React, { useState } from 'react';
import { CreditCard, Zap, Shield, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import useAuthStore from '../stores/authStore';
import { API_BASE_URL } from '../config'; // Ensure this points to your FastAPI URL

const BillingPage = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // Mirrors your Backend PLAN_CONFIG for display purposes
  const PLANS = {
    Free: { price: 0, label: "Free Tier" },
    Basic: { price: 9, label: "Basic Plan" }, // Example price
    Pro: { price: 29, label: "Pro Plan" }
  };

  const currentPlan = PLANS[user?.plan] ? user.plan : "Free";
  const isPro = currentPlan === "Pro";
  
  // --- HANDLE CHECKOUT (Connects to your FastAPI /create-checkout-session) ---
  const handleCheckout = async (planName, cycle = "monthly", quantity = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Assuming you store JWT here
      
      const response = await fetch(`${API_BASE_URL}/payments/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          plan_name: planName,
          billing_cycle: cycle,
          quantity: quantity
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || "Checkout failed");

      // Redirect to Dodo Payments Checkout
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Failed to start payment: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
          <p className="text-slate-400 mt-2">Manage your plan and available credits.</p>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. CREDIT BALANCE CARD */}
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

            {/* Buys "Basic" monthly pack as a one-time credit top-up example */}
            <button 
              onClick={() => handleCheckout("Basic", "monthly")} 
              disabled={loading}
              className="mt-6 w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Buy 550 Credits ($9)"}
            </button>
          </div>

          {/* 2. CURRENT PLAN CARD */}
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
              
              {/* Status Badge */}
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                user?.subscription_status === 'active' 
                  ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                  : 'bg-slate-700 text-slate-400 border-slate-600'
              }`}>
                {user?.subscription_status ? user.subscription_status.toUpperCase() : "FREE"}
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mt-2">
              <div>
                <span className="text-3xl font-bold text-white">{PLANS[currentPlan].label}</span>
                <span className="text-slate-400 text-lg ml-2">
                   {/* Display price based on plan */}
                   ${PLANS[currentPlan].price}/{user?.billing_cycle === 'yearly' ? 'yr' : 'mo'}
                </span>
              </div>
              
              <div className="flex gap-3">
                {/* Logic: If Free, show Upgrade. If Pro, show Manage/Cancel */}
                {currentPlan === "Free" ? (
                  <button 
                    onClick={() => handleCheckout("Pro", "monthly")}
                    disabled={loading}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Upgrade to Pro"}
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors">
                    Manage Subscription
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. PAYMENT METHOD (Read-Only / Placeholder) */}
        {/* Since backend doesn't save card details, we show a generic state or hide it */}
        {user?.subscription_status === 'active' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-slate-200 font-medium mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-400" /> Payment Method
              </h3>
              <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-slate-700 rounded flex items-center justify-center text-xs text-slate-400">CARD</div>
                      <div className="flex flex-col">
                          <span className="text-sm text-slate-300">Ended in ••••</span>
                          <span className="text-xs text-slate-500">Managed via Dodo Payments</span>
                      </div>
                  </div>
                  {/* Dodo usually handles card updates via email links or portal */}
                  <button className="text-xs text-purple-400 hover:text-purple-300 font-medium">
                    Update
                  </button>
              </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BillingPage;