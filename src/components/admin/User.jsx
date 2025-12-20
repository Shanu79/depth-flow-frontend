import { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore"; 
import { API_BASE_URL } from '../config.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    // Now we can use the relative path because of your Rewrite Rule!
    fetch(`${API_BASE_URL}/admin/users`, { 
      headers: {
        "Authorization": `Bearer ${token}`, // Must send Admin Token
        "Content-Type": "application/json"
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="p-6 text-white min-h-screen bg-slate-950">
      <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        User Management
      </h1>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-slate-800 shadow-xl">
        {/* Changed bg-white to bg-slate-900 for Dark Mode */}
        <table className="w-full text-left bg-slate-900">
          <thead className="bg-slate-950 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Credits</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-gray-500">#{u.id}</td>
                <td className="px-6 py-4 font-medium text-white">{u.email}</td>
                
                {/* Fixed: Show Plan instead of Phone */}
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    u.plan?.toLowerCase() === 'pro' ? 'bg-purple-500/20 text-purple-400' :
                    u.plan?.toLowerCase() === 'basic' ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {u.plan || "Free"}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-300">{u.credits}</td>
                
                {/* Fixed: Show Status instead of Date */}
                <td className="px-6 py-4">
                    <span className={`text-xs ${u.subscription_status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                        {u.subscription_status || "Inactive"}
                    </span>
                </td>

                <td className="px-6 py-4">
                  {u.is_admin ? (
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/30">Admin</span>
                  ) : (
                    <span className="text-gray-500 text-xs">User</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && !error && (
            <div className="p-8 text-center text-gray-500">
                No users found.
            </div>
        )}
      </div>
    </div>
  );
}