import { motion, useScroll, useTransform } from 'framer-motion';
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

// Icons for wave animation
const waveIcons = [
  { src: claudeIcon, alt: 'Claude' },
  { src: makeIcon, alt: 'Make' },
  { src: openaiIcon, alt: 'OpenAI' },
  { src: n8nIcon, alt: 'n8n' },
  { src: geminiIcon, alt: 'Gemini' },
  { src: zapierIcon, alt: 'Zapier' },
  { src: lovableIcon, alt: 'Lovable' },
  { src: notionIcon, alt: 'Notion' },
  { src: langchainIcon, alt: 'LangChain' },
  { src: huggingfaceIcon, alt: 'HuggingFace' },
];

interface WaveIconProps {
  icon: { src: string; alt: string };
  index: number;
  total: number;
}

function WaveIcon({ icon, index, total }: WaveIconProps) {
  // Position icons in a horizontal spread
  const xPosition = (index / (total - 1)) * 100; // 0% to 100%
  const yOffset = index % 2 === 0 ? -30 : 30; // Alternating vertical offset

  return (
    <motion.div
      className="absolute w-11 h-11 md:w-14 md:h-14 pointer-events-auto"
      style={{
        left: `${xPosition}%`,
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        x: [0, 80, 0, -80, 0],
        y: [yOffset, -yOffset, yOffset, -yOffset, yOffset],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2,
      }}
      whileHover={{ scale: 1.15 }}
    >
      <div
        className="w-11 h-11 md:w-14 md:h-14 bg-background border-[3px] border-foreground rounded-xl flex items-center justify-center"
        style={{ boxShadow: 'var(--shadow-brutal)' }}
      >
        <img src={icon.src} alt={icon.alt} className="w-6 h-6 md:w-8 md:h-8" />
      </div>
    </motion.div>
  );
}

function WaveAnimation({ icons }: { icons: typeof waveIcons }) {
  return (
    <motion.div 
      className="absolute inset-0"
      animate={{
        x: [0, 100, 0, -100, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {icons.map((icon, index) => (
        <WaveIcon
          key={icon.alt}
          icon={icon}
          index={index}
          total={icons.length}
        />
      ))}
    </motion.div>
  );
}

export default function HeroSection() {
  const [isHoveringBuilders, setIsHoveringBuilders] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const buildersRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buildersRef.current) {
      const rect = buildersRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const centerX = rect.width / 2;
      setMouseX(relativeX - centerX);
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
      {/* Creative Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,hsl(var(--accent)/0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_0%_50%,hsl(var(--highlight)/0.06),transparent)]" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Floating shapes */}
        <motion.div 
          className="absolute top-[15%] left-[10%] w-32 h-32 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[15%] w-40 h-40 bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[40%] right-[8%] w-24 h-24 bg-highlight/10 rounded-full blur-2xl"
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Wave Animation - behind text with parallax */}
      <motion.div 
        className="absolute inset-x-8 md:inset-x-16 lg:inset-x-24 top-1/2 -translate-y-1/2 h-64 z-[1] pointer-events-none"
        style={{ y: orbitY }}
      >
        <WaveAnimation icons={waveIcons} />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
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
