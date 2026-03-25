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

    // Try Imagen 3 first (dedicated image generation model)
    const imagenResponse = await fetch(
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

    if (imagenResponse.ok) {
      const imagenData = await imagenResponse.json();
      const imageBytes =
        imagenData.predictions?.[0]?.bytesBase64Encoded;

      if (imageBytes) {
        return NextResponse.json({
          image: imageBytes,
          mimeType: 'image/png',
        });
      }
    }

    // Fallback: try Gemini native image generation
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
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

    if (geminiResponse.ok) {
      const geminiData = await geminiResponse.json();
      const parts = geminiData.candidates?.[0]?.content?.parts ?? [];
      const imagePart = parts.find(
        (p: { inline_data?: { mime_type: string; data: string } }) =>
          p.inline_data
      );

      if (imagePart?.inline_data) {
        return NextResponse.json({
          image: imagePart.inline_data.data,
          mimeType: imagePart.inline_data.mime_type,
        });
      }
    }

    // Both approaches failed — log for debugging
    const imagenErr = imagenResponse.ok ? null : await imagenResponse.text().catch(() => 'unknown');
    const geminiErr = geminiResponse.ok ? null : await geminiResponse.text().catch(() => 'unknown');
    console.error('Image generation failed. Imagen:', imagenErr, 'Gemini:', geminiErr);

    return NextResponse.json(
      { error: 'Unable to generate a visualization right now. Please try again later.' },
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
