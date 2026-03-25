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

    // Google Imagen 3 via Google AI Studio (generateImages endpoint)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateImages?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: fullPrompt,
          config: {
            numberOfImages: 1,
            aspectRatio: '16:9',
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Imagen 3 generateImages failed (${response.status}):`, errText);
      return NextResponse.json(
        { error: `Image generation failed (${response.status}). Check Railway deploy logs for details.` },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Response format: { generatedImages: [{ image: { imageBytes: "base64..." } }] }
    const imageBytes = data.generatedImages?.[0]?.image?.imageBytes;

    if (!imageBytes) {
      console.error('Imagen 3 returned no image. Response:', JSON.stringify(data).slice(0, 500));
      return NextResponse.json(
        { error: 'The AI was unable to generate an image. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: imageBytes,
      mimeType: 'image/png',
    });
  } catch (error) {
    console.error('Visualize API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while generating the image.' },
      { status: 500 }
    );
  }
}
