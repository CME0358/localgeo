import { cn } from '@/lib/utils';

interface TmProps {
  className?: string;
}

export function Tm({ className }: TmProps) {
  return (
    <sup
      className={cn(
        'ml-0.5 align-super text-[0.55em] font-normal leading-none tracking-normal opacity-80',
        className,
      )}
    >
      TM
    </sup>
  );
}
