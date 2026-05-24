'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { LOADING_STEPS, REPORT_LOADING_STEPS } from '@/lib/constants/diagnosis';
import { cn } from '@/lib/utils';

interface DiagnosisLoaderProps {
  mode: 'diagnosis' | 'report';
  stepIndex: number;
  stepLabel: string;
  className?: string;
}

const DIAGNOSIS_NODES = [
  { id: 'gpt', label: 'ChatGPT', color: '#00d48a', angle: -90 },
  { id: 'gemini', label: 'Gemini', color: '#3b72ff', angle: 0 },
  { id: 'maps', label: 'GoogleMap', color: '#febc2e', angle: 90 },
  { id: 'score', label: 'AI Score', color: '#ff385c', angle: 180 },
] as const;

const REPORT_NODES = [
  { id: 'pdf', label: 'PDF', color: '#3b72ff' },
  { id: 'ai', label: 'AI統合', color: '#00d48a' },
  { id: 'send', label: 'Report', color: '#ff385c' },
] as const;

function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,114,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,114,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,114,255,0.22)_0%,transparent_68%)]"
        animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function RadarVisual({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="relative mx-auto h-44 w-44 md:h-52 md:w-52">
      {[1, 0.72, 0.44].map((scale, i) => (
        <motion.div
          key={scale}
          className="absolute inset-0 rounded-full border border-[#3b72ff]/25"
          style={{ margin: `${(1 - scale) * 50}%` }}
          animate={{ opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}

      <motion.div
        className="absolute inset-0 origin-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-bottom-left -translate-y-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0,212,138,0.55) 52deg, transparent 88deg)',
          }}
        />
      </motion.div>

      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d48a] shadow-[0_0_18px_#00d48a]" />

      {DIAGNOSIS_NODES.map((node, i) => {
        const active = i <= stepIndex;
        const rad = (node.angle * Math.PI) / 180;
        const r = 46;
        const x = 50 + Math.cos(rad) * r;
        const y = 50 + Math.sin(rad) * r;
        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
            transition={{ duration: 1.6, repeat: active ? Infinity : 0 }}
          >
            <div
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm md:text-xs',
                active ? 'text-white shadow-lg' : 'border border-white/15 bg-white/5 text-white/35',
              )}
              style={
                active
                  ? { backgroundColor: `${node.color}33`, boxShadow: `0 0 16px ${node.color}55`, color: node.color }
                  : undefined
              }
            >
              {node.label}
            </div>
          </motion.div>
        );
      })}

      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#00d48a]"
          style={{ left: `${28 + i * 18}%`, top: `${38 + (i % 2) * 22}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </div>
  );
}

function ReportVisual({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="relative mx-auto flex h-44 w-full max-w-xs items-end justify-center gap-3 md:h-52">
      {[0, 1, 2].map((i) => {
        const active = i <= stepIndex;
        const node = REPORT_NODES[i];
        return (
          <motion.div
            key={node.id}
            className="relative flex flex-col items-center gap-2"
            animate={{ y: active ? [0, -6, 0] : 0 }}
            transition={{ duration: 1.4, repeat: active ? Infinity : 0, delay: i * 0.15 }}
          >
            <motion.div
              className={cn(
                'relative overflow-hidden rounded-lg border backdrop-blur-sm',
                i === 1 ? 'h-24 w-20 md:h-28 md:w-24' : 'h-20 w-16 md:h-24 md:w-20',
                active ? 'border-white/25 bg-white/10' : 'border-white/10 bg-white/5',
              )}
              style={active ? { boxShadow: `0 0 24px ${node.color}44` } : undefined}
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: active ? node.color : 'rgba(255,255,255,0.15)' }}
              />
              {[0, 1, 2, 3].map((line) => (
                <motion.div
                  key={line}
                  className="mx-2 mt-3 h-1 rounded-full bg-white/20"
                  style={{ width: `${70 - line * 10}%` }}
                  animate={active ? { opacity: [0.3, 0.9, 0.3] } : { opacity: 0.2 }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: line * 0.12 + i * 0.2 }}
                />
              ))}
              {i === 1 && active ? (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3b72ff]/20 to-transparent"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                />
              ) : null}
            </motion.div>
            <span
              className="text-[10px] font-semibold md:text-xs"
              style={{ color: active ? node.color : 'rgba(255,255,255,0.35)' }}
            >
              {node.label}
            </span>
          </motion.div>
        );
      })}

      <motion.div
        className="pointer-events-none absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b72ff]/60 to-transparent"
        animate={{ opacity: [0.2, 0.9, 0.2], scaleX: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

function StepPipeline({
  steps,
  stepIndex,
  mode,
}: {
  steps: readonly string[];
  stepIndex: number;
  mode: 'diagnosis' | 'report';
}) {
  return (
    <ul className="mt-8 w-full max-w-md space-y-2">
      {steps.map((label, i) => {
        const done = i < stepIndex;
        const active = i === stepIndex;
        return (
          <motion.li
            key={label}
            className={cn(
              'flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors',
              active && 'border-[#3b72ff]/50 bg-[#3b72ff]/10',
              done && 'border-[#00d48a]/30 bg-[#00d48a]/5',
              !active && !done && 'border-white/8 bg-white/[0.02]',
            )}
            animate={active ? { x: [0, 3, 0] } : { x: 0 }}
            transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
          >
            <span
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                done && 'bg-[#00d48a]/20 text-[#00d48a]',
                active && 'bg-[#3b72ff]/25 text-[#3b72ff]',
                !done && !active && 'bg-white/5 text-white/30',
              )}
            >
              {done ? '✓' : i + 1}
            </span>
            <span
              className={cn(
                'text-xs md:text-sm',
                active && 'font-semibold text-white',
                done && 'text-white/65',
                !active && !done && 'text-white/35',
              )}
            >
              {label}
            </span>
            {active ? (
              <motion.span
                className="ml-auto h-2 w-2 rounded-full bg-[#3b72ff]"
                animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            ) : null}
          </motion.li>
        );
      })}
      <p className="pt-1 text-center text-[10px] uppercase tracking-[0.2em] text-white/30">
        {mode === 'diagnosis' ? 'AI Visibility Scan' : 'Report Pipeline'}
      </p>
    </ul>
  );
}

export function DiagnosisLoader({ mode, stepIndex, stepLabel, className }: DiagnosisLoaderProps) {
  const steps = mode === 'diagnosis' ? LOADING_STEPS : REPORT_LOADING_STEPS;
  const progress = Math.min(100, Math.round(((stepIndex + 1) / steps.length) * 100));

  return (
    <div
      className={cn(
        'relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden px-2 py-6 text-center',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <GridBackground />

      <div className="relative z-10 w-full">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00d48a] md:text-xs">
          {mode === 'diagnosis' ? '● Live AI Scan' : '● Report Generator'}
        </p>

        {mode === 'diagnosis' ? <RadarVisual stepIndex={stepIndex} /> : <ReportVisual stepIndex={stepIndex} />}

        <AnimatePresence mode="wait">
          <motion.p
            key={stepLabel}
            className="mt-4 text-sm font-semibold text-white md:text-base"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {stepLabel}
          </motion.p>
        </AnimatePresence>

        <div className="mx-auto mt-4 w-full max-w-xs">
          <div className="mb-1 flex justify-between text-[10px] text-white/45">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className={cn(
                'h-full rounded-full',
                mode === 'diagnosis'
                  ? 'bg-gradient-to-r from-[#3b72ff] via-[#00d48a] to-[#3b72ff]'
                  : 'bg-gradient-to-r from-[#1b56b0] via-[#00d48a] to-[#ff385c]',
              )}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        <StepPipeline steps={steps} stepIndex={stepIndex} mode={mode} />
      </div>
    </div>
  );
}
