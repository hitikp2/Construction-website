'use client';

import { useEffect } from 'react';

/**
 * Scrolls the page to the top on initial load.
 *
 * Browsers restore the previous scroll position on reload and scroll to
 * `#hash` anchors automatically. Both behaviours fire *after* `<head>`
 * scripts, so the only reliable place to override them is after React
 * hydration — which is exactly when useEffect runs.
 */
export const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};
