import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { StatsCardsGrid } from '../components/StatsCards';
import ProductForm from '../components/ProductForm';
import { Bell, Menu } from 'lucide-react';

const AdminDashboard = ({ setAuth }: { setAuth: (status: boolean) => void }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 12, revenue: "₹4,50,000" });

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('vanca_inventory') || '[]');
    setStats(prev => ({ ...prev, totalProducts: products.length }));
  }, []);

  const handleLogout = () => setAuth(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        onLogout={handleLogout} 
      />

      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-50">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg">
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-6">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <div className="flex items-center gap-3 pl-6 border-l border-white/10 text-right">
              <div>
                <p className="text-sm font-bold">Admin Panel</p>
                <p className="text-[10px] text-amber-500 uppercase font-bold tracking-widest">Superuser</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold">Business Overview</h1>
              <StatsCardsGrid stats={stats} />
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-white">Inventory</h1>
                <p className="text-gray-500 text-sm">Manage your premium furniture pieces</p>
              </div>
              <ProductForm />
            </div>
          )}

          {activeTab === 'collections' && (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl text-gray-500">
              Collection Manager Coming Soon...
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl text-gray-500">
              Order Tracking Coming Soon...
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;