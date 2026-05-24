'use client';

import { useEffect } from 'react';
import { scrollToHash } from '@/lib/scroll-to-hash';

export function HashScrollOnLoad() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const scroll = () => {
      scrollToHash(hash, 'auto');
    };

    scroll();
    const timer = window.setTimeout(scroll, 100);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
