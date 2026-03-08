import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dig into your problem. Understand your workflow, identify bottlenecks, map out opportunities.',
    accent: 'bg-primary',
    accentColor: 'hsl(75 100% 50%)',
    icon: '🔍',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'No fluff. We build a clear roadmap with the right tools - n8n, Zapier, Make, or custom solutions.',
    accent: 'bg-accent',
    accentColor: 'hsl(330 100% 60%)',
    icon: '🧭',
  },
  {
    number: '03',
    title: 'Build',
    description: 'We ship fast. Clean automations, production-ready code, systems that actually work.',
    accent: 'bg-highlight',
    accentColor: 'hsl(200 100% 50%)',
    icon: '⚡',
  },
  {
    number: '04',
    title: 'Optimize',
    description: 'Launch is just the start. We monitor, tweak, and scale until the results speak for themselves.',
    accent: 'bg-primary',
    accentColor: 'hsl(75 100% 50%)',
    icon: '🚀',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <div ref={ref} className="relative">
      {/* Arrow connector ABOVE the card (skip first) */}
      {index > 0 && (
        <div className="flex justify-center py-3 md:py-5">
          <motion.div
            className="flex flex-col items-center gap-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Dashed line */}
            <motion.div 
              className="w-[3px] h-8 md:h-14"
              style={{ 
                backgroundImage: `repeating-linear-gradient(to bottom, ${features[index - 1].accentColor} 0px, ${features[index - 1].accentColor} 6px, transparent 6px, transparent 12px)`,
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            {/* Arrow triangle */}
            <svg width="20" height="12" viewBox="0 0 20 12" className="-mt-[1px]">
              <polygon 
                points="10,12 0,0 20,0" 
                fill={features[index - 1].accentColor}
              />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Card */}
      <motion.div
        style={{ opacity, y }}
        className="relative group"
      >
        <div className="relative p-5 md:p-8 bg-background border-[2px] md:border-[3px] border-foreground shadow-brutal">
          {/* Top bar accent */}
          <div className={`absolute top-0 left-0 right-0 h-[4px] md:h-[5px] ${feature.accent}`} />
          
          <div className="flex items-start gap-4 md:gap-6">
            {/* Number + icon */}
            <div className="relative shrink-0">
              <div className={`w-14 h-14 md:w-[72px] md:h-[72px] ${feature.accent} border-[2px] md:border-[3px] border-foreground flex items-center justify-center`}
                style={{ boxShadow: '4px 4px 0px hsl(var(--foreground))' }}
              >
                <span className="text-xl md:text-3xl font-black text-foreground">
                  {feature.number}
                </span>
              </div>
              <motion.span
                className="absolute -top-3 -right-3 text-lg md:text-xl"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
              >
                {feature.icon}
              </motion.span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5 md:mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
                {feature.description}
              </p>
            </div>
          </div>

          {/* Corner square accent */}
          <div 
            className={`absolute -bottom-[6px] -right-[6px] w-3 h-3 md:w-4 md:h-4 ${feature.accent} border-[2px] border-foreground`}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function ScrollSection() {
  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
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

        {/* Steps */}
        <div className="max-w-2xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
