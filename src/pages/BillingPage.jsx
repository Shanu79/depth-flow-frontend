import React from 'react';
import { CreditCard, CheckCircle, AlertTriangle, Clock, Download, Zap, Shield } from 'lucide-react';
import useAuthStore from '../stores/authStore'; // Adjust path as needed

const BillingPage = () => {
  const user = useAuthStore((state) => state.user);

  // Mock data - Replace with real data from your backend
  const planDetails = {
    name: user?.plan || "Free Tier",
    price: user?.plan === "Pro" ? "$29/mo" : "$0/mo",
    status: "Active",
    nextBilling: "Feb 14, 2026",
    cardLast4: "4242"
  };

  const invoices = [
    { id: "INV-001", date: "Jan 14, 2026", amount: "$29.00", status: "Paid" },
    { id: "INV-002", date: "Dec 14, 2025", amount: "$29.00", status: "Paid" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
          <p className="text-slate-400 mt-2">Manage your plan, credits, and payment details.</p>
        </div>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Credit Balance */}
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
            <button className="mt-6 w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-lg transition-colors">
              Buy More Credits
            </button>
          </div>

          {/* Card 2: Current Plan */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 col-span-1 md:col-span-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-slate-200 font-medium">Current Plan</h3>
                  <p className="text-xs text-slate-400">Renews on {planDetails.nextBilling}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                {planDetails.status}
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mt-2">
              <div>
                <span className="text-3xl font-bold text-white">{planDetails.name}</span>
                <span className="text-slate-400 text-lg ml-2">{planDetails.price}</span>
              </div>
              <div className="flex gap-3">
                 <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors">
                  Cancel Plan
                </button>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Payment & History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Payment Method */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit">
             <h3 className="text-slate-200 font-medium mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-slate-400" /> Payment Method
             </h3>
             <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-slate-700 rounded flex items-center justify-center text-xs text-slate-400">VISA</div>
                    <div className="flex flex-col">
                        <span className="text-sm text-slate-300">•••• •••• •••• {planDetails.cardLast4}</span>
                        <span className="text-xs text-slate-500">Expires 12/28</span>
                    </div>
                </div>
                <button className="text-xs text-purple-400 hover:text-purple-300 font-medium">Edit</button>
             </div>
          </div>

          {/* Billing History */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-2">
            <h3 className="text-slate-200 font-medium mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" /> Billing History
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs text-slate-400 border-b border-slate-800">
                    <th className="py-3 font-medium">Invoice</th>
                    <th className="py-3 font-medium">Date</th>
                    <th className="py-3 font-medium">Amount</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3 font-medium text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 text-slate-300">{inv.id}</td>
                      <td className="py-4 text-slate-400">{inv.date}</td>
                      <td className="py-4 text-slate-300 font-medium">{inv.amount}</td>
                      <td className="py-4">
                        <span className="flex items-center gap-1.5 text-green-400 bg-green-500/10 w-fit px-2 py-0.5 rounded-full text-xs">
                            <CheckCircle className="w-3 h-3" /> {inv.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BillingPage;