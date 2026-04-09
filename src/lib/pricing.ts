// =============================================================================
// X Construction — SoCal Pricing Calculator
// =============================================================================

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

export interface ProjectType {
  id: string;
  name: string;
  baseMin: number;
  baseMax: number;
}

export interface EstimateInput {
  projectType: string;
  tier: string;
  sqft: number;
  county: string;
  timeline: string;
  permits: boolean;
}

export interface EstimateBreakdown {
  materials: number;
  labor: number;
  management: number;
  design: number;
  permits: number;
  rushFee: number;
}

export interface EstimateResult {
  total: number;
  range: {
    low: number;
    high: number;
  };
  breakdown: EstimateBreakdown;
}

// -----------------------------------------------------------------------------
// Project Types — realistic SoCal pricing per sqft (2026)
// -----------------------------------------------------------------------------

export const PROJECT_TYPES: ProjectType[] = [
  { id: 'kitchen-remodel', name: 'Kitchen Remodel', baseMin: 150, baseMax: 350 },
  { id: 'bathroom-remodel', name: 'Bathroom Remodel', baseMin: 200, baseMax: 450 },
  { id: 'adu-construction', name: 'ADU Construction', baseMin: 250, baseMax: 500 },
  { id: 'room-addition', name: 'Room Addition', baseMin: 200, baseMax: 400 },
  { id: 'interior-painting', name: 'Interior Painting', baseMin: 3, baseMax: 7 },
  { id: 'exterior-painting', name: 'Exterior Painting', baseMin: 4, baseMax: 9 },
  { id: 'roofing', name: 'Roofing', baseMin: 8, baseMax: 15 },
  { id: 'flooring', name: 'Flooring', baseMin: 6, baseMax: 20 },
  { id: 'windows-doors', name: 'Windows & Doors', baseMin: 300, baseMax: 800 },
  { id: 'outdoor-living', name: 'Outdoor Living', baseMin: 50, baseMax: 150 },
  { id: 'commercial-buildout', name: 'Commercial Build-Out', baseMin: 100, baseMax: 300 },
  { id: 'full-home-remodel', name: 'Full Home Remodel', baseMin: 175, baseMax: 400 },
];

// -----------------------------------------------------------------------------
// Multipliers
// -----------------------------------------------------------------------------

export const COUNTY_MULTIPLIERS: Record<string, number> = {
  'Los Angeles': 1.12,
  'San Bernardino': 1.0,
  'Orange': 1.15,
  'Riverside': 0.95,
  'Ventura': 1.08,
  'Inland Empire': 0.98,
};

export const TIER_MULTIPLIERS: Record<string, number> = {
  'Standard': 1.0,
  'Mid-Range': 1.35,
  'Premium': 1.85,
};

export const TIMELINE_MULTIPLIERS: Record<string, number> = {
  'Flexible': 1.0,
  '3 Months': 1.05,
  'Rush': 1.15,
};

// -----------------------------------------------------------------------------
// Breakdown percentages
// -----------------------------------------------------------------------------

const BREAKDOWN_PERCENTAGES = {
  materials: 0.40,
  labor: 0.35,
  management: 0.08,
  design: 0.07,
  permits: 0.05,
  rushFee: 0.05,
} as const;

// -----------------------------------------------------------------------------
// Permit flat fees by project type
// -----------------------------------------------------------------------------

const PERMIT_FEES: Record<string, number> = {
  'kitchen-remodel': 3500,
  'bathroom-remodel': 2500,
  'adu-construction': 15000,
  'room-addition': 8000,
  'interior-painting': 2000,
  'exterior-painting': 2000,
  'roofing': 3000,
  'flooring': 2000,
  'windows-doors': 2500,
  'outdoor-living': 4000,
  'commercial-buildout': 12000,
  'full-home-remodel': 10000,
};

// -----------------------------------------------------------------------------
// Calculator
// -----------------------------------------------------------------------------

export const calculateEstimate = (input: EstimateInput): EstimateResult => {
  const project = PROJECT_TYPES.find((p) => p.id === input.projectType);

  if (!project) {
    throw new Error(`Unknown project type: ${input.projectType}`);
  }

  // Base price per sqft — average of min and max
  const basePricePerSqft = (project.baseMin + project.baseMax) / 2;

  // Raw subtotal
  const rawSubtotal = basePricePerSqft * input.sqft;

  // Apply multipliers
  const countyMultiplier = COUNTY_MULTIPLIERS[input.county] ?? 1.0;
  const tierMultiplier = TIER_MULTIPLIERS[input.tier] ?? 1.0;
  const timelineMultiplier = TIMELINE_MULTIPLIERS[input.timeline] ?? 1.0;

  const adjustedTotal = rawSubtotal * countyMultiplier * tierMultiplier * timelineMultiplier;

  // Permit flat fee
  const permitFee = input.permits ? (PERMIT_FEES[input.projectType] ?? 3000) : 0;

  // Final total
  const total = Math.round(adjustedTotal + permitFee);

  // Breakdown (percentages applied to the adjusted total, permits added separately)
  const breakdown: EstimateBreakdown = {
    materials: Math.round(adjustedTotal * BREAKDOWN_PERCENTAGES.materials),
    labor: Math.round(adjustedTotal * BREAKDOWN_PERCENTAGES.labor),
    management: Math.round(adjustedTotal * BREAKDOWN_PERCENTAGES.management),
    design: Math.round(adjustedTotal * BREAKDOWN_PERCENTAGES.design),
    permits: Math.round(adjustedTotal * BREAKDOWN_PERCENTAGES.permits + permitFee),
    rushFee: input.timeline === 'Rush'
      ? Math.round(adjustedTotal * BREAKDOWN_PERCENTAGES.rushFee)
      : 0,
  };

  // Range: ±15%
  const range = {
    low: Math.round(total * 0.85),
    high: Math.round(total * 1.15),
  };

  return {
    total,
    range,
    breakdown,
  };
};
