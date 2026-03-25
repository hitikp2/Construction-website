@AGENTS.md

# Project Notes

## Scroll Behavior
- The page must always start at the top (Hero section) on load/reload.
- `ScrollToTop` component (`src/components/layout/ScrollToTop.tsx`) handles this
  via `useEffect` → `window.scrollTo(0, 0)` after React hydration.
- Do NOT use `<head>` scripts for scroll — they fire before the body exists and
  the browser overrides them during rendering.
- Do NOT add `autofocus` to any element below the fold (e.g. AI chat input) as
  browsers will scroll to focused elements.

## Company Data
- All company info (phone, email, address, license) lives in `src/lib/constants.ts`
  as the single source of truth via the `COMPANY` constant.
- Use `phoneHref()` and `smsHref()` helpers from constants for tel:/sms: links.
- Never hardcode phone numbers or company details in components.

## Design System
- Primary accent: `#c8ff00` (lime green)
- Background: `#0a0a0a` (near black)
- Section titles support `React.ReactNode` via `SectionHeader` — use
  `<span className="text-[#c8ff00]">` to highlight key words.
- Service cards use emoji icons (`service.emoji`) and starting prices
  (`service.startingPrice`).

## AI Features
- Chat and Vision APIs return 503 when `ANTHROPIC_API_KEY` is not set.
- No demo/mock data — all AI responses come from the live API only.
- Error states in AITools show helpful fallback CTAs (calculator, contact form).
