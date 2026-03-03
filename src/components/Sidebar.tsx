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
    { id: 'inventory', label: 'Inventory', icon: Layers },
    { id: 'collections', label: 'Collections', icon: Layers },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      className="bg-[#050505]/80 backdrop-blur-xl border-r border-white/5 flex flex-col p-4 sticky top-0 h-screen transition-all relative z-50 shrink-0"
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2 mb-10 h-10 overflow-hidden">
        <div className="min-w-[40px] h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-amber-500/20 text-black">V</div>
        {isOpen && <span className="font-display font-bold text-xl tracking-tighter whitespace-nowrap text-white">VANCA</span>}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={!isOpen ? item.label : undefined}
              className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 relative group overflow-hidden ${isActive
                  ? 'text-black font-semibold'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 shadow-md shadow-amber-500/20"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <div className="relative z-10 flex items-center gap-4">
                <item.icon size={20} className={isActive ? 'text-black' : 'text-gray-400 group-hover:text-amber-500 transition-colors'} />
                {isOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              </div>
            </button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="flex items-center gap-4 p-3.5 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all w-full relative group mt-auto overflow-hidden"
      >
        <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors" />
        <LogOut size={20} className="relative z-10" />
        {isOpen && <span className="text-sm font-medium relative z-10">Logout</span>}
      </button>
    </motion.aside>
  );
};

export default Sidebar;