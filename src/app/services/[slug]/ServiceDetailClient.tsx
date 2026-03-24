'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronDown,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { ServiceDetail } from '@/lib/service-data';
import { SERVICE_DETAILS } from '@/lib/service-data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-white/5 rounded-[16px] overflow-hidden bg-[#161616]"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left"
            aria-expanded={openIndex === i}
          >
            <span className="font-sans font-medium text-[#f0efe9] pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#c8ff00] shrink-0 transition-transform duration-300 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <p className="px-5 pb-5 text-[#a8a8a0] font-sans text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function ServiceDetailClient({
  service,
}: {
  service: ServiceDetail;
}) {
  const relatedServices = SERVICE_DETAILS.filter((s) =>
    service.relatedServices.includes(s.slug)
  );

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
            <Link href="/#services" className="hover:text-[#c8ff00] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#a8a8a0]">{service.title}</span>
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
              Our Services
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-[#f0efe9] leading-tight">
              {service.title}
            </h1>
            <p className="mt-4 text-xl text-[#a8a8a0] font-sans max-w-3xl">
              {service.tagline}
            </p>

            {/* Price & Timeline badges */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
                <DollarSign className="w-4 h-4 text-[#c8ff00]" />
                <span className="text-sm font-sans text-[#f0efe9]">
                  {service.priceRange}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
                <Clock className="w-4 h-4 text-[#c8ff00]" />
                <span className="text-sm font-sans text-[#f0efe9]">
                  {service.timeline}
                </span>
              </div>
            </div>

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

      {/* Description */}
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
                About This Service
              </h2>
              {service.description.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="text-[#a8a8a0] font-sans leading-relaxed mb-4"
                >
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Right: Features */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-serif text-[#f0efe9] mb-6">
                What&apos;s Included
              </h2>
              <div className="space-y-3">
                {service.features.map((feature) => (
                  <motion.div
                    key={feature}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#c8ff00] mt-0.5 shrink-0" />
                    <span className="text-[#f0efe9] font-sans text-sm">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            label="Common Questions"
            title="FAQ"
            subtitle={`Answers to common questions about ${service.title.toLowerCase()} projects.`}
          />
          <FAQAccordion faqs={service.faqs} />
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-24 px-6 bg-[#111111]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label="Explore More"
              title="Related Services"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rs) => (
                <Link key={rs.slug} href={`/services/${rs.slug}`}>
                  <Card className="group h-full flex flex-col cursor-pointer">
                    <h3 className="text-xl font-semibold text-[#f0efe9] font-sans">
                      {rs.title}
                    </h3>
                    <p className="mt-2 text-[#a8a8a0] font-sans text-sm leading-relaxed flex-1">
                      {rs.tagline}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[#c8ff00] text-sm font-sans">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#f0efe9] mb-4">
            Ready to Start Your {service.title} Project?
          </h2>
          <p className="text-[#a8a8a0] font-sans mb-8">
            Get a free, no-obligation quote from our team. Licensed, insured,
            and rated 4.9★ across Southern California.
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
