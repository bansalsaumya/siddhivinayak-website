import React from 'react';
import shopImage from '../assets/shree_lata_shop.jpg';
import { Award, ShieldCheck, Store } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-br from-[#FAFBFC] via-[#F3F6FA] to-white rounded-3xl text-[#1F2937] p-6 sm:p-10 lg:p-12 shadow-sm border border-[#E6EAF0] relative overflow-hidden">
        
        {/* Soft Ambient Background Glow */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#DCEAF7]/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Side: Story & 10+ Years Trust */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#E8B84B] text-[#1F2937] text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-2xs">
              <Award size={14} />
              <span>21+ Years of Trusted Excellence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1F2937] leading-tight">
              One Store, Endless Possibilities.
            </h2>

            <p className="text-[#667085] text-sm sm:text-base leading-relaxed font-medium">
              With over 21+ years of retail excellence, Shree Lata is a premier multi-category retail store and digital catalogue destination. We bring together a vast collection of smartphones, mobile accessories, artificial jewellery, cosmetics, stationery, sports goods, toys, and home decor items under one roof.
            </p>

            <p className="text-[#667085] text-xs sm:text-sm leading-relaxed">
              Our catalogue website serves as your direct window to explore current stock items, inspect specifications, and immediately query best price quotes through seamless WhatsApp interaction without retail friction.
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-[#E6EAF0]">
              <div className="bg-white p-3.5 rounded-2xl border border-[#E6EAF0]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#2F5D8C]">21+ Years</p>
                <p className="text-[11px] text-[#667085] font-semibold mt-0.5">Trusted Experience</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-[#E6EAF0]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#2F5D8C]">9+</p>
                <p className="text-[11px] text-[#667085] font-semibold mt-0.5">Store Departments</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-[#E6EAF0]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">100%</p>
                <p className="text-[11px] text-[#667085] font-semibold mt-0.5">Verified Quality</p>
              </div>
            </div>
          </div>

          {/* Right Side: Full Storefront Image with 21+ Years Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-[#E6EAF0] bg-white p-2 flex flex-col items-center">
              <div className="relative w-full rounded-xl overflow-hidden bg-[#FAFBFC] flex items-center justify-center">
                <img 
                  src="/uploads/storefront_front.jpg" 
                  alt="Shree Lata Mobile & Gift Storefront - 21+ Years Legacy" 
                  className="w-full max-h-[520px] object-contain rounded-xl transition-transform duration-300 hover:scale-[1.02]"
                />
                <span className="absolute top-3 right-3 text-xs font-black bg-[#2F5D8C] text-white px-3 py-1 rounded-full shadow-md border border-white flex items-center gap-1">
                  <Award size={13} className="text-[#E8B84B]" /> 21+ Years Legacy
                </span>
              </div>
              <div className="mt-2 text-center py-1">
                <span className="text-xs font-bold text-[#2F5D8C] bg-[#DCEAF7] px-3 py-1 rounded-full border border-[#B8D5E5]">
                  Shree Lata Mobile & Gift Store
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
