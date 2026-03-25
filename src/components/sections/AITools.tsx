'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Eye, Send, Upload, RotateCcw, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { COMPANY, phoneHref } from '@/lib/constants';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface CostItem {
  item: string;
  cost: number;
}

interface VisionResult {
  room_type: string;
  remodel_description: string;
  cost_items: CostItem[];
  total: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SUGGESTED_QUESTIONS = [
  'Kitchen pricing?',
  'ADU info',
  'How long does remodeling take?',
  'Do I need permits?',
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const formatCurrency = (n: number): string =>
  '$' + n.toLocaleString('en-US');

/* ------------------------------------------------------------------ */
/*  AI Chat Panel                                                      */
/* ------------------------------------------------------------------ */

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm your AI construction assistant for Southern California. Ask me about pricing, timelines, permits, or anything related to your next project. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    // Skip initial render — only auto-scroll after user sends a message
    if (!hasInteracted.current) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    hasInteracted.current = true;

    const userMsg: ChatMessage = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              data.error ||
              `I'm having trouble connecting right now. Please call us at **${COMPANY.phone}** for immediate assistance.`,
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message ?? 'Sorry, I could not generate a response.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            `I'm sorry, I'm having trouble connecting right now. Please try again or call us at **${COMPANY.phone}** for immediate assistance.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <Card hover={false} className="h-[600px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#c8ff00]/10">
          <Bot className="w-5 h-5 text-[#c8ff00]" />
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-[#f0efe9] font-semibold font-sans">AI Construction Assistant</h3>
          <span className="w-2 h-2 rounded-full bg-[#c8ff00] animate-pulse-glow" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed font-sans ${
                msg.role === 'user'
                  ? 'bg-[#c8ff00]/10 text-[#f0efe9] text-right'
                  : 'bg-white/5 text-[#a8a8a0]'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-invert prose-sm max-w-none [&_strong]:text-[#c8ff00] [&_a]:text-[#c8ff00]">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 rounded-2xl p-3 flex items-center gap-1.5">
              <span className="typing-dot w-2 h-2 rounded-full bg-[#c8ff00]/60" />
              <span className="typing-dot w-2 h-2 rounded-full bg-[#c8ff00]/60" />
              <span className="typing-dot w-2 h-2 rounded-full bg-[#c8ff00]/60" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="bg-white/5 rounded-full px-4 py-2 text-sm text-[#a8a8a0] hover:bg-white/10 hover:text-[#f0efe9] transition-colors cursor-pointer font-sans"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-white/5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about construction..."
          className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-sm text-[#f0efe9] placeholder:text-[#6a6a64] outline-none focus:ring-1 focus:ring-[#c8ff00]/30 font-sans transition-all"
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-[#c8ff00] text-black rounded-xl px-4 flex items-center justify-center hover:bg-[#d4ff33] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/*  AI Remodel Visualizer Panel                                        */
/* ------------------------------------------------------------------ */

const AIVision: React.FC = () => {
  const [result, setResult] = useState<VisionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const mediaType = file.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';

        try {
          const res = await fetch('/api/vision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64, mediaType }),
          });

          const data = await res.json();

          if (!res.ok) {
            setError(data.error || 'Failed to analyze the image. Please try again.');
            setResult(null);
          } else {
            setResult(data);
            setError(null);
          }
        } catch {
          setError('Failed to connect to the analysis service. Please try again.');
          setResult(null);
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setIsLoading(false);
      setError('Failed to read the image file.');
    }

    e.target.value = '';
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <Card hover={false} className="h-[600px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#c8ff00]/10">
          <Eye className="w-5 h-5 text-[#c8ff00]" />
        </div>
        <h3 className="text-[#f0efe9] font-semibold font-sans">AI Remodel Visualizer</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {isLoading ? (
          /* Loading state */
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-[#c8ff00] animate-spin" />
            <p className="text-[#a8a8a0] text-sm font-sans">Analyzing your space...</p>
          </div>
        ) : error ? (
          /* Error state */
          <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-4">
            <AlertCircle className="w-10 h-10 text-[#a8a8a0]" />
            <p className="text-[#a8a8a0] text-sm font-sans leading-relaxed">
              {error}
            </p>
            <div className="flex flex-col gap-3 mt-2">
              <Button variant="secondary" size="sm" href="/#calculator">
                Use Price Calculator
              </Button>
              <button
                onClick={handleReset}
                className="text-[#c8ff00] text-sm font-sans hover:underline"
              >
                Try again
              </button>
            </div>
          </div>
        ) : result ? (
          /* Results panel */
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#c8ff00]/10 text-[#c8ff00] rounded-full px-3 py-1 text-sm font-medium font-sans">
                {result.room_type}
              </span>
            </div>

            <p className="text-[#a8a8a0] text-sm leading-relaxed font-sans">
              {result.remodel_description}
            </p>

            {/* Cost breakdown table */}
            <div className="bg-white/[0.02] rounded-xl overflow-hidden">
              <div className="divide-y divide-white/5">
                {result.cost_items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center px-4 py-3">
                    <span className="text-[#f0efe9] text-sm font-sans">{item.item}</span>
                    <span className="text-[#a8a8a0] text-sm font-mono">{formatCurrency(item.cost)}</span>
                  </div>
                ))}
                {/* Total row */}
                <div className="flex justify-between items-center px-4 py-4 border-t-2 border-white/10 bg-white/[0.02]">
                  <span className="text-[#f0efe9] font-bold text-lg font-sans">Estimated Total</span>
                  <span className="text-[#c8ff00] font-bold text-lg font-mono">
                    {formatCurrency(result.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <Button variant="primary" size="sm" href="/#contact">
                Get Exact Quote
              </Button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl bg-white/5 text-[#a8a8a0] hover:bg-white/10 hover:text-[#f0efe9] transition-colors text-sm font-sans"
                aria-label="Start over"
              >
                <RotateCcw className="w-4 h-4" />
                Analyze Another Room
              </button>
            </div>
          </div>
        ) : (
          /* Upload zone */
          <div className="h-full flex flex-col">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-[#c8ff00]/30 hover:bg-white/[0.02] transition-all"
              role="button"
              tabIndex={0}
              aria-label="Upload a photo of your room"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
              }}
            >
              <Upload className="w-10 h-10 text-[#6a6a64] mb-4" />
              <p className="text-[#f0efe9] font-medium font-sans mb-1">
                Drop a photo or click to upload
              </p>
              <p className="text-[#6a6a64] text-sm font-sans">
                JPG, PNG, or WebP — we&apos;ll analyze and estimate costs
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                aria-hidden="true"
              />
            </div>

            <p className="mt-4 text-[#6a6a64] text-xs text-center font-sans">
              Upload a photo of any room and our AI will provide a detailed remodel estimate
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

const AITools: React.FC = () => {
  return (
    <section id="ai-tools" className="py-24 px-6 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="AI-Powered"
          title="Smart Construction Tools"
          subtitle="Experience the future of construction planning with our AI-powered assistant and remodel visualizer"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AIChat />
          <AIVision />
        </div>
      </div>
    </section>
  );
};

export default AITools;
