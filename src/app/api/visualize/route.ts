import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body as { prompt: string };

    if (!prompt) {
      return NextResponse.json(
        { error: 'A description is required to generate an image.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Image generation is currently being configured.' },
        { status: 503 }
      );
    }

    const fullPrompt = `Professional photorealistic architectural visualization of: ${prompt}. High-quality interior/exterior design rendering, modern style, well-lit, detailed.`;

    // Nano Banana 2 (Gemini 3.1 Flash Image Preview)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `Generate an image: ${fullPrompt}` }],
            },
          ],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
            imageConfig: {
              aspectRatio: '16:9',
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Nano Banana 2 API error (${response.status}):`, errText);
      return NextResponse.json(
        { error: `Image generation failed (${response.status}). Check deploy logs for details.` },
        { status: 500 }
      );
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts ?? [];

    const imagePart = parts.find(
      (p: { inline_data?: { mime_type: string; data: string } }) => p.inline_data
    );

    if (!imagePart?.inline_data) {
      console.error('Nano Banana 2 returned no image. Parts:', JSON.stringify(parts.map((p: Record<string, unknown>) => Object.keys(p))));
      return NextResponse.json(
        { error: 'The AI was unable to generate an image. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: imagePart.inline_data.data,
      mimeType: imagePart.inline_data.mime_type,
    });
  } catch (error) {
    console.error('Visualize API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while generating the image.' },
      { status: 500 }
    );
  }
}
