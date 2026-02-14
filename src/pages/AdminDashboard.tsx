import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FolderKanban, 
  Settings, LogOut, Shield, TrendingUp, Activity 
} from 'lucide-react';

const AdminDashboard = ({ setAuth }: { setAuth: (status: boolean) => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem('isAdminAuth');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0510] text-slate-200 flex font-sans">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#120a1d] border-r border-white/5 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-white/10 p-2 rounded-lg border border-white/10">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            VANCA <span className="text-white/40">ADMIN</span>
          </span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<FolderKanban size={20} />} label="Projects" />
          <NavItem icon={<Users size={20} />} label="Inquiries" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-medium mt-auto"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">System Statistics</h1>
            <p className="text-white/40 text-sm mt-1">Welcome back, Ankit Mishra</p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-2 pr-6 rounded-full border border-white/10">
             <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white">AM</div>
             <span className="text-sm font-medium">vancainterio@gmail.com</span>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<TrendingUp className="text-green-400" />} title="Total Visitors" value="12,842" growth="+12%" />
          <StatCard icon={<Activity className="text-blue-400" />} title="Active Projects" value="48" growth="+5" />
          <StatCard icon={<Shield className="text-purple-400" />} title="Security Status" value="Healthy" growth="Stable" />
        </div>

        {/* CONTENT PLACEHOLDER */}
        <div className="h-96 w-full rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm border-dashed flex items-center justify-center">
          <p className="text-white/20 font-medium">Analytics Chart and Table will appear here...</p>
        </div>
      </main>
    </div>
  );
};

// Sub-components
const NavItem = ({ icon, label, active = false }: any) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
    {icon} <span className="font-medium">{label}</span>
  </div>
);

const StatCard = ({ icon, title, value, growth }: any) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-colors">
    <div className="mb-4">{icon}</div>
    <p className="text-white/40 text-xs uppercase tracking-widest font-bold">{title}</p>
    <div className="flex items-baseline gap-3 mt-2">
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">{growth}</span>
    </div>
  </div>
);

export default AdminDashboard;