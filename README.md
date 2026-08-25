# NITH Fresher's Guide — A Map for First Year

> **A practical, honest, well-organized technical guide that helps NIT Hamirpur freshers decide what to learn, where to learn it, what to build, and what to avoid.**

Created by **Syed Arzaan** • *Built for NIT Hamirpur Students*

---

## 🌟 Overview

The **NITH Fresher's Guide** is designed to feel like *"a knowledgeable senior handing a fresher a map of the technical world."* Built with an **editorial-academic aesthetic**, a **warm cream paper palette**, and an emphasis on **usefulness and credibility**.

---

## ✨ Key Features

- **20 Technical Engineering Domains**: Equal focus on Software (AI/ML, Web Dev, DSA, Data Science, Cybersecurity, DevOps, Systems, Mobile Apps, Open Source) and Hardware (Electronics & Embedded, Robotics, IoT, VLSI, Power/Electrical, Control Systems, Game Dev, Graphics, CAD, Research).
- **10-Point Standard Domain Deep-Dives**: What it is, What you actually need, Difficulty level, Prerequisites, Sequential workflow roadmaps, Curated resources, Project ideas, and *"Don't start if..."* senior warnings.
- **First-Year Guidance Flowchart (`/checklists`)**: A 9-stage sequential guidance roadmap communicating sequence and priority:
  `01 Set Up Your Base → 02 Learn Fundamentals → 03 Practice Consistently → 04 Build First Project → 05 Explore NITH → 06 Level Up → 07 Career Readiness → 08 Stay Balanced → 09 Review & Reflect`
- **100% Verified Resource Database**: 60 curated resources audited via automated YouTube oEmbed & browser HTTP verification pipelines with active links to official documentation (React, PyTorch, ESP32, MDN, Docker, ROS 2, etc.).
- **Global Command-K Search (`⌘K` / `Ctrl+K`)**: Instant fuzzy search across domains, technologies, creators, roadmaps, and NITH campus teams with full keyboard navigation.
- **Goal-Based Sequential Roadmaps (`/roadmaps`)**: Milestone workflow paths for AI/ML Internships, Full Stack Web Dev, DSA Placements, and Embedded Hardware Engineering.
- **Senior Reality Check (`/reality-check`)**: Unvarnished senior truths debunking tutorial hell, certificate traps, AI hype vs fundamentals, and false metrics.
- **NITH Ecosystem Guide (`/nith-ecosystem`)**: Grounded NIMBUS departmental teams (*OJAS*, *VIBHAV*, *TEAM .EXE*, *HERMETICA*, *C-HELIX*, *MEDEXTROUS*), student societies (*App Team NITH*, *SPEC*, *CSEC*, *ISTE*, *Robotics Society*, *IEEE*), campus fests, and official verification disclaimers.

---

## 🎨 Color System & Design Tokens

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

## 🛠️ Getting Started (Local Setup)

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation & Execution

```bash
# 1. Clone the repository
git clone https://github.com/syedarzaan/NITH-Freshers-Guide.git
cd First-Year-Guide

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run automated link verification suite
npm run verify-links

# 5. Build production bundle
npm run build
```

---

## 🚢 Production Deployment

The project is optimized for instant zero-config deployment on Vercel, Netlify, or GitHub Pages.

### Deploying to Vercel (Recommended)
```bash
npx vercel
```
Or import your GitHub repository into Vercel:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Deploying to Netlify
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

---

## 📁 Codebase Architecture

```text
First-Year-Guide/
├── scripts/
│   └── verify-links.ts          # Automated YouTube oEmbed & HTTP verification pipeline
├── src/
│   ├── components/
│   │   ├── cards/               # Resource, Domain, Reality, Club Cards
│   │   └── common/              # Navbar, Footer, Command-K Search Modal
│   ├── data/
│   │   ├── config.ts            # Configurable site metadata & Author info
│   │   ├── types.ts             # Central TypeScript data interfaces
│   │   ├── domains/             # Software, Hardware, and Specialized domain data
│   │   ├── resources/           # Curated resource datasets across all 20 domains
│   │   ├── roadmaps/            # Goal-based sequential roadmaps
│   │   ├── checklists/          # 9-Stage First-Year Guidance Flowchart data
│   │   ├── realityCheck/        # Senior reality check principles & traps
│   │   └── nith/                # NITH departmental teams, societies, and fests
│   ├── pages/                   # Route pages (Home, Explore, Detail, Roadmaps, Resources, Flowchart, Reality, NITH)
│   ├── utils/                   # Fuzzy search & LocalStorage utilities
│   ├── App.tsx                  # Main app container & routing logic
│   ├── index.css                # Tailwind directives & CSS design tokens
│   └── main.tsx                 # React DOM entry point
├── index.html                   # HTML entry with Google Fonts
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript project configuration
└── vite.config.ts               # Vite configuration with @tailwindcss/vite
```

---

## 📜 License & Credits

- Created & Maintained by **Syed Arzaan**
- Built for National Institute of Technology Hamirpur students.
- Content, recommendations, and campus guidance verified as of **August 2026**.
