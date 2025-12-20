// admin/AdminLayout.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
