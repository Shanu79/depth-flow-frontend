import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Removed Link since we handle toggle internally
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroImage from './HeroImage';

const LoginPage = ({ onLogin }) => {
  // State to toggle between Login and Signup views
  const [isLoginView, setIsLoginView] = useState(true);

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLoginView) {
      // --- LOGIN LOGIC ---
      if (email === 'admin' && password === 'admin') {
        onLogin();
        navigate('/workspace');
      } else {
        setError('Invalid credentials. Try admin/admin');
      }
    } else {
      // --- SIGNUP LOGIC (Simulation) ---
      // In a real app, you would send data to backend here.
      if (email && password && fullName) {
        onLogin(); // Auto-login after signup for demo
        navigate('/workspace');
      } else {
        setError('Please fill in all fields');
      }
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(''); // Clear errors when switching
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row relative overflow-hidden font-sans">

      {/* LEFT SIDE - FORM */}
      <div className="w-full min-w-[50%] min-h-screen flex flex-col items-center justify-center px-4 lg:px-8 justify-center py-16 z-10">
        <div className="max-w-md w-full mx-auto">

          {/* Dynamic Header */}
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            {isLoginView ? 'Log In' : 'Create Your Account'}
          </h1>
          <p className="text-slate-400 mb-8 text-sm">
            {isLoginView
              ? 'Welcome back! Log in to continue creating.'
              : 'Start transforming images into stunning 3D videos today.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name Input (Only for Signup) */}
            {!isLoginView && (
              <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
                />
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-1">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Forgot Password Link (Only for Login) */}
            <div className="flex justify-between items-center text-xs min-h-[20px]">
              {error && <span className="text-red-400 font-medium">{error}</span>}
              {isLoginView && (
                <a href="#" className="ml-auto text-blue-400 hover:text-blue-300 transition-colors">Forgot Password?</a>
              )}
            </div>

            {/* Primary Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.02] transition-all"
            >
              {isLoginView ? 'Log In' : 'Sign Up with Email'}
            </button>

            {/* Secondary Button */}
            <button
              type="button"
              className="w-full py-4 rounded-xl border border-slate-700 bg-transparent text-white font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {isLoginView ? 'Log In with Google' : 'Sign Up with Google'}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="mt-8 text-center text-sm text-slate-500">
            {isLoginView ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleView}
              className="text-blue-400 hover:text-blue-300 font-medium hover:underline focus:outline-none"
            >
              {isLoginView ? 'Sign up' : 'Log in'}
            </button>
          </div>
          <div className="mt-4 text-center text-sm text-slate-500">

            <Link to="/" className="text-blue-400 hover:text-blue-300 font-medium hover:underline focus:outline-none">← Back to Home</Link>

          </div>

        </div>
      </div>

      {/* RIGHT SIDE - IMAGE/SHOWCASE (Unchanged) */}
      <div className="hidden w-full lg:w-1/2 md:flex flex-col items-center lg:pr-4 lg:pl-0 px-16 justify-center">
        <div className="relative w-full h-fit rounded-2xl m-4 p-2 bg-gradient-to-r from-cyan-400 to-purple-600 shadow-lg shadow-purple-500/20 overflow-hidden">
          <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden relative">
              <div className="flex justify-center mb-20 scale-[0.9] lg:scale-[0.67] xl:scale-[0.8]">
                <HeroImage />
              </div>
              
              <p className="text-white text-center font-medium tracking-wide pb-8">Experience the Power of DepthFlow AI</p>
              
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;