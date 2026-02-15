import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"; // ✅ Notification ke liye
import loginart from '@/assets/login1.png';

// ✅ Type definition for TS
interface LoginPageProps {
  setAuth: (status: boolean) => void;
}

const LoginPage = ({ setAuth }: LoginPageProps) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true); // Default Admin par rakha hai
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // ✅ Validation Logic with case-insensitivity
    setTimeout(() => {
      const isValidEmail = email.toLowerCase() === "vancainterio@gmail.com";
      const isValidPassword = password === "ankitmishra_" || password === "Ankitmishra";

      if (isValidEmail && isValidPassword) {
        setAuth(true);
        toast.success("Welcome back, Ankit! Redirecting to Workspace...");
        navigate('/admin');
      } else {
        toast.error("Access Denied: Invalid Credentials"); // ✅ Sundar error message
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0510]">
      
      {/* BACKGROUND IMAGE - Cinematic Effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src={loginart} 
          alt="Luxury Interior" 
          className="w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0510] via-transparent to-[#0a0510]/80" />
      </div>

      {/* BACK BUTTON */}
      <Link
        to="/"
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/40 hover:text-white transition-all group font-medium"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] uppercase tracking-[0.2em]">back to home</span>
      </Link>

      {/* LIQUID GLASS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[440px] mx-4"
      >
        <div className="backdrop-blur-[30px] bg-white/[0.03] border border-white/10 p-10 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)]">
          
          {/* LOGO ICON */}
          <div className="flex justify-center mb-10">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-white/10 to-transparent p-4 rounded-2xl border border-white/10 shadow-inner"
            >
              <Shield className="w-8 h-8 text-white/80" />
            </motion.div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-extralight text-white tracking-tighter mb-4 italic font-serif">Vanca <span className="not-italic font-sans font-bold opacity-20">Interio</span></h1>
            
            {/* ROLE SELECTOR */}
            <div className="inline-flex p-1 bg-white/5 rounded-full border border-white/10">
              <button 
                onClick={() => setIsAdmin(false)}
                className={`px-6 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all ${!isAdmin ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                User
              </button>
              <button 
                onClick={() => setIsAdmin(true)}
                className={`px-6 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all ${isAdmin ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 ml-2 font-black">Authentication ID</label>
              <Input
                name="email"
                type="email"
                placeholder="vancainterio@gmail.com"
                className="h-14 bg-white/[0.02] border-white/5 text-white placeholder:text-white/10 focus:border-white/20 focus:bg-white/5 transition-all rounded-2xl px-6"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 ml-2 font-black">Secure Token</label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-14 bg-white/[0.02] border-white/5 text-white placeholder:text-white/10 focus:border-white/20 focus:bg-white/5 transition-all rounded-2xl px-6 pr-14"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <button type="button" className="text-[9px] uppercase tracking-widest text-white/20 hover:text-white transition-colors font-bold">Forgot Access?</button>
              <button type="button" className="text-[9px] uppercase tracking-widest text-white/20 hover:text-white transition-colors font-bold">Security Help</button>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-16 bg-white text-black hover:bg-neutral-200 transition-all rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-white/5"
            >
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                   <Shield size={18} />
                </motion.div>
              ) : "Authenticate Access"}
            </Button>
          </form>

          <p className="mt-10 text-center text-[10px] text-white/20 tracking-widest uppercase">
            Privileged Access Only — <span className="text-white/60 font-bold">Vanca Interio</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;