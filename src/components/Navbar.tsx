import { motion } from 'framer-motion';
import { useState } from 'react';
import figoutLogo from '@/assets/figout-logo-new.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-foreground border-b-[3px] border-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src={figoutLogo} 
              alt="FigOut Labs" 
              className="h-12 w-auto transition-transform group-hover:scale-110 duration-300"
            />
            <span className="font-bold text-xl uppercase tracking-tight hidden sm:block text-background">FigOut Labs</span>
          </a>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="#book"
              className="btn-brutal-primary text-sm"
            >
              Book a call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 border-[3px] border-foreground bg-primary flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-4">
              <span 
                className={`absolute left-0 w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  isOpen ? 'top-1.5 rotate-45' : 'top-0'
                }`} 
              />
              <span 
                className={`absolute left-0 top-1.5 w-5 h-0.5 bg-foreground transition-opacity duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`} 
              />
              <span 
                className={`absolute left-0 w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  isOpen ? 'top-1.5 -rotate-45' : 'top-3'
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden border-t-[3px] border-foreground bg-background"
      >
        <div className="container mx-auto px-4 py-6">
          <a
            href="#book"
            onClick={() => setIsOpen(false)}
            className="btn-brutal-primary w-full text-center"
          >
            Book a call
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
