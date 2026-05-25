# PDF テンプレート（教育4ページ）

デザイン済みPDFは **このフォルダ** に置く。

## ファイル名（既定）

| ファイル | 用途 |
| --- | --- |
| `education-4pages.pdf` | マージ用・教育4ページ（A4横） |
| `source/` | 任意：Pages / Keynote / Figma 書き出し元 |

## 仕様

- **ページ数**: 4（診断動的3Pの後に結合）
- **サイズ**: A4横 — 841.89 × 595.28 pt（診断PDFと同一）
- **内容**: 危機フック → 原因 → 放置リスク → ロードマップ＋サービス
- **差し込み**: テンプレ内に `{shopName}` 等の動的差込は不可（固定デザイン）。店舗名は先頭3Pで表示済み

## 環境変数（任意）

既定パスに `education-4pages.pdf` を置けば **env 不要**。

別名・別場所を使う場合のみ `.env.local` / Vercel:

```bash
MERGE_PDF_TEMPLATE_PATH=/absolute/path/to/your-template.pdf
```

## デプロイ（Vercel）

- テンプレPDFは **git に commit** する（サーバーが `readFileSync` で読むため）
- `public/` には置かない（URL公開不要・誤ダウンロード防止）

## 原本（Pages 等）

- 編集用原本: `source/` サブフォルダ（任意）
- Vault 全体の生成物ルールに従う場合、配布用PDFのみこの `templates/` に置く
