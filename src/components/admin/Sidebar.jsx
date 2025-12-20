// admin/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin</h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/stats">Stats</NavLink>
      </nav>
    </aside>
  );
}
