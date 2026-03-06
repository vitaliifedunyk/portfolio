import type {
  NavLink,
  PersonalInfo,
  Project,
  SocialLink,
} from '../types/content.types';

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Vitalii Fedunyk',
  role: 'Trainee Fullstack Developer',
  tagline:
    'I build responsive web interfaces with React, TypeScript, and clean UI architecture.',
  email: 'vitalik.fedunyk@gmail.com',
  resumeUrl: '#',
};

export const CORE_SKILLS = [
  'HTML5',
  'CSS3',
  'JavaScript (ES6+)',
  'Tailwind CSS',
  'Vite',
];

export const LEARNING_SKILLS = [
  'TypeScript (for React)',
  'React',
  'Next.js',
  'Node.js',
];

export const TOOLS_SKILLS = [
  'Git',
  'GitHub',
  'VS Code',
  'Cursor',
  'Figma',
  'npm',
  'Prettier',
];

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
];

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

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'WebStudio',
    description:
      'Final course landing page for a web design studio. Focused on pixel-accurate implementation, responsive breakpoints, and solid HTML/CSS fundamentals.',
    challenge:
      'Pixel-accurate implementation was difficult because of mixed fixed/relative dimensions in the initial layout.',
    solution:
      'Converted critical blocks to flexible units and aligned breakpoints, which improved visual consistency.',
    technologies: ['HTML/CSS'],
    liveUrl: 'https://vitaliifedunyk.github.io/goit-markup-hw-06/',
    githubUrl: 'https://github.com/vitaliifedunyk/goit-markup-hw-06',
    type: 'course',
    tracks: ['html-css'],
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
    technologies: ['Tailwind CSS'],
    liveUrl: 'https://vitaliifedunyk.github.io/yachtjet/',
    githubUrl: 'https://github.com/vitaliifedunyk/yachtjet',
    type: 'course',
    isRefactored: true,
    tracks: ['tailwindcss'],
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
    technologies: ['Tailwind CSS'],
    liveUrl: 'https://vitaliifedunyk.github.io/eco-tote/',
    githubUrl: 'https://github.com/vitaliifedunyk/eco-tote',
    type: 'course',
    isRefactored: true,
    tracks: ['tailwindcss'],
  },
  {
    id: 4,
    title: 'JobFlow',
    description:
      'Task-management app focused on a clear workflow: add tasks, track progress, and keep the interface simple and fast.',
    challenge:
      'Keeping task state in sync after creating, editing, and deleting items was causing small UI glitches.',
    solution:
      'Centralized the state update logic and added straightforward input checks, so task updates now stay consistent.',
    technologies: ['JavaScript'],
    liveUrl: 'https://vitaliifedunyk.github.io/jobflow/',
    githubUrl: 'https://github.com/vitaliifedunyk/jobflow',
    type: 'personal',
    tracks: ['javascript'],
  },
  {
    id: 5,
    title: 'RepoFinder',
    description:
      'GitHub repository search app that helps quickly find repos and view key details in a clean, readable layout.',
    challenge:
      'API requests needed clearer loading and error handling, especially when no repositories were found.',
    solution:
      'Added explicit loading, empty, and error states to keep feedback predictable during every search.',
    technologies: ['JavaScript'],
    liveUrl: 'https://vitaliifedunyk.github.io/repofinder/',
    githubUrl: 'https://github.com/vitaliifedunyk/repofinder',
    type: 'personal',
    tracks: ['javascript'],
  },
];

export const ABOUT_PARAGRAPHS = [
  'I am a trainee fullstack developer focused on building responsive and user-friendly interfaces with clean HTML, CSS, and JavaScript.',
  'Right now I work with Vite and Tailwind CSS in my projects, and I am actively growing toward React development.',
  'My next learning path is TypeScript for React, then React, Next.js, and Node.js.',
  'I am open to trainee fullstack opportunities and internships.',
];
