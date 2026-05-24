'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { SectionShell } from '@/components/ui/SectionShell';
import { Tm } from '@/components/ui/Tm';
import { defaultLanding } from '@/lib/content/default-landing';
import { cn } from '@/lib/utils';

function BrowserChrome({
  url,
  children,
  onClick,
  className,
}: {
  url: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-black/8 bg-white',
        onClick && 'cursor-zoom-in transition-shadow hover:shadow-lg',
        className,
      )}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#f2f2f2] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-1 truncate text-[10px] text-[#6a6a6a] md:text-xs">{url}</span>
      </div>
      {children}
    </div>
  );
}

export function CaseStudy() {
  const { caseStudy } = defaultLanding;
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxSrc, closeLightbox]);

  return (
    <>
      <SectionShell
        id="case-study"
        className="bg-white"
        eyebrow={caseStudy.eyebrow}
        title={
          <>
            {caseStudy.titleLines.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {i === caseStudy.titleLines.length - 1 ? (
                  <span className="whitespace-nowrap">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </>
        }
        subtitle={caseStudy.subtitle}
      >
        <Card variant="light" className="overflow-hidden p-6 md:p-8">
          <div className="mb-6 inline-flex rounded-full bg-[#3b72ff]/10 px-4 py-1.5 text-xs font-semibold text-[#3b72ff] md:text-sm">
            {caseStudy.badge}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {caseStudy.images.map((image) => (
              <BrowserChrome
                key={image.url}
                url={image.browserUrl}
                onClick={image.zoomable ? () => setLightboxSrc(image.url) : undefined}
              >
                <div className="relative aspect-[4/3] bg-[#f8f9fc]">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="border-t border-black/5 px-3 py-2 text-xs text-[#6a6a6a] md:text-sm">
                  {image.caption}
                </p>
              </BrowserChrome>
            ))}
          </div>

          <div className="mt-6 space-y-1 text-sm text-[#222222] md:text-base">
            <p>
              対象店舗：<strong>{caseStudy.storeInfo.storeName}</strong>
              <span className="text-[#6a6a6a]"> {caseStudy.storeInfo.area}</span>
            </p>
            <p className="font-medium text-[#3b72ff]">{caseStudy.storeInfo.outcome}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-[#f8f9fc] p-5">
              <h4 className="font-bold text-[#6a6a6a]">{caseStudy.before.title}</h4>
              <ul className="mt-3 space-y-2">
                {caseStudy.before.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#6a6a6a]">
                    <span>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#3b72ff]/20 bg-[#3b72ff]/5 p-5">
              <h4 className="font-bold text-[#3b72ff]">{caseStudy.after.title}</h4>
              <ul className="mt-3 space-y-2">
                {caseStudy.after.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#222222]">
                    <span className="text-[#3b72ff]">•</span>
                    {item.includes('Local GEO') ? (
                      <>
                        {item.split('Local GEO™')[0]}
                        Local GEO<Tm />
                        {item.split('Local GEO™')[1]}
                      </>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <blockquote className="mt-8 rounded-xl border border-black/5 bg-[#f8f9fc] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#3b72ff]">
              {caseStudy.quote.label}
            </p>
            <p className="mt-3 text-lg font-bold text-[#222222]">{caseStudy.quote.lead}</p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#6a6a6a] md:text-base">
              {caseStudy.quote.bodyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>
                  {paragraph.split('Local GEO™').map((part, index, arr) =>
                    index < arr.length - 1 ? (
                      <span key={index}>
                        {part}
                        Local GEO<Tm />
                      </span>
                    ) : (
                      part
                    ),
                  )}
                </p>
              ))}
            </div>
          </blockquote>

          <div className="mt-8">
            <h4 className="text-lg font-bold text-[#222222]">{caseStudy.results.title}</h4>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {caseStudy.results.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-black/5 bg-white p-4 text-center"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6a6a6a]">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-lg font-bold text-[#222222]">
                    {metric.value.includes('Local GEO') ? (
                      <>
                        HP＋Local GEO<Tm />
                      </>
                    ) : (
                      metric.value
                    )}
                  </p>
                  <p className="mt-1 text-sm text-[#6a6a6a]">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {caseStudy.compare.map((box) => (
              <div
                key={box.title}
                className={cn(
                  'rounded-xl border p-5',
                  box.variant === 'yes'
                    ? 'border-[#00d48a]/30 bg-[#00d48a]/5'
                    : 'border-[#ff385c]/20 bg-[#ff385c]/5',
                )}
              >
                <h4
                  className={cn(
                    'font-bold',
                    box.variant === 'yes' ? 'text-[#00d48a]' : 'text-[#ff385c]',
                  )}
                >
                  {box.title.includes('Local GEO') ? (
                    <>
                      Local GEO<Tm /> {box.variant === 'yes' ? '対策あり' : '対策なし'}
                    </>
                  ) : (
                    box.title
                  )}
                </h4>
                <div className="mt-3 space-y-1 text-sm">
                  {box.items.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </SectionShell>

      {lightboxSrc ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal
          aria-label="画像拡大表示"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            閉じる
          </button>
          <div
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt="ChatGPT検索結果 拡大"
              width={1200}
              height={900}
              className="h-auto max-h-[90vh] w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
