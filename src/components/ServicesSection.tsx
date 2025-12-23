import { motion } from 'framer-motion';

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'AI Automation',
    description: 'End-to-end automation with n8n, Zapier, Make.com. We build systems that work while you sleep.',
    color: 'bg-primary',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Web Development',
    description: 'Production-grade web apps that scale. Our team builds systems businesses rely on daily.',
    color: 'bg-accent',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Funnel Building',
    description: 'GoHighLevel, ClickFunnels, custom builds. We create funnels that convert visitors into customers.',
    color: 'bg-highlight',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Training & Consulting',
    description: 'We train your team on AI systems and processes. Knowledge transfer that sticks.',
    color: 'bg-primary',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Workflow Audits',
    description: 'We audit your existing workflows and websites. Find the gaps, fix the leaks, optimize everything.',
    color: 'bg-accent',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Video Editing',
    description: 'Professional video editing that tells your story. From raw footage to polished content.',
    color: 'bg-highlight',
  },
];

export default function ServicesSection() {
  return (
    <section id="what-we-do" className="py-16 md:py-32 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10 md:mb-16"
        >
          <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 border-[2px] md:border-[3px] border-foreground bg-accent text-accent-foreground font-bold text-xs md:text-sm uppercase tracking-wider shadow-brutal mb-4 md:mb-6">
            What we do
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Got a problem?
            <span className="block text-stroke text-2xl md:text-5xl lg:text-6xl">We'll figure it out</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground">
            Name a tool, we build on it. Name a problem, we solve it. That's the FigOut way.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 4, y: 4 }}
              className="group"
            >
              <div className="card-brutal h-full transition-all duration-150 hover:shadow-none hover:translate-x-1 hover:translate-y-1 p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 ${service.color} border-[2px] md:border-[3px] border-foreground flex items-center justify-center text-primary-foreground`}>
                    <div className="w-6 h-6 md:w-8 md:h-8">
                      {service.icon}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg md:text-2xl font-bold mb-1.5 md:mb-2 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}