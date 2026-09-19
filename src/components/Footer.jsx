import React from 'react';
import { useCatalog } from '../context/CatalogContext';
import { MessageCircle, Phone, MapPin, Sparkles, ChevronRight } from 'lucide-react';

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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2F5D8C] text-white flex items-center justify-center font-black text-lg shadow-2xs">
                <span className="text-[#E8B84B]">SL</span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-[#1F2937]">
                  SHREE LATA
                </h3>
                <p className="text-[10px] font-extrabold tracking-widest text-[#2F5D8C] uppercase">
                  PRODUCT CATALOGUE
                </p>
              </div>
            </div>

            <p className="text-xs text-[#667085] leading-relaxed">
              Shree Lata is your premier multi-category retail store catalogue featuring smartphones, accessories, artificial jewellery, cosmetics, stationery, toys, sports, and home decor items.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 bg-white text-[#2F5D8C] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#E6EAF0] shadow-2xs">
                <Sparkles size={12} className="text-[#E8B84B]" />
                One Store, Many Categories
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#2F5D8C]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#667085] font-semibold">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-[#2F5D8C] transition flex items-center gap-1">
                  <ChevronRight size={12} className="text-[#2F5D8C]" /> HOME
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('products')} className="hover:text-[#2F5D8C] transition flex items-center gap-1">
                  <ChevronRight size={12} className="text-[#2F5D8C]" /> ALL PRODUCTS
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-[#2F5D8C] transition flex items-center gap-1">
                  <ChevronRight size={12} className="text-[#2F5D8C]" /> ABOUT US
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-[#2F5D8C] transition flex items-center gap-1">
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
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-[#667085] font-semibold">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => handleCategoryClick(cat.name)}
                    className="hover:text-[#2F5D8C] transition flex items-center gap-1 truncate text-left"
                  >
                    <ChevronRight size={12} className="text-[#2F5D8C]" /> {cat.name}
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
            <div className="space-y-2.5 text-xs text-[#667085]">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-[#2F5D8C] flex-shrink-0 mt-0.5" />
                <a 
                  href="https://maps.app.goo.gl/h3PFovfsiCd4zuzf7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#2F5D8C] transition underline-offset-2 hover:underline"
                >
                  15, Gayatri Shopping Centre, Dibiyapur, Vatva, Ahmedabad, Gujarat 382445
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-[#2F5D8C] flex-shrink-0" />
                <a 
                  href={`tel:+${whatsappConfig.phone || '919725111128'}`} 
                  className="font-mono hover:text-[#2F5D8C] transition hover:underline font-bold"
                >
                  +{whatsappConfig.phone || '919725111128'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={15} className="text-emerald-600 flex-shrink-0" />
                <a 
                  href={`https://wa.me/${whatsappConfig.phone || '919725111128'}?text=${encodeURIComponent('Hello Shree Lata, I would like to enquire about your products.')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 transition hover:underline font-semibold"
                >
                  WhatsApp Best Price Quotes Available
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#667085] gap-4">
          <p>© {new Date().getFullYear()} Shree Lata Product Catalogue. All Rights Reserved.</p>
          <p className="text-[11px] font-semibold text-[#2F5D8C]">Multi-Category Retail Catalogue • Direct WhatsApp Enquiries</p>
        </div>

      </div>
    </footer>
  );
};
