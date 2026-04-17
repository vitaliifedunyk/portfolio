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
  resumeUrl: '/resume_ats.pdf',
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
      'Personal portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion to present selected work through a clearer structure and more deliberate visual system.',
    challenge:
      'The challenge was making the portfolio feel curated instead of template-like, while keeping the content structure simple to maintain.',
    solution:
      'I centralized the content in one data layer, refined the visual language, and reorganized the projects section to highlight stronger work without adding noise.',
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
      'Multi-section yacht rental landing page focused on polished UI, responsive layout, and cleaner interaction states. The project was later refined beyond the original course version.',
    challenge:
      'Navigation behavior was inconsistent on mobile because the header state and anchor scrolling could interfere with each other.',
    solution:
      'I adjusted anchor offsets, refined the header interaction logic, and made section navigation more predictable across screen sizes.',
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
      'Responsive landing page for an eco-friendly tote bag brand, built with semantic structure, adaptive sections, and cleaner visual styling. The project was later refactored after the course version.',
    challenge:
      'Spacing and typography were shifting too sharply between breakpoints, which made the layout feel uneven.',
    solution:
      'I reworked the spacing scale and aligned typography decisions across breakpoints to keep the layout rhythm more stable.',
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
    title: 'Furniture Store',
    description:
      'Team course project for a furniture store, built with JavaScript, responsive sections, API integration, and shared component work. "Bug Hunters" was our team name; the product itself was Mebleriia.',
    challenge:
      'The main challenge was keeping the UI, interactions, and code structure consistent while several contributors were building features in parallel.',
    solution:
      'We divided responsibilities clearly, aligned shared styles and UI patterns early, and coordinated merges carefully to keep the final interface consistent.',
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
      'Job application tracker built in vanilla JavaScript to add, update, and monitor application statuses with localStorage persistence and a straightforward interface.',
    challenge:
      'Status changes, edits, and deletions all needed to stay in sync without making the interface feel cluttered or unreliable.',
    solution:
      'I centralized the data-update flow and simplified rendering so every application change is reflected clearly and consistently.',
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
      'TypeScript-based GitHub repository explorer that queries the GitHub API in real time, displays key repository stats, and handles loading, empty, and error states clearly.',
    challenge:
      'The main challenge was making API-driven search feel reliable, especially during loading, failed requests, and empty-result cases.',
    solution:
      'I added explicit loading, empty, and error states so each search gives clear and predictable feedback.',
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
    liveUrl: 'https://vitaliifedunyk.github.io/web-studio/',
    githubUrl: 'https://github.com/vitaliifedunyk/web-studio',
  },
  {
    id: 2,
    title: 'EcoTote',
    note: 'Earlier team course version of EcoTote kept as supporting context; the refactored solo version is stronger, so this one stays outside the main showcase.',
    liveUrl: 'https://vitaliifedunyk.github.io/eco-tote-project/',
    githubUrl: 'https://github.com/vitaliifedunyk/eco-tote-project',
  },
];

/** Introductory paragraphs displayed in the About section */
export const ABOUT_PARAGRAPHS = [
  'I focus on frontend development and enjoy turning ideas into clear, responsive interfaces with React, TypeScript, and Tailwind CSS.',
  'Most of my projects started as practical exercises: a job application tracker, a GitHub repo explorer, and landing pages with attention to layout, responsiveness, and usability.',
  'I care about clean structure, consistent UI, and writing code that is easy to maintain and improve over time.',
];
