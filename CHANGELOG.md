# Changelog

All notable changes to the Tagbooru Toolkit web app will be documented in this file.

## [1.2.0] — 2026-05-17

### Added
- Animated SVG border-trace effect on hover for output cards, copy buttons, ghost buttons, and nav tabs — stroke draws clockwise on mouseenter and un-draws on mouseleave (`src/hooks/useBorderTrace.js`)
- Press feedback on all buttons via `scale(0.96) translateY(1px)` on `:active`
- Orange glow `box-shadow` on hover for primary/gradient buttons (Analyze Tags, Copy All, Ko-fi) as an alternative to the border trace
- Source Material card accent changed from `border-left: 4px` to `box-shadow: inset 4px 0 0` to avoid breaking SVG border alignment
- Source Material Copy button uses indigo trace color and indigo resting border to match card theme
- Output cards are now flex columns — textareas fill available card height automatically when a sibling card is resized via the grid row

### Changed
- Plural-stripping fallback in `getExactLocalTag` narrowed to digit-prefixed tags and known plural suffixes (`girls`, `boys`, `guys`) — previously stripped any trailing `s`, risking false matches on words like `dress`, `lens`, `abs`
- Cache miss entries in `danbooruApi.js` now use an explicit `expiresAt` timestamp instead of a backdated `cachedAt` value — timestamps are now honest and safe to read as actual cache times
- Toggle checkbox (`#toggle-source-material`) no longer uses `pointer-events: none` or zero dimensions — keyboard focus is now reachable via Tab
- CSP `connect-src` now includes `'self'` alongside `https://danbooru.donmai.us` — fixes the local CSV fetch (`/danbooru_tags_post_count.csv`) being blocked by the policy
- CSP `script-src` tightened from `'self' 'unsafe-inline' https:` to `'self'` — Vite production bundles do not require inline scripts
- README rewritten to accurately reflect current features, tech stack, and privacy model

### Removed
- Dead `#aria-live-announcer` div from `index.html` — status announcements are handled by the `aria-live` region inside `TextFormatter.jsx`
- Unused `TracedPanel` wrapper component

### Fixed
- SVG border trace misalignment on Source Material card caused by asymmetric `border-left` affecting `offsetWidth` coordinate space

## [1.1.0] — 2026-05-06

### Added
- Semantic HTML landmarks (`<header>`, `<nav>`, `<main>`) for screen reader navigation
- Skip-to-content link for keyboard users
- `aria-live` region for copy confirmation announcements
- `aria-label` attributes on all interactive elements and output textareas
- `aria-busy` indicator on Analyze button during processing
- `:focus-visible` outlines on buttons and copy buttons for keyboard navigation
- `prefers-reduced-motion` media query to respect user motion preferences
- Loading spinner with visual indicator during tag resolution
- "Copy All" button to copy all non-empty category outputs at once
- Tag count badges displayed in each output card heading
- Error boundary retry button ("Try Again") in the crash recovery UI
- ESLint and Prettier development tooling (`npm run lint`, `npm run format`)
- Content Security Policy meta tag for XSS mitigation

### Changed
- Window title from "Danbooru Prompt Formatter" to "Tagbooru Toolkit"
- README URL from `xymoh.github.io/prompt-formatter/` to `xymoh.github.io/Tagbooru/`
- Image Tagger download link from v1.0.0 to v1.3.0
- Magic numbers (35, 55, 100, 80, 60, 50) replaced with named constants (`SCORE_DISCARD`, `SCORE_LOW_CONFIDENCE`, `SCORE_EXACT`, `SCORE_PREFIX`, `SCORE_CONTAINS`, `SCORE_OVERLAP_MAX`)

### Fixed
- Duplicate `.output-card` CSS selector block removed (dead code)
- Error boundary now logs errors and component stack to console for debugging
- Uncaught promise rejection in `analyzeInput` onClick now handled with `.catch()`
- `.gitignore` expanded to include `.env`, IDE files, OS files, and build artifacts

---

## [1.0.0] — 2025

### Initial Release
- Danbooru tag parsing and matching via API
- Heuristic tag categorization (style, character, looks, landscape, action, NSFW, copyright, other)
- CSV-based local tag index for offline matching
- Copy-per-category functionality
- Component-based React UI with Vite build system
- GitHub Pages deployment
- Image Tagger download page
