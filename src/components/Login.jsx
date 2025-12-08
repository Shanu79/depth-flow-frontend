import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-950">
         <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
           <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
             <span className="text-white font-bold text-2xl">D</span>
           </div>
           <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
           <p className="text-gray-400 text-sm">Enter your credentials to access your 3D workspace.</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-600"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400 hover:text-gray-300 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0" />
              Remember me
            </label>
            <a href="#" className="text-cyan-400 hover:text-cyan-300">Forgot password?</a>
          </div>

          <button className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account? <Link to="/" className="text-purple-400 hover:text-purple-300 font-medium">Sign up</Link>
          </p>
          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-gray-600 hover:text-white">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;