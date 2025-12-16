import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section id="book" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary border-[3px] border-foreground rotate-12 opacity-20" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent border-[3px] border-foreground -rotate-12 opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Main CTA Box */}
            <div className="card-brutal bg-foreground text-background p-8 md:p-12 lg:p-16">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-2 border-[3px] border-background bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider mb-8"
              >
                Let's talk
              </motion.span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Ready to build
                <span className="block text-primary">something real?</span>
              </h2>

              <p className="text-lg md:text-xl text-background/70 max-w-xl mx-auto mb-10">
                No pitches. No fluff. Just a real conversation about your project and how we can help.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-5 bg-primary text-primary-foreground font-bold text-lg uppercase tracking-wider border-[3px] border-background transition-all duration-150 hover:bg-accent hover:text-accent-foreground group"
                  style={{ boxShadow: '6px 6px 0px hsl(var(--background))' }}
                >
                  Book your call now
                  <svg 
                    className="w-6 h-6 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </motion.div>

              {/* Trust indicators */}
              <div className="mt-12 pt-8 border-t-[3px] border-background/20">
                <p className="text-sm text-background/50 uppercase tracking-wider mb-4">
                  Trusted by teams at
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-background/40">
                  <span className="text-xl font-bold">Startup Co</span>
                  <span className="text-xl font-bold">TechCorp</span>
                  <span className="text-xl font-bold">ScaleUp</span>
                  <span className="text-xl font-bold">BuildFast</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
