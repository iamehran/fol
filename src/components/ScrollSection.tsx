import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dig into your problem. Understand your workflow, identify bottlenecks, map out opportunities.',
    accent: 'bg-primary',
    icon: '🔍',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'No fluff. We build a clear roadmap with the right tools - n8n, Zapier, Make, or custom solutions.',
    accent: 'bg-accent',
    icon: '🧭',
  },
  {
    number: '03',
    title: 'Build',
    description: 'We ship fast. Clean automations, production-ready code, systems that actually work.',
    accent: 'bg-highlight',
    icon: '⚡',
  },
  {
    number: '04',
    title: 'Optimize',
    description: 'Launch is just the start. We monitor, tweak, and scale until the results speak for themselves.',
    accent: 'bg-primary',
    icon: '🚀',
  },
];

// Clean arrow connector between steps
function StepConnector({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const arrowOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  const colors = ["hsl(75 100% 50%)", "hsl(330 100% 60%)", "hsl(200 100% 50%)"];
  const color = colors[index % colors.length];

  return (
    <div ref={ref} className="relative h-12 md:h-20 flex items-center justify-center">
      {/* Vertical line */}
      <div className="relative w-[3px] h-full bg-foreground/10 rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full rounded-full origin-top"
          style={{ 
            scaleY, 
            height: '100%',
            backgroundColor: color,
          }}
        />
      </div>
      {/* Arrow head */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
        style={{ opacity: arrowOpacity }}
      >
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path d="M1 1L8 8L15 1" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -30 : 30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, x }}
      className="relative"
    >
      {/* Main card */}
      <div className={`relative flex flex-row items-start gap-4 md:gap-8 p-4 md:p-8 bg-background border-[2px] md:border-[3px] border-foreground shadow-brutal`}>
        {/* Number badge */}
        <div className="relative shrink-0">
          <div className={`w-14 h-14 md:w-20 md:h-20 ${feature.accent} border-[2px] md:border-[3px] border-foreground shadow-brutal flex items-center justify-center`}>
            <span className="text-xl md:text-3xl font-bold text-primary-foreground">
              {feature.number}
            </span>
          </div>
          {/* Floating emoji */}
          <motion.span
            className="absolute -top-2 -right-2 md:-top-3 md:-right-3 text-lg md:text-2xl"
            animate={{ y: [0, -5, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          >
            {feature.icon}
          </motion.span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
            {feature.title}
          </h3>
          <p className="text-sm md:text-lg text-muted-foreground max-w-md leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Decorative corner accent */}
        <div className={`absolute -top-1 -right-1 w-4 h-4 md:w-6 md:h-6 ${feature.accent} border-[2px] border-foreground hidden md:block`} />
      </div>
    </motion.div>
  );
}

export default function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Vertical progress line
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-16 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-20"
        >
          <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 border-[2px] md:border-[3px] border-foreground bg-secondary text-foreground font-bold text-xs md:text-sm uppercase tracking-wider shadow-brutal mb-4 md:mb-6">
            How we work
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            From chaos to
            <span className="block text-stroke text-2xl md:text-5xl lg:text-6xl">clarity</span>
          </h2>
        </motion.div>

        {/* Steps with connectors */}
        <div className="max-w-2xl mx-auto relative">
          {/* Background progress line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-foreground/5 -translate-x-1/2 hidden md:block" />
          <motion.div 
            className="absolute left-1/2 top-0 w-[2px] bg-primary -translate-x-1/2 origin-top hidden md:block"
            style={{ height: lineHeight }}
          />
          
          {features.map((feature, index) => (
            <div key={feature.number}>
              <FeatureCard feature={feature} index={index} />
              {index < features.length - 1 && (
                <StepConnector index={index} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
