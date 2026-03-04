import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Building, MapPin, Phone, ArrowLeft, LogOut, Check, Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const AccountSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'address'>('profile');

  // Address State
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home (Default)', name: 'Ankit Mishra', phone: '+91 98765 43210', address: 'Skyline Apartments, B-402, Bandra West', city: 'Mumbai', state: 'Maharashtra', zip: '400050' },
    { id: 2, label: 'Work', name: 'Ankit Mishra', phone: '+91 98765 00000', address: 'Vanca Studios, Infinity IT Park, Malad East', city: 'Mumbai', state: 'Maharashtra', zip: '400097' }
  ]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background font-sans pb-20">

      {/* Header */}
      <div className="bg-[#2A2520] pt-12 pb-24 px-6 lg:px-20 text-white rounded-b-[3rem] relative shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-5 blur-xl mix-blend-overlay" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <button onClick={() => navigate('/user/dashboard')} className="flex items-center gap-2 text-amber-500/70 hover:text-amber-500 transition-colors mb-6 text-xs uppercase font-bold tracking-[0.2em]">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>

          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-display font-light">Account Settings</h1>
              <p className="text-white/60 text-sm mt-2 font-medium">Manage your personal luxury profile</p>
            </div>
            <Button variant="destructive" onClick={handleLogout} className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 px-6 rounded-full shadow-lg">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20 flex flex-col md:flex-row gap-8">

        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 bg-card p-4 rounded-[2rem] shadow-xl border border-border flex flex-col gap-2 h-fit">
          <TabButton icon={<User />} label="Personal Info" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          <TabButton icon={<Lock />} label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
          <TabButton icon={<Building />} label="Addresses" active={activeTab === 'address'} onClick={() => setActiveTab('address')} />
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
          className="flex-1 bg-card p-8 lg:p-12 rounded-[2rem] shadow-xl border border-border"
        >
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold text-[#2A2520] mb-6">Personal Information</h2>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField icon={<User />} label="Full Name" defaultValue={user?.name} />
                  <FormField icon={<Mail />} label="Email Address" defaultValue={user?.email} type="email" />
                  <FormField icon={<Phone />} label="Phone Number" defaultValue="+91 98765 43210" type="tel" />
                </div>

                <div className="pt-6 border-t border-border">
                  <Button type="submit" className="bg-[#BDA183] hover:bg-[#8C745A] text-white px-8 h-12 rounded-xl font-semibold shadow-md inline-flex">
                    Save Changes <Check className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="text-2xl font-bold text-[#2A2520] mb-6">Security Settings</h2>
              <form onSubmit={(e) => { e.preventDefault(); toast.success("Password secured!"); }} className="space-y-6 max-w-md">
                <div className="space-y-4">
                  <FormField icon={<Lock />} label="Current Password" type="password" placeholder="••••••••" />
                  <FormField icon={<Lock />} label="New Password" type="password" placeholder="Enter robust password" />
                  <FormField icon={<Lock />} label="Confirm New Password" type="password" placeholder="Re-enter password" />
                </div>
                <Button type="submit" className="w-full bg-[#2A2520] hover:bg-[#1A1714] text-white h-12 rounded-xl font-semibold shadow-lg shadow-[#2A2520]/20">
                  Update Password
                </Button>
              </form>
            </div>
          )}

          {activeTab === 'address' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#2A2520]">Saved Addresses</h2>
                <Button variant="outline" className="border-[#BDA183] text-[#BDA183] hover:bg-[#BDA183] hover:text-white rounded-full bg-muted px-4 font-semibold shadow-sm text-xs">
                  <Plus className="w-4 h-4 mr-1" /> Add New
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-6 rounded-2xl border-2 border-border bg-muted/40 hover:border-[#BDA183] transition-colors relative group">
                    <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                      <button className="p-2 bg-card rounded-full text-[#BDA183] shadow hover:bg-[#BDA183] hover:text-white"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 bg-card rounded-full text-red-500 shadow hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <h4 className="font-bold text-[#2A2520] flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-amber-500" /> {addr.label}
                    </h4>
                    <div className="text-sm font-medium text-[#6D655E] space-y-1 mt-3">
                      <p className="font-bold text-[#2A2520]">{addr.name}</p>
                      <p>{addr.address}</p>
                      <p>{addr.city}, {addr.state} {addr.zip}</p>
                      <p className="text-amber-600 mt-2">{addr.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

const TabButton = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex items-center gap-3 w-full p-4 rounded-xl transition-all duration-300 ${active ? 'bg-[#2A2520] text-amber-500 shadow-lg shadow-[#2A2520]/20 translate-x-2' : 'hover:bg-muted text-[#6D655E] hover:text-[#2A2520]'}`}>
    {React.cloneElement(icon, { className: "w-5 h-5" })} <span className="font-semibold text-sm">{label}</span>
  </button>
);

const FormField = ({ icon, label, type = "text", defaultValue, placeholder }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-[#6D655E] uppercase tracking-wider ml-1">{label}</label>
    <div className="relative">
      {React.cloneElement(icon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BDA183]" })}
      <Input type={type} defaultValue={defaultValue} placeholder={placeholder} className="pl-11 h-12 bg-muted border-transparent focus:border-[#BDA183] rounded-xl text-[#2A2520] transition-colors" />
    </div>
  </div>
);
