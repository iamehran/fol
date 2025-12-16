import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import figoutLogo from '@/assets/figout-logo-new.png';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [floatingDismissed, setFloatingDismissed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (floatingDismissed) return;
      setShowFloatingCTA(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [floatingDismissed]);
  const handleDismissFloating = () => {
    setFloatingDismissed(true);
    setShowFloatingCTA(false);
  };
  return <>
      {/* Main Navbar - Not sticky */}
      <motion.nav initial={{
      y: -100
    }} animate={{
      y: 0
    }} transition={{
      duration: 0.5
    }} className="absolute top-0 left-0 right-0 z-50 bg-foreground border-b-[3px] border-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <img src={figoutLogo} alt="FigOut Labs" className="h-12 w-auto transition-transform group-hover:scale-110 duration-300" />
              <span className="font-bold text-xl tracking-tight hidden sm:block">
                <span className="text-[#3B82F6]">FigOut</span>
                <span className="text-background"> Labs</span>
              </span>
            </a>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a href="#book" className="btn-brutal-primary text-sm" style={{
              boxShadow: '4px 4px 0px hsl(var(--accent))'
            }}>
                Book a call
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-10 h-10 border-[3px] border-foreground bg-primary flex items-center justify-center" aria-label="Toggle menu">
              <div className="relative w-5 h-4">
                <span className={`absolute left-0 w-5 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 w-5 h-0.5 bg-foreground transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 w-5 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div initial={false} animate={{
        height: isOpen ? 'auto' : 0
      }} className="md:hidden overflow-hidden border-t-[3px] border-foreground bg-background">
          <div className="container mx-auto px-4 py-6">
            <a href="#book" onClick={() => setIsOpen(false)} className="btn-brutal-primary w-full text-center">
              Book a call
            </a>
          </div>
        </motion.div>
      </motion.nav>

      {/* Floating Sticky CTA - Appears on scroll */}
      <AnimatePresence>
        {showFloatingCTA && !floatingDismissed && <motion.div initial={{
        scale: 0.3,
        opacity: 0,
        y: -50,
        x: 50
      }} animate={{
        scale: 1,
        opacity: 1,
        y: 0,
        x: 0
      }} exit={{
        scale: 0.3,
        opacity: 0,
        y: -50,
        x: 50
      }} transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8
      }} className="fixed right-4 md:right-6 top-4 md:top-6 z-[100] flex flex-col items-center gap-4 bg-foreground border-[3px] border-background p-5" style={{
        boxShadow: '6px 6px 0px hsl(var(--background))'
      }}>
            {/* Close button */}
            <button onClick={handleDismissFloating} className="absolute -top-2 -left-2 w-6 h-6 bg-background text-foreground flex items-center justify-center border-[2px] border-foreground hover:bg-primary hover:text-foreground transition-colors" aria-label="Close">
              <X className="w-3 h-3" />
            </button>

            {/* Logo with animation */}
            <motion.img src={figoutLogo} alt="FigOut Labs" className="h-14 w-auto" initial={{
          scale: 0,
          rotate: -10
        }} animate={{
          scale: 1,
          rotate: 0
        }} transition={{
          delay: 0.1,
          type: "spring",
          stiffness: 300
        }} />

            {/* Book a call button */}
            <motion.a href="#book" className="btn-brutal-primary text-xs whitespace-nowrap" style={{
          boxShadow: '3px 3px 0px hsl(var(--accent))'
        }} initial={{
          y: 10,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.2
        }}>
              Book a call
            </motion.a>
          </motion.div>}
      </AnimatePresence>
    </>;
}