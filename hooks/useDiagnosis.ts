'use client';

import { useCallback, useReducer } from 'react';
import { LOADING_STEPS, REPORT_LOADING_STEPS } from '@/lib/constants/diagnosis';
import { fetchDiagnosis, notifyLead, sendReport } from '@/lib/api';
import type { DiagnosisInput, DiagnosisResult, DiagnosisState } from '@/lib/types/diagnosis';

const USE_MOCK = process.env.NEXT_PUBLIC_DIAGNOSIS_USE_MOCK !== 'false';

interface DiagnosisUiState {
  status: DiagnosisState;
  result: DiagnosisResult | null;
  loadingStep: number;
  loadingLabel: string;
  formError: string;
  reportError: string;
  reportEmail: string | null;
}

type Action =
  | { type: 'SUBMIT_START' }
  | { type: 'LOADING_STEP'; index: number; label: string }
  | { type: 'SUBMIT_SUCCESS'; result: DiagnosisResult }
  | { type: 'SUBMIT_ERROR'; message: string }
  | { type: 'REPORT_START' }
  | { type: 'REPORT_STEP'; index: number; label: string }
  | { type: 'REPORT_SUCCESS'; email: string }
  | { type: 'REPORT_ERROR'; message: string }
  | { type: 'RESET_REPORT' };

const initialState: DiagnosisUiState = {
  status: 'idle',
  result: null,
  loadingStep: 0,
  loadingLabel: '',
  formError: '',
  reportError: '',
  reportEmail: null,
};

function reducer(state: DiagnosisUiState, action: Action): DiagnosisUiState {
  switch (action.type) {
    case 'SUBMIT_START':
      return {
        ...state,
        status: 'loading',
        loadingStep: 0,
        loadingLabel: LOADING_STEPS[0] ?? '',
        formError: '',
        reportError: '',
        reportEmail: null,
      };
    case 'LOADING_STEP':
      return { ...state, loadingStep: action.index, loadingLabel: action.label };
    case 'SUBMIT_SUCCESS':
      return { ...state, status: 'results', result: action.result };
    case 'SUBMIT_ERROR':
      return { ...state, status: 'error', formError: action.message };
    case 'REPORT_START':
      return {
        ...state,
        status: 'report-loading',
        loadingStep: 0,
        loadingLabel: REPORT_LOADING_STEPS[0] ?? '',
        reportError: '',
      };
    case 'REPORT_STEP':
      return { ...state, loadingStep: action.index, loadingLabel: action.label };
    case 'REPORT_SUCCESS':
      return { ...state, status: 'report-complete', reportEmail: action.email };
    case 'REPORT_ERROR':
      return { ...state, status: 'error', reportError: action.message };
    case 'RESET_REPORT':
      return state.result
        ? { ...state, status: 'results', reportError: '' }
        : { ...initialState };
    default:
      return state;
  }
}

function validateInput(input: DiagnosisInput): string | null {
  if (!input.shopName.trim()) return '店舗名を入力してください';
  if (!input.area.trim()) return '地域を入力してください';
  if (!input.industry) return '業種を選択してください';
  return null;
}

export function useDiagnosis() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const runDiagnosis = useCallback(async (input: DiagnosisInput) => {
    const err = validateInput(input);
    if (err) {
      dispatch({ type: 'SUBMIT_ERROR', message: err });
      return;
    }

    dispatch({ type: 'SUBMIT_START' });
    void notifyLead(input);

    try {
      const result = await fetchDiagnosis(input, {
        useMock: USE_MOCK,
        onStep: (index, label) => dispatch({ type: 'LOADING_STEP', index, label }),
      });
      dispatch({ type: 'SUBMIT_SUCCESS', result });
    } catch (e) {
      dispatch({
        type: 'SUBMIT_ERROR',
        message: e instanceof Error ? e.message : '通信エラーが発生しました',
      });
    }
  }, []);

  const submitReport = useCallback(
    async (form: { email: string; shopName?: string; contactName?: string }) => {
      if (!state.result) return;

      const email = form.email.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        dispatch({ type: 'REPORT_ERROR', message: '有効なメールアドレスを入力してください' });
        return;
      }

      dispatch({ type: 'REPORT_START' });

      try {
        await sendReport(
          {
            email,
            contactName: form.contactName,
            shopName: form.shopName || state.result.shopName,
            area: state.result.area,
            industry: state.result.industry,
            diagnosis: state.result,
          },
          (index, label) => dispatch({ type: 'REPORT_STEP', index, label }),
        );
        dispatch({ type: 'REPORT_SUCCESS', email });
      } catch (e) {
        dispatch({
          type: 'REPORT_ERROR',
          message: e instanceof Error ? e.message : '通信エラーが発生しました',
        });
      }
    },
    [state.result],
  );

  const retryReport = useCallback(() => {
    dispatch({ type: 'RESET_REPORT' });
  }, []);

  return { state, runDiagnosis, submitReport, retryReport };
}
