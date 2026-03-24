import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a helpful construction assistant for X Construction, a premium construction and remodeling company serving Southern California (Los Angeles County, San Bernardino County, Orange County, Riverside County, Ventura County, and the Inland Empire). You have deep knowledge of: SoCal construction costs and pricing (2026 market rates), California building codes and permit requirements, ADU regulations (AB 1033, SB 9), remodeling timelines and best practices, material selection and quality tiers. Be friendly, professional, and concise. When discussing pricing, give realistic SoCal ranges. Always encourage clients to contact us for exact quotes. Our phone: (800) 555-1234.`;

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

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        message:
          "I'm currently in demo mode. For real-time AI assistance, please contact us at (800) 555-1234.",
      });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get a response from the AI assistant.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const assistantMessage =
      data.content?.[0]?.text ?? 'Sorry, I could not generate a response.';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
