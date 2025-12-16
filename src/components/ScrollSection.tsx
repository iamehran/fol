import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    number: '01',
    title: 'Strategy',
    description: 'We dive deep into your problem space. No assumptions. Just sharp analysis and a clear roadmap.',
    accent: 'bg-primary',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Interfaces that stop thumbs and start conversations. Beautiful, functional, unforgettable.',
    accent: 'bg-accent',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Clean code that scales. Fast, secure, and built to last. No technical debt. No shortcuts.',
    accent: 'bg-highlight',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Ship fast, iterate faster. We get you live and optimize in real-time. Results speak.',
    accent: 'bg-primary',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [index % 2 === 0 ? -100 : 100, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, x }}
      className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
    >
      {/* Number */}
      <div className={`shrink-0 w-24 h-24 md:w-32 md:h-32 ${feature.accent} border-[3px] border-foreground shadow-brutal-lg flex items-center justify-center`}>
        <span className="text-4xl md:text-5xl font-bold text-primary-foreground">
          {feature.number}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {feature.title}
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
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

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 border-[3px] border-foreground bg-secondary text-foreground font-bold text-sm uppercase tracking-wider shadow-brutal mb-6">
            How we work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            From chaos to
            <span className="block text-stroke">clarity</span>
          </h2>
        </motion.div>

        {/* Progress Line */}
        <div className="absolute left-1/2 top-48 bottom-24 w-1 bg-muted hidden md:block">
          <motion.div
            className="w-full bg-foreground origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Features */}
        <div className="space-y-24 md:space-y-32 relative">
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
