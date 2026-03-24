import { NextRequest, NextResponse } from 'next/server';
import { calculateEstimate, EstimateInput } from '@/lib/pricing';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectType, tier, sqft, county, timeline, permits } =
      body as EstimateInput;

    // Basic validation
    if (!projectType || typeof projectType !== 'string') {
      return NextResponse.json(
        { error: 'A valid project type is required.' },
        { status: 400 }
      );
    }

    if (!tier || typeof tier !== 'string') {
      return NextResponse.json(
        { error: 'A valid quality tier is required.' },
        { status: 400 }
      );
    }

    if (!sqft || typeof sqft !== 'number' || sqft <= 0) {
      return NextResponse.json(
        { error: 'Square footage must be a positive number.' },
        { status: 400 }
      );
    }

    if (!county || typeof county !== 'string') {
      return NextResponse.json(
        { error: 'A valid county is required.' },
        { status: 400 }
      );
    }

    if (!timeline || typeof timeline !== 'string') {
      return NextResponse.json(
        { error: 'A valid timeline is required.' },
        { status: 400 }
      );
    }

    const input: EstimateInput = {
      projectType,
      tier,
      sqft,
      county,
      timeline,
      permits: Boolean(permits),
    };

    const result = calculateEstimate(input);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Estimate API error:', error);

    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred.';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
