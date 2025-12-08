import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Zap, Box, CloudUpload, Check, Menu, X, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Gallery from './Gallery';
import Pricing from './Pricing';

// --- Components ---

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 mt-20 bg-slate-950 py-10 px-6 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">D</span>
          </div>
          <span className="text-white font-bold text-lg">DreamCraft 3D</span>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-white">About Us</a>
          <a href="#" className="hover:text-white">Contact</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>

        <div className="flex gap-4">
           <Twitter className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
           <Facebook className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
           <Instagram className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
           <Youtube className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
        </div>
      </div>
      <div className="text-center mt-8 text-xs text-gray-600">
        © 2023 via DreamCraft 3D. All rights reserved.
      </div>
    </footer>
  );
};



const HomePage = () => (
  <>
  <Navbar />
    <Hero />
    <Features />
    <Gallery />
    <Pricing />
    <Footer />
  </>
);

export default HomePage;