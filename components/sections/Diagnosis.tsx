'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { defaultLandingContent } from '@/lib/content/default-landing';
import { INDUSTRIES } from '@/lib/constants/diagnosis';
import { useDiagnosis } from '@/hooks/useDiagnosis';
import { SectionShell } from '@/components/ui/SectionShell';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { DiagnosisLoader } from '@/components/ui/DiagnosisLoader';
import { ScoreGauge } from '@/components/ui/ScoreGauge';
import { RadarChart } from '@/components/ui/RadarChart';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const content = defaultLandingContent.diagnosis;

function insightClass(status: string) {
  if (status === 'good') return 'text-[#00d48a]';
  if (status === 'warn') return 'text-[#febc2e]';
  return 'text-[#ff385c]';
}

export function Diagnosis() {
  const { state, runDiagnosis, submitReport, retryReport } = useDiagnosis();
  const [shopName, setShopName] = useState('');
  const [area, setArea] = useState('');
  const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [reportShop, setReportShop] = useState('');

  const onSubmitDiagnosis = (e: FormEvent) => {
    e.preventDefault();
    void runDiagnosis({ shopName, area, industry });
  };

  const onSubmitReport = (e: FormEvent) => {
    e.preventDefault();
    void submitReport({ email, contactName, shopName: reportShop || shopName });
  };

  return (
    <SectionShell
      id="diagnosis"
      className="bg-[#060d2e]"
      eyebrow={content.eyebrow}
      title={
        <>
          {content.titleLines.map((line, i) => (
            <span key={line}>
              {line}
              {i < content.titleLines.length - 1 && <br />}
            </span>
          ))}
        </>
      }
      subtitle={
        <>
          {content.subtitleLines.map((line, i) => (
            <span key={line}>
              {line}
              {i < content.subtitleLines.length - 1 && <br />}
            </span>
          ))}
        </>
      }
      align="center"
      dark
    >
      <div className="grid gap-8 lg:grid-cols-2">
          <GlassPanel className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-white">{content.form.title}</h3>
            <p className="mt-2 text-sm text-white/55">{content.form.subtitle}</p>

            <form onSubmit={onSubmitDiagnosis} className="mt-6 space-y-4" noValidate>
              <div>
                <label htmlFor="diag-shop" className="text-xs font-semibold text-white/55">
                  店舗名 *
                </label>
                <input
                  id="diag-shop"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-white outline-none focus:border-[#3b72ff]/80 focus:ring-2 focus:ring-[#3b72ff]/25"
                  placeholder="例：さくら整体院 渋谷店"
                  required
                />
              </div>
              <div>
                <label htmlFor="diag-area" className="text-xs font-semibold text-white/55">
                  地域 *
                </label>
                <input
                  id="diag-area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-white outline-none focus:border-[#3b72ff]/80 focus:ring-2 focus:ring-[#3b72ff]/25"
                  placeholder="例：渋谷区、恵比寿など"
                  required
                />
              </div>
              <div>
                <label htmlFor="diag-industry" className="text-xs font-semibold text-white/55">
                  業種 *
                </label>
                <select
                  id="diag-industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-white outline-none focus:border-[#3b72ff]/80"
                  required
                >
                  <option value="">選択してください</option>
                  {INDUSTRIES.map((opt) => (
                    <option key={opt.value} value={opt.value} className="text-black">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {state.formError && (
                <p className="text-sm text-[#ff8b88]" role="alert">
                  {state.formError}
                </p>
              )}

              <Button type="submit" className="w-full">
                {content.form.submitLabel}
              </Button>
            </form>
            <p className="mt-3 text-center text-xs text-white/35">{content.form.footnote}</p>
          </GlassPanel>

          <GlassPanel className="min-h-[420px] p-6 md:p-8" aria-live="polite">
            {state.status === 'idle' && (
              <div className="flex h-full flex-col justify-center text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#00d48a]">
                  AI Visibility Dashboard
                </p>
                <p className="mt-3 text-lg font-bold text-white">診断結果がここに表示されます</p>
              </div>
            )}

            {(state.status === 'loading' || state.status === 'report-loading') && (
              <DiagnosisLoader
                mode={state.status === 'report-loading' ? 'report' : 'diagnosis'}
                stepIndex={state.loadingStep}
                stepLabel={
                  state.status === 'report-loading'
                    ? `AIレポートを生成しています… ${state.loadingLabel}`
                    : state.loadingLabel
                }
              />
            )}

            {state.status === 'results' && state.result && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <header className="border-b border-white/10 pb-4">
                  <p className="text-xs uppercase tracking-widest text-white/45">診断レポート</p>
                  <h4 className="mt-1 text-xl font-bold text-white">{state.result.shopName}</h4>
                  <p className="text-sm text-white/55">
                    {state.result.area} · {state.result.industry}
                  </p>
                </header>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <ScoreGauge label="Local GEO Score" value={state.result.scores.localGeoScore} />
                  <ScoreGauge label="AI Visibility Score" value={state.result.scores.aiVisibilityScore} />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <RadarChart data={state.result.radar} />
                  <div className="space-y-3 text-sm">
                    {[
                      ['FAQ最適化率', state.result.scores.faqOptimizationRate],
                      ['GoogleMap最適化率', state.result.scores.googleMapOptimizationRate],
                      ['AI推薦可能性', state.result.scores.aiRecommendationPotential],
                    ].map(([label, val]) => (
                      <div key={label as string}>
                        <div className="mb-1 flex justify-between text-white/70">
                          <span>{label}</span>
                          <span>{val as number}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[#3b72ff] to-[#00d48a]"
                            initial={{ width: 0 }}
                            animate={{ width: `${val}%` }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {(
                    [
                      ['AI引用状況', state.result.insights.aiCitation],
                      ['口コミ分析', state.result.insights.reviews],
                      ['GoogleMap最適化', state.result.insights.aiRecommendation],
                    ] as const
                  ).map(([label, insight]) => (
                    <div key={String(label)} className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <p className="text-[10px] text-white/45">{String(label)}</p>
                      <p className={cn('mt-1 text-sm font-semibold', insightClass(insight.status))}>
                        {insight.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-xl border border-[#3b72ff]/30 bg-gradient-to-br from-[#1b56b0]/20 to-[#060d2e]/60 p-5 backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#00d48a]">Detailed Report Ready</p>
                  <h5 className="mt-2 text-lg font-bold text-white">{content.dashboard.reportTitle}</h5>
                  <p className="mt-2 text-sm text-white/60">{content.dashboard.reportDesc}</p>
                  <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/75">
                    {content.dashboard.reportList.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00d48a]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <form onSubmit={onSubmitReport} className="mt-6 space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-white outline-none focus:border-[#3b72ff]/80"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={reportShop || shopName}
                        onChange={(e) => setReportShop(e.target.value)}
                        placeholder="店舗名（任意）"
                        className="rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-white outline-none"
                      />
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="担当者名（任意）"
                        className="rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-white outline-none"
                      />
                    </div>
                    {state.reportError && (
                      <p className="text-sm text-[#ff8b88]">{state.reportError}</p>
                    )}
                    <Button type="submit" className="w-full bg-gradient-to-r from-[#1B56B0] to-[#0D1B3E]">
                      {content.dashboard.reportSubmitLabel}
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}

            {state.status === 'report-complete' && state.reportEmail && (
              <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#00d48a] text-2xl text-[#00d48a]">
                  ✓
                </div>
                <h4 className="mt-6 text-xl font-bold text-white">{content.dashboard.reportCompleteTitle}</h4>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  入力いただいたメールアドレス
                  <br />
                  <strong className="text-white">{state.reportEmail}</strong>
                  <br />
                  へ詳細レポートを送付しました。
                </p>
                <p className="mt-4 text-xs text-white/45">{content.dashboard.reportCompleteSub}</p>
              </div>
            )}

            {state.status === 'error' && !state.result && (
              <div className="py-8 text-center">
                <p className="font-bold text-white">診断できませんでした</p>
                <p className="mt-2 text-sm text-[#ff8b88]">{state.formError}</p>
              </div>
            )}

            {state.status === 'error' && state.result && state.reportError && (
              <div className="py-8 text-center">
                <p className="font-bold text-white">レポート送信に失敗しました</p>
                <p className="mt-2 text-sm text-[#ff8b88]">{state.reportError}</p>
                <Button variant="secondary" className="mt-4" onClick={retryReport}>
                  もう一度試す
                </Button>
              </div>
            )}
          </GlassPanel>
      </div>
    </SectionShell>
  );
}
