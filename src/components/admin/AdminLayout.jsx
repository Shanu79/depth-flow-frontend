import { Suspense } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import PageLoader from "../PageLoader";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#050511] pt-20"> 
      
      {/* Sidebar - Fixed width */}
      <div className="hidden md:block h-[calc(100vh-80px)] sticky top-20">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-80px)] p-0">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      
    </div>
  );
}