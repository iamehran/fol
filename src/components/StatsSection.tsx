import { motion } from 'framer-motion';

const stats = [
  { value: '50+', label: 'Projects Shipped', accent: 'bg-primary' },
  { value: '3x', label: 'Avg. Conversion Lift', accent: 'bg-accent' },
  { value: '<2wk', label: 'Time to Launch', accent: 'bg-highlight' },
  { value: '100%', label: 'Client Retention', accent: 'bg-primary' },
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 border-y-[3px] border-foreground bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-block ${stat.accent} border-[3px] border-foreground shadow-brutal px-6 py-4 mb-4`}>
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm md:text-base font-semibold uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
