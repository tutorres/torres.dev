# Design System: torres.dev

A reference guide for replicating the visual identity of this project in other applications.

---

## Stack & Tooling

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Component Library:** shadcn/ui, style preset `new-york`, base color `neutral`
- **Color Space:** OKLCH throughout (better perceptual uniformity than hex/hsl)
- **Fonts:** Geist (sans) + Geist Mono (monospace), both from Vercel

---

## Typography

### Font Families

```css
--font-sans: 'Geist', 'Geist Fallback', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'Geist Mono Fallback', monospace;
```

Install via `next/font/google` or `geist` npm package.

### Type Scale

| Role | Classes | Size |
|---|---|---|
| Hero heading | `text-4xl sm:text-5xl font-bold tracking-tight` | 36px / 48px |
| Section label | `font-mono text-sm font-medium uppercase tracking-wider` | 14px |
| Card title | `text-lg font-semibold` | 18px |
| Body | `text-sm leading-relaxed` | 14px |
| Caption / meta | `text-xs font-medium` | 12px |
| Nav link | `text-sm` | 14px |
| Nav brand | `font-mono text-sm font-medium` | 14px |

**Rule:** all technical / code-adjacent labels use `font-mono`. Prose and UI use `font-sans`.

---

## Color Palette

All tokens are declared as CSS custom properties and consumed by Tailwind. Values use OKLCH.

### Light Mode

| Token | OKLCH | Approximate Hex |
|---|---|---|
| `--background` | `oklch(1 0 0)` | `#ffffff` |
| `--foreground` | `oklch(0.145 0 0)` | `#252525` |
| `--card` | `oklch(1 0 0)` | `#ffffff` |
| `--primary` | `oklch(0.205 0 0)` | `#353535` |
| `--primary-foreground` | `oklch(0.985 0 0)` | `#fcfcfc` |
| `--secondary` | `oklch(0.97 0 0)` | `#f5f5f5` |
| `--secondary-foreground` | `oklch(0.205 0 0)` | `#353535` |
| `--muted` | `oklch(0.97 0 0)` | `#f5f5f5` |
| `--muted-foreground` | `oklch(0.556 0 0)` | `#8d8d8d` |
| `--border` | `oklch(0.922 0 0)` | `#ebebeb` |
| `--input` | `oklch(0.922 0 0)` | `#ebebeb` |
| `--ring` | `oklch(0.708 0 0)` | `#b4b4b4` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | red-orange |
| `--accent` | `oklch(0.97 0 0)` | `#f5f5f5` |

### Dark Mode

| Token | OKLCH | Approximate Hex |
|---|---|---|
| `--background` | `oklch(0.145 0 0)` | `#252525` |
| `--foreground` | `oklch(0.985 0 0)` | `#fcfcfc` |
| `--card` | `oklch(0.145 0 0)` | `#252525` |
| `--primary` | `oklch(0.985 0 0)` | `#fcfcfc` |
| `--primary-foreground` | `oklch(0.205 0 0)` | `#353535` |
| `--secondary` | `oklch(0.269 0 0)` | `#3f3f3f` |
| `--border` | `oklch(0.269 0 0)` | `#3f3f3f` |
| `--input` | `oklch(0.269 0 0)` | `#3f3f3f` |
| `--ring` | `oklch(0.439 0 0)` | `#707070` |

**Key insight:** the palette is intentionally **monochromatic**, with zero chroma (saturation = 0) for all structural colors. Color only appears in status badges and charts.

### Status / Semantic Colors

Used exclusively in badges to communicate state:

| Status | Color | Usage |
|---|---|---|
| Live / active | green | `bg-green-100 text-green-800` (light) |
| In development | yellow/amber | `bg-yellow-100 text-yellow-800` |
| Error / destructive | red-orange | `oklch(0.577 0.245 27.325)` |

---

## Spacing & Sizing

### Layout

| Element | Value |
|---|---|
| Max content width | `max-w-3xl` (48rem / 768px) |
| Horizontal page padding | `px-4` (16px) |
| Section vertical padding | `py-20` (80px) or `py-16 sm:py-24` |
| Fixed header height | `h-14` (56px) |
| Header z-index | `z-50` |

### Component Spacing

| Component | Padding |
|---|---|
| Card | `p-5` |
| Button (default) | `h-9 px-4` |
| Button (sm) | `h-8 px-3` |
| Button (lg) | `h-10 px-6` |
| Card header gap | `gap-6` |
| Section item gap | `gap-3` or `gap-4` |

---

## Border Radius

Base radius variable: `--radius: 0.625rem` (10px).

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | `0.375rem` (6px) | small badges, tight elements |
| `radius-md` | `0.5625rem` (9px) | inputs, small cards |
| `radius-lg` | `0.625rem` (10px) | cards, containers |
| `radius-xl` | `1.125rem` (18px) | dialogs, large panels |

---

## Shadows

Shadows are subtle, used to add depth without drama.

| Class | Usage |
|---|---|
| `shadow-xs` | Inputs, small interactive elements |
| `shadow-sm` | Cards |
| `shadow-md` | Elevated panels |
| `shadow-lg` | Dialogs, modals |

---

## Animations & Transitions

### Durations

| Value | Usage |
|---|---|
| `100ms` | Micro interactions (color flips) |
| `200ms` | Most UI transitions (dialogs, dropdowns) |
| `300ms` | Slightly heavier elements |
| `500ms` | Page-level transitions |
| `1000ms` | Caret blink |

### Easing

- `ease-in-out`: standard for most transitions
- `ease-linear`: sidebar width transitions

### Motion Patterns (via tw-animate-css)

```
animate-in / animate-out
fade-in / fade-out
zoom-in-95 / zoom-out-95
slide-in-from-top-2
slide-in-from-left-2 / slide-in-from-right-2
animate-accordion-up / animate-accordion-down
animate-caret-blink
```

**Rule:** animations are subtle and functional. They communicate state changes, not decoration.

---

## Layout Patterns

### Navbar

```
fixed top-0 z-50
border-b border-border
bg-background/80 backdrop-blur-sm    ← glass morphism
h-14
```

Container inside: `max-w-3xl mx-auto px-4 flex items-center justify-between`

### Page Sections

All sections share the same centered container:

```
max-w-3xl mx-auto px-4 py-20
```

Sections are separated by visual hierarchy (heading style, optional `border-t`) rather than background color changes.

### Hero

```
min-h-[80vh] flex flex-col items-center justify-center text-center pt-14
```

### Experience Timeline

```
border-l border-border pl-6 relative
  └── dot: absolute -left-1.5 top-1.5 size-3 rounded-full bg-foreground
```

### Project Cards

```
border border-border rounded-lg p-5
flex flex-col gap-3
```

---

## Component Conventions

### Buttons

Four primary variants in use:

| Variant | When to use |
|---|---|
| `default` | Primary CTA: dark background, light text |
| `outline` | Secondary action: border, transparent fill |
| `ghost` | Tertiary / nav actions: no border, hover only |
| `link` | Inline text links with underline |

### Badges

```
rounded-md text-xs font-medium px-2 py-0.5
```

Variants: `default` (primary), `secondary` (muted), `outline` (bordered).
Custom status variants overlay the base with semantic color.

### Focus & Interaction States

```css
/* Focus ring */
ring-2 ring-ring/50 outline-none

/* Hover */
transition-colors duration-200

/* Disabled */
pointer-events-none opacity-50
```

---

## Overall Aesthetic

**Philosophy:** minimalist, monochromatic, functional. Every design decision removes noise rather than adding interest.

**Keywords:** clean · professional · technical · high-contrast · restrained · precise

**What this design is:**
- Neutral gray spectrum, no brand color beyond the content itself
- Monospace font for anything "technical" (labels, nav brand, section markers)
- Glass navbar with backdrop blur as the one structural flourish
- Generous whitespace; sections breathe rather than crowd
- Dark mode is a first-class citizen, not an afterthought
- Status communicated through color only in badges (not backgrounds or borders)
- Animations exist to orient the user, not to impress them

**What this design avoids:**
- Gradient backgrounds or decorative gradients
- Heavy drop shadows or 3D effects
- Bright accent colors in structural UI
- Decorative illustrations or abstract shapes
- Dense layouts or compressed spacing
- Font weights heavier than `font-bold`

---

## Replication Checklist

To clone this aesthetic in a new project:

- [ ] Install `geist` package and set `--font-sans` / `--font-mono` CSS variables
- [ ] Use shadcn/ui with `new-york` style and `neutral` base color
- [ ] Replace all shadcn default HSL tokens with OKLCH values from the table above
- [ ] Set `--radius: 0.625rem` as base radius
- [ ] Add `bg-background/80 backdrop-blur-sm` to the navbar
- [ ] Use `max-w-3xl mx-auto px-4` as the universal container
- [ ] Keep section backgrounds identical. Differentiate sections by typography, not color
- [ ] Reserve color (green / yellow / blue) only for semantic status badges
- [ ] Use `font-mono` for all labels, tags, and technical metadata
- [ ] Keep animations under 300ms; prefer `fade-in` + `zoom-in-95` for modals
