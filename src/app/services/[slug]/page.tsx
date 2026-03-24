import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICE_DETAILS, getServiceBySlug } from '@/lib/service-data';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/schema';
import ServiceDetailClient from './ServiceDetailClient';

export async function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} | X Construction — Licensed SoCal Contractor`,
    description: `${service.tagline} ${service.priceRange} range. Serving all of Southern California. Licensed, insured, rated 4.9★.`,
    keywords: [
      service.title.toLowerCase(),
      'construction',
      'Southern California',
      'contractor',
      'remodeling',
    ],
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://xconstruction.com' },
    { name: 'Services', url: 'https://xconstruction.com/#services' },
    { name: service.title, url: `https://xconstruction.com/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={generateServiceSchema({
          title: service.title,
          description: service.description,
          priceRange: service.priceRange,
          slug: service.slug,
        })}
      />
      <JsonLd data={generateFAQSchema(service.faqs)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <ServiceDetailClient service={service} />
    </>
  );
}
