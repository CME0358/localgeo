import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionShell } from '@/components/ui/SectionShell';
import { Tm } from '@/components/ui/Tm';
import { defaultLanding } from '@/lib/content/default-landing';

export function Pricing() {
  const { pricing } = defaultLanding;

  return (
    <SectionShell
      id="pricing"
      align="center"
      className="bg-[#f8f9fc]"
      eyebrow={pricing.eyebrow}
      title={
        <>
          {pricing.titleLines[0]}
          <br />
          {pricing.titleLines[1]}
        </>
      }
      subtitle={
        <>
          {pricing.subtitleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </>
      }
    >
      <Card
        variant="dark"
        className="relative mx-auto max-w-2xl overflow-hidden p-8 md:p-10"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#3b72ff] via-[#ff385c] to-[#00d48a]" />

        <div className="flex flex-col items-center text-center">
          <div className="inline-flex rounded-full border border-[#3b72ff]/30 bg-[#3b72ff]/10 px-4 py-1.5 text-xs font-semibold text-[#3b72ff] md:text-sm">
            ✦ GEO Search Protocol<Tm /> for Local
          </div>

          <h3 className="mt-6 text-2xl font-bold text-white md:text-3xl">
            {pricing.serviceName}
          </h3>

          <div className="mt-6 flex flex-wrap items-end justify-center gap-1">
            <span className="text-2xl font-bold text-white/70">{pricing.currency}</span>
            <span className="text-5xl font-bold tracking-tight text-white md:text-6xl">
              {pricing.amount}
            </span>
          </div>
          <p className="mt-2 text-sm text-white/55">{pricing.per}</p>
        </div>

        <div className="my-8 h-px bg-white/10" />

        <ul className="grid gap-3 text-left sm:grid-cols-2">
          {pricing.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-white/85 md:text-base"
            >
              <span className="mt-0.5 text-[#00d48a]">✓</span>
              {feature.includes('Local GEO') ? (
                <>
                  {feature.split('Local GEO™')[0]}
                  Local GEO<Tm />
                  {feature.split('Local GEO™')[1]}
                </>
              ) : (
                feature
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Button href={pricing.cta.href} className="w-full sm:w-auto">
            {pricing.cta.label}
          </Button>
          <div className="text-center text-xs text-white/45 md:text-sm">
            {pricing.noteLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </Card>
    </SectionShell>
  );
}
