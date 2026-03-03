import React, { useState } from 'react';
import { Upload, X, Check } from 'lucide-react';
import { toast } from 'sonner';

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  images: string[];
  createdAt: number;
};

const ProductForm = ({ onProductAdded }: { onProductAdded?: () => void }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Sofa',
    description: '',
  });

  /* IMAGE UPLOAD */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);

    // Generate previews 
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]); // Free memory 
      return prev.filter((_, i) => i !== index);
    });
  };

  /* PUBLISH PRODUCT */
  const handlePublish = async () => {
    if (!formData.name || !formData.price || images.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Simulate API Network Request delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // 2. Mock image URLs to avoid LocalStorage limits 
      // In production, you would upload files to an S3/Cloudinary and get URLs back
      const mockImageUrls = images.map((_, i) =>
        `https://images.unsplash.com/photo-1540574163026-643ea20d25b5?ixlib=rb-4.0.3&w=500&q=80&auto=format&fit=crop`
      );

      const newProduct: Product = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        images: mockImageUrls,
        createdAt: Date.now(),
      };

      // 3. Save to simulated database (localStorage)
      const existing = JSON.parse(
        localStorage.getItem('vanca_inventory') || '[]'
      );

      localStorage.setItem(
        'vanca_inventory',
        JSON.stringify([newProduct, ...existing])
      );

      toast.success('Product published successfully');

      // 4. Reset Form
      setFormData({
        name: '',
        price: '',
        category: 'Sofa',
        description: '',
      });
      setImages([]);
      previews.forEach(p => URL.revokeObjectURL(p));
      setPreviews([]);

      onProductAdded?.();
    } catch (error) {
      toast.error('Error publishing product');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 bg-[#0b0b0b] p-6 rounded-2xl border border-white/10">
      {/* NAME */}
      <input
        type="text"
        placeholder="Product Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-4 rounded-lg bg-black border border-white/10"
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Product Description"
        value={formData.description}
        onChange={e =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full p-4 rounded-lg bg-black border border-white/10"
      />

      {/* PRICE + CATEGORY */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={e => setFormData({ ...formData, price: e.target.value })}
          className="p-4 rounded-lg bg-black border border-white/10"
        />

        <select
          value={formData.category}
          onChange={e =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="p-4 rounded-lg bg-black border border-white/10"
        >
          <option>Sofa</option>
          <option>Furniture</option>
          <option>Seating</option>
          <option>Tables</option>
          <option>Décor</option>
          <option>Lighting</option>
        </select>
      </div>

      {/* IMAGE UPLOAD */}
      <label className="flex items-center gap-3 cursor-pointer text-sm text-amber-400">
        <Upload size={16} />
        Upload Images
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {/* IMAGE PREVIEW */}
      {previews.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {previews.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img}
                alt="Upload preview"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full text-white"
                disabled={isSubmitting}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* PUBLISH */}
      <button
        onClick={handlePublish}
        disabled={isSubmitting}
        className={`px-6 py-4 rounded-xl flex items-center gap-2 transition-all font-medium
          ${isSubmitting ? 'bg-amber-500/50 text-black/50 cursor-not-allowed' : 'bg-amber-500 text-black hover:bg-amber-400'}`}
      >
        <Check size={16} />
        {isSubmitting ? 'Publishing...' : 'Publish Product'}
      </button>
    </div>
  );
};

export default ProductForm;