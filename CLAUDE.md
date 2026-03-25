@AGENTS.md

# Project Notes

## Scroll Behavior
- The page must always start at the top (Hero section) on load/reload.
- Do NOT use `scrollIntoView()` in any `useEffect` that runs on mount — it
  scrolls the entire page to that element, not just the container.
- The AI chat in `AITools.tsx` uses `hasInteracted` ref to skip auto-scroll
  on initial render. Only scroll the chat after user sends a message.
- Always use `{ block: 'nearest' }` with `scrollIntoView` to avoid scrolling
  the page — only scroll the nearest scrollable container.
- Do NOT add `autofocus` to any element below the fold.

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
