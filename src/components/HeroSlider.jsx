import React, { useState, useEffect, useRef } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { ChevronLeft, ChevronRight, ArrowRight, MessageCircle } from 'lucide-react';

export const HeroSlider = () => {
  const { heroSlides, setSelectedCategory, setActiveTab } = useCatalog();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const timerRef = useRef(null);

  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : [
    {
      badge: "ONE STORE. MANY CATEGORIES.",
      title: "Discover More.",
      blue_highlight: "Find What You Need.",
      description: "Explore mobiles, accessories, stationery, toys, sports products, gifts and more — all in one place.",
      image_url: "http://localhost:5000/uploads/hero_collage.jpg",
      cta_text: "Explore Products",
      category: "All"
    }
  ];

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
      }, 3500); // Automatically change slide every 3.5 seconds
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handleExploreClick = (categoryName) => {
    setSelectedCategory(categoryName || 'ALL');
    setActiveTab('products');
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent("Hello Shree Lata, I am interested in exploring your product catalogue.");
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      {/* Main Light Hero Banner Container */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#EBF3FA] via-[#F2F7FC] to-[#EBF4FA] border border-[#E6EAF0] shadow-sm min-h-[440px] flex items-center">
        
        {/* Decorative soft background elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#DCEAF7]/60 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#E8B84B]/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Content grid */}
        <div key={currentSlideIndex} className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 p-5 sm:p-8 lg:p-12 animate-in fade-in duration-500">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-5">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEAF7] text-[#2F5D8C] text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase">
              <span>{currentSlide.badge || "ONE STORE. MANY CATEGORIES."}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1F2937] leading-[1.15]">
              {currentSlide.title || "Discover More."} <br />
              <span className="text-[#2F5D8C]">
                {currentSlide.blue_highlight || "Find What You Need."}
              </span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-base text-[#667085] max-w-xl font-medium leading-relaxed">
              {currentSlide.description || "Explore mobiles, accessories, stationery, toys, sports products, gifts and more — all in one place."}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => handleExploreClick(currentSlide.category)}
                className="inline-flex items-center justify-center gap-2 bg-[#2F5D8C] hover:bg-[#234970] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all shadow-sm hover:shadow"
              >
                <span>{currentSlide.cta_text || "Explore Products"}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={handleWhatsAppEnquiry}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#1F2937] border border-[#E6EAF0] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-full transition-all shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                  <MessageCircle size={12} fill="white" />
                </div>
                <span>Enquire on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column Banner Image Composition */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-white/60 bg-white/40">
              <img 
                src={currentSlide.image_url || "http://localhost:5000/uploads/hero_collage.jpg"} 
                alt={currentSlide.title}
                className="w-full h-full object-cover rounded-2xl transition-all duration-700 transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next Arrows (Hidden on smallest screens to avoid blocking text) */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md items-center justify-center transition z-20"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md items-center justify-center transition z-20"
              aria-label="Next Slide"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Slider Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-all rounded-full ${
                  idx === currentSlideIndex 
                    ? 'w-6 h-2 bg-[#E8B84B]' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
