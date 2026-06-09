import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Trash2, Bot, User } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useChat } from '../hooks/useChat';

const SUGGESTED_QUESTIONS = [
  'What should I eat for weight loss?',
  'How much protein do I need?',
  'Is intermittent fasting healthy?',
  'Foods rich in Vitamin D?',
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-muted"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export function ChatPage() {
  const { messages, loading, error, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    await sendMessage(msg);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-text">AI Nutrition Assistant</h1>
          <p className="text-muted text-sm mt-1">Chat with BioGuide AI for nutrition guidance</p>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearChat} icon={<Trash2 className="h-4 w-4" />}>
            Clear Chat
          </Button>
        )}
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden !p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-text mb-2">How can I help you today?</h3>
              <p className="text-sm text-muted mb-6 max-w-sm">
                Ask me anything about nutrition, diet plans, vitamins, or healthy lifestyle choices.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 w-full max-w-lg">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-left text-xs p-3 rounded-xl border border-border bg-background hover:border-primary/30 hover:bg-primary/5 transition-all text-muted hover:text-text"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl shrink-0 ${
                    msg.role === 'user' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                  }`}
                >
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent text-white rounded-tr-md'
                      : 'bg-background text-text rounded-tl-md'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-background rounded-2xl rounded-tl-md">
                <TypingIndicator />
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="border-t border-border p-4">
          {messages.length > 0 && messages.length < 4 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {SUGGESTED_QUESTIONS.slice(0, 2).map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-background border border-border text-muted hover:text-text transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about nutrition, diet, health..."
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              disabled={loading}
            />
            <Button type="submit" disabled={!input.trim() || loading} icon={<Send className="h-4 w-4" />}>
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
