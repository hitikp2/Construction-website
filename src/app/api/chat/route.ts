import { NextRequest, NextResponse } from 'next/server';
import { COMPANY } from '@/lib/constants';

const SYSTEM_PROMPT = `You are a helpful construction assistant for ${COMPANY.name}, a premium construction and remodeling company serving Southern California (Los Angeles County, San Bernardino County, Orange County, Riverside County, Ventura County, and the Inland Empire). You have deep knowledge of: SoCal construction costs and pricing (2026 market rates), California building codes and permit requirements, ADU regulations (AB 1033, SB 9), remodeling timelines and best practices, material selection and quality tiers. Be friendly, professional, and concise. When discussing pricing, give realistic SoCal ranges. Always encourage clients to contact us for exact quotes. Our phone: ${COMPANY.phone}. Our email: ${COMPANY.email}.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required and must not be empty.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: `Our AI assistant is being configured. Please call us at ${COMPANY.phone} for immediate help.` },
        { status: 503 }
      );
    }

    // Convert messages to Gemini format (user/model roles, parts array)
    const geminiContents = messages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: geminiContents,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get a response from the AI assistant.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const assistantMessage =
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sorry, I could not generate a response.';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
