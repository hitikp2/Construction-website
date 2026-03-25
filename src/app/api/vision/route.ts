import { NextRequest, NextResponse } from "next/server";

export interface VisionAnalysis {
  roomType: string;
  description: string;
  costBreakdown: {
    item: string;
    cost: number;
  }[];
  totalEstimate: number;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const isDemo = formData.get("demo") as string | null;

    if (isDemo) {
      const demoResponses: Record<string, VisionAnalysis> = {
        kitchen: {
          roomType: "Kitchen",
          description:
            "Modern kitchen remodel with quartz countertops, custom cabinetry, stainless steel appliances, and a kitchen island with seating.",
          costBreakdown: [
            { item: "Custom Cabinetry", cost: 15000 },
            { item: "Quartz Countertops", cost: 8000 },
            { item: "Appliances Package", cost: 12000 },
            { item: "Flooring", cost: 4000 },
            { item: "Plumbing & Fixtures", cost: 3500 },
            { item: "Electrical Work", cost: 2500 },
            { item: "Labor & Installation", cost: 18000 },
          ],
          totalEstimate: 63000,
        },
        bathroom: {
          roomType: "Bathroom",
          description:
            "Luxury bathroom remodel with walk-in shower, freestanding tub, dual vanity, and heated floors.",
          costBreakdown: [
            { item: "Walk-in Shower (Glass Enclosure)", cost: 6000 },
            { item: "Freestanding Tub", cost: 3500 },
            { item: "Dual Vanity & Mirrors", cost: 5000 },
            { item: "Tile Work", cost: 4500 },
            { item: "Plumbing", cost: 4000 },
            { item: "Heated Floors", cost: 2500 },
            { item: "Labor & Installation", cost: 12000 },
          ],
          totalEstimate: 37500,
        },
        "living-room": {
          roomType: "Living Room",
          description:
            "Open-concept living room redesign with built-in entertainment center, new flooring, accent wall, and recessed lighting.",
          costBreakdown: [
            { item: "Built-in Entertainment Center", cost: 8000 },
            { item: "Hardwood Flooring", cost: 6000 },
            { item: "Accent Wall (Stone/Wood)", cost: 3500 },
            { item: "Recessed Lighting", cost: 2000 },
            { item: "Paint & Trim", cost: 1500 },
            { item: "Labor & Installation", cost: 9000 },
          ],
          totalEstimate: 30000,
        },
      };

      const demoType = isDemo as string;
      const analysis = demoResponses[demoType];

      if (!analysis) {
        return NextResponse.json(
          { error: "Invalid demo type" },
          { status: 400 }
        );
      }

      return NextResponse.json({ analysis });
    }

    if (!image) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mediaType = image.type || "image/jpeg";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mediaType,
                  data: base64,
                },
              },
              {
                type: "text",
                text: `Analyze this room photo and provide a remodel suggestion. Return your response as valid JSON with this exact structure:
{
  "roomType": "detected room type",
  "description": "suggested remodel description",
  "costBreakdown": [
    { "item": "item name", "cost": estimated_cost_number }
  ],
  "totalEstimate": total_estimated_cost_number
}

Base your cost estimates on Southern California 2026 market rates. Only return JSON, no other text.`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Vision API request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const rawText = data.content?.[0]?.text || "";

    try {
      const analysis = JSON.parse(rawText) as VisionAnalysis;
      return NextResponse.json({ analysis });
    } catch {
      return NextResponse.json(
        { error: "Failed to parse vision response" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Vision API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
