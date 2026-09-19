import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { initDb, query, getOne, run } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'shree-lata-super-secret-key-2026';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'img-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Initialize DB
initDb();

// JWT Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// ==================== AUTH ROUTES ====================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await getOne(`SELECT * FROM users WHERE email = ?`, [email]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// ==================== FILE UPLOAD ROUTE ====================
app.post('/api/upload', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    const urls = req.files.map(file => `http://localhost:${PORT}/uploads/${file.filename}`);
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== STATS ROUTE ====================
app.get('/api/stats', async (req, res) => {
  try {
    const productsCount = await getOne(`SELECT COUNT(*) as count FROM products`);
    const categoriesCount = await getOne(`SELECT COUNT(*) as count FROM categories`);
    const featuredCount = await getOne(`SELECT COUNT(*) as count FROM products WHERE featured = 1`);
    const newArrivalsCount = await getOne(`SELECT COUNT(*) as count FROM products WHERE new_arrival = 1`);
    const bestSellersCount = await getOne(`SELECT COUNT(*) as count FROM products WHERE best_seller = 1`);
    const slidesCount = await getOne(`SELECT COUNT(*) as count FROM hero_slides`);

    res.json({
      totalProducts: productsCount.count,
      totalCategories: categoriesCount.count,
      featuredProducts: featuredCount.count,
      newArrivals: newArrivalsCount.count,
      bestSellers: bestSellersCount.count,
      heroSlides: slidesCount.count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== CATEGORY ROUTES ====================
app.get('/api/categories', async (req, res) => {
  try {
    const rows = await query(`SELECT * FROM categories ORDER BY display_order ASC`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/categories', authenticateToken, async (req, res) => {
  try {
    const { id, name, slug, description, icon, image_url, display_order } = req.body;
    const catId = id || 'cat-' + Date.now();
    const catSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await run(
      `INSERT INTO categories (id, name, slug, description, icon, image_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [catId, name, catSlug, description || '', icon || 'ShoppingBag', image_url || '', display_order || 0]
    );

    const newCat = await getOne(`SELECT * FROM categories WHERE id = ?`, [catId]);
    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/categories/:id', authenticateToken, async (req, res) => {
  try {
    const { name, slug, description, icon, image_url, display_order } = req.body;
    await run(
      `UPDATE categories SET name = ?, slug = ?, description = ?, icon = ?, image_url = ?, display_order = ? WHERE id = ?`,
      [name, slug, description, icon, image_url, display_order, req.params.id]
    );
    const updated = await getOne(`SELECT * FROM categories WHERE id = ?`, [req.params.id]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/categories/:id', authenticateToken, async (req, res) => {
  try {
    await run(`DELETE FROM categories WHERE id = ?`, [req.params.id]);
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== PRODUCT ROUTES ====================
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, featured, best_seller, new_arrival } = req.query;
    let sql = `SELECT * FROM products WHERE 1=1`;
    const params = [];

    if (category && category !== 'All') {
      sql += ` AND (category = ? OR category IN (SELECT name FROM categories WHERE id = ? OR slug = ?))`;
      params.push(category, category, category);
    }

    if (search) {
      sql += ` AND (name LIKE ? OR sku LIKE ? OR description LIKE ? OR category LIKE ?)`;
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    if (featured === 'true' || featured === '1') {
      sql += ` AND featured = 1`;
    }
    if (best_seller === 'true' || best_seller === '1') {
      sql += ` AND best_seller = 1`;
    }
    if (new_arrival === 'true' || new_arrival === '1') {
      sql += ` AND new_arrival = 1`;
    }

    sql += ` ORDER BY created_at DESC`;
    const rows = await query(sql, params);

    // Parse JSON strings back to JS objects
    const products = rows.map(r => ({
      ...r,
      images: typeof r.images === 'string' ? JSON.parse(r.images || '[]') : r.images,
      variants: typeof r.variants === 'string' ? JSON.parse(r.variants || '[]') : r.variants,
      specifications: typeof r.specifications === 'string' ? JSON.parse(r.specifications || '[]') : r.specifications,
      featured: Boolean(r.featured),
      new_arrival: Boolean(r.new_arrival),
      best_seller: Boolean(r.best_seller)
    }));

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const row = await getOne(`SELECT * FROM products WHERE id = ?`, [req.params.id]);
    if (!row) return res.status(404).json({ error: 'Product not found' });

    const product = {
      ...row,
      images: typeof row.images === 'string' ? JSON.parse(row.images || '[]') : row.images,
      variants: typeof row.variants === 'string' ? JSON.parse(row.variants || '[]') : row.variants,
      specifications: typeof row.specifications === 'string' ? JSON.parse(row.specifications || '[]') : row.specifications,
      featured: Boolean(row.featured),
      new_arrival: Boolean(row.new_arrival),
      best_seller: Boolean(row.best_seller)
    };
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', authenticateToken, async (req, res) => {
  try {
    const {
      name, sku, category, subcategory, description,
      images, variants, specifications, availability,
      featured, new_arrival, best_seller
    } = req.body;

    const prodId = 'prod-' + Date.now();
    const imagesJson = JSON.stringify(images || []);
    const variantsJson = JSON.stringify(variants || []);
    const specsJson = JSON.stringify(specifications || []);

    await run(
      `INSERT INTO products (id, name, sku, category, subcategory, description, images, variants, specifications, availability, featured, new_arrival, best_seller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        prodId, name, sku || `SL-SKU-${Date.now()}`, category, subcategory || '',
        description || '', imagesJson, variantsJson, specsJson,
        availability || 'In Stock', featured ? 1 : 0, new_arrival ? 1 : 0, best_seller ? 1 : 0
      ]
    );

    const newProd = await getOne(`SELECT * FROM products WHERE id = ?`, [prodId]);
    res.status(201).json({
      ...newProd,
      images: JSON.parse(newProd.images),
      variants: JSON.parse(newProd.variants),
      specifications: JSON.parse(newProd.specifications)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const {
      name, sku, category, subcategory, description,
      images, variants, specifications, availability,
      featured, new_arrival, best_seller
    } = req.body;

    const imagesJson = JSON.stringify(images || []);
    const variantsJson = JSON.stringify(variants || []);
    const specsJson = JSON.stringify(specifications || []);

    await run(
      `UPDATE products SET name = ?, sku = ?, category = ?, subcategory = ?, description = ?, images = ?, variants = ?, specifications = ?, availability = ?, featured = ?, new_arrival = ?, best_seller = ? WHERE id = ?`,
      [
        name, sku, category, subcategory, description,
        imagesJson, variantsJson, specsJson, availability,
        featured ? 1 : 0, new_arrival ? 1 : 0, best_seller ? 1 : 0,
        req.params.id
      ]
    );

    const updated = await getOne(`SELECT * FROM products WHERE id = ?`, [req.params.id]);
    res.json({
      ...updated,
      images: JSON.parse(updated.images),
      variants: JSON.parse(updated.variants),
      specifications: JSON.parse(updated.specifications)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    await run(`DELETE FROM products WHERE id = ?`, [req.params.id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== HERO SLIDER ROUTES ====================
app.get('/api/slides', async (req, res) => {
  try {
    const rows = await query(`SELECT * FROM hero_slides WHERE active = 1 ORDER BY display_order ASC`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/slides', authenticateToken, async (req, res) => {
  try {
    const { badge, title, blue_highlight, description, image_url, cta_text, category, display_order, active } = req.body;
    const result = await run(
      `INSERT INTO hero_slides (badge, title, blue_highlight, description, image_url, cta_text, category, display_order, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [badge || 'ONE STORE. MANY CATEGORIES.', title, blue_highlight || '', description || '', image_url || '', cta_text || 'Explore Products', category || 'All', display_order || 0, active ? 1 : 0]
    );

    const newSlide = await getOne(`SELECT * FROM hero_slides WHERE id = ?`, [result.id]);
    res.status(201).json(newSlide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/slides/:id', authenticateToken, async (req, res) => {
  try {
    const { badge, title, blue_highlight, description, image_url, cta_text, category, display_order, active } = req.body;
    await run(
      `UPDATE hero_slides SET badge = ?, title = ?, blue_highlight = ?, description = ?, image_url = ?, cta_text = ?, category = ?, display_order = ?, active = ? WHERE id = ?`,
      [badge, title, blue_highlight, description, image_url, cta_text, category, display_order, active ? 1 : 0, req.params.id]
    );

    const updated = await getOne(`SELECT * FROM hero_slides WHERE id = ?`, [req.params.id]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/slides/:id', authenticateToken, async (req, res) => {
  try {
    await run(`DELETE FROM hero_slides WHERE id = ?`, [req.params.id]);
    res.json({ message: 'Slide deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Shree Lata Express Server running on http://localhost:${PORT}`);
});
