import { useState, useCallback, useEffect } from 'react';
import { sendChatMessage } from '../services/api';
import { getChatHistory, saveChatHistory, clearChatHistory as clearStorage } from '../utils/storage';
import { getProfile } from '../utils/storage';
import { uuid } from '../utils/uuid';
import type { ChatMessage } from '../types';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMessages(getChatHistory());
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: uuid(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);
    setError(null);

    try {
      const profile = getProfile();
      const response = await sendChatMessage(content, messages, profile);
      const assistantMsg: ChatMessage = {
        id: uuid(),
        role: 'assistant',
        content: response.message,
        timestamp: response.timestamp,
      };
      const final = [...updated, assistantMsg];
      setMessages(final);
      saveChatHistory(final);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send message';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    clearStorage();
  }, []);

  return { messages, loading, error, sendMessage, clearChat };
}
