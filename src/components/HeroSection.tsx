import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useMemo, useEffect } from 'react';

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
  driftX: number;
  driftY: number;
  driftDuration: number;
}

interface ConstellationLine {
  id: string;
  from: number;
  to: number;
}

function generateConstellationNodes(count: number): ConstellationNode[] {
  const nodes: ConstellationNode[] = [];
  // Create a grid-like distribution with some randomness
  const cols = 6;
  const rows = Math.ceil(count / cols);
  
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const baseX = (col / (cols - 1)) * 100;
    const baseY = (row / (rows - 1)) * 100;
    
    nodes.push({
      id: i,
      icon: baseIcons[i % baseIcons.length],
      x: baseX + (Math.random() - 0.5) * 20, // Add randomness
      y: baseY + (Math.random() - 0.5) * 15,
      size: 36 + Math.random() * 20,
      opacity: 0.4 + Math.random() * 0.4,
      pulseDelay: Math.random() * 3,
      driftX: (Math.random() - 0.5) * 40,
      driftY: (Math.random() - 0.5) * 30,
      driftDuration: 10 + Math.random() * 15,
    });
  }
  return nodes;
}

function generateConstellationLines(nodes: ConstellationNode[]): ConstellationLine[] {
  const lines: ConstellationLine[] = [];
  const maxDistance = 35; // Max distance to connect
  
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < maxDistance && Math.random() > 0.3) {
        lines.push({
          id: `${i}-${j}`,
          from: i,
          to: j,
        });
      }
    }
  }
  return lines;
}

function ConstellationIcon({ node, animatedPos }: { node: ConstellationNode; animatedPos: { x: number; y: number } }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${animatedPos.x}%`,
        top: `${animatedPos.y}%`,
        width: node.size,
        height: node.size,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [node.opacity, node.opacity + 0.2, node.opacity],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: node.pulseDelay,
      }}
    >
      <div className="w-full h-full bg-background/70 border-[2px] border-primary/40 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg shadow-primary/10">
        <img 
          src={node.icon.src} 
          alt={node.icon.alt} 
          className="w-1/2 h-1/2 object-contain" 
        />
      </div>
    </motion.div>
  );
}

function ConstellationField() {
  const nodes = useMemo(() => generateConstellationNodes(24), []);
  const lines = useMemo(() => generateConstellationLines(nodes), [nodes]);
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.016); // ~60fps
    }, 16);
    return () => clearInterval(interval);
  }, []);
  
  // Calculate animated positions
  const animatedPositions = useMemo(() => {
    return nodes.map(node => ({
      x: node.x + Math.sin(time / node.driftDuration * Math.PI * 2) * node.driftX * 0.3,
      y: node.y + Math.cos(time / node.driftDuration * Math.PI * 2) * node.driftY * 0.3,
    }));
  }, [nodes, time]);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {lines.map((line, index) => {
          const fromPos = animatedPositions[line.from];
          const toPos = animatedPositions[line.to];
          const pulseOffset = (time * 0.5 + index * 0.2) % 1;
          
          return (
            <g key={line.id}>
              {/* Base line */}
              <line
                x1={`${fromPos.x}%`}
                y1={`${fromPos.y}%`}
                x2={`${toPos.x}%`}
                y2={`${toPos.y}%`}
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                strokeOpacity="0.15"
              />
              {/* Animated pulse */}
              <circle
                cx={`${fromPos.x + (toPos.x - fromPos.x) * pulseOffset}%`}
                cy={`${fromPos.y + (toPos.y - fromPos.y) * pulseOffset}%`}
                r="2"
                fill="hsl(var(--primary))"
                opacity={0.6 * (1 - Math.abs(pulseOffset - 0.5) * 2)}
              />
            </g>
          );
        })}
      </svg>
      
      {/* Icons */}
      {nodes.map((node, index) => (
        <ConstellationIcon 
          key={node.id} 
          node={node} 
          animatedPos={animatedPositions[index]}
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
      
      {/* Constellation Field - covers entire background with parallax */}
      <motion.div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ y: orbitY }}
      >
        <ConstellationField />
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
                onMouseMove={(e) => handleMouseMove(e, buildersRef, setMouseX)}
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
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4">
              <span className="bg-background/80 px-4 py-2 inline-block backdrop-blur-sm border-[2px] border-foreground/10">
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
                          x: problemMouseX * 0.3 
                        }}
                        transition={{ 
                          opacity: { duration: 0.2 },
                          scale: { duration: 0.2 },
                          x: { duration: 0.1, ease: "easeOut" }
                        }}
                        className="absolute -top-36 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                      >
                        <img 
                          src="https://media.giphy.com/media/l4FGni1RBAR2OWsGk/giphy.gif" 
                          alt="Fire" 
                          className="w-32 h-28 object-cover border-[3px] border-foreground rounded-sm"
                        />
                      </motion.div>
                    )}
                  </span>
                  .
                </span>
              </span>
            </p>
            
            {/* New subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
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
                      className="absolute -top-36 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    >
                      <img 
                        src="https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif" 
                        alt="Thinking" 
                        className="w-32 h-28 object-cover border-[3px] border-foreground rounded-sm"
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
