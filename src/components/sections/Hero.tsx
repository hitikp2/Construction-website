'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Button } from '@/components/ui/Button';

const floatingCards = [
  {
    title: 'Hollywood Hills Remodel',
    location: 'Los Angeles, CA',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    className: 'top-[15%] right-[8%] animate-float',
  },
  {
    title: 'Modern Detached ADU',
    location: 'Irvine, CA',
    gradient: 'linear-gradient(135deg, #0a3d2e 0%, #145a3e 50%, #1e7a50 100%)',
    className: 'top-[45%] right-[2%] animate-float-delayed',
  },
  {
    title: 'Resort-Style Outdoor Kitchen',
    location: 'Corona, CA',
    gradient: 'linear-gradient(135deg, #3e2a0a 0%, #5c3d10 50%, #7a5018 100%)',
    className: 'bottom-[20%] right-[12%] animate-float-slow',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="animated-grid absolute inset-0" />

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[1]" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Accent badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-sans text-[#a8a8a0]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8ff00] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8ff00]" />
                </span>
                Premium Construction Services
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold font-serif text-[#f0efe9] leading-[1.1] tracking-tight"
            >
              Building SoCal&apos;s{' '}
              <span className="text-[#c8ff00]">Future</span>, Today
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-xl text-[#a8a8a0] font-sans max-w-xl leading-relaxed"
            >
              From custom ADUs to full-scale remodels, we deliver exceptional
              craftsmanship across Southern California.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button variant="primary" size="lg" href="#contact" aria-label="Get a free quote">
                Get Free Quote
              </Button>
              <Button variant="secondary" size="lg" href="#portfolio" aria-label="View our work">
                View Our Work
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="mt-14 grid grid-cols-3 gap-8"
            >
              <div>
                <AnimatedCounter target={500} suffix="+" />
                <p className="mt-2 text-sm text-[#a8a8a0] font-sans">
                  Projects Completed
                </p>
              </div>
              <div>
                <AnimatedCounter target={15} suffix="+" />
                <p className="mt-2 text-sm text-[#a8a8a0] font-sans">
                  Years Experience
                </p>
              </div>
              <div>
                <AnimatedCounter target={4.9} suffix="★" />
                <p className="mt-2 text-sm text-[#a8a8a0] font-sans">
                  Client Rating
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Floating cards (desktop only) */}
          <div className="hidden lg:block relative h-[600px]">
            {floatingCards.map((card) => (
              <div
                key={card.title}
                className={`absolute w-64 ${card.className}`}
              >
                <div
                  className="rounded-[20px] border border-white/5 p-5 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  style={{ background: card.gradient }}
                >
                  <div className="h-28 rounded-[12px] bg-white/5 mb-4" />
                  <h3 className="text-[#f0efe9] font-semibold font-sans text-sm">
                    {card.title}
                  </h3>
                  <p className="text-[#6a6a64] text-xs font-sans mt-1">
                    {card.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
