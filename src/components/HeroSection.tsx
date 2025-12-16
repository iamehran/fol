import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

// Import tool icons
import claudeIcon from '@/assets/icons/claude.svg';
import geminiIcon from '@/assets/icons/gemini.svg';
import makeIcon from '@/assets/icons/make.svg';
import n8nIcon from '@/assets/icons/n8n.svg';
import openaiIcon from '@/assets/icons/openai.svg';
import zapierIcon from '@/assets/icons/zapier.svg';
import notionIcon from '@/assets/icons/notion.svg';
import langchainIcon from '@/assets/icons/langchain.svg';
import huggingfaceIcon from '@/assets/icons/huggingface.svg';
import lovableIcon from '@/assets/icons/lovable.svg';

const orbitIcons = [
  { src: claudeIcon, alt: 'Claude' },
  { src: geminiIcon, alt: 'Gemini' },
  { src: makeIcon, alt: 'Make' },
  { src: n8nIcon, alt: 'n8n' },
  { src: openaiIcon, alt: 'OpenAI' },
  { src: zapierIcon, alt: 'Zapier' },
  { src: notionIcon, alt: 'Notion' },
  { src: langchainIcon, alt: 'LangChain' },
  { src: huggingfaceIcon, alt: 'HuggingFace' },
  { src: lovableIcon, alt: 'Lovable' },
];

export default function HeroSection() {
  const [isHoveringBuilders, setIsHoveringBuilders] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const buildersRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buildersRef.current) {
      const rect = buildersRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const centerX = rect.width / 2;
      setMouseX(relativeX - centerX);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      {/* Orbiting Icons */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
        <motion.div 
          className="relative"
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {orbitIcons.map((icon, index) => {
            const angle = (index / orbitIcons.length) * 360;
            const radius = 420; // Larger orbit radius to avoid text overlap
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <motion.div
                key={icon.alt}
                className="absolute w-12 h-12 md:w-16 md:h-16"
                style={{
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ rotate: -360 }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-background border-[3px] border-foreground rounded-xl flex items-center justify-center shadow-brutal">
                  <img src={icon.src} alt={icon.alt} className="w-7 h-7 md:w-9 md:h-9" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6 relative"
          >
            <span className="block">Not an Agency.</span>
            <span className="block">
              We Are{' '}
              <span 
                ref={buildersRef}
                className="relative inline-block cursor-pointer"
                onMouseEnter={() => setIsHoveringBuilders(true)}
                onMouseLeave={() => setIsHoveringBuilders(false)}
                onMouseMove={handleMouseMove}
              >
                <span className="bg-accent text-accent-foreground px-3 py-1 inline-block transform -rotate-1">
                  Builders
                </span>
                {/* Cat typing gif on hover - follows mouse */}
                {isHoveringBuilders && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      x: mouseX * 0.5 
                    }}
                    transition={{ 
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 },
                      x: { duration: 0.1, ease: "easeOut" }
                    }}
                    className="absolute -top-40 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                  >
                    <img 
                      src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" 
                      alt="Cat typing" 
                      className="w-40 h-32 object-cover border-[3px] border-foreground rounded-sm"
                    />
                  </motion.div>
                )}
              </span>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              <span className="bg-background/80 px-4 py-2 inline-block backdrop-blur-sm border-[2px] border-foreground/10">
                We ship real systems that create real value. No corporate speak, no endless meetings.
                <br />
                <span className="text-foreground font-semibold">Just pure execution and problem solving.</span>
              </span>
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-20"
          >
            <a
              href="https://calendar.app.google/XmdUw45c77LS4o417"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal-primary text-lg px-8 py-4 inline-flex items-center gap-3 group"
            >
              Book a call
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}