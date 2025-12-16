import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

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

// Inner ring - faster, closer
const innerOrbitIcons = [
  { src: claudeIcon, alt: 'Claude', color: 'hsl(var(--accent))' },
  { src: openaiIcon, alt: 'OpenAI', color: 'hsl(var(--primary))' },
  { src: geminiIcon, alt: 'Gemini', color: 'hsl(var(--highlight))' },
  { src: lovableIcon, alt: 'Lovable', color: 'hsl(var(--accent))' },
  { src: langchainIcon, alt: 'LangChain', color: 'hsl(var(--primary))' },
];

// Outer ring - slower, further
const outerOrbitIcons = [
  { src: makeIcon, alt: 'Make', color: 'hsl(var(--highlight))' },
  { src: n8nIcon, alt: 'n8n', color: 'hsl(var(--primary))' },
  { src: zapierIcon, alt: 'Zapier', color: 'hsl(var(--accent))' },
  { src: notionIcon, alt: 'Notion', color: 'hsl(var(--highlight))' },
  { src: huggingfaceIcon, alt: 'HuggingFace', color: 'hsl(var(--primary))' },
];

interface OrbitIconProps {
  icon: { src: string; alt: string; color: string };
  index: number;
  total: number;
  radius: number;
  duration: number;
  direction: 1 | -1;
  mouseX: number;
  mouseY: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

function OrbitIcon({ icon, index, total, radius, duration, direction, mouseX, mouseY, containerRef }: OrbitIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);
  const trailIdRef = useRef(0);
  const lastTrailTime = useRef(0);
  
  const angle = (index / total) * 360;
  
  // Magnetic attraction effect
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springX = useSpring(magneticX, { stiffness: 150, damping: 15 });
  const springY = useSpring(magneticY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    if (containerRef.current && mouseX !== 0 && mouseY !== 0) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate icon position
      const time = (Date.now() / 1000) * (360 / duration) * direction;
      const currentAngle = angle + time;
      const iconX = Math.cos((currentAngle * Math.PI) / 180) * radius;
      const iconY = Math.sin((currentAngle * Math.PI) / 180) * radius;
      
      // Distance from mouse to icon center
      const relMouseX = mouseX - centerX;
      const relMouseY = mouseY - centerY;
      const dx = relMouseX - iconX;
      const dy = relMouseY - iconY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Attraction strength based on distance (stronger when closer)
      const maxDistance = 300;
      const strength = Math.max(0, 1 - distance / maxDistance) * 30;
      
      magneticX.set((dx / distance) * strength || 0);
      magneticY.set((dy / distance) * strength || 0);
    }
  }, [mouseX, mouseY, angle, radius, duration, direction, containerRef, magneticX, magneticY]);

  // Trail effect - add trail periodically when not hovered
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastTrailTime.current > 200) {
        lastTrailTime.current = now;
        const time = (now / 1000) * (360 / duration) * direction;
        const currentAngle = angle + time;
        const x = Math.cos((currentAngle * Math.PI) / 180) * radius;
        const y = Math.sin((currentAngle * Math.PI) / 180) * radius;
        
        const newTrail = { id: trailIdRef.current++, x, y };
        setTrails(prev => [...prev.slice(-2), newTrail]);
        
        // Remove trail after animation
        setTimeout(() => {
          setTrails(prev => prev.filter(t => t.id !== newTrail.id));
        }, 800);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isHovered, angle, radius, duration, direction]);

  return (
    <>
      {/* Trail ghosts */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="absolute w-10 h-10 md:w-12 md:h-12 orbit-trail pointer-events-none"
          style={{
            left: trail.x,
            top: trail.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div 
            className="w-full h-full bg-background/50 border-2 border-foreground/30 rounded-xl"
            style={{ boxShadow: `0 0 20px ${icon.color}` }}
          />
        </div>
      ))}
      
      {/* Main icon */}
      <motion.div
        className="absolute w-12 h-12 md:w-16 md:h-16 cursor-pointer pointer-events-auto z-10"
        style={{
          left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * radius}px)`,
          top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * radius}px)`,
          x: springX,
          y: springY,
        }}
        animate={{
          left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * radius}px)`,
          top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * radius}px)`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.3, zIndex: 50 }}
        transition={{ scale: { duration: 0.2 } }}
      >
        <motion.div
          className={`w-12 h-12 md:w-16 md:h-16 bg-background border-[3px] border-foreground rounded-xl flex items-center justify-center transition-all duration-300 ${!isHovered ? 'animate-pulse-glow' : ''}`}
          style={{
            boxShadow: isHovered 
              ? `8px 8px 0px hsl(var(--foreground)), 0 0 30px ${icon.color}, 0 0 60px ${icon.color}`
              : undefined,
          }}
        >
          <img src={icon.src} alt={icon.alt} className="w-7 h-7 md:w-9 md:h-9" />
        </motion.div>
        
        {/* Tooltip on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 text-xs font-bold whitespace-nowrap rounded-sm"
          >
            {icon.alt}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

interface OrbitRingProps {
  icons: typeof innerOrbitIcons;
  radius: number;
  duration: number;
  direction: 1 | -1;
  mouseX: number;
  mouseY: number;
  containerRef: React.RefObject<HTMLDivElement>;
  isPaused: boolean;
}

function OrbitRing({ icons, radius, duration, direction, mouseX, mouseY, containerRef, isPaused }: OrbitRingProps) {
  return (
    <motion.div 
      className="absolute inset-0"
      animate={{ rotate: isPaused ? 0 : 360 * direction }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      style={{ willChange: 'transform' }}
    >
      {icons.map((icon, index) => (
        <OrbitIcon
          key={icon.alt}
          icon={icon}
          index={index}
          total={icons.length}
          radius={radius}
          duration={duration}
          direction={direction}
          mouseX={mouseX}
          mouseY={mouseY}
          containerRef={containerRef}
        />
      ))}
    </motion.div>
  );
}

export default function HeroSection() {
  const [isHoveringBuilders, setIsHoveringBuilders] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [orbitMouseX, setOrbitMouseX] = useState(0);
  const [orbitMouseY, setOrbitMouseY] = useState(0);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);
  const buildersRef = useRef<HTMLSpanElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buildersRef.current) {
      const rect = buildersRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const centerX = rect.width / 2;
      setMouseX(relativeX - centerX);
    }
  };

  const handleOrbitMouseMove = (e: React.MouseEvent) => {
    if (orbitContainerRef.current) {
      const rect = orbitContainerRef.current.getBoundingClientRect();
      setOrbitMouseX(e.clientX - rect.left);
      setOrbitMouseY(e.clientY - rect.top);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      {/* Orbiting Icons Container */}
      <div 
        ref={orbitContainerRef}
        className="absolute inset-0 flex items-center justify-center z-[5]"
        onMouseMove={handleOrbitMouseMove}
        onMouseEnter={() => setIsOrbitPaused(false)}
      >
        {/* Orbit path rings (visual guides) */}
        <div className="absolute w-[560px] h-[560px] md:w-[700px] md:h-[700px] border-2 border-dashed border-foreground/10 rounded-full" />
        <div className="absolute w-[840px] h-[840px] md:w-[1000px] md:h-[1000px] border-2 border-dashed border-foreground/5 rounded-full" />
        
        {/* Inner orbit - faster */}
        <OrbitRing
          icons={innerOrbitIcons}
          radius={280}
          duration={25}
          direction={1}
          mouseX={orbitMouseX}
          mouseY={orbitMouseY}
          containerRef={orbitContainerRef}
          isPaused={isOrbitPaused}
        />
        
        {/* Outer orbit - slower, opposite direction */}
        <OrbitRing
          icons={outerOrbitIcons}
          radius={420}
          duration={40}
          direction={-1}
          mouseX={orbitMouseX}
          mouseY={orbitMouseY}
          containerRef={orbitContainerRef}
          isPaused={isOrbitPaused}
        />
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
