'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { HashLink } from '@/components/ui/HashLink';
import { cn } from '@/lib/utils';
import { isHashHref } from '@/lib/scroll-to-hash';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#ff385c] text-white shadow-[0_4px_14px_rgba(255,56,92,0.35)] hover:bg-[#e00b41]',
  secondary:
    'border border-white/20 bg-white/5 text-white hover:border-white/30 hover:bg-white/10',
};

const motionProps = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring' as const, stiffness: 420, damping: 28 },
};

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

export function Button({
  children,
  variant = 'primary',
  className,
  href,
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors md:text-base',
    variantStyles[variant],
    className,
  );

  if (href) {
    if (isExternalHref(href)) {
      return (
        <motion.a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }

    if (isHashHref(href)) {
      return (
        <motion.div {...motionProps} className="inline-flex">
          <HashLink href={href} className={classes}>
            {children}
          </HashLink>
        </motion.div>
      );
    }

    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div {...motionProps} className="inline-flex">
      <button type={type} className={classes} {...props}>
        {children}
      </button>
    </motion.div>
  );
}
