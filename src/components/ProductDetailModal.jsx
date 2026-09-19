import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { 
  X, 
  MessageCircle, 
  CheckCircle2, 
  Layers, 
  Info,
  ChevronRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductDetailModal = () => {
  const { selectedProductForModal, setSelectedProductForModal, products, getWhatsAppLink } = useCatalog();

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const selectedVariant = product.variants && product.variants.length > 0 
    ? product.variants[selectedVariantIndex] 
    : null;

  const whatsappUrl = getWhatsAppLink(product, selectedVariant);

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-soft-lg overflow-hidden border border-[#E6EAF0] my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Gallery Section */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative h-72 sm:h-88 rounded-2xl overflow-hidden bg-[#FAFBFC] border border-[#E6EAF0]">
                <img 
                  src={images[selectedImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#DCEAF7] text-[#2F5D8C] text-xs font-bold px-3 py-1 rounded-lg border border-[#B8D5E5]">
                  {product.category}
                </span>
              </div>

              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-18 h-18 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImageIndex === idx ? 'border-[#2F5D8C] ring-2 ring-[#2F5D8C]/20' : 'border-[#E6EAF0] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="bg-[#F3F6FA] p-4 rounded-2xl border border-[#E6EAF0] grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-700">
                  <ShieldCheck size={17} className="text-[#2F5D8C]" />
                  <span>Quality Inspected</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Truck size={17} className="text-[#2F5D8C]" />
                  <span>Fast Quote & Support</span>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="md:col-span-6 space-y-5 flex flex-col justify-between">
              <div>
                
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#2F5D8C]">
                    {product.category}
                  </span>
                  {product.subcategory && (
                    <>
                      <ChevronRight size={12} className="text-gray-400" />
                      <span className="text-xs text-[#667085] font-medium">
                        {product.subcategory}
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] leading-tight">
                  {product.name}
                </h2>

                {product.sku && (
                  <p className="text-xs font-semibold text-[#667085] mt-1">
                    SKU / Reference: <span className="text-[#1F2937] font-bold">{product.sku}</span>
                  </p>
                )}

                {/* Light Pricing Display */}
                <div className="mt-4 p-4 rounded-2xl bg-[#DCEAF7] border border-[#B8D5E5] flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-[#2F5D8C] font-extrabold uppercase tracking-wider">Catalog Pricing Tag</p>
                    <p className="text-xl font-extrabold text-[#2F5D8C]">FOR BEST PRICE</p>
                  </div>
                  <span className="text-xs font-bold text-[#2F5D8C] bg-white px-3 py-1 rounded-full border border-[#B8D5E5]">
                    Contact Store
                  </span>
                </div>

                {/* Description */}
                <div className="mt-4 space-y-1.5">
                  <h4 className="text-xs font-bold text-[#2F5D8C] uppercase tracking-wider flex items-center gap-1.5">
                    <Info size={14} />
                    <span>Product Description</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed bg-[#FAFBFC] p-3.5 rounded-xl border border-[#E6EAF0]">
                    {product.description}
                  </p>
                </div>

                {/* Variants Selector */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <h4 className="text-xs font-bold text-[#2F5D8C] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers size={14} />
                      <span>Available Variants</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedVariantIndex(idx)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                            selectedVariantIndex === idx 
                              ? 'bg-[#2F5D8C] text-white border-[#2F5D8C] shadow-2xs' 
                              : 'bg-white text-gray-700 border-[#E6EAF0] hover:bg-gray-50'
                          }`}
                        >
                          {v.color || v.size ? `${v.color || ''} ${v.size ? `(${v.size})` : ''}` : `Variant ${idx + 1}`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specs */}
                {selectedVariant && (
                  <div className="mt-3 p-3 bg-[#F3F6FA] rounded-xl border border-[#E6EAF0] text-xs grid grid-cols-2 gap-2 text-gray-700">
                    {selectedVariant.material && (
                      <div><span className="font-semibold text-[#2F5D8C]">Material:</span> {selectedVariant.material}</div>
                    )}
                    {selectedVariant.weight && (
                      <div><span className="font-semibold text-[#2F5D8C]">Weight/Qty:</span> {selectedVariant.weight}</div>
                    )}
                    {selectedVariant.size && (
                      <div><span className="font-semibold text-[#2F5D8C]">Dimensions:</span> {selectedVariant.size}</div>
                    )}
                    {selectedVariant.color && (
                      <div><span className="font-semibold text-[#2F5D8C]">Color Finish:</span> {selectedVariant.color}</div>
                    )}
                  </div>
                )}

              </div>

              {/* WhatsApp Enquiry Button */}
              <div className="pt-4 border-t border-[#E6EAF0] space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold text-sm py-3 px-6 rounded-2xl shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle size={18} fill="currentColor" />
                  <span>Enquire Best Price on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#E6EAF0]">
              <h3 className="text-base font-extrabold text-[#1F2937] mb-4">
                Related Products in {product.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((relProduct) => (
                  <ProductCard key={relProduct.id} product={relProduct} />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
