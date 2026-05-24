import { cn } from '@/lib/utils';

interface LoaderProps {
  step?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export function Loader({ step, className, size = 'md' }: LoaderProps) {
  return (
    <div
      className={cn('flex flex-col items-center gap-4 text-center', className)}
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          'animate-spin rounded-full border-white/20 border-t-[#3b72ff]',
          sizeStyles[size],
        )}
        aria-hidden
      />
      {step ? (
        <p className="text-sm font-medium text-white/70 md:text-base">{step}</p>
      ) : null}
    </div>
  );
}
