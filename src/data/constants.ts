export const PERSONAL_INFO = {
  name: 'Vitalii Fedunyk',
  role: 'Junior Fullstack Developer',
  tagline:
    'I build responsive web interfaces with React, TypeScript, and clean UI architecture.',
  email: 'vitalik.fedunyk@gmail.com',
  location: 'Italy',
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

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
];

export const SOCIAL_LINKS = [
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

export const SKILLS = [
  {
    category: 'Frontend',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Responsive Design',
    ],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'RESTful APIs', 'Express.js'],
  },
  {
    category: 'Tools & Other',
    items: [
      'Git & GitHub',
      'VS Code',
      'Vite',
      'npm/pnpm/yarn',
      'Figma',
      'Netlify',
      'Webpack',
    ],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'EcoTote',
    description:
      'Responsive landing page for an eco-friendly tote bag brand. Implemented semantic layout, adaptive sections, and clean component styling. Later refactored and improved after course submission.',
    challenge:
      'Maintaining consistent spacing and typography across breakpoints caused noticeable visual jumps.',
    solution:
      'Reworked the spacing scale and unified typography tokens to keep layout rhythm stable on all screen sizes.',
    technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript'],
    imageUrl:
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=400&fit=crop',
    liveUrl: 'https://vitaliifedunyk.github.io/eco-tote/',
    githubUrl: 'https://github.com/vitaliifedunyk/eco-tote',
    type: 'course',
    isRefactored: true,
    tracks: ['html-css', 'javascript'],
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
    technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript'],
    imageUrl:
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&h=400&fit=crop',
    liveUrl: 'https://vitaliifedunyk.github.io/yachtjet/',
    githubUrl: 'https://github.com/vitaliifedunyk/yachtjet',
    type: 'course',
    isRefactored: true,
    tracks: ['html-css', 'javascript'],
  },
  {
    id: 3,
    title: 'WebStudio',
    description:
      'Final course landing page for a web design studio. Focused on pixel-accurate implementation, responsive breakpoints, and solid HTML/CSS fundamentals.',
    challenge:
      'Pixel-accurate implementation was difficult because of mixed fixed/relative dimensions in the initial layout.',
    solution:
      'Converted critical blocks to flexible units and aligned breakpoints, which improved visual consistency.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    liveUrl: 'https://vitaliifedunyk.github.io/goit-markup-hw-06/',
    githubUrl: 'https://github.com/vitaliifedunyk/goit-markup-hw-06',
    type: 'course',
    tracks: ['html-css', 'javascript'],
  },
];

export const ABOUT_TEXT = `I am a junior frontend developer focused on building responsive and user-friendly interfaces with clean HTML, CSS, and JavaScript.

Right now I work with Vite and Tailwind CSS in my projects, and I am actively growing toward React development.

My next learning path is TypeScript for React, then React, Next.js, and Node.js.

I am open to junior frontend opportunities and internships.`;
