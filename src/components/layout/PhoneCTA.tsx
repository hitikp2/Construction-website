'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { COMPANY, phoneHref, smsHref } from '@/lib/constants';

export const PhoneCTA = () => {
  const scrollY = useScrollPosition();
  const visible = scrollY >= 300;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#c8ff00] py-3 px-4"
        >
          <div className="flex items-center justify-center gap-4">
            <a
              href={phoneHref(COMPANY.phone)}
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2 font-sans font-semibold text-[#c8ff00] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg"
              aria-label="Call Now"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href={smsHref(COMPANY.phone)}
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2 font-sans font-semibold text-[#c8ff00] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg"
              aria-label="Text Us"
            >
              <MessageSquare className="h-4 w-4" />
              Text Us
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
