import { NextRequest, NextResponse } from 'next/server';

interface VisionRequest {
  image: string;
  mimeType: string;
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

const DEMO_RESPONSE: VisionResult = {
  room_type: 'Kitchen',
  remodel_description:
    'Complete kitchen remodel featuring new quartz countertops, custom shaker-style cabinets, stainless steel appliance package, subway tile backsplash, recessed LED lighting, and luxury vinyl plank flooring. Includes updated plumbing fixtures and electrical work to meet current California code.',
  cost_items: [
    { item: 'Custom Cabinetry & Installation', cost: 18500 },
    { item: 'Quartz Countertops', cost: 7200 },
    { item: 'Appliance Package (Stainless Steel)', cost: 8500 },
    { item: 'Backsplash Tile & Installation', cost: 3200 },
    { item: 'Flooring (LVP)', cost: 4800 },
    { item: 'Plumbing & Fixtures', cost: 5500 },
    { item: 'Electrical & Lighting', cost: 4200 },
    { item: 'Demolition & Prep', cost: 3100 },
    { item: 'Permits & Inspections', cost: 3500 },
  ],
  total: 58500,
};

const ANALYSIS_PROMPT = `Analyze this room photo and provide a remodel estimate. Return ONLY valid JSON with this exact structure: {"room_type": "string", "remodel_description": "string describing suggested remodel", "cost_items": [{"item": "string", "cost": number}], "total": number}. Be realistic with Southern California 2026 pricing.`;

function extractJSON(text: string): VisionResult {
  // Try parsing raw text first
  try {
    return JSON.parse(text);
  } catch {
    // Try extracting from markdown code block
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch?.[1]) {
      return JSON.parse(codeBlockMatch[1].trim());
    }

    // Try finding JSON object in text
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
    const { image, mimeType } = body as VisionRequest;

    if (!image) {
      return NextResponse.json(
        { error: 'Image data is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(DEMO_RESPONSE);
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
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mimeType || 'image/jpeg',
                  data: image,
                },
              },
              {
                type: 'text',
                text: ANALYSIS_PROMPT,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic Vision API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to analyze the image.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const responseText = data.content?.[0]?.text ?? '';

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
