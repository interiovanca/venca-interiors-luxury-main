import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShoppingBag, Layers, ShoppingCart, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onLogout: () => void;
}

const Sidebar = ({ activeTab, setActiveTab, isOpen, onLogout }: SidebarProps) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'collections', label: 'Collections', icon: Layers },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
  ];

  return (
    <motion.aside 
      animate={{ width: isOpen ? 260 : 80 }}
      className="bg-[#0a0a0a] border-r border-white/5 flex flex-col p-4 sticky top-0 h-screen transition-all"
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2 mb-10 h-10 overflow-hidden">
        <div className="min-w-[32px] h-8 bg-amber-600 rounded-lg flex items-center justify-center font-bold">V</div>
        {isOpen && <span className="font-bold text-xl tracking-tighter whitespace-nowrap">VANCA ADMIN</span>}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
              activeTab === item.id 
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' 
              : 'text-gray-500 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {isOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <button 
        onClick={onLogout}
        className="flex items-center gap-4 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
      >
        <LogOut size={20} />
        {isOpen && <span className="text-sm font-medium">Logout</span>}
      </button>
    </motion.aside>
  );
};

export default Sidebar;