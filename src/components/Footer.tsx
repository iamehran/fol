import { motion } from 'framer-motion';
import figoutLogo from '@/assets/figout-logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t-[3px] border-foreground bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <img 
              src={figoutLogo} 
              alt="FigOut Labs" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-xl uppercase tracking-tight">FigOut Labs</span>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 text-sm font-semibold uppercase tracking-wider"
          >
            <a href="#" className="hover:text-accent transition-colors">Twitter</a>
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-accent transition-colors">Dribbble</a>
            <a href="#" className="hover:text-accent transition-colors">GitHub</a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            © {currentYear} All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
