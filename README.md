# NITH Fresher's Guide

> A practical, honest, and well-organized technical guide to help NIT Hamirpur freshers decide what to learn, where to learn it, what to build, and what to avoid.

Created and maintained by **Syed Arzaan** — B.Tech Electrical Engineering, NIT Hamirpur

---

## Table of Contents

- [The Problem](#the-problem)
- [Overview](#overview)
- [Key Features](#key-features)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Production Deployment](#production-deployment)
- [Codebase Architecture](#codebase-architecture)
- [Contributing](#contributing)
- [License & Credits](#license--credits)

---

## The Problem

When I joined NIT Hamirpur, I had cleared JEE Advanced — but that's where the clarity ended. Nobody hands you a roadmap for what comes next: which technical domain to explore, which resources are actually worth your time, which campus clubs and teams to approach, or what separates real skill-building from tutorial hell. The advice you get as a fresher is scattered, often contradictory, and rarely honest about trade-offs.

I built **NITH Fresher's Guide** because I wished something like this had existed when I started: a single, well-organized, honest map of the technical ecosystem at NITH — written by a student for students, with no hidden agenda beyond helping the next batch of freshers find their footing faster than I did.

---

## Overview

The **NITH Fresher's Guide** is designed to feel like a knowledgeable senior handing a fresher a map of the technical world. It's built with an editorial-academic aesthetic, a warm cream paper palette, and a deliberate emphasis on usefulness and credibility over polish for its own sake.

---

## Key Features

- **20 Technical Engineering Domains** — Equal focus on Software (AI/ML, Web Dev, DSA, Data Science, Cybersecurity, DevOps, Systems, Mobile Apps, Open Source) and Hardware (Electronics & Embedded, Robotics, IoT, VLSI, Power/Electrical, Control Systems, Game Dev, Graphics, CAD, Research).
- **10-Point Standard Domain Deep-Dives** — What it is, what you actually need, difficulty level, prerequisites, a sequential workflow roadmap, curated resources, project ideas, and senior warnings on when *not* to start.
- **First-Year Guidance Flowchart** (`/checklists`) — A 9-stage roadmap communicating sequence and priority:
  `01 Set Up Your Base → 02 Learn Fundamentals → 03 Practice Consistently → 04 Build First Project → 05 Explore NITH → 06 Level Up → 07 Career Readiness → 08 Stay Balanced → 09 Review & Reflect`
- **100% Verified Resource Database** — 60 curated resources audited via automated YouTube oEmbed and HTTP verification pipelines, linking to official documentation (React, PyTorch, ESP32, MDN, Docker, ROS 2, and more).
- **Global Search** (`⌘K` / `Ctrl+K`) — Instant fuzzy search across domains, technologies, creators, roadmaps, and NITH campus teams with full keyboard navigation.
- **Goal-Based Sequential Roadmaps** (`/roadmaps`) — Milestone paths for AI/ML internships, full-stack web development, DSA placements, and embedded hardware engineering.
- **Senior Reality Check** (`/reality-check`) — Unvarnished truths debunking tutorial hell, certificate traps, AI hype vs. fundamentals, and vanity metrics.
- **NITH Ecosystem Guide** (`/nith-ecosystem`) — Departmental teams (OJAS, VIBHAV, TEAM .EXE, HERMETICA, C-HELIX, MEDEXTROUS), student societies (App Team NITH, SPEC, CSEC, ISTE, Robotics Society, IEEE), campus fests, and verification disclaimers.

---

## Design System

```text
Page background:       #F5F1E8  (Warm cream paper tone)
Primary surface:       #FFFDF8  (Off-white card surface)
Secondary surface:     #EEE9DE  (Soft neutral surface)
Border:                #D8D0C2  (Editorial subtle border)

Primary text:          #171717  (Dark ink typography)
Body text:             #4B4A46  (Readable body ink)
Muted text:            #77736B  (Muted metadata text)

Primary accent:        #D9206E  (Restrained pink highlight)
Hardware accent:       #087F73  (Teal for hardware/embedded)
Software accent:       #2856B6  (Blue for software/computing)
Specialized accent:    #D97706  (Amber for emerging/specialized)
```

---

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/arzaanxeng/NITH-Freshers-Guide.git
cd NITH-Freshers-Guide

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the production bundle |
| `npm run verify-links` | Runs the automated link-verification suite against the resource database |

---

## Production Deployment

The project is optimized for instant, zero-config deployment on Vercel, Netlify, or GitHub Pages.

### Deploying to Vercel (Recommended)

```bash
npx vercel
```

Or import the GitHub repository directly into Vercel:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Deploying to Netlify

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

---

## Codebase Architecture

```text
NITH-Freshers-Guide/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── scripts/
│   └── verify-links.ts          # Automated YouTube oEmbed & HTTP verification pipeline
├── src/
│   ├── components/
│   │   ├── cards/               # Resource, Domain, Reality, Club Cards
│   │   └── common/               # Navbar, Footer, Command-K Search Modal
│   ├── data/
│   │   ├── config.ts             # Site metadata & author info
│   │   ├── types.ts              # Central TypeScript data interfaces
│   │   ├── domains/              # Software, Hardware, and Specialized domain data
│   │   ├── resources/            # Curated resource datasets across all 20 domains
│   │   ├── roadmaps/             # Goal-based sequential roadmaps
│   │   ├── checklists/           # 9-stage First-Year Guidance Flowchart data
│   │   ├── realityCheck/         # Senior reality check principles & traps
│   │   └── nith/                 # NITH departmental teams, societies, and fests
│   ├── pages/                    # Route pages (Home, Explore, Detail, Roadmaps, Resources, Flowchart, Reality, NITH)
│   ├── utils/                    # Fuzzy search & storage utilities
│   ├── App.tsx                   # Main app container & routing logic
│   ├── index.css                 # Tailwind directives & CSS design tokens
│   └── main.tsx                  # React DOM entry point
├── index.html                    # HTML entry with Google Fonts
├── package.json                  # Project dependencies & scripts
├── tsconfig.json                 # TypeScript project configuration
└── vite.config.ts                # Vite configuration with @tailwindcss/vite
```

---

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on proposing new resources, domains, or fixes.

---

## License & Credits

- Created and maintained by **Syed Arzaan**.
- Built for National Institute of Technology Hamirpur students.
- Content, recommendations, and campus guidance verified as of **August 2026**.
