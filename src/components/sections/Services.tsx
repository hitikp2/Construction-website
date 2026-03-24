'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SERVICES } from '@/lib/constants';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="What We Do"
          title="Full-Service Construction & Remodeling"
          subtitle="Published pricing. No hidden fees. Every quote is all-inclusive — if the scope doesn't change, neither does the price."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map((service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <Link href={`/services/${service.id}`}>
                <div className="group h-full flex flex-col bg-[#161616] border border-white/5 rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c8ff00]/20 hover:shadow-[0_8px_30px_rgba(200,255,0,0.1)] cursor-pointer">
                  {/* Emoji icon */}
                  <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-2xl">
                    {service.emoji}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[#f0efe9] font-sans">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-[#a8a8a0] font-sans text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Price + Arrow row */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#c8ff00] font-mono">
                      {service.startingPrice}
                    </span>
                    <div className="w-9 h-9 flex items-center justify-center rounded-full border border-[#c8ff00]/30 bg-[#c8ff00]/10 text-[#c8ff00] transition-all duration-300 group-hover:bg-[#c8ff00] group-hover:text-black">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
