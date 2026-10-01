import React, { useEffect } from 'react';
import { CatalogProvider, useCatalog } from './context/CatalogContext';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { CategorySection } from './components/CategorySection';
import { ProductSections } from './components/ProductSections';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminPanel } from './components/AdminPanel';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

const MainContent = () => {
  const { activeTab, setIsAdminOpen } = useCatalog();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Secret key combination: Ctrl + Shift + A or Alt + A
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        setIsAdminOpen(true);
      }
    };

    if (window.location.hash.toLowerCase() === '#admin') {
      setIsAdminOpen(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [setIsAdminOpen]);

  return (
    <main className="min-h-[75vh]">
      {activeTab === 'home' && (
        <>
          <HeroSlider />
          <CategorySection />
          <ProductSections />
          <WhyChooseUs />
          <AboutSection />
          <ContactSection />
        </>
      )}

      {activeTab === 'products' && (
        <div className="pt-4">
          <ProductSections />
        </div>
      )}

      {activeTab === 'about' && (
        <div className="pt-4 space-y-4">
          <AboutSection />
          <WhyChooseUs />
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="pt-4">
          <ContactSection />
        </div>
      )}

      <ProductDetailModal />
      <AdminPanel />
      <FloatingWhatsApp />
    </main>
  );
};

export default function App() {
  return (
    <CatalogProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFBFC] text-[#1F2937] selection:bg-[#2F5D8C] selection:text-white">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </CatalogProvider>
  );
}
