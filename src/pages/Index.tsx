import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MarqueeSection from '@/components/MarqueeSection';
import ScrollSection from '@/components/ScrollSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="noise-overlay">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <ScrollSection />
      <StatsSection />
      <ServicesSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
