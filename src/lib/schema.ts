// ---------------------------------------------------------------------------
// X Construction — JSON-LD Schema Generators
// ---------------------------------------------------------------------------

import { COMPANY, SERVICES, SERVICE_AREAS } from './constants';

const SITE_URL = 'https://xconstruction.com';

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: COMPANY.name,
    description:
      "Southern California's trusted construction company. Full home remodels, custom ADUs, commercial projects, and more.",
    url: SITE_URL,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: "123 Builder's Lane, Suite 100",
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      postalCode: '90001',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0522,
      longitude: -118.2437,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area.name,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Construction Services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
        },
      })),
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$$$',
    image: `${SITE_URL}/og-image.jpg`,
    sameAs: [
      'https://instagram.com/xconstruction',
      'https://facebook.com/xconstruction',
      'https://linkedin.com/company/xconstruction',
    ],
  };
}

export function generateAggregateRatingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: COMPANY.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function generateServiceSchema(service: {
  title: string;
  description: string;
  priceRange?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: COMPANY.name,
      telephone: COMPANY.phone,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area.name,
    })),
    url: `${SITE_URL}/services/${service.slug}`,
    ...(service.priceRange && {
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
        },
        description: service.priceRange,
      },
    }),
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime: number;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: COMPANY.name,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
    },
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    articleSection: post.category,
    wordCount: post.readTime * 200,
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
