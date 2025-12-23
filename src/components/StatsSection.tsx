import { motion } from 'framer-motion';

const stats = [
  { value: '100+', label: 'Automations Built', accent: 'bg-primary' },
  { value: '50+', label: 'Happy Clients', accent: 'bg-accent' },
  { value: '10k+', label: 'Hours Saved', accent: 'bg-highlight' },
  { value: '∞', label: 'Problems Solved', accent: 'bg-primary' },
];

export default function StatsSection() {
  return (
    <section className="py-12 md:py-24 border-y-[2px] md:border-y-[3px] border-foreground bg-background">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-block ${stat.accent} border-[2px] md:border-[3px] border-foreground shadow-brutal px-4 py-3 md:px-6 md:py-4 mb-3 md:mb-4`}>
                <span className="text-2xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">
                  {stat.value}
                </span>
              </div>
              <p className="text-xs md:text-base font-semibold uppercase tracking-wider leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}