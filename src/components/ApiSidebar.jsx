import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Key, 
  FileText, 
  Book, 
  Percent, 
  CreditCard, 
} from 'lucide-react';

const ApiSidebar = () => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'documentation', label: 'Documentation', icon: Book },
    { id: 'pricing', label: 'Pricing Plans', icon: Percent },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <aside className="w-64 border-r border-white/5 flex flex-col bg-[#070514] z-20 mt-8">
      <nav className="flex-1 px-4 py-2 space-y-1">
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
  );
}
export default ApiSidebar;