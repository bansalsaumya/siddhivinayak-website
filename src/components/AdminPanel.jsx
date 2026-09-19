import React, { useState, useEffect } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { api } from '../services/api';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Layers, 
  Package, 
  Settings, 
  Image as ImageIcon,
  Lock,
  LogOut,
  Check,
  Sparkles
} from 'lucide-react';

export const AdminPanel = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    products, 
    categories, 
    heroSlides,
    addProduct, 
    updateProduct, 
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide
  } = useCatalog();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'categories', 'slides'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('admin@shreelata.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [stats, setStats] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    sku: '',
    category: categories[0]?.name || 'Mobiles & Smartphones',
    subcategory: '',
    description: '',
    images: [],
    variants: [{ size: '', color: '', material: '', weight: '' }],
    specifications: [{ label: '', value: '' }],
    availability: 'In Stock',
    featured: false,
    new_arrival: false,
    best_seller: false
  });

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    image: '',
    display_order: 0
  });

  const [editingSlideId, setEditingSlideId] = useState(null);
  const [slideForm, setSlideForm] = useState({
    badge: 'ONE STORE. MANY CATEGORIES.',
    title: '',
    blue_highlight: '',
    description: '',
    image_url: '',
    cta_text: 'Explore Products',
    category: 'All',
    display_order: 0,
    active: true
  });

  useEffect(() => {
    const token = localStorage.getItem('shreelata_token');
    if (token) {
      setIsAuthenticated(true);
      fetchStats();
    }
  }, [isAdminOpen]);

  const fetchStats = async () => {
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (err) {
      console.log('Stats fetch error:', err);
    }
  };

  if (!isAdminOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await api.login(loginEmail, loginPassword);
      localStorage.setItem('shreelata_token', res.token);
      setIsAuthenticated(true);
      fetchStats();
    } catch (err) {
      setLoginError(err.message || 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('shreelata_token');
    setIsAuthenticated(false);
  };

  // Image Upload via API
  const handleProductImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setUploading(true);
      const res = await api.uploadImages(files);
      setProductForm(prev => ({
        ...prev,
        images: [...prev.images, ...res.urls]
      }));
    } catch (err) {
      alert('Failed to upload image to server');
    } finally {
      setUploading(false);
    }
  };

  const handleCategoryImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setUploading(true);
      const res = await api.uploadImages(files);
      if (res.urls && res.urls.length > 0) {
        setCategoryForm(prev => ({ ...prev, image: res.urls[0] }));
      }
    } catch (err) {
      alert('Failed to upload category image');
    } finally {
      setUploading(false);
    }
  };

  const handleSlideImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setUploading(true);
      const res = await api.uploadImages(files);
      if (res.urls && res.urls.length > 0) {
        setSlideForm(prev => ({ ...prev, image_url: res.urls[0] }));
      }
    } catch (err) {
      alert('Failed to upload slide image');
    } finally {
      setUploading(false);
    }
  };

  // Submit Product Form
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.category) {
      alert("Please fill in Product Name and Category!");
      return;
    }

    if (editingProductId) {
      await updateProduct(editingProductId, productForm);
    } else {
      await addProduct(productForm);
    }

    resetProductForm();
    fetchStats();
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      sku: '',
      category: categories[0]?.name || 'Mobiles & Smartphones',
      subcategory: '',
      description: '',
      images: [],
      variants: [{ size: '', color: '', material: '', weight: '' }],
      specifications: [{ label: '', value: '' }],
      availability: 'In Stock',
      featured: false,
      new_arrival: false,
      best_seller: false
    });
  };

  const startEditProduct = (prod) => {
    setEditingProductId(prod.id);
    const imgs = typeof prod.images === 'string' ? JSON.parse(prod.images) : (prod.images || []);
    const vars = typeof prod.variants === 'string' ? JSON.parse(prod.variants) : (prod.variants || []);
    const specs = typeof prod.specifications === 'string' ? JSON.parse(prod.specifications) : (prod.specifications || []);

    setProductForm({
      name: prod.name || '',
      sku: prod.sku || '',
      category: prod.category || categories[0]?.name || '',
      subcategory: prod.subcategory || '',
      description: prod.description || '',
      images: imgs,
      variants: vars.length > 0 ? vars : [{ size: '', color: '', material: '', weight: '' }],
      specifications: specs.length > 0 ? specs : [{ label: '', value: '' }],
      availability: prod.availability || 'In Stock',
      featured: Boolean(prod.featured),
      new_arrival: Boolean(prod.new_arrival),
      best_seller: Boolean(prod.best_seller)
    });
  };

  // Save Category Form
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!categoryForm.name) {
      alert("Category name is required");
      return;
    }

    if (editingCategoryId) {
      await updateCategory(editingCategoryId, categoryForm);
    } else {
      await addCategory(categoryForm);
    }

    setEditingCategoryId(null);
    setCategoryForm({ name: '', description: '', image: '', display_order: 0 });
    fetchStats();
  };

  // Save Hero Slide Form
  const handleSaveSlide = async (e) => {
    e.preventDefault();
    if (!slideForm.title) {
      alert("Slide title is required");
      return;
    }

    if (editingSlideId) {
      await updateHeroSlide(editingSlideId, slideForm);
    } else {
      await addHeroSlide(slideForm);
    }

    setEditingSlideId(null);
    setSlideForm({
      badge: 'ONE STORE. MANY CATEGORIES.',
      title: '',
      blue_highlight: '',
      description: '',
      image_url: '',
      cta_text: 'Explore Products',
      category: 'All',
      display_order: 0,
      active: true
    });
    fetchStats();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-xl overflow-hidden border border-[#E6EAF0] my-6">
        
        {/* Modal Header */}
        <div className="bg-[#2F5D8C] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-[#E8B84B]" />
            <h3 className="text-base font-extrabold uppercase tracking-wide">
              Shree Lata Admin Dashboard
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button 
                onClick={handleLogout}
                className="text-xs font-bold text-white/80 hover:text-white flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"
              >
                <LogOut size={13} />
                Logout
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[82vh] overflow-y-auto">

          {!isAuthenticated ? (
            /* Login Screen */
            <div className="max-w-md mx-auto py-10 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#DCEAF7] text-[#2F5D8C] flex items-center justify-center mx-auto">
                <Lock size={28} />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-[#1F2937]">Admin Authentication</h4>
                <p className="text-xs text-[#667085] mt-1">Sign in with your administrative credentials to manage catalogue</p>
              </div>

              {loginError && (
                <div className="bg-red-50 text-red-700 text-xs font-bold p-3 rounded-xl border border-red-200">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={loginEmail} 
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E6EAF0] text-sm font-medium focus:ring-2 focus:ring-[#2F5D8C]/20 outline-none" 
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-1">Password</label>
                  <input 
                    type="password" 
                    value={loginPassword} 
                    onChange={e => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E6EAF0] text-sm font-medium focus:ring-2 focus:ring-[#2F5D8C]/20 outline-none" 
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#2F5D8C] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#234970] transition"
                >
                  Log In to Dashboard
                </button>
              </form>
            </div>
          ) : (
            /* Dashboard View */
            <div className="space-y-6">

              {/* Stats Overview */}
              {stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#FAFBFC] p-4 rounded-2xl border border-[#E6EAF0]">
                    <span className="text-[10px] font-extrabold text-[#667085] uppercase tracking-wider">Total Products</span>
                    <p className="text-2xl font-black text-[#1F2937]">{stats.totalProducts}</p>
                  </div>
                  <div className="bg-[#FAFBFC] p-4 rounded-2xl border border-[#E6EAF0]">
                    <span className="text-[10px] font-extrabold text-[#667085] uppercase tracking-wider">Categories</span>
                    <p className="text-2xl font-black text-[#2F5D8C]">{stats.totalCategories}</p>
                  </div>
                  <div className="bg-[#FAFBFC] p-4 rounded-2xl border border-[#E6EAF0]">
                    <span className="text-[10px] font-extrabold text-[#667085] uppercase tracking-wider">Featured Items</span>
                    <p className="text-2xl font-black text-[#E8B84B]">{stats.featuredProducts}</p>
                  </div>
                  <div className="bg-[#FAFBFC] p-4 rounded-2xl border border-[#E6EAF0]">
                    <span className="text-[10px] font-extrabold text-[#667085] uppercase tracking-wider">Hero Slides</span>
                    <p className="text-2xl font-black text-emerald-600">{stats.heroSlides}</p>
                  </div>
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-[#E6EAF0] pb-3">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'products' 
                      ? 'bg-[#2F5D8C] text-white shadow-2xs' 
                      : 'bg-[#F3F6FA] text-gray-700 hover:bg-[#DCEAF7]'
                  }`}
                >
                  Product Manager ({products.length})
                </button>

                <button
                  onClick={() => setActiveTab('categories')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'categories' 
                      ? 'bg-[#2F5D8C] text-white shadow-2xs' 
                      : 'bg-[#F3F6FA] text-gray-700 hover:bg-[#DCEAF7]'
                  }`}
                >
                  Category Manager ({categories.length})
                </button>

                <button
                  onClick={() => setActiveTab('slides')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'slides' 
                      ? 'bg-[#2F5D8C] text-white shadow-2xs' 
                      : 'bg-[#F3F6FA] text-gray-700 hover:bg-[#DCEAF7]'
                  }`}
                >
                  Hero Slider ({heroSlides.length})
                </button>
              </div>

              {/* TAB 1: PRODUCT MANAGER */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  
                  {/* Form */}
                  <form onSubmit={handleSaveProduct} className="bg-[#FAFBFC] p-5 rounded-2xl border border-[#E6EAF0] space-y-4">
                    <h4 className="text-sm font-extrabold text-[#1F2937] flex items-center justify-between">
                      <span>{editingProductId ? 'Edit Product' : '+ Add New Product'}</span>
                      {editingProductId && (
                        <button type="button" onClick={resetProductForm} className="text-xs text-red-600 font-bold hover:underline">
                          Cancel Editing
                        </button>
                      )}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Product Name *</label>
                        <input 
                          type="text" 
                          value={productForm.name}
                          onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E6EAF0] text-xs font-medium focus:ring-1 focus:ring-[#2F5D8C] outline-none"
                          placeholder="e.g. Wireless Earbuds"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                        <select 
                          value={productForm.category}
                          onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E6EAF0] text-xs font-medium focus:ring-1 focus:ring-[#2F5D8C] outline-none"
                        >
                          {categories.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">SKU / Reference Code</label>
                        <input 
                          type="text" 
                          value={productForm.sku}
                          onChange={e => setProductForm({ ...productForm, sku: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E6EAF0] text-xs font-medium focus:ring-1 focus:ring-[#2F5D8C] outline-none"
                          placeholder="SL-SKU-1001"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                      <textarea 
                        value={productForm.description}
                        onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E6EAF0] text-xs font-medium focus:ring-1 focus:ring-[#2F5D8C] outline-none h-20"
                        placeholder="Detailed product specs and description..."
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Upload Product Images</label>
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#E6EAF0] text-xs font-bold text-[#2F5D8C] hover:bg-gray-50 shadow-2xs">
                          <Upload size={14} />
                          <span>{uploading ? 'Uploading...' : 'Choose Images'}</span>
                          <input type="file" multiple accept="image/*" onChange={handleProductImageUpload} className="hidden" />
                        </label>

                        {productForm.images.length > 0 && (
                          <div className="flex items-center gap-2 overflow-x-auto">
                            {productForm.images.map((img, i) => (
                              <div key={i} className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#E6EAF0]">
                                <img src={img} alt="Product" className="w-full h-full object-cover" />
                                <button 
                                  type="button" 
                                  onClick={() => setProductForm({ ...productForm, images: productForm.images.filter((_, idx) => idx !== i) })}
                                  className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 text-[9px] flex items-center justify-center"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Checkbox Toggles */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={productForm.featured} 
                          onChange={e => setProductForm({ ...productForm, featured: e.target.checked })} 
                          className="rounded text-[#2F5D8C]"
                        />
                        <span>Mark as Featured</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={productForm.new_arrival} 
                          onChange={e => setProductForm({ ...productForm, new_arrival: e.target.checked })} 
                          className="rounded text-[#2F5D8C]"
                        />
                        <span>Mark as New Arrival</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={productForm.best_seller} 
                          onChange={e => setProductForm({ ...productForm, best_seller: e.target.checked })} 
                          className="rounded text-[#2F5D8C]"
                        />
                        <span>Mark as Best Seller</span>
                      </label>
                    </div>

                    <button 
                      type="submit"
                      className="px-6 py-2.5 bg-[#2F5D8C] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#234970] transition"
                    >
                      {editingProductId ? 'Update Product' : 'Save Product'}
                    </button>
                  </form>

                  {/* Products List Table */}
                  <div className="bg-white rounded-2xl border border-[#E6EAF0] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F3F6FA] text-[11px] font-extrabold text-[#667085] uppercase tracking-wider border-b border-[#E6EAF0]">
                          <th className="p-3">Product</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Badges</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E6EAF0] text-xs">
                        {products.map(p => {
                          const imgs = typeof p.images === 'string' ? JSON.parse(p.images) : (p.images || []);
                          return (
                            <tr key={p.id} className="hover:bg-[#FAFBFC]">
                              <td className="p-3 flex items-center gap-3">
                                <img src={imgs[0] || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'} className="w-10 h-10 rounded-lg object-cover border border-[#E6EAF0]" />
                                <div>
                                  <span className="font-bold text-[#1F2937] block">{p.name}</span>
                                  <span className="text-[10px] text-gray-400">{p.sku}</span>
                                </div>
                              </td>
                              <td className="p-3 font-semibold text-[#2F5D8C]">{p.category}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-1">
                                  {p.featured ? <span className="bg-[#E8B84B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Featured</span> : null}
                                  {p.new_arrival ? <span className="bg-[#2F5D8C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">New</span> : null}
                                  {p.best_seller ? <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Best</span> : null}
                                </div>
                              </td>
                              <td className="p-3 text-right space-x-2">
                                <button onClick={() => startEditProduct(p)} className="p-1.5 bg-gray-100 hover:bg-[#DCEAF7] text-[#2F5D8C] rounded-lg">
                                  <Edit3 size={14} />
                                </button>
                                <button onClick={() => deleteProduct(p.id)} className="p-1.5 bg-gray-100 hover:bg-red-50 text-red-600 rounded-lg">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* TAB 2: CATEGORY MANAGER */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  <form onSubmit={handleSaveCategory} className="bg-[#FAFBFC] p-5 rounded-2xl border border-[#E6EAF0] space-y-4">
                    <h4 className="text-sm font-extrabold text-[#1F2937]">
                      {editingCategoryId ? 'Edit Category' : '+ Add New Category'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Category Name *</label>
                        <input 
                          type="text" 
                          value={categoryForm.name}
                          onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E6EAF0] text-xs font-medium"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                        <input 
                          type="text" 
                          value={categoryForm.description}
                          onChange={e => setCategoryForm({ ...categoryForm, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E6EAF0] text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Category Image</label>
                      <input type="file" accept="image/*" onChange={handleCategoryImageUpload} className="text-xs" />
                    </div>

                    <button type="submit" className="px-5 py-2 bg-[#2F5D8C] text-white font-bold text-xs rounded-xl">
                      Save Category
                    </button>
                  </form>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {categories.map(c => (
                      <div key={c.id} className="bg-white p-4 rounded-xl border border-[#E6EAF0] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={c.image || c.image_url} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <span className="font-bold text-xs text-[#1F2937] block">{c.name}</span>
                            <span className="text-[10px] text-gray-500">{c.description}</span>
                          </div>
                        </div>
                        <button onClick={() => deleteCategory(c.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: HERO SLIDER MANAGER */}
              {activeTab === 'slides' && (
                <div className="space-y-6">
                  <form onSubmit={handleSaveSlide} className="bg-[#FAFBFC] p-5 rounded-2xl border border-[#E6EAF0] space-y-4">
                    <h4 className="text-sm font-extrabold text-[#1F2937]">
                      {editingSlideId ? 'Edit Hero Slide' : '+ Add Hero Slide'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Badge Tagline</label>
                        <input 
                          type="text" 
                          value={slideForm.badge}
                          onChange={e => setSlideForm({ ...slideForm, badge: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E6EAF0] text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Title *</label>
                        <input 
                          type="text" 
                          value={slideForm.title}
                          onChange={e => setSlideForm({ ...slideForm, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#E6EAF0] text-xs font-medium"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Blue Highlight Text</label>
                      <input 
                        type="text" 
                        value={slideForm.blue_highlight}
                        onChange={e => setSlideForm({ ...slideForm, blue_highlight: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E6EAF0] text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                      <textarea 
                        value={slideForm.description}
                        onChange={e => setSlideForm({ ...slideForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E6EAF0] text-xs font-medium h-16"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Slide Image</label>
                      <input type="file" accept="image/*" onChange={handleSlideImageUpload} className="text-xs" />
                    </div>

                    <button type="submit" className="px-5 py-2 bg-[#2F5D8C] text-white font-bold text-xs rounded-xl">
                      Save Slide
                    </button>
                  </form>

                  <div className="space-y-3">
                    {heroSlides.map(s => (
                      <div key={s.id} className="bg-white p-4 rounded-xl border border-[#E6EAF0] flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img src={s.image_url} className="w-16 h-10 rounded-lg object-cover" />
                          <div>
                            <span className="font-bold text-xs text-[#1F2937] block">{s.title} {s.blue_highlight}</span>
                            <span className="text-[10px] text-gray-500">{s.description}</span>
                          </div>
                        </div>
                        <button onClick={() => deleteHeroSlide(s.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
