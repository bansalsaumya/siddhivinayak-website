import React from 'react';
import { useCatalog } from '../context/CatalogContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, Search, RotateCcw, Filter, MessageCircle } from 'lucide-react';

export const ProductSections = () => {
  const { 
    products, 
    categories, 
    searchQuery, 
    setSearchQuery,
    selectedCategory, 
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    selectedSectionFilter,
    setSelectedSectionFilter,
    activeTab,
    setActiveTab
  } = useCatalog();

  const MOBILE_BRANDS = [
    { id: 'ALL', name: 'All Brands' },
    { id: 'iPhone', name: 'Apple iPhone', icon: '🍎' },
    { id: 'Samsung', name: 'Samsung', icon: '📱' },
    { id: 'Google', name: 'Google Pixel', icon: '🔍' },
    { id: 'Motorola', name: 'Motorola', icon: 'Ⓜ️' },
    { id: 'Vivo', name: 'Vivo', icon: '📸' },
    { id: 'Oppo', name: 'Oppo', icon: '✨' },
    { id: 'OnePlus', name: 'OnePlus', icon: '⚡' },
    { id: 'Realme', name: 'Realme', icon: '🚀' },
    { id: 'Xiaomi', name: 'Xiaomi / Redmi', icon: '🔴' },
    { id: 'Nothing', name: 'Nothing', icon: '⚪' },
    { id: 'Tecno', name: 'Tecno', icon: '🔷' },
    { id: 'iQOO', name: 'iQOO', icon: '⚡' },
  ];

  const filteredProducts = products.filter((product) => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = product.name?.toLowerCase().includes(q);
      const matchCat = product.category?.toLowerCase().includes(q);
      const matchSub = product.subcategory?.toLowerCase().includes(q);
      const matchDesc = product.description?.toLowerCase().includes(q);
      const matchSku = product.sku?.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchSub && !matchDesc && !matchSku) {
        return false;
      }
    }

    if (selectedCategory && selectedCategory !== 'ALL') {
      const normalize = (str) => (str || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
      const selClean = normalize(selectedCategory);
      const prodCatClean = normalize(product.category);

      if (selClean !== prodCatClean) {
        return false;
      }
    }

    // Brand filter only applies when viewing ALL categories or Mobiles & Smartphones
    if (selectedBrand && selectedBrand !== 'ALL') {
      const normalizeStr = (str) => (str || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
      const selCatClean = normalizeStr(selectedCategory);
      const mobileCatClean = normalizeStr('Mobiles & Smartphones');

      // If user selected a specific non-mobile category (like Mobile Accessories, Handbags, etc.), IGNORING selectedBrand completely!
      if (selCatClean === 'all' || selCatClean === mobileCatClean) {
        const prodCatClean = normalizeStr(product.category);
        if (prodCatClean === mobileCatClean) {
          const bQuery = selectedBrand.toLowerCase();
          const pName = (product.name || '').toLowerCase();
          const pBrand = (product.brand || '').toLowerCase();

          let match = false;
          if (bQuery === 'iphone') {
            match = pName.includes('iphone') || pName.includes('apple');
          } else if (bQuery === 'xiaomi') {
            match = pName.includes('xiaomi') || pName.includes('redmi');
          } else if (bQuery === 'google') {
            match = pName.includes('pixel') || pName.includes('google') || pBrand.includes('google');
          } else if (bQuery === 'nothing') {
            match = pName.includes('nothing') || pName.includes('cmf') || pBrand.includes('nothing');
          } else {
            match = pName.includes(bQuery) || pBrand.includes(bQuery);
          }

          if (!match) return false;
        }
      }
    }

    if (selectedSectionFilter === 'FEATURED' && !product.featured) return false;
    if (selectedSectionFilter === 'NEW' && !product.new_arrival) return false;
    if (selectedSectionFilter === 'BESTSELLER' && !product.best_seller) return false;

    return true;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedBrand('ALL');
    setSelectedSectionFilter('ALL');
  };

  const isMobileCat = selectedCategory && selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, '') === 'mobilessmartphones';

  const displayProducts = activeTab === 'home' 
    ? filteredProducts.slice(0, 12) 
    : filteredProducts;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="catalogue-section">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#E6EAF0] gap-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
            {activeTab === 'home' ? 'Featured Products' : 'All Products'}
          </h3>
          <p className="text-xs sm:text-sm text-[#667085] mt-1 font-medium">
            {activeTab === 'home' ? 'Handpicked just for you' : `Showing ${filteredProducts.length} items`}
          </p>
        </div>

        {activeTab === 'home' && (
          <button
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F5D8C] hover:underline group"
          >
            <span>View All ({products.length})</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Filter Toolbar for All Products view */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl p-4 border border-[#E6EAF0] shadow-2xs mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
              <span className="text-xs font-bold text-[#2F5D8C] flex items-center gap-1 flex-shrink-0">
                <Filter size={12} /> Category:
              </span>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedBrand('ALL');
                  setSelectedSectionFilter('ALL');
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition flex-shrink-0 ${
                  selectedCategory === 'ALL'
                    ? 'bg-[#2F5D8C] text-white shadow-2xs'
                    : 'bg-[#F3F6FA] text-gray-600 hover:bg-[#DCEAF7]'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSelectedBrand('ALL');
                    setSelectedSectionFilter('ALL');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition flex-shrink-0 ${
                    selectedCategory === cat.name
                      ? 'bg-[#2F5D8C] text-white shadow-2xs'
                      : 'bg-[#F3F6FA] text-gray-600 hover:bg-[#DCEAF7]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Tag Filter Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setSelectedSectionFilter(selectedSectionFilter === 'FEATURED' ? 'ALL' : 'FEATURED')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  selectedSectionFilter === 'FEATURED'
                    ? 'bg-[#E8B84B] text-[#1F2937]'
                    : 'bg-[#F3F6FA] text-gray-600'
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => setSelectedSectionFilter(selectedSectionFilter === 'NEW' ? 'ALL' : 'NEW')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  selectedSectionFilter === 'NEW'
                    ? 'bg-[#2F5D8C] text-white'
                    : 'bg-[#F3F6FA] text-gray-600'
                }`}
              >
                New Arrivals
              </button>
            </div>
          </div>

          {/* Dedicated Mobile Brand Filter Pills */}
          {isMobileCat && (
            <div className="pt-2 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
              <span className="text-xs font-bold text-[#2F5D8C] flex-shrink-0">
                Brands:
              </span>
              {MOBILE_BRANDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBrand(b.id);
                    setSelectedSectionFilter('ALL');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition flex-shrink-0 flex items-center gap-1 ${
                    selectedBrand === b.id
                      ? 'bg-[#2F5D8C] text-white shadow-2xs ring-2 ring-[#2F5D8C]/20'
                      : 'bg-[#F3F6FA] text-gray-700 hover:bg-[#DCEAF7]'
                  }`}
                >
                  {b.icon && <span>{b.icon}</span>}
                  <span>{b.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Product Grid */}
      {displayProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* End of Products Banner - Dynamic WhatsApp Inquiry */}
          <div className="mt-12 bg-gradient-to-br from-[#1F2937] via-[#2F5D8C] to-[#1E3A8A] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="space-y-2 max-w-xl z-10">
              <span className="inline-block bg-[#25D366]/20 text-[#25D366] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider border border-[#25D366]/30">
                1000+ Items In Physical Store
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {selectedBrand && selectedBrand !== 'ALL'
                  ? `Looking for more ${selectedBrand} models?`
                  : selectedCategory && selectedCategory !== 'ALL'
                  ? `Need any other item in ${selectedCategory}?`
                  : `Didn't find the exact product you're looking for?`}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 font-medium">
                {selectedBrand && selectedBrand !== 'ALL'
                  ? `Website par sabhi ${selectedBrand} models list karna impossible hai! Humare physical store par latest & older ${selectedBrand} models stock me hain. Direct best rate poochein.`
                  : `Humare offline store par 1000+ items available hain. Agar aapko koi specific product, model, ya variant chahiye toh turant WhatsApp par enquiry karein.`}
              </p>
            </div>
            <a
              href={`https://wa.me/919725111128?text=${encodeURIComponent(
                selectedBrand && selectedBrand !== 'ALL'
                  ? `Hello Shree Lata, I am looking for other ${selectedBrand} mobile models that are not listed on your website. Please share availability and prices!`
                  : selectedCategory && selectedCategory !== 'ALL'
                  ? `Hello Shree Lata, I am looking for items in ${selectedCategory} that are not listed on your website. Please assist!`
                  : `Hello Shree Lata, I am looking for a specific product that I couldn't find on your website. Can you help me?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-[#25D366]/30 z-10"
            >
              <MessageCircle size={20} fill="currentColor" />
              <span>Ask on WhatsApp Now</span>
            </a>
          </div>

          {activeTab === 'home' && products.length > 12 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#2F5D8C] hover:bg-[#234970] text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg group"
              >
                <span>Explore All {products.length}+ Products</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#E6EAF0] max-w-xl mx-auto space-y-5 my-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#DCEAF7] text-[#2F5D8C] flex items-center justify-center mx-auto">
            <Search size={28} />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-[#1F2937]">Website Par Nahi Mila?</h4>
            <p className="text-xs sm:text-sm text-[#667085]">
              Humare physical store par 1000+ items stock me hain! Aap direct WhatsApp par model ya photo bhejkar instant stock & price jaan sakte hain.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/919725111128?text=${encodeURIComponent(
                searchQuery
                  ? `Hello Shree Lata, I searched for "${searchQuery}" on your website but didn't find it. Is it available in your shop?`
                  : `Hello Shree Lata, I couldn't find the product I'm looking for on your website. Can you help me?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-extrabold px-6 py-3 rounded-2xl shadow-md transition-all"
            >
              <MessageCircle size={18} fill="currentColor" />
              <span>Ask Stock on WhatsApp</span>
            </a>
            <button
              onClick={clearFilters}
              className="w-full sm:w-auto px-5 py-3 bg-[#F3F6FA] hover:bg-[#E6EAF0] text-[#2F5D8C] text-xs font-extrabold rounded-2xl transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
