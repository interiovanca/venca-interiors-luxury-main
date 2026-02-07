import { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import VideoSection from '@/components/VideoSection';
import Footer from '@/components/Footer';
import NewsletterPopup from '@/components/NewsletterPopup';

const Index = () => {
  const [showHeader, setShowHeader] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setShowHeader(latest > 100);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div className="min-h-screen bg-background">
      <Header isVisible={showHeader} />
      <HeroSection />
      <CategorySection />
      <ProjectsShowcase />
      <VideoSection />
      <Footer />
      <NewsletterPopup />
    </div>
  );
};

export default Index;
