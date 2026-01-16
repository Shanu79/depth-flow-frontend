import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';
import useAuthStore from '../stores/authStore.js';
import { DodoPayments } from "dodopayments-checkout";
import { API_BASE_URL } from '../config.js';

const PaymentPage = () => {
  const { state } = useLocation();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const refreshUser = useAuthStore((state) => state.refreshUser);

  // 1. Initialize SDK (Handles Checkout Events for New Subs)
  useEffect(() => {
    DodoPayments.Initialize({
      mode: "live",
      onEvent: async (event) => {
        console.log("Dodo Event:", event);
        switch (event.event_type) {
          case "checkout.opened":
            setIsProcessing(false);
            break;
          case "checkout.closed":
            setIsProcessing(false);
            break;
          case "checkout.succeeded":
            // This handles NEW subscriptions
            setTimeout(async () => {
              await refreshUser();
              alert("Payment Successful! Thank you for your purchase.");
              navigate("/workspace");
            }, 2000);
            break;
          case "checkout.error":
            console.error("Checkout Error:", event.data?.message);
            setIsProcessing(false);
            alert("Payment failed: " + event.data?.message);
            break;
          default:
            break;
        }
      },
    });
  }, [navigate, refreshUser]);

  // 2. Redirect if accessed directly
  useEffect(() => {
    if (!state) navigate('/payment');
  }, [state, navigate]);

  if (!state) return null;

  const { planName, price, billingCycle, credits } = state;

  // 3. Handle Payment (UPDATED LOGIC)
  const handlePayment = async () => {
    setIsProcessing(true);

    const finalBillingCycle = planName === "Trial" ? "one_time" : billingCycle;

    try {
      const token = localStorage.getItem("token");

      // B. Create Session or Trigger Update on Backend
      const response = await fetch(`${API_BASE_URL}/payments/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          plan_name: planName,
          billing_cycle: finalBillingCycle,
          quantity: 1
        })
      });

      const data = await response.json();

      // Error Handling
      if (!response.ok) {
        let errorMessage = "Failed to process request";
        if (typeof data.detail === "string") {
          errorMessage = data.detail;
        } else if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map(err => err.msg).join(", ");
        } else if (typeof data.detail === "object") {
          errorMessage = JSON.stringify(data.detail);
        }
        throw new Error(errorMessage);
      }

      // --- NEW LOGIC START ---

      // CASE A: Upgrade/Downgrade (Instant Update)
      if (data.action === "updated") {
        await refreshUser(); // Update local store with new plan info
        setIsProcessing(false);
        alert(data.message); // "Plan upgraded to Pro..."
        navigate("/workspace");
      }

      // CASE B: New Subscription
      else if (data.action === "checkout" && data.checkout_url) {
        // Option 1 (Debug): Log the URL to be sure it's valid
        console.log("Redirecting to:", data.checkout_url);

        // Option 2 (Fix): Force a top-level redirect instead of SDK
        // This bypasses iframe/CORS issues.
        window.location.href = data.checkout_url;
      }

      else {
        throw new Error("Unknown response from server");
      }
      // --- NEW LOGIC END ---

    } catch (error) {
      console.error("Payment Initiation Failed:", error);
      alert("Error: " + error.message);
      setIsProcessing(false);
    }
  };

  const isUpgrade = user?.subscription_id && (
    user.subscription_status === 'active' ||
    user.subscription_status?.startsWith('Scheduled')
  )

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">

        {/* LEFT: Summary */}
        <div className="p-8 md:p-12 flex-1 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-bold tracking-wider uppercase">Secure Checkout</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Order Summary</h1>

          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{planName} Plan</h3>
                <p className="text-slate-400 text-sm capitalize">{planName==="Trial" ? billingCycle : "One time"} Billing</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">${price}</p>
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>{credits} Credits included</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>Commercial License</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-slate-400 text-sm px-2">
            <span>Total due today</span>
            <span className="text-white font-bold">${price}</span>
          </div>
        </div>

        {/* RIGHT: Action */}
        <div className="bg-slate-950 p-8 md:p-12 md:w-[400px] flex flex-col justify-center border-l border-slate-800">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-white font-semibold">Proceed to Payment</h3>
            <p className="text-slate-500 text-sm mt-2">Secured by Dodo Payments</p>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <Loader2 className="animate-spin" />
            ) : (
              isUpgrade ? `Confirm Plan Change ($${price})` : `Pay $${price}`
            )}
          </button>

          <button onClick={() => navigate(-1)} className="w-full mt-4 py-3 text-slate-500 hover:text-white text-sm font-medium transition-colors">
            Cancel & Go Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;