import type {
  ArchivedProject,
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
    'I build responsive interfaces and practical web apps with JavaScript, TypeScript, Tailwind CSS, and React.',
  email: 'vitaliifedunyk.dev@gmail.com',
  resumeUrl: '#',
};

/** Skills displayed in the "Core" column of the About section */
export const CORE_SKILLS = [
  'HTML5',
  'CSS3',
  'JavaScript (ES6+)',
  'Tailwind CSS',
  'Vite',
  'Responsive Design',
];

/** Skills displayed in the "Currently Learning" column of the About section */
export const LEARNING_SKILLS = [
  'TypeScript',
  'React',
  'REST API Integration',
  'LocalStorage',
  'Vitest',
  'Axios',
];

/** Tools displayed in the "Tools" column of the About section */
export const TOOLS_SKILLS = [
  'Git & GitHub',
  'Postman',
  'Figma',
  'npm',
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
    id: 1,
    title: 'Portfolio',
    description:
      'Personal portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion to present selected work in a cleaner, more intentional way.',
    challenge:
      'The main challenge was turning a simple portfolio into something that feels curated rather than generic, while keeping the content easy to update.',
    solution:
      'I centralized the content, refined the visual system, and restructured the projects section to highlight stronger work without adding clutter.',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Theme Toggle',
    ],
    liveUrl: 'https://vitaliifedunyk.vercel.app/',
    githubUrl: 'https://github.com/vitaliifedunyk/portfolio',
    type: 'personal',
    tracks: ['web-apps', 'typescript'],
  },
  {
    id: 2,
    title: 'YachtJet',
    description:
      'Multi-section yacht rental website focused on polished UI and responsive behavior. Built with reusable layout patterns and interactive states, then refined after initial course version.',
    challenge:
      'The header and navigation interactions conflicted with section anchors on mobile devices.',
    solution:
      'Refined anchor offsets and interaction states to make navigation predictable and avoid overlap issues.',
    technologies: [
      'Tailwind CSS',
      'Responsive Layout',
      'Vite',
      'Form Validation',
      'Landing Page',
    ],
    liveUrl: 'https://vitaliifedunyk.github.io/yachtjet/',
    githubUrl: 'https://github.com/vitaliifedunyk/yachtjet',
    type: 'course',
    isRefactored: true,
    tracks: ['landing-pages'],
  },
  {
    id: 3,
    title: 'EcoTote',
    description:
      'Responsive landing page for an eco-friendly tote bag brand. Implemented semantic layout, adaptive sections, and clean component styling. Later refactored and improved after course submission.',
    challenge:
      'Maintaining consistent spacing and typography across breakpoints caused noticeable visual jumps.',
    solution:
      'Reworked the spacing scale and unified typography tokens to keep layout rhythm stable on all screen sizes.',
    technologies: [
      'Tailwind CSS',
      'Responsive Layout',
      'Vite',
      'Refactor',
      'Landing Page',
    ],
    liveUrl: 'https://vitaliifedunyk.github.io/eco-tote/',
    githubUrl: 'https://github.com/vitaliifedunyk/eco-tote',
    type: 'course',
    isRefactored: true,
    tracks: ['landing-pages'],
  },
  {
    id: 4,
    title: 'Bug Hunters',
    description:
      'Team course project built with JavaScript, featuring a responsive multi-section interface, shared components, and collaborative Git workflow across the whole team.',
    challenge:
      'The main difficulty was keeping layout, interactions, and code structure consistent while several contributors were working in parallel.',
    solution:
      'We split responsibilities clearly, aligned shared styles and component behavior early, and used Git coordination to merge features without breaking the overall UI.',
    technologies: ['JavaScript', 'REST API', 'Axios', 'Swiper', 'Team Project'],
    liveUrl: 'https://vitaliifedunyk.github.io/bug-hunters/',
    githubUrl: 'https://github.com/vitaliifedunyk/bug-hunters',
    type: 'course',
    isTeamProject: true,
    tracks: ['team-projects'],
  },
  {
    id: 5,
    title: 'JobFlow',
    description:
      'Job application tracker built in vanilla JS to add, update, and monitor application statuses with localStorage persistence and a straightforward UI.',
    challenge:
      'Status updates, edits, and removals had to stay in sync without making the interface feel messy or unreliable.',
    solution:
      'I centralized state updates and simplified the rendering flow so every application change is reflected clearly and consistently.',
    technologies: [
      'JavaScript',
      'CRUD',
      'LocalStorage',
      'Search / Filter / Sort',
      'Form Validation',
    ],
    liveUrl: 'https://jobflow-crud.vercel.app/',
    githubUrl: 'https://github.com/vitaliifedunyk/jobflow',
    type: 'personal',
    tracks: ['web-apps'],
  },
  {
    id: 6,
    title: 'RepoFinder',
    description:
      'TypeScript-based GitHub repository explorer that queries the GitHub API in real time, shows key stats, and handles loading, empty, and error states clearly.',
    challenge:
      'API requests needed clearer loading and error handling, especially when no repositories were found.',
    solution:
      'Added explicit loading, empty, and error states to keep feedback predictable during every search.',
    technologies: [
      'TypeScript',
      'REST API',
      'GitHub API',
      'Tailwind CSS',
      'Vitest',
    ],
    liveUrl: 'https://repofinder.vercel.app/',
    githubUrl: 'https://github.com/vitaliifedunyk/repofinder',
    type: 'personal',
    tracks: ['web-apps', 'typescript'],
  },
];

/** Earlier course projects shown with reduced emphasis below the main grid */
export const ARCHIVED_PROJECTS: ArchivedProject[] = [
  {
    id: 1,
    title: 'WebStudio',
    note: 'Early course project focused on pixel-accurate HTML/CSS implementation and responsive fundamentals.',
    liveUrl: 'https://vitaliifedunyk.github.io/goit-markup-hw-06/',
    githubUrl: 'https://github.com/vitaliifedunyk/goit-markup-hw-06',
  },
  {
    id: 2,
    title: 'EcoTote',
    note: 'Earlier team course version of EcoTote kept as GitHub-only context; the refactored solo version is stronger, so this one stays outside the main showcase.',
    githubUrl: 'https://github.com/vitaliifedunyk/project-group3',
  },
];

/** Introductory paragraphs displayed in the About section */
export const ABOUT_PARAGRAPHS = [
  'I focus on frontend development and enjoy turning ideas into clear, responsive interfaces with React, TypeScript, and Tailwind CSS.',
  'Most of my projects started as practical exercises: a job application tracker, a GitHub repo explorer, and landing pages with attention to layout, responsiveness, and usability.',
  'I care about clean structure, consistent UI, and writing code that is easy to maintain and improve over time.',
];
