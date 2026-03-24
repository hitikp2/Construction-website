'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Award,
  Star,
  Clock,
  CheckCircle,
  FileCheck,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const stats = [
  { target: 523, suffix: '', label: 'Projects Completed' },
  { target: 47, prefix: '$', suffix: 'M', label: 'Project Value' },
  { target: 98, suffix: '%', label: 'On-Time Delivery' },
  { target: 100, suffix: '%', label: 'Permit Approval' },
];

const trustItems = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description:
      'California State Contractors License (CSLB). Full general liability insurance and workers compensation coverage.',
  },
  {
    icon: FileCheck,
    title: 'Bonded',
    description:
      'Financially bonded for your protection on every project. Your investment is secure from start to finish.',
  },
  {
    icon: Star,
    title: '4.9★ Rated',
    description:
      '127 five-star reviews across Google, Yelp, and HomeAdvisor. Consistently rated among the top contractors in SoCal.',
  },
  {
    icon: Clock,
    title: '15+ Years Experience',
    description:
      'Over 15 years of construction experience across residential, commercial, and ADU projects in Southern California.',
  },
  {
    icon: Award,
    title: 'Industry Certified',
    description:
      'NARI member, EPA Lead-Safe certified, OSHA compliant, and Energy Star partner. We meet the highest industry standards.',
  },
  {
    icon: CheckCircle,
    title: '5-Year Warranty',
    description:
      'Every project backed by our 5-year workmanship warranty. Material warranties up to 50 years from manufacturers.',
  },
];

const TrustBar: React.FC = () => {
  return (
    <section id="trust" className="py-24 px-6 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Why Us"
          title="Why Clients Trust Us"
          subtitle="Licensed, bonded, insured, and backed by hundreds of five-star reviews."
        />

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold font-mono text-[#c8ff00]">
                <AnimatedCounter
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-2 text-sm text-[#a8a8a0] font-sans">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Items Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={itemVariants}>
                <Card className="h-full">
                  <Icon className="w-8 h-8 text-[#c8ff00] mb-4" />
                  <h3 className="text-lg font-semibold text-[#f0efe9] font-sans mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#a8a8a0] font-sans text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
