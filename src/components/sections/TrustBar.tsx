'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { COMPANY } from '@/lib/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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
  {
    target: 523,
    suffix: '',
    prefix: '',
    label: 'Projects Completed',
    description: 'Residential, commercial & ADU builds across SoCal since 2011',
  },
  {
    target: 47,
    suffix: 'M',
    prefix: '$',
    label: 'Total Project Value',
    description: 'Managed and delivered across all service categories',
  },
  {
    target: 98,
    suffix: '%',
    prefix: '',
    label: 'On-Time Completion',
    description: 'We hit our deadlines. Period. Delays are documented and explained.',
  },
  {
    target: 73,
    suffix: '%',
    prefix: '',
    label: 'Referral Rate',
    description: 'Nearly 3 out of 4 clients come from referrals or repeat business',
  },
];

const TrustBar: React.FC = () => {
  return (
    <section id="trust" className="py-24 px-6 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Why Choose Us"
          title={<>Proven Track Record.<br /><span className="text-[#c8ff00]">Zero Surprises.</span></>}
          subtitle="Every number below is backed by real projects, real clients, and verifiable records."
        />

        {/* Stat Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card hover={false} className="text-center py-10 px-6">
                <div className="mb-3">
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#f0efe9] font-sans mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm text-[#a8a8a0] font-sans leading-relaxed max-w-xs mx-auto">
                  {stat.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* License Verification Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="bg-[#c8ff00]/5 border border-[#c8ff00]/20 rounded-[20px] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-2xl flex-shrink-0">
              &#x1F4CB;
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#f0efe9] font-sans">
                Verify Our License &mdash; {COMPANY.license}
              </h3>
              <p className="text-sm text-[#a8a8a0] font-sans mt-1 leading-relaxed">
                Click to verify directly on the California Contractors State License Board (CSLB) website
              </p>
            </div>

            {/* CTA */}
            <a
              href="https://www.cslb.ca.gov/onlineservices/checklicenseII/checklicense.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[12px] border border-[#c8ff00]/30 bg-[#c8ff00]/10 px-5 py-2.5 font-sans text-sm font-semibold text-[#c8ff00] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#c8ff00]/20 flex-shrink-0"
            >
              Verify on CSLB
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
