import { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image?: string;
}

const InventoryList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const data = JSON.parse(
      localStorage.getItem("vanca_inventory") || "[]"
    );
    setProducts(data);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem("vanca_inventory", JSON.stringify(updated));
    }
  };

  const handleEdit = (product: Product) => {
    const newName = window.prompt("Edit product name:", product.title || (product as any).name);
    if (!newName) return;

    const newPriceStr = window.prompt("Edit product price:", product.price.toString());
    if (!newPriceStr) return;

    const newPrice = parseFloat(newPriceStr);

    const updated = products.map(p => {
      if (p.id === product.id) {
        return { ...p, title: newName, name: newName, price: isNaN(newPrice) ? p.price : newPrice };
      }
      return p;
    });

    setProducts(updated);
    localStorage.setItem("vanca_inventory", JSON.stringify(updated));
  };

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No products in inventory yet
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-white/10 rounded-2xl p-4 bg-white/5"
        >
          {(product.image || (product as any).images?.[0]) && (
            <img
              src={product.image || (product as any).images?.[0]}
              alt={product.title || (product as any).name}
              className="h-40 w-full object-cover rounded-xl mb-3"
            />
          )}

          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{product.title || (product as any).name}</h3>
              <p className="text-sm text-gray-400">{product.category}</p>
            </div>
            <div className="flex gap-2 text-white/50">
              <button onClick={() => handleEdit(product)} className="hover:text-amber-400 transition-colors">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(product.id)} className="hover:text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-300">
            {product.description}
          </p>

          <div className="mt-3 font-bold text-amber-400">
            ₹{product.price}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryList;