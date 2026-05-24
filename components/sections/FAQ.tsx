'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { SectionShell } from '@/components/ui/SectionShell';
import { Tm } from '@/components/ui/Tm';
import { FAQ_ITEMS, FAQ_SECTION } from '@/lib/faq';
import { cn } from '@/lib/utils';

function RichFaqText({ text }: { text: string }) {
  if (!text.includes('Local GEO™')) {
    return text;
  }

  const parts = text.split('Local GEO™');
  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 ? (
            <>
              Local GEO
              <Tm />
            </>
          ) : null}
        </span>
      ))}
    </>
  );
}

function FaqAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <GlassPanel className="overflow-hidden transition-colors hover:border-white/15">
      <button
        type="button"
        id={`faq-question-${index}`}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left md:px-6 md:py-6"
      >
        <span className="text-base font-semibold leading-relaxed text-white md:text-lg">
          <RichFaqText text={item.question} />
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm text-white/70"
          aria-hidden
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-white/10 px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                <RichFaqText text={item.lead} />
              </p>

              {item.bullets?.length ? (
                <ul className="space-y-2">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-white/80 md:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3b72ff]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {item.closing ? (
                <p className="text-sm leading-relaxed text-white/70 md:text-base">
                  <RichFaqText text={item.closing} />
                </p>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </GlassPanel>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionShell
      id="faq"
      dark
      align="center"
      className="relative overflow-hidden bg-[#060d2e]"
      eyebrow={FAQ_SECTION.eyebrow}
      title={FAQ_SECTION.title}
      subtitle={
        <>
          {FAQ_SECTION.subtitleLines.map((line) => (
            <span key={line} className="block">
              <RichFaqText text={line} />
            </span>
          ))}
        </>
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(59,114,255,0.18) 0%, transparent 55%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn('relative mx-auto flex w-full max-w-3xl flex-col gap-3 md:gap-4')}
      >
        {FAQ_ITEMS.map((item, index) => (
          <FaqAccordionItem
            key={item.question}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
          />
        ))}
      </motion.div>
    </SectionShell>
  );
}
