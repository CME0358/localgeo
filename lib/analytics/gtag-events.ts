type DiagnosisEventContext = {
  industry?: string;
  area?: string;
};

function pushEvent(name: string, params: Record<string, string | undefined>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, {
    page_location: window.location.href,
    ...params,
  });
}

/** 診断フォーム送信開始（店舗名・地域・業種入力後） */
export function trackDiagnosisStart(context: DiagnosisEventContext) {
  pushEvent('diagnosis_start', {
    industry: context.industry,
    area: context.area,
  });
}

/** AI診断結果表示完了 */
export function trackDiagnosisComplete(context: DiagnosisEventContext) {
  pushEvent('diagnosis_complete', {
    industry: context.industry,
    area: context.area,
  });
}

/** レポート送付完了（コンバージョン） */
export function trackFormSubmit(context: DiagnosisEventContext) {
  pushEvent('form_submit', {
    industry: context.industry,
    area: context.area,
  });
}
