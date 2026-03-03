import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  title?: string;
}

export const AdminHeader = ({ isSidebarOpen, setSidebarOpen, title = 'Admin Panel' }: AdminHeaderProps) => {
  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10 text-gray-400 hover:text-white"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors group">
          <Bell size={20} className="text-gray-400 group-hover:text-white transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border border-[#050505]" />
        </button>
        
        <div className="flex items-center gap-4 pl-6 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white tracking-wide">{title}</p>
            <p className="text-[10px] text-amber-500 uppercase font-bold tracking-[0.2em] mt-0.5">
              Superuser
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-white shadow-lg shadow-amber-500/20">
            VK
          </div>
        </div>
      </div>
    </header>
  );
};