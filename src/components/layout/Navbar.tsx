'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Button } from '@/components/ui/Button';
import { COMPANY, phoneHref } from '@/lib/constants';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Areas', href: '#areas' },
  { label: 'AI Tools', href: '#ai-tools' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrolled = scrollY > 50;

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);

      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [],
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 h-20 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,10,10,0.9)] backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <a
            href="/"
            className="flex items-baseline gap-1"
            aria-label="X Construction home"
          >
            <span className="font-serif text-2xl font-bold text-[#f0efe9]">X</span>
            <span className="font-sans text-xs tracking-[0.2em] text-[#a8a8a0]">
              CONSTRUCTION
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-sans text-sm text-[#a8a8a0] transition-colors duration-300 hover:text-[#c8ff00]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={phoneHref(COMPANY.phone)}
              className="flex items-center gap-2 font-sans text-sm text-[#a8a8a0] transition-colors duration-300 hover:text-[#c8ff00]"
              aria-label={`Call ${COMPANY.phone}`}
            >
              <Phone className="h-4 w-4" />
              {COMPANY.phone}
            </a>
            <Button
              variant="primary"
              size="sm"
              href="#contact"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Free Quote
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="flex items-center justify-center lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-[#f0efe9]" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0a]"
          >
            {/* Header — logo + close */}
            <div className="flex h-20 items-center justify-between px-6">
              <a
                href="/"
                className="flex items-baseline gap-1"
                aria-label="X Construction home"
              >
                <span className="font-serif text-2xl font-bold text-[#f0efe9]">X</span>
                <span className="font-sans text-xs tracking-[0.2em] text-[#a8a8a0]">
                  CONSTRUCTION
                </span>
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-[#f0efe9]" />
              </button>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-white/5" />

            {/* Mobile Links */}
            <div className="flex flex-1 flex-col px-6 pt-8 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group flex items-center justify-between rounded-xl px-4 py-4 font-sans text-lg text-[#f0efe9] transition-all duration-200 hover:bg-white/5 hover:text-[#c8ff00]"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 text-[#6a6a64] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-[#c8ff00]" />
                </motion.a>
              ))}
            </div>

            {/* Bottom CTA area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="px-6 pb-10 flex flex-col gap-4"
            >
              <div className="h-px bg-white/5 mb-2" />
              <a
                href={phoneHref(COMPANY.phone)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 font-sans text-sm text-[#a8a8a0] transition-colors duration-200 hover:text-[#c8ff00] hover:border-[#c8ff00]/20"
                aria-label={`Call ${COMPANY.phone}`}
              >
                <Phone className="h-4 w-4" />
                {COMPANY.phone}
              </a>
              <Button
                variant="primary"
                size="lg"
                href="#contact"
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Free Quote
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
