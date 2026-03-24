import React from 'react';

const services = [
  'Full Home Remodel',
  'Custom ADU',
  'Painting',
  'Commercial Build-Outs',
  'Room Additions',
  'Outdoor Living',
  'Electrical & Plumbing',
  'Windows, Doors & Roofing',
  'Architectural Design & Permits',
];

const serviceAreas = [
  'Los Angeles County',
  'San Bernardino County',
  'Orange County',
  'Riverside County',
  'Ventura County',
  'Inland Empire',
];

const companyLinks = [
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
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
              <span className="font-serif text-2xl font-bold text-[#f0efe9]">X</span>
              <span className="font-sans text-xs tracking-[0.2em] text-[#a8a8a0]">
                CONSTRUCTION
              </span>
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
                <li key={service}>
                  <a
                    href="#services"
                    className="font-sans text-sm text-[#a8a8a0] transition-colors duration-300 hover:text-[#c8ff00]"
                  >
                    {service}
                  </a>
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
                <li key={area}>
                  <a
                    href="#areas"
                    className="font-sans text-sm text-[#a8a8a0] transition-colors duration-300 hover:text-[#c8ff00]"
                  >
                    {area}
                  </a>
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
                  <a
                    href={link.href}
                    className="font-sans text-sm text-[#a8a8a0] transition-colors duration-300 hover:text-[#c8ff00]"
                  >
                    {link.label}
                  </a>
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
