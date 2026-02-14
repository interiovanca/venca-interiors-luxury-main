import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Sofa, Settings, LogOut, 
  Brush, TrendingUp, Package, Menu, X, Plus, Edit3, Trash2
} from 'lucide-react';

const AdminDashboard = ({ setAuth }: { setAuth: (status: boolean) => void }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem('isAdminAuth');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col lg:flex-row font-sans">
      
      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0d0d0d] border-b border-white/5">
        <div className="flex items-center gap-2">
          <Brush className="text-amber-500 w-6 h-6" />
          <span className="font-bold text-white uppercase tracking-tighter">Vanca</span>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-white">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* DYNAMIC SIDEBAR (Responsive) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0d0d0d] border-r border-white/5 transform transition-transform duration-300
        lg:translate-x-0 lg:static lg:flex lg:flex-col p-6
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="hidden lg:flex items-center gap-3 mb-10 px-2">
          <Brush className="text-amber-500 w-6 h-6" />
          <span className="text-xl font-bold tracking-tighter text-white uppercase">Vanca <span className="text-amber-600">Interio</span></span>
        </div>

        <nav className="space-y-2 flex-1 mt-4 lg:mt-0">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => {setActiveTab('Dashboard'); setSidebarOpen(false);}} />
          <NavItem icon={<Sofa size={20} />} label="Inventory" active={activeTab === 'Inventory'} onClick={() => {setActiveTab('Inventory'); setSidebarOpen(false);}} />
          <NavItem icon={<Package size={20} />} label="Projects" active={activeTab === 'Projects'} onClick={() => {setActiveTab('Projects'); setSidebarOpen(false);}} />
          <NavItem icon={<Users size={20} />} label="Clients" active={activeTab === 'Clients'} onClick={() => {setActiveTab('Clients'); setSidebarOpen(false);}} />
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 p-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all font-bold mt-auto border border-white/5">
          <LogOut size={20} /> Logout Admin
        </button>
      </aside>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-10 w-full max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-white">{activeTab}</h1>
            <p className="text-white/40 text-sm">Managing Vanca Interio Luxury Furniture</p>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-white/5 p-2 pr-5 rounded-full border border-white/10">
             <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center text-[10px] font-bold">AM</div>
             <span className="text-xs font-bold uppercase tracking-widest opacity-60">Ankit Mishra</span>
          </div>
        </header>

        {/* RESPONSIVE GRID FOR STATS */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <StatCard title="Monthly Revenue" value="₹12.5L" growth="+18%" />
            <StatCard title="Active Inquiries" value="14" growth="+2" />
            <StatCard title="Total Stock" value="342" growth="Stable" />
          </div>
        )}

        {/* RESPONSIVE TABLE (Scrollable on small screens) */}
        {activeTab === 'Inventory' && (
          <div className="bg-[#0d0d0d] border border-white/10 rounded-[2rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-white/[0.02] text-[10px] uppercase tracking-widest text-white/30">
                  <tr>
                    <th className="p-6">Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <InventoryRow name="Royal Velvet Sofa" cat="Living Room" price="₹85k" />
                  <InventoryRow name="Oak Dining Table" cat="Dining" price="₹1.2L" />
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Sub-components
const NavItem = ({ icon, label, active, onClick }: any) => (
  <div onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-amber-600 text-white shadow-lg' : 'text-white/30 hover:bg-white/5'}`}>
    {icon} <span className="font-bold text-sm">{label}</span>
  </div>
);

const StatCard = ({ title, value, growth }: any) => (
  <div className="bg-[#0d0d0d] border border-white/10 p-6 rounded-[2rem]">
    <p className="text-white/40 text-[10px] uppercase font-black tracking-widest">{title}</p>
    <div className="flex items-baseline gap-3 mt-2">
      <h4 className="text-2xl font-black text-white">{value}</h4>
      <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">{growth}</span>
    </div>
  </div>
);

const InventoryRow = ({ name, cat, price }: any) => (
  <tr className="hover:bg-white/[0.01]">
    <td className="p-6 font-bold">{name}</td>
    <td className="text-white/40 text-sm">{cat}</td>
    <td className="text-amber-500 font-bold">{price}</td>
    <td className="p-6">
      <div className="flex gap-4">
        <Edit3 size={16} className="text-white/20 hover:text-white cursor-pointer" />
        <Trash2 size={16} className="text-red-900 hover:text-red-500 cursor-pointer" />
      </div>
    </td>
  </tr>
);

export default AdminDashboard;