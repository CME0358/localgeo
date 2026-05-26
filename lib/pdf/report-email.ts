import { SITE_URL } from '@/lib/constants/site';
import { buildReportAnalysis } from '@/lib/pdf/report-analysis';
import type { DiagnosisResult } from '@/lib/types/diagnosis';

type IssueLevel = 'critical' | 'medium' | 'low';

interface EmailIssue {
  level: IssueLevel;
  title: string;
  text: string;
}

function scoreToLevel(score: number): IssueLevel {
  if (score < 40) return 'critical';
  if (score < 70) return 'medium';
  return 'low';
}

function buildEmailIssues(data: DiagnosisResult): EmailIssue[] {
  const analysis = buildReportAnalysis(data);
  const blocks = [
    { title: 'FAQ最適化', ...analysis.page2.faq },
    { title: 'GoogleMap最適化', ...analysis.page2.googleMap },
    { title: 'AI引用', ...analysis.page2.aiCitation },
    { title: '口コミ分析', ...analysis.page2.reviews },
  ];

  const issues = blocks
    .filter((block) => block.score < 70)
    .map((block) => ({
      level: scoreToLevel(block.score),
      title: block.title,
      text: block.text,
    }));

  if (issues.length > 0) return issues.slice(0, 4);

  return analysis.page3.improvements.slice(0, 3).map((text, i) => ({
    level: (i === 0 ? 'medium' : 'low') as IssueLevel,
    title: '改善提案',
    text,
  }));
}

export function buildReportEmailHtml({
  greeting,
  shopName,
  area,
  industry,
  aiVisibilityScore,
  issues,
}: {
  greeting: string;
  shopName: string;
  area: string;
  industry: string;
  aiVisibilityScore: number;
  issues: EmailIssue[];
}): string {
  const scoreColor =
    aiVisibilityScore < 40 ? '#FF6B35' : aiVisibilityScore < 65 ? '#FFC107' : '#00E5A0';

  return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <div style="background:#0D1220;padding:28px 36px;">
      <p style="margin:0 0 4px;font-size:11px;color:#00E5A0;letter-spacing:2px;font-weight:700;">GEO SEARCH PROTOCOL FOR LOCAL</p>
      <h1 style="margin:0;font-size:20px;color:#ffffff;font-weight:700;">AI Visibility Report</h1>
      <p style="margin:8px 0 0;font-size:13px;color:#6B7280;">${area} · ${industry} | ${shopName}</p>
    </div>

    <div style="padding:32px 36px;">
      <p style="color:#374151;line-height:1.7;margin:0 0 20px;">${greeting}</p>
      <p style="color:#374151;line-height:1.7;margin:0 0 24px;">
        この度はGEO Search Protocol™ for Localの無料AI診断をご利用いただき、ありがとうございます。<br>
        診断結果のPDFレポート（全7ページ）を添付いたしました。
      </p>

      <div style="background:#F8FAFC;border-radius:10px;padding:24px;margin-bottom:24px;text-align:center;border:1px solid #E5E7EB;">
        <p style="margin:0 0 8px;font-size:12px;color:#6B7280;letter-spacing:1px;">AI VISIBILITY SCORE</p>
        <p style="margin:0;font-size:56px;font-weight:700;color:${scoreColor};line-height:1;">${aiVisibilityScore}</p>
        <p style="margin:6px 0 0;font-size:13px;color:#6B7280;">/ 100点</p>
      </div>

      <h3 style="margin:0 0 12px;font-size:14px;color:#111827;font-weight:700;">検出された主な課題</h3>
      <div style="margin-bottom:24px;">
        ${issues
          .map((issue) => {
            const color =
              issue.level === 'critical'
                ? '#FF6B35'
                : issue.level === 'medium'
                  ? '#FFC107'
                  : '#0099FF';
            return `<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px;background:#F9FAFB;border-left:3px solid ${color};border-radius:4px;margin-bottom:8px;">
            <span style="font-size:13px;color:#374151;line-height:1.5;"><strong>${issue.title}</strong>　${issue.text}</span>
          </div>`;
          })
          .join('')}
      </div>

      <div style="background:linear-gradient(135deg,#0D1220,#1a2540);border-radius:10px;padding:24px;text-align:center;margin-bottom:24px;">
        <p style="margin:0 0 6px;color:#00E5A0;font-size:12px;font-weight:700;letter-spacing:1px;">NEXT STEP</p>
        <p style="margin:0 0 16px;color:#ffffff;font-size:15px;font-weight:700;">具体的な改善プランを無料でご提案します</p>
        <p style="margin:0 0 20px;color:#9CA3AF;font-size:13px;line-height:1.6;">Zoom30分の無料相談で、貴店舗の<br>GEO改善ロードマップをお渡しします。</p>
        <a href="https://www.coaretail.com/geo_schedule" style="display:inline-block;background:#00E5A0;color:#000000;font-weight:700;font-size:14px;padding:14px 32px;border-radius:6px;text-decoration:none;">
          📞 無料Zoom相談を予約する
        </a>
      </div>

      <p style="color:#9CA3AF;font-size:12px;line-height:1.7;margin:0;">
        詳細な診断内容・競合比較・改善ロードマップは添付のPDFレポートをご確認ください。<br>
        ご不明点はお気軽にご返信ください。
      </p>
    </div>

    <div style="background:#F9FAFB;padding:20px 36px;border-top:1px solid #E5E7EB;">
      <p style="margin:0;font-size:11px;color:#9CA3AF;line-height:1.6;">
        合同会社コア・リテール　GEO Search Protocol™ for Local<br>
        <a href="${SITE_URL}" style="color:#00E5A0;text-decoration:none;">${SITE_URL.replace(/^https:\/\//, '')}</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

export function buildReportEmailContent(data: DiagnosisResult, contactName: string | null) {
  const greeting = contactName ? `${contactName} 様` : `${data.shopName} ご担当者様`;
  const issues = buildEmailIssues(data);

  return {
    subject: `【AI Visibility Report】${data.shopName} — GEO Search Protocol for Local`,
    html: buildReportEmailHtml({
      greeting,
      shopName: data.shopName,
      area: data.area,
      industry: data.industry,
      aiVisibilityScore: data.scores.aiVisibilityScore,
      issues,
    }),
  };
}
