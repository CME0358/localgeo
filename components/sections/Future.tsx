import { Button } from '@/components/ui/Button';
import { SectionShell } from '@/components/ui/SectionShell';
import { defaultLanding } from '@/lib/content/default-landing';

export function Future() {
  const { finalCta } = defaultLanding;

  return (
    <SectionShell
      align="center"
      className="relative overflow-hidden bg-[#060d2e]"
      dark
      title={
        <>
          {finalCta.titleLines[0]}
          <br />
          <span className="text-[#ff385c]">{finalCta.titleHighlight}</span>
          {finalCta.titleLines[1]}
        </>
      }
      subtitle={
        <>
          {finalCta.subtitleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </>
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(59,114,255,0.2) 0%, transparent 60%)',
        }}
      />
      <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href={finalCta.primaryCta.href}>{finalCta.primaryCta.label}</Button>
        <Button href={finalCta.secondaryCta.href} variant="secondary">
          {finalCta.secondaryCta.label}
        </Button>
      </div>
    </SectionShell>
  );
}
