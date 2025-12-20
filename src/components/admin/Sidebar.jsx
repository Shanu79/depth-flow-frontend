import { NavLink } from "react-router-dom";
import { Users, LayoutDashboard, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { name: "Users", path: "/admin/users", icon: <Users className="w-5 h-5" /> },
    // Add more links here later (e.g., Settings, Analytics)
    // { name: "Settings", path: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-400 flex flex-col h-full hidden md:flex">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-wide">
          Admin<span className="text-cyan-400">Panel</span>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? "bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                  : "hover:bg-slate-800 hover:text-slate-200"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-red-500/10 hover:text-red-400 text-slate-500 transition-all">
          <LogOut className="w-5 h-5" />
          <span>Exit Admin</span>
        </button>
      </div>
    </aside>
  );
}