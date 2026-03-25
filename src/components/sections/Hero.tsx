'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Star } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Button } from '@/components/ui/Button';
import { COMPANY, phoneHref } from '@/lib/constants';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Review ratings data                                                */
/* ------------------------------------------------------------------ */

const reviewPlatforms = [
  { name: 'Google', rating: '4.9', count: 127 },
  { name: 'Yelp', rating: '5.0', count: 43 },
  { name: 'BBB', rating: 'A+', count: null },
  { name: 'Houzz', rating: '4.8', count: 89 },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Booking badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-sans text-[#a8a8a0]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8ff00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8ff00]" />
              </span>
              Now Booking &mdash; Spring &amp; Summer 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold font-serif text-[#f0efe9] leading-[1.1] tracking-tight"
          >
            Building SoCal&apos;s{' '}
            <br className="hidden md:block" />
            <span className="text-[#c8ff00] italic">Future, Today.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-[#a8a8a0] font-sans max-w-2xl leading-relaxed"
          >
            From full-home remodels and custom ADUs to commercial build-outs
            &mdash; AI-powered precision meets decades of craftsmanship across
            Los Angeles, San Bernardino, Orange County, and beyond.
          </motion.p>

          {/* Review ratings — compact 2x2 grid */}
          <motion.div
            variants={itemVariants}
            className="mt-8 inline-grid grid-cols-2 gap-x-px gap-y-px rounded-xl overflow-hidden border border-white/5"
          >
            {reviewPlatforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-2 bg-white/[0.03] px-4 py-2.5"
              >
                <span className="text-sm text-[#a8a8a0] font-sans font-medium whitespace-nowrap">
                  {platform.name}
                </span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-[#c8ff00] text-[#c8ff00]"
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#f0efe9] font-sans">
                  {platform.rating}
                </span>
                {platform.count && (
                  <span className="text-xs text-[#6a6a64] font-sans">
                    ({platform.count})
                  </span>
                )}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button variant="primary" size="lg" href="#calculator" aria-label="Get instant estimate">
              Get Instant Estimate &rarr;
            </Button>
            <Button variant="secondary" size="lg" href="#ai-tools" aria-label="Try AI Visualizer">
              Try AI Visualizer
            </Button>
            <a
              href={phoneHref(COMPANY.phone)}
              className="inline-flex items-center gap-2 rounded-[12px] border border-white/20 px-6 py-3.5 font-sans text-sm text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-[#c8ff00] hover:text-[#c8ff00]"
              aria-label="Call now"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            <div>
              <AnimatedCounter target={523} />
              <p className="mt-2 text-xs uppercase tracking-widest text-[#a8a8a0] font-sans">
                Projects Completed
              </p>
            </div>
            <div>
              <AnimatedCounter target={47} prefix="$" suffix="M+" />
              <p className="mt-2 text-xs uppercase tracking-widest text-[#a8a8a0] font-sans">
                Total Project Value
              </p>
            </div>
            <div>
              <AnimatedCounter target={15} suffix="+" />
              <p className="mt-2 text-xs uppercase tracking-widest text-[#a8a8a0] font-sans">
                Years Licensed
              </p>
            </div>
            <div>
              <AnimatedCounter target={98} suffix="%" />
              <p className="mt-2 text-xs uppercase tracking-widest text-[#a8a8a0] font-sans">
                On-Time Delivery
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
