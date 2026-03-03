import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { BusinessOverview } from '../components/admin/BusinessOverview';
import ProductForm from '../components/ProductForm';
import CollectionManager from '../components/CollectionManager';
import InventoryList from '../components/InventoryList';
import { PackageSearch, FolderTree, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = ({ setAuth }: { setAuth: (status: boolean) => void }) => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 12,
    revenue: '₹4,50,000',
  });

  // Calculate generic stats
  useEffect(() => {
    const products = JSON.parse(
      localStorage.getItem('vanca_inventory') || '[]'
    );
    setStats((prev) => ({ ...prev, totalProducts: products.length }));
  }, [activeTab]); // Refresh stats when active tab changes

  const handleLogout = () => {
    logout();
    setAuth(false);
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isOpen={isSidebarOpen}
      setSidebarOpen={setSidebarOpen}
      onLogout={handleLogout}
    >
      <div className="w-full h-full pb-20">
        {activeTab === 'overview' && <BusinessOverview stats={stats} />}

        {activeTab === 'products' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                <PackageSearch className="text-amber-500" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-white">Product Management</h1>
                <p className="text-gray-400 text-sm">Upload and manage your premium inventory</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-3xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag size={20} className="text-amber-500" /> Add New Product
              </h2>
              <ProductForm onProductAdded={() => {
                // Refresh local items
                setActiveTab('inventory');
              }} />
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <FolderTree className="text-blue-500" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-white">Current Inventory</h1>
                <p className="text-gray-400 text-sm">View all active published items</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-3xl">
              <InventoryList />
            </div>
          </div>
        )}

        {activeTab === 'collections' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CollectionManager />
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-[#0a0a0a]/60 backdrop-blur-xl border border-dashed border-white/10 rounded-3xl mt-12 animate-in fade-in">
            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Order Tracking System</h3>
            <p className="text-gray-500 max-w-sm">
              We are integrating with major logistics partners directly inside your dashboard. Coming soon.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;