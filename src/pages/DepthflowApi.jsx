import React from "react";
import { Outlet } from "react-router-dom";
import ApiSidebar from "../components/ApiSidebar"; 

const DepthflowApi = () => {
  return (
    // 1. Added flex-col for mobile, and md:flex-row for tablets/desktops
    // 2. Adjusted pt-16 for mobile, pt-20 for larger screens
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-[#070514] text-white font-sans pt-16 md:pt-20">
      
      {/* SIDEBAR RESPONSIVENESS TIP:
        Because of 'flex-col', this sidebar will now sit at the TOP of the page on mobile, 
        and move to the LEFT on desktop. 
        
        If you prefer to hide it entirely on mobile (to use a hamburger menu instead), 
        add 'hidden md:flex' to the outermost div inside your ApiSidebar.jsx file!
      */}
      <ApiSidebar />

      {/* 3. Added min-w-0 to prevent horizontal overflow bugs on mobile */}
      <div className="flex-1 w-full relative min-w-0">
        <Outlet />
      </div>
      
    </div>
  );
};

export default DepthflowApi;