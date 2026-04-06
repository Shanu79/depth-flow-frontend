import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Key, 
  FileText, 
  Book, 
  CircleQuestionMark, 
  CreditCard,
  Menu,
  X,
  DollarSign
} from 'lucide-react';

const ApiSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Automatically close the sidebar on mobile when a link is clicked
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'documentation', label: 'Documentation', icon: Book },
    { id: 'pricing', label: 'Pricing Plans', icon: DollarSign },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'support-contact', label: 'Support & Contact', icon: CircleQuestionMark }
  ];

  return (
    <>
      {/* 📱 MOBILE TOP BAR (Hidden on Desktop) */}
      <div className="md:hidden w-full flex items-center justify-between pt-6 px-4 shrink-0">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* 📱 MOBILE OVERLAY BACKDROP */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🖥️ MAIN SIDEBAR (Slide-out on Mobile, Fixed on Desktop) */}
      <aside className={`
        fixed md:relative top-0 left-0 h-full w-64 border-r border-white/5 flex flex-col bg-[#070514] z-50 
        transition-transform duration-300 ease-in-out shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:mt-8 pt-6 md:pt-0
      `}>
        
        {/* Mobile Close Button (Inside the Drawer) */}
        <div className="flex justify-between items-center px-6 mb-4 md:hidden">
          <span className="text-gray-400 font-medium text-sm">Navigation</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={`/depthflow-api/${item.id}`}
                className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-transparent border border-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default ApiSidebar;