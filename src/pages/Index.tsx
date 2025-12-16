import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MarqueeSection from '@/components/MarqueeSection';
import ScrollSection from '@/components/ScrollSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="noise-overlay">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <ServicesSection />
      <ScrollSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;