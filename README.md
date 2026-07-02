# patrykzychowicz — portfolio

Personal portfolio of **Patryk Zychowicz** — AI-Native Developer & Product Builder.

**Live:** _(Vercel URL once deployed)_

## What this is

A single-page portfolio presenting my shipped work — most notably
[MGT Bookings](https://megustastu-bookings.vercel.app), a restaurant reservation
system in active daily use at a 13-table restaurant in the Canary Islands —
plus my skills, background, and how I work with AI-native tooling.

## How it's built

- **Plain HTML, CSS, and JavaScript.** No framework, no build step, no dependencies.
- The visual language (glass gradient background, translucent cards, blue accent,
  light/dark theming via CSS custom properties) is inherited from the shared design
  system of my MGT apps — this site is the third member of that family.
- Light/dark theme: one `data-theme` attribute flip on `<html>`, persisted in
  `localStorage`, respecting `prefers-color-scheme` on first visit, with a
  no-flash inline resolver.
- Progressive enhancement: an SVG displacement-map "liquid glass" refraction
  effect on select controls in Chromium browsers, falling back to standard
  blur-glass everywhere else.
- Accessibility: semantic HTML, keyboard focus states, `prefers-reduced-motion`
  respected throughout.

Directed by me, executed with [Claude Code](https://claude.com/claude-code).

## Contact

Via the site's contact button, or [GitHub](https://github.com/pzzychowicz-blip).
