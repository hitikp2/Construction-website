'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Button } from '@/components/ui/Button';

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
          <a href="#" className="flex items-baseline gap-1" aria-label="X Construction home">
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
                className="font-sans text-sm text-[#a8a8a0] transition-colors duration-300 hover:text-[#c8ff00]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+18005551234"
              className="flex items-center gap-2 font-sans text-sm text-[#a8a8a0] transition-colors duration-300 hover:text-[#c8ff00]"
              aria-label="Call (800) 555-1234"
            >
              <Phone className="h-4 w-4" />
              (800) 555-1234
            </a>
            <Button variant="primary" size="sm" href="#contact">
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
            {/* Close Button */}
            <div className="flex h-20 items-center justify-end px-6">
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-[#f0efe9]" />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="font-sans text-2xl text-[#f0efe9] transition-colors duration-300 hover:text-[#c8ff00]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                className="mt-4 flex flex-col items-center gap-4"
              >
                <a
                  href="tel:+18005551234"
                  className="flex items-center gap-2 font-sans text-[#a8a8a0] transition-colors duration-300 hover:text-[#c8ff00]"
                  aria-label="Call (800) 555-1234"
                >
                  <Phone className="h-4 w-4" />
                  (800) 555-1234
                </a>
                <Button variant="primary" size="md" href="#contact" onClick={() => setMobileOpen(false)}>
                  Free Quote
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
