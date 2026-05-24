import { Button } from '@/components/ui/Button';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { defaultLanding } from '@/lib/content/default-landing';
import { cn } from '@/lib/utils';

export function Hero() {
  const { hero } = defaultLanding;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#060d2e] px-6 pb-24 pt-28 md:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,114,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,114,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at 50% 60%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 60%, black 30%, transparent 75%)',
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,114,255,0.25)_0%,transparent_65%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#3b72ff]/30 bg-[#3b72ff]/12 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d48a]" />
            <span className="text-xs font-medium text-white/80 md:text-sm">
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="w-[calc(100%+2em)] text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
            {hero.titleLines[0]}
            <br />
            {hero.titleLines[1]}
            <span className="text-[#ff385c]">{hero.titleAccent}</span>
            {hero.titleLines[2]}
            <br />
            {hero.titleLines[3]}
            <span className="bg-gradient-to-r from-[#00d48a] to-[#3b72ff] bg-clip-text text-transparent">
              {hero.titleAiHighlightLines[0]}
              <br />
              {hero.titleAiHighlightLines[1]}
            </span>
            {hero.titleLines[4]}
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
            {hero.subtitleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <div className="flex flex-wrap gap-2">
            {hero.platformBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 md:text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#00d48a]" />
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <GlassPanel className="overflow-hidden p-0">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-xs font-medium text-white/50">
              {hero.visual.dashboardTitle}
            </span>
          </div>

          <div className="space-y-4 p-4 md:p-5">
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-[10px] uppercase tracking-wider text-white/40">
                {hero.visual.queryLabel}
              </p>
              <p className="mt-1 text-sm text-white/90">{hero.visual.queryText}</p>
            </div>

            <div className="space-y-2">
              {hero.visual.results.map((result) => (
                <div
                  key={result.rank}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border p-3',
                    result.featured
                      ? 'border-[#3b72ff]/40 bg-[#3b72ff]/10'
                      : 'border-white/10 bg-white/5',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
                      result.rank === 1
                        ? 'bg-[#ffd700]/20 text-[#ffd700]'
                        : 'bg-white/10 text-white/60',
                    )}
                  >
                    {result.rank}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {result.name}
                    </p>
                    <p className="text-xs text-white/50">{result.meta}</p>
                  </div>
                  {result.badge ? (
                    <span className="shrink-0 rounded-full bg-[#00d48a]/20 px-2 py-0.5 text-[10px] font-semibold text-[#00d48a]">
                      {result.badge}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {hero.visual.scores.map((score) => (
                <div
                  key={score.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                >
                  <p className="text-2xl font-bold text-[#00d48a]">{score.value}</p>
                  <p className="mt-1 text-[10px] text-white/50">{score.label}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
