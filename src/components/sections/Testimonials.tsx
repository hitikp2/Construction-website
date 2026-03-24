'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { TESTIMONIALS } from '@/lib/constants';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const floatTransition = (delay: number) => ({
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay,
  },
});

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Reviews"
          title="What Our Clients Say"
          subtitle="Trusted by homeowners across Southern California"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              animate={floatTransition(index * 0.5)}
            >
              <Card className="h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="#ffd60a"
                      stroke="#ffd60a"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#a8a8a0] mt-4 italic leading-relaxed font-sans flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Divider + author */}
                <div className="border-t border-white/5 mt-6 pt-4">
                  <p className="font-semibold text-[#f0efe9] font-sans">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#6a6a64] font-sans">
                    {testimonial.projectType} &middot; {testimonial.location}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
