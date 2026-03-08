import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import figoutLogo from '@/assets/figout-logo-new.png';

const navLinks = [
  { href: '#what-we-do', label: 'What we do' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '/manifesto', label: 'Manifesto' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main Navbar - Not sticky */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 z-50 bg-foreground border-b-[3px] border-foreground"
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
              <span className="font-bold text-xl tracking-tight hidden sm:block">
                <span className="text-background">FigOut</span>
                <span className="text-background"> Labs</span>
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.href.startsWith('/')) {
                      navigate(link.href);
                    } else {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-background/80 hover:text-background text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
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
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-foreground/80 hover:text-foreground text-base font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://calendar.app.google/XmdUw45c77LS4o417"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="btn-brutal-primary w-full text-center mt-2"
            >
              Book a call
            </a>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}
