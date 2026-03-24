'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Hammer,
  Home,
  Paintbrush,
  Building2,
  PlusSquare,
  TreePine,
  Zap,
  DoorOpen,
  Compass,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { SERVICES } from '@/lib/constants';

const iconMap: Record<string, LucideIcon> = {
  Hammer,
  Home,
  Paintbrush,
  Building2,
  PlusSquare,
  TreePine,
  Zap,
  DoorOpen,
  Compass,
};

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
          title="Our Services"
          subtitle="Comprehensive construction solutions for residential and commercial projects across Southern California."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];

            return (
              <motion.div key={service.id} variants={cardVariants}>
                <Link href={`/services/${service.id}`}>
                  <Card className="group h-full flex flex-col cursor-pointer">
                    {/* Icon */}
                    <div className="mb-4">
                      {Icon && <Icon size={32} className="text-[#c8ff00]" />}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-[#f0efe9] font-sans">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-[#a8a8a0] font-sans text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-[#c8ff00] text-sm font-sans">
                      Learn more
                      <ArrowRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 transform"
                      />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
