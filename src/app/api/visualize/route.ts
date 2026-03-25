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

    // Use Gemini 2.5 Flash with native image generation
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini 2.5 image generation error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate the visualization. Please try again.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts ?? [];

    // Find the image part in the response
    const imagePart = parts.find(
      (p: { inline_data?: { mime_type: string; data: string } }) => p.inline_data
    );

    if (imagePart?.inline_data) {
      return NextResponse.json({
        image: imagePart.inline_data.data,
        mimeType: imagePart.inline_data.mime_type,
      });
    }

    console.error('Gemini 2.5 returned no image. Parts:', JSON.stringify(parts.map((p: Record<string, unknown>) => Object.keys(p))));
    return NextResponse.json(
      { error: 'The AI was unable to generate an image. Please try again.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Visualize API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while generating the image.' },
      { status: 500 }
    );
  }
}
