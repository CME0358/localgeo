import Link from 'next/link';
import { defaultLanding } from '@/lib/content/default-landing';
import { Tm } from '@/components/ui/Tm';

export function Footer() {
  const { footer } = defaultLanding;

  return (
    <footer className="bg-[#060d2e] px-6 py-16 text-center text-white md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4">
        <div className="font-serif text-lg font-bold">
          {footer.brand}{' '}
          <span className="text-[#ff385c]">{footer.brandAccent}</span>
          <Tm /> for Local
        </div>

        <p className="text-sm text-white/70">
          <Link
            href={footer.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white/85"
          >
            {footer.companyName}
          </Link>
        </p>

        <p className="text-sm text-white/55">
          <Link
            href={footer.privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white/85"
          >
            {footer.privacyLabel}
          </Link>
        </p>

        <p className="mt-2 text-xs text-white/40">{footer.copyright}</p>
      </div>
    </footer>
  );
}
