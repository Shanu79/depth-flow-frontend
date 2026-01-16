import { useEffect, useState, useMemo } from "react";
import * as XLSX from 'xlsx'; // Import Excel Library
import useAuthStore from "../../stores/authStore"; 
import { API_BASE_URL } from "../../config";
import { 
  Search, Users as UsersIcon, Shield, Activity, 
  ChevronLeft, ChevronRight, Trash2, Loader2, 
  Download, ArrowUpDown, ArrowUp, ArrowDown // New Icons
} from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Sorting State
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Delete State
  const [deletingId, setDeletingId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); 

  const token = localStorage.getItem("token"); 

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = () => {
    fetch(`${API_BASE_URL}/admin/users`, { 
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // --- DELETE LOGIC ---
  const handleDeleteUser = async (userId, userEmail) => {
    if (!window.confirm(`Are you sure you want to delete user ${userEmail}? This action cannot be undone.`)) {
      return;
    }
    setDeletingId(userId);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to delete user");
      }

      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      // Re-trigger filter logic handled by useEffect below
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  // --- SEARCH FILTER ---
  useEffect(() => {
    const results = users.filter(user => 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.id.toString().includes(searchTerm)
    );
    setFilteredUsers(results);
    setCurrentPage(1); 
  }, [searchTerm, users]);

  // --- SORTING LOGIC (New) ---
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to the filtered list
  const sortedUsers = useMemo(() => {
    let sortableItems = [...filteredUsers];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        // Handle null values gracefully
        let aValue = a[sortConfig.key] || "";
        let bValue = b[sortConfig.key] || "";

        // Check for numbers vs strings
        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredUsers, sortConfig]);

  // --- EXPORT TO EXCEL (New) ---
  const handleExport = () => {
    // Create a clean version of data for excel (removing internal react IDs if needed, or formatting)
    const exportData = sortedUsers.map(u => ({
        ID: u.id,
        Email: u.email,
        Name: u.full_name || "N/A",
        Plan: u.plan || "Free",
        Credits: u.credits,
        Status: u.subscription_status || "Inactive",
        IsAdmin: u.is_admin ? "Yes" : "No"
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "User_Export.xlsx");
  };

  // --- PAGINATION ON SORTED DATA ---
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Helper to render sort icon
  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return <ArrowUpDown className="w-3 h-3 ml-1 text-slate-600 opacity-50 group-hover:opacity-100" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-3 h-3 ml-1 text-cyan-400" /> 
      : <ArrowDown className="w-3 h-3 ml-1 text-cyan-400" />;
  };

  // Stats
  const stats = [
    { label: "Total Users", value: users.length, icon: <UsersIcon className="w-5 h-5 text-blue-400"/> },
    { label: "Pro Plans", value: users.filter(u => u.plan?.toLowerCase() === 'pro').length, icon: <Activity className="w-5 h-5 text-purple-400"/> },
    { label: "Admins", value: users.filter(u => u.is_admin).length, icon: <Shield className="w-5 h-5 text-red-400"/> },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30 p-4 md:p-8">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-slate-400 text-sm mt-1">Manage accounts, plans, and permissions.</p>
          </div>
          
          {/* EXPORT BUTTON */}
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-4 py-2.5 rounded-xl font-medium transition-all"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex justify-between items-center mb-6">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search by email or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-800 text-slate-200 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-600"
                />
            </div>
            
            <div className="text-slate-500 text-sm hidden md:block">
                Showing {sortedUsers.length} users
            </div>
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
                Error: {error}
            </div>
        )}

        {/* Table Area */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-xs border-b border-slate-800">
                <tr>
                  {/* Sortable Header: ID */}
                  <th 
                    className="px-6 py-4 font-semibold tracking-wider cursor-pointer hover:bg-slate-800/50 hover:text-white transition-colors group select-none"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      ID {getSortIcon('id')}
                    </div>
                  </th>

                  {/* Sortable Header: User/Email */}
                  <th 
                    className="px-6 py-4 font-semibold tracking-wider cursor-pointer hover:bg-slate-800/50 hover:text-white transition-colors group select-none"
                    onClick={() => handleSort('email')}
                  >
                     <div className="flex items-center">
                      User {getSortIcon('email')}
                    </div>
                  </th>

                  {/* Sortable Header: Plan */}
                  <th 
                    className="px-6 py-4 font-semibold tracking-wider cursor-pointer hover:bg-slate-800/50 hover:text-white transition-colors group select-none"
                    onClick={() => handleSort('plan')}
                  >
                     <div className="flex items-center">
                      Plan {getSortIcon('plan')}
                    </div>
                  </th>

                  {/* Sortable Header: Credits */}
                  <th 
                    className="px-6 py-4 font-semibold tracking-wider cursor-pointer hover:bg-slate-800/50 hover:text-white transition-colors group select-none"
                    onClick={() => handleSort('credits')}
                  >
                    <div className="flex items-center">
                      Credits {getSortIcon('credits')}
                    </div>
                  </th>

                  {/* Sortable Header: Status */}
                  <th 
                    className="px-6 py-4 font-semibold tracking-wider cursor-pointer hover:bg-slate-800/50 hover:text-white transition-colors group select-none"
                    onClick={() => handleSort('subscription_status')}
                  >
                    <div className="flex items-center">
                      Status {getSortIcon('subscription_status')}
                    </div>
                  </th>

                  <th className="px-6 py-4 font-semibold tracking-wider">Role</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {loading ? (
                    <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-slate-500">Loading users...</td>
                    </tr>
                ) : sortedUsers.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-slate-500">No users found matching your search.</td>
                    </tr>
                ) : (
                    currentUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition-colors group">
                        <td className="px-6 py-4 text-slate-500 font-mono">#{u.id}</td>
                        <td className="px-6 py-4">
                            <div className="font-medium text-slate-200">{u.email}</div>
                            {u.full_name && <div className="text-xs text-slate-500">{u.full_name}</div>}
                        </td>
                        
                        <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${
                            u.plan?.toLowerCase() === 'pro' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                            u.plan?.toLowerCase() === 'basic' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                            'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                            {u.plan?.toLowerCase() === 'pro' && <Activity className="w-3 h-3" />}
                            {u.plan || "Free"}
                        </span>
                        </td>

                        <td className="px-6 py-4 text-slate-300 font-medium">
                            {u.credits} <span className="text-slate-600 text-xs font-normal">cr</span>
                        </td>
                        
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${u.subscription_status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-red-500'}`}></span>
                                <span className={`text-xs capitalize ${u.subscription_status === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {u.subscription_status || "Inactive"}
                                </span>
                            </div>
                        </td>

                        <td className="px-6 py-4">
                        {u.is_admin ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-medium">
                                <Shield className="w-3 h-3" /> Admin
                            </span>
                        ) : (
                            <span className="text-slate-600 text-xs">User</span>
                        )}
                        </td>

                        <td className="px-6 py-4 text-right">
                            <button
                                onClick={() => handleDeleteUser(u.id, u.email)}
                                disabled={deletingId === u.id || u.is_admin} 
                                className={`p-2 rounded-lg transition-colors ${
                                    u.is_admin 
                                    ? "text-slate-700 cursor-not-allowed" 
                                    : "text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                                }`}
                                title="Delete User"
                            >
                                {deletingId === u.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                            </button>
                        </td>
                    </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {!loading && sortedUsers.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/30">
                <span className="text-sm text-slate-500">
                    Showing <span className="text-white font-medium">{indexOfFirstUser + 1}</span> to <span className="text-white font-medium">{Math.min(indexOfLastUser, sortedUsers.length)}</span> of <span className="text-white font-medium">{sortedUsers.length}</span> entries
                </span>
                
                <div className="flex gap-2">
                    <button 
                        onClick={() => paginate(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                         let pageNum = i + 1;
                         if (totalPages > 5 && currentPage > 3) {
                             pageNum = currentPage - 2 + i;
                         }
                         if (pageNum > totalPages) return null;

                         return (
                            <button 
                                key={pageNum} 
                                onClick={() => paginate(pageNum)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                    currentPage === pageNum 
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                                    : 'border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                {pageNum}
                            </button>
                         );
                    })}

                    <button 
                        onClick={() => paginate(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}