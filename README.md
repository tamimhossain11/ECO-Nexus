# Eco Nexus

Marketing and team site for **Eco Nexus**, a Bangladeshi robotics team competing at
**WICE 2026** in the IT & Robotics category with the EN-1 Sentinel — an autonomous drone
for surveillance, precision farming and environmental observability.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** with a CSS-variable driven glassmorphism design system
- **react-three-fiber / drei** for the 3D drone, modelled procedurally in code (no asset files)
- **Framer Motion** for page transitions, scroll reveals and the intro sequence
- **next-themes** for the light/dark toggle

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

> Note: if your shell exports `NODE_ENV=production`, npm will skip devDependencies.
> Install with `NODE_ENV=development npm install` in that case.

## Pages

| Route      | Contents                                                                 |
| ---------- | ------------------------------------------------------------------------ |
| `/`        | Hero with the interactive 3D drone, capability pillars, live-telemetry mock, roadmap, principles |
| `/drone`   | Orbitable 3D model, spec grid, six-subsystem explorer                    |
| `/team`    | Member cards, team stats, mentors, roadmap                               |
| `/contact` | Validated contact form, contact channels, demo radar, FAQ accordion      |

## Where to edit content

Nearly all copy lives in [`src/lib/site.ts`](src/lib/site.ts) — team members, specs,
capability pillars, roadmap entries, FAQs and contact details. Change it there and every
page updates.

## The 3D drone

[`src/components/three/DroneModel.tsx`](src/components/three/DroneModel.tsx) builds the
aircraft from primitives: carbon X-frame, four rotor pods with three-blade props and
motion-blur ghosting, prop guards, a sweeping camera gimbal, a spray tank and landing skids.

- [`DroneScene.tsx`](src/components/three/DroneScene.tsx) — lighting, reflections, shadows.
  `variant="hero"` auto-rotates and leans toward the cursor; `variant="inspect"` gives the
  visitor orbit controls.
- [`FlyByScene.tsx`](src/components/three/FlyByScene.tsx) — the intro fly-past.
- [`DroneCanvas.tsx`](src/components/three/DroneCanvas.tsx) — client-only wrapper; three.js
  cannot be server-rendered.

Environment lighting is built in-scene from drei `Lightformer`s, so nothing is fetched from a
CDN at runtime.

## Intro sequence

[`Preloader.tsx`](src/components/Preloader.tsx) flies the drone left to right, reveals the
**ECO NEXUS** wordmark, then wipes away. It runs once per full page load (not on client-side
navigation) and any click or keypress skips it. Timing is the `FLIGHT_SECONDS` constant.

## Theming

Colours are CSS custom properties on `:root` and `.dark` in
[`globals.css`](src/app/globals.css). The 3D scene reads the resolved theme and swaps its
accent colours and light intensities to match.

## Before going live

- Replace the placeholder contact details and social links in `src/lib/site.ts`.
- The contact form has no backend — it composes a `mailto:` draft. Point it at a form
  service or an API route when you have one.
- Swap the initials avatars in the team cards for real photographs.
- Update `metadataBase` in `src/app/layout.tsx` to the production domain.
