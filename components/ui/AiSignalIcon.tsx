import type { AiSignalIcon } from '@/lib/comparison';

interface AiSignalIconProps {
  name: AiSignalIcon;
  className?: string;
}

const iconClass = 'h-5 w-5';

export function AiSignalIconGlyph({ name, className }: AiSignalIconProps) {
  const stroke = 'currentColor';
  const common = {
    fill: 'none',
    stroke,
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'google-map':
      return (
        <svg viewBox="0 0 24 24" className={className ?? iconClass} aria-hidden>
          <path {...common} d="M12 21s6-4.5 6-10a6 6 0 1 0-12 0c0 5.5 6 10 6 10Z" />
          <circle {...common} cx="12" cy="11" r="2.25" />
        </svg>
      );
    case 'faq':
      return (
        <svg viewBox="0 0 24 24" className={className ?? iconClass} aria-hidden>
          <path {...common} d="M8 9.5a3.5 3.5 0 0 1 6.8 1.1c0 2.2-3.3 2.8-3.3 4.4" />
          <path {...common} d="M12 17.5h.01" />
          <rect {...common} x="4" y="4" width="16" height="16" rx="3" />
        </svg>
      );
    case 'reviews':
      return (
        <svg viewBox="0 0 24 24" className={className ?? iconClass} aria-hidden>
          <path
            {...common}
            d="M6 7.5h12M6 11h8M6 14.5h5"
          />
          <path
            {...common}
            d="M5 5h14a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H9l-3.5 2.5V7a2 2 0 0 1 2-2Z"
          />
          <path
            {...common}
            d="m16.5 6.5 1 1 2-2"
          />
        </svg>
      );
    case 'mention':
      return (
        <svg viewBox="0 0 24 24" className={className ?? iconClass} aria-hidden>
          <circle {...common} cx="12" cy="12" r="8" />
          <path {...common} d="M9.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" />
          <path {...common} d="M16.5 7.5 19 5M19 5v2.5M19 5h-2.5" />
        </svg>
      );
    case 'entity':
      return (
        <svg viewBox="0 0 24 24" className={className ?? iconClass} aria-hidden>
          <path {...common} d="M4 20V9l8-4 8 4v11" />
          <path {...common} d="M9 20v-6h6v6" />
          <path {...common} d="M4 12h16" />
        </svg>
      );
    case 'local':
      return (
        <svg viewBox="0 0 24 24" className={className ?? iconClass} aria-hidden>
          <circle {...common} cx="12" cy="10" r="3" />
          <path {...common} d="M12 13v2" />
          <path {...common} d="M6.5 18.5c1.2-2.2 3.4-3.5 5.5-3.5s4.3 1.3 5.5 3.5" />
          <path {...common} d="M4 20h16" />
          <path {...common} d="M8 6.5 5.5 4M16 6.5 18.5 4" />
        </svg>
      );
    default:
      return null;
  }
}
