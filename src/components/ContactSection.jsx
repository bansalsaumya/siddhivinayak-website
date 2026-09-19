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
                <h4 className="text-lg font-bold text-[#1F2937]">Shree Lata Mobile & Gift</h4>
                <p className="text-[10px] text-[#2F5D8C] font-extrabold uppercase tracking-wider">Multi-Category Retail Store</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#1F2937]">
              
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-[#DCEAF7] text-[#2F5D8C] mt-0.5 flex-shrink-0">
                  <MapPin size={17} />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">Store Address</p>
                  <p className="text-xs text-[#667085] mt-0.5 leading-relaxed">
                    Main Commercial Market Road, Shree Lata Store (Gifts, Toys, Stationery, Sports, Mobiles & Accessories)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-[#DCEAF7] text-[#2F5D8C] mt-0.5 flex-shrink-0">
                  <Clock size={17} />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">Business Hours</p>
                  <p className="text-xs text-[#667085] mt-0.5">Monday – Saturday: 9:30 AM – 9:00 PM</p>
                  <p className="text-xs text-[#667085]">Sunday: Open Daily</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-[#DCEAF7] text-[#2F5D8C] mt-0.5 flex-shrink-0">
                  <Phone size={17} />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">Direct Hotline</p>
                  <p className="text-sm font-extrabold text-[#2F5D8C] mt-0.5 font-mono">+91 97251 11128</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 mt-0.5 flex-shrink-0">
                  <MessageCircle size={17} />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">WhatsApp Support</p>
                  <p className="text-xs text-[#667085] mt-0.5">Instant price quote & stock check</p>
                </div>
              </div>

            </div>
          </div>

          <a
            href={`https://wa.me/919725111128?text=${encodeURIComponent('Hello Shree Lata, I would like to enquire about your product catalogue.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs py-3 px-4 rounded-2xl shadow-sm transition mt-4"
          >
            <MessageCircle size={17} fill="currentColor" />
            <span>Chat on WhatsApp (+91 97251 11128)</span>
          </a>

        </div>

        {/* Interactive Google Map Display */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6EAF0] shadow-sm overflow-hidden min-h-[380px] h-full flex flex-col justify-between p-2">
          <div className="w-full h-full min-h-[360px] rounded-2xl overflow-hidden relative">
            <iframe 
              title="Shree Lata Store Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.996941198592!2d77.2167213150824!3d28.63048598241777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin" 
              className="w-full h-full border-0 rounded-2xl min-h-[360px]"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

    </section>
  );
};
