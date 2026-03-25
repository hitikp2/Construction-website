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
        text: `Edit this photo to show ONLY the following remodel changes: ${prompt}.

STRICT RULES — you MUST follow all of these:
- Keep the EXACT same camera angle, perspective, and viewpoint as the original photo.
- Keep ALL existing structures, walls, fences, buildings, trees, and architectural elements in their EXACT original positions, sizes, and proportions. Do NOT move, resize, add, or remove any structural elements.
- Do NOT extend walkways, driveways, patios, or any hardscape beyond their current boundaries.
- Do NOT move trees, poles, or fixed objects. They must stay exactly where they are.
- Do NOT change the background, sky, neighboring properties, or anything outside the property boundaries.
- ONLY modify the specific surfaces, materials, fixtures, plants, or finishes that the remodel description calls for.
- The result must look like a realistic renovation of THIS SPECIFIC space — not a reimagined space.
- Maintain the same lighting conditions, time of day, and shadows as the original photo.
- The output image must be photorealistic and indistinguishable from a real photograph.`,
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
            // Only set aspect ratio when no reference image — let the model
            // match the original photo's proportions when editing
            ...(referenceImage ? {} : { imageConfig: { aspectRatio: '16:9' } }),
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
