# Personal Portfolio — Vitalii Fedunyk

> Fullstack developer portfolio built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

![preview](./assets/preview.png)

## 🚀 Live Demo

[vitaliifedunyk.vercel.app](https://vitaliifedunyk.vercel.app/)

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

## ✨ Features

- Single-page layout with hash-based navigation synced to scroll position
- Animated entrance sequences using Framer Motion with `usePrefersReducedMotion` support
- Dark / light theme toggle with CSS variable theming and smooth transitions
- Mouse glow effect (dark mode only) — lazy-loaded, respects reduced motion preferences
- Interactive projects section with category filters and challenge/solution notes per project
- All portfolio content centralized in `src/data/constants.ts` — easy to update

## 📦 Getting Started

### Prerequisites

- Node.js v18+

### Installation

```bash
git clone https://github.com/vitaliifedunyk/portfolio
cd portfolio
npm install
npm run dev
```

## 🗂️ Project Structure

src/
├── components/
│ ├── common/ # Navbar, Footer, Section, ThemeToggle, MouseGlow
│ └── features/ # Hero, AboutOverlay, ProjectsOverlay
├── context/ # ThemeContext
├── data/
│ └── constants.ts # All portfolio content lives here — edit this to update the site
├── hooks/ # useHashRoute, useTheme, usePrefersReducedMotion
├── lib/ # Shared motion config
└── types/ # TypeScript interfaces for content and theme

## 🧪 Tests

```bash
# Tests coming soon — Vitest + React Testing Library
npm run test
```

## 🔮 Future Improvements

- [ ] Add backend projects section with Node.js/Express examples
- [ ] Blog section (MDX-based)
- [ ] Contact form with email integration
- [ ] E2E tests with Playwright
- [ ] i18n support (EN/UA)

## 📄 License

MIT
