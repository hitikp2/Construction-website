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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Generate a high-quality, photorealistic interior/exterior design rendering of the following remodel concept. Make it look like a professional architectural visualization:\n\n${prompt}`,
                },
              ],
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
      console.error('Gemini image generation error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate the visualization.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts ?? [];

    // Find the image part in the response
    const imagePart = parts.find(
      (p: { inline_data?: { mime_type: string; data: string } }) => p.inline_data
    );

    if (!imagePart?.inline_data) {
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
