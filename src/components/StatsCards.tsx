import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  color: string;
  index: number;
}

export const StatsCardsGrid = ({ stats }: { stats: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <StatCard index={0} label="Inventory Size" value={stats.totalProducts} color="bg-blue-500" />
      <StatCard index={1} label="Pending Orders" value={stats.totalOrders} color="bg-amber-500" />
      <StatCard index={2} label="Est. Revenue" value={stats.revenue} color="bg-emerald-500" />
    </div>
  );
};

const StatCard = ({ label, value, color, index }: StatCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`} />
    
    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-3">{label}</p>
    <h2 className="text-4xl font-display font-bold text-white tracking-tighter">{value}</h2>
    
    <div className={`h-1 w-12 ${color} mt-6 rounded-full`} />
  </motion.div>
);