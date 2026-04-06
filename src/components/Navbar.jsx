import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  CreditCard,
  ChevronDown,
  LogOut,
  LayoutGrid,
  ShoppingCartIcon,
  Shield,
  Receipt,
} from "lucide-react";
import FullLogo from "./FullLogo";
import useAuthStore from "../stores/authStore.js";

// --- NAVIGATION CONFIGURATION ---
const NAV_LINKS = [
  { label: "Features", path: "/#features", isAnchor: true },
  { label: "Gallery", path: "/#gallery", isAnchor: true },
  { label: "Pricing", path: "/pricing", isAnchor: false },
  { label: "API", path: "/depthflow-api", isAnchor: false },
  { label: "What's New ✨", isAction: true },
];

const Navbar = ({ onOpenWhatsNew }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  if (location.pathname === "/login") return null;

  return (
    <nav className="fixed top-0 w-full z-30 pr-6 h-20 flex justify-between items-center bg-transparent backdrop-blur-md border-b border-slate-800/50">
      {/* Logo Wrapper */}
      <Link to="/" className="h-20">
        <FullLogo />
      </Link>

      {/* Center Navigation (Desktop) */}
      <div className="hidden md:flex items-center gap-8 bg-[#050511]/80 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.4)] rounded-full px-8 py-3 border-2 border-purple-400/50">
        {NAV_LINKS.map((link, index) => {
          // 3. RENDER A BUTTON IF IT'S AN ACTION (What's New)
          if (link.isAction) {
            return (
              <button
                key={index}
                onClick={onOpenWhatsNew}
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {link.label}
              </button>
            );
          }
          // Otherwise render normal links
          return link.isAnchor ? (
            <a
              key={index}
              href={link.path}
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={index}
              to={link.path}
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 shadow-[0_0_17px_rgba(168,85,247,0.5)] rounded-full">
        {/* --- DESKTOP VIEW --- */}
        {user ? (
          <div className="hidden md:flex gap-2">
            {/* Desktop Credits */}
            <div className="flex items-center gap-2 bg-slate-900 border border-amber-500/30 px-3 py-1.5 rounded-full">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-xs font-bold">
                {user.credits} Credits
              </span>
            </div>

            {/* Desktop Profile Dropdown */}
            <div className="flex items-center gap-3 border-l border-slate-700 pl-4">
              <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-800 p-1.5 rounded-lg transition-colors group relative">
                {user.profile_pic ? (
                  <img
                    src={user.profile_pic}
                    alt={user.full_name}
                    className="w-8 h-8 rounded-full border border-slate-600 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center border border-slate-500 text-white font-bold text-xs">
                    {user.full_name ? user.full_name.charAt(0) : "U"}
                  </div>
                )}
                <span className="hidden lg:block text-sm text-slate-200 font-medium max-w-[100px] truncate">
                  {user.full_name}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />

                {/* Desktop Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                  <button
                    onClick={() => navigate("/workspace")}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 border-b border-slate-800"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" /> Workspace
                  </button>
                  {user.is_admin && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 border-b border-slate-800"
                    >
                      <Shield className="w-3.5 h-3.5" /> Admin Panel
                    </button>
                  )}
                  {user.plan?.toLowerCase() !== "free" && (
                    <button
                      onClick={() => navigate("/billing")}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 border-b border-slate-800"
                    >
                      <Receipt className="w-3.5 h-3.5" /> Billing
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/pricing")}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 border-b border-slate-800"
                  >
                    <ShoppingCartIcon className="w-3.5 h-3.5" /> Buy a Plan
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-slate-800 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:block">
            <Link to="/login" state={{ from: location }}>
              <button className="bg-transparent border-2 border-cyan-700 hover:border-cyan-600 text-white px-6 py-2 rounded-full transition-all">
                Login
              </button>
            </Link>
          </div>
        )}

        {/* --- MOBILE VIEW --- */}
        {user && (
          <div className="md:hidden flex items-center gap-1.5 bg-slate-900/80 border border-amber-500/30 px-3 py-1.5 rounded-full ml-2">
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-400 text-xs font-bold">
              {user.credits}
            </span>
          </div>
        )}

        <button
          className="md:hidden text-white md:p-4 md:pl-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown Content */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 p-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5 z-50">
          {/* Mapped Mobile Nav Links */}
          {NAV_LINKS.map((link, index) => {
            // 4. RENDER MOBILE BUTTON IF IT'S AN ACTION
            if (link.isAction) {
              return (
                <button
                  key={index}
                  onClick={() => {
                    onOpenWhatsNew();
                    setIsOpen(false);
                  }}
                  className="text-gray-300 text-left w-full"
                >
                  {link.label}
                </button>
              );
            }
            return link.isAnchor ? (
              <a
                key={index}
                href={link.path}
                className="text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={index}
                to={link.path}
                className="text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          {user ? (
            <>
              <div className="flex items-center gap-3 py-2 border-b border-slate-800">
                {user.profile_pic && (
                  <img
                    src={user.profile_pic}
                    className="w-8 h-8 rounded-full"
                    alt="Profile"
                  />
                )}
                <div>
                  <p className="text-white text-sm font-bold">
                    {user.full_name}
                  </p>
                  <p className="text-slate-400 text-xs">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  // If the user exists and their plan is NOT 'free', send them to the pro workspace.
                  // Otherwise (free users or guests), send them to the standard workspace.
                  if (user && user.plan !== "free") {
                    navigate("/workspace-2_0");
                  } else {
                    navigate("/workspace");
                  }
                }}
                className="text-purple-400 text-left font-medium"
              >
                Go to Workspace
              </button>
              {user.is_admin && (
                <button
                  onClick={() => {
                    navigate("/admin");
                    setIsOpen(false);
                  }}
                  className="text-purple-400 text-left font-medium"
                >
                  Admin Panel
                </button>
              )}
              {user.plan?.toLowerCase() !== "free" && (
                <button
                  onClick={() => {
                    navigate("/billing");
                    setIsOpen(false);
                  }}
                  className="text-slate-300 text-left font-medium"
                >
                  Billing & Credits
                </button>
              )}
              <button
                onClick={() => {
                  navigate("/pricing");
                  setIsOpen(false);
                }}
                className="text-cyan-400 text-left font-medium"
              >
                Buy a Plan
              </button>
              <button
                onClick={handleLogout}
                className="text-red-400 text-left pt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              state={{ from: location }}
              className="text-cyan-400 font-bold"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
