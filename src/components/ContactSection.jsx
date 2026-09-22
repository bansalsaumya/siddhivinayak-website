import React from 'react';
import { useCatalog } from '../context/CatalogContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Store,
  CheckCircle2
} from 'lucide-react';

export const ContactSection = () => {
  const { whatsappConfig } = useCatalog();
  const phoneFormatted = whatsappConfig.phone || '919725111128';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#2F5D8C] bg-[#DCEAF7] px-3.5 py-1.5 rounded-full border border-[#B8D5E5]">
          Visit Our Store
        </span>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1F2937] mt-3">
          Contact & Store Location
        </h3>
        <p className="text-xs sm:text-sm text-[#667085] mt-1.5 font-medium">
          ONE STORE, MANY CATEGORIES • Contact us directly for bulk & retail enquiries
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E6EAF0] shadow-sm space-y-6 flex flex-col justify-between">
          
          <div>
            <div className="flex items-center gap-3 border-b border-[#E6EAF0] pb-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#2F5D8C] text-white flex items-center justify-center font-bold shadow-xs">
                <Store size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#1F2937]">Shree Lata Gifts & Communication</h4>
                <p className="text-[10px] text-[#2F5D8C] font-extrabold uppercase tracking-wider">Multi-Category Retail Store</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#1F2937]">
              
              {/* Store Address - Clickable to Google Maps */}
              <a 
                href="https://maps.app.goo.gl/h3PFovfsiCd4zuzf7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-2.5 rounded-2xl hover:bg-[#F3F6FA] transition cursor-pointer group border border-transparent hover:border-[#E6EAF0]"
              >
                <div className="p-2 rounded-xl bg-[#DCEAF7] text-[#2F5D8C] mt-0.5 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin size={17} />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937] group-hover:text-[#2F5D8C] transition-colors flex items-center gap-1">
                    <span>Store Address</span>
                    <span className="text-[10px] text-[#2F5D8C] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </p>
                  <p className="text-xs text-[#667085] mt-0.5 leading-relaxed font-medium">
                    15, Gayatri Shopping Centre, Dibiyapur, Vatva, Ahmedabad, Gujarat 382445
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2F5D8C] underline decoration-[#2F5D8C]/40 mt-1">
                    <span>Open in Google Maps</span>
                    <MapPin size={12} />
                  </span>
                </div>
              </a>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5 p-2.5 rounded-2xl">
                <div className="p-2 rounded-xl bg-[#DCEAF7] text-[#2F5D8C] mt-0.5 flex-shrink-0">
                  <Clock size={17} />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">Business Hours</p>
                  <p className="text-xs text-[#667085] mt-0.5">Monday – Saturday: 9:30 AM – 9:00 PM</p>
                  <p className="text-xs text-[#667085]">Sunday: Open Daily</p>
                </div>
              </div>

              {/* Direct Hotline - Clickable Call */}
              <a 
                href={`tel:+${phoneFormatted}`}
                className="flex items-start gap-3.5 p-2.5 rounded-2xl hover:bg-[#F3F6FA] transition cursor-pointer group border border-transparent hover:border-[#E6EAF0]"
              >
                <div className="p-2 rounded-xl bg-[#DCEAF7] text-[#2F5D8C] mt-0.5 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone size={17} />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937] group-hover:text-[#2F5D8C] transition-colors">Direct Hotline</p>
                  <p className="text-sm font-extrabold text-[#2F5D8C] mt-0.5 font-mono group-hover:underline flex items-center gap-1">
                    <span>+{phoneFormatted.replace(/(\d{2})(\d{5})(\d{5})/, '$1 $2 $3')}</span>
                    <span className="text-[10px] bg-[#DCEAF7] text-[#2F5D8C] px-1.5 py-0.5 rounded-full font-sans font-bold">Call Now</span>
                  </p>
                </div>
              </a>

              {/* WhatsApp Support - Clickable WhatsApp */}
              <a 
                href={`https://wa.me/${phoneFormatted}?text=${encodeURIComponent('Hello Shree Lata, I would like to enquire about your products.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-2.5 rounded-2xl hover:bg-emerald-50/70 transition cursor-pointer group border border-transparent hover:border-emerald-200"
              >
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 mt-0.5 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle size={17} />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937] group-hover:text-emerald-700 transition-colors">WhatsApp Support</p>
                  <p className="text-xs text-[#667085] mt-0.5 group-hover:text-emerald-800">Instant price quote & stock check (Click to Chat)</p>
                </div>
              </a>

            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <a
              href={`https://wa.me/919725111128?text=${encodeURIComponent('Hello Shree Lata, I would like to enquire about your product catalogue.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs py-3 px-4 rounded-2xl shadow-sm transition"
            >
              <MessageCircle size={17} />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href="https://www.instagram.com/dheeraj_swami_haryana?utm_source=qr&stkn=cWtrbmU5dDgweHJw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-95 text-white font-bold text-xs py-3 px-4 rounded-2xl shadow-sm transition"
            >
              <span>📸 Instagram Handle</span>
            </a>
          </div>

        </div>

        {/* Interactive Google Map Display */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6EAF0] shadow-sm overflow-hidden min-h-[380px] h-full flex flex-col justify-between p-2 relative group">
          <div className="w-full h-full min-h-[360px] rounded-2xl overflow-hidden relative">
            <iframe 
              title="Shree Lata Gift And Communication Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.8974815557835!2d72.6275212!3d22.9540024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e88c9a77b7d15%3A0x35f870d984fd7e29!2sShree%20Lata%20Gift%20And%20Communication!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
              className="w-full h-full border-0 rounded-2xl min-h-[360px]"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            <a
              href="https://maps.app.goo.gl/h3PFovfsiCd4zuzf7"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 bg-white/95 hover:bg-white text-[#1F2937] font-extrabold text-[10px] sm:text-xs px-3 py-1.5 rounded-xl shadow-lg border border-[#E6EAF0] transition flex items-center gap-1.5 backdrop-blur-xs z-10 hover:scale-105"
            >
              <MapPin size={13} className="text-[#2F5D8C]" />
              <span>Open Google Maps ↗</span>
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
