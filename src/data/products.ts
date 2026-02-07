import chair1 from '@/assets/products/chair-1.jpg';
import chair2 from '@/assets/products/chair-2.jpg';
import chair3 from '@/assets/products/chair-3.jpg';
import sofa1 from '@/assets/products/sofa-1.jpg';
import sofa2 from '@/assets/products/sofa-2.jpg';
import sofa3 from '@/assets/products/sofa-3.jpg';
import lamp1 from '@/assets/products/lamp-1.jpg';
import lamp2 from '@/assets/products/lamp-2.jpg';
import table1 from '@/assets/products/table-1.jpg';
import table2 from '@/assets/products/table-2.jpg';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  material: string;
  dimensions: string;
}

export const products: Product[] = [
  {
    id: 'chair-1',
    name: 'Bellini Armchair',
    category: 'chairs',
    price: 4850,
    image: chair1,
    description: 'A masterpiece of Italian craftsmanship, the Bellini Armchair features premium cognac leather with hand-stitched detailing.',
    material: 'Full-grain Italian leather, solid walnut frame',
    dimensions: 'W: 85cm × D: 90cm × H: 80cm'
  },
  {
    id: 'chair-2',
    name: 'Emerald Velvet Chair',
    category: 'chairs',
    price: 3200,
    image: chair2,
    description: 'Luxurious emerald velvet upholstery meets contemporary design with elegant brass legs.',
    material: 'Premium velvet, brushed brass legs',
    dimensions: 'W: 70cm × D: 75cm × H: 82cm'
  },
  {
    id: 'chair-3',
    name: 'Nordic Lounge Chair',
    category: 'chairs',
    price: 5600,
    image: chair3,
    description: 'Scandinavian elegance with sculptural teak frame and cream bouclé upholstery.',
    material: 'Bouclé fabric, solid teak wood frame',
    dimensions: 'W: 72cm × D: 85cm × H: 95cm'
  },
  {
    id: 'sofa-1',
    name: 'Milano Sectional',
    category: 'sofas',
    price: 12500,
    image: sofa1,
    description: 'The epitome of luxury living, this cream leather sectional features plush cushioning and gold accent legs.',
    material: 'Italian Nappa leather, gold-finished steel frame',
    dimensions: 'W: 320cm × D: 180cm × H: 85cm'
  },
  {
    id: 'sofa-2',
    name: 'Noir Velvet Sofa',
    category: 'sofas',
    price: 8900,
    image: sofa2,
    description: 'Sophisticated charcoal velvet sofa with tufted backrest and contemporary silhouette.',
    material: 'Belgian velvet, solid oak base',
    dimensions: 'W: 240cm × D: 95cm × H: 80cm'
  },
  {
    id: 'sofa-3',
    name: 'Crescent Modular',
    category: 'sofas',
    price: 18500,
    image: sofa3,
    description: 'Statement curved modular sofa in soft grey velvet, perfect for grand living spaces.',
    material: 'Premium velvet, reinforced steel frame',
    dimensions: 'W: 400cm × D: 200cm × H: 78cm'
  },
  {
    id: 'lamp-1',
    name: 'Teardrop Pendant',
    category: 'lamps',
    price: 2400,
    image: lamp1,
    description: 'Sculptural pendant lamp with matte black exterior and warm gold interior finish.',
    material: 'Hand-spun aluminum, powder-coated finish',
    dimensions: 'Ø: 35cm × H: 50cm'
  },
  {
    id: 'lamp-2',
    name: 'Marble Essence Lamp',
    category: 'lamps',
    price: 1850,
    image: lamp2,
    description: 'Elegant table lamp with white marble base and sculptural fabric shade.',
    material: 'Carrara marble, brass accents, linen shade',
    dimensions: 'Ø: 30cm × H: 55cm'
  },
  {
    id: 'table-1',
    name: 'Calacatta Dining Table',
    category: 'tables',
    price: 9800,
    image: table1,
    description: 'Stunning marble dining table with natural veining and brushed gold cylindrical legs.',
    material: 'Calacatta marble, brushed gold steel',
    dimensions: 'Ø: 150cm × H: 75cm'
  },
  {
    id: 'table-2',
    name: 'Executive Console',
    category: 'tables',
    price: 4200,
    image: table2,
    description: 'Sleek console table with rich dark oak top and geometric brass frame.',
    material: 'Black oak veneer, brushed brass frame',
    dimensions: 'W: 160cm × D: 40cm × H: 85cm'
  }
];

export const categories = [
  { id: 'chairs', name: 'Chairs', description: 'Timeless seating crafted for distinction' },
  { id: 'sofas', name: 'Sofas', description: 'Luxurious comfort, designed to impress' },
  { id: 'lamps', name: 'Lamps', description: 'Illuminate with elegance and style' },
  { id: 'tables', name: 'Tables', description: 'Statement pieces for refined spaces' }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};
