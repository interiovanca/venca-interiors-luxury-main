import React, { useState } from 'react';
import { Upload, X, Check } from 'lucide-react';
import { toast } from 'sonner';

const ProductForm = () => {
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Sofa',
    description: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const saveProduct = () => {
    if (!formData.name || images.length === 0) {
      toast.error("Please fill Name and add at least one Image");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      ...formData,
      image: images[0], // Pehli image ko main image banayenge
    };

    const existing = JSON.parse(localStorage.getItem('vanca_inventory') || '[]');
    localStorage.setItem('vanca_inventory', JSON.stringify([...existing, newProduct]));
    
    toast.success("Product Published Successfully!");
    // Reset Form
    setFormData({ name: '', price: '', category: 'Sofa', description: '' });
    setImages([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl">
          <h3 className="text-lg font-bold mb-6">Product Details</h3>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Product Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-amber-600 transition-all"
            />
            <textarea 
              placeholder="Description (Premium details...)" 
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-amber-600 transition-all"
            />
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl">
          <h3 className="text-lg font-bold mb-6">Media Gallery</h3>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                <img src={img} className="w-full h-full object-cover" />
                <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 bg-red-500 p-1 rounded-md"><X size={12}/></button>
              </div>
            ))}
            <label className="aspect-square border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-600 transition-all">
              <Upload size={24} className="text-gray-500" />
              <span className="text-[10px] mt-2 uppercase font-bold text-gray-500">Add Photo</span>
              <input type="file" hidden multiple onChange={handleImageUpload} />
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl">
          <h3 className="text-lg font-bold mb-4">Pricing & Tag</h3>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Price (₹)" 
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none"
            />
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-xl p-4 outline-none"
            >
              <option>Sofa</option>
              <option>Tables</option>
              <option>Seating</option>
              <option>Décor</option>
            </select>
          </div>
        </div>
        <button 
          onClick={saveProduct}
          className="w-full py-4 bg-amber-600 text-white font-bold rounded-2xl shadow-xl shadow-amber-600/20 hover:bg-amber-700 transition-all flex items-center justify-center gap-2"
        >
          <Check size={20} /> Publish Product
        </button>
      </div>
    </div>
  );
};

export default ProductForm;