import {
  blogPosts,
  getBlogPost,
  getBlogPostsByCategory,
  getRecentPosts,
} from "@/lib/blog-data";

describe("blogPosts", () => {
  it("has 6 blog posts", () => {
    expect(blogPosts).toHaveLength(6);
  });

  it("all posts have required fields", () => {
    for (const post of blogPosts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.category).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(post.readTime).toBeTruthy();
      expect(post.content).toBeTruthy();
    }
  });

  it("all slugs are unique", () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all dates are valid ISO format", () => {
    for (const post of blogPosts) {
      const date = new Date(post.date);
      expect(date.toString()).not.toBe("Invalid Date");
    }
  });
});

describe("getBlogPost", () => {
  it("returns the correct post by slug", () => {
    const post = getBlogPost("adu-laws-california-2026");
    expect(post).toBeDefined();
    expect(post?.title).toContain("ADU Laws");
  });

  it("returns undefined for non-existent slug", () => {
    expect(getBlogPost("non-existent-slug")).toBeUndefined();
  });
});

describe("getBlogPostsByCategory", () => {
  it("returns posts matching the category", () => {
    const aduPosts = getBlogPostsByCategory("ADU");
    expect(aduPosts.length).toBeGreaterThan(0);
    expect(aduPosts.every((p) => p.category === "ADU")).toBe(true);
  });

  it("is case-insensitive", () => {
    const result1 = getBlogPostsByCategory("adu");
    const result2 = getBlogPostsByCategory("ADU");
    expect(result1).toEqual(result2);
  });

  it("returns empty array for non-existent category", () => {
    expect(getBlogPostsByCategory("nonexistent")).toEqual([]);
  });
});

describe("getRecentPosts", () => {
  it("returns 3 posts by default", () => {
    expect(getRecentPosts()).toHaveLength(3);
  });

  it("returns requested count", () => {
    expect(getRecentPosts(2)).toHaveLength(2);
  });

  it("returns posts sorted by date descending", () => {
    const posts = getRecentPosts(6);
    for (let i = 0; i < posts.length - 1; i++) {
      const current = new Date(posts[i].date).getTime();
      const next = new Date(posts[i + 1].date).getTime();
      expect(current).toBeGreaterThanOrEqual(next);
    }
  });

  it("handles count greater than available posts", () => {
    expect(getRecentPosts(100)).toHaveLength(6);
  });
});
