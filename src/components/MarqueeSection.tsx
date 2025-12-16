import { motion } from 'framer-motion';

const words = [
  'DESIGN',
  '●',
  'DEVELOP',
  '●',
  'DEPLOY',
  '●',
  'AUTOMATE',
  '●',
];

export default function MarqueeSection() {
  return (
    <section className="py-8 border-y-[3px] border-foreground bg-foreground text-background overflow-hidden transform -rotate-1">
      <div className="flex">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: [0, -960] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 15,
              ease: "linear",
            },
          }}
        >
          {[...words, ...words, ...words, ...words].map((word, index) => (
            <span
              key={index}
              className="text-4xl md:text-5xl font-bold uppercase tracking-tight"
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}