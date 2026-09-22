import React from 'react';
import { useCatalog } from '../context/CatalogContext';

export const FloatingWhatsApp = () => {
  const { whatsappConfig } = useCatalog();
  const phone = whatsappConfig.phone || '919725111128';
  const generalUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Shree Lata, I have a general enquiry about your product catalogue.')}`;

  return (
    <a
      href={generalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white ring-4 ring-[#25D366]/25"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.301-.15-1.785-.881-2.062-.982-.276-.101-.477-.15-.677.15-.199.3-.776.982-.951 1.181-.175.201-.351.226-.652.076-.301-.15-1.272-.469-2.424-1.497-.897-.798-1.502-1.784-1.678-2.084-.175-.301-.019-.464.131-.614.136-.135.301-.351.451-.526.15-.176.201-.301.301-.501.101-.201.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.235-.244-.585-.494-.506-.677-.515-.175-.008-.376-.01-.576-.01s-.526.075-.802.376c-.276.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.907 1.228 3.107.15.201 2.121 3.239 5.139 4.54.718.31 1.278.495 1.715.634.721.23 1.378.197 1.898.119.58-.087 1.785-.729 2.036-1.431.25-.702.25-1.303.175-1.431-.075-.128-.276-.228-.577-.378z"/>
      </svg>
    </a>
  );
};

