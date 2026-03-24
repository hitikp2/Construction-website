// ---------------------------------------------------------------------------
// X Construction — Site-wide constants & static data
// ---------------------------------------------------------------------------

// ---- Types ----------------------------------------------------------------

export interface Company {
  name: string;
  phone: string;
  email: string;
  address: string;
  license: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ServiceArea {
  name: string;
  cities: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "Remodeling" | "ADU" | "Commercial" | "Outdoor";
  location: string;
  price: string;
  gradient: string;
}

export interface Testimonial {
  name: string;
  quote: string;
  projectType: string;
  location: string;
  rating: number;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// ---- Helpers --------------------------------------------------------------

export const phoneHref = (phone: string): string =>
  'tel:+1' + phone.replace(/\D/g, '');

export const smsHref = (phone: string): string =>
  'sms:+1' + phone.replace(/\D/g, '');

// ---- Data -----------------------------------------------------------------

export const COMPANY: Company = {
  name: "X Construction",
  phone: "(800) 555-1234",
  email: "info@xconstruction.com",
  address: "123 Builder's Lane, Suite 100, Los Angeles, CA 90001",
  license: "CA #XXXXXXX",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Areas", href: "#areas" },
  { label: "AI Tools", href: "#ai-tools" },
  { label: "Calculator", href: "#calculator" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES: Service[] = [
  {
    id: "full-home-remodel",
    icon: "Hammer",
    title: "Full Home Remodel",
    description:
      "Complete interior and exterior transformations that reimagine your living space from the ground up. Structural changes, new layouts, premium finishes — every detail executed flawlessly.",
  },
  {
    id: "custom-adu",
    icon: "Home",
    title: "Custom ADU",
    description:
      "Accessory dwelling units designed and built to maximize your property value. Fully permitted, code-compliant guest houses, rental units, and in-law suites tailored to SoCal regulations.",
  },
  {
    id: "painting",
    icon: "Paintbrush",
    title: "Painting",
    description:
      "Interior and exterior painting services using top-tier coatings engineered for the Southern California climate. Meticulous prep, clean lines, and lasting color.",
  },
  {
    id: "commercial-build-outs",
    icon: "Building2",
    title: "Commercial Build-Outs",
    description:
      "Tenant improvements, retail fit-outs, and office renovations built to spec and on schedule. We work around your business hours to minimize downtime.",
  },
  {
    id: "room-additions",
    icon: "PlusSquare",
    title: "Room Additions",
    description:
      "Expand your living space with seamlessly integrated room additions. From sunrooms to second stories, we handle permits, engineering, and construction start to finish.",
  },
  {
    id: "outdoor-living",
    icon: "TreePine",
    title: "Outdoor Living",
    description:
      "Patios, outdoor kitchens, pergolas, fire features, and landscape hardscaping that turn your backyard into a year-round SoCal retreat.",
  },
  {
    id: "electrical-plumbing",
    icon: "Zap",
    title: "Electrical & Plumbing",
    description:
      "Licensed electrical and plumbing work for remodels, upgrades, and new installations. Panel upgrades, EV charger wiring, re-piping, and fixture replacements.",
  },
  {
    id: "windows-doors-roofing",
    icon: "DoorOpen",
    title: "Windows, Doors & Roofing",
    description:
      "Energy-efficient window and door replacements, complete roof tear-offs, and re-roofing with materials rated for Southern California sun and Santa Ana winds.",
  },
  {
    id: "architectural-design-permits",
    icon: "Compass",
    title: "Architectural Design & Permits",
    description:
      "In-house design and permit expediting across all SoCal counties. We navigate local codes, HOA requirements, and coastal commissions so your project never stalls.",
  },
];

export const SERVICE_AREAS: ServiceArea[] = [
  {
    name: "Los Angeles County",
    cities: [
      "Los Angeles",
      "Beverly Hills",
      "Santa Monica",
      "Pasadena",
      "Long Beach",
      "Burbank",
    ],
  },
  {
    name: "San Bernardino County",
    cities: [
      "San Bernardino",
      "Rancho Cucamonga",
      "Ontario",
      "Fontana",
      "Redlands",
    ],
  },
  {
    name: "Orange County",
    cities: [
      "Anaheim",
      "Irvine",
      "Huntington Beach",
      "Newport Beach",
      "Fullerton",
    ],
  },
  {
    name: "Riverside County",
    cities: [
      "Riverside",
      "Corona",
      "Temecula",
      "Murrieta",
      "Palm Springs",
    ],
  },
  {
    name: "Ventura County",
    cities: [
      "Ventura",
      "Oxnard",
      "Thousand Oaks",
      "Simi Valley",
      "Camarillo",
    ],
  },
  {
    name: "Inland Empire",
    cities: ["Pomona", "West Covina", "Claremont", "Upland", "Diamond Bar"],
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "hollywood-hills-remodel",
    title: "Hollywood Hills Full Remodel",
    category: "Remodeling",
    location: "Los Angeles, CA",
    price: "$285,000",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    id: "irvine-adu",
    title: "Modern Detached ADU",
    category: "ADU",
    location: "Irvine, CA",
    price: "$195,000",
    gradient: "linear-gradient(135deg, #0a3d2e 0%, #145a3e 50%, #1e7a50 100%)",
  },
  {
    id: "dtla-office-buildout",
    title: "DTLA Office Build-Out",
    category: "Commercial",
    location: "Downtown Los Angeles, CA",
    price: "$420,000",
    gradient: "linear-gradient(135deg, #2d1b4e 0%, #462a6e 50%, #5e3a8e 100%)",
  },
  {
    id: "corona-outdoor-kitchen",
    title: "Resort-Style Outdoor Kitchen",
    category: "Outdoor",
    location: "Corona, CA",
    price: "$78,000",
    gradient: "linear-gradient(135deg, #3e2a0a 0%, #5c3d10 50%, #7a5018 100%)",
  },
  {
    id: "pasadena-craftsman-remodel",
    title: "Craftsman Home Revival",
    category: "Remodeling",
    location: "Pasadena, CA",
    price: "$340,000",
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #2e1650 50%, #441e72 100%)",
  },
  {
    id: "rancho-cucamonga-adu",
    title: "Two-Story ADU with Garage",
    category: "ADU",
    location: "Rancho Cucamonga, CA",
    price: "$245,000",
    gradient: "linear-gradient(135deg, #0a2a3e 0%, #103e5c 50%, #18527a 100%)",
  },
  {
    id: "newport-beach-retail",
    title: "Luxury Retail Fit-Out",
    category: "Commercial",
    location: "Newport Beach, CA",
    price: "$310,000",
    gradient: "linear-gradient(135deg, #3e0a1a 0%, #5c1028 50%, #7a1838 100%)",
  },
  {
    id: "thousand-oaks-patio",
    title: "Hillside Patio & Fire Feature",
    category: "Outdoor",
    location: "Thousand Oaks, CA",
    price: "$62,000",
    gradient: "linear-gradient(135deg, #1a2e0a 0%, #2e4a10 50%, #3e6218 100%)",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "David & Maria S.",
    quote:
      "X Construction turned our 1960s ranch into something out of a design magazine. The team was communicative every step of the way, stayed on budget, and finished two weeks ahead of schedule. Our neighbors can't stop asking for their number.",
    projectType: "Full Home Remodel",
    location: "Beverly Hills, CA",
    rating: 5,
  },
  {
    name: "James T.",
    quote:
      "We needed a detached ADU built fast to help with rental income. X handled everything — design, permits, construction — in under five months. The unit rented on day one and now covers most of our mortgage. Best investment we've made.",
    projectType: "Custom ADU Build",
    location: "Rancho Cucamonga, CA",
    rating: 5,
  },
  {
    name: "Sarah L.",
    quote:
      "As a restaurant owner, downtime is money. X Construction completed our full commercial renovation over a long weekend and we reopened Monday morning to a completely transformed space. Professional, clean, and unbelievably efficient.",
    projectType: "Commercial Build-Out",
    location: "Anaheim, CA",
    rating: 5,
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "Instagram", href: "#", icon: "Instagram" },
  { name: "Facebook", href: "#", icon: "Facebook" },
  { name: "Twitter", href: "#", icon: "Twitter" },
  { name: "LinkedIn", href: "#", icon: "Linkedin" },
  { name: "YouTube", href: "#", icon: "Youtube" },
];
