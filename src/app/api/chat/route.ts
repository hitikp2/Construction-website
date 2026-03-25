import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a helpful construction company assistant for X Construction, serving Southern California. You are knowledgeable about:
- SoCal construction pricing and market rates (2026)
- Building permits and regulations for LA, Orange, San Bernardino, Riverside, and Ventura counties
- ADU (Accessory Dwelling Unit) construction and California ADU laws
- Kitchen and bathroom remodeling timelines and costs
- Commercial build-outs
- General construction best practices

Always be helpful, professional, and provide specific pricing ranges when asked. Mention that all estimates are approximate and a free in-person consultation is available for exact quotes. The company phone number is (800) 555-1234.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || "API request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage =
      data.content?.[0]?.text || "Sorry, I could not generate a response.";

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
