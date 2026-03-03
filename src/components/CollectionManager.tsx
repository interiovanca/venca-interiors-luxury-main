import React, { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};

type Collection = {
  id: string;
  name: string;
  description: string;
  productIds: string[];
};

const CollectionManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('vanca_inventory') || '[]'));
    setCollections(JSON.parse(localStorage.getItem('vanca_collections') || '[]'));
  }, []);

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const saveCollection = () => {
    if (!name) return alert('Collection name required');

    const newCollection: Collection = {
      id: Date.now().toString(),
      name,
      description,
      productIds: selectedProducts
    };

    const updated = [...collections, newCollection];
    setCollections(updated);
    localStorage.setItem('vanca_collections', JSON.stringify(updated));

    setName('');
    setDescription('');
    setSelectedProducts([]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Create Collection</h2>

      <input
        className="w-full bg-black border border-white/10 rounded-xl p-3"
        placeholder="Collection Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <textarea
        className="w-full bg-black border border-white/10 rounded-xl p-3"
        placeholder="Collection Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div
            key={p.id}
            onClick={() => toggleProduct(p.id)}
            className={`cursor-pointer border rounded-xl p-3 transition
              ${selectedProducts.includes(p.id)
                ? 'border-amber-500 bg-amber-500/10'
                : 'border-white/10'}`}
          >
            <img src={p.image} className="h-24 w-full object-cover rounded-lg" />
            <p className="mt-2 text-sm font-semibold">{p.name}</p>
            <p className="text-xs text-gray-400">{p.price}</p>
          </div>
        ))}
      </div>

      <button
        onClick={saveCollection}
        className="px-6 py-3 bg-amber-500 text-black font-bold rounded-xl"
      >
        Save Collection
      </button>
    </div>
  );
};

export default CollectionManager;