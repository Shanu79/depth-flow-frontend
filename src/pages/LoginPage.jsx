import { useState } from 'react';
import { useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import HeroImage from '../components/HeroImage';
import useAuthStore from '../stores/authStore.js';
import { API_BASE_URL } from '../config.js';

const LoginPage = () => {

  const login = useAuthStore((state) => state.login);

  // View States
  const [isLoginView, setIsLoginView] = useState(true);
  const [isOtpView, setIsOtpView] = useState(false); // NEW: Tracks if we are in the OTP step
  const [searchParams] = useSearchParams();

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(''); // NEW: Stores the 6-digit code
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // --- GOOGLE LOGIN LOGIC ---
  const handleGoogleLogin = () => {
    localStorage.setItem('redirectAfterLogin', from);
    window.location.href = `/api/auth/google/login`;
  };

  // --- HELPER: Fetch Profile & Complete Login ---
  const fetchProfileAndLogin = async (token, authData) => {
    const userResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    
    if (userResponse.ok) {
        const userData = await userResponse.json();
        await login({ ...authData, user: userData }); 

        if (userData.is_admin) {
            navigate("/admin", { replace: true });
        } else {
            navigate(from, { replace: true });
        }
    } else {
        setError("Authentication succeeded, but failed to fetch user profile.");
    }
  };

  // --- 1. HANDLE LOGIN & REGISTRATION ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    const endpoint = isLoginView ? "/login" : "/register";
    const selectedPlan = searchParams.get("plan") || "free";

    const payload = isLoginView
      ? { email, password }
      : { email, password, full_name: fullName, plan: selectedPlan };

    try {
      const response = await fetch(`${API_BASE_URL}/auth${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        
        // --- THIS IS THE FIX ---
        if (isLoginView) {
            // If they are logging in, we get a token! Proceed to fetch profile.
            await fetchProfileAndLogin(data.access_token, data);
        } else {
            // If they are registering, we DO NOT get a token yet. 
            // Show success message and switch to the OTP input screen.
            setSuccessMsg(data.message || "OTP sent to your email!");
            setIsOtpView(true); 
        }
        // -----------------------

      } else {
        setError(data.detail || data.error || "An error occurred.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. HANDLE OTP VERIFICATION ---
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (response.ok) {
        // OTP Verified successfully, complete the login process
        await fetchProfileAndLogin(data.access_token, data);
      } else {
        setError(data.detail || data.error || "Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error while verifying OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- TOGGLE VIEWS ---
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setIsOtpView(false); // Reset OTP view if switching
    setError('');
    setSuccessMsg('');
    setEmail('');
    setPassword('');
    setFullName('');
    setOtp('');
  };

  return (
    <div className="min-h-screen bg-[#050511] flex flex-col lg:flex-row relative overflow-hidden font-sans">

      {/* LEFT SIDE - FORM */}
      <div className="w-full min-w-[40%] min-h-screen flex flex-col items-center justify-center px-8 py-16 z-10">
        <div className="max-w-md w-full mx-auto">

          {/* Dynamic Header */}
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            {isOtpView ? 'Verify Email' : isLoginView ? 'Log In' : 'Create Your Account'}
          </h1>
          <p className="text-slate-400 mb-8 text-sm">
            {isOtpView 
              ? `We've sent a 6-digit code to ${email}.`
              : isLoginView
              ? 'Welcome back! Log in to continue creating.'
              : 'Start transforming images into stunning 3D videos today.'}
          </p>

          {/* ========================================== */}
          {/* OTP VIEW*/}
          {/* ========================================== */}
          {isOtpView ? (
            <form onSubmit={handleOtpSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Success Message Banner */}
              {successMsg && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm font-medium">
                  {successMsg}
                </div>
              )}

              <div className="space-y-1">
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only allow numbers
                  placeholder="Enter 6-digit OTP"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 outline-none focus:border-purple-400 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all text-center text-2xl tracking-[0.5em] font-bold"
                />
              </div>

              {error && <div className="text-red-400 text-sm font-medium text-center">{error}</div>}

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify & Continue'}
              </button>

              <button
                type="button"
                onClick={() => { setIsOtpView(false); setError(''); setSuccessMsg(''); setOtp(''); }}
                className="w-full flex items-center justify-center gap-2 py-4 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Signup
              </button>
            </form>

          ) : (
          /* ========================================== */
          /* STANDARD LOGIN/SIGNUP           */
          /* ========================================== */
            <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">

              {!isLoginView && (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
                  />
                </div>
              )}

              <div className="space-y-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
                />
              </div>

              <div className="space-y-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
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

              <div className="flex justify-between items-center text-xs min-h-[20px]">
                {error && <span className="text-red-400 font-medium">{error}</span>}
                {isLoginView && (
                  <button type="button" className="ml-auto text-blue-400 hover:text-blue-300 transition-colors">Forgot Password?</button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : isLoginView ? 'Log In' : 'Sign Up with Email'}
              </button>

              {/* GOOGLE BUTTON */}
              <button
                type="button"
                onClick={handleGoogleLogin}
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
          )}

          {/* Toggle Link (Hidden when in OTP view) */}
          {!isOtpView && (
            <div className="mt-8 text-center text-sm text-slate-500">
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleView}
                className="text-blue-400 hover:text-blue-300 font-medium hover:underline focus:outline-none"
              >
                {isLoginView ? 'Sign up' : 'Log in'}
              </button>
            </div>
          )}
          
          <div className="mt-4 text-center text-sm text-slate-500">
            <Link to="/" className="text-blue-400 hover:text-blue-300 font-medium hover:underline focus:outline-none">← Back to Home</Link>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE - IMAGE/SHOWCASE */}
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