'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronRight,
  MapPin,
  Star,
  Wrench,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { AreaDetail } from '@/lib/area-data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function AreaDetailClient({ area }: { area: AreaDetail }) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-28 pb-4 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm font-sans text-[#6a6a64]">
            <Link href="/" className="hover:text-[#c8ff00] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/#areas" className="hover:text-[#c8ff00] transition-colors">
              Service Areas
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#a8a8a0]">{area.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 text-sm font-medium tracking-widest uppercase text-[#c8ff00] font-sans">
              Service Area
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-[#f0efe9] leading-tight">
              {area.name}
            </h1>
            <p className="mt-4 text-xl text-[#a8a8a0] font-sans max-w-3xl">
              Licensed construction and remodeling services throughout{' '}
              {area.name}. Trusted by homeowners and businesses across the
              region.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/#contact">
                Get Free Quote
              </Button>
              <Button variant="secondary" size="lg" href="/#calculator">
                Estimate Cost
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description + Neighborhoods */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold font-serif text-[#f0efe9] mb-6">
                Construction Services in {area.name}
              </h2>
              {area.description.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="text-[#a8a8a0] font-sans leading-relaxed mb-4"
                >
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Right: Neighborhoods */}
            <div>
              <h2 className="text-3xl font-bold font-serif text-[#f0efe9] mb-6">
                <MapPin className="inline w-7 h-7 text-[#c8ff00] mr-2 -mt-1" />
                Cities We Serve
              </h2>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {area.neighborhoods.map((n) => (
                  <motion.span
                    key={n}
                    variants={itemVariants}
                    className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-[#f0efe9] font-sans"
                  >
                    {n}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Projects */}
      <section className="py-24 px-6 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Most Requested"
            title={`Popular Projects in ${area.name}`}
          />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {area.popularProjects.map((project) => (
              <motion.div key={project} variants={itemVariants}>
                <Card className="flex items-center gap-4">
                  <Wrench className="w-6 h-6 text-[#c8ff00] shrink-0" />
                  <span className="font-sans font-medium text-[#f0efe9]">
                    {project}
                  </span>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Permit Info */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            label="Local Knowledge"
            title="Permit Information"
          />
          <Card hover={false}>
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-[#c8ff00] mt-1 shrink-0" />
              <p className="text-[#a8a8a0] font-sans leading-relaxed">
                {area.permitInfo}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonial */}
      {area.testimonial && (
        <section className="py-24 px-6 bg-[#111111]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#ffd60a] text-[#ffd60a]"
                />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-[#f0efe9] font-serif italic leading-relaxed mb-6">
              &ldquo;{area.testimonial.quote}&rdquo;
            </blockquote>
            <p className="font-sans font-semibold text-[#f0efe9]">
              {area.testimonial.name}
            </p>
            <p className="font-sans text-sm text-[#a8a8a0]">
              {area.testimonial.project}
            </p>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#f0efe9] mb-4">
            Ready to Build in {area.name}?
          </h2>
          <p className="text-[#a8a8a0] font-sans mb-8">
            Get a free, no-obligation quote from our local team. Licensed,
            insured, and rated 4.9★.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" href="/#contact">
              Get Free Quote
            </Button>
            <Button variant="secondary" size="lg" href="tel:8005551234">
              Call (800) 555-1234
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
