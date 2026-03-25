export const COMPANY = {
  name: "X",
  phone: "(800) 555-1234",
  email: "info@xconstruction.com",
  address: "123 Builder's Lane, Suite 100, Los Angeles, CA 90001",
  license: "CA #XXXXXXX",
  phoneHref: "tel:+18005551234",
  smsHref: "sms:+18005551234",
} as const;

export const SERVICE_AREAS = [
  {
    name: "Los Angeles County",
    slug: "los-angeles",
    cities: [
      "Los Angeles",
      "Santa Monica",
      "Pasadena",
      "Long Beach",
      "Burbank",
      "Glendale",
    ],
  },
  {
    name: "San Bernardino County",
    slug: "san-bernardino",
    cities: [
      "San Bernardino",
      "Rancho Cucamonga",
      "Ontario",
      "Fontana",
      "Redlands",
      "Upland",
    ],
  },
  {
    name: "Orange County",
    slug: "orange",
    cities: [
      "Anaheim",
      "Irvine",
      "Santa Ana",
      "Huntington Beach",
      "Newport Beach",
      "Fullerton",
    ],
  },
  {
    name: "Riverside County",
    slug: "riverside",
    cities: [
      "Riverside",
      "Corona",
      "Temecula",
      "Murrieta",
      "Palm Springs",
      "Moreno Valley",
    ],
  },
  {
    name: "Ventura County",
    slug: "ventura",
    cities: [
      "Ventura",
      "Oxnard",
      "Thousand Oaks",
      "Simi Valley",
      "Camarillo",
      "Moorpark",
    ],
  },
  {
    name: "Inland Empire",
    slug: "inland-empire",
    cities: [
      "Ontario",
      "Rancho Cucamonga",
      "Fontana",
      "Corona",
      "Riverside",
      "San Bernardino",
    ],
  },
] as const;

export const SERVICES = [
  {
    id: "full-remodel",
    title: "Full Home Remodel",
    description:
      "Complete home transformations from foundation to finish, tailored to your vision.",
    icon: "Home",
  },
  {
    id: "adu",
    title: "Custom ADU",
    description:
      "Accessory dwelling units designed and built to maximize your property value.",
    icon: "Building2",
  },
  {
    id: "painting",
    title: "Painting",
    description:
      "Interior and exterior painting with premium finishes and expert color consultation.",
    icon: "Paintbrush",
  },
  {
    id: "commercial",
    title: "Commercial Build-Outs",
    description:
      "Office, retail, and restaurant build-outs that reflect your brand identity.",
    icon: "Building",
  },
  {
    id: "room-addition",
    title: "Room Additions",
    description:
      "Expand your living space with seamlessly integrated room additions.",
    icon: "PlusSquare",
  },
  {
    id: "outdoor",
    title: "Outdoor Living",
    description:
      "Patios, decks, outdoor kitchens, and landscaping for SoCal living.",
    icon: "Trees",
  },
  {
    id: "electrical-plumbing",
    title: "Electrical & Plumbing",
    description:
      "Licensed electrical and plumbing work for renovations and new construction.",
    icon: "Zap",
  },
  {
    id: "windows-doors-roofing",
    title: "Windows, Doors & Roofing",
    description:
      "Energy-efficient windows, custom doors, and durable roofing solutions.",
    icon: "DoorOpen",
  },
  {
    id: "design-permits",
    title: "Architectural Design & Permits",
    description:
      "Full design services and permit management for hassle-free projects.",
    icon: "PencilRuler",
  },
] as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Areas", href: "#areas" },
  { label: "AI Tools", href: "#ai-tools" },
  { label: "Calculator", href: "#calculator" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const STATS = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 4.9, suffix: "★", label: "Average Rating" },
] as const;
