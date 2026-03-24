// ---------------------------------------------------------------------------
// X Construction — Extended area detail data for /areas/[slug] pages
// ---------------------------------------------------------------------------

export interface AreaDetail {
  slug: string;
  name: string;
  description: string;
  neighborhoods: string[];
  popularProjects: string[];
  permitInfo: string;
  testimonial?: {
    quote: string;
    name: string;
    project: string;
  };
}

export const AREA_DETAILS: AreaDetail[] = [
  {
    slug: 'los-angeles',
    name: 'Los Angeles County',
    description:
      'Los Angeles County is our largest service area, spanning from the San Fernando Valley to the South Bay. With decades of experience navigating LADBS permitting, historic preservation zones, and hillside construction requirements, our team delivers exceptional results across every LA neighborhood.\n\nWhether you own a Spanish Colonial in Silver Lake, a mid-century modern in the Hollywood Hills, or a craftsman bungalow in Pasadena, we understand the unique architectural character of each community and build accordingly.',
    neighborhoods: [
      'Los Angeles',
      'Beverly Hills',
      'Santa Monica',
      'Pasadena',
      'Long Beach',
      'Burbank',
      'Glendale',
      'West Hollywood',
      'Culver City',
      'Malibu',
      'Manhattan Beach',
      'Redondo Beach',
    ],
    popularProjects: [
      'Full Home Remodels',
      'ADU Construction',
      'Hillside Additions',
      'Seismic Retrofitting',
      'Historic Home Restoration',
    ],
    permitInfo:
      'Los Angeles County permits are managed through LADBS (Los Angeles Department of Building and Safety). Typical plan check takes 4–8 weeks. ADU permits have been streamlined under California AB 68 and SB 13, with most approvals issued within 60 days.',
    testimonial: {
      quote:
        'X Construction turned our 1960s ranch into something out of a design magazine. The team was communicative every step of the way, stayed on budget, and finished two weeks ahead of schedule.',
      name: 'David & Maria S.',
      project: 'Full Home Remodel — Beverly Hills',
    },
  },
  {
    slug: 'san-bernardino',
    name: 'San Bernardino County',
    description:
      'San Bernardino County offers homeowners incredible value with lower construction costs compared to coastal counties. Our team has completed hundreds of projects across Rancho Cucamonga, Ontario, Fontana, and surrounding communities, delivering premium quality at competitive Inland Empire pricing.\n\nThe county has seen significant growth, and we help homeowners capitalize on rising property values through strategic improvements like ADUs, room additions, and full remodels.',
    neighborhoods: [
      'San Bernardino',
      'Rancho Cucamonga',
      'Ontario',
      'Fontana',
      'Redlands',
      'Upland',
      'Chino Hills',
      'Rialto',
      'Highland',
      'Loma Linda',
    ],
    popularProjects: [
      'ADU Construction',
      'Room Additions',
      'Kitchen Remodels',
      'Outdoor Living Spaces',
      'Garage Conversions',
    ],
    permitInfo:
      'San Bernardino County permits are managed through the Land Use Services Department. Processing is generally faster than LA County, with many residential permits approved in 2–4 weeks. The county offers online permit tracking for convenience.',
    testimonial: {
      quote:
        'We needed a detached ADU built fast to help with rental income. X handled everything — design, permits, construction — in under five months. The unit rented on day one.',
      name: 'James T.',
      project: 'Custom ADU Build — Rancho Cucamonga',
    },
  },
  {
    slug: 'orange-county',
    name: 'Orange County',
    description:
      'Orange County homeowners demand the highest quality, and our team delivers. From Irvine master-planned communities to Newport Beach coastal properties, we navigate each city\'s unique building requirements with expertise.\n\nOrange County\'s strict HOA regulations and coastal zone restrictions require a builder who understands local codes. We have established relationships with building departments across OC and consistently achieve smooth, on-time permit approvals.',
    neighborhoods: [
      'Anaheim',
      'Irvine',
      'Huntington Beach',
      'Newport Beach',
      'Fullerton',
      'Costa Mesa',
      'Mission Viejo',
      'Laguna Beach',
      'Yorba Linda',
      'San Clemente',
    ],
    popularProjects: [
      'Kitchen & Bathroom Remodels',
      'Outdoor Kitchens',
      'ADU Construction',
      'Commercial Build-Outs',
      'Window & Door Replacements',
    ],
    permitInfo:
      'Orange County cities each have their own permitting departments. Irvine, Newport Beach, and Huntington Beach have particularly specific requirements. Our team is experienced with HOA architectural review processes and Coastal Commission applications for properties in the coastal zone.',
    testimonial: {
      quote:
        'Our kitchen remodel in Irvine was handled with incredible professionalism. The design team listened to exactly what we wanted and the build crew executed flawlessly.',
      name: 'Michelle K.',
      project: 'Kitchen Remodel — Irvine',
    },
  },
  {
    slug: 'riverside',
    name: 'Riverside County',
    description:
      'Riverside County is one of the fastest-growing regions in Southern California, and homeowners are investing in their properties at record rates. From Corona and Temecula wine country to the resort communities of Palm Springs, we deliver quality construction at Riverside County pricing.\n\nOur team understands the unique challenges of building in the Inland Empire — including extreme heat considerations, expansive soils, and varying municipal codes across the county\'s many cities.',
    neighborhoods: [
      'Riverside',
      'Corona',
      'Temecula',
      'Murrieta',
      'Palm Springs',
      'Menifee',
      'Lake Elsinore',
      'Palm Desert',
      'Hemet',
      'Indio',
    ],
    popularProjects: [
      'ADU Construction',
      'Outdoor Living Spaces',
      'Full Home Remodels',
      'Pool-Adjacent Construction',
      'Energy-Efficient Upgrades',
    ],
    permitInfo:
      'Riverside County permits are processed through the Building and Safety department. Most residential permits are approved within 2–6 weeks. The county has embraced California ADU legislation and processes ADU permits efficiently.',
  },
  {
    slug: 'ventura',
    name: 'Ventura County',
    description:
      'Ventura County blends coastal charm with suburban comfort. Our team serves communities from Ventura and Oxnard along the coast to Thousand Oaks and Simi Valley inland. We are experienced with Ventura County\'s fire zone building requirements and coastal development regulations.\n\nMany Ventura County homes are approaching the age where major systems need updating. We specialize in modernizing these properties with energy-efficient upgrades, updated layouts, and outdoor living spaces that take advantage of the beautiful climate.',
    neighborhoods: [
      'Ventura',
      'Oxnard',
      'Thousand Oaks',
      'Simi Valley',
      'Camarillo',
      'Moorpark',
      'Newbury Park',
      'Ojai',
      'Port Hueneme',
      'Fillmore',
    ],
    popularProjects: [
      'Fire-Resistant Construction',
      'Kitchen & Bathroom Remodels',
      'ADU Construction',
      'Roofing & Window Replacement',
      'Outdoor Living Spaces',
    ],
    permitInfo:
      'Ventura County permits are managed through the Resource Management Agency. Fire zone properties require additional review and fire-resistant building materials. Coastal zone projects may require Coastal Development Permits in addition to standard building permits.',
  },
  {
    slug: 'inland-empire',
    name: 'Inland Empire',
    description:
      'The Inland Empire — covering western San Bernardino and eastern Los Angeles counties — is experiencing a construction boom. Communities like Pomona, West Covina, Claremont, and Diamond Bar are seeing rapid appreciation, making home improvement investments more valuable than ever.\n\nOur Inland Empire division offers the same premium service as our coastal teams at significantly lower price points, reflecting the region\'s more favorable construction costs. We have deep experience with the specific building departments in this area.',
    neighborhoods: [
      'Pomona',
      'West Covina',
      'Claremont',
      'Upland',
      'Diamond Bar',
      'Glendora',
      'La Verne',
      'Azusa',
      'Covina',
      'San Dimas',
    ],
    popularProjects: [
      'ADU Construction',
      'Room Additions',
      'Full Home Remodels',
      'Garage Conversions',
      'Outdoor Living Spaces',
    ],
    permitInfo:
      'Inland Empire cities each have their own building departments. Processing times are generally shorter than LA and Orange counties. Many cities in this region have been particularly progressive in adopting streamlined ADU permitting processes.',
  },
];

export function getAreaBySlug(slug: string): AreaDetail | undefined {
  return AREA_DETAILS.find((a) => a.slug === slug);
}
