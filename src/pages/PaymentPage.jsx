import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';
import useAuthStore from '../stores/authStore.js';
import { DodoPayments } from "dodopayments-checkout"; // Ensure this package is installed

const PaymentPage = () => {
  const { state } = useLocation();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const refreshUser = useAuthStore((state) => state.refreshUser); 

  // 1. Initialize SDK on Component Mount
  useEffect(() => {
    DodoPayments.Initialize({
      mode: "test", // Change to "live" in production
      onEvent: async (event) => {
        console.log("Dodo Event:", event);
        switch (event.event_type) {
          case "checkout.opened":
            // The overlay is visible
            setIsProcessing(false); 
            break;
          case "checkout.closed":
            // User closed the popup without paying
            setIsProcessing(false);
            break;
          case "checkout.succeeded":
            // Payment success!
            await refreshUser(); // Update user data (e.g., credits)
            alert("Payment Successful! Thank you for your purchase.");
            navigate("/workspace");
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
    if (!state) navigate('/#pricing');
  }, [state, navigate]);

  if (!state) return null;

  const { planName, price, billingCycle, credits } = state;

 // 3. Handle Payment
  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // A. Get Token
      const token = localStorage.getItem("token");
      
      // B. Create Session on Backend
      const response = await fetch("http://localhost:8000/payments/create-checkout-session", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
            plan_name: planName, 
            billing_cycle: billingCycle,
            quantity: 1 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // --- FIX: Parse Pydantic Errors Safely ---
        let errorMessage = "Failed to create session";

        if (typeof data.detail === "string") {
            // Case 1: Simple string error (e.g., "Invalid token")
            errorMessage = data.detail;
        } else if (Array.isArray(data.detail)) {
            // Case 2: Pydantic Validation Error (List of objects)
            // e.g., [{loc: ['plan_name'], msg: 'field required'}]
            errorMessage = data.detail.map(err => err.msg).join(", ");
        } else if (typeof data.detail === "object") {
            // Case 3: Single object error
            errorMessage = JSON.stringify(data.detail);
        }

        throw new Error(errorMessage);
      }

      // C. Open the Overlay with the REAL URL from backend
      if (data.checkout_url) {
        await DodoPayments.Checkout.open({
          checkoutUrl: data.checkout_url
        });
      } else {
        throw new Error("No checkout URL returned from backend");
      }

    } catch (error) {
      console.error("Payment Initiation Failed:", error);
      // Now 'error.message' is guaranteed to be a clean string
      alert("Error: " + error.message); 
      setIsProcessing(false);
    }
  };

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
                   <p className="text-slate-400 text-sm capitalize">{billingCycle} Billing</p>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-bold text-white">${price}</p>
                </div>
             </div>
             <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>{credits} included</span>
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
             {isProcessing ? <Loader2 className="animate-spin" /> : `Pay $${price}`}
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