import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'catalogue.db');
const db = new sqlite3.Database(dbPath);

// Promisified database helpers
export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export function initDb() {
  db.serialize(async () => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Categories table
    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        image_url TEXT,
        display_order INTEGER DEFAULT 0
      )
    `);

    // Sync sports category name and product categories if needed
    db.run(`UPDATE categories SET name = 'Sports & Fitness Equipment' WHERE id = 'sports' OR name = 'Sports & Fitness'`);
    db.run(`UPDATE products SET category = 'Sports & Fitness Equipment' WHERE category LIKE '%Sport%'`);

    // Products table
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        sku TEXT,
        category TEXT NOT NULL,
        subcategory TEXT,
        description TEXT,
        images TEXT,
        variants TEXT,
        specifications TEXT,
        availability TEXT DEFAULT 'In Stock',
        featured INTEGER DEFAULT 0,
        new_arrival INTEGER DEFAULT 0,
        best_seller INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Hero Slides table
    db.run(`
      CREATE TABLE IF NOT EXISTS hero_slides (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        badge TEXT,
        title TEXT NOT NULL,
        blue_highlight TEXT,
        description TEXT,
        image_url TEXT,
        cta_text TEXT DEFAULT 'Explore Products',
        category TEXT,
        display_order INTEGER DEFAULT 0,
        active INTEGER DEFAULT 1
      )
    `);

    // Seed Admin User
    const adminCount = await getOne(`SELECT COUNT(*) as count FROM users`);
    if (!adminCount || adminCount.count === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await run(`INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)`, [
        'admin@shreelata.com',
        hash,
        'admin'
      ]);
      console.log('Seeded default admin account: admin@shreelata.com / admin123');
    }

    // Seed Categories
    const catCount = await getOne(`SELECT COUNT(*) as count FROM categories`);
    if (!catCount || catCount.count === 0) {
      const initialCategories = [
        {
          id: "mobiles",
          name: "Mobiles & Smartphones",
          slug: "mobiles-smartphones",
          description: "Latest 5G smartphones from Apple, Samsung, Vivo, Oppo, OnePlus & Xiaomi.",
          icon: "Smartphone",
          image_url: "http://localhost:5000/uploads/cat_mobiles.jpg",
          display_order: 1
        },
        {
          id: "accessories",
          name: "Mobile Accessories",
          slug: "mobile-accessories",
          description: "Chargers, wireless earbuds, leather cases, power banks & braided cables.",
          icon: "Headphones",
          image_url: "http://localhost:5000/uploads/cat_accessories.jpg",
          display_order: 2
        },
        {
          id: "repairing",
          name: "Mobile Repairing & Services",
          slug: "mobile-repairing-services",
          description: "Urgent screen replacement, battery change, and mainboard diagnostics.",
          icon: "Wrench",
          image_url: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&w=800&q=80",
          display_order: 3
        },
        {
          id: "handbags",
          name: "Handbags, Purses & Accessories",
          slug: "handbags-purses-accessories",
          description: "Women fancy party sling bags, bridal clutches, tote bags, wallets & UV sunglasses.",
          icon: "ShoppingBag",
          image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
          display_order: 4
        },
        {
          id: "cosmetics",
          name: "Cosmetics & Personal Care",
          slug: "cosmetics-personal-care",
          description: "Skincare serums, lipsticks, makeup palettes, and men grooming kits.",
          icon: "Heart",
          image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
          display_order: 5
        },
        {
          id: "stationery",
          name: "Stationery & Office Supplies",
          slug: "stationery-office-supplies",
          description: "Hardcover journals, brush marker pens, desk organizers & metallic pens.",
          icon: "BookOpen",
          image_url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
          display_order: 6
        },
        {
          id: "sports",
          name: "Sports & Fitness Equipment",
          slug: "sports-fitness-equipment",
          description: "Badminton racket sets, leather soccer balls, vacuum bottles & yoga mats.",
          icon: "Trophy",
          image_url: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
          display_order: 7
        },
        {
          id: "toys",
          name: "Toys & Games",
          slug: "toys-games",
          description: "Plush teddy bears, RC stunt cars, STEM building blocks & board games.",
          icon: "Gamepad2",
          image_url: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80",
          display_order: 8
        },
        {
          id: "gifts",
          name: "Gifts & Novelties",
          slug: "gifts-novelties",
          description: "Luxury wooden hampers, LED crystal lamps, desk frames & scented candles.",
          icon: "Gift",
          image_url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
          display_order: 9
        }
      ];

      for (const cat of initialCategories) {
        await run(
          `INSERT INTO categories (id, name, slug, description, icon, image_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [cat.id, cat.name, cat.slug, cat.description, cat.icon, cat.image_url, cat.display_order]
        );
      }
      console.log('Seeded initial categories');
    }

    // Seed Initial Products
    const prodCount = await getOne(`SELECT COUNT(*) as count FROM products`);
    if (!prodCount || prodCount.count === 0) {
      const initialProducts = [
        {
          id: "prod-1",
          name: "iPhone Series",
          sku: "SL-MOB-001",
          category: "Mobiles & Smartphones",
          subcategory: "Smartphones",
          description: "Latest iPhone models with advanced camera systems, Super Retina XDR display, and lightning-fast Bionic chip.",
          images: JSON.stringify([
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
          ]),
          variants: JSON.stringify([
            { size: "128GB", color: "Natural Titanium", material: "Titanium & Glass" },
            { size: "256GB", color: "Black Titanium", material: "Titanium & Glass" }
          ]),
          specifications: JSON.stringify([
            { label: "Display", value: "6.1-inch Super Retina XDR" },
            { label: "Camera", value: "48MP Main | Ultra Wide" },
            { label: "Chip", value: "A17 Pro Chip" }
          ]),
          availability: "In Stock",
          featured: 1,
          new_arrival: 1,
          best_seller: 0
        },
        {
          id: "prod-2",
          name: "Wireless Earbuds",
          sku: "SL-ACC-002",
          category: "Mobile Accessories",
          subcategory: "Audio",
          description: "High quality sound, active noise cancellation, & long battery life with compact charging case.",
          images: JSON.stringify([
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
          ]),
          variants: JSON.stringify([
            { color: "Pure White", material: "Glossy ABS Polycarbonate" }
          ]),
          specifications: JSON.stringify([
            { label: "Playtime", value: "Up to 30 Hours with Case" },
            { label: "Connectivity", value: "Bluetooth 5.3 Auto-Pairing" }
          ]),
          availability: "In Stock",
          featured: 1,
          new_arrival: 0,
          best_seller: 1
        },
        {
          id: "prod-3",
          name: "Backpack",
          sku: "SL-FASH-003",
          category: "Imitation Jewellery & Fashion Accessories",
          subcategory: "Bags",
          description: "Stylish, spacious & durable multi-compartment daily travel backpack with water-resistant fabric.",
          images: JSON.stringify([
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
          ]),
          variants: JSON.stringify([
            { color: "Matte Black", capacity: "28 Liters" }
          ]),
          specifications: JSON.stringify([
            { label: "Material", value: "Waterproof Polyester" },
            { label: "Laptop Sleeve", value: "Fits up to 15.6 inch" }
          ]),
          availability: "In Stock",
          featured: 1,
          new_arrival: 1,
          best_seller: 0
        },
        {
          id: "prod-4",
          name: "Stationery Set",
          sku: "SL-STAT-004",
          category: "Stationery & Art",
          subcategory: "Art & Supplies",
          description: "Everything for your creativity: premium notebooks, dual brush markers, sticky notes & aesthetic pens.",
          images: JSON.stringify([
            "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80"
          ]),
          variants: JSON.stringify([
            { set: "Deluxe Pastel Edition" }
          ]),
          specifications: JSON.stringify([
            { label: "Contains", value: "3 Notebooks, 12 Brush Pens, Accessories" }
          ]),
          availability: "In Stock",
          featured: 1,
          new_arrival: 0,
          best_seller: 0
        },
        {
          id: "prod-5",
          name: "Soft Toy",
          sku: "SL-TOY-005",
          category: "Toys & Games",
          subcategory: "Plush Toys",
          description: "Soft, cute & perfect for gifting. Ultra-huggable plush teddy bear made with hypoallergenic plush fabric.",
          images: JSON.stringify([
            "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80"
          ]),
          variants: JSON.stringify([
            { color: "Honey Brown", size: "35 cm" }
          ]),
          specifications: JSON.stringify([
            { label: "Filling", value: "100% Recycled Cotton" }
          ]),
          availability: "In Stock",
          featured: 1,
          new_arrival: 0,
          best_seller: 1
        },
        {
          id: "prod-6",
          name: "Badminton Set",
          sku: "SL-SPRT-006",
          category: "Sports & Fitness",
          subcategory: "Racquet Sports",
          description: "Play better, stay fit. Lightweight alloy badminton rackets with nylon shuttles and carrying case.",
          images: JSON.stringify([
            "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80"
          ]),
          variants: JSON.stringify([
            { color: "Cyan / Blue Dual Pack" }
          ]),
          specifications: JSON.stringify([
            { label: "Frame", value: "Aluminum Alloy Shaft" }
          ]),
          availability: "In Stock",
          featured: 1,
          new_arrival: 0,
          best_seller: 0
        }
      ];

      for (const p of initialProducts) {
        await run(
          `INSERT INTO products (id, name, sku, category, subcategory, description, images, variants, specifications, availability, featured, new_arrival, best_seller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [p.id, p.name, p.sku, p.category, p.subcategory, p.description, p.images, p.variants, p.specifications, p.availability, p.featured, p.new_arrival, p.best_seller]
        );
      }
      console.log('Seeded initial products');
    }

    // Seed Hero Slides
    const slideCount = await getOne(`SELECT COUNT(*) as count FROM hero_slides`);
    if (!slideCount || slideCount.count === 0) {
      const initialSlides = [
        {
          badge: "ONE STORE. MANY CATEGORIES.",
          title: "Discover More.",
          blue_highlight: "Find What You Need.",
          description: "Explore mobiles, accessories, stationery, toys, sports products, gifts and more — all in one place.",
          image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
          cta_text: "Explore Products",
          category: "All",
          display_order: 1,
          active: 1
        },
        {
          badge: "SMART & CONNECTED",
          title: "Mobiles & Accessories.",
          blue_highlight: "Stay Connected Daily.",
          description: "Discover top-rated smartphones, fast chargers, wireless earbuds, and protective covers.",
          image_url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80",
          cta_text: "View Mobiles",
          category: "mobiles",
          display_order: 2,
          active: 1
        },
        {
          badge: "FUN & CREATIVITY",
          title: "Toys, Games & Art.",
          blue_highlight: "Spark Joy Everyday.",
          description: "Explore educational STEM toys, cute plush items, art kits, and stationery supplies.",
          image_url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80",
          cta_text: "Shop Toys & Art",
          category: "toys",
          display_order: 3,
          active: 1
        }
      ];

      for (const s of initialSlides) {
        await run(
          `INSERT INTO hero_slides (badge, title, blue_highlight, description, image_url, cta_text, category, display_order, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [s.badge, s.title, s.blue_highlight, s.description, s.image_url, s.cta_text, s.category, s.display_order, s.active]
        );
      }
      console.log('Seeded initial hero slides');
    }
  });
}
