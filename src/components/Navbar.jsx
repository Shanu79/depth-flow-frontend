import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CreditCard, ChevronDown, LogOut } from 'lucide-react';
import FullLogo from './FullLogo';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === '/login') return null;

  return (
    <nav className="fixed top-0 w-full z-50 px-6 h-20 flex justify-between items-center bg-transparent backdrop-blur-md border-b border-slate-800/50">

      {/* Logo Wrapper */}
      <Link to="/" className='h-20'>
        <FullLogo />
      </Link>

      {/* Center Navigation */}
      <div className="hidden md:flex items-center bg-slate-800/50 shadow-[0_0_15px_rgba(168,85,247,0.5)] rounded-full px-8 py-3 border border-slate-700/50">
        <a href="/#features" className="text-slate-300 hover:text-white px-4 text-sm font-medium transition-colors">
          Features
        </a>
        <a href="/#gallery" className="text-slate-300 hover:text-white px-4 text-sm font-medium transition-colors">
          Gallery
        </a>
        <a href="/#pricing" className="text-slate-300 hover:text-white px-4 text-sm font-medium transition-colors">
          Pricing
        </a>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 shadow-[0_0_15px_rgba(168,85,247,0.5)] rounded-full">

        {/* --- CONDITIONAL RENDERING START --- */}
        {isLoggedIn ? (
          /* OPTION 1: LOGGED IN (Show Credits + Avatar) */
          <div className="flex gap-2">
            {/* The Credits Container is INSIDE this block, so it vanishes completely when logged out */}
            <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-amber-500/30 px-3 py-1.5 rounded-full">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-xs font-bold">48/50 Credits</span>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 border-l border-slate-700">
              <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-800 p-1.5 rounded-lg transition-colors group relative">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="User" className="w-8 h-8 rounded-full border border-slate-600" />
                <ChevronDown className="w-4 h-4 text-slate-400" />

                <div className="absolute top-full right-0 mt-2 w-32 bg-slate-900 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 flex items-center gap-2">
                    <LogOut className="w-3 h-3" /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* OPTION 2: LOGGED OUT (Show ONLY Login Button) */
          <div className="hidden md:block">
            <Link to="/login">
              <button className="bg-transparent border border-slate-600 hover:border-slate-400 text-white px-6 py-2 rounded-full transition-all">
                Login
              </button>
            </Link>
          </div>
        )}
        {/* --- CONDITIONAL RENDERING END --- */}

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 p-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5">
          <a href="#features" className="text-gray-300">Features</a>
          <a href="#gallery" className="text-gray-300">Gallery</a>
          <a href="#pricing" className="text-gray-300">Pricing</a>
          {isLoggedIn ? (
            <button onClick={onLogout} className="text-red-400 text-left">Logout</button>
          ) : (
            <Link to="/login" className="text-cyan-400">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;