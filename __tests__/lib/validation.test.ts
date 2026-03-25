import { contactFormSchema, estimateFormSchema } from "@/lib/validation";

describe("contactFormSchema", () => {
  const validData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    serviceType: "kitchen",
    address: "123 Main St, Los Angeles, CA",
    budget: "$50,000 - $100,000",
    message: "I'd like to remodel my kitchen with modern finishes.",
  };

  it("accepts valid contact form data", () => {
    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = contactFormSchema.safeParse({ ...validData, name: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid phone number", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      phone: "123",
    });
    expect(result.success).toBe(false);
  });

  it("accepts various phone formats", () => {
    const validPhones = [
      "(555) 123-4567",
      "555-123-4567",
      "555.123.4567",
      "5551234567",
    ];
    for (const phone of validPhones) {
      const result = contactFormSchema.safeParse({ ...validData, phone });
      expect(result.success).toBe(true);
    }
  });

  it("rejects empty service type", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      serviceType: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short address", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      address: "123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short message", () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("allows optional budget", () => {
    const { budget: _, ...dataWithoutBudget } = validData;
    const result = contactFormSchema.safeParse(dataWithoutBudget);
    expect(result.success).toBe(true);
  });
});

describe("estimateFormSchema", () => {
  const validData = {
    projectType: "kitchen",
    qualityTier: "mid-range",
    squareFootage: 200,
    county: "los-angeles",
    timeline: "standard",
    includePermits: true,
  };

  it("accepts valid estimate form data", () => {
    const result = estimateFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects invalid project type", () => {
    const result = estimateFormSchema.safeParse({
      ...validData,
      projectType: "invalid-type",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid quality tier", () => {
    const result = estimateFormSchema.safeParse({
      ...validData,
      qualityTier: "ultra-premium",
    });
    expect(result.success).toBe(false);
  });

  it("rejects zero square footage", () => {
    const result = estimateFormSchema.safeParse({
      ...validData,
      squareFootage: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative square footage", () => {
    const result = estimateFormSchema.safeParse({
      ...validData,
      squareFootage: -50,
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid county", () => {
    const result = estimateFormSchema.safeParse({
      ...validData,
      county: "invalid-county",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid timeline", () => {
    const result = estimateFormSchema.safeParse({
      ...validData,
      timeline: "express",
    });
    expect(result.success).toBe(false);
  });

  it("accepts all valid project types", () => {
    const types = [
      "kitchen", "bathroom", "adu", "room-addition",
      "painting-interior", "painting-exterior", "roofing",
      "flooring", "windows", "outdoor", "commercial", "full-remodel",
    ];
    for (const projectType of types) {
      const result = estimateFormSchema.safeParse({ ...validData, projectType });
      expect(result.success).toBe(true);
    }
  });

  it("accepts all valid counties", () => {
    const counties = [
      "los-angeles", "san-bernardino", "orange",
      "riverside", "ventura", "inland-empire",
    ];
    for (const county of counties) {
      const result = estimateFormSchema.safeParse({ ...validData, county });
      expect(result.success).toBe(true);
    }
  });
});
