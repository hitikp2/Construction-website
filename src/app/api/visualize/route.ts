import { NextRequest, NextResponse } from 'next/server';

interface VisualizeRequest {
  prompt: string;
  referenceImage?: string;
  referenceMediaType?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, referenceImage, referenceMediaType } = body as VisualizeRequest;

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

    // Build the parts array — include reference image if provided
    const parts: Record<string, unknown>[] = [];

    if (referenceImage) {
      // Send the original photo so the model keeps the same angle/perspective
      parts.push({
        inlineData: {
          mimeType: referenceMediaType || 'image/jpeg',
          data: referenceImage,
        },
      });
      parts.push({
        text: `Using this photo as reference, generate a remodeled version of this exact space from the same camera angle and perspective. Apply these changes: ${prompt}. Keep the same room layout, dimensions, and viewpoint. Make it photorealistic.`,
      });
    } else {
      parts.push({
        text: `Generate an image: Professional photorealistic architectural visualization of: ${prompt}. High-quality interior/exterior design rendering, modern style, well-lit, detailed.`,
      });
    }

    // Nano Banana 2 (Gemini 3.1 Flash Image Preview)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts }],
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
    const responseParts = data.candidates?.[0]?.content?.parts ?? [];

    // Gemini API may return camelCase (inlineData) or snake_case (inline_data)
    const imagePart = responseParts.find(
      (p: Record<string, unknown>) => p.inlineData || p.inline_data
    );

    const imageData = imagePart?.inlineData || imagePart?.inline_data;

    if (!imageData) {
      console.error('Nano Banana 2 returned no image. Parts:', JSON.stringify(responseParts.map((p: Record<string, unknown>) => Object.keys(p))));
      return NextResponse.json(
        { error: 'The AI was unable to generate an image. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: imageData.data,
      mimeType: imageData.mimeType || imageData.mime_type || 'image/png',
    });
  } catch (error) {
    console.error('Visualize API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while generating the image.' },
      { status: 500 }
    );
  }
}
