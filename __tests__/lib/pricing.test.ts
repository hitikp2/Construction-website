import {
  calculateEstimate,
  formatCurrency,
  getProjectTypeLabel,
  getCountyLabel,
  type EstimateInput,
} from "@/lib/pricing";

describe("calculateEstimate", () => {
  const baseInput: EstimateInput = {
    projectType: "kitchen",
    qualityTier: "standard",
    squareFootage: 100,
    county: "san-bernardino",
    timeline: "standard",
    includePermits: false,
  };

  it("calculates a basic kitchen estimate correctly", () => {
    const result = calculateEstimate(baseInput);

    // kitchen base=150, standard=1.0, SB=1.0, 100sqft => subtotal=15000
    expect(result.subtotal).toBe(15000);
    expect(result.materials).toBe(6000); // 40%
    expect(result.labor).toBe(5250); // 35%
    expect(result.projectManagement).toBe(1500); // 10%
    expect(result.design).toBe(1500); // 10%
    expect(result.permits).toBe(0);
    expect(result.rushFee).toBe(0);
    expect(result.total).toBe(15000);
  });

  it("applies county multiplier for LA", () => {
    const result = calculateEstimate({
      ...baseInput,
      county: "los-angeles",
    });
    // 150 * 100 * 1.0 * 1.12 = 16800
    expect(result.subtotal).toBe(16800);
  });

  it("applies county multiplier for Orange County", () => {
    const result = calculateEstimate({
      ...baseInput,
      county: "orange",
    });
    // 150 * 100 * 1.0 * 1.15 = 17250
    expect(result.subtotal).toBe(17250);
  });

  it("applies county multiplier for Riverside", () => {
    const result = calculateEstimate({
      ...baseInput,
      county: "riverside",
    });
    // 150 * 100 * 1.0 * 0.95 = 14250
    expect(result.subtotal).toBe(14250);
  });

  it("applies quality tier multiplier for mid-range", () => {
    const result = calculateEstimate({
      ...baseInput,
      qualityTier: "mid-range",
    });
    // 150 * 100 * 1.35 * 1.0 = 20250
    expect(result.subtotal).toBe(20250);
  });

  it("applies quality tier multiplier for premium", () => {
    const result = calculateEstimate({
      ...baseInput,
      qualityTier: "premium",
    });
    // 150 * 100 * 1.85 * 1.0 = 27750
    expect(result.subtotal).toBe(27750);
  });

  it("includes permits when requested", () => {
    const result = calculateEstimate({
      ...baseInput,
      includePermits: true,
    });
    // subtotal=15000, permits=5%=750
    expect(result.permits).toBe(750);
    expect(result.total).toBe(15750);
  });

  it("includes rush fee when timeline is rush", () => {
    const result = calculateEstimate({
      ...baseInput,
      timeline: "rush",
    });
    // subtotal=15000, rushFee=15%=2250
    expect(result.rushFee).toBe(2250);
    expect(result.total).toBe(17250);
  });

  it("includes both permits and rush fee", () => {
    const result = calculateEstimate({
      ...baseInput,
      includePermits: true,
      timeline: "rush",
    });
    // subtotal=15000, permits=750, rush=2250
    expect(result.total).toBe(18000);
  });

  it("calculates range correctly (±15%)", () => {
    const result = calculateEstimate(baseInput);
    expect(result.rangeLow).toBe(Math.round(15000 * 0.85));
    expect(result.rangeHigh).toBe(Math.round(15000 * 1.15));
  });

  it("throws error for zero square footage", () => {
    expect(() =>
      calculateEstimate({ ...baseInput, squareFootage: 0 })
    ).toThrow("Square footage must be greater than 0");
  });

  it("throws error for negative square footage", () => {
    expect(() =>
      calculateEstimate({ ...baseInput, squareFootage: -100 })
    ).toThrow("Square footage must be greater than 0");
  });

  it("handles all project types", () => {
    const projectTypes = [
      "kitchen",
      "bathroom",
      "adu",
      "room-addition",
      "painting-interior",
      "painting-exterior",
      "roofing",
      "flooring",
      "windows",
      "outdoor",
      "commercial",
      "full-remodel",
    ] as const;

    for (const projectType of projectTypes) {
      const result = calculateEstimate({ ...baseInput, projectType });
      expect(result.total).toBeGreaterThan(0);
      expect(result.materials).toBeGreaterThan(0);
      expect(result.labor).toBeGreaterThan(0);
    }
  });

  it("scales linearly with square footage", () => {
    const result100 = calculateEstimate({ ...baseInput, squareFootage: 100 });
    const result200 = calculateEstimate({ ...baseInput, squareFootage: 200 });
    expect(result200.total).toBe(result100.total * 2);
  });
});

describe("formatCurrency", () => {
  it("formats whole numbers correctly", () => {
    expect(formatCurrency(15000)).toBe("$15,000");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("formats large numbers with commas", () => {
    expect(formatCurrency(1250000)).toBe("$1,250,000");
  });

  it("rounds decimal values", () => {
    // Should have no decimal places
    expect(formatCurrency(15000.75)).toBe("$15,001");
  });
});

describe("getProjectTypeLabel", () => {
  it("returns correct label for kitchen", () => {
    expect(getProjectTypeLabel("kitchen")).toBe("Kitchen Remodel");
  });

  it("returns correct label for adu", () => {
    expect(getProjectTypeLabel("adu")).toBe("ADU Construction");
  });

  it("returns correct label for full-remodel", () => {
    expect(getProjectTypeLabel("full-remodel")).toBe("Full Home Remodel");
  });
});

describe("getCountyLabel", () => {
  it("returns correct label for los-angeles", () => {
    expect(getCountyLabel("los-angeles")).toBe("Los Angeles County");
  });

  it("returns correct label for inland-empire", () => {
    expect(getCountyLabel("inland-empire")).toBe("Inland Empire");
  });
});
