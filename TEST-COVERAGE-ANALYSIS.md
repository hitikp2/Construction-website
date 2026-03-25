# Test Coverage Analysis

## Current State

| Module | Statements | Branches | Functions | Lines |
|--------|-----------|----------|-----------|-------|
| **lib/** (constants, pricing, blog-data, validation) | **100%** | **100%** | **100%** | **100%** |
| app/page.tsx | 0% | 100% | 0% | 0% |
| app/api/chat/route.ts | 0% | 0% | 0% | 0% |
| app/api/contact/route.ts | 0% | 0% | 0% | 0% |
| app/api/estimate/route.ts | 0% | 0% | 0% | 0% |
| app/api/vision/route.ts | 0% | 0% | 0% | 0% |
| hooks/useInView.ts | 0% | 0% | 0% | 0% |
| hooks/useScrollPosition.ts | 0% | 0% | 0% | 0% |
| **Overall** | **34.8%** | **11.29%** | **40%** | **29.01%** |

### What IS Tested (67 tests, 4 suites)

- **`lib/pricing.ts`** — Full coverage: estimate calculations, all project types, county/tier multipliers, permits, rush fees, currency formatting, edge cases (zero/negative sqft), linear scaling
- **`lib/blog-data.ts`** — Full coverage: post retrieval by slug, category filtering (case-insensitive), recent posts sorting, data integrity (unique slugs, valid dates, required fields)
- **`lib/constants.ts`** — Full coverage: company info, service areas, services, nav links, stats data integrity and uniqueness
- **`lib/validation.ts`** — Full coverage: contact form schema (all fields, phone format variations, optional budget), estimate form schema (all enum values, boundary values)

---

## Recommended Test Improvements (Priority Order)

### 1. API Route Tests (HIGH PRIORITY)

**Why:** API routes contain critical business logic (input validation, error handling, external API integration) that is completely untested. Bugs here directly affect users.

**Files needing tests:**

#### `/api/estimate/route.ts`
- Valid request returns correct estimate
- Missing fields return 400
- Invalid square footage returns 400
- Response shape matches `EstimateBreakdown` type

#### `/api/contact/route.ts`
- Valid submission returns success
- Invalid fields return 400 with specific error details
- Zod validation errors map correctly to field-level messages

#### `/api/chat/route.ts`
- Missing messages array returns 400
- Empty messages array returns 400
- Missing API key returns 500
- Successful response extracts message correctly
- External API failure returns appropriate error status

#### `/api/vision/route.ts`
- Demo mode returns pre-built responses for kitchen/bathroom/living-room
- Invalid demo type returns 400
- Missing image (non-demo) returns 400
- Missing API key returns 500
- Malformed JSON from vision API returns 500

**Approach:** Mock `fetch` for external Anthropic API calls. Use `NextRequest` constructor for request mocking.

### 2. Custom Hook Tests (MEDIUM PRIORITY)

**Why:** Hooks contain reusable UI logic. Bugs in hooks cascade across every component that uses them.

#### `useInView`
- Returns `isInView: false` initially
- Sets `isInView: true` when element enters viewport (mock IntersectionObserver)
- `triggerOnce: true` stops observing after first intersection
- `triggerOnce: false` toggles back to `false` when leaving viewport
- Respects threshold and rootMargin options
- Cleans up observer on unmount

#### `useScrollPosition`
- Returns `isScrolled: false` and `scrollY: 0` initially
- Updates `scrollY` on scroll events
- Sets `isScrolled: true` when scrollY exceeds threshold
- Uses custom threshold value
- Cleans up event listener on unmount

**Approach:** Use `@testing-library/react` `renderHook`. Mock `IntersectionObserver` and `window.scrollY`.

### 3. UI Component Tests (MEDIUM PRIORITY)

**Why:** Components are the user-facing layer. As components are built out per CLAUDE.md, each should have tests.

**Expected components to test (once created):**

#### Layout Components
- **Navbar**: Renders logo, nav links, phone number, mobile menu toggle, "Free Quote" CTA
- **Footer**: Renders 4-column grid, social links, copyright
- **PhoneCTA**: Appears after scroll threshold, has tel: and sms: links
- **Preloader**: Shows initially, fades out after delay

#### Section Components
- **Hero**: Renders headline, CTAs, stat counters, floating cards
- **Services**: Renders 9 service cards with correct data
- **ServiceAreas**: Renders 6 area cards with city lists
- **AITools**: Chat input sends messages, vision upload triggers analysis, demo buttons work
- **Calculator**: Form inputs update estimate, breakdown displays correctly
- **Portfolio**: Filter buttons work, cards render project data
- **Blog**: Renders 6 blog cards, links to correct slugs
- **Testimonials**: Renders star ratings, quotes, author info
- **Contact**: Form validates on submit, shows error messages, success state

#### UI Primitives
- **Button**: Renders variants (primary, secondary, outline), handles click, disabled state
- **SectionHeader**: Renders title and subtitle with correct styles
- **AnimatedCounter**: Animates from 0 to target value
- **Card**: Renders children, applies hover effects

### 4. Integration / E2E Tests (LOWER PRIORITY — add later)

**Why:** Unit tests can't catch routing issues, hydration errors, or cross-component integration bugs.

**Recommended scenarios:**
- Calculator form → estimate display flow
- Chat message → response display flow
- Contact form → validation → submission flow
- Blog listing → blog detail navigation
- Mobile responsive layout (navbar hamburger menu)
- Portfolio filter interaction

**Approach:** Playwright or Cypress for E2E. React Testing Library for integration tests that render multiple components together.

### 5. Snapshot Tests (OPTIONAL)

Consider snapshot tests for static content sections (Footer, ServiceAreas, Services) to catch unintended markup changes. Keep these minimal — snapshot tests are brittle and should only cover components that rarely change.

---

## Recommended Testing Tools

| Tool | Purpose | Status |
|------|---------|--------|
| Jest | Test runner | Installed |
| @testing-library/react | Component rendering | Installed |
| @testing-library/jest-dom | DOM matchers | Installed |
| @testing-library/user-event | User interaction simulation | Installed |
| ts-jest | TypeScript support | Installed |
| Playwright or Cypress | E2E testing | Not yet installed |
| msw (Mock Service Worker) | API mocking for integration tests | Not yet installed |

---

## Coverage Goals

| Phase | Target | Focus |
|-------|--------|-------|
| **Phase 1** (current) | 35% → 60% | Add API route tests + hook tests |
| **Phase 2** | 60% → 80% | Add component unit tests as components are built |
| **Phase 3** | 80%+ | Add integration tests + E2E for critical user flows |
