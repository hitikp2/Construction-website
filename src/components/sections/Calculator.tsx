'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  PROJECT_TYPES,
  COUNTY_MULTIPLIERS,
  calculateEstimate,
  type EstimateResult,
} from '@/lib/pricing';

// ---------------------------------------------------------------------------
// Zod Schema
// ---------------------------------------------------------------------------

const calculatorSchema = z.object({
  projectType: z.string().min(1, 'Please select a project type'),
  tier: z.enum(['Standard', 'Mid-Range', 'Premium']),
  sqft: z.number().min(50, 'Minimum 50 sq ft').max(50000, 'Maximum 50,000 sq ft'),
  county: z.string().min(1, 'Please select a county'),
  timeline: z.enum(['Flexible', '3 Months', 'Rush']),
  permits: z.boolean(),
});

type CalculatorFormValues = z.infer<typeof calculatorSchema>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

const counties = Object.keys(COUNTY_MULTIPLIERS);

const tiers: Array<{ value: CalculatorFormValues['tier']; label: string; description: string }> = [
  { value: 'Standard', label: 'Standard', description: 'Quality essentials' },
  { value: 'Mid-Range', label: 'Mid-Range', description: 'Best value' },
  { value: 'Premium', label: 'Premium', description: 'Luxury finishes' },
];

const inputStyles =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c8ff00] focus:outline-none transition-colors duration-200 font-sans';
const labelStyles = 'text-sm text-[#a8a8a0] mb-2 block font-sans';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Calculator: React.FC = () => {
  const [result, setResult] = useState<EstimateResult | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      projectType: '',
      tier: 'Mid-Range',
      sqft: 500,
      county: '',
      timeline: 'Flexible',
      permits: false,
    },
  });

  const selectedTier = watch('tier');

  const onSubmit = (data: CalculatorFormValues) => {
    const estimate = calculateEstimate({
      projectType: data.projectType,
      tier: data.tier,
      sqft: data.sqft,
      county: data.county,
      timeline: data.timeline,
      permits: data.permits,
    });
    setResult(estimate);
  };

  // Breakdown rows — only show rows with value > 0
  const breakdownRows = result
    ? [
        { label: 'Materials', amount: result.breakdown.materials },
        { label: 'Labor', amount: result.breakdown.labor },
        { label: 'Project Management', amount: result.breakdown.management },
        { label: 'Design', amount: result.breakdown.design },
        { label: 'Permits', amount: result.breakdown.permits },
        { label: 'Rush Fee', amount: result.breakdown.rushFee },
      ].filter((row) => row.amount > 0)
    : [];

  return (
    <section id="calculator" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Pricing"
          title="Instant Project Estimator"
          subtitle="Ballpark estimate in 30 seconds — based on real SoCal project data. For an exact guaranteed quote, we'll schedule a free on-site visit."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ----------------------------------------------------------------- */}
          {/* Form */}
          {/* ----------------------------------------------------------------- */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className={labelStyles}>
                Project Type
              </label>
              <select id="projectType" {...register('projectType')} className={inputStyles}>
                <option value="" disabled>
                  Select a project type
                </option>
                {PROJECT_TYPES.map((pt) => (
                  <option key={pt.id} value={pt.id} className="bg-[#161616]">
                    {pt.name}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="text-red-400 text-xs mt-1">{errors.projectType.message}</p>
              )}
            </div>

            {/* Quality Tier */}
            <div>
              <span className={labelStyles}>Quality Tier</span>
              <div className="grid grid-cols-3 gap-3">
                {tiers.map((t) => (
                  <label
                    key={t.value}
                    className={`relative cursor-pointer rounded-xl border px-4 py-3 text-center transition-all duration-200 ${
                      selectedTier === t.value
                        ? 'border-[#c8ff00] bg-[#c8ff00]/10 text-[#c8ff00]'
                        : 'border-white/10 bg-white/5 text-white hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      value={t.value}
                      {...register('tier')}
                      className="sr-only"
                      aria-label={`${t.label} tier`}
                    />
                    <span className="block text-sm font-semibold font-sans">{t.label}</span>
                    <span className="block text-xs text-[#a8a8a0] mt-0.5">{t.description}</span>
                  </label>
                ))}
              </div>
              {errors.tier && <p className="text-red-400 text-xs mt-1">{errors.tier.message}</p>}
            </div>

            {/* Square Footage */}
            <div>
              <label htmlFor="sqft" className={labelStyles}>
                Square Footage
              </label>
              <input
                id="sqft"
                type="number"
                placeholder="e.g. 500"
                {...register('sqft', { valueAsNumber: true })}
                className={inputStyles}
              />
              {errors.sqft && <p className="text-red-400 text-xs mt-1">{errors.sqft.message}</p>}
            </div>

            {/* County */}
            <div>
              <label htmlFor="county" className={labelStyles}>
                County
              </label>
              <select id="county" {...register('county')} className={inputStyles}>
                <option value="" disabled>
                  Select a county
                </option>
                {counties.map((c) => (
                  <option key={c} value={c} className="bg-[#161616]">
                    {c}
                  </option>
                ))}
              </select>
              {errors.county && (
                <p className="text-red-400 text-xs mt-1">{errors.county.message}</p>
              )}
            </div>

            {/* Timeline */}
            <div>
              <label htmlFor="timeline" className={labelStyles}>
                Timeline
              </label>
              <select id="timeline" {...register('timeline')} className={inputStyles}>
                <option value="Flexible">Flexible</option>
                <option value="3 Months">Within 3 Months</option>
                <option value="Rush">Rush</option>
              </select>
              {errors.timeline && (
                <p className="text-red-400 text-xs mt-1">{errors.timeline.message}</p>
              )}
            </div>

            {/* Permits Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="permits" className="text-sm text-[#a8a8a0] font-sans">
                Need Permits?
              </label>
              <label className="relative inline-flex items-center cursor-pointer" aria-label="Toggle permits">
                <input
                  id="permits"
                  type="checkbox"
                  {...register('permits')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:bg-[#c8ff00]/30 transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-200 peer-checked:after:translate-x-5 peer-checked:after:bg-[#c8ff00]" />
              </label>
            </div>

            {/* Submit */}
            <Button type="submit" variant="primary" size="lg" className="w-full" aria-label="Calculate estimate">
              Calculate Estimate
            </Button>
          </form>

          {/* ----------------------------------------------------------------- */}
          {/* Results */}
          {/* ----------------------------------------------------------------- */}
          <div className="flex items-start">
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full"
              >
                <Card hover={false} className="p-8">
                  <span className="text-sm text-[#a8a8a0] font-sans tracking-widest uppercase">
                    Estimated Cost
                  </span>

                  <p className="mt-3 text-4xl font-mono font-bold text-[#c8ff00]">
                    {formatCurrency(result.total)}
                  </p>

                  <p className="mt-1 text-[#a8a8a0] text-sm font-sans">
                    Between {formatCurrency(result.range.low)} &mdash; {formatCurrency(result.range.high)}
                  </p>

                  {/* Breakdown Table */}
                  <div className="mt-8 divide-y divide-white/5">
                    {breakdownRows.map((row) => (
                      <div key={row.label} className="flex justify-between py-3">
                        <span className="text-[#a8a8a0] text-sm font-sans">{row.label}</span>
                        <span className="text-white text-sm font-mono">{formatCurrency(row.amount)}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-8">
                    <Button href="#contact" variant="primary" size="lg" className="w-full" aria-label="Get exact quote">
                      Get Exact Quote
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <div className="w-full flex items-center justify-center min-h-[400px]">
                <p className="text-[#6a6a64] text-center font-sans text-lg">
                  Fill out the form and hit <span className="text-[#c8ff00]">Calculate</span> to see
                  your estimate.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
