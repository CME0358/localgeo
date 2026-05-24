import { Card } from '@/components/ui/Card';
import { MotionItem, MotionStagger, SectionShell } from '@/components/ui/SectionShell';
import { Tm } from '@/components/ui/Tm';
import { defaultLanding } from '@/lib/content/default-landing';

export function Comparison() {
  const { comparison } = defaultLanding;

  return (
    <SectionShell
      id="comparison"
      eyebrow={
        <>
          {comparison.eyebrow.replace('Local GEO™', '')}
          Local GEO<Tm />
        </>
      }
      title={
        <>
          {comparison.titleLines[0]}
          <br />
          {comparison.titleLines[1]}
        </>
      }
      subtitle={
        <>
          <span className="block">
            MEO対策は「地図での戦い」。Local GEO<Tm />
            は「AIに選ばれる戦い」。
          </span>
          <span className="block">{comparison.subtitleLines[1]}</span>
        </>
      }
    >
      <MotionStagger className="grid gap-6 md:grid-cols-2">
        <MotionItem>
          <Card variant="light" className="flex h-full flex-col p-6 md:p-8">
            <p className="text-sm font-semibold text-[#6a6a6a]">{comparison.old.label}</p>
            <h3 className="mt-3 text-2xl font-bold text-[#6a6a6a]">{comparison.old.title}</h3>
            <ul className="mt-6 flex-1 space-y-3">
              {comparison.old.items.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 border-b border-black/5 pb-3 text-[#6a6a6a] last:border-0"
                >
                  <span className="mt-0.5 text-[#999]">✓</span>
                  {item.text}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[#999]">{comparison.old.footer}</p>
          </Card>
        </MotionItem>

        <MotionItem>
          <Card variant="dark" className="relative flex h-full flex-col overflow-hidden p-6 md:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#3b72ff] to-[#00d48a]" />
            <p className="text-sm font-semibold text-[#00c2ff]">
              ✦ GEO Search Protocol<Tm />
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white">{comparison.new.title}</h3>
            <ul className="mt-6 flex-1 space-y-3">
              {comparison.new.items.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 border-b border-white/10 pb-3 text-white/85 last:border-0"
                >
                  <span className="mt-0.5 text-[#00d48a]">✓</span>
                  {item.text}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-medium text-[#00d48a]">{comparison.new.footer}</p>
          </Card>
        </MotionItem>
      </MotionStagger>
    </SectionShell>
  );
}
