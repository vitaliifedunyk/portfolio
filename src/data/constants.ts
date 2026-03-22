import type {
  NavLink,
  PersonalInfo,
  Project,
  SocialLink,
} from "../types/content.types";

/**
 * Central source of truth for all portfolio content.
 * Update this file to change any text, links, or project data on the site.
 */

/** Primary identity shown in the Hero section */
export const PERSONAL_INFO: PersonalInfo = {
  name: "Vitalii Fedunyk",
  role: "Fullstack Developer",
  tagline:
    "I turn ideas into fast, clean web products — from pixel-perfect UI to working APIs.",
  email: "vitaliifedunyk.dev@gmail.com",
  resumeUrl: "#",
};

/** Skills displayed in the "Core" column of the About section */
export const CORE_SKILLS = [
  "HTML5 & CSS3",
  "JavaScript (ES6+)",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Vite",
];

/** Skills displayed in the "Currently Learning" column of the About section */
export const LEARNING_SKILLS = [
  "Next.js",
  "Node.js & Express",
  "Docker",
  "REST API design",
];

/** Tools displayed in the "Tools" column of the About section */
export const TOOLS_SKILLS = [
  "Git & GitHub",
  "VS Code",
  "Figma",
  "Postman",
  "npm / pnpm",
];

/** Section links rendered in the main navigation */
export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
];

/** External profile links shown in the footer */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/vitaliifedunyk",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vitaliifedunyk/",
    icon: "linkedin",
  },
  {
    name: "Telegram",
    url: "https://t.me/fdyfck",
    icon: "telegram",
  },
];

/** Projects displayed in the Projects section */
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "WebStudio",
    description:
      "Final course landing page for a web design studio. Focused on pixel-accurate implementation, responsive breakpoints, and solid HTML/CSS fundamentals.",
    challenge:
      "Pixel-accurate implementation was difficult because of mixed fixed/relative dimensions in the initial layout.",
    solution:
      "Converted critical blocks to flexible units and aligned breakpoints, which improved visual consistency.",
    technologies: ["HTML/CSS"],
    liveUrl: "https://vitaliifedunyk.github.io/goit-markup-hw-06/",
    githubUrl: "https://github.com/vitaliifedunyk/goit-markup-hw-06",
    type: "course",
    tracks: ["html-css"],
  },
  {
    id: 2,
    title: "YachtJet",
    description:
      "Multi-section yacht rental website focused on polished UI and responsive behavior. Built with reusable layout patterns and interactive states, then refined after initial course version.",
    challenge:
      "The header and navigation interactions conflicted with section anchors on mobile devices.",
    solution:
      "Refined anchor offsets and interaction states to make navigation predictable and avoid overlap issues.",
    technologies: ["Tailwind CSS"],
    liveUrl: "https://vitaliifedunyk.github.io/yachtjet/",
    githubUrl: "https://github.com/vitaliifedunyk/yachtjet",
    type: "course",
    isRefactored: true,
    tracks: ["tailwindcss"],
  },
  {
    id: 3,
    title: "EcoTote",
    description:
      "Responsive landing page for an eco-friendly tote bag brand. Implemented semantic layout, adaptive sections, and clean component styling. Later refactored and improved after course submission.",
    challenge:
      "Maintaining consistent spacing and typography across breakpoints caused noticeable visual jumps.",
    solution:
      "Reworked the spacing scale and unified typography tokens to keep layout rhythm stable on all screen sizes.",
    technologies: ["Tailwind CSS"],
    liveUrl: "https://vitaliifedunyk.github.io/eco-tote/",
    githubUrl: "https://github.com/vitaliifedunyk/eco-tote",
    type: "course",
    isRefactored: true,
    tracks: ["tailwindcss"],
  },
  {
    id: 4,
    title: "JobFlow",
    description:
      "Lightweight task manager built in vanilla JS — add, edit, delete, and filter tasks with localStorage persistence. Zero dependencies, pure DOM manipulation.",
    challenge:
      "Keeping task state in sync after creating, editing, and deleting items was causing small UI glitches.",
    solution:
      "Centralized the state update logic and added straightforward input checks, so task updates now stay consistent.",
    technologies: ["JavaScript"],
    liveUrl: "https://vitaliifedunyk.github.io/jobflow/",
    githubUrl: "https://github.com/vitaliifedunyk/jobflow",
    type: "personal",
    tracks: ["javascript"],
  },
  {
    id: 5,
    title: "RepoFinder",
    description:
      "GitHub repo explorer that queries the GitHub API in real time, shows key stats, and handles loading, empty, and error states gracefully.",
    challenge:
      "API requests needed clearer loading and error handling, especially when no repositories were found.",
    solution:
      "Added explicit loading, empty, and error states to keep feedback predictable during every search.",
    technologies: ["JavaScript"],
    liveUrl: "https://vitaliifedunyk.github.io/repofinder/",
    githubUrl: "https://github.com/vitaliifedunyk/repofinder",
    type: "personal",
    tracks: ["javascript"],
  },
];

/** Introductory paragraphs displayed in the About section */
export const ABOUT_PARAGRAPHS = [
  "I started with HTML and CSS, got hooked on how things work under the hood, and ended up building full-page apps with React, TypeScript, and a Node.js backend.",
  'Most of my projects came from a simple question: "could I actually build this?" — a work tracker, a repo search tool, a landing page someone would want to use. That hands-on approach taught me more than any tutorial.',
  "I work across the full stack — Vite + Tailwind on the frontend, Express on the backend, Docker when things need to be portable. TypeScript is my default now, not an afterthought.",
  "Based in Italy, open to remote roles or relocation within the EU. I communicate clearly, pick things up fast, and I am genuinely excited about writing real production code.",
];
