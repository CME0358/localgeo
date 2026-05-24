import Link from 'next/link';
import { HashLink } from '@/components/ui/HashLink';
import { defaultLanding } from '@/lib/content/default-landing';
import { cn } from '@/lib/utils';
import { isHashHref } from '@/lib/scroll-to-hash';
import { Tm } from '@/components/ui/Tm';

export function Nav() {
  const { nav } = defaultLanding;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/8 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:px-8">
        <Link
          href="/"
          className="shrink-0 font-serif text-[15px] font-bold tracking-tight text-[#222222]"
        >
          {nav.logo}{' '}
          <span className="text-[#ff385c]">{nav.logoAccent}</span>
          <Tm />
        </Link>

        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {nav.links.map((link) => {
            const className = cn(
              'text-sm font-medium transition-colors lg:text-base',
              link.variant === 'cta'
                ? 'rounded-lg bg-[#ff385c] px-5 py-2.5 font-semibold text-white hover:bg-[#e00b41]'
                : 'text-[#222222] hover:text-[#ff385c]',
            );

            return (
              <li key={link.href + link.label}>
                {isHashHref(link.href) ? (
                  <HashLink href={link.href} className={className}>
                    {link.label}
                  </HashLink>
                ) : (
                  <Link href={link.href} className={className}>
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <HashLink
          href="#diagnosis"
          className="rounded-lg bg-[#ff385c] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e00b41] md:hidden"
        >
          無料AI診断
        </HashLink>
      </div>
    </nav>
  );
}
