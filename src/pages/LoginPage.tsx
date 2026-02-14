import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import loginart from '@/assets/login1.png';

const LoginPage = ({ setAuth }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Validation Logic
    setTimeout(() => {
      if (email === "vancainterio@gmail.com" && password === "ankitmishra_") {
        setAuth(true); // App.tsx ki state update hogi
        navigate('/admin'); // Admin panel redirect
      } else {
        alert("Invalid credentials! Please use the correct Gmail and Password.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#120a1d]">
      
      {/* BACKGROUND IMAGE - Fixed & Blurred */}
      <div className="absolute inset-0 z-0">
        <img 
          src={loginart} 
          alt="Login background" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#120a1d] via-transparent to-[#120a1d]/50" />
      </div>

      {/* BACK BUTTON */}
      <Link
        to="/"
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/50 hover:text-white transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs uppercase tracking-widest font-medium">Back to Home</span>
      </Link>

      {/* LIQUID GLASS CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[420px] mx-4"
      >
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          
          {/* LOGO / ICON */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-white tracking-tight mb-2">Login</h1>
            
            {/* ROLE SELECTOR */}
            <div className="flex justify-center gap-6 mt-4">
              <button 
                onClick={() => setIsAdmin(false)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all pb-1 border-b-2 ${!isAdmin ? 'text-white border-white' : 'text-white/30 border-transparent'}`}
              >
                Guest User
              </button>
              <button 
                onClick={() => setIsAdmin(true)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all pb-1 border-b-2 ${isAdmin ? 'text-white border-white' : 'text-white/30 border-transparent'}`}
              >
                Authorized Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">Email Address</label>
              <Input
                name="email"
                type="email"
                placeholder="vancainterio@gmail.com"
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/40 focus:bg-white/10 transition-all rounded-xl"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">Password</label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/40 focus:bg-white/10 transition-all rounded-xl pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-3 h-3 rounded border-white/20 bg-transparent accent-white" />
                <span className="text-[10px] uppercase tracking-tighter text-white/50 group-hover:text-white transition-colors">Remember Me</span>
              </label>
              <button type="button" className="text-[10px] uppercase tracking-tighter text-white/50 hover:text-white transition-colors">
                Forgot Password?
              </button>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 bg-white text-black hover:bg-gray-200 transition-all rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-white/5"
            >
              {isLoading ? "Verifying..." : "Enter Workspace"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/30 text-xs tracking-wide">
              Don't have an account? <span className="text-white font-bold cursor-pointer hover:underline">Request Access</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;