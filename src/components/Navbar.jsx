import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Hide Navbar on login page for a cleaner look
  if (location.pathname === '/login') return null; 

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-transparent backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">D</span>
        </div>
        <span className="text-white font-bold text-xl tracking-wide">DreamCraft 3D</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center bg-slate-800/50 backdrop-blur-md rounded-full px-8 py-3 border border-slate-700/50">
        <a href="#features" className="text-gray-300 hover:text-white px-4 transition-colors">Features</a>
        <a href="#gallery" className="text-gray-300 hover:text-white px-4 transition-colors">Gallery</a>
        <a href="#pricing" className="text-gray-300 hover:text-white px-4 transition-colors">Pricing</a>
      </div>

      {/* Login Button */}
      <div className="hidden md:block">
        <Link to="/login">
          <button className="bg-transparent border border-slate-600 hover:border-slate-400 text-white px-6 py-2 rounded-full transition-all">
            Login
          </button>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 p-4 flex flex-col gap-4 md:hidden">
          <a href="#features" className="text-gray-300">Features</a>
          <a href="#gallery" className="text-gray-300">Gallery</a>
          <a href="#pricing" className="text-gray-300">Pricing</a>
          <Link to="/login" className="text-cyan-400">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;