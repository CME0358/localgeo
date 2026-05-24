'use client';

import { animate, motion, useMotionValueEvent, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScoreGaugeProps {
  value: number;
  label: string;
  max?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'text-3xl',
  md: 'text-5xl',
  lg: 'text-6xl',
};

export function ScoreGauge({
  value,
  label,
  max = 100,
  className,
  size = 'md',
}: ScoreGaugeProps) {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(motionValue, 'change', (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    const controls = animate(motionValue, Math.min(value, max), {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [motionValue, value, max]);

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <motion.span
        className={cn(
          'font-bold tabular-nums tracking-tight text-[#00d48a]',
          sizeStyles[size],
        )}
      >
        {displayValue}
      </motion.span>
      <span className="text-center text-xs text-white/55 md:text-sm">{label}</span>
    </div>
  );
}
