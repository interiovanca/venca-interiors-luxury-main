import React, { useState, useEffect } from "react";
import { AdminLayout } from "../components/admin/AdminLayout";
import { BusinessOverview } from "../components/admin/BusinessOverview";
import ProductForm from "../components/ProductForm";
import CollectionManager from "../components/CollectionManager";
import InventoryList from "../components/InventoryList";
import { PackageSearch, FolderTree, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = ({ setAuth }: { setAuth: (status: boolean) => void }) => {

  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });

  const calculateStats = () => {

    const products = JSON.parse(localStorage.getItem("vanca_inventory") || "[]");

    const orders = JSON.parse(localStorage.getItem("vanca_orders") || "[]");

    const revenue = orders.reduce(
      (total: number, order: any) => total + order.totalPrice,
      0
    );

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      revenue,
    });
  };

  useEffect(() => {

    calculateStats();

    const interval = setInterval(() => {
      calculateStats();
    }, 2000); // refresh every 2 seconds

    window.addEventListener("storage", calculateStats);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", calculateStats);
    };

  }, []);

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

        {activeTab === "overview" && (
          <BusinessOverview
            stats={{
              totalProducts: stats.totalProducts,
              totalOrders: stats.totalOrders,
              revenue: `₹${stats.revenue.toLocaleString()}`
            }}
          />
        )}

        {activeTab === "products" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                <PackageSearch className="text-amber-500" />
              </div>

              <div>
                <h1 className="text-3xl font-display font-bold text-white">
                  Product Management
                </h1>
                <p className="text-gray-400 text-sm">
                  Upload and manage your premium inventory
                </p>
              </div>
            </div>

            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-3xl">

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag size={20} className="text-amber-500" />
                Add New Product
              </h2>

              <ProductForm
                onProductAdded={() => {
                  calculateStats();
                  setActiveTab("inventory");
                }}
              />

            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <FolderTree className="text-blue-500" />
              </div>

              <div>
                <h1 className="text-3xl font-display font-bold text-white">
                  Current Inventory
                </h1>
                <p className="text-gray-400 text-sm">
                  View all active published items
                </p>
              </div>

            </div>

            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-3xl">
              <InventoryList />
            </div>

          </div>
        )}

        {activeTab === "collections" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CollectionManager />
          </div>
        )}

        {activeTab === "orders" && (

          <div className="space-y-6">

            <h1 className="text-3xl font-bold text-white">
              Orders
            </h1>

            <div className="bg-[#0a0a0a]/80 border border-white/10 rounded-3xl p-6">

              {JSON.parse(localStorage.getItem("vanca_orders") || "[]").length === 0 ? (
                <p className="text-gray-400">
                  No orders yet.
                </p>
              ) : (
                JSON.parse(localStorage.getItem("vanca_orders") || "[]").map(
                  (order: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between border-b border-white/10 py-4"
                    >
                      <div>
                        <p className="text-white font-semibold">
                          Order #{order.id}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {order.items.length} items
                        </p>
                      </div>

                      <p className="text-amber-500 font-bold">
                        ₹{order.totalPrice}
                      </p>
                    </div>
                  )
                )
              )}

            </div>

          </div>

        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;