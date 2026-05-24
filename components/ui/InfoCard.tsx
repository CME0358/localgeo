'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: string;
  description: string;
  index: number;
}

export function InfoCard({ title, description, index }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <GlassPanel
        className={cn(
          'group relative h-full overflow-hidden p-5 transition-all duration-300 md:p-6',
          'hover:border-[#3b72ff]/35 hover:shadow-[0_0_36px_rgba(59,114,255,0.18)]',
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
          style={{
            background:
              'radial-gradient(circle at 20% 0%, rgba(59,114,255,0.16) 0%, transparent 55%), radial-gradient(circle at 80% 100%, rgba(0,212,138,0.08) 0%, transparent 50%)',
          }}
        />
        <div className="relative">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-[#3b72ff]/80">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h4 className="mt-3 text-base font-semibold text-white md:text-lg">{title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-white/65 md:text-[0.9375rem]">
            {description}
          </p>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
