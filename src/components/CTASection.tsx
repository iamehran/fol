import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section id="book" className="py-16 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-32 md:w-64 h-32 md:h-64 bg-primary border-[2px] md:border-[3px] border-foreground rotate-12 opacity-20" />
        <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-40 md:w-80 h-40 md:h-80 bg-accent border-[2px] md:border-[3px] border-foreground -rotate-12 opacity-20" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Main CTA Box */}
            <div className="card-brutal bg-foreground text-background p-6 md:p-12 lg:p-16">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-3 py-1.5 md:px-4 md:py-2 border-[2px] md:border-[3px] border-background bg-primary text-primary-foreground font-bold text-xs md:text-sm uppercase tracking-wider mb-6 md:mb-8"
              >
                Let's talk
              </motion.span>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Ready to build
                <span className="block text-primary text-2xl md:text-5xl lg:text-6xl">something real?</span>
              </h2>

              <p className="text-base md:text-xl text-background/70 max-w-xl mx-auto mb-8 md:mb-10">
                No pitches. No fluff. Just a real conversation about your project and how we can help.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="https://calendar.app.google/XmdUw45c77LS4o417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 md:gap-3 px-6 py-4 md:px-8 md:py-5 bg-primary text-primary-foreground font-bold text-base md:text-lg uppercase tracking-wider border-[2px] md:border-[3px] border-background transition-all duration-150 hover:bg-accent hover:text-accent-foreground group"
                  style={{ boxShadow: '4px 4px 0px hsl(var(--background))' }}
                >
                  Book your call now
                  <svg 
                    className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </motion.div>

              {/* Trust indicators */}
              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t-[2px] md:border-t-[3px] border-background/20">
                <p className="text-xs md:text-sm text-background/50 uppercase tracking-wider mb-3 md:mb-4">
                  Trusted by teams at
                </p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-background/40">
                  <span className="text-base md:text-xl font-bold">Startup Co</span>
                  <span className="text-base md:text-xl font-bold">TechCorp</span>
                  <span className="text-base md:text-xl font-bold">ScaleUp</span>
                  <span className="text-base md:text-xl font-bold">BuildFast</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
