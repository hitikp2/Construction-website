export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "adu-laws-california-2026",
    title: "New ADU Laws in California for 2026: What Homeowners Need to Know",
    excerpt:
      "California continues to expand ADU regulations. Learn about the latest changes that make it easier and more affordable to build an ADU on your property.",
    category: "ADU",
    date: "2026-03-15",
    readTime: "8 min read",
    content:
      "California's 2026 ADU legislation introduces streamlined permitting processes and reduced fees for homeowners looking to add accessory dwelling units...",
  },
  {
    slug: "kitchen-remodel-costs-socal",
    title: "Kitchen Remodel Costs in Southern California: 2026 Price Guide",
    excerpt:
      "Planning a kitchen remodel in SoCal? Here's a detailed breakdown of costs by county, quality tier, and project scope.",
    category: "Pricing",
    date: "2026-03-01",
    readTime: "10 min read",
    content:
      "Kitchen remodels in Southern California range widely in cost depending on your county, the scope of work, and your chosen finishes...",
  },
  {
    slug: "remodeling-trends-2026",
    title: "Top 10 Remodeling Trends for 2026",
    excerpt:
      "From smart home integration to sustainable materials, discover the hottest remodeling trends shaping SoCal homes this year.",
    category: "Trends",
    date: "2026-02-15",
    readTime: "6 min read",
    content:
      "The remodeling industry in 2026 is driven by sustainability, technology, and a renewed focus on outdoor living spaces...",
  },
  {
    slug: "la-building-permits-guide",
    title: "The Complete Guide to LA Building Permits",
    excerpt:
      "Navigating the permit process in Los Angeles can be complex. This guide breaks down everything you need to know.",
    category: "Permits",
    date: "2026-02-01",
    readTime: "12 min read",
    content:
      "Getting building permits in Los Angeles involves navigating city zoning regulations, LADBS requirements, and often historic district overlays...",
  },
  {
    slug: "diy-vs-professional-remodel",
    title: "DIY vs. Professional Remodel: When to Hire a Contractor",
    excerpt:
      "Some projects are great DIY candidates, while others absolutely need a pro. Learn where the line is.",
    category: "Tips",
    date: "2026-01-15",
    readTime: "7 min read",
    content:
      "While DIY remodeling can save money on simple cosmetic updates, structural work, electrical, and plumbing should always be handled by licensed professionals...",
  },
  {
    slug: "green-building-socal",
    title: "Green Building in Southern California: Sustainable Construction Guide",
    excerpt:
      "Eco-friendly construction is more than a trend in SoCal. Learn about sustainable materials, energy efficiency, and green certifications.",
    category: "Sustainability",
    date: "2026-01-01",
    readTime: "9 min read",
    content:
      "Southern California's climate makes it an ideal location for green building practices, from solar integration to drought-resistant landscaping...",
  },
];

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
};

export const getRecentPosts = (count: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};
