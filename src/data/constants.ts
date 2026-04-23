import type {
  NavLink,
  PersonalInfo,
  Project,
  SocialLink,
} from '../types/content.types';

/**
 * Central source of truth for all portfolio content.
 * Update this file to change any text, links, or project data on the site.
 */

/** Primary identity shown in the Hero section */
export const PERSONAL_INFO: PersonalInfo = {
  name: 'Vitalii Fedunyk',
  role: 'Frontend Developer',
  tagline:
    'I build responsive interfaces and practical web applications using JavaScript, TypeScript, and React.',
  email: 'vitaliifedunyk.dev@gmail.com',
  resumeUrl: '/resume_ats.pdf',
};

/** Skills displayed in the "Frontend Stack" column of the About section */
export const FRONTEND_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Tailwind CSS',
  'HTML',
  'CSS',
  'Vite',
  'REST API',
];

/** Tools displayed in the "Tools" column of the About section */
export const TOOLS_SKILLS = [
  'Git',
  'GitHub',
  'Postman',
  'Figma',
  'npm',
  'VS Code',
];

/** Section links rendered in the main navigation */
export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
];

/** External profile links shown in the footer */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/vitaliifedunyk',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vitaliifedunyk/',
    icon: 'linkedin',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/fdyfck',
    icon: 'telegram',
  },
];

/** Featured projects displayed in the main Projects section */
export const PROJECTS: Project[] = [
  {
    id: 6,
    title: 'RepoFinder',
    description:
      'GitHub user and repository search application built with TypeScript and Tailwind CSS. Uses the GitHub REST API with search, pagination, and clear handling of loading and error states.',
    challenge:
      'Managing API-driven UI states (loading, errors, empty results) in a predictable way.',
    solution:
      'Implemented structured state handling and clear UI feedback for each state to keep interactions consistent.',
    technologies: ['TypeScript', 'Tailwind CSS', 'Vite', 'REST API'],
    liveUrl: 'https://repofinder.vercel.app/',
    githubUrl: 'https://github.com/vitaliifedunyk/repofinder',
    category: 'personal',
    filters: ['applications'],
  },
  {
    id: 5,
    title: 'JobFlow',
    description:
      'Job application tracker built with JavaScript and Tailwind CSS. Supports CRUD operations, filtering, sorting, and persistent data using localStorage.',
    challenge:
      'Keeping UI predictable while managing dynamic data updates and user actions.',
    solution:
      'Structured data flow and simplified rendering logic to ensure consistent UI behavior.',
    technologies: ['JavaScript', 'Tailwind CSS', 'Vite', 'LocalStorage'],
    liveUrl: 'https://jobflow-crud.vercel.app/',
    githubUrl: 'https://github.com/vitaliifedunyk/jobflow',
    category: 'personal',
    filters: ['applications'],
  },
  {
    id: 4,
    title: 'Furniture Store',
    description:
      'Team-based furniture store frontend with responsive UI and REST API integration. Includes product listing, filtering, and dynamic data rendering.',
    challenge:
      'Maintaining UI consistency and structure across multiple contributors.',
    solution:
      'Coordinated development workflow, defined shared UI patterns, and ensured consistency across the codebase.',
    technologies: ['JavaScript', 'Vite', 'REST API', 'CSS'],
    liveUrl: 'https://vitaliifedunyk.github.io/bug-hunters/',
    githubUrl: 'https://github.com/vitaliifedunyk/bug-hunters',
    category: 'team',
    filters: ['team-project'],
  },
  {
    id: 1,
    title: 'Portfolio',
    description:
      'Personal portfolio website built with React, TypeScript, and Tailwind CSS. Designed to present projects and skills through a clean, responsive interface with animated UI.',
    challenge:
      'Creating a portfolio that feels structured and focused without unnecessary complexity.',
    solution:
      'Organized content into clear sections and improved visual hierarchy to highlight key information.',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Vite',
    ],
    liveUrl: 'https://vitaliifedunyk.vercel.app/',
    githubUrl: 'https://github.com/vitaliifedunyk/portfolio',
    category: 'personal',
    filters: ['applications'],
  },
  {
    id: 2,
    title: 'YachtJet',
    description:
      'Responsive landing page built with Tailwind CSS, focused on layout structure and UI consistency. Includes adaptive design across different screen sizes.',
    challenge: 'Maintaining consistent layout and spacing across breakpoints.',
    solution:
      'Refined responsive behavior and spacing system using Tailwind utilities.',
    technologies: ['JavaScript', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://vitaliifedunyk.github.io/yachtjet/',
    githubUrl: 'https://github.com/vitaliifedunyk/yachtjet',
    category: 'personal',
    filters: ['landing-pages'],
  },
  {
    id: 3,
    title: 'EcoTote',
    description:
      'Responsive landing page for an eco-focused brand built with Tailwind CSS. Focused on clean layout, typography, and adaptive design.',
    challenge: 'Keeping visual consistency across different screen sizes.',
    solution:
      'Improved layout structure, spacing system, and typography scaling.',
    technologies: ['JavaScript', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://vitaliifedunyk.github.io/eco-tote/',
    githubUrl: 'https://github.com/vitaliifedunyk/eco-tote',
    category: 'personal',
    filters: ['landing-pages'],
  },
];

/** Introductory paragraphs displayed in the About section */
export const ABOUT_PARAGRAPHS = [
  'Frontend developer focused on building responsive interfaces and practical web applications.',
  'I work with JavaScript, TypeScript, React, and Tailwind CSS, with experience in API integration and UI development.',
  'I focus on clear structure, predictable UI behavior, and maintainable frontend code.',
];
