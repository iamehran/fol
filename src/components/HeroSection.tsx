import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useMemo, useEffect } from 'react';
import { BackgroundLines } from '@/components/ui/background-lines';

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

// Import GIFs
import catTypingGif from '@/assets/cat-typing.gif';
import fireBlazeGif from '@/assets/fire-blaze.gif';

// Base icons
const baseIcons = [
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

interface ConstellationNode {
  id: number;
  icon: { src: string; alt: string };
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulseDelay: number;
  angle: number; // Angle from center for entrance animation
  distance: number; // Distance from center
}

interface ConstellationLine {
  id: string;
  from: number;
  to: number;
  delay: number;
}

function generateConstellationNodes(isMobile: boolean): ConstellationNode[] {
  const nodes: ConstellationNode[] = [];
  
  // Different positions for mobile vs desktop
  const safePositions = isMobile ? [
    // Mobile: 8 strategically placed small icons around the edges
    // Top scattered
    { x: 8, y: 8, size: 28 },
    { x: 92, y: 12, size: 26 },
    // Side decorations (avoiding center content)
    { x: 4, y: 35, size: 24 },
    { x: 96, y: 42, size: 26 },
    { x: 6, y: 65, size: 24 },
    { x: 94, y: 70, size: 26 },
    // Bottom scattered
    { x: 15, y: 92, size: 26 },
    { x: 85, y: 94, size: 28 },
  ] : [
    // Desktop: Full constellation
    // LEFT STRIP (0-15% X)
    { x: 3, y: 8, size: 52 },
    { x: 2, y: 30, size: 56 },
    { x: 4, y: 52, size: 48 },
    { x: 2, y: 75, size: 54 },
    { x: 5, y: 92, size: 50 },
    
    // RIGHT STRIP (85-100% X)
    { x: 97, y: 6, size: 50 },
    { x: 96, y: 28, size: 54 },
    { x: 98, y: 48, size: 52 },
    { x: 95, y: 68, size: 56 },
    { x: 97, y: 88, size: 48 },
    
    // BOTTOM STRIP (below CTA, 90-100% Y)
    { x: 20, y: 95, size: 48 },
    { x: 38, y: 97, size: 52 },
    { x: 55, y: 94, size: 50 },
    { x: 72, y: 96, size: 54 },
    { x: 88, y: 95, size: 50 },
    
    // TOP-LEFT corner cluster
    { x: 10, y: 4, size: 46 },
    
    // TOP-RIGHT corner cluster  
    { x: 90, y: 3, size: 48 },
    
    // Additional bottom corner icons
    { x: 8, y: 98, size: 46 },
    { x: 92, y: 98, size: 46 },
  ];
  
  for (let i = 0; i < safePositions.length; i++) {
    const pos = safePositions[i];
    
    const angle = Math.atan2(pos.y - 50, pos.x - 50);
    const distance = Math.sqrt((pos.x - 50) ** 2 + (pos.y - 50) ** 2);
    
    nodes.push({
      id: i,
      icon: baseIcons[i % baseIcons.length],
      x: pos.x,
      y: pos.y,
      size: pos.size,
      opacity: 1,
      pulseDelay: i * 0.2,
      angle,
      distance,
    });
  }
  return nodes;
}

// Create specific connections for a network look
function generateConstellationLines(nodes: ConstellationNode[], isMobile: boolean): ConstellationLine[] {
  const lines: ConstellationLine[] = [];
  
  if (isMobile) {
    // Mobile: elegant network with diagonal connections
    if (nodes.length >= 8) {
      // Top connections
      lines.push({ id: 'M1', from: 0, to: 2, delay: 0.1 }); // top-left to left-side
      lines.push({ id: 'M2', from: 1, to: 3, delay: 0.15 }); // top-right to right-side
      // Side chains
      lines.push({ id: 'M3', from: 2, to: 4, delay: 0.2 }); // left chain
      lines.push({ id: 'M4', from: 3, to: 5, delay: 0.25 }); // right chain
      // Bottom connections
      lines.push({ id: 'M5', from: 4, to: 6, delay: 0.3 }); // left to bottom
      lines.push({ id: 'M6', from: 5, to: 7, delay: 0.35 }); // right to bottom
      // Cross diagonal for visual interest
      lines.push({ id: 'M7', from: 6, to: 7, delay: 0.4 }); // bottom connection
    }
    return lines;
  }
  
  // Desktop: Manual connections for clean network look
  // Left strip connections (vertical chain)
  const leftNodes = [0, 1, 2, 3, 4];
  for (let i = 0; i < leftNodes.length - 1; i++) {
    lines.push({ id: `L${i}`, from: leftNodes[i], to: leftNodes[i + 1], delay: i * 0.15 });
  }
  
  // Right strip connections (vertical chain)
  const rightNodes = [5, 6, 7, 8, 9];
  for (let i = 0; i < rightNodes.length - 1; i++) {
    lines.push({ id: `R${i}`, from: rightNodes[i], to: rightNodes[i + 1], delay: i * 0.15 });
  }
  
  // Bottom strip connections (horizontal chain)
  const bottomNodes = [10, 11, 12, 13, 14];
  for (let i = 0; i < bottomNodes.length - 1; i++) {
    lines.push({ id: `B${i}`, from: bottomNodes[i], to: bottomNodes[i + 1], delay: i * 0.15 });
  }
  
  // Cross connections (diagonal network effect)
  lines.push({ id: 'C1', from: 0, to: 15, delay: 0.5 }); // top-left cluster
  lines.push({ id: 'C2', from: 5, to: 16, delay: 0.6 }); // top-right cluster
  lines.push({ id: 'C3', from: 4, to: 17, delay: 0.7 }); // bottom-left corner
  lines.push({ id: 'C4', from: 9, to: 18, delay: 0.8 }); // bottom-right corner
  lines.push({ id: 'C5', from: 4, to: 10, delay: 0.9 }); // left to bottom
  lines.push({ id: 'C6', from: 9, to: 14, delay: 1.0 }); // right to bottom
  lines.push({ id: 'C7', from: 17, to: 10, delay: 1.1 }); // corner to bottom
  lines.push({ id: 'C8', from: 18, to: 14, delay: 1.2 }); // corner to bottom
  
  return lines;
}

function ConstellationIcon({ node, index }: { node: ConstellationNode; index: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        width: node.size,
        height: node.size,
      }}
      initial={{ 
        x: '-50%',
        y: '-50%',
        scale: 0,
        opacity: 0,
      }}
      animate={{ 
        x: '-50%',
        y: '-50%',
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 1.2,
        delay: 0.5 + index * 0.08,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      {/* Icon container with subtle black shadow */}
      <motion.div 
        className="relative w-full h-full bg-background border-[2px] border-foreground/20 rounded-lg flex items-center justify-center"
        style={{
          boxShadow: '3px 3px 0px rgba(0, 0, 0, 0.15)',
        }}
      >
        <img 
          src={node.icon.src} 
          alt={node.icon.alt} 
          className="w-1/2 h-1/2 object-contain" 
        />
      </motion.div>
    </motion.div>
  );
}

function ConstellationField() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const nodes = useMemo(() => generateConstellationNodes(isMobile), [isMobile]);
  const lines = useMemo(() => generateConstellationLines(nodes, isMobile), [nodes, isMobile]);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Connecting Lines - black, thin, dashed with animation */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="dashPattern" patternUnits="userSpaceOnUse" width="12" height="1">
            <line x1="0" y1="0" x2="6" y2="0" stroke="black" strokeWidth="1" />
          </pattern>
        </defs>
        
        {lines.map((line) => {
          const fromNode = nodes[line.from];
          const toNode = nodes[line.to];
          
          return (
            <motion.line
              key={line.id}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="black"
              strokeWidth="1"
              strokeDasharray="8 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                strokeDashoffset: [0, -24],
              }}
              transition={{
                pathLength: { duration: 1.2, delay: 0.8 + line.delay },
                opacity: { duration: 0.8, delay: 0.8 + line.delay },
                strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear", delay: 2 + line.delay },
              }}
            />
          );
        })}
        
        {/* Animated white dots flowing on lines */}
        {lines.map((line, index) => {
          const fromNode = nodes[line.from];
          const toNode = nodes[line.to];
          
          return (
            <motion.circle
              key={`pulse-${line.id}`}
              r="3"
              fill="white"
              stroke="black"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{
                cx: [`${fromNode.x}%`, `${toNode.x}%`],
                cy: [`${fromNode.y}%`, `${toNode.y}%`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 2.5 + index * 0.4,
                ease: "linear",
              }}
            />
          );
        })}
      </svg>
      
      {/* Icons */}
      {nodes.map((node, index) => (
        <ConstellationIcon 
          key={node.id} 
          node={node} 
          index={index}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [isHoveringBuilders, setIsHoveringBuilders] = useState(false);
  const [isHoveringProblem, setIsHoveringProblem] = useState(false);
  const [isHoveringFigure, setIsHoveringFigure] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [problemMouseX, setProblemMouseX] = useState(0);
  const [figureMouseX, setFigureMouseX] = useState(0);
  const buildersRef = useRef<HTMLSpanElement>(null);
  const problemRef = useRef<HTMLSpanElement>(null);
  const figureRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLSpanElement>, setMouse: (x: number) => void) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const centerX = rect.width / 2;
      setMouse(relativeX - centerX);
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20 pb-8 md:pb-0 bg-background">
      {/* Background Lines Animation Layer - Hidden on mobile */}
      <div className="hidden md:block">
        <BackgroundLines 
          className="absolute inset-0 z-0" 
          svgOptions={{ duration: 8 }}
        />
      </div>
      
      {/* Creative Background */}
      <div className="absolute inset-0 z-[1]">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,hsl(var(--accent)/0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_0%_50%,hsl(var(--highlight)/0.06),transparent)]" />
        
        {/* Subtle grid - Larger on mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:80px_80px]" />
        
        {/* Floating shapes - Smaller on mobile */}
        <motion.div 
          className="absolute top-[15%] left-[10%] w-16 md:w-32 h-16 md:h-32 bg-primary/10 rounded-full blur-2xl md:blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[15%] w-20 md:w-40 h-20 md:h-40 bg-accent/10 rounded-full blur-2xl md:blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[40%] right-[8%] w-12 md:w-24 h-12 md:h-24 bg-highlight/10 rounded-full blur-xl md:blur-2xl"
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Constellation Field - covers entire background with parallax */}
      <motion.div 
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ y: orbitY }}
      >
        <ConstellationField />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-[1] sm:leading-[0.9] mb-4 md:mb-6 relative"
          >
            <span className="block">Not an Agency.</span>
            <span className="block mt-1 sm:mt-0">
              We Are{' '}
              <span 
                ref={buildersRef}
                className="relative inline-block cursor-pointer"
                onMouseEnter={() => setIsHoveringBuilders(true)}
                onMouseLeave={() => setIsHoveringBuilders(false)}
                onMouseMove={(e) => handleMouseMove(e, buildersRef, setMouseX)}
              >
                <span className="bg-accent text-accent-foreground px-2 sm:px-3 py-1 inline-block transform -rotate-1">
                  Builders
                </span>
                {/* Cat typing gif on hover - follows mouse - Hidden on mobile */}
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
                    className="hidden md:block absolute -top-40 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                  >
                    <img 
                      src={catTypingGif} 
                      alt="Cat typing" 
                      className="max-w-48 max-h-40"
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
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-3 md:mb-4">
              <span className="bg-background/80 px-3 sm:px-4 py-2 inline-block backdrop-blur-sm border-[2px] border-foreground/10">
                We ship real systems that create value. No corporate speak, no endless meetings.
                <br />
                <span className="text-foreground font-semibold">
                  Just pure execution and{' '}
                  <span 
                    ref={problemRef}
                    className="relative inline-block cursor-pointer underline decoration-primary decoration-2 underline-offset-4"
                    onMouseEnter={() => setIsHoveringProblem(true)}
                    onMouseLeave={() => setIsHoveringProblem(false)}
                    onMouseMove={(e) => handleMouseMove(e, problemRef, setProblemMouseX)}
                  >
                    problem-solving
                    {isHoveringProblem && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          y: 0,
                          x: problemMouseX * 0.3 - 20
                        }}
                        transition={{ 
                          opacity: { duration: 0.2 },
                          scale: { duration: 0.2 },
                          x: { duration: 0.1, ease: "easeOut" }
                        }}
                        className="hidden md:block absolute bottom-[90%] left-1/3 -translate-x-1/2 z-50 pointer-events-none"
                      >
                        <img 
                          src={fireBlazeGif} 
                          alt="Fire" 
                          className="w-auto h-auto max-w-[120px]"
                        />
                      </motion.div>
                    )}
                  </span>
                  .
                </span>
              </span>
            </p>
            
            {/* New subheadline */}
            <p className="text-xs sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-10">
              <span className="italic">
                We may not be the experts, but we know one thing —{' '}
                <span 
                  ref={figureRef}
                  className="relative inline-block cursor-pointer text-foreground font-semibold not-italic underline decoration-accent decoration-2 underline-offset-4"
                  onMouseEnter={() => setIsHoveringFigure(true)}
                  onMouseLeave={() => setIsHoveringFigure(false)}
                  onMouseMove={(e) => handleMouseMove(e, figureRef, setFigureMouseX)}
                >
                  how to figure it out
                  {isHoveringFigure && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        x: figureMouseX * 0.3 
                      }}
                      transition={{ 
                        opacity: { duration: 0.2 },
                        scale: { duration: 0.2 },
                        x: { duration: 0.1, ease: "easeOut" }
                      }}
                      className="hidden md:block absolute -top-36 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    >
                      <img 
                        src="https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif" 
                        alt="Thinking" 
                        className="max-w-40 max-h-36"
                      />
                    </motion.div>
                  )}
                </span>
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
              className="btn-brutal-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center gap-2 sm:gap-3 group"
            >
              Book a call
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" 
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
