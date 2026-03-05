import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Package, Heart, RefreshCw, CheckCircle, ChevronRight, LogOut, Settings, Building, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const statCards = [
    { label: "Total Orders", value: 4, icon: <Package className="w-5 h-5 text-amber-600" /> },
    { label: "Pending", value: 1, icon: <RefreshCw className="w-5 h-5 text-blue-500" /> },
    { label: "Delivered", value: 3, icon: <CheckCircle className="w-5 h-5 text-emerald-500" /> },
    { label: "Wishlist", value: user?.wishlistCount || 2, icon: <Heart className="w-5 h-5 text-rose-500" /> }
  ];

  const recentOrders = [
    { id: '#ORD-2024-89V', product: 'Luxury Velvet Sofa', price: '₹85,000', date: '21 Oct 2024', status: 'Shipped', img: '/assets/images/backgrounds/backgrounds-54.webp' },
    { id: '#ORD-2024-42L', product: 'Nordic Oak Dining Table', price: '₹42,000', date: '10 Oct 2024', status: 'Delivered', img: '/assets/images/backgrounds/backgrounds-55.webp' }
  ];

  return (
    <div className="min-h-screen bg-background font-sans pb-20">

      {/* Dynamic Header */}
      <div className="bg-[#2A2520] pt-24 pb-16 px-6 lg:px-20 text-white rounded-b-[3rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/assets/images/backgrounds/backgrounds-56.webp')] bg-cover mix-blend-overlay" />

        <Link to="/collection" className="absolute top-8 left-6 lg:left-20 z-30 flex items-center gap-2 text-white/50 hover:text-white transition-all group font-medium">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-[0.2em]">Continue Shopping</span>
        </Link>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-light mb-2">
              Welcome back, <span className="font-semibold text-amber-500">{user?.name} 👋</span>
            </h1>
            <p className="text-white/60 font-medium tracking-wide text-sm">Manage your premium interior collections and orders.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white" onClick={() => navigate('/user/settings')}>
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Button>
            <Button variant="destructive" className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-8 relative z-20">

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {statCards.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              key={idx} className="bg-card p-6 rounded-3xl shadow-lg shadow-black/5 flex items-center gap-4 hover:-translate-y-1 transition-transform border border-border"
            >
              <div className="p-3 bg-muted rounded-2xl">{stat.icon}</div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-display font-bold text-foreground">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ORDERS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-foreground">Recent Orders</h2>
              <button onClick={() => navigate('/user/orders')} className="text-sm font-semibold text-[#BDA183] hover:text-foreground transition-colors flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + (idx * 0.1) }}
                  key={idx} className="bg-card rounded-[2rem] p-4 lg:p-6 shadow-md border border-border flex flex-col sm:flex-row items-center gap-6 hover:shadow-xl transition-shadow group"
                >
                  <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-muted shrink-0">
                    <img src={order.img} alt={order.product} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">{order.id}</span>
                        <h3 className="text-lg font-bold text-foreground mt-2">{order.product}</h3>
                      </div>
                      <span className="font-display font-bold text-lg text-foreground">{order.price}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-4 py-3 border-t border-border">
                      <div className="flex-1">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Ordered On</p>
                        <p className="text-sm font-semibold text-foreground/70">{order.date}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Status</p>
                        <p className={`text-sm font-semibold flex items-center gap-1.5 ${order.status === 'Delivered' ? 'text-emerald-600' : 'text-blue-600'}`}>
                          {order.status === 'Delivered' ? <CheckCircle className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                          {order.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex sm:flex-col gap-2 shrink-0">
                    <Button className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-xl h-11 shadow-md" onClick={() => navigate(`/user/orders/${order.id.replace('#', '')}`)}>
                      Track Order
                    </Button>
                    <Button variant="outline" className="w-full border-[#BDA183] text-[#BDA183] hover:bg-[#BDA183] hover:text-white rounded-xl h-11" onClick={() => navigate(`/product/mock`)}>
                      Buy Again
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-foreground">Quick Links</h2>
            </div>
            <div className="bg-card p-6 rounded-[2rem] shadow-md border border-border space-y-2">
              <QuickLink title="My Wishlist" desc="View your saved items" icon={<Heart />} onClick={() => navigate('/user/wishlist')} />
              <QuickLink title="Saved Addresses" desc="Manage delivery locations" icon={<Building />} onClick={() => navigate('/user/settings')} />
              <QuickLink title="Account Settings" desc="Update profile details" icon={<Settings />} onClick={() => navigate('/user/settings')} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const QuickLink = ({ title, desc, icon, onClick }: any) => (
  <div onClick={onClick} className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted cursor-pointer transition-colors group">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-[#BDA183] group-hover:bg-background transition-colors shadow-sm">{icon}</div>
      <div>
        <h4 className="font-bold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
  </div>
);
