import type { AnalysisResult, BMIResult, ChatMessage, UserProfile } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data.data;
}

export async function analyzeHealth(profile: UserProfile): Promise<AnalysisResult> {
  return request<AnalysisResult>('/health-data/analyze', {
    method: 'POST',
    body: JSON.stringify(profile),
  });
}

export async function calculateBMI(
  height: number,
  weight: number,
  age?: number,
  conditions?: string[]
): Promise<BMIResult> {
  return request<BMIResult>('/health-data/bmi', {
    method: 'POST',
    body: JSON.stringify({ height, weight, age, conditions }),
  });
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[],
  userContext?: Partial<UserProfile> | null
): Promise<{ message: string; timestamp: string }> {
  return request<{ message: string; timestamp: string }>('/chat/message', {
    method: 'POST',
    body: JSON.stringify({
      message,
      history: history.map(({ role, content }) => ({ role, content })),
      userContext,
    }),
  });
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}
