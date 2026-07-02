# DESIGN.md — Patryk Zychowicz portfolio

Inherited from the MGT apps' shared design contract
(megustastu-bookings/index.html tokens), tuned for editorial portfolio scale.
All tokens live in `css/style.css` under `:root` (light) and
`[data-theme="dark"]`.

## Color

- Background: the MGT 6-stop glass gradient (light: #e8edf5 → #e0e4ee family;
  dark: #15171c → #17191f family). Fixed attachment.
- Accent: #007AFF light / #0A84FF dark (Apple system blue). Used for links,
  CTAs, timeline dots, the one accent word in the hero.
- Status hues (borrowed from the apps): live-green for the production badge,
  amber for in-development.
- Text: #1a1d24 / #f2f2f7 primary; #5a6474 / #9a9aa0 muted.
- Never #000/#fff surfaces; every neutral is tinted cool.

## Surfaces

- Glass cards: rgba(255,255,255,.45) light / rgba(44,44,46,.55) dark, 1px
  white-rim borders, inset-highlight shadows (--shadow-sheet / --shadow-card).
- Double-bezel pattern: outer shell tray (--bg-shell, radius 32px, padding
  10-16px) around an inner card with concentric radius.
- Screenshot frames: browser-chrome bezel (three dots + URL pill).

## Typography

- Stack: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
  "Helvetica Neue", system-ui, sans-serif. No webfonts.
- Hero: clamp(2.7rem, 7.2vw, 5.4rem), weight 700, letter-spacing -0.035em.
- Section h2: clamp(1.9rem, 4.2vw, 3rem).
- Eyebrows: 11px, 650 weight, 0.18em tracking, uppercase, in a glass pill.
- Body 17px / 1.6; ledes clamp to ~1.25rem.

## Theming

One `data-theme` attribute flip on `<html>`; preference in localStorage key
`pz-theme`; `prefers-color-scheme` respected until user chooses; no-flash
inline resolver in `<head>`. Screenshots swap light/dark via `.light-only` /
`.dark-only` classes.

## Motion

- Custom curve everywhere: cubic-bezier(0.32, 0.72, 0, 1).
- Scroll reveal: translateY(36px) + blur(6px) → resolve, 900ms, via
  IntersectionObserver only.
- Hover: cards lift -4px onto opaque --bg-hover-card (shared MGT contract);
  buttons scale 0.98 on press; nested icon discs translate on hover.
- prefers-reduced-motion: everything static.

## Liquid glass (progressive enhancement)

SVG displacement-map filter `#frosted` (assets/dispmap.png as feImage map),
applied as `backdrop-filter: url(#frosted)` on the theme toggle only, gated to
Chromium via `.lg-on` on `<html>` (js/main.js). Base blur-glass styling stays
as the universal fallback.

## Breakpoints

- 900px: project/skills/experience grids collapse to one column.
- 640px: nav condenses (Experience link hidden), full-width CTAs, tighter
  section padding.
