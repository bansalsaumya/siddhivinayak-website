import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { Heart, MessageCircle, Eye } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { setSelectedProductForModal, getWhatsAppLink } = useCatalog();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  const primaryImage = images && images.length > 0 
    ? images[0] 
    : 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80';

  const defaultVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
  const whatsappUrl = getWhatsAppLink(product, defaultVariant);

  return (
    <div className="card-3d group bg-white rounded-2xl overflow-hidden border border-[#E6EAF0] shadow-2xs flex flex-col justify-between h-full relative">
      
      {/* Top Image Container */}
      <div 
        onClick={() => setSelectedProductForModal(product)} 
        className="relative h-36 sm:h-52 overflow-hidden bg-[#F8FAFC] cursor-pointer p-2.5 sm:p-4 flex items-center justify-center"
      >
        <img 
          src={primaryImage} 
          alt={product.name} 
          className="w-full h-full object-contain img-zoom"
        />

        {/* Wishlist Heart Icon */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 shadow-xs flex items-center justify-center transition"
          aria-label="Wishlist"
        >
          <Heart size={14} fill={isWishlisted ? '#EF4444' : 'none'} className={isWishlisted ? 'text-red-500' : ''} />
        </button>

        {/* Badges: New / Best Seller */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {product.new_arrival ? (
            <span className="badge-new text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
              New
            </span>
          ) : product.best_seller ? (
            <span className="badge-bestseller text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
              Best Seller
            </span>
          ) : product.featured ? (
            <span className="bg-[#2F5D8C] text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
              Featured
            </span>
          ) : null}
        </div>

        {/* Quick View */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-white text-[#2F5D8C] font-bold text-xs px-3 py-1.5 rounded-full shadow-md">
            <Eye size={13} />
            Quick View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div>
          <h4 
            onClick={() => setSelectedProductForModal(product)} 
            className="text-xs sm:text-sm font-bold text-[#1F2937] hover:text-[#2F5D8C] cursor-pointer transition-colors line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h4>

          <p className="text-[11px] sm:text-xs text-[#667085] mt-0.5 sm:mt-1 line-clamp-2 font-normal leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* PRICE LABEL & WHATSAPP BUTTON */}
        <div className="pt-1 sm:pt-2 space-y-1.5 sm:space-y-2">
          <div className="text-[10px] sm:text-[11px] font-extrabold text-[#2F5D8C] tracking-wide uppercase">
            FOR BEST PRICE
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 btn-primary-blue font-bold text-[11px] sm:text-xs py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl shadow-xs transition-all"
          >
            <MessageCircle size={14} fill="white" />
            <span className="truncate">Enquire on WhatsApp</span>
          </a>
        </div>

      </div>

    </div>
  );
};
