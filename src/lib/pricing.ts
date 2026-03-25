export type ProjectType =
  | "kitchen"
  | "bathroom"
  | "adu"
  | "room-addition"
  | "painting-interior"
  | "painting-exterior"
  | "roofing"
  | "flooring"
  | "windows"
  | "outdoor"
  | "commercial"
  | "full-remodel";

export type QualityTier = "standard" | "mid-range" | "premium";

export type County =
  | "los-angeles"
  | "san-bernardino"
  | "orange"
  | "riverside"
  | "ventura"
  | "inland-empire";

export interface EstimateInput {
  projectType: ProjectType;
  qualityTier: QualityTier;
  squareFootage: number;
  county: County;
  timeline: "standard" | "rush";
  includePermits: boolean;
}

export interface EstimateBreakdown {
  materials: number;
  labor: number;
  projectManagement: number;
  design: number;
  permits: number;
  rushFee: number;
  subtotal: number;
  total: number;
  rangeLow: number;
  rangeHigh: number;
}

// Base cost per sqft for each project type
const BASE_COSTS: Record<ProjectType, number> = {
  kitchen: 150,
  bathroom: 125,
  adu: 200,
  "room-addition": 175,
  "painting-interior": 8,
  "painting-exterior": 12,
  roofing: 10,
  flooring: 15,
  windows: 60,
  outdoor: 50,
  commercial: 100,
  "full-remodel": 180,
};

// Quality tier multipliers
const TIER_MULTIPLIERS: Record<QualityTier, number> = {
  standard: 1.0,
  "mid-range": 1.35,
  premium: 1.85,
};

// County cost multipliers (SoCal market adjustments)
const COUNTY_MULTIPLIERS: Record<County, number> = {
  "los-angeles": 1.12,
  "san-bernardino": 1.0,
  orange: 1.15,
  riverside: 0.95,
  ventura: 1.08,
  "inland-empire": 0.98,
};

// Breakdown percentages
const BREAKDOWN_PERCENTAGES = {
  materials: 0.4,
  labor: 0.35,
  projectManagement: 0.1,
  design: 0.1,
  permitRate: 0.05,
  rushRate: 0.15,
} as const;

export const calculateEstimate = (input: EstimateInput): EstimateBreakdown => {
  const {
    projectType,
    qualityTier,
    squareFootage,
    county,
    timeline,
    includePermits,
  } = input;

  if (squareFootage <= 0) {
    throw new Error("Square footage must be greater than 0");
  }

  const baseCost = BASE_COSTS[projectType];
  const tierMultiplier = TIER_MULTIPLIERS[qualityTier];
  const countyMultiplier = COUNTY_MULTIPLIERS[county];

  const subtotal = baseCost * squareFootage * tierMultiplier * countyMultiplier;

  const materials = subtotal * BREAKDOWN_PERCENTAGES.materials;
  const labor = subtotal * BREAKDOWN_PERCENTAGES.labor;
  const projectManagement = subtotal * BREAKDOWN_PERCENTAGES.projectManagement;
  const design = subtotal * BREAKDOWN_PERCENTAGES.design;
  const permits = includePermits
    ? subtotal * BREAKDOWN_PERCENTAGES.permitRate
    : 0;
  const rushFee =
    timeline === "rush" ? subtotal * BREAKDOWN_PERCENTAGES.rushRate : 0;

  const total = subtotal + permits + rushFee;
  const rangeLow = Math.round(total * 0.85);
  const rangeHigh = Math.round(total * 1.15);

  return {
    materials: Math.round(materials),
    labor: Math.round(labor),
    projectManagement: Math.round(projectManagement),
    design: Math.round(design),
    permits: Math.round(permits),
    rushFee: Math.round(rushFee),
    subtotal: Math.round(subtotal),
    total: Math.round(total),
    rangeLow,
    rangeHigh,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getProjectTypeLabel = (type: ProjectType): string => {
  const labels: Record<ProjectType, string> = {
    kitchen: "Kitchen Remodel",
    bathroom: "Bathroom Remodel",
    adu: "ADU Construction",
    "room-addition": "Room Addition",
    "painting-interior": "Interior Painting",
    "painting-exterior": "Exterior Painting",
    roofing: "Roofing",
    flooring: "Flooring",
    windows: "Windows & Doors",
    outdoor: "Outdoor Living",
    commercial: "Commercial Build-Out",
    "full-remodel": "Full Home Remodel",
  };
  return labels[type];
};

export const getCountyLabel = (county: County): string => {
  const labels: Record<County, string> = {
    "los-angeles": "Los Angeles County",
    "san-bernardino": "San Bernardino County",
    orange: "Orange County",
    riverside: "Riverside County",
    ventura: "Ventura County",
    "inland-empire": "Inland Empire",
  };
  return labels[county];
};
