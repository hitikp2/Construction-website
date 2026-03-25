'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Eye, Send, Upload, RotateCcw, Loader2, AlertCircle, Sparkles } from 'lucide-react';
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
/*  Mini Before/After Slider                                           */
/* ------------------------------------------------------------------ */

interface MiniSliderProps {
  beforeSrc: string;
  afterSrc: string;
}

const MiniSlider: React.FC<MiniSliderProps> = ({ beforeSrc, afterSrc }) => {
  const pctRef = useRef(50);
  const draggingRef = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const beforeClipRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const hitRef = useRef<HTMLDivElement>(null);

  const render = useCallback((p: number) => {
    p = Math.max(2, Math.min(98, p));
    pctRef.current = p;
    const v = `${p}%`;
    if (beforeClipRef.current) beforeClipRef.current.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
    if (dividerRef.current) dividerRef.current.style.left = v;
    if (knobRef.current) knobRef.current.style.left = v;
    if (hitRef.current) hitRef.current.style.left = v;
  }, []);

  const getPct = useCallback((clientX: number) => {
    if (!stageRef.current) return 50;
    const r = stageRef.current.getBoundingClientRect();
    return Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    draggingRef.current = true;
    knobRef.current?.classList.add('scale-110');
    render(getPct(e.clientX));
  }, [getPct, render]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    render(getPct(e.clientX));
  }, [getPct, render]);

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
    knobRef.current?.classList.remove('scale-110');
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-hit]')) return;
    render(getPct(e.clientX));
  }, [getPct, render]);

  return (
    <div
      ref={stageRef}
      className="relative rounded-xl overflow-hidden bg-[#0a0a0a] select-none cursor-default border border-white/5"
      onClick={handleClick}
      onDragStart={e => e.preventDefault()}
      tabIndex={0}
      role="slider"
      aria-label="Before and after comparison"
      onKeyDown={e => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); render(pctRef.current - 2); }
        if (e.key === 'ArrowRight') { e.preventDefault(); render(pctRef.current + 2); }
      }}
    >
      {/* After layer (AI generated — bottom) */}
      <img src={afterSrc} alt="AI remodel" className="w-full h-auto block" draggable={false} />

      {/* Before layer (original photo — clipped on top) */}
      <div
        ref={beforeClipRef}
        className="absolute inset-0 z-[2] will-change-[clip-path]"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
      >
        <img src={beforeSrc} alt="Original photo" className="w-full h-full object-cover" draggable={false} />
      </div>

      {/* Divider line */}
      <div
        ref={dividerRef}
        className="absolute top-0 bottom-0 z-10 w-0.5 -translate-x-1/2 pointer-events-none will-change-[left]"
        style={{ left: '50%' }}
      >
        <div className="absolute inset-0 bg-[#c8ff00] rounded-full shadow-[0_0_8px_rgba(200,255,0,0.5),0_0_24px_rgba(200,255,0,0.15)]" />
      </div>

      {/* Hit zone — full width so drag works everywhere */}
      <div
        data-hit
        ref={hitRef}
        className="absolute inset-0 z-20 cursor-col-resize touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
      />

      {/* Knob */}
      <div
        ref={knobRef}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#c8ff00] z-[21] flex items-center justify-center gap-1.5 pointer-events-none transition-transform duration-150 shadow-[0_0_16px_rgba(200,255,0,0.35),0_4px_12px_rgba(0,0,0,0.5)] will-change-[left]"
        style={{ left: '50%' }}
      >
        <div className="w-0 h-0 border-y-[4px] border-y-transparent border-r-[6px] border-r-[#060606]" />
        <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-[#060606]" />
      </div>

      {/* Labels */}
      <div className="absolute z-[8] top-2 left-2 px-2.5 py-1 rounded-full font-mono text-[0.55rem] font-semibold tracking-[0.1em] uppercase backdrop-blur-[14px] pointer-events-none bg-black/50 text-white/60 border border-white/[0.06]">
        Before
      </div>
      <div className="absolute z-[8] top-2 right-2 px-2.5 py-1 rounded-full font-mono text-[0.55rem] font-semibold tracking-[0.1em] uppercase backdrop-blur-[14px] pointer-events-none bg-[#c8ff00]/10 text-[#c8ff00] border border-[#c8ff00]/[0.08]">
        After
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  AI Remodel Visualizer Panel                                        */
/* ------------------------------------------------------------------ */

const AIVision: React.FC = () => {
  const [result, setResult] = useState<VisionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [vizError, setVizError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ base64: string; mediaType: string } | null>(null);
  const [userVision, setUserVision] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      const mediaType = file.type as string;
      setUploadedImage({ base64, mediaType });
      setUserVision('');
      setResult(null);
      setGeneratedImage(null);
      setError(null);
      setVizError(null);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSubmitVision = async () => {
    if (!uploadedImage) return;
    setIsLoading(true);
    setError(null);
    setVizError(null);

    const visionPrompt = userVision.trim()
      ? `The homeowner wants: "${userVision.trim()}". Analyze this room photo and provide a remodel estimate based on their vision. Return ONLY valid JSON with this exact structure: {"room_type": "string", "remodel_description": "string describing the remodel based on the homeowner's vision", "cost_items": [{"item": "string", "cost": number}], "total": number}. Be realistic with Southern California 2026 pricing.`
      : undefined;

    try {
      // Send to vision API for cost analysis
      const res = await fetch('/api/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: uploadedImage.base64,
          mediaType: uploadedImage.mediaType,
          customPrompt: visionPrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to analyze the image. Please try again.');
        setResult(null);
        setIsLoading(false);
        return;
      }

      setResult(data);
      setIsLoading(false);

      // Automatically start image generation
      setIsGenerating(true);
      try {
        const prompt = userVision.trim()
          ? `${userVision.trim()}. ${data.remodel_description}. Items: ${data.cost_items.map((c: { item: string }) => c.item).join(', ')}.`
          : `${data.room_type} remodel: ${data.remodel_description}. Items: ${data.cost_items.map((c: { item: string }) => c.item).join(', ')}.`;

        const vizRes = await fetch('/api/visualize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            referenceImage: uploadedImage.base64,
            referenceMediaType: uploadedImage.mediaType,
          }),
        });

        const vizData = await vizRes.json();

        if (!vizRes.ok) {
          setVizError(vizData.error || 'Failed to generate visualization.');
        } else {
          setGeneratedImage({ data: vizData.image, mimeType: vizData.mimeType });
        }
      } catch {
        setVizError('Failed to connect to the image generation service.');
      } finally {
        setIsGenerating(false);
      }
    } catch {
      setError('Failed to connect to the analysis service. Please try again.');
      setIsLoading(false);
    }
  };

  const handleRetryVisualize = async () => {
    if (!result || !uploadedImage) return;
    setIsGenerating(true);
    setVizError(null);

    try {
      const prompt = userVision.trim()
        ? `${userVision.trim()}. ${result.remodel_description}. Items: ${result.cost_items.map(c => c.item).join(', ')}.`
        : `${result.room_type} remodel: ${result.remodel_description}. Items: ${result.cost_items.map(c => c.item).join(', ')}.`;

      const res = await fetch('/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          referenceImage: uploadedImage.base64,
          referenceMediaType: uploadedImage.mediaType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setVizError(data.error || 'Failed to generate visualization.');
      } else {
        setGeneratedImage({ data: data.image, mimeType: data.mimeType });
      }
    } catch {
      setVizError('Failed to connect to the image generation service.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setGeneratedImage(null);
    setIsGenerating(false);
    setVizError(null);
    setUploadedImage(null);
    setUserVision('');
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

            {/* Before/After comparison slider */}
            {generatedImage && uploadedImage ? (
              <div className="space-y-2">
                <MiniSlider
                  beforeSrc={`data:${uploadedImage.mediaType};base64,${uploadedImage.base64}`}
                  afterSrc={`data:${generatedImage.mimeType};base64,${generatedImage.data}`}
                />
                <p className="text-[#5a5a54] text-xs text-center font-sans">
                  <span className="text-[#c8ff00]">&larr;</span> Drag to compare <span className="text-[#c8ff00]">&rarr;</span>
                </p>
              </div>
            ) : isGenerating ? (
              <div className="flex items-center justify-center gap-3 py-6">
                <Loader2 className="w-5 h-5 text-[#c8ff00] animate-spin" />
                <p className="text-[#a8a8a0] text-sm font-sans">Generating visualization...</p>
              </div>
            ) : vizError ? (
              <div className="space-y-2">
                <button
                  onClick={handleRetryVisualize}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#c8ff00]/10 border border-[#c8ff00]/20 text-[#c8ff00] text-sm font-semibold font-sans hover:bg-[#c8ff00]/15 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Try Again
                </button>
                <p className="text-red-400/80 text-xs text-center font-sans">{vizError}</p>
              </div>
            ) : null}

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
          /* Upload & Describe flow */
          <div className="h-full flex flex-col">
            {uploadedImage ? (
              /* Step 2: Photo uploaded — describe your vision */
              <div className="flex flex-col gap-4 h-full">
                {/* Photo preview */}
                <div className="relative rounded-xl overflow-hidden border border-white/5">
                  <img
                    src={`data:${uploadedImage.mediaType};base64,${uploadedImage.base64}`}
                    alt="Uploaded room"
                    className="w-full h-auto max-h-48 object-cover"
                  />
                  <button
                    onClick={() => { setUploadedImage(null); setUserVision(''); }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white/60 hover:text-white backdrop-blur-sm transition-colors"
                    aria-label="Remove photo"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Vision description input */}
                <div className="flex-1 flex flex-col gap-3">
                  <label className="text-[#f0efe9] text-sm font-medium font-sans">
                    Describe your vision <span className="text-[#5a5a54] font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={userVision}
                    onChange={(e) => setUserVision(e.target.value)}
                    placeholder="e.g. Modern kitchen with white shaker cabinets, quartz countertops, and a large island with pendant lights..."
                    className="flex-1 min-h-[80px] bg-white/5 rounded-xl px-4 py-3 text-sm text-[#f0efe9] placeholder:text-[#6a6a64] outline-none focus:ring-1 focus:ring-[#c8ff00]/30 font-sans resize-none transition-all"
                  />
                  <p className="text-[#5a5a54] text-xs font-sans">
                    Tell us what you envision, or leave blank for AI suggestions
                  </p>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmitVision}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#c8ff00] text-black text-sm font-semibold font-sans hover:bg-[#d4ff33] transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Estimate &amp; Visualization
                </button>
              </div>
            ) : (
              /* Step 1: Upload a photo */
              <>
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
                    JPG, PNG, or WebP — describe your vision &amp; see it come to life
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
                  Upload a photo, describe your remodel, and get an AI estimate with visualization
                </p>
              </>
            )}
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
