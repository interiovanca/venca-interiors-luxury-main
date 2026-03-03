import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Package, Truck, ArrowLeft, Home, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const steps = [
    { title: 'Order Placed', date: '21 Oct 2024, 10:24 AM', icon: <Package className="w-5 h-5" />, completed: true },
    { title: 'Confirmed', date: '21 Oct 2024, 02:40 PM', icon: <Check className="w-5 h-5" />, completed: true },
    { title: 'Shipped', date: '22 Oct 2024, 11:15 AM', icon: <Truck className="w-5 h-5" />, completed: true },
    { title: 'Out for Delivery', date: 'Estimated 24 Oct', icon: <Home className="w-5 h-5" />, completed: false },
    { title: 'Delivered', date: '', icon: <Check className="w-5 h-5" />, completed: false },
  ];

  return (
    <div className="min-h-screen bg-[#F5F2EC] font-sans pb-20">

      <div className="bg-[#2A2520] pt-12 pb-12 px-6 lg:px-20 text-white rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 text-sm font-medium uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <p className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-2">Tracking ID: #{id}</p>
              <h1 className="text-4xl font-display font-light">Order Details</h1>
            </div>
            <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-md text-sm font-semibold flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              In Transit
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-6 relative z-20 space-y-8">

        {/* Progress Tracker */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-xl border border-[#EAE4D7]">
          <h3 className="text-xl font-display font-bold text-[#2A2520] mb-10">Delivery Status</h3>

          <div className="relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-[#F5F2EC] rounded-full z-0" />
            <div className="absolute left-[27px] top-4 h-[60%] w-1 bg-amber-500 rounded-full z-0 transition-all duration-1000" />

            <div className="space-y-12 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-colors duration-500 ${step.completed ? 'bg-amber-500 text-white shadow-amber-500/30' : 'bg-white text-[#A79D93] border-2 border-[#F5F2EC]'}`}>
                    {step.icon}
                  </div>
                  <div className="pt-2">
                    <h4 className={`text-lg font-bold ${step.completed ? 'text-[#2A2520]' : 'text-[#A79D93]'}`}>{step.title}</h4>
                    <p className="text-sm font-medium text-[#6D655E] mt-1">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

        {/* Order Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[2rem] p-8 shadow-md border border-[#EAE4D7]">
            <h3 className="text-lg font-bold text-[#2A2520] mb-4">Shipping Address</h3>
            <p className="text-[#6D655E] text-sm leading-relaxed font-medium">
              Ankit Mishra<br />
              Skyline Apartments, B-402<br />
              Bandra West, Mumbai 400050<br />
              Maharashtra, India<br />
              <br />
              <span className="text-[#BDA183]">📱 +91 98765 43210</span>
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-[2rem] p-8 shadow-md border border-[#EAE4D7] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#2A2520] mb-4">Estimated Delivery</h3>
              <h2 className="text-3xl font-display font-light text-amber-600 mb-2">24 Oct 2024</h2>
              <p className="text-[#6D655E] text-sm font-medium">Your luxury furniture piece will be delivered securely by white-glove professionals.</p>
            </div>
            <Button className="w-full mt-6 bg-[#F5F2EC] hover:bg-[#EAE4D7] text-[#2A2520] rounded-xl h-12 shadow-sm font-semibold flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#BDA183]" /> Contact Concierge Support
            </Button>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
