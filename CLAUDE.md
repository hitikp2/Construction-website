# X Construction — SoCal Website

## Project Overview

A premium, modern construction company website for “X Construction” serving Southern California (Los Angeles County, San Bernardino County, Orange County, Riverside County, Ventura County, Inland Empire). The company does everything from remodeling to painting to custom ADU builds to commercial build-outs.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + custom CSS for advanced effects
- **AI Features:** Anthropic Claude API (claude-sonnet-4-20250514) for chat + vision
- **State Management:** React hooks (useState, useReducer, useContext)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Deployment target:** Vercel

## Design System

### Brand Identity

- **Aesthetic:** Dark, futuristic, luxury construction — NOT generic corporate
- **Primary background:** #0a0a0a (near-black)
- **Surface:** #161616, #1e1e1e
- **Accent (primary):** #c8ff00 (electric lime)
- **Accent secondary:** #ff6b35 (warm orange), #00b4d8 (cyan), #9b5de5 (violet)
- **Text:** #f0efe9 (warm white), #a8a8a0 (muted), #6a6a64 (subtle)
- **Gold:** #ffd60a (for ratings/highlights)
- **Typography:**
  - Display: “Playfair Display” (serif, for hero/section titles)
  - Body: “Outfit” (sans-serif, for everything else)
  - Mono: “JetBrains Mono” (for stats, prices, code-like elements)
- **Border radius:** 12px standard, 20px for cards
- **Shadows:** Deep, dramatic (rgba(0,0,0,.5) range)
- **Borders:** Very subtle (rgba(255,255,255,.04))
- **Accent glow effects:** Box shadows with rgba(200,255,0,.2)

### Animation Patterns

- Scroll-triggered fade-up reveals (IntersectionObserver or Framer Motion)
- Background grid pattern that drifts slowly
- Floating card animations (subtle Y translation loops)
- Hover states with translateY(-4px) + border color change + glow
- Typing indicator animation for AI chat
- Counter animations for stats
- Pulse animation for status dots
- Staggered reveal for card grids

## Architecture & File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Home page (assembles all sections)
│   ├── blog/
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx    # Individual blog post
│   └── api/
│       ├── chat/
│       │   └── route.ts    # AI chat endpoint (Claude API)
│       ├── vision/
│       │   └── route.ts    # AI vision/remodel endpoint (Claude API)
│       ├── estimate/
│       │   └── route.ts    # Price calculator endpoint
│       └── contact/
│           └── route.ts    # Contact form submission
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PhoneCTA.tsx    # Sticky bottom call bar
│   │   └── Preloader.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── ServiceAreas.tsx
│   │   ├── AITools.tsx         # AI Chat + AI Vision side by side
│   │   ├── Calculator.tsx      # Price estimator
│   │   ├── Portfolio.tsx
│   │   ├── Blog.tsx
│   │   ├── Testimonials.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── SectionHeader.tsx
│       ├── AnimatedCounter.tsx
│       └── Card.tsx
├── lib/
│   ├── pricing.ts          # Price calculator logic & data
│   ├── blog-data.ts        # Blog post content/metadata
│   └── constants.ts        # Company info, service areas, etc.
├── hooks/
│   ├── useInView.ts        # Scroll animation trigger
│   └── useScrollPosition.ts
└── styles/
    └── globals.css         # Tailwind imports + custom CSS
```

## Key Features to Implement

### 1. AI Chat Assistant (AITools.tsx + /api/chat)

- Real-time chat interface with typing indicators
- Uses Claude API (claude-sonnet-4-20250514) on the backend
- System prompt makes it a construction company assistant that knows SoCal pricing, permits, timelines
- Suggested quick-action buttons: “Kitchen pricing?”, “ADU info”, “How long?”, “Permits?”
- Messages render markdown (bold for prices, etc.)

### 2. AI Remodel Visualizer (AITools.tsx + /api/vision)

- Drag-and-drop / click-to-upload photo zone
- Sends image to Claude API with vision capabilities
- Claude analyzes the room and returns: room type detected, suggested remodel description, itemized cost breakdown as JSON
- Frontend renders before/after comparison + cost table
- Demo buttons for Kitchen, Bathroom, Living Room (use pre-built responses for demos)

### 3. Price Calculator (Calculator.tsx + /api/estimate)

- Form: Project Type, Quality Tier, Square Footage, County, Timeline, Permits
- Client-side instant calculation with detailed breakdown
- Categories: Kitchen, Bathroom, ADU, Room Addition, Painting (int/ext), Roofing, Flooring, Windows, Outdoor, Commercial, Full Remodel
- County multipliers: LA (1.12), SB (1.0), OC (1.15), Riverside (0.95)
- Tier multipliers: Standard / Mid-Range / Premium
- Breakdown shows: Materials, Labor, Project Mgmt, Design, Permits, Rush fee
- CTA to contact for exact quote

### 4. Phone/Contact System

- Click-to-call tel: links throughout
- Click-to-text sms: links
- Sticky bottom bar appears on scroll with Call Now + Text Us buttons
- Phone number prominent in navbar
- Contact form with: Name, Email, Phone, Service type, Address, Budget, Message
- Form validates with Zod, submits to /api/contact

### 5. Blog Section

- 6 pre-written blog post cards with categories
- Blog posts about: ADU laws 2026, Kitchen costs SoCal, Remodeling trends, LA permits guide, DIY vs Pro, Green building
- Each card has: category badge, date, read time, title, excerpt
- Individual blog pages at /blog/[slug]

### 6. Portfolio Gallery

- Filterable by category: All, Remodeling, ADU, Commercial, Outdoor
- Cards with hover overlay showing project name, location, price
- Placeholder styling (gradient backgrounds with emoji icons — will be replaced with real photos)

### 7. Services Grid

- 9 service cards: Full Home Remodel, Custom ADU, Painting, Commercial, Room Additions, Outdoor Living, Electrical/Plumbing, Windows/Doors/Roofing, Architectural Design & Permits
- Each card: icon, title, description, hover arrow

### 8. Service Areas

- 6 area cards: LA County, San Bernardino County, Orange County, Riverside County, Ventura County, Inland Empire
- Each lists key cities served

### 9. Testimonials

- 3 testimonial cards with star ratings, quote, author name, project type, location

## Coding Conventions

- Use TypeScript strict mode
- Prefer `const` over `let`, never use `var`
- Use arrow functions for components
- All components are functional with hooks
- Use Tailwind utility classes as primary styling, custom CSS only for complex animations
- Responsive: mobile-first approach
- All interactive elements need proper aria labels
- Use `'use client'` only on components that need it
- API routes use NextResponse, proper error handling with try/catch
- Environment variables: ANTHROPIC_API_KEY for Claude API

## Important Notes

- Company name is “X” (placeholder — will be changed later)
- Phone number placeholder: (800) 555-1234
- Email placeholder: info@xconstruction.com
- Address placeholder: 123 Builder’s Lane, Suite 100, Los Angeles, CA 90001
- License number placeholder: CA #XXXXXXX
- All pricing data is approximate SoCal market rates (2026)
- DO NOT use localStorage or sessionStorage in client components
- All fonts loaded via next/font/google
