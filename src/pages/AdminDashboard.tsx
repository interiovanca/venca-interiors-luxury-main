import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Sofa,
  Package,
  LogOut,
  Brush,
  Menu,
  X,
  Edit3,
  Trash2,
  Plus,
  Upload,
  IndianRupee
} from 'lucide-react';

const AdminDashboard = ({ setAuth }: { setAuth: (status: boolean) => void }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // --- REAL-TIME LOGIC STATES ---
  const [products, setProducts] = useState([
    { id: 1, name: 'Royal Velvet Sofa', category: 'Sofa', price: 85000, description: 'Luxury velvet finish', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
  ]);
  const [sales, setSales] = useState([]); // Empty by default
  const [isModalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Sofa', price: '', description: '', image: '' });

  // --- CALCULATIONS ---
  const totalRevenue = sales.reduce((acc: number, sale: any) => acc + sale.amount, 0);
  const monthlySalesCount = sales.length;

  // Handle Add Product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productToAdd = { ...newProduct, id: Date.now(), price: Number(newProduct.price) };
    setProducts([...products, productToAdd]);
    setModalOpen(false);
    setNewProduct({ name: '', category: 'Sofa', price: '', description: '', image: '' });
  };

  // Handle Delete
  const handleDelete = (id: number) => {
    if(window.confirm("Are you sure you want to remove this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem('isAdminAuth');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col lg:flex-row font-sans">
      
      {/* SIDEBAR (Same as before but with better active states) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0d0d0d] border-r border-white/5 transition-transform duration-300 lg:translate-x-0 lg:static lg:flex lg:flex-col p-6 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 mb-10">
          <Brush className="text-amber-500 w-6 h-6" />
          <span className="text-xl font-bold uppercase tracking-tighter">Vanca <span className="text-amber-600">Interio</span></span>
        </div>
        <nav className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
          <NavItem icon={<Sofa size={20}/>} label="Inventory" active={activeTab === 'Inventory'} onClick={() => setActiveTab('Inventory')} />
          <NavItem icon={<Package size={20}/>} label="Projects" active={activeTab === 'Projects'} onClick={() => setActiveTab('Projects')} />
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 p-4 rounded-2xl text-red-400 hover:bg-red-400/10 font-bold border border-white/5 mt-auto">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-white italic tracking-tight">{activeTab}</h1>
            <p className="text-white/40 text-sm">Luxury Furniture Control Center</p>
          </div>
          {activeTab === 'Inventory' && (
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold transition-all shadow-lg shadow-amber-600/20"
            >
              <Plus size={18} /> Add Product
            </button>
          )}
        </header>

        {/* DASHBOARD TAB - REAL LOGIC */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Monthly Revenue" 
                value={totalRevenue > 0 ? `₹${(totalRevenue / 100000).toFixed(2)}L` : "₹0.00"} 
                tag={totalRevenue > 0 ? "Live Sales" : "No sales yet"} 
                isEmpty={totalRevenue === 0}
              />
              <StatCard title="Total Products" value={products.length} tag="In Catalog" />
              <StatCard title="Orders" value={monthlySalesCount} tag="This Month" isEmpty={monthlySalesCount === 0} />
            </div>

            {/* REAL-TIME SALES CHART PLACEHOLDER */}
            <div className="bg-[#0d0d0d] border border-white/5 rounded-[2.5rem] p-8 h-64 flex flex-col items-center justify-center border-dashed">
                <IndianRupee className="text-white/10 w-12 h-12 mb-4" />
                <p className="text-white/30 font-medium">Sales data will appear here once orders are placed</p>
            </div>
          </div>
        )}

        {/* INVENTORY TAB - DYNAMIC LISTING */}
        {activeTab === 'Inventory' && (
          <div className="bg-[#0d0d0d] border border-white/10 rounded-[2rem] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white/40">
                <tr>
                  <th className="p-6">Product Details</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="text-right p-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product.id} className="group hover:bg-white/[0.02] transition">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                        <div>
                          <p className="font-bold text-white">{product.name}</p>
                          <p className="text-xs text-white/30 line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="text-xs bg-white/5 px-3 py-1 rounded-full">{product.category}</span></td>
                    <td className="text-amber-500 font-mono font-bold">₹{product.price.toLocaleString()}</td>
                    <td className="p-6">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition">
                        <button className="p-2 hover:bg-white/10 rounded-lg"><Edit3 size={16}/></button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* ADD PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d0d0d] border border-white/10 w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-black">New Product</h2>
              <button onClick={() => setModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Product Name" className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full focus:border-amber-600 outline-none" 
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                <select className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full outline-none"
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                  <option value="Sofa">Sofa</option>
                  <option value="Tables">Tables</option>
                  <option value="Lighting">Lighting</option>
                </select>
              </div>
              <input required type="number" placeholder="Price (₹)" className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full outline-none"
                onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
              <textarea required placeholder="Product Description (Material, Dimensions...)" className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full h-32 outline-none"
                onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
              <input required placeholder="Image URL (Unsplash or Firebase)" className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full outline-none"
                onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
              <button type="submit" className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-amber-600 hover:text-white transition-colors uppercase tracking-widest">
                List Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// HELPER COMPONENTS
const NavItem = ({ icon, label, active, onClick }: any) => (
  <div onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
    {icon} <span className="font-bold tracking-tight">{label}</span>
  </div>
);

const StatCard = ({ title, value, tag, isEmpty }: any) => (
  <div className={`bg-[#0d0d0d] border border-white/10 p-8 rounded-[2.5rem] transition-all hover:scale-[1.02] ${isEmpty ? 'opacity-60' : 'border-amber-600/20 shadow-xl shadow-amber-900/5'}`}>
    <p className="text-white/30 text-[10px] uppercase font-black tracking-[0.2em]">{title}</p>
    <h4 className="text-4xl font-black text-white mt-4 tracking-tighter">{value}</h4>
    <span className={`inline-block mt-4 text-[10px] font-bold px-3 py-1 rounded-full ${isEmpty ? 'bg-white/5 text-white/40' : 'bg-amber-400/10 text-amber-400'}`}>
      {tag}
    </span>
  </div>
);

export default AdminDashboard;