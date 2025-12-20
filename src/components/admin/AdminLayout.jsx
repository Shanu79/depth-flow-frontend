import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    // 'mt-20' assumes your main Navbar is fixed and 80px tall. 
    // If you don't want the main Navbar on admin pages, remove 'mt-20' and hide Navbar in App.js
    <div className="flex min-h-screen bg-slate-950 pt-20"> 
      
      {/* Sidebar - Fixed width */}
      <div className="hidden md:block h-[calc(100vh-80px)] sticky top-20">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-80px)] p-0">
        {/* We use p-0 because Users.jsx has its own padding/background styles */}
        <Outlet />
      </main>
      
    </div>
  );
}