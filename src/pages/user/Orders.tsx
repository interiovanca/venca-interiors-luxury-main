import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, RefreshCw, ArrowLeft, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Orders = () => {
  const navigate = useNavigate();

  const allOrders = [
    { id: '#ORD-2024-89V', product: 'Luxury Velvet Sofa', price: '₹85,000', date: '21 Oct 2024', status: 'Shipped', img: '/assets/images/collections/collections-50.webp', items: 1 },
    { id: '#ORD-2024-42L', product: 'Nordic Oak Dining Table', price: '₹42,000', date: '10 Oct 2024', status: 'Delivered', img: '/assets/images/collections/collections-51.webp', items: 1 },
    { id: '#ORD-2024-11A', product: 'Minimalist Floor Lamp', price: '₹12,400', date: '2 Sept 2024', status: 'Delivered', img: '/assets/images/collections/collections-52.webp', items: 2 },
    { id: '#ORD-2024-05Z', product: 'Art Deco Mirror', price: '₹28,000', date: '15 Aug 2024', status: 'Processing', img: '/assets/images/ui/placeholder.webp', items: 1 }
  ];

  return (
    <div className="min-h-screen bg-background font-sans pb-20">

      <div className="bg-[#2A2520] pt-12 pb-24 px-6 lg:px-20 text-white rounded-b-[3rem] relative shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/ui/ui-21.webp')] opacity-5 blur-xl mix-blend-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <button onClick={() => navigate('/user/dashboard')} className="flex items-center gap-2 text-amber-500/70 hover:text-amber-500 transition-colors mb-6 text-xs uppercase font-bold tracking-[0.2em]">
            <ArrowLeft className="w-4 h-4" /> Return to Dashboard
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl font-display font-light">My Order History</h1>
              <p className="text-white/60 text-sm mt-2 font-medium">Track and manage your luxury acquisitions</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BDA183]" />
                <Input placeholder="Search orders..." className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full focus:bg-white/20 focus:border-amber-500/50" />
              </div>
              <Button className="bg-white/10 hover:bg-white/20 border-white/20 rounded-full h-12 px-6 shrink-0 font-semibold shadow-lg backdrop-blur-md">
                <Filter className="w-4 h-4 mr-2 text-amber-500" /> Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 space-y-6">

        {allOrders.map((order, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            key={order.id}
            className="bg-card rounded-[2rem] p-6 lg:p-8 shadow-xl border border-border flex flex-col md:flex-row gap-8 items-start md:items-center hover:-translate-y-1 transition-transform group"
          >
            {/* Image */}
            <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-muted shrink-0">
              <img src={order.img} alt={order.product} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Details */}
            <div className="flex-1 w-full flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-[#A79D93] bg-muted px-3 py-1 rounded-full">{order.id}</span>
                  <h3 className="text-xl font-bold text-[#2A2520] mt-3">{order.product}</h3>
                  <p className="text-sm font-medium text-[#6D655E] mt-1">{order.items} Item{order.items > 1 ? 's' : ''}</p>
                </div>
                <span className="font-display font-bold text-2xl text-[#2A2520]">{order.price}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4 border-t border-border mt-4">
                <div>
                  <p className="text-[10px] text-[#A79D93] uppercase font-bold tracking-widest">Ordered On</p>
                  <p className="text-sm font-bold text-[#6D655E] mt-1">{order.date}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#A79D93] uppercase font-bold tracking-widest">Status</p>
                  <div className={`text-sm font-bold flex items-center gap-1.5 mt-1 ${order.status === 'Delivered' ? 'text-emerald-600' :
                    order.status === 'Processing' ? 'text-amber-500' : 'text-blue-600'
                    }`}>
                    {order.status === 'Delivered' ? <CheckCircle className="w-4 h-4" /> :
                      order.status === 'Shipped' ? <Truck className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                    {order.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Button onClick={() => navigate(`/user/orders/${order.id.replace('#', '')}`)} className="w-full bg-[#2A2520] hover:bg-[#1A1714] text-white rounded-xl h-12 shadow-lg shadow-[#2A2520]/20 font-semibold px-8 md:px-10">
                Track Delivery
              </Button>
              <Button variant="outline" className="w-full bg-card border-border text-[#6D655E] hover:bg-muted hover:text-[#2A2520] rounded-xl h-12 shadow-sm font-semibold">
                View Details
              </Button>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
};
