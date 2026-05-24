import type { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';
import { SectionShell } from '@/components/ui/SectionShell';
import { defaultLanding } from '@/lib/content/default-landing';
import { cn } from '@/lib/utils';

function highlightAnswer(text: string, highlights: string[]): ReactNode {
  if (highlights.length === 0) return text;

  const pattern = highlights
    .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const parts = text.split(new RegExp(`(${pattern})`));

  return parts.map((part, index) =>
    highlights.includes(part) ? (
      <strong key={`${part}-${index}`} className="font-semibold text-[#00d48a]">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function Problem() {
  const { problem } = defaultLanding;

  return (
    <SectionShell
      id="problem"
      className="bg-[#f8f9fc]"
      eyebrow={problem.eyebrow}
      title={
        <>
          {problem.titleLines[0]}
          <br />
          {problem.titleLines[1]}
        </>
      }
      subtitle={
        <>
          {problem.subtitleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </>
      }
    >
      <Card variant="light" className="overflow-hidden p-0">
        <div className="flex items-center gap-3 border-b border-black/5 bg-[#f2f2f2] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 truncate rounded-md bg-white px-3 py-1.5 text-xs text-[#6a6a6a] md:text-sm">
            {problem.browserQuery}
          </div>
        </div>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="border-b border-black/5 p-5 md:border-b-0 md:border-r">
            <p className="mb-4 text-sm font-semibold text-[#6a6a6a]">
              {problem.traditionalLabel}
            </p>
            <div className="space-y-4">
              {problem.traditionalResults.map((result) => (
                <div key={result.url} className="space-y-1">
                  <p className="text-xs text-[#428bff]">{result.url}</p>
                  <p className="text-sm font-semibold text-[#222222]">
                    {result.title}
                  </p>
                  <p className="text-sm text-[#6a6a6a]">{result.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold text-[#ff385c]">
              {problem.traditionalNote}
            </p>
          </div>

          <div className="bg-[#060d2e] p-5">
            <p className="mb-4 text-sm font-semibold text-[#00c2ff]">
              {problem.aiLabel}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3b72ff]/20 text-sm text-[#3b72ff]">
                  ✦
                </div>
                <span className="text-sm font-medium text-white/80">
                  {problem.aiBrandName}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                {highlightAnswer(problem.aiAnswer, problem.aiAnswerHighlights)}
              </p>
              <div className="space-y-2">
                {problem.shopCards.map((shop) => (
                  <div
                    key={shop.name}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border p-3',
                      shop.featured
                        ? 'border-[#3b72ff]/40 bg-[#3b72ff]/10'
                        : 'border-white/10 bg-white/5',
                    )}
                  >
                    <span className="text-xl">{shop.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#00d48a]">{shop.name}</p>
                      <p className="text-xs text-white/50">{shop.meta}</p>
                    </div>
                    {shop.badge ? (
                      <span className="shrink-0 rounded-full bg-[#00d48a]/20 px-2 py-0.5 text-[10px] font-semibold text-[#00d48a]">
                        {shop.badge}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </SectionShell>
  );
}
