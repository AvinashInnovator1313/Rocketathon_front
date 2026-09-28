import type {
  AskRequest,
  AskResponse,
  RuleItem,
  ReviewRequest,
  ReviewsListResponse,
  HealthResponse,
  ChatMessage
} from './types';
import { mockAsk, MOCK_RULES, mockHealthResponse, mockReviewsResponse } from './mockApi';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export interface ApiStatus {
  isLive: boolean;
  isMocked: boolean;
  model: string;
  chunks: number;
}

export let currentApiStatus: ApiStatus = {
  isLive: false,
  isMocked: false,
  model: 'Checking...',
  chunks: 0
};

export async function checkHealth(): Promise<HealthResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/health`, { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: HealthResponse = await res.json();
    currentApiStatus = {
      isLive: true,
      isMocked: false,
      model: data.model,
      chunks: data.chunks
    };
    return data;
  } catch (err) {
    currentApiStatus = {
      isLive: false,
      isMocked: true,
      model: mockHealthResponse.model,
      chunks: mockHealthResponse.chunks
    };
    return mockHealthResponse;
  }
}

export async function askQuestion(q: string, history: ChatMessage[] = []): Promise<{ response: AskResponse; isMock: boolean }> {
  try {
    const body: AskRequest = { q, history };
    const res = await fetch(`${BASE_URL}/api/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `Server responded with ${res.status}`);
    }

    const data: AskResponse = await res.json();
    currentApiStatus.isLive = true;
    currentApiStatus.isMocked = false;
    return { response: data, isMock: false };
  } catch (err) {
    console.warn('[ApiClient] Backend offline or returned error, utilizing local mock adapter:', err);
    currentApiStatus.isLive = false;
    currentApiStatus.isMocked = true;
    const mockRes = await mockAsk(q);
    return { response: mockRes, isMock: true };
  }
}

export async function transcribeAudio(audioBlob: Blob, language?: string): Promise<{ text: string; isMock: boolean }> {
  try {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');
    const url = language ? `${BASE_URL}/api/stt?language=${encodeURIComponent(language)}` : `${BASE_URL}/api/stt`;

    const res = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) throw new Error(`STT failed: ${res.status}`);
    const data = await res.json();
    return { text: data.text || '', isMock: false };
  } catch (err) {
    console.warn('[ApiClient] STT failed or backend offline:', err);
    return {
      text: "What is the difference between aggregation and composition?",
      isMock: true
    };
  }
}

export async function synthesizeSpeech(text: string): Promise<{ audioBlob: Blob | null; isMock: boolean }> {
  try {
    const res = await fetch(`${BASE_URL}/api/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    if (!res.ok) throw new Error(`TTS failed: ${res.status}`);
    const blob = await res.blob();
    return { audioBlob: blob, isMock: false };
  } catch (err) {
    console.warn('[ApiClient] TTS failed or Piper offline:', err);
    return { audioBlob: null, isMock: true };
  }
}

export async function fetchRules(): Promise<{ rules: RuleItem[]; isMock: boolean }> {
  try {
    const res = await fetch(`${BASE_URL}/api/rules`);
    if (!res.ok) throw new Error(`Rules HTTP ${res.status}`);
    const data: RuleItem[] = await res.json();
    return { rules: data, isMock: false };
  } catch (err) {
    return { rules: MOCK_RULES, isMock: true };
  }
}

export async function submitReview(review: ReviewRequest): Promise<{ ok: boolean; isMock: boolean }> {
  try {
    const res = await fetch(`${BASE_URL}/api/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (!res.ok) throw new Error(`Review submit failed: ${res.status}`);
    return { ok: true, isMock: false };
  } catch (err) {
    return { ok: true, isMock: true };
  }
}

export async function fetchReviews(): Promise<{ data: ReviewsListResponse; isMock: boolean }> {
  try {
    const res = await fetch(`${BASE_URL}/api/review`);
    if (!res.ok) throw new Error(`Review fetch failed: ${res.status}`);
    const data: ReviewsListResponse = await res.json();
    return { data, isMock: false };
  } catch (err) {
    return { data: mockReviewsResponse, isMock: true };
  }
}
