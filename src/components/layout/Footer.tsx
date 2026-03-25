import React from 'react';
import Link from 'next/link';

const services = [
  { label: 'Full Home Remodel', slug: 'full-home-remodel' },
  { label: 'Custom ADU', slug: 'custom-adu' },
  { label: 'Painting', slug: 'painting' },
  { label: 'Commercial Build-Outs', slug: 'commercial-build-outs' },
  { label: 'Room Additions', slug: 'room-additions' },
  { label: 'Outdoor Living', slug: 'outdoor-living' },
  { label: 'Electrical & Plumbing', slug: 'electrical-plumbing' },
  { label: 'Windows, Doors & Roofing', slug: 'windows-doors-roofing' },
  { label: 'Architectural Design & Permits', slug: 'architectural-design-permits' },
];

const serviceAreas = [
  { label: 'Los Angeles County', slug: 'los-angeles' },
  { label: 'San Bernardino County', slug: 'san-bernardino' },
  { label: 'Orange County', slug: 'orange-county' },
  { label: 'Riverside County', slug: 'riverside' },
  { label: 'Ventura County', slug: 'ventura' },
  { label: 'Inland Empire', slug: 'inland-empire' },
];

const companyLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Calculator', href: '/#calculator' },
  { label: 'AI Tools', href: '/#ai-tools' },
  { label: 'FAQ', href: '/#faq' },
];

const socialIcons = ['Facebook', 'Instagram', 'LinkedIn', 'Yelp'];

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#111111]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Brand */}
          <div>
            <div className="mb-4 flex items-baseline gap-1">
              <Link href="/" className="flex items-baseline gap-1">
                <span className="font-serif text-2xl font-bold text-[#f0efe9]">X</span>
                <span className="font-sans text-xs tracking-[0.2em] text-[#a8a8a0]">
                  CONSTRUCTION
                </span>
              </Link>
            </div>
            <p className="mb-6 font-sans text-sm leading-relaxed text-[#a8a8a0]">
              Premium construction &amp; remodeling serving all of Southern California.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((name) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 font-sans text-xs text-[#a8a8a0] transition-colors duration-300 hover:border-[#c8ff00] hover:text-[#c8ff00]"
                >
                  {name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-[#f0efe9]">
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-sans text-sm text-[#a8a8a0] transition-colors duration-300 hover:text-[#c8ff00]"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Service Areas */}
          <div>
            <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-[#f0efe9]">
              Service Areas
            </h4>
            <ul className="flex flex-col gap-2">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/areas/${area.slug}`}
                    className="font-sans text-sm text-[#a8a8a0] transition-colors duration-300 hover:text-[#c8ff00]"
                  >
                    {area.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-[#f0efe9]">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-[#a8a8a0] transition-colors duration-300 hover:text-[#c8ff00]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-sans text-sm text-[#6a6a64]">
              &copy; 2026 X Construction. All rights reserved.
            </p>
            <p className="font-sans text-sm text-[#6a6a64]">
              Licensed Contractor: CA #XXXXXXX
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
