import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

export const AdminLayout = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setSidebarOpen, 
  onLogout 
}: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isOpen}
        onLogout={onLogout}
      />

      <main className="flex-1 flex flex-col h-screen relative hide-scrollbar overflow-x-hidden">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <AdminHeader 
            isSidebarOpen={isOpen} 
            setSidebarOpen={setSidebarOpen} 
          />
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-[1400px] mx-auto w-full">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};