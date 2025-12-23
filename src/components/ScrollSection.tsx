import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dig into your problem. Understand your workflow, identify bottlenecks, map out opportunities.',
    accent: 'bg-primary',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'No fluff. We build a clear roadmap with the right tools - n8n, Zapier, Make, or custom solutions.',
    accent: 'bg-accent',
  },
  {
    number: '03',
    title: 'Build',
    description: 'We ship fast. Clean automations, production-ready code, systems that actually work.',
    accent: 'bg-highlight',
  },
  {
    number: '04',
    title: 'Optimize',
    description: 'Launch is just the start. We monitor, tweak, and scale until the results speak for themselves.',
    accent: 'bg-primary',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={`relative flex flex-row items-start gap-4 md:gap-10 p-4 md:p-8 bg-background border-[2px] md:border-[3px] border-foreground shadow-brutal ${
        index % 2 === 1 ? 'md:ml-auto' : ''
      }`}
    >
      {/* Number */}
      <div className={`shrink-0 w-14 h-14 md:w-20 md:h-20 ${feature.accent} border-[2px] md:border-[3px] border-foreground shadow-brutal flex items-center justify-center`}>
        <span className="text-xl md:text-3xl font-bold text-primary-foreground">
          {feature.number}
        </span>
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
    </motion.div>
  );
}

export default function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

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

        {/* Progress Line - Hidden completely to avoid overlap */}

        {/* Features */}
        <div className="space-y-4 md:space-y-12 max-w-2xl mx-auto relative">
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}