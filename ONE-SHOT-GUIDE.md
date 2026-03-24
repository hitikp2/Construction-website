# How to One-Shot This Website with Claude Code Plan Mode

## Step 1: Install Claude Code (if not already installed)

```bash
npm install -g @anthropic-ai/claude-code
```

Then authenticate:

```bash
claude login
```

## Step 2: Set Up the Project

```bash
# Create the project directory
mkdir x-construction && cd x-construction

# Initialize Next.js with TypeScript + Tailwind
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Install dependencies
npm install framer-motion lucide-react react-hook-form @hookform/resolvers zod react-markdown

# Copy the CLAUDE.md into the project root
# (copy the CLAUDE.md file from this folder into x-construction/)
```

## Step 3: Add your API key

Create `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

## Step 4: Launch Claude Code in Plan Mode

```bash
# Start Claude Code
claude

# Then press Shift+Tab TWICE to enter Plan Mode
# You'll see: ⏸ plan mode on
```

## Step 5: Paste This Prompt

Copy and paste everything below the line into Claude Code while in Plan Mode:

-----

```
Think hard and create a detailed implementation plan for the entire X Construction website. Read the CLAUDE.md file first — it contains the full spec, design system, architecture, and feature requirements.

Here is the complete scope:

BUILD A FULL NEXT.JS 14 CONSTRUCTION COMPANY WEBSITE with these features:

1. DESIGN: Dark futuristic luxury theme (#0a0a0a bg, #c8ff00 accent, Playfair Display + Outfit fonts). Animated grid background in hero. Scroll-triggered fade-up animations via Framer Motion. Floating card animations. Glowing accent borders on hover. Dramatic shadows.

2. LAYOUT (single page + blog):
   - Preloader with logo animation
   - Fixed navbar with phone number, nav links, "Free Quote" CTA, mobile hamburger menu
   - Hero: headline "Building SoCal's Future, Today", subtext, two CTAs, animated stat counters (500+ projects, 15+ years, 4.9★ rating), floating project preview cards
   - Services: 9 cards (Full Home Remodel, Custom ADU, Painting, Commercial Build-Outs, Room Additions, Outdoor Living, Electrical & Plumbing, Windows/Doors/Roofing, Architectural Design & Permits)
   - Service Areas: 6 cards (LA County, San Bernardino County, Orange County, Riverside County, Ventura County, Inland Empire) with key cities listed
   - AI Tools section (side-by-side grid):
     LEFT: AI Chat assistant using Claude API — real chat UI with typing indicators, suggested questions, markdown rendering. Backend at /api/chat with system prompt making Claude a construction expert who knows SoCal pricing.
     RIGHT: AI Remodel Visualizer — photo upload zone, sends to Claude vision API at /api/vision, returns room analysis + itemized cost breakdown as JSON. Demo buttons for kitchen/bathroom/living room with pre-built responses.
   - Price Calculator: form with Project Type (12 options), Quality Tier, Sqft, County, Timeline, Permits. Client-side calculation with county multipliers (LA 1.12, SB 1.0, OC 1.15, RV 0.95). Shows total + range + breakdown (materials, labor, mgmt, design, permits, rush fee).
   - Portfolio: filterable grid (All/Remodeling/ADU/Commercial/Outdoor) with hover overlays showing project name + location + price
   - Blog: 6 cards (ADU Laws 2026, Kitchen Costs SoCal, Remodeling Trends, LA Permits Guide, DIY vs Pro, Green Building). Link to /blog/[slug] pages.
   - Testimonials: 3 cards with 5-star ratings, quotes, author info
   - Contact: form (name, email, phone, service, address, budget, message) with Zod validation + /api/contact route. Side panel with phone/email/address/license info cards.
   - Footer: 4-column grid (brand, services, areas, company) + social links
   - Sticky bottom phone CTA bar (appears on scroll): "Call Now" + "Text Us" buttons

3. API ROUTES:
   - /api/chat: POST, takes messages array, calls Claude API with construction-expert system prompt, streams response
   - /api/vision: POST, takes base64 image, sends to Claude with vision, returns JSON with room_type, remodel_description, cost_items array
   - /api/estimate: POST, takes form data, returns calculated estimate with breakdown
   - /api/contact: POST, validates with Zod, returns success (placeholder for email/CRM integration)

4. BLOG PAGES:
   - /blog — listing page with all 6 posts
   - /blog/[slug] — individual post pages with full content, author info, related posts
   - Blog data stored in lib/blog-data.ts as typed objects

5. KEY TECHNICAL REQUIREMENTS:
   - TypeScript strict mode throughout
   - 'use client' only where needed (interactive components)
   - Framer Motion for all animations (fade-up on scroll, stagger children, hover effects)
   - Responsive: mobile-first, hamburger menu on mobile, stacked grids
   - next/font/google for Playfair Display, Outfit, JetBrains Mono
   - Proper SEO metadata in layout.tsx
   - All env vars typed and validated
   - Error boundaries on AI features
   - Loading states for all async operations

Create a step-by-step plan covering every file that needs to be created, in what order, with what content. Group the work into phases.
```

## Step 6: Review the Plan

Claude Code will generate a detailed plan showing every file and implementation step. Review it carefully.

- Press **Ctrl+G** to open the plan in your text editor if you want to annotate or modify it
- Once satisfied, press **Shift+Tab** to exit Plan Mode back into auto-accept mode
- Tell Claude: **“Execute the plan”**

Claude will then create every file, install dependencies, and build the entire site.

## Step 7: Run the Dev Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

-----

## Tips for Best Results

1. **CLAUDE.md is critical** — Claude Code reads it automatically every session. The more detail you put in it, the better the output. The one provided above has the full design system, architecture, and conventions.
1. **Use Opus for this** — This is a complex multi-file project. If you have Max plan, Claude Code will use Opus 4.6 which handles this better. You can also set the model explicitly:
   
   ```bash
   claude --model claude-opus-4-6
   ```
1. **If it runs out of context**, just tell Claude to continue from where it left off. The plan file persists at `~/.claude/plans/`.
1. **After generation**, you can refine individual sections:
   
   ```
   The hero section animation is too subtle. Make the grid pattern more visible
   and add a parallax scroll effect to the floating cards.
   ```
1. **To swap “X” for the real company name later:**
   
   ```
   Replace all instances of "X Construction" and "X" branding with
   "REAL NAME Construction" throughout the entire project.
   ```
