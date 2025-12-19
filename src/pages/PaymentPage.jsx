import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const PaymentPage = () => {
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if accessed directly without selecting a plan
  useEffect(() => {
    if (!state) navigate('/#pricing');
  }, [state, navigate]);

  if (!state) return null;

  const { planName, price, billingCycle, credits } = state;

  // 1. Load Razorpay Script Dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 2. Handle Payment Click
  const handlePayment = async () => {
    setIsProcessing(true);
    
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsProcessing(false);
      return;
    }

    try {
      // A. Create Order on Backend
      const token = localStorage.getItem("token");
      const orderRes = await fetch("http://localhost:8000/payments/create-order", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ plan_name: planName, billing_cycle: billingCycle })
      });
      
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.detail);

      // B. Configure Razorpay Options
      const options = {
        key: orderData.key_id, // Key ID from Backend
        amount: orderData.amount,
        currency: orderData.currency,
        name: "DepthFlow AI",
        description: `${planName} Plan - ${billingCycle}`,
        order_id: orderData.order_id, // Order ID from Backend
        handler: async function (response) {
            // C. Verify Payment on Backend
            try {
                const verifyRes = await fetch("http://localhost:8000/payments/verify", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        plan_name: planName // To know how many credits to add
                    })
                });

                const verifyData = await verifyRes.json();
                if (verifyData.status === "success") {
                    navigate("/workspace");
                    alert("Payment Successful! Credits Added.");
                } else {
                    alert("Payment Verification Failed.");
                }
            } catch (err) {
                console.error(err);
                alert("Server error verifying payment.");
            }
        },
        prefill: {
          name: user?.full_name,
          email: user?.email,
        },
        theme: {
          color: "#06b6d4" // Cyan-500
        }
      };

      // D. Open Checkout
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert("Error initiating payment: " + error.message);
    } finally {
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
              <p className="text-slate-500 text-sm mt-2">Secured by Razorpay</p>
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