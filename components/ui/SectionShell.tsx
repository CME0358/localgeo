'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionShellProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  id?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SectionShell({
  eyebrow,
  title,
  subtitle,
  children,
  className,
  innerClassName,
  align = 'left',
  dark = false,
  id,
}: SectionShellProps) {
  const alignClass =
    align === 'center'
      ? 'mx-auto text-center items-center'
      : 'text-left items-start';

  return (
    <section
      id={id}
      className={cn('relative scroll-mt-20 px-6 py-20 md:px-8 md:py-28', className)}
    >
      <motion.div
        className={cn('mx-auto flex max-w-6xl flex-col gap-12', innerClassName)}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {(eyebrow || title || subtitle) && (
          <motion.div
            className={cn('flex max-w-3xl flex-col gap-4', alignClass)}
            variants={itemVariants}
          >
            {eyebrow ? (
              <p
                className={cn(
                  'text-sm font-semibold uppercase tracking-[0.14em]',
                  dark ? 'text-[#3b72ff]' : 'text-[#3b72ff]',
                )}
              >
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2
                className={cn(
                  'text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl',
                  dark ? 'text-white' : 'text-[#222222]',
                )}
              >
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <div
                className={cn(
                  'text-base leading-relaxed md:text-lg',
                  dark ? 'text-white/55' : 'text-[#6a6a6a]',
                )}
              >
                {subtitle}
              </div>
            ) : null}
          </motion.div>
        )}

        {children ? (
          <motion.div variants={itemVariants} className="w-full">
            {children}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}

export function MotionStagger({
  children,
  className,
  delay = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: delay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
