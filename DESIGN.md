---
name: Bytewise Technologies
description: Sharp institutional ICT marketing — arctic mint light, navy structure, forest-green signal accents
colors:
  arctic-bg: "#f4f8f3"
  arctic-mint: "#f8fdf7"
  arctic-cyan: "#eef9f1"
  surface-strong: "#ffffff"
  ink: "#1b2a41"
  ink-soft: "#5f7088"
  navy: "#11243f"
  navy-soft: "#1f3a63"
  forest-green: "#159154"
  signal-lime: "#67ef57"
  accent-soft: "#def6e4"
  gold: "#b98b37"
  hero-ink: "#06132d"
  neo-copy: "#627594"
typography:
  display:
    fontFamily: "\"Syne\", \"Plus Jakarta Sans\", sans-serif"
    fontSize: "clamp(2.2rem, 4.8vw, 3.55rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "\"Public Sans\", sans-serif"
    fontSize: "clamp(1.85rem, 3.35vw, 3.15rem)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-0.05em"
  title:
    fontFamily: "\"Source Serif 4\", Georgia, serif"
    fontSize: "clamp(2rem, 3vw, 3.15rem)"
    fontWeight: 700
    lineHeight: 1.12
  body:
    fontFamily: "\"Public Sans\", sans-serif"
    fontSize: "0.98rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "\"Space Mono\", monospace"
    fontSize: "0.74rem"
    fontWeight: 700
    letterSpacing: "0.08em"
rounded:
  sm: "0.85rem"
  md: "1rem"
  lg: "1.6rem"
  xl: "2rem"
  pill: "999px"
spacing:
  sm: "0.95rem"
  md: "1.45rem"
  lg: "1.6rem"
  xl: "5rem"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, #159154, #9bf53b)"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.95rem 1.45rem"
  button-primary-hover:
    backgroundColor: "linear-gradient(135deg, #117844, #57da52)"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.95rem 1.45rem"
  button-outline:
    backgroundColor: "rgba(255, 255, 255, 0.7)"
    textColor: "#147a47"
    rounded: "{rounded.sm}"
    padding: "0.95rem 1.45rem"
  pill-badge:
    backgroundColor: "rgba(255, 255, 255, 0.68)"
    textColor: "#147a47"
    rounded: "{rounded.pill}"
    padding: "0.78rem 1rem"
  glass-panel:
    backgroundColor: "rgba(255, 255, 255, 0.64)"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "1.5rem"
---

# Design System: Bytewise Technologies

## Overview

**Creative North Star: "Institutional Edge"**

Bytewise reads as a firm that can pass a procurement review and still feel technically current. The visual system pairs an arctic mint light field with deep navy structure and forest-green signal accents. Surfaces are layered rather than flat: soft ambient shadows at rest, selective glass blur on hero and float elements, and motion that supports credibility (scroll reveals, restrained hero choreography) rather than spectacle.

The neo direction in the codebase is the canonical path forward. Refine it; do not restart from a generic IT vendor template. Density is medium: enough visual interest to prove craft, never so much that a skeptical evaluator thinks style is substituting for substance.

This system explicitly rejects cheap template and stock-photo agency aesthetics, startup hype, and decorative visuals that substitute for concrete capability.

**Key Characteristics:**

- Light, arctic mint atmosphere with navy typography anchors
- Forest-green gradient CTAs with uppercase, tactile confidence
- Serif and geometric sans pairing for institutional + modern tension
- Layered glass and soft shadows on hero/float surfaces only
- Scroll-driven reveals with full `prefers-reduced-motion` respect
- Procurement-safe clarity: readable copy, structured sections, no visual noise

## Colors

The palette is **Committed**: forest green and its lime signal carry CTAs and accent moments while arctic mint and navy hold the majority of surface area.

### Primary

- **Forest Signal Green** (#159154): Primary CTA fills, pill dots, nav underline accents, capability card accent lines. The color of "go" and operational confidence.
- **Signal Lime** (#67ef57 / #9bf53b): Gradient partner on primary buttons and hero tech lines. Used only inside gradients with forest green, never alone on large surfaces.

### Secondary

- **Procurement Navy** (#11243f): Headings, brand name, primary button borders (legacy pages), footer bands, and structural text. Anchors the institutional register.
- **Soft Navy** (#1f3a63): Gradient partner on navy fills and hover depth on legacy buttons.

### Tertiary

- **Muted Gold** (#b98b37): Sparingly on nav underline gradients (accent + gold) and legacy orb accents. Never a second primary CTA color.

### Neutral

- **Arctic Field** (#f4f8f3): Page background base and gradient stops. The ambient light of the system.
- **Arctic Mint Wash** (#f8fdf7 / #eef9f1): Secondary background stops and soft section fills.
- **Ink** (#1b2a41 / #06132d on neo hero): Body and heading text. Hero titles use the deeper #06132d for maximum contrast on mint.
- **Ink Soft** (#5f7088 / #627594): Supporting copy, nav links at rest, metadata. Keeps hierarchy without washing out.
- **Surface Strong** (#ffffff at 58–94% opacity): Cards, pills, float cards, and glass panels. Always tinted white over mint, never pure #fff on large fields.

### Named Rules

**The Signal Rarity Rule.** Forest green gradients appear on primary CTAs, pills, and accent lines only. If green covers more than roughly 15% of a viewport, the page is too loud for institutional credibility.

**The No-Neon Rule.** Signal lime exists inside controlled gradients. Never use it as a flat background, glow, or text color on its own.

## Typography

**Display Font:** Syne (with Plus Jakarta Sans, Public Sans fallback)
**Body Font:** Public Sans (with system sans fallback)
**Section Headline Font:** Source Serif 4 (with Georgia fallback) on legacy/refined sections
**Label Font:** Space Mono (badges, capability labels, uppercase microcopy)

**Character:** Public Sans keeps body copy legible for mixed technical literacy. Syne gives section display type a geometric edge without startup flash. Source Serif 4 adds gravitas on older section patterns. Space Mono marks system labels and badges as precise, engineered metadata.

### Hierarchy

- **Display** (700, clamp(2.2rem, 4.8vw, 3.55rem), line-height 1.04): Capability showcase titles, major section headers in neo mode. Syne, tight negative tracking.
- **Headline** (700, clamp(1.85rem, 3.35vw, 3.15rem), line-height 1.03): Hero H1 on home. Public Sans, max ~12ch width for impact.
- **Title** (700, clamp(2rem, 3vw, 3.15rem), line-height ~1.12): Inner page heroes, card titles on legacy patterns. Source Serif 4 where specified.
- **Body** (400, 0.98–1.06rem, line-height 1.8): Paragraphs and service descriptions. Cap line length around 39rem (65–75ch) on hero and intro blocks.
- **Label** (700, 0.72–0.74rem, letter-spacing 0.08–0.16em, uppercase): Pills, float-card badges, brand name, CTA button text, nav micro-labels.

### Named Rules

**The Uppercase CTA Rule.** Primary and outline buttons use uppercase, 0.82rem, weight 800, and wide letter-spacing (0.16em). This is intentional tactile confidence; do not lowercase CTAs.

**The Dual-Register Rule.** Neo pages lead with Public Sans/Syne. Legacy `home-page--refined` sections may still use Source Serif 4 for titles. New work on neo pages should not introduce a third display family.

## Elevation

Hybrid layered system: most content surfaces sit on soft ambient shadows; hero and float elements add glass blur for depth. Shadows are diffuse and navy-tinted (`rgba(0, 43, 107, …)` or `rgba(17, 36, 63, …)`), never harsh black drops.

Flat-by-default applies to text blocks and simple sections. Glass (`backdrop-filter: blur(12px)`) is reserved for `.glass-panel`, hero visual containers, float cards, and the floating contact chip.

### Shadow Vocabulary

- **Ambient SM** (`0 18px 36px rgba(16, 36, 63, 0.06)`): Default card rest state via `--shadow-sm`.
- **Ambient MD** (`0 28px 56px rgba(16, 36, 63, 0.08)`): Floating contact, elevated panels via `--shadow-md`.
- **Ambient LG** (`0 44px 96px rgba(16, 36, 63, 0.14)`): Hero-scale emphasis via `--shadow-lg`.
- **CTA Lift** (`0 14px 34px rgba(21, 145, 84, 0.2)`): Primary neo buttons at rest.
- **Glass Inset** (`inset 0 1px 0 rgba(255, 255, 255, 0.7)`): Top highlight on glass panels.

### Named Rules

**The Glass-on-Hero Rule.** Backdrop blur is allowed on hero visuals, float cards, and the floating contact button. Do not apply glassmorphism to every card in a grid; that reads as cheap agency template.

**The Flat-By-Default Rule.** Surfaces are tonal at rest. Shadows escalate on hover (220ms ease) or on floating/hero elements, not on every static content block.

## Components

Component character: **tactile and confident** — uppercase CTAs, gradient fills, clear hover states, pills with live dots.

### Buttons

- **Shape:** Gently rounded (0.85rem / 13.6px); header CTA uses full pill (999px).
- **Primary (neo):** Forest-to-lime gradient fill, white text, green-tinted shadow. Padding 0.95rem 1.45rem.
- **Hover / Focus:** Darker green gradient, border shifts to rgba(21, 145, 84, 0.16). No bounce easing.
- **Outline:** White 70% fill, green text (#147a47), light green border. Hover increases opacity and border strength.

### Chips / Pills

- **Style:** Pill radius (999px), frosted white background, green label text, optional gradient dot with soft ring shadow.
- **State:** Static; dot may pulse on capability badges (respect reduced motion).

### Cards / Containers

- **Corner Style:** 1.6rem on capability cards, 2rem on hero visual glass shell.
- **Background:** White at 58–82% opacity over mint field; subtle gradient on capability cards.
- **Shadow Strategy:** Green-tinted ambient on capability cards; navy-tinted on hero glass.
- **Border:** 1px white at 42–62% opacity.
- **Internal Padding:** 1.45rem on capability cards, 1.5rem on hero visual.

### Inputs / Fields

- **Style:** Contact forms use ~0.9rem radius, light borders, 180ms ease on focus.
- **Focus:** Border-color and box-shadow shift; no neon glow.
- **Error / Disabled:** Not heavily styled in current codebase; keep contrast-safe if extended.

### Navigation

- **Style:** Public Sans, weight 700, ink-soft at rest, navy on hover/active.
- **Active indicator:** 2px gradient underline (forest green to gold), scaleX animation 180ms ease.
- **Mobile:** Bootstrap collapse; toggler with minimal border, no focus ring box-shadow.

### Signature Components

**Neo Hero Visual:** Glass panel with tech grid overlay, orb blurs, rotating hero SVG, linked float cards with gentle float animation. The flagship proof-of-craft element; keep motion subdued for Institutional Edge.

**Neo Capabilities Showcase:** 2-column grid of glass capability cards with 3D perspective reveal on scroll. Syne display title; Space Mono badge.

## Do's and Don'ts

### Do:

- **Do** use the arctic mint + navy + forest green token set from `:root` and neo overrides.
- **Do** keep hero copy max-width around 39rem and hero titles tight (~12ch) for scanability.
- **Do** use uppercase, letter-spaced CTAs with gradient primary fills on neo pages.
- **Do** respect `prefers-reduced-motion: reduce` by disabling orb, grid, float, and reveal animations.
- **Do** layer depth with soft navy shadows and selective glass on hero/float surfaces only.
- **Do** write specific, concrete section copy suitable for gov/NGO procurement reviewers.

### Don't:

- **Don't** look like a cheap template or stock-photo agency site. No generic icon+heading+text card grids repeated without purpose.
- **Don't** use startup hype: buzzword stacking, neon accents, or decorative motion without informational value.
- **Don't** apply glassmorphism as a default on every card or section.
- **Don't** use side-stripe borders (colored border-left/right > 1px) on cards or callouts.
- **Don't** expand gradient text (`background-clip: text`) to new components; existing showcase title span is legacy to phase out, not a pattern to copy.
- **Don't** use pure #000 or #fff on large surfaces; tint neutrals toward mint/navy.
- **Don't** animate layout properties (width, height, margin); use opacity and transform only.
