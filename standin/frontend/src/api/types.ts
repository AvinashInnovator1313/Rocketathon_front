export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AskRequest {
  q: string;
  history?: ChatMessage[];
}

export interface AskResponse {
  type: 'ans' | 'esc';
  text: string;
  cat: string | null;
  sources: string[];
  general?: boolean;
}

export interface RuleItem {
  cat: string;
  why: string;
  do: string;
}

export interface ReviewRequest {
  q: string;
  answer: string;
  type: string;
  mark: 'agree' | 'disagree' | 'should_escalate';
}

export interface ReviewItem {
  q: string;
  answer: string;
  type: string;
  mark: string;
  t: number;
}

export interface ReviewsListResponse {
  items: ReviewItem[];
  agree: number;
  disagree: number;
  should_escalate: number;
}

export interface HealthResponse {
  ok: boolean;
  model: string;
  chunks: number;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  turns: ChatTurn[];
}

export interface ChatTurn {
  id: string;
  timestamp: number;
  question: string;
  response?: AskResponse;
  loading?: boolean;
  error?: string;
  userReview?: 'agree' | 'disagree' | 'should_escalate';
  audioPlaying?: boolean;
}
