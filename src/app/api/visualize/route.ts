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

    // Try Imagen 3 first
    try {
      const imagenRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt: fullPrompt }],
            parameters: {
              sampleCount: 1,
              aspectRatio: '16:9',
            },
          }),
        }
      );

      if (imagenRes.ok) {
        const imagenData = await imagenRes.json();
        const imageBytes = imagenData.predictions?.[0]?.bytesBase64Encoded;
        if (imageBytes) {
          return NextResponse.json({
            image: imageBytes,
            mimeType: imagenData.predictions?.[0]?.mimeType || 'image/png',
          });
        }
      } else {
        const errText = await imagenRes.text();
        console.error(`Imagen 3 failed (${imagenRes.status}):`, errText);
      }
    } catch (e) {
      console.error('Imagen 3 fetch error:', e);
    }

    // Fallback: Gemini 2.5 Flash native image generation
    try {
      const geminiRes = await fetch(
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

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const parts = geminiData.candidates?.[0]?.content?.parts ?? [];
        const imagePart = parts.find(
          (p: { inline_data?: { mime_type: string; data: string } }) => p.inline_data
        );
        if (imagePart?.inline_data) {
          return NextResponse.json({
            image: imagePart.inline_data.data,
            mimeType: imagePart.inline_data.mime_type,
          });
        }
      } else {
        const errText = await geminiRes.text();
        console.error(`Gemini 2.5 image gen failed (${geminiRes.status}):`, errText);
      }
    } catch (e) {
      console.error('Gemini 2.5 image gen fetch error:', e);
    }

    return NextResponse.json(
      { error: 'Image generation is not available with your current API key. Please check that Imagen or Gemini image generation is enabled in your Google AI Studio account.' },
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
