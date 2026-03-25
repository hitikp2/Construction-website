import { NextRequest, NextResponse } from 'next/server';

interface VisionRequest {
  image: string;
  mediaType?: string;
  mimeType?: string;
  customPrompt?: string;
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

const ANALYSIS_PROMPT = `Analyze this room photo and provide a remodel estimate. Return ONLY valid JSON with this exact structure: {"room_type": "string", "remodel_description": "string describing suggested remodel", "cost_items": [{"item": "string", "cost": number}], "total": number}. Be realistic with Southern California 2026 pricing.`;

function extractJSON(text: string): VisionResult {
  try {
    return JSON.parse(text);
  } catch {
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch?.[1]) {
      return JSON.parse(codeBlockMatch[1].trim());
    }

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch?.[0]) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Could not extract JSON from response');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, mediaType, mimeType, customPrompt } = body as VisionRequest;

    if (!image) {
      return NextResponse.json(
        { error: 'Image data is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Vision analysis is currently being configured. Please use our calculator for estimates.' },
        { status: 503 }
      );
    }

    const resolvedMime = mediaType || mimeType || 'image/jpeg';

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  inline_data: {
                    mime_type: resolvedMime,
                    data: image,
                  },
                },
                { text: customPrompt || ANALYSIS_PROMPT },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini Vision API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to analyze the image.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    const result = extractJSON(responseText);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Vision API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while analyzing the image.' },
      { status: 500 }
    );
  }
}
