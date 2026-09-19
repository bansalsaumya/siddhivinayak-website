import React from 'react';
import { useCatalog } from '../context/CatalogContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, Search, RotateCcw, Filter } from 'lucide-react';

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
    { id: 'Vivo', name: 'Vivo', icon: '📸' },
    { id: 'Oppo', name: 'Oppo', icon: '✨' },
    { id: 'OnePlus', name: 'OnePlus', icon: '⚡' },
    { id: 'Realme', name: 'Realme', icon: '🚀' },
    { id: 'Xiaomi', name: 'Xiaomi / Redmi', icon: '🔴' },
    { id: 'Nothing', name: 'Nothing', icon: '⚪' },
    { id: 'Tecno', name: 'Tecno', icon: '🔷' },
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

    if (selectedBrand && selectedBrand !== 'ALL') {
      const normalizeStr = (str) => (str || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
      const prodCatClean = normalizeStr(product.category);
      const mobileCatClean = normalizeStr('Mobiles & Smartphones');

      // Strictly restrict Brand pills to Mobiles & Smartphones (exclusively actual mobile phones)
      if (prodCatClean !== mobileCatClean) {
        return false;
      }

      const bQuery = selectedBrand.toLowerCase();
      const pName = (product.name || '').toLowerCase();
      const pBrand = (product.brand || '').toLowerCase();

      let match = false;
      if (bQuery === 'iphone') {
        match = pName.includes('iphone') || pName.includes('apple');
      } else if (bQuery === 'xiaomi') {
        match = pName.includes('xiaomi') || pName.includes('redmi');
      } else {
        match = pName.includes(bQuery) || pBrand.includes(bQuery);
      }

      if (!match) return false;
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

  const isMobileCat = selectedCategory === 'ALL' || (selectedCategory && selectedCategory.toLowerCase().includes('mobile'));

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
            <span>View All Featured</span>
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
                  onClick={() => setSelectedBrand(b.id)}
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
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E6EAF0] max-w-md mx-auto space-y-4 my-8 shadow-2xs">
          <div className="w-14 h-14 rounded-full bg-[#DCEAF7] text-[#2F5D8C] flex items-center justify-center mx-auto">
            <Search size={24} />
          </div>
          <h4 className="text-base font-bold text-[#1F2937]">No Products Found</h4>
          <p className="text-xs text-[#667085]">
            We couldn't find any catalogue items matching your current filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-[#2F5D8C] text-white text-xs font-bold rounded-xl shadow-2xs"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
};
