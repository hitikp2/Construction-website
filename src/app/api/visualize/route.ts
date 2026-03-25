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

    // Use Google Imagen 3 via the predict endpoint (same GEMINI_API_KEY)
    const response = await fetch(
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

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Imagen 3 API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate the visualization. Please try again.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const imageBytes = data.predictions?.[0]?.bytesBase64Encoded;
    const mimeType = data.predictions?.[0]?.mimeType || 'image/png';

    if (!imageBytes) {
      console.error('Imagen 3 returned no image data:', JSON.stringify(data));
      return NextResponse.json(
        { error: 'The AI was unable to generate an image. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: imageBytes,
      mimeType,
    });
  } catch (error) {
    console.error('Visualize API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while generating the image.' },
      { status: 500 }
    );
  }
}
