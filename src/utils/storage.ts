import type { AnalysisResult, ChatMessage, UserProfile } from '../types';

const KEYS = {
  ANALYSES: 'bioguide_analyses',
  PROFILE: 'bioguide_profile',
  CHAT: 'bioguide_chat',
} as const;

export function saveAnalysis(result: AnalysisResult): void {
  const analyses = getAnalyses();
  analyses.unshift({ ...result, id: crypto.randomUUID() });
  localStorage.setItem(KEYS.ANALYSES, JSON.stringify(analyses.slice(0, 20)));
}

export function getAnalyses(): (AnalysisResult & { id?: string })[] {
  try {
    const data = localStorage.getItem(KEYS.ANALYSES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteAnalysis(id: string): void {
  const analyses = getAnalyses().filter((a) => a.id !== id);
  localStorage.setItem(KEYS.ANALYSES, JSON.stringify(analyses));
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
}

export function getProfile(): UserProfile | null {
  try {
    const data = localStorage.getItem(KEYS.PROFILE);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveChatHistory(messages: ChatMessage[]): void {
  localStorage.setItem(KEYS.CHAT, JSON.stringify(messages.slice(-50)));
}

export function getChatHistory(): ChatMessage[] {
  try {
    const data = localStorage.getItem(KEYS.CHAT);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function clearChatHistory(): void {
  localStorage.removeItem(KEYS.CHAT);
}
