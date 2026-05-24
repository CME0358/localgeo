'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { getHashFromHref, scrollToHash } from '@/lib/scroll-to-hash';

interface HashLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export function HashLink({ href, children, onClick, ...props }: HashLinkProps) {
  const hash = getHashFromHref(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !hash) return;

    if (href.startsWith('#')) {
      event.preventDefault();
      scrollToHash(hash);
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
