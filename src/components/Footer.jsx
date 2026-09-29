import React from 'react';
import { useCatalog } from '../context/CatalogContext';
import { MessageCircle, Phone, MapPin, Sparkles, ChevronRight, Mail } from 'lucide-react';

export const Footer = () => {
  const { categories, setSelectedCategory, setActiveTab, whatsappConfig } = useCatalog();

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    setActiveTab('products');
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'home' || tabName === 'products') {
      setSelectedCategory('ALL');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F3F6FA] text-[#1F2937] pt-14 pb-8 border-t border-[#E6EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E6EAF0]">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-[#E6EAF0] p-1 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:shadow-md group-hover:border-[#2F5D8C] transition-all">
                <img 
                  src="/uploads/shree_lata_logo_icon.png" 
                  alt="Shree Lata Logo" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1F2937] group-hover:text-[#2F5D8C] transition-colors">
                  SHREE LATA
                </h3>
                <p className="text-[10px] sm:text-xs font-extrabold tracking-wider text-[#2F5D8C] uppercase">
                  GIFTS & COMMUNICATION
                </p>
              </div>
            </button>

            <p className="text-xs text-[#667085] leading-relaxed">
              Shree Lata Gifts & Communication is your premier multi-category retail store catalogue featuring smartphones, accessories, artificial jewellery, cosmetics, stationery, toys, sports, and home decor items.
            </p>

            <div className="pt-1">
              <button 
                onClick={() => handleNavClick('products')}
                className="inline-flex items-center gap-1.5 bg-white text-[#2F5D8C] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-[#E6EAF0] shadow-2xs hover:bg-[#2F5D8C] hover:text-white transition-all cursor-pointer group"
              >
                <Sparkles size={12} className="text-[#E8B84B] group-hover:text-yellow-300" />
                One Store, Many Categories
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#2F5D8C]">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#667085] font-semibold">
              <li>
                <button 
                  onClick={() => handleNavClick('home')} 
                  className="hover:text-[#2F5D8C] hover:translate-x-1 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#2F5D8C]" /> HOME
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('products')} 
                  className="hover:text-[#2F5D8C] hover:translate-x-1 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#2F5D8C]" /> ALL PRODUCTS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('about')} 
                  className="hover:text-[#2F5D8C] hover:translate-x-1 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#2F5D8C]" /> ABOUT US
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')} 
                  className="hover:text-[#2F5D8C] hover:translate-x-1 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight size={12} className="text-[#2F5D8C]" /> CONTACT & STORE
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#2F5D8C]">
              Store Departments
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-xs text-[#667085] font-semibold">
              {categories.map((cat) => (
                <li key={cat.id || cat.name}>
                  <button 
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setActiveTab('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#2F5D8C] hover:translate-x-1 transition-all flex items-center gap-1 truncate text-left cursor-pointer w-full"
                  >
                    <ChevronRight size={12} className="text-[#2F5D8C] flex-shrink-0" /> 
                    <span className="truncate">{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Contact & WhatsApp */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#2F5D8C]">
              Store Enquiries
            </h4>
            <div className="space-y-3 text-xs text-[#667085]">
              <a 
                href="https://maps.google.com/?q=15+Gayatri+Shopping+Centre+Dibiyapur+Vatva+Ahmedabad+Gujarat+382445" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-2 group hover:text-[#2F5D8C] transition-colors cursor-pointer"
              >
                <MapPin size={16} className="text-[#2F5D8C] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline underline-offset-2">
                  15, Gayatri Shopping Centre, Dibiyapur, Vatva, Ahmedabad, Gujarat 382445
                </span>
              </a>

              <a 
                href={`tel:+${whatsappConfig.phone || '919725111128'}`} 
                className="flex items-center gap-2 group hover:text-[#2F5D8C] transition-colors cursor-pointer"
              >
                <Phone size={15} className="text-[#2F5D8C] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-mono font-bold group-hover:underline">
                  +{whatsappConfig.phone || '919725111128'}
                </span>
              </a>

              <a 
                href="mailto:shreelatastore@gmail.com" 
                className="flex items-center gap-2 group hover:text-[#2F5D8C] transition-colors cursor-pointer"
              >
                <Mail size={15} className="text-[#2F5D8C] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-mono font-bold text-xs group-hover:underline">
                  shreelatastore@gmail.com
                </span>
              </a>

              <a 
                href={`https://wa.me/${whatsappConfig.phone || '919725111128'}?text=${encodeURIComponent('Hello Shree Lata, I would like to enquire about your products.')}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 group text-emerald-700 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                <MessageCircle size={16} className="text-emerald-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-bold group-hover:underline">
                  WhatsApp Best Price Quotes
                </span>
              </a>

              <a 
                href="https://www.instagram.com/dheeraj_swami_haryana?utm_source=qr&stkn=cWtrbmU5dDgweHJw"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 group text-[#E1306C] hover:text-[#C13584] transition-colors cursor-pointer pt-0.5"
              >
                <span className="flex-shrink-0 font-bold text-sm group-hover:scale-110 transition-transform">📸</span>
                <span className="font-bold group-hover:underline">
                  Follow on Instagram (@dheeraj_swami_haryana)
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Designer Credit */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#667085] gap-4">
          <p>© {new Date().getFullYear()} Shree Lata Product Catalogue. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F5D8C] bg-white px-3.5 py-1.5 rounded-full border border-[#E6EAF0] shadow-2xs">
            <span>✨ Premium Design by</span>
            <span className="text-[#1F2937] font-black tracking-wide">Saumya Bansal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
