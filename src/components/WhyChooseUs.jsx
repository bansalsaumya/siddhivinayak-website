import React from 'react';
import { 
  Boxes, 
  Layers, 
  Sparkles, 
  MessageCircle, 
  Award, 
  Store 
} from 'lucide-react';

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <Award size={22} className="text-[#2F5D8C]" />,
      title: "21+ Years of Trust",
      description: "Serving happy customers with over 21+ years of retail experience, quality, and commitment."
    },
    {
      icon: <Boxes size={22} className="text-[#2F5D8C]" />,
      title: "Wide Product Range",
      description: "Carefully curated inventory catering to diverse customer requests across retail & wholesale."
    },
    {
      icon: <Layers size={22} className="text-[#2F5D8C]" />,
      title: "Multiple Categories",
      description: "From smartphones & accessories to cosmetics, stationery, toys, sports gear & decor."
    },
    {
      icon: <Sparkles size={22} className="text-[#2F5D8C]" />,
      title: "Quality Tested",
      description: "Every item in our catalogue is hand-inspected to maintain premium quality standards."
    },
    {
      icon: <MessageCircle size={22} className="text-[#2F5D8C]" />,
      title: "Easy WhatsApp Enquiry",
      description: "Direct instant price quotes and availability responses straight to your phone."
    },
    {
      icon: <Store size={22} className="text-[#2F5D8C]" />,
      title: "One Store, Many Needs",
      description: "Your all-in-one catalogue destination saving you time and streamlining purchases."
    }
  ];

  return (
    <section className="bg-white py-14 border-y border-[#E6EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2F5D8C] bg-[#DCEAF7] px-3.5 py-1.5 rounded-full border border-[#B8D5E5]">
            Why Shree Lata
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1F2937] mt-3">
            Why Choose Our Product Catalogue
          </h3>
          <p className="text-xs sm:text-sm text-[#667085] mt-2 font-medium">
            Built on over 21+ years of trust, variety, and personalized customer care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl bg-[#FAFBFC] border border-[#E6EAF0] shadow-2xs hover:shadow-md transition-all duration-300 card-3d"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-[#E6EAF0] shadow-2xs flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h4 className="text-base font-extrabold text-[#1F2937] mb-1.5">
                {item.title}
              </h4>
              <p className="text-xs text-[#667085] leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
