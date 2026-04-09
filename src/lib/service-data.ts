// ---------------------------------------------------------------------------
// X Construction — Extended service detail data for /services/[slug] pages
// ---------------------------------------------------------------------------

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  priceRange: string;
  timeline: string;
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'full-home-remodel',
    title: 'Full Home Remodel',
    tagline: 'Complete transformations that reimagine your living space from the ground up.',
    description:
      'A full home remodel is one of the most impactful investments you can make as a Southern California homeowner. Our team handles every aspect of the transformation — from architectural design and structural engineering to premium finishes and final walkthrough. Whether you are modernizing a mid-century ranch in Pasadena or opening up the floor plan of a 1970s split-level in Irvine, we bring the expertise and craftsmanship to deliver a home that feels brand new.\n\nEvery project begins with a detailed consultation to understand your vision, budget, and timeline. Our in-house designers create 3D renderings so you can see the transformation before a single wall is moved. We handle all permits, inspections, and city approvals so you can focus on choosing finishes and living your life.',
    features: [
      'Complete interior and exterior renovation',
      'Structural modifications and open floor plans',
      'Custom cabinetry and millwork',
      'Premium flooring, countertops, and fixtures',
      'Electrical and plumbing upgrades',
      'Energy-efficient windows and insulation',
      'Smart home integration',
      'Full permit management and inspections',
    ],
    priceRange: '$150,000 – $500,000+',
    timeline: '3 – 8 months',
    faqs: [
      {
        question: 'How long does a full home remodel take?',
        answer:
          'Most full home remodels take between 3 and 8 months, depending on the scope. A cosmetic refresh may be closer to 3 months, while a gut renovation with structural changes can extend to 8 months or more.',
      },
      {
        question: 'Can I live in my home during the remodel?',
        answer:
          'It depends on the scope. For partial remodels, many homeowners stay. For gut renovations involving plumbing, electrical, and structural work, we typically recommend temporary relocation for safety and comfort.',
      },
      {
        question: 'Do you handle permits for the remodel?',
        answer:
          'Yes. Our team manages all permit applications, plan submissions, and city inspections. We are experienced with permitting across all major SoCal counties.',
      },
    ],
    relatedServices: ['room-additions', 'painting', 'electrical-plumbing'],
  },
  {
    slug: 'custom-adu',
    title: 'Custom ADU',
    tagline: 'Maximize your property value with a fully permitted accessory dwelling unit.',
    description:
      "California's progressive ADU legislation has made it easier than ever to add a secondary living space to your property. Whether you need a detached guest house, a rental unit for passive income, or an in-law suite, our team designs and builds custom ADUs that meet all state and local requirements while maximizing your property's potential.\n\nWe handle the entire process from feasibility assessment and architectural design through permitting, construction, and final inspection. Our ADU designs are optimized for Southern California's climate — featuring indoor-outdoor flow, natural light, and energy-efficient systems that keep utility costs low.",
    features: [
      'Detached, attached, and garage conversion options',
      'Full architectural design and 3D renderings',
      'All permits and city approvals handled',
      'Custom kitchens and bathrooms',
      'Energy-efficient HVAC and insulation',
      'Private entrances and outdoor spaces',
      'Utility connections and separate metering',
      'Compliance with latest California ADU laws',
    ],
    priceRange: '$150,000 – $350,000',
    timeline: '4 – 7 months',
    faqs: [
      {
        question: 'How much does it cost to build an ADU in California?',
        answer:
          'ADU costs in Southern California typically range from $150,000 to $350,000 depending on size, finishes, and whether it is a new build or garage conversion. Garage conversions start around $80,000–$120,000.',
      },
      {
        question: 'Do I need a permit to build an ADU?',
        answer:
          'Yes. All ADUs require building permits. California law requires cities to approve ADU applications within 60 days. Our team handles the entire permit process.',
      },
      {
        question: 'Can I rent out my ADU?',
        answer:
          'Yes. California law allows homeowners to rent out ADUs. Many of our clients use ADUs for long-term rental income, which can significantly offset mortgage payments.',
      },
    ],
    relatedServices: ['architectural-design-permits', 'electrical-plumbing', 'painting'],
  },
  {
    slug: 'painting',
    title: 'Painting',
    tagline: 'Professional interior and exterior painting built for the SoCal climate.',
    description:
      "A fresh coat of paint is one of the fastest ways to transform your home's look and feel. Our painting crews deliver meticulous prep work, clean lines, and lasting color using top-tier coatings engineered for Southern California's unique climate — including UV-resistant exteriors and low-VOC interior formulas.\n\nWhether you need a single accent wall or a complete interior and exterior repaint, we bring the same level of professionalism and attention to detail. All projects include surface preparation, priming, caulking, and a detailed final walkthrough.",
    features: [
      'Interior and exterior painting',
      'UV-resistant and weather-rated exterior coatings',
      'Low-VOC and zero-VOC interior paints',
      'Complete surface preparation and priming',
      'Cabinet and trim painting',
      'Stucco and textured surface specialists',
      'Color consultation available',
      'Furniture and landscape protection',
    ],
    priceRange: '$3,000 – $25,000',
    timeline: '3 – 14 days',
    faqs: [
      {
        question: 'How long does a house painting project take?',
        answer:
          'Interior painting for an average home takes 3–5 days. Exterior painting takes 5–10 days depending on size, prep work needed, and weather conditions.',
      },
      {
        question: 'What type of paint do you use?',
        answer:
          'We use premium brands including Sherwin-Williams, Benjamin Moore, and Dunn-Edwards. Exterior coatings are rated for UV resistance and SoCal weather conditions.',
      },
      {
        question: 'Do you offer color consultation?',
        answer:
          'Yes. Our team can help you select colors that complement your architecture, neighborhood, and personal style. We provide sample swatches and mock-ups.',
      },
    ],
    relatedServices: ['full-home-remodel', 'windows-doors-roofing', 'commercial-build-outs'],
  },
  {
    slug: 'commercial-build-outs',
    title: 'Commercial Build-Outs',
    tagline: 'Tenant improvements and commercial renovations built to spec, on time.',
    description:
      "From retail storefronts to corporate offices and restaurant renovations, our commercial division delivers build-outs that meet your brand standards, budget, and timeline. We understand that downtime costs money — that's why we work around your business hours and build aggressive schedules to get you open faster.\n\nOur commercial team has experience with ADA compliance, fire safety systems, commercial HVAC, and tenant improvement allowances. We work directly with landlords, architects, and brand designers to ensure seamless execution.",
    features: [
      'Tenant improvements and fit-outs',
      'Restaurant and retail renovations',
      'Office space reconfigurations',
      'ADA compliance and accessibility',
      'Commercial HVAC and electrical',
      'Fire suppression and safety systems',
      'After-hours and weekend scheduling',
      'Coordination with landlords and architects',
    ],
    priceRange: '$50,000 – $500,000+',
    timeline: '4 – 16 weeks',
    faqs: [
      {
        question: 'Can you work after business hours?',
        answer:
          'Absolutely. We frequently schedule commercial work during evenings, weekends, and holidays to minimize disruption to your business operations.',
      },
      {
        question: 'Do you handle commercial permits?',
        answer:
          'Yes. We manage all commercial permitting including building, electrical, plumbing, fire, and health department approvals.',
      },
      {
        question: 'What is a tenant improvement allowance?',
        answer:
          'A TI allowance is a budget provided by the landlord for build-out costs. We can work within your TI allowance and help maximize the value of every dollar.',
      },
    ],
    relatedServices: ['electrical-plumbing', 'painting', 'architectural-design-permits'],
  },
  {
    slug: 'room-additions',
    title: 'Room Additions',
    tagline: 'Expand your living space with seamlessly integrated additions.',
    description:
      "When your family outgrows your home, a room addition is often more practical and cost-effective than moving. We design and build additions that integrate seamlessly with your existing home — matching rooflines, siding, and interior finishes so the new space feels like it was always there.\n\nFrom sunrooms and master suites to second-story additions, we handle all structural engineering, permits, and construction. Our team ensures your home's foundation, electrical, and plumbing systems are properly upgraded to support the new space.",
    features: [
      'Ground-floor and second-story additions',
      'Master suite and bedroom additions',
      'Sunrooms and enclosed patios',
      'Structural engineering and foundation work',
      'Roof matching and exterior continuity',
      'Full electrical and plumbing integration',
      'Interior finish matching',
      'All permits and inspections handled',
    ],
    priceRange: '$80,000 – $300,000+',
    timeline: '2 – 6 months',
    faqs: [
      {
        question: 'How much does a room addition cost per square foot?',
        answer:
          'Room additions in Southern California typically cost $250–$500 per square foot, depending on complexity. Second-story additions are generally more expensive due to structural requirements.',
      },
      {
        question: 'Will a room addition increase my property value?',
        answer:
          'Yes. Well-designed room additions typically return 50–70% of their cost in added home value. Master suite additions tend to deliver the highest ROI.',
      },
      {
        question: 'Do I need engineering plans for an addition?',
        answer:
          'Yes. All room additions require architectural and structural engineering plans, which we provide as part of our full-service approach.',
      },
    ],
    relatedServices: ['full-home-remodel', 'architectural-design-permits', 'electrical-plumbing'],
  },
  {
    slug: 'outdoor-living',
    title: 'Outdoor Living',
    tagline: 'Turn your backyard into a year-round SoCal retreat.',
    description:
      "Southern California's climate makes outdoor living spaces one of the best investments you can make. Our outdoor division designs and builds custom patios, outdoor kitchens, pergolas, fire features, and landscape hardscaping that extend your living space into the open air.\n\nEvery outdoor project is engineered for durability — from reinforced concrete foundations to weather-rated appliances and UV-resistant materials. We work with your landscape architect or provide our own design services to create a cohesive outdoor environment.",
    features: [
      'Custom outdoor kitchens and BBQ islands',
      'Covered patios and pergolas',
      'Fire pits and fireplaces',
      'Stamped and decorative concrete',
      'Retaining walls and hardscaping',
      'Outdoor lighting and electrical',
      'Pool-adjacent structures',
      'Drought-tolerant landscape integration',
    ],
    priceRange: '$25,000 – $200,000+',
    timeline: '3 – 10 weeks',
    faqs: [
      {
        question: 'Do outdoor kitchens need permits?',
        answer:
          'Most outdoor kitchens with gas lines, electrical, or plumbing require permits. Our team handles all necessary approvals.',
      },
      {
        question: 'What materials work best for SoCal outdoor spaces?',
        answer:
          'We recommend UV-resistant pavers, stainless steel appliances rated for outdoor use, composite pergola materials, and natural stone for fire features. All materials are selected for the SoCal climate.',
      },
      {
        question: 'Can you build around an existing pool?',
        answer:
          'Yes. We frequently design outdoor living spaces that integrate with existing pools, adding surrounding patios, shade structures, and outdoor cooking areas.',
      },
    ],
    relatedServices: ['electrical-plumbing', 'painting', 'architectural-design-permits'],
  },
  {
    slug: 'electrical-plumbing',
    title: 'Electrical & Plumbing',
    tagline: 'Licensed electrical and plumbing work for every type of project.',
    description:
      "Our licensed electricians and plumbers handle everything from panel upgrades and EV charger installations to full re-piping and fixture replacements. Whether it's part of a larger remodel or a standalone service call, we deliver code-compliant work with proper permits and inspections.\n\nWe stay current with California's evolving electrical and plumbing codes, including Title 24 energy requirements, solar-ready panel upgrades, and water conservation mandates. Every job is inspected and warrantied.",
    features: [
      'Electrical panel upgrades (100A to 200A+)',
      'EV charger installation and wiring',
      'Whole-house re-wiring',
      'Complete re-piping (copper and PEX)',
      'Fixture installation and replacement',
      'Tankless water heater installation',
      'Sewer line repair and replacement',
      'Code compliance and Title 24 certification',
    ],
    priceRange: '$2,000 – $50,000',
    timeline: '1 – 14 days',
    faqs: [
      {
        question: 'Do I need a permit for electrical work?',
        answer:
          'Most electrical work beyond simple fixture swaps requires a permit in California. Panel upgrades, new circuits, and EV charger installations all require permits and inspections.',
      },
      {
        question: 'How much does a panel upgrade cost?',
        answer:
          'A panel upgrade from 100A to 200A typically costs $2,500–$5,000 in Southern California, including the permit and inspection.',
      },
      {
        question: 'Should I re-pipe my home?',
        answer:
          'If your home has galvanized steel or polybutylene pipes, re-piping is strongly recommended. Copper or PEX re-piping eliminates leaks, improves water pressure, and adds value to your home.',
      },
    ],
    relatedServices: ['full-home-remodel', 'custom-adu', 'room-additions'],
  },
  {
    slug: 'windows-doors-roofing',
    title: 'Windows, Doors & Roofing',
    tagline: 'Energy-efficient replacements rated for the Southern California climate.',
    description:
      "Replacing your windows, doors, and roofing is one of the most effective ways to improve your home's energy efficiency, security, and curb appeal. We install industry-leading products from manufacturers like Milgard, Andersen, and Pella, all rated for Southern California's sun exposure and Santa Ana winds.\n\nOur roofing division handles everything from minor repairs to complete tear-offs and re-roofing. We work with asphalt shingle, tile, flat roof, and cool roof systems — and every installation includes proper ventilation and underlayment for maximum lifespan.",
    features: [
      'Energy-efficient window replacements',
      'Entry doors, patio doors, and French doors',
      'Complete roof tear-off and replacement',
      'Tile, shingle, and flat roof systems',
      'Cool roof and reflective coating options',
      'Skylights and sun tunnels',
      'Weatherproofing and insulation',
      'Manufacturer warranties up to 50 years',
    ],
    priceRange: '$5,000 – $60,000',
    timeline: '1 – 3 weeks',
    faqs: [
      {
        question: 'How often should I replace my roof?',
        answer:
          'Asphalt shingle roofs last 20–30 years. Tile roofs can last 50+ years. If your roof is approaching these ages or showing signs of damage, we recommend a free inspection.',
      },
      {
        question: 'Will new windows lower my energy bills?',
        answer:
          'Yes. Energy-efficient dual-pane windows can reduce cooling costs by 25–30% in Southern California. Many products also qualify for federal tax credits.',
      },
      {
        question: 'Do you install solar-ready roofing?',
        answer:
          'Yes. All our roof installations can include solar-ready underlayment and conduit runs, making future solar panel installation faster and less expensive.',
      },
    ],
    relatedServices: ['full-home-remodel', 'painting', 'electrical-plumbing'],
  },
  {
    slug: 'architectural-design-permits',
    title: 'Architectural Design & Permits',
    tagline: 'In-house design and permit expediting across all SoCal counties.',
    description:
      "Navigating Southern California's building codes, HOA requirements, and coastal commission regulations can be overwhelming. Our in-house design and permit team takes the complexity out of the process — creating code-compliant architectural plans and managing every permit application from submission through final approval.\n\nWhether you need plans for a simple room addition or a complete set of construction documents for a ground-up build, our architects and designers deliver detailed, buildable plans that satisfy city reviewers on the first submission whenever possible.",
    features: [
      'Full architectural design and construction documents',
      '3D renderings and virtual walkthroughs',
      'Structural engineering and calculations',
      'Title 24 energy compliance reports',
      'Permit application and expediting',
      'HOA and CC&R compliance review',
      'Coastal Commission applications',
      'Plan corrections and resubmittals',
    ],
    priceRange: '$5,000 – $50,000',
    timeline: '2 – 8 weeks',
    faqs: [
      {
        question: 'Do I need an architect for my remodel?',
        answer:
          'Not all projects require a licensed architect. Minor remodels may only need a designer. However, structural changes, additions, and ADUs typically require stamped architectural and engineering plans.',
      },
      {
        question: 'How long does the permit process take?',
        answer:
          'Permit timelines vary by city. Simple projects may be approved in 2–4 weeks. Complex projects like ADUs or additions can take 6–12 weeks. We expedite wherever possible.',
      },
      {
        question: 'Do you handle HOA approvals?',
        answer:
          'Yes. We prepare all necessary documentation for HOA review, including exterior renderings, material specifications, and color samples.',
      },
    ],
    relatedServices: ['custom-adu', 'room-additions', 'full-home-remodel'],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
