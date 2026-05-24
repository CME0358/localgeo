'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { InfoCard } from '@/components/ui/InfoCard';
import { MotionItem, MotionStagger, SectionShell } from '@/components/ui/SectionShell';
import { Tm } from '@/components/ui/Tm';
import { AI_SIGNALS, COMPARISON_SECTION } from '@/lib/comparison';

const FLOW_ALT = '検索 → AIが店舗を理解 → AIが推薦 → 来店';

function FlowDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-4xl"
    >
      <Image
        src="/S3_frow_v.png"
        alt={FLOW_ALT}
        width={1086}
        height={1448}
        className="mx-auto h-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:hidden"
        sizes="(max-width: 1023px) 360px"
        priority={false}
      />
      <Image
        src="/S3_frow_h.png"
        alt={FLOW_ALT}
        width={2172}
        height={724}
        className="mx-auto hidden h-auto w-full max-w-4xl lg:block"
        sizes="(min-width: 1024px) 896px"
        priority={false}
      />
    </motion.div>
  );
}

export function Comparison() {
  const section = COMPARISON_SECTION;

  return (
    <SectionShell
      id="comparison"
      eyebrow={section.eyebrow}
      title={
        <>
          {section.titleLines[0]}
          <br />
          {section.titleLines[1]}
        </>
      }
      subtitle={
        <div className="space-y-4 text-base leading-relaxed text-[#6a6a6a] md:text-lg">
          <p>
            {section.meoIntro}
            <span className="mt-2 block">
              {section.meoFocusItems.map((item) => (
                <span key={item} className="mr-3 inline-flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#6a6a6a]" />
                  {item}
                </span>
              ))}
            </span>
            {section.meoFocusSuffix}
          </p>
          <p>
            {section.aiIntro}
            <span className="mt-1 block font-semibold text-[#222222]">{section.aiFocus}</span>
            {section.aiFocusSuffix}
          </p>
        </div>
      }
    >
      <div className="relative -mx-6 overflow-hidden bg-[#060d2e] px-6 py-14 md:-mx-8 md:px-8 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(59,114,255,0.22) 0%, transparent 55%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl space-y-10 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
              {section.aiSignalsTitleLines[0]}
              <br />
              {section.aiSignalsTitleLines[1]}
            </h3>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {AI_SIGNALS.map((signal, index) => (
              <InfoCard
                key={signal.title}
                title={signal.title}
                description={signal.description}
                icon={signal.icon}
                index={index}
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-xl font-bold leading-snug text-white md:text-2xl lg:text-3xl"
          >
            {section.aiSignalsFooterLines[0]}
            <br />
            <span className="bg-gradient-to-r from-[#00d48a] to-[#3b72ff] bg-clip-text text-transparent">
              {section.aiSignalsFooterLines[1]}
            </span>
            <br />
            {section.aiSignalsFooterLines[2]}
          </motion.p>
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <FlowDiagram />
      </div>

      <MotionStagger className="grid gap-6 md:grid-cols-2">
        <MotionItem>
          <Card variant="light" className="flex h-full flex-col p-6 md:p-8">
            <p className="text-sm font-semibold text-[#6a6a6a]">{section.old.label}</p>
            <h3 className="mt-3 text-2xl font-bold text-[#6a6a6a]">{section.old.title}</h3>
            <ul className="mt-6 flex-1 space-y-3">
              {section.old.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-black/5 pb-3 text-[#6a6a6a] last:border-0"
                >
                  <span className="mt-0.5 text-[#999]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[#999]">{section.old.footer}</p>
          </Card>
        </MotionItem>

        <MotionItem>
          <Card variant="dark" className="relative flex h-full flex-col overflow-hidden p-6 md:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#3b72ff] to-[#00d48a]" />
            <p className="text-sm font-semibold text-[#00c2ff]">
              ✦ GEO Search Protocol
              <Tm />
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white">{section.new.title}</h3>
            <ul className="mt-6 flex-1 space-y-3">
              {section.new.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-white/10 pb-3 text-white/85 last:border-0"
                >
                  <span className="mt-0.5 text-[#00d48a]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-medium text-[#00d48a]">{section.new.footer}</p>
          </Card>
        </MotionItem>
      </MotionStagger>
    </SectionShell>
  );
}
