// ---------------------------------------------------------------------------
// X Construction — Blog post data
// ---------------------------------------------------------------------------

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  content?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "california-adu-laws-2026",
    title: "California ADU Laws in 2026: Everything Homeowners Need to Know",
    excerpt:
      "New state legislation makes building an ADU easier and more affordable than ever. We break down the latest permit changes, setback requirements, and financing options available to SoCal homeowners.",
    category: "ADU",
    date: "2026-01-15",
    readTime: 8,
  },
  {
    slug: "kitchen-remodel-costs-socal",
    title: "How Much Does a Kitchen Remodel Cost in Southern California?",
    excerpt:
      "From budget refreshes to luxury gut renovations, here's a realistic breakdown of kitchen remodel costs across LA, Orange County, and the Inland Empire in 2026.",
    category: "Remodeling",
    date: "2026-02-03",
    readTime: 6,
  },
  {
    slug: "top-remodeling-trends-2026",
    title: "Top 10 Remodeling Trends Dominating SoCal in 2026",
    excerpt:
      "Indoor-outdoor living, warm minimalism, and smart home integration are leading the charge. Discover the design trends shaping Southern California homes this year.",
    category: "Design",
    date: "2026-02-18",
    readTime: 5,
  },
  {
    slug: "la-building-permits-guide",
    title: "A Homeowner's Guide to Building Permits in Los Angeles",
    excerpt:
      "Navigating LA's permit process can be daunting. This step-by-step guide covers when you need a permit, how to apply, timelines, costs, and common mistakes to avoid.",
    category: "Permits",
    date: "2026-03-01",
    readTime: 7,
  },
  {
    slug: "diy-vs-professional-remodel",
    title: "DIY vs. Hiring a Pro: When to Call a Contractor",
    excerpt:
      "Some projects are perfect for weekend warriors — others can cost you thousands if done wrong. Learn which renovations you can tackle yourself and which demand a licensed professional.",
    category: "Tips",
    date: "2026-03-10",
    readTime: 5,
  },
  {
    slug: "green-building-southern-california",
    title: "Green Building in Southern California: Sustainable Choices That Pay Off",
    excerpt:
      "Solar-ready roofing, energy-efficient windows, and drought-tolerant landscaping aren't just eco-friendly — they boost property value. Here's how to build green in SoCal.",
    category: "Sustainability",
    date: "2026-03-18",
    readTime: 6,
  },
];
