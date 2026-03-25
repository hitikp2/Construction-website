import {
  COMPANY,
  SERVICE_AREAS,
  SERVICES,
  NAV_LINKS,
  STATS,
} from "@/lib/constants";

describe("COMPANY", () => {
  it("has all required contact information", () => {
    expect(COMPANY.name).toBeTruthy();
    expect(COMPANY.phone).toBeTruthy();
    expect(COMPANY.email).toContain("@");
    expect(COMPANY.address).toBeTruthy();
    expect(COMPANY.license).toBeTruthy();
  });

  it("has valid phone href", () => {
    expect(COMPANY.phoneHref).toMatch(/^tel:\+/);
  });

  it("has valid sms href", () => {
    expect(COMPANY.smsHref).toMatch(/^sms:\+/);
  });
});

describe("SERVICE_AREAS", () => {
  it("has 6 service areas", () => {
    expect(SERVICE_AREAS).toHaveLength(6);
  });

  it("each area has name, slug, and cities", () => {
    for (const area of SERVICE_AREAS) {
      expect(area.name).toBeTruthy();
      expect(area.slug).toBeTruthy();
      expect(area.cities.length).toBeGreaterThan(0);
    }
  });

  it("all slugs are unique", () => {
    const slugs = SERVICE_AREAS.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("SERVICES", () => {
  it("has 9 services", () => {
    expect(SERVICES).toHaveLength(9);
  });

  it("each service has id, title, description, and icon", () => {
    for (const service of SERVICES) {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.icon).toBeTruthy();
    }
  });

  it("all service ids are unique", () => {
    const ids = SERVICES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("NAV_LINKS", () => {
  it("has navigation links", () => {
    expect(NAV_LINKS.length).toBeGreaterThan(0);
  });

  it("all links have label and href", () => {
    for (const link of NAV_LINKS) {
      expect(link.label).toBeTruthy();
      expect(link.href).toMatch(/^#/);
    }
  });
});

describe("STATS", () => {
  it("has 3 stats", () => {
    expect(STATS).toHaveLength(3);
  });

  it("each stat has value, suffix, and label", () => {
    for (const stat of STATS) {
      expect(stat.value).toBeGreaterThan(0);
      expect(stat.suffix).toBeTruthy();
      expect(stat.label).toBeTruthy();
    }
  });
});
