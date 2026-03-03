import React from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, DollarSign } from 'lucide-react';

interface StatsProps {
  totalProducts: number;
  totalOrders: number;
  revenue: string;
}

export const BusinessOverview = ({ stats }: { stats: StatsProps }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-2">Business Overview</h1>
        <p className="text-gray-400">Track your premium inventory and orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard index={0} label="Total Inventory" value={stats.totalProducts} icon={Package} color="from-amber-500 to-amber-700" />
        <StatCard index={1} label="Pending Orders" value={stats.totalOrders} icon={TrendingUp} color="from-blue-500 to-blue-700" />
        <StatCard index={2} label="Est. Revenue" value={stats.revenue} icon={DollarSign} color="from-emerald-500 to-emerald-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden">
          <h3 className="text-lg font-bold mb-6">Revenue Analysis</h3>
          <div className="h-64 flex items-end justify-between gap-3 overflow-hidden mt-4">
            {[40, 70, 45, 90, 65, 85, 120, 60, 100, 50, 75, 110].map((h, i) => (
              <div key={i} className="w-full relative group h-full flex flex-col justify-end">
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/10 px-2 py-1 rounded text-xs z-10 pointer-events-none">
                  {h}%
                </div>
                <div
                  className="w-full bg-gradient-to-t from-amber-500/20 to-amber-500 rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                  style={{ height: `${(h / 120) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { title: 'New luxury sofa added', time: '2 mins ago', color: 'bg-amber-500' },
              { title: 'Order #429 shipped', time: '1 hour ago', color: 'bg-emerald-500' },
              { title: 'Payment received: ₹1,20,000', time: '3 hours ago', color: 'bg-blue-500' },
              { title: 'New collection draft saved', time: '5 hours ago', color: 'bg-purple-500' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className={`mt-1.5 w-2.5 h-2.5 rounded-full ${item.color} shadow-lg shadow-${item.color}/50 group-hover:scale-125 transition-transform`} />
                <div>
                  <p className="text-sm font-medium text-white/90">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-all cursor-default"
  >
    <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${color} opacity-[0.1] rounded-full group-hover:scale-150 transition-transform duration-700 blur-2xl`} />

    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} bg-opacity-20 mb-6 flex items-center justify-center shadow-lg shadow-black/50`}>
      <Icon size={24} className="text-white drop-shadow-md" />
    </div>

    <p className="text-gray-400 text-xs uppercase font-bold tracking-[0.2em] mb-2">{label}</p>
    <h2 className="text-4xl font-display font-bold text-white tracking-tighter">{value}</h2>
  </motion.div>
);