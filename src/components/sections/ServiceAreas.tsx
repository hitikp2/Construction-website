'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { SERVICE_AREAS } from '@/lib/constants';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
};

const ServiceAreas: React.FC = () => {
  return (
    <section id="areas" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Where We Work"
          title="Serving All of Southern California"
          subtitle="Licensed and insured across every major Southern California county"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_AREAS.map((area, i) => {
            const slug = area.name
              .toLowerCase()
              .replace(/ county$/, '')
              .replace(/\s+/g, '-');

            return (
              <motion.div
                key={area.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={cardVariants}
              >
                <Link href={`/areas/${slug}`}>
                  <Card className="group cursor-pointer">
                    <MapPin className="w-6 h-6 text-[#c8ff00]" />
                    <h3 className="text-xl font-semibold text-[#f0efe9] mt-3 font-sans">
                      {area.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {area.cities.map((city) => (
                        <span
                          key={city}
                          className="bg-white/5 px-3 py-1 rounded-full text-sm text-[#a8a8a0]"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[#c8ff00] text-sm font-sans">
                      View area details
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
