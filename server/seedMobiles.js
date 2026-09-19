import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'catalogue.db');
const db = new sqlite3.Database(dbPath);

const mobileProducts = [
  {
    id: 'prod-mob-1',
    name: 'iPhone 15 Pro Max',
    sku: 'SL-MOB-101',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Forged in titanium with A17 Pro chip, customizable Action button, 48MP Main camera, 5x optical Telephoto zoom, and USB-C speed support.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '256GB', color: 'Natural Titanium', material: 'Titanium & Glass' },
      { size: '512GB', color: 'Black Titanium', material: 'Titanium & Glass' }
    ]),
    specifications: JSON.stringify([
      { label: 'Display', value: '6.7-inch Super Retina XDR ProMotion 120Hz' },
      { label: 'Camera', value: '48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto' },
      { label: 'Chipset', value: 'Apple A17 Pro (3nm)' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 1,
    best_seller: 1
  },
  {
    id: 'prod-mob-2',
    name: 'iPhone 15',
    sku: 'SL-MOB-102',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Dynamic Island features, 48MP main camera with 2x Telephoto option, color-infused durable glass design, and A16 Bionic chip.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1695048065057-083f211516e4?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '128GB', color: 'Soft Blue', material: 'Aluminium & Glass' }
    ]),
    specifications: JSON.stringify([
      { label: 'Display', value: '6.1-inch Super Retina XDR' },
      { label: 'Camera', value: '48MP Main + 12MP Ultra Wide' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 1,
    best_seller: 0
  },
  {
    id: 'prod-mob-3',
    name: 'iPhone 14',
    sku: 'SL-MOB-103',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Super Retina XDR OLED display, advanced dual camera system with Photonic Engine, Crash Detection, and all-day battery life.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '128GB', color: 'Midnight Black' }
    ]),
    specifications: JSON.stringify([
      { label: 'Display', value: '6.1-inch Super Retina' }
    ]),
    availability: 'In Stock',
    featured: 0,
    new_arrival: 0,
    best_seller: 1
  },
  {
    id: 'prod-mob-4',
    name: 'iPhone 13',
    sku: 'SL-MOB-104',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Super-bright Super Retina XDR display, Cinematic mode in 1080p, A15 Bionic chip, and durable Ceramic Shield front cover.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '128GB', color: 'Starlight White' }
    ]),
    specifications: JSON.stringify([
      { label: 'Chip', value: 'A15 Bionic' }
    ]),
    availability: 'In Stock',
    featured: 0,
    new_arrival: 0,
    best_seller: 1
  },
  {
    id: 'prod-mob-5',
    name: 'Samsung Galaxy S24 Ultra 5G',
    sku: 'SL-MOB-105',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Galaxy AI integration, Snapdragon 8 Gen 3 for Galaxy, built-in S Pen, 200MP Quad Telephoto camera with 100x Space Zoom.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1707230973617-df50904d1685?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '256GB', color: 'Titanium Gray' }
    ]),
    specifications: JSON.stringify([
      { label: 'Display', value: '6.8-inch Dynamic AMOLED 2X 120Hz' },
      { label: 'Camera', value: '200MP + 50MP + 12MP + 10MP' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 1,
    best_seller: 1
  },
  {
    id: 'prod-mob-6',
    name: 'Samsung Galaxy S24+ 5G',
    sku: 'SL-MOB-106',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'QHD+ Dynamic AMOLED 2X display, Armor Aluminum frame, Galaxy AI live translate & Circle to Search features.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '256GB', color: 'Cobalt Violet' }
    ]),
    specifications: JSON.stringify([
      { label: 'Display', value: '6.7-inch QHD+ 120Hz' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 1,
    best_seller: 0
  },
  {
    id: 'prod-mob-7',
    name: 'Samsung Galaxy A55 5G',
    sku: 'SL-MOB-107',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Metal frame design, Corning Gorilla Glass Victus+, 50MP OIS camera, IP67 dust & water resistance.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '128GB', color: 'Awesome Iceblue' }
    ]),
    specifications: JSON.stringify([
      { label: 'Display', value: '6.6-inch Super AMOLED 120Hz' }
    ]),
    availability: 'In Stock',
    featured: 0,
    new_arrival: 1,
    best_seller: 1
  },
  {
    id: 'prod-mob-8',
    name: 'Samsung Galaxy M34 5G',
    sku: 'SL-MOB-108',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Massive 6000mAh monster battery, 120Hz Super AMOLED screen, 50MP No-Shake OIS triple camera.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '128GB', color: 'Prism Silver' }
    ]),
    specifications: JSON.stringify([
      { label: 'Battery', value: '6000 mAh' }
    ]),
    availability: 'In Stock',
    featured: 0,
    new_arrival: 0,
    best_seller: 1
  },
  {
    id: 'prod-mob-9',
    name: 'Vivo V30 Pro 5G',
    sku: 'SL-MOB-109',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Co-engineered with ZEISS, Smart Aura Light Portrait system, MediaTek Dimensity 8200 4nm processor.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '512GB', color: 'Andaman Blue' }
    ]),
    specifications: JSON.stringify([
      { label: 'Camera', value: '50MP ZEISS Sony IMX920' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 1,
    best_seller: 1
  },
  {
    id: 'prod-mob-10',
    name: 'Vivo V30 5G',
    sku: 'SL-MOB-110',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Studio-grade Aura Light portrait lens, ultra-slim 7.45mm 3D curved body, Snapdragon 7 Gen 3 processor.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '256GB', color: 'Peacock Green' }
    ]),
    specifications: JSON.stringify([
      { label: 'Display', value: '6.78-inch 1.5K 120Hz Curved AMOLED' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 1,
    best_seller: 0
  },
  {
    id: 'prod-mob-11',
    name: 'Vivo Y200 5G',
    sku: 'SL-MOB-111',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Smart Aura Light portrait system, 64MP OIS anti-shake main camera, 44W FlashCharge.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '128GB', color: 'Desert Gold' }
    ]),
    specifications: JSON.stringify([
      { label: 'Camera', value: '64MP OIS + 2MP Depth' }
    ]),
    availability: 'In Stock',
    featured: 0,
    new_arrival: 0,
    best_seller: 1
  },
  {
    id: 'prod-mob-12',
    name: 'Vivo T2 Pro 5G',
    sku: 'SL-MOB-112',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Segment thinnest 3D curved AMOLED screen, Dimensity 7200 processor, 64MP OIS Night camera.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '128GB', color: 'Dune Gold' }
    ]),
    specifications: JSON.stringify([
      { label: 'Processor', value: 'MediaTek Dimensity 7200' }
    ]),
    availability: 'In Stock',
    featured: 0,
    new_arrival: 1,
    best_seller: 0
  },
  {
    id: 'prod-mob-13',
    name: 'Oppo Reno 11 Pro 5G',
    sku: 'SL-MOB-113',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: '32MP Sony IMX709 Telephoto portrait lens, MediaTek Dimensity 8200, 80W SUPERVOOC charging.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '256GB', color: 'Pearl White' }
    ]),
    specifications: JSON.stringify([
      { label: 'Portrait Lens', value: '32MP Telephoto Portrait' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 1,
    best_seller: 1
  },
  {
    id: 'prod-mob-14',
    name: 'Oppo Reno 11 5G',
    sku: 'SL-MOB-114',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: '3D dual-curved display design, Ultra-Clear Portrait Camera system, 67W fast charger.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '128GB', color: 'Wave Green' }
    ]),
    specifications: JSON.stringify([
      { label: 'Display', value: '6.7-inch 120Hz Curved AMOLED' }
    ]),
    availability: 'In Stock',
    featured: 0,
    new_arrival: 1,
    best_seller: 0
  },
  {
    id: 'prod-mob-15',
    name: 'Oppo F25 Pro 5G',
    sku: 'SL-MOB-115',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: '4K clarity video recording on front & back cameras, IP65 dust & water resistance rating, 67W charge.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '128GB', color: 'Lava Red' }
    ]),
    specifications: JSON.stringify([
      { label: 'Video', value: '4K Video on Front & Rear' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 1,
    best_seller: 0
  },
  {
    id: 'prod-mob-16',
    name: 'OnePlus 12 5G',
    sku: 'SL-MOB-116',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System, 2K 120Hz ProXDR display, 100W SUPERVOOC.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '512GB', color: 'Flowy Emerald' }
    ]),
    specifications: JSON.stringify([
      { label: 'Camera', value: '50MP Sony LYT-808 + 64MP Periscope' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 1,
    best_seller: 1
  },
  {
    id: 'prod-mob-17',
    name: 'OnePlus 12R 5G',
    sku: 'SL-MOB-117',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Snapdragon 8 Gen 2 flagship performance, 5500mAh battery (largest ever in OnePlus), 4th Gen LTPO 120Hz display.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '256GB', color: 'Cool Blue' }
    ]),
    specifications: JSON.stringify([
      { label: 'Battery', value: '5500 mAh + 100W Charging' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 0,
    best_seller: 1
  },
  {
    id: 'prod-mob-18',
    name: 'OnePlus Nord CE 4 5G',
    sku: 'SL-MOB-118',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: 'Snapdragon 7 Gen 3, 100W SUPERVOOC charging, Sony LYT-600 50MP camera with OIS.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '128GB', color: 'Celadon Marble' }
    ]),
    specifications: JSON.stringify([
      { label: 'Camera', value: '50MP Sony LYT-600 OIS' }
    ]),
    availability: 'In Stock',
    featured: 0,
    new_arrival: 1,
    best_seller: 0
  },
  {
    id: 'prod-mob-19',
    name: 'Realme 12 Pro+ 5G',
    sku: 'SL-MOB-119',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: '64MP Periscope Portrait Camera with 120X SuperZoom, luxury watch design finish by Ollivier Savéo.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '256GB', color: 'Submarine Blue' }
    ]),
    specifications: JSON.stringify([
      { label: 'Telephoto', value: '64MP Periscope 3X Optical Zoom' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 1,
    best_seller: 0
  },
  {
    id: 'prod-mob-20',
    name: 'Xiaomi Redmi Note 13 Pro+ 5G',
    sku: 'SL-MOB-120',
    category: 'Mobiles & Smartphones',
    subcategory: 'Smartphones',
    description: '200MP OIS camera, 120W HyperCharge (100% in 19 mins), 1.5K Curved AMOLED, IP68 water protection.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
    ]),
    variants: JSON.stringify([
      { size: '256GB', color: 'Fusion Purple' }
    ]),
    specifications: JSON.stringify([
      { label: 'Camera', value: '200MP Samsung ISOCELL HP3 OIS' }
    ]),
    availability: 'In Stock',
    featured: 1,
    new_arrival: 1,
    best_seller: 1
  }
];

db.serialize(() => {
  db.run("DELETE FROM products WHERE category = 'Mobiles & Smartphones'", (err) => {
    if (err) console.error(err);
  });

  const prodStmt = db.prepare('INSERT INTO products (id, name, sku, category, subcategory, description, images, variants, specifications, availability, featured, new_arrival, best_seller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  mobileProducts.forEach(p => {
    prodStmt.run(p.id, p.name, p.sku, p.category, p.subcategory, p.description, p.images, p.variants, p.specifications, p.availability, p.featured, p.new_arrival, p.best_seller);
  });
  prodStmt.finalize();

  console.log('Successfully updated 20 distinct smartphone images!');
});
