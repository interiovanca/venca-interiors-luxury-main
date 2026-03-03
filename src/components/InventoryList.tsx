import { useEffect, useState } from "react";

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
    const data = JSON.parse(
      localStorage.getItem("vanca_inventory") || "[]"
    );
    setProducts(data);
  }, []);

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
          {product.image && (
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-cover rounded-xl mb-3"
            />
          )}

          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-400">{product.category}</p>

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