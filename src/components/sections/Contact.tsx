'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { COMPANY } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string(),
  serviceType: z.string(),
  address: z.string(),
  budget: z.string(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const inputClasses =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#f0efe9] placeholder:text-[#6a6a64] focus:outline-none focus:border-[#c8ff00] transition-colors duration-300 font-sans';

const SERVICE_OPTIONS = [
  'Full Home Remodel',
  'Custom ADU',
  'Painting',
  'Commercial',
  'Room Addition',
  'Outdoor Living',
  'Other',
];

const BUDGET_OPTIONS = [
  '$10k – $25k',
  '$25k – $50k',
  '$50k – $100k',
  '$100k – $250k',
  '$250k+',
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Contact: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSuccess(false);
    setIsError(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send');

      setIsSuccess(true);
      reset();
    } catch {
      setIsError(true);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Get Started"
          title="Get Your Free Quote"
          subtitle="Tell us about your project and we'll get back to you within 24 hours"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ---- Form (left) ---- */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <Card hover={false} className="p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className={inputClasses}
                    aria-label="Your Name"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={inputClasses}
                    aria-label="Email Address"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className={inputClasses}
                    aria-label="Phone Number"
                    {...register('phone')}
                  />
                </div>

                {/* Service Type */}
                <div>
                  <select
                    className={inputClasses}
                    aria-label="Service Type"
                    defaultValue=""
                    {...register('serviceType')}
                  >
                    <option value="" disabled>
                      Select Service Type
                    </option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Address */}
                <div>
                  <input
                    type="text"
                    placeholder="Property Address"
                    className={inputClasses}
                    aria-label="Property Address"
                    {...register('address')}
                  />
                </div>

                {/* Budget Range */}
                <div>
                  <select
                    className={inputClasses}
                    aria-label="Budget Range"
                    defaultValue=""
                    {...register('budget')}
                  >
                    <option value="" disabled>
                      Select Budget Range
                    </option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className={`${inputClasses} resize-none`}
                    aria-label="Message"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  aria-label="Send Message"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                {/* Status feedback */}
                {isSuccess && (
                  <p className="text-[#c8ff00] text-sm text-center font-sans">
                    Your message has been sent! We&apos;ll be in touch within 24 hours.
                  </p>
                )}
                {isError && (
                  <p className="text-red-400 text-sm text-center font-sans">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}
              </form>
            </Card>
          </motion.div>

          {/* ---- Info panel (right) ---- */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.15 }}
          >
            {/* Phone */}
            <Card hover={false}>
              <div className="flex items-center gap-4">
                <Phone size={24} className="text-[#c8ff00] shrink-0" />
                <div>
                  <a
                    href={`tel:${COMPANY.phone.replace(/\D/g, '')}`}
                    className="font-semibold text-[#f0efe9] hover:text-[#c8ff00] transition-colors duration-300 font-sans"
                  >
                    {COMPANY.phone}
                  </a>
                  <p className="text-sm text-[#6a6a64] font-sans">
                    Available Mon–Sat, 7am–7pm
                  </p>
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card hover={false}>
              <div className="flex items-center gap-4">
                <Mail size={24} className="text-[#c8ff00] shrink-0" />
                <div>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="font-semibold text-[#f0efe9] hover:text-[#c8ff00] transition-colors duration-300 font-sans"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </Card>

            {/* Address */}
            <Card hover={false}>
              <div className="flex items-center gap-4">
                <MapPin size={24} className="text-[#c8ff00] shrink-0" />
                <p className="text-[#f0efe9] font-sans">{COMPANY.address}</p>
              </div>
            </Card>

            {/* License */}
            <Card hover={false}>
              <div className="flex items-center gap-4">
                <Shield size={24} className="text-[#c8ff00] shrink-0" />
                <p className="text-[#f0efe9] font-sans">
                  Licensed &amp; Insured: {COMPANY.license}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
