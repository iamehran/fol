import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import figoutLogo from '@/assets/figout-logo-new.png';

const manifestoSections = [
  {
    label: '001',
    title: 'We are not an agency.',
    body: "We don\u2019t do retainers. We don\u2019t do \"discovery phases\" that last six months. We don\u2019t sit in meetings about meetings. We are builders. We show up, understand the problem, and ship the solution. That\u2019s it.",
    accent: 'bg-primary',
  },
  {
    label: '002',
    title: 'We figure it out.',
    body: "That\u2019s not a tagline \u2014 it\u2019s how we operate. Every project is a new puzzle. New tools, new constraints, new unknowns. We don\u2019t pretend to know everything. We just know how to learn fast, adapt faster, and deliver what works.",
    accent: 'bg-accent',
  },
  {
    label: '003',
    title: 'Automation is not a feature. It\u2019s a mindset.',
    body: "If a human is doing something a machine could do, that\u2019s a problem we solve. We connect systems, eliminate bottlenecks, and build workflows that run while you sleep. n8n, Zapier, Make, custom code \u2014 we use whatever gets the job done.",
    accent: 'bg-highlight',
  },
  {
    label: '004',
    title: 'We ship fast. Not sloppy \u2014 fast.',
    body: "Speed without quality is chaos. Quality without speed is irrelevant. We move at the pace the problem demands. Clean code, production-ready systems, and automations that don\u2019t break at 2 AM.",
    accent: 'bg-primary',
  },
  {
    label: '005',
    title: 'AI is a tool, not a personality.',
    body: "We use AI everywhere \u2014 Claude, GPT, Gemini, open-source models. But we don\u2019t worship it. AI accelerates our thinking, it doesn\u2019t replace it. The magic is in knowing when to automate and when to think.",
    accent: 'bg-accent',
  },
  {
    label: '006',
    title: 'We build for people who build.',
    body: "Our clients aren\u2019t looking for slide decks. They\u2019re founders, operators, and teams who need things to work. We speak their language: results, timelines, and systems that scale.",
    accent: 'bg-highlight',
  },
  {
    label: '007',
    title: 'No ego. No hierarchy. Just execution.',
    body: "We don\u2019t have account managers who play telephone. You talk to the people who build your thing. Ideas flow directly into code, automations, and shipped products. Zero friction.",
    accent: 'bg-primary',
  },
  {
    label: '008',
    title: 'The work speaks. Always.',
    body: "We don\u2019t need a 40-page case study to prove our value. We build it, you see it work, and the results do the talking. Every automation saved, every hour reclaimed, every system that just runs \u2014 that\u2019s our portfolio.",
    accent: 'bg-accent',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Manifesto() {
  return (
    <main className="noise-overlay bg-background min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b-[3px] border-foreground">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <img src={figoutLogo} alt="FigOut Labs" className="h-8 md:h-10 w-auto" />
          </Link>
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Manifesto
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-24 px-5 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 border-[2px] md:border-[3px] border-foreground bg-primary text-foreground font-bold text-xs md:text-sm uppercase tracking-wider shadow-brutal mb-6 md:mb-8">
              What we believe
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6 md:mb-8">
              This is how
              <br />
              we{' '}
              <span className="inline-block bg-accent text-accent-foreground px-3 md:px-5 py-1 border-[3px] border-foreground shadow-brutal -rotate-1">
                operate.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Not rules. Not a corporate values page nobody reads. These are the 
              principles that drive every line of code we write, every automation 
              we build, and every problem we solve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Sections */}
      <section className="pb-20 md:pb-32 px-5 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-6 md:space-y-10">
          {manifestoSections.map((section, i) => (
            <motion.div
              key={section.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="group"
            >
              <div className="relative p-5 md:p-8 bg-background border-[2px] md:border-[3px] border-foreground shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all duration-200">
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[4px] md:h-[5px] ${section.accent}`} />
                
                <div className="flex items-start gap-4 md:gap-6">
                  {/* Number */}
                  <div className={`shrink-0 w-12 h-12 md:w-16 md:h-16 ${section.accent} border-[2px] md:border-[3px] border-foreground flex items-center justify-center`}
                    style={{ boxShadow: '3px 3px 0px hsl(var(--foreground))' }}
                  >
                    <span className="text-[10px] md:text-xs font-black text-foreground tracking-wider">
                      {section.label}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-2 md:mb-3 tracking-tight leading-tight">
                      {section.title}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                </div>

                {/* Corner accent */}
                <div className={`absolute -bottom-[5px] -right-[5px] w-3 h-3 md:w-4 md:h-4 ${section.accent} border-[2px] border-foreground`} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pb-20 md:pb-32 px-5 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center border-[3px] border-foreground bg-foreground text-background p-8 md:p-16 shadow-brutal"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
              Still reading?
            </h2>
            <p className="text-base md:text-lg text-background/70 mb-6 md:mb-8 max-w-lg mx-auto">
              Good. You're our kind of people. Let's build something that matters.
            </p>
            <a
              href="https://calendar.app.google/XmdUw45c77LS4o417"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-foreground border-[3px] border-background font-black text-sm md:text-base uppercase tracking-wider hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
              style={{ boxShadow: '4px 4px 0px hsl(var(--accent))' }}
            >
              Let's talk →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[3px] border-foreground py-8 px-5 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={figoutLogo} alt="FigOut Labs" className="h-6 md:h-8 w-auto" />
            <span className="font-bold text-sm">FigOut Labs</span>
          </Link>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FigOut Labs
          </p>
        </div>
      </footer>
    </main>
  );
}
