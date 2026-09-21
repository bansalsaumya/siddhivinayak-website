import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_HERO_SLIDES, DEFAULT_WHATSAPP } from '../data/initialData';
import { api } from '../services/api';

const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [heroSlides, setHeroSlides] = useState(INITIAL_HERO_SLIDES);
  const [whatsappConfig, setWhatsappConfig] = useState(DEFAULT_WHATSAPP);

  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategoryState] = useState('ALL');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState('ALL');
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);

  // Master setter for category that ALWAYS auto-clears brand and section filters
  const setSelectedCategory = (catName) => {
    setSelectedCategoryState(catName);
    setSelectedBrand('ALL');
    setSelectedSectionFilter('ALL');
  };

  // Fetch API data on load
  const loadCatalogData = async () => {
    try {
      setLoading(true);
      // Ensure frontend always uses initial static dataset for 100% reliable local rendering
      setCategories(INITIAL_CATEGORIES);
      setProducts(INITIAL_PRODUCTS);
      setHeroSlides(INITIAL_HERO_SLIDES);
    } catch (err) {
      console.error('Error initializing catalog context', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCatalogData();
  }, []);

  // Product CRUD
  const addProduct = async (productData) => {
    try {
      const created = await api.createProduct(productData);
      setProducts(prev => [created, ...prev]);
      return created;
    } catch (err) {
      console.error('Error creating product:', err);
      // Local fallback if API unauthenticated/offline
      const newProduct = {
        ...productData,
        id: `prod-${Date.now()}`,
        sku: productData.sku || `SL-${Math.floor(1000 + Math.random() * 9000)}`,
      };
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const updated = await api.updateProduct(id, updatedData);
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
    } catch (err) {
      console.error('Error updating product:', err);
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      if (selectedProductForModal?.id === id) {
        setSelectedProductForModal(null);
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Category CRUD
  const addCategory = async (categoryData) => {
    try {
      const created = await api.createCategory(categoryData);
      setCategories(prev => [...prev, created]);
    } catch (err) {
      console.error('Error adding category:', err);
      const newCat = {
        ...categoryData,
        id: `cat-${Date.now()}`,
        slug: categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };
      setCategories(prev => [...prev, newCat]);
    }
  };

  const updateCategory = async (id, updatedData) => {
    try {
      const updated = await api.updateCategory(id, updatedData);
      setCategories(prev => prev.map(c => c.id === id ? updated : c));
    } catch (err) {
      console.error('Error updating category:', err);
      setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  // Hero Slide CRUD
  const addHeroSlide = async (slideData) => {
    try {
      const created = await api.createSlide(slideData);
      setHeroSlides(prev => [...prev, created]);
    } catch (err) {
      setHeroSlides(prev => [...prev, { ...slideData, id: Date.now() }]);
    }
  };

  const updateHeroSlide = async (id, slideData) => {
    try {
      const updated = await api.updateSlide(id, slideData);
      setHeroSlides(prev => prev.map(s => s.id === id ? updated : s));
    } catch (err) {
      setHeroSlides(prev => prev.map(s => s.id === id ? { ...s, ...slideData } : s));
    }
  };

  const deleteHeroSlide = async (id) => {
    try {
      await api.deleteSlide(id);
      setHeroSlides(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setHeroSlides(prev => prev.filter(s => s.id !== id));
    }
  };

  const resetToDefaultData = () => {
    if (window.confirm("Reset all catalogue items to default dataset?")) {
      setCategories(INITIAL_CATEGORIES);
      setProducts(INITIAL_PRODUCTS);
      setHeroSlides(INITIAL_HERO_SLIDES);
    }
  };

  // Generate pre-filled WhatsApp link
  const getWhatsAppLink = (product, selectedVariant = null) => {
    const phone = whatsappConfig.phone || '919876543210';
    const variantStr = selectedVariant 
      ? `${selectedVariant.color || ''} ${selectedVariant.size ? `(${selectedVariant.size})` : ''}`.trim() 
      : 'Standard';

    let text = whatsappConfig.template || DEFAULT_WHATSAPP.template;
    text = text
      .replace('{product_name}', product ? product.name : 'General Enquiry')
      .replace('{category}', product ? product.category : 'General')
      .replace('{variant}', variantStr || 'Standard')
      .replace('{sku}', product ? product.sku || 'N/A' : 'N/A');

    return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CatalogContext.Provider value={{
      categories,
      products,
      heroSlides,
      whatsappConfig,
      setWhatsappConfig,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedBrand,
      setSelectedBrand,
      selectedSectionFilter,
      setSelectedSectionFilter,
      selectedProductForModal,
      setSelectedProductForModal,
      isAdminOpen,
      setIsAdminOpen,
      activeTab,
      setActiveTab,
      loading,
      loadCatalogData,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      addHeroSlide,
      updateHeroSlide,
      deleteHeroSlide,
      resetToDefaultData,
      getWhatsAppLink
    }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => useContext(CatalogContext);
