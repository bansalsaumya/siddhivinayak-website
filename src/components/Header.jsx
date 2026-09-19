import React, { useState, useRef, useEffect } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { 
  ChevronDown, 
  Search, 
  Menu, 
  X, 
  Settings, 
  ArrowRight
} from 'lucide-react';

export const Header = () => {
  const { 
    categories, 
    searchQuery, 
    setSearchQuery, 
    setSelectedCategory,
    setIsAdminOpen,
    activeTab,
    setActiveTab
  } = useCatalog();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tabName, categoryName = null) => {
    setActiveTab(tabName);
    if (categoryName) {
      setSelectedCategory(categoryName);
    }
    setIsCategoryDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#2F5D8C] text-white py-1.5 px-4 text-xs font-semibold text-center flex items-center justify-center gap-2">
        <span className="bg-[#E8B84B] text-[#1F2937] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
          CATALOGUE
        </span>
        <span className="hidden sm:inline">ONE STORE, MANY CATEGORIES • Contact us directly for bulk & best price enquiries</span>
        <span className="sm:hidden">ONE STORE, MANY CATEGORIES</span>
        
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="ml-auto flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold px-3 py-0.5 rounded-full transition"
          title="Open Admin Dashboard"
        >
          <Settings size={12} />
          <span>Admin</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2F5D8C] text-white flex items-center justify-center font-black text-lg tracking-tighter shadow-md">
              <span className="text-[#E8B84B]">SL</span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#1F2937] flex items-center gap-1.5">
                SHREE LATA
              </h1>
              <p className="text-[10px] font-extrabold tracking-widest text-[#2F5D8C] uppercase">
                PRODUCT CATALOGUE
              </p>
            </div>
          </div>

          {/* Large Rounded Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim().length > 0 && activeTab !== 'products') {
                    setActiveTab('products');
                  }
                }}
                placeholder="Search products by name, category..."
                className="w-full pl-11 pr-4 py-2.5 bg-[#F3F6FA] border border-[#E6EAF0] rounded-full text-sm font-medium text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2F5D8C]/20 focus:border-[#2F5D8C] transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={() => handleNavClick('home')}
              className={`relative py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'home' ? 'text-[#2F5D8C]' : 'text-gray-600 hover:text-[#2F5D8C]'
              }`}
            >
              HOME
              {activeTab === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8B84B] rounded-full" />
              )}
            </button>

            <button 
              onClick={() => handleNavClick('products')}
              className={`relative py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'products' ? 'text-[#2F5D8C]' : 'text-gray-600 hover:text-[#2F5D8C]'
              }`}
            >
              ALL PRODUCTS
              {activeTab === 'products' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8B84B] rounded-full" />
              )}
            </button>

            {/* Shop By Category Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-1 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-[#2F5D8C] transition-colors"
              >
                <span>SHOP BY CATEGORY</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 w-64 mt-2 bg-white rounded-xl shadow-xl border border-[#E6EAF0] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1.5 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Categories ({categories.length})
                  </div>
                  <div className="max-h-80 overflow-y-auto py-1">
                    <button
                      onClick={() => handleNavClick('products', 'ALL')}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-[#2F5D8C] hover:bg-[#F3F6FA] flex items-center justify-between"
                    >
                      <span>All Categories</span>
                      <ArrowRight size={12} />
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleNavClick('products', cat.name)}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#F3F6FA] hover:text-[#2F5D8C] flex items-center justify-between transition-colors"
                      >
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => handleNavClick('about')}
              className={`relative py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'about' ? 'text-[#2F5D8C]' : 'text-gray-600 hover:text-[#2F5D8C]'
              }`}
            >
              ABOUT US
              {activeTab === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8B84B] rounded-full" />
              )}
            </button>

            <button 
              onClick={() => handleNavClick('contact')}
              className={`relative py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'contact' ? 'text-[#2F5D8C]' : 'text-gray-600 hover:text-[#2F5D8C]'
              }`}
            >
              CONTACT & STORE
              {activeTab === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8B84B] rounded-full" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length > 0 && activeTab !== 'products') {
                  setActiveTab('products');
                }
              }}
              placeholder="Search products by name, category..."
              className="w-full pl-10 pr-4 py-2 bg-[#F3F6FA] border border-[#E6EAF0] rounded-full text-xs font-medium text-[#1F2937]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E6EAF0] px-4 pt-2 pb-6 space-y-3">
          <button 
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2 text-sm font-bold ${activeTab === 'home' ? 'text-[#2F5D8C]' : 'text-gray-700'}`}
          >
            HOME
          </button>
          <button 
            onClick={() => handleNavClick('products')}
            className={`block w-full text-left py-2 text-sm font-bold ${activeTab === 'products' ? 'text-[#2F5D8C]' : 'text-gray-700'}`}
          >
            ALL PRODUCTS
          </button>
          <div className="py-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</div>
            <div className="pl-2 space-y-1 border-l-2 border-[#DCEAF7]">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNavClick('products', cat.name)}
                  className="block w-full text-left py-1 text-xs font-semibold text-gray-600 hover:text-[#2F5D8C]"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left py-2 text-sm font-bold ${activeTab === 'about' ? 'text-[#2F5D8C]' : 'text-gray-700'}`}
          >
            ABOUT US
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            className={`block w-full text-left py-2 text-sm font-bold ${activeTab === 'contact' ? 'text-[#2F5D8C]' : 'text-gray-700'}`}
          >
            CONTACT & STORE
          </button>
        </div>
      )}
    </header>
  );
};
