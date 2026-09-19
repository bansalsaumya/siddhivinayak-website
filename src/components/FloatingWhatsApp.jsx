import React from 'react';
import { useCatalog } from '../context/CatalogContext';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const { whatsappConfig } = useCatalog();
  const phone = whatsappConfig.phone || '919876543210';
  const generalUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Shree Lata, I have a general enquiry about your product catalogue.')}`;

  return (
    <a
      href={generalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BD5A] text-white p-3.5 rounded-full shadow-soft-3d hover:scale-110 transition-all duration-300 flex items-center gap-2 group border-2 border-white"
      title="Contact Shree Lata on WhatsApp"
    >
      <MessageCircle size={24} fill="currentColor" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold whitespace-nowrap pr-1">
        General Enquiry
      </span>
    </a>
  );
};
