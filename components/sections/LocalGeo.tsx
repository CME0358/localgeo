import { Card } from '@/components/ui/Card';
import { MotionItem, MotionStagger, SectionShell } from '@/components/ui/SectionShell';
import { Tm } from '@/components/ui/Tm';
import { defaultLanding } from '@/lib/content/default-landing';
import type { ComparisonStatus } from '@/lib/types/content';
import { cn } from '@/lib/utils';

const statusIcon: Record<ComparisonStatus, { symbol: string; className: string }> = {
  yes: { symbol: '✓', className: 'text-[#00d48a]' },
  no: { symbol: '✕', className: 'text-[#ff385c]' },
  partial: { symbol: '△', className: 'text-[#febc2e]' },
};

function StatusCell({ status }: { status: ComparisonStatus }) {
  const { symbol, className } = statusIcon[status];
  return (
    <span className={cn('text-lg font-bold', className)} aria-label={status}>
      {symbol}
    </span>
  );
}

export function LocalGeo() {
  const { competition } = defaultLanding;

  return (
    <SectionShell
      className="bg-[#060d2e]"
      dark
      eyebrow={competition.eyebrow}
      title={
        <>
          {competition.titleLines[0]}
          <br />
          {competition.titleLines[1]}
        </>
      }
      subtitle={
        <>
          {competition.subtitleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </>
      }
    >
      <Card variant="glass" className="overflow-hidden p-0">
        <div className="hidden grid-cols-4 gap-4 border-b border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/70 md:grid">
          {competition.headers.map((header, index) => (
            <div
              key={header}
              className={cn(
                index > 0 && 'text-center',
                index === 1 && 'text-[#3b72ff]',
                index === 3 && 'text-[#00d48a]',
              )}
            >
              {header}
            </div>
          ))}
        </div>

        <div className="divide-y divide-white/10">
          {competition.rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-4 md:items-center md:gap-4 md:px-6"
            >
              <div className="text-sm font-medium text-white/85 md:text-base">
                {row.label}
              </div>
              <div className="flex items-center justify-between md:justify-center md:text-center">
                <span className="text-xs text-white/40 md:hidden">あなたの店舗</span>
                <StatusCell status={row.yours} />
              </div>
              <div className="flex items-center justify-between md:justify-center md:text-center">
                <span className="text-xs text-white/40 md:hidden">競合A</span>
                <StatusCell status={row.competitorA} />
              </div>
              <div className="flex items-center justify-between md:justify-center md:text-center">
                <span className="text-xs text-[#00d48a]/70 md:hidden">
                  競合B（GEO導入済）
                </span>
                <StatusCell status={row.competitorB} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </SectionShell>
  );
}
