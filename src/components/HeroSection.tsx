import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { BackgroundLines } from '@/components/ui/background-lines';
import { X } from 'lucide-react';

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

// Base icons with project info
const baseIcons = [
  { 
    src: claudeIcon, alt: 'Claude',
    projects: [
      { title: 'AI Customer Support Bot', desc: 'Built an intelligent support agent using Claude for context-aware responses', tags: ['AI', 'Automation'] },
      { title: 'Document Analysis Pipeline', desc: 'Automated contract review system processing 500+ docs/day', tags: ['NLP', 'Enterprise'] },
    ]
  },
  { 
    src: makeIcon, alt: 'Make',
    projects: [
      { title: 'E-commerce Order Flow', desc: 'End-to-end order processing automation connecting 12+ platforms', tags: ['E-commerce', 'Integration'] },
      { title: 'Lead Scoring System', desc: 'Automated lead qualification pipeline with CRM sync', tags: ['Sales', 'CRM'] },
    ]
  },
  { 
    src: openaiIcon, alt: 'OpenAI',
    projects: [
      { title: 'Content Generation Engine', desc: 'AI-powered content creation platform for marketing teams', tags: ['AI', 'Content'] },
      { title: 'Smart Data Extraction', desc: 'Invoice and receipt parser using GPT-4 Vision', tags: ['AI', 'Finance'] },
    ]
  },
  { 
    src: n8nIcon, alt: 'n8n',
    projects: [
      { title: 'DevOps Alert System', desc: 'Self-hosted monitoring pipeline with intelligent alert routing', tags: ['DevOps', 'Monitoring'] },
      { title: 'HR Onboarding Automation', desc: 'Automated employee onboarding across 8 different tools', tags: ['HR', 'Workflow'] },
    ]
  },
  { 
    src: geminiIcon, alt: 'Gemini',
    projects: [
      { title: 'Multimodal Search Engine', desc: 'Image + text search system for product catalogs', tags: ['AI', 'Search'] },
    ]
  },
  { 
    src: zapierIcon, alt: 'Zapier',
    projects: [
      { title: 'Marketing Stack Integration', desc: 'Connected 20+ marketing tools into unified data flow', tags: ['Marketing', 'Integration'] },
      { title: 'Invoice Automation', desc: 'Automated billing pipeline reducing manual work by 90%', tags: ['Finance', 'Automation'] },
    ]
  },
  { 
    src: lovableIcon, alt: 'Lovable',
    projects: [
      { title: 'FigOut Labs Website', desc: 'This very website — built entirely on Lovable', tags: ['Web', 'Design'] },
      { title: 'Client Dashboard', desc: 'Real-time project tracking dashboard for agency clients', tags: ['SaaS', 'Dashboard'] },
    ]
  },
  { 
    src: notionIcon, alt: 'Notion',
    projects: [
      { title: 'Knowledge Base System', desc: 'Auto-syncing documentation hub for engineering teams', tags: ['Docs', 'Knowledge'] },
    ]
  },
  { 
    src: langchainIcon, alt: 'LangChain',
    projects: [
      { title: 'RAG Chatbot', desc: 'Retrieval-augmented chatbot trained on company knowledge base', tags: ['AI', 'RAG'] },
      { title: 'Agent Orchestrator', desc: 'Multi-agent system for complex research tasks', tags: ['AI', 'Agents'] },
    ]
  },
  { 
    src: huggingfaceIcon, alt: 'HuggingFace',
    projects: [
      { title: 'Sentiment Analysis API', desc: 'Custom fine-tuned model for brand sentiment tracking', tags: ['ML', 'NLP'] },
    ]
  },
];

interface ConstellationNode {
  id: number;
  icon: typeof baseIcons[0];
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulseDelay: number;
  angle: number;
  distance: number;
}

interface ConstellationLine {
  id: string;
  from: number;
  to: number;
  delay: number;
}

function generateConstellationNodes(isMobile: boolean): ConstellationNode[] {
  const nodes: ConstellationNode[] = [];
  
  const safePositions = isMobile ? [
    // Mobile: 8 icons around the edges, well-spaced
    { x: 8, y: 8, size: 28 },
    { x: 92, y: 12, size: 26 },
    { x: 4, y: 35, size: 24 },
    { x: 96, y: 42, size: 26 },
    { x: 6, y: 65, size: 24 },
    { x: 94, y: 70, size: 26 },
    { x: 15, y: 92, size: 26 },
    { x: 85, y: 94, size: 28 },
  ] : [
    // Desktop: Expanded constellation with more nodes, well distributed
    // LEFT COLUMN (0-12%)
    { x: 3, y: 8, size: 50 },
    { x: 5, y: 28, size: 54 },
    { x: 3, y: 50, size: 48 },
    { x: 5, y: 72, size: 52 },
    { x: 4, y: 92, size: 50 },
    
    // RIGHT COLUMN (88-100%)
    { x: 97, y: 6, size: 48 },
    { x: 95, y: 26, size: 52 },
    { x: 97, y: 46, size: 50 },
    { x: 95, y: 66, size: 54 },
    { x: 97, y: 86, size: 48 },
    
    // BOTTOM ROW (below content, y > 90%)
    { x: 18, y: 96, size: 46 },
    { x: 35, y: 94, size: 50 },
    { x: 52, y: 97, size: 48 },
    { x: 68, y: 95, size: 52 },
    { x: 85, y: 96, size: 46 },
    
    // TOP corners
    { x: 12, y: 3, size: 44 },
    { x: 88, y: 4, size: 46 },
    
    // INNER EDGES (not too close to center text)
    { x: 15, y: 20, size: 42 },
    { x: 85, y: 18, size: 44 },
    { x: 14, y: 78, size: 42 },
    { x: 86, y: 80, size: 44 },
    
    // Extra bottom corners
    { x: 8, y: 98, size: 44 },
    { x: 92, y: 98, size: 44 },
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

function generateConstellationLines(nodes: ConstellationNode[], isMobile: boolean): ConstellationLine[] {
  const lines: ConstellationLine[] = [];
  
  if (isMobile) {
    if (nodes.length >= 8) {
      lines.push({ id: 'M1', from: 0, to: 2, delay: 0.1 });
      lines.push({ id: 'M2', from: 1, to: 3, delay: 0.15 });
      lines.push({ id: 'M3', from: 2, to: 4, delay: 0.2 });
      lines.push({ id: 'M4', from: 3, to: 5, delay: 0.25 });
      lines.push({ id: 'M5', from: 4, to: 6, delay: 0.3 });
      lines.push({ id: 'M6', from: 5, to: 7, delay: 0.35 });
      lines.push({ id: 'M7', from: 6, to: 7, delay: 0.4 });
    }
    return lines;
  }
  
  // Desktop: comprehensive network
  // Left chain
  for (let i = 0; i < 4; i++) lines.push({ id: `L${i}`, from: i, to: i + 1, delay: i * 0.12 });
  // Right chain
  for (let i = 5; i < 9; i++) lines.push({ id: `R${i}`, from: i, to: i + 1, delay: (i - 5) * 0.12 });
  // Bottom chain
  for (let i = 10; i < 14; i++) lines.push({ id: `B${i}`, from: i, to: i + 1, delay: (i - 10) * 0.12 });
  
  // Corner connections
  lines.push({ id: 'C1', from: 0, to: 15, delay: 0.5 });
  lines.push({ id: 'C2', from: 5, to: 16, delay: 0.55 });
  lines.push({ id: 'C3', from: 4, to: 21, delay: 0.6 });
  lines.push({ id: 'C4', from: 9, to: 22, delay: 0.65 });
  
  // Inner edge connections to chains
  lines.push({ id: 'I1', from: 15, to: 17, delay: 0.7 });
  lines.push({ id: 'I2', from: 16, to: 18, delay: 0.72 });
  lines.push({ id: 'I3', from: 17, to: 1, delay: 0.75 });
  lines.push({ id: 'I4', from: 18, to: 6, delay: 0.78 });
  lines.push({ id: 'I5', from: 19, to: 3, delay: 0.8 });
  lines.push({ id: 'I6', from: 20, to: 8, delay: 0.82 });
  
  // Connect bottom to sides
  lines.push({ id: 'B1', from: 4, to: 10, delay: 0.85 });
  lines.push({ id: 'B2', from: 9, to: 14, delay: 0.88 });
  lines.push({ id: 'B3', from: 21, to: 10, delay: 0.9 });
  lines.push({ id: 'B4', from: 22, to: 14, delay: 0.92 });
  
  // Cross connections for depth
  lines.push({ id: 'X1', from: 19, to: 11, delay: 0.95 });
  lines.push({ id: 'X2', from: 20, to: 13, delay: 0.98 });
  
  return lines;
}

// Info popup component for clicked icons
function IconInfoPopup({ 
  icon, 
  screenPos, 
  onClose 
}: { 
  icon: typeof baseIcons[0]; 
  screenPos: { x: number; y: number }; 
  onClose: () => void;
}) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [adjustedPos, setAdjustedPos] = useState(screenPos);

  useEffect(() => {
    // After render, measure popup and clamp within viewport
    if (popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      let x = screenPos.x;
      let y = screenPos.y;
      
      // Default: open to the right and below
      // If too far right, flip left
      if (x + rect.width + 8 > vw) {
        x = screenPos.x - rect.width - 8;
      } else {
        x = screenPos.x + 8;
      }
      
      // If too far down, flip up
      if (y + rect.height + 8 > vh) {
        y = screenPos.y - rect.height - 8;
      } else {
        y = screenPos.y + 8;
      }
      
      // Final clamp
      x = Math.max(8, Math.min(x, vw - rect.width - 8));
      y = Math.max(8, Math.min(y, vh - rect.height - 8));
      
      setAdjustedPos({ x, y });
    }
  }, [screenPos]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={popupRef}
        className="fixed z-[9999] w-64 md:w-80"
        style={{ left: adjustedPos.x, top: adjustedPos.y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="bg-background border-[3px] border-foreground shadow-brutal p-4 relative">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center hover:bg-muted rounded-sm transition-colors"
          >
            <X size={14} />
          </button>
          
          <div className="flex items-center gap-3 mb-3 pr-6">
            <div className="w-10 h-10 bg-secondary border-2 border-foreground/20 rounded-lg flex items-center justify-center shrink-0">
              <img src={icon.src} alt={icon.alt} className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h4 className="font-bold text-sm">{icon.alt}</h4>
              <p className="text-xs text-muted-foreground">{icon.projects.length} project{icon.projects.length > 1 ? 's' : ''} built</p>
            </div>
          </div>
          
          <div className="space-y-2">
            {icon.projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="bg-secondary/50 border border-foreground/10 p-2.5 rounded-sm"
              >
                <p className="font-semibold text-xs mb-0.5">{project.title}</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{project.desc}</p>
                <div className="flex gap-1 mt-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-primary/20 text-primary-foreground border border-foreground/10 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

function ConstellationIcon({ 
  node, 
  index, 
  onClick, 
  isActive 
}: { 
  node: ConstellationNode; 
  index: number; 
  onClick: (e: React.MouseEvent) => void;
  isActive: boolean;
}) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        width: node.size,
        height: node.size,
        zIndex: isActive ? 40 : 10,
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
        scale: isActive ? 1.2 : 1,
        opacity: 1,
      }}
      whileHover={{ scale: 1.25 }}
      transition={{
        duration: 1.2,
        delay: 0.5 + index * 0.06,
        ease: [0.34, 1.56, 0.64, 1],
        scale: { duration: 0.2 },
      }}
      onClick={(e) => { e.stopPropagation(); onClick(e); }}
    >
      <motion.div 
        className={`relative w-full h-full bg-background border-[2px] rounded-lg flex items-center justify-center transition-colors duration-200 ${
          isActive ? 'border-primary shadow-brutal-primary' : 'border-foreground/20'
        }`}
        style={{
          boxShadow: isActive ? '3px 3px 0px hsl(75 100% 50%)' : '3px 3px 0px rgba(0, 0, 0, 0.15)',
        }}
      >
        <img 
          src={node.icon.src} 
          alt={node.icon.alt} 
          className="w-1/2 h-1/2 object-contain pointer-events-none" 
        />
      </motion.div>
    </motion.div>
  );
}

function ConstellationField({ onActiveChange }: { onActiveChange?: (active: boolean) => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [clickScreenPos, setClickScreenPos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const nodes = useMemo(() => generateConstellationNodes(isMobile), [isMobile]);
  const lines = useMemo(() => generateConstellationLines(nodes, isMobile), [nodes, isMobile]);
  
  const handleIconClick = (nodeId: number, e: React.MouseEvent) => {
    const newActive = activeNode === nodeId ? null : nodeId;
    setActiveNode(newActive);
    setClickScreenPos({ x: e.clientX, y: e.clientY });
    onActiveChange?.(newActive !== null);
  };

  const handleBackgroundClick = () => {
    setActiveNode(null);
    onActiveChange?.(false);
  };
  
  return (
    <div className="absolute inset-0" onClick={handleBackgroundClick}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {lines.map((line) => {
          const fromNode = nodes[line.from];
          const toNode = nodes[line.to];
          const isHighlighted = activeNode !== null && (line.from === activeNode || line.to === activeNode);
          
          return (
            <motion.line
              key={line.id}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={isHighlighted ? "hsl(75 100% 50%)" : "black"}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeDasharray="8 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: isHighlighted ? 0.8 : 1,
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
      
      {nodes.map((node, index) => (
        <ConstellationIcon 
          key={node.id} 
          node={node} 
          index={index}
          onClick={(e) => handleIconClick(node.id, e)}
          isActive={activeNode === node.id}
        />
      ))}
      
      {activeNode !== null && nodes[activeNode] && (
        <IconInfoPopup
          key={activeNode}
          icon={nodes[activeNode].icon}
          screenPos={clickScreenPos}
          onClose={() => { setActiveNode(null); onActiveChange?.(false); }}
        />
      )}
    </div>
  );
}

export default function HeroSection() {
  const [isHoveringBuilders, setIsHoveringBuilders] = useState(false);
  const [isHoveringProblem, setIsHoveringProblem] = useState(false);
  const [isHoveringFigure, setIsHoveringFigure] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [problemMouseX, setProblemMouseX] = useState(0);
  const [figureMouseX, setFigureMouseX] = useState(0);
  const buildersRef = useRef<HTMLSpanElement>(null);
  const problemRef = useRef<HTMLSpanElement>(null);
  const figureRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
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
      {/* Background Lines - Desktop only */}
      <div className="hidden md:block">
        <BackgroundLines className="absolute inset-0 z-0" svgOptions={{ duration: 8 }} />
      </div>
      
      {/* Creative Background */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,hsl(var(--accent)/0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_0%_50%,hsl(var(--highlight)/0.06),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:80px_80px]" />
        
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
      
      {/* Constellation Field - z-index toggles above content when popup is active */}
      <motion.div 
        className={`absolute inset-0 ${popupActive ? 'z-[20]' : 'z-[2]'}`}
        style={{ y: orbitY }}
      >
        <ConstellationField onActiveChange={setPopupActive} />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-[1] sm:leading-[0.9] mb-4 md:mb-6 relative pointer-events-auto"
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
                {isHoveringBuilders && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: mouseX * 0.5 }}
                    transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 }, x: { duration: 0.1, ease: "easeOut" } }}
                    className="hidden md:block absolute -top-40 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                  >
                    <img src={catTypingGif} alt="Cat typing" className="max-w-48 max-h-40" />
                  </motion.div>
                )}
              </span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative pointer-events-auto"
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
                        animate={{ opacity: 1, scale: 1, y: 0, x: problemMouseX * 0.3 - 20 }}
                        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 }, x: { duration: 0.1, ease: "easeOut" } }}
                        className="hidden md:block absolute bottom-[90%] left-1/3 -translate-x-1/2 z-50 pointer-events-none"
                      >
                        <img src={fireBlazeGif} alt="Fire" className="w-auto h-auto max-w-[120px]" />
                      </motion.div>
                    )}
                  </span>
                  .
                </span>
              </span>
            </p>
            
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
                      animate={{ opacity: 1, scale: 1, y: 0, x: figureMouseX * 0.3 }}
                      transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 }, x: { duration: 0.1, ease: "easeOut" } }}
                      className="hidden md:block absolute -top-36 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    >
                      <img src="https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif" alt="Thinking" className="max-w-40 max-h-36" />
                    </motion.div>
                  )}
                </span>
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-20 pointer-events-auto"
          >
            <a
              href="https://calendar.app.google/XmdUw45c77LS4o417"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center gap-2 sm:gap-3 group"
            >
              Book a call
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
