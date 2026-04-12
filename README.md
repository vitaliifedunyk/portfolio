# Vitalii Fedunyk Portfolio

Personal portfolio website built with React, TypeScript, Tailwind CSS v4, and Framer Motion.
It presents selected projects, technical background, and core frontend skills in a lightweight single-page format.

## Live

[vitaliifedunyk.vercel.app](https://vitaliifedunyk.vercel.app/)

## Stack

- React 19
- TypeScript
- Tailwind CSS v4
- Vite
- Framer Motion

## Highlights

- Single-page portfolio with hash-based navigation
- Motion-driven UI with reduced-motion support
- Theme switching with CSS-variable styling
- Filterable projects section with challenge/solution context
- Centralized editable content in `src/data/constants.ts`

## Getting Started

### Prerequisites

- Node.js 18 or newer

### Run Locally

```bash
git clone https://github.com/vitaliifedunyk/portfolio
cd portfolio
npm install
npm run dev
```

### Production Build

```bash
npm run build
```

## Project Structure

```text
src/
├── components/   UI sections and shared interface elements
├── context/      Theme state
├── data/         Portfolio content and project metadata
├── hooks/        Reusable React hooks
├── lib/          Motion and shared configuration
└── types/        TypeScript content models
```

## Content Updates

Most visible portfolio content is managed in `src/data/constants.ts`.
This keeps project descriptions, links, and text easy to update without rewriting components.

## License

MIT
