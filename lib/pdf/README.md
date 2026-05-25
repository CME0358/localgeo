# PDF レポート（7ページマージ）

## 構成

| ページ | 内容 | ソース |
| --- | --- | --- |
| 1〜3 | 店舗別診断（スコア・分析・競合） | `generate-pdf.ts`（動的） |
| 4〜7 | 危機訴求・原因・リスク・ロードマップ | `education-template-pages.ts` |

`/api/pdf` は `merge-report-pdf.ts` の `generateFullReportPdf()` を使用し、**7ページPDF**をメール添付する。

## 外部テンプレPDFに差し替え

**格納場所（推奨）**

```
10_Projects/Local GEO/web/lib/pdf/templates/education-4pages.pdf
```

このパスに置けば `MERGE_PDF_TEMPLATE_PATH` は **不要**（自動検出）。

別パスを使う場合のみ `.env.local` / Vercel Production:

```bash
MERGE_PDF_TEMPLATE_PATH=/absolute/path/to/education-4pages.pdf
```

- 4ページ・A4横（841.89 × 595.28 pt）推奨
- **git commit 必須**（Vercel がサーバーから read するため）
- `public/` には置かない
- 編集原本（Pages等）: `lib/pdf/templates/source/`（任意）
- 未配置時は `education-template-pages.ts` のプログラム生成4ページ
- **2026-05-25**: `education-4pages.pdf` 配置済（4P・842×595pt）

## 関連ファイル

- `lib/pdf/generate-pdf.ts` — 診断3ページ
- `lib/pdf/education-template-pages.ts` — 教育4ページ
- `lib/pdf/merge-report-pdf.ts` — マージ
- `app/api/pdf/route.ts` — 送付API
