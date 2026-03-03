import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, ArrowLeft, Mail, Lock, Phone,
  User, ShoppingCart, Smartphone, ShieldCheck,
  Building, UserSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth, UserRole } from '../context/AuthContext';

const BG_IMAGE = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

type AuthView = 'login' | 'signup' | 'forgot' | 'otp' | 'preferences';
type RoleMode = 'user' | 'admin';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [roleMode, setRoleMode] = useState<RoleMode>('user');
  const [view, setView] = useState<AuthView>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Data States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ⏳ Mock API Call (Role-based checking)
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (view === 'login') {
        const payload = roleMode === 'user'
          ? { identifier: email, password, role: 'user' as UserRole }
          : { email, password, role: 'admin' as UserRole };

        if (!email || password.length < 6) {
          toast.error("Invalid credentials.");
          setIsLoading(false);
          return;
        }

        handleSuccessLogin(payload.role);
      }
      else if (view === 'signup') {
        toast.info("Sending OTP for verification...");
        setView('otp');
      }
      else if (view === 'otp') {
        toast.success("Identity verified securely!");
        setView('preferences');
      }
      else if (view === 'preferences') {
        toast.success("Design preferences saved!");
        handleSuccessLogin('user');
      }
      else if (view === 'forgot') {
        toast.success("Password reset link sent securely!");
        setView('login');
      }

    } catch (error) {
      console.error("[Login Error]", error);
      toast.error("Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessLogin = (role: UserRole) => {
    login({
      email,
      name: name || email.split('@')[0],
      role
    });

    toast.success(`Welcome back, ${name || email.split('@')[0]} 👋`);

    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      setTimeout(() => toast.success("🛒 Your cart has been restored!"), 800);
      navigate('/user/dashboard');
    }
  };

  const variants = {
    enter: { opacity: 0, y: 10 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const isAdmin = roleMode === 'admin';
  const themeAccent = isAdmin ? '#1F1A17' : '#2A2520';

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAF7F2] font-sans">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 transition-colors duration-1000 ${isAdmin ? 'bg-black/60' : 'bg-black/40'} z-10`} />
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          src={BG_IMAGE} alt="Luxury Background" className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#2A2520]/90 to-transparent" />
      </div>

      <Link to="/" className="absolute top-8 left-8 z-30 flex items-center gap-2 text-white/70 hover:text-white transition-all group font-medium">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs uppercase tracking-[0.2em]">Return to Store</span>
      </Link>

      <div className="relative z-30 w-full max-w-[420px] mx-4">

        {/* Toggle Switch */}
        {view === 'login' && (
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-md p-1 rounded-full flex border border-white/20">
              <button
                onClick={() => setRoleMode('user')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${!isAdmin ? 'bg-white text-black shadow-lg shadow-white/20' : 'text-white/60 hover:text-white'}`}
              >
                <UserSquare size={16} /> User
              </button>
              <button
                onClick={() => setRoleMode('admin')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${isAdmin ? 'bg-[#1F1A17] text-amber-500 shadow-lg shadow-black/40 border border-amber-500/20' : 'text-white/60 hover:text-white'}`}
              >
                <Building size={16} /> Admin
              </button>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* LOGIN VIEW */}
          {view === 'login' && (
            <motion.div
              key={`login-${roleMode}`}
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3 }}
              className={`backdrop-blur-3xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border transition-colors duration-500 ${isAdmin ? 'bg-[#110e0c]/95 border-amber-500/10' : 'bg-white/95 border-white/20'}`}
            >
              <div className="text-center mb-8">
                <h1 className={`text-3xl font-display font-semibold mb-2 ${isAdmin ? 'text-amber-500' : 'text-[#2A2520]'}`}>
                  {isAdmin ? 'Admin Portal' : 'Welcome Back'}
                </h1>
                <p className={`${isAdmin ? 'text-gray-400' : 'text-[#6D655E]'} text-sm`}>
                  {isAdmin ? 'Authorized personnel access only' : 'Sign in to your luxury collections'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${isAdmin ? 'text-amber-500/60' : 'text-[#6D655E]'}`}>
                    {isAdmin ? 'Admin Email' : 'Email or Phone'}
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isAdmin ? 'text-amber-500/50' : 'text-[#BDA183]'}`} />
                    <Input
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder={isAdmin ? "admin@vanca.com" : "Enter email or phone"}
                      className={`pl-11 h-14 rounded-2xl transition-colors ${isAdmin ? 'bg-white/5 border-amber-500/10 text-white placeholder:text-gray-600 focus:border-amber-500/50' : 'bg-[#F5F2EC] border-transparent text-[#2A2520] placeholder:text-[#A79D93] focus:border-[#BDA183]'}`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${isAdmin ? 'text-amber-500/60' : 'text-[#6D655E]'}`}>Password</label>
                  <div className="relative">
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isAdmin ? 'text-amber-500/50' : 'text-[#BDA183]'}`} />
                    <Input
                      type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`pl-11 pr-12 h-14 rounded-2xl transition-colors ${isAdmin ? 'bg-white/5 border-amber-500/10 text-white focus:border-amber-500/50' : 'bg-[#F5F2EC] border-transparent text-[#2A2520] focus:border-[#BDA183]'}`}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {!isAdmin && (
                  <div className="flex items-center justify-between px-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-[#BDA183] text-[#BDA183] bg-[#F5F2EC]" />
                      <span className="text-xs text-[#6D655E] group-hover:text-[#2A2520]">Remember me</span>
                    </label>
                    <button type="button" onClick={() => setView('forgot')} className="text-xs font-medium text-[#BDA183] hover:text-[#8C745A]">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <Button disabled={isLoading} type="submit" className={`w-full h-14 rounded-2xl font-medium text-sm transition-all shadow-lg ${isAdmin ? 'bg-amber-600 hover:bg-amber-500 text-black shadow-amber-500/20' : 'bg-[#2A2520] hover:bg-[#1A1714] text-white shadow-[#2A2520]/20'}`}>
                  {isLoading ? "Authenticating securely..." : "Secure Login"}
                </Button>
              </form>

              {/* SSO Logins */}
              <div className="mt-8">
                <div className="relative flex items-center justify-center mb-6">
                  <div className={`absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-${isAdmin ? 'white/10' : '[#E1DDD6]'} to-transparent`} />
                  <span className={`relative px-4 text-[10px] tracking-widest uppercase font-bold ${isAdmin ? 'bg-[#110e0c] text-white/40' : 'bg-white text-[#A79D93]'}`}>Alternative Login</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button className={`h-12 flex items-center justify-center gap-3 rounded-xl border transition-colors ${isAdmin ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white' : 'border-[#E1DDD6] bg-[#F5F2EC]/50 hover:bg-[#EAE4D7] text-[#2A2520]'}`}>
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    <span className="text-xs font-bold">Sign in with Google</span>
                  </button>
                </div>
              </div>

              {/* Bottom Actions */}
              {!isAdmin && (
                <div className="mt-8 space-y-4">
                  <p className="text-center text-sm text-[#6D655E]">
                    Don't have an account?{' '}
                    <button onClick={() => setView('signup')} className="font-semibold text-[#2A2520] hover:text-[#BDA183]">
                      Sign Up
                    </button>
                  </p>
                  <div className="w-full px-6 py-4 bg-[#F5F2EC] rounded-2xl border border-[#E1DDD6]/50 flex items-center justify-between cursor-pointer hover:bg-[#EAE4D7] transition-colors group" onClick={() => navigate('/collection')}>
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="text-[#BDA183] w-5 h-5" />
                      <span className="text-xs font-semibold text-[#2A2520]">Guest Checkout</span>
                    </div>
                    <ArrowLeft className="w-4 h-4 rotate-180 text-[#A79D93] group-hover:text-[#2A2520]" />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ADD OTHER VIEWS FOR SIGNUP/FORGOT ...  */}
          {view === 'forgot' && (
            <motion.div key="forgot" variants={variants} initial="enter" animate="center" exit="exit" className="bg-white/95 backdrop-blur-3xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-black/40 border border-white/20 text-center">
              <div className="w-16 h-16 bg-[#F5F2EC] rounded-full mx-auto flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-[#BDA183]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#2A2520] mb-2">Reset Password</h2>
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <Input type="email" placeholder="Email Address" className="h-14 bg-[#F5F2EC] border-transparent focus:border-[#BDA183] rounded-2xl px-6 text-[#2A2520] text-center" required />
                <Button disabled={isLoading} type="submit" className="w-full h-14 bg-[#2A2520] hover:bg-[#1A1714] text-white rounded-2xl font-medium shadow-lg shadow-[#2A2520]/20">Send Reset Link</Button>
                <button type="button" onClick={() => setView('login')} className="text-xs font-semibold text-[#6D655E] hover:text-[#2A2520] tracking-widest">Back to Login</button>
              </form>
            </motion.div>
          )}

          {view === 'signup' && (
            <motion.div key="signup" variants={variants} initial="enter" animate="center" exit="exit" className="bg-white/95 backdrop-blur-3xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-white/20 text-center">
              <h1 className="text-3xl font-display font-semibold text-[#2A2520] mb-6">Join Vanca</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="h-14 rounded-2xl" required />
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="h-14 rounded-2xl" required />
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Strong Password" className="h-14 rounded-2xl" required />
                <Button disabled={isLoading} type="submit" className="w-full h-14 bg-[#2A2520] text-white rounded-2xl">Create Account</Button>
              </form>
              <button onClick={() => setView('login')} className="mt-6 text-sm font-semibold text-[#2A2520]">Back to Login</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;