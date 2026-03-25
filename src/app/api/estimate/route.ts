import { NextRequest, NextResponse } from "next/server";
import {
  calculateEstimate,
  type EstimateInput,
} from "@/lib/pricing";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EstimateInput;

    const {
      projectType,
      qualityTier,
      squareFootage,
      county,
      timeline,
      includePermits,
    } = body;

    if (!projectType || !qualityTier || !squareFootage || !county || !timeline) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (typeof squareFootage !== "number" || squareFootage <= 0) {
      return NextResponse.json(
        { error: "Square footage must be a positive number" },
        { status: 400 }
      );
    }

    const estimate = calculateEstimate({
      projectType,
      qualityTier,
      squareFootage,
      county,
      timeline,
      includePermits: includePermits ?? false,
    });

    return NextResponse.json({ estimate });
  } catch (error) {
    console.error("Estimate API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
