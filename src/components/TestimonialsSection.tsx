import { motion } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechFlow',
    quote: 'FigOut Labs automated our entire lead qualification process. What took our team 20 hours a week now runs on autopilot. These guys just get it done.',
    type: 'text',
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder, GrowthHQ',
    quote: 'Finally, a team that speaks our language. No BS, no endless meetings. They built our entire funnel in 2 weeks and it actually converts.',
    type: 'text',
  },
  {
    name: 'Emily Rodriguez',
    role: 'COO, ScaleUp Agency',
    quote: 'The training they provided changed how we think about automation. Our team is now self-sufficient and we\'ve 3x\'d our output.',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    name: 'David Park',
    role: 'Director, InnovateLabs',
    quote: 'We came with a messy workflow and they delivered a clean, scalable system. True "figure it out" energy. Highly recommend.',
    type: 'text',
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group ${testimonial.type === 'video' ? 'md:col-span-2' : ''}`}
    >
      <div className="card-brutal h-full flex flex-col">
        {testimonial.type === 'video' && (
          <div className="relative mb-4 aspect-video border-[3px] border-foreground bg-muted overflow-hidden">
            {isVideoPlaying ? (
              <iframe
                src={`${testimonial.videoUrl}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="w-full h-full flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 transition-colors"
              >
                <div className="w-20 h-20 bg-primary border-[3px] border-foreground shadow-brutal flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>
        )}

        <blockquote className="text-lg md:text-xl mb-6 flex-1">
          "{testimonial.quote}"
        </blockquote>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent border-[3px] border-foreground flex items-center justify-center font-bold text-accent-foreground">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary border-y-[3px] border-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 border-[3px] border-foreground bg-highlight text-foreground font-bold text-sm uppercase tracking-wider shadow-brutal mb-6">
            Real Results
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Don't take our word
            <span className="block text-stroke">for it</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Here's what happens when you work with people who actually deliver.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}