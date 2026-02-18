🌐 Read this in: [English](README.md) | [Українською](README.uk.md)

## Project Title

Personal Portfolio Website (React + Vite)

## Description

This repository contains my personal portfolio website built with React, TypeScript, and Vite.
The current version uses a single-page section layout with smooth hash navigation and a fixed animated particle background.

## Live Demo

https://vitaliifedunyk.vercel.app/

## Current Features

- Fullscreen `Hero` section with primary CTAs (`View Projects` and `Email Me`).
- Section-based layout: `Hero` -> `About` -> `Projects` -> `Footer`.
- Hash navigation in navbar for `#about` and `#projects`.
- URL stays synced with scrolling:
  - `#about` / `#projects` when those sections are active.
  - clean URL (no hash) when `Hero` is active.
- Projects section includes:
  - category filters,
  - accent-styled `Live Demo` and `Repo` buttons,
  - short `Challenge` and `Fix` notes for each project.
- Footer includes social links and static copyright:
  - `© 2026 Vitalii Fedunyk`.
- Theme toggle (dark/light) and fixed animated particle background (without flashing effects).
- Centralized portfolio content in `src/data/constants.ts`.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Three.js
- GSAP
- ESLint

## Project Structure

```text
portfolio/
├─ src/
│  ├─ components/
│  │  ├─ common/      # Navbar, Footer, MouseGlow, ThemeToggle
│  │  ├─ features/    # Hero, AboutOverlay, ProjectsOverlay
│  │  └─ index.ts
│  ├─ data/constants.ts
│  ├─ hooks/          # useHashRoute, useTheme
│  ├─ types/
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ public/
├─ index.html
├─ package.json
├─ vite.config.ts
└─ eslint.config.js
```

## How to Run Locally

```bash
npm install
npm run dev
```

## Available Scripts

```bash
npm run build
npm run preview
npm run lint
```

## Author

GitHub: https://github.com/vitaliifedunyk
