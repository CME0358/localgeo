import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'glass' | 'light' | 'dark';
}

const variantStyles = {
  glass:
    'rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl',
  light:
    'rounded-2xl border border-black/5 bg-white shadow-[rgba(0,0,0,0.02)_0px_0px_0px_1px,rgba(0,0,0,0.04)_0px_2px_6px,rgba(0,0,0,0.1)_0px_4px_8px]',
  dark: 'rounded-2xl border border-white/10 bg-[#0a1540] shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
};

export function Card({
  children,
  className,
  variant = 'glass',
  ...props
}: CardProps) {
  return (
    <div className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
}
