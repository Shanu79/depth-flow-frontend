import React from "react";
import { Outlet } from "react-router-dom";
import ApiSidebar from "../components/ApiSidebar"; 

const DepthflowApi = () => {
  return (
    // 1. Changed h-screen to min-h-screen
    // 2. Removed overflow-hidden
    <div className="flex min-h-screen w-full bg-[#070514] text-white font-sans pt-20">
      
      {/* BONUS TIP: Because the whole page scrolls now, your sidebar will scroll away out of view!
        To fix that, add these classes to your Sidebar's outermost div (inside ApiSidebar.jsx):
        className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto" 
      */}
      <ApiSidebar />

      {/* 3. Removed overflow-y-auto. It is now just a normal container. */}
      <div className="flex-1 w-full relative">
        <Outlet />
      </div>
      
    </div>
  );
};

export default DepthflowApi;