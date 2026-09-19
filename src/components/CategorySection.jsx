import React from 'react';
import { useCatalog } from '../context/CatalogContext';
import { ArrowRight } from 'lucide-react';

export const CategorySection = () => {
  const { categories, setSelectedCategory, setActiveTab } = useCatalog();

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveTab('products');
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#E6EAF0] gap-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
            Shop By Category
          </h3>
          <p className="text-xs sm:text-sm text-[#667085] mt-1 font-medium">
            Explore our wide range of categories
          </p>
        </div>

        <button
          onClick={() => handleCategoryClick('ALL')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F5D8C] hover:underline group"
        >
          <span>View All Categories</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:grid-cols-9 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#E6EAF0] p-3 shadow-2xs hover:shadow-md transition-all duration-300 card-3d flex flex-col justify-between"
          >
            {/* Category Image */}
            <div className="relative h-28 sm:h-32 rounded-lg overflow-hidden bg-[#F3F6FA] mb-3">
              <img 
                src={cat.image || cat.image_url || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'} 
                alt={cat.name} 
                className="w-full h-full object-cover img-zoom"
              />
            </div>

            {/* Title & Subtitle */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#1F2937] group-hover:text-[#2F5D8C] transition-colors line-clamp-2">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-[#667085] mt-0.5 line-clamp-1 font-normal">
                  {cat.description || 'Browse collection'}
                </p>
              </div>

              {/* Bottom Small Arrow Button */}
              <div className="mt-3">
                <div className="w-6 h-6 rounded-full bg-[#EFF6FC] text-[#2F5D8C] flex items-center justify-center group-hover:bg-[#2F5D8C] group-hover:text-white transition-colors">
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
