import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type ProjectTrack = 'html-css' | 'javascript' | 'tailwindcss';

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  tracks: ProjectTrack[];
};

type ProjectFilter = 'all' | ProjectTrack;

const projects: Project[] = [
  {
    id: 1,
    title: 'WebStudio',
    description:
      'Responsive marketing landing page focused on semantic HTML, adaptive layout, and clean CSS structure.',
    technologies: ['HTML/CSS'],
    liveUrl: 'https://vitaliifedunyk.github.io/goit-markup-hw-06/',
    githubUrl: 'https://github.com/vitaliifedunyk/goit-markup-hw-06',
    tracks: ['html-css'],
  },
  {
    id: 2,
    title: 'YachtJet',
    description:
      'Multi-section brand site built with reusable Tailwind patterns and polished responsive behavior.',
    technologies: ['Tailwind CSS'],
    liveUrl: 'https://vitaliifedunyk.github.io/yachtjet/',
    githubUrl: 'https://github.com/vitaliifedunyk/yachtjet',
    tracks: ['tailwindcss'],
  },
  {
    id: 3,
    title: 'JobFlow',
    description:
      'Vanilla JavaScript task manager with localStorage persistence, filtering, and edit/delete flows.',
    technologies: ['JavaScript'],
    liveUrl: 'https://vitaliifedunyk.github.io/jobflow/',
    githubUrl: 'https://github.com/vitaliifedunyk/jobflow',
    tracks: ['javascript'],
  },
  {
    id: 4,
    title: 'RepoFinder',
    description:
      'GitHub repository explorer with loading, empty, and error states for API-driven search.',
    technologies: ['JavaScript'],
    liveUrl: 'https://vitaliifedunyk.github.io/repofinder/',
    githubUrl: 'https://github.com/vitaliifedunyk/repofinder',
    tracks: ['javascript'],
  },
];

const filters: Array<{ id: ProjectFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'html-css', label: 'HTML/CSS' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'tailwindcss', label: 'Tailwind CSS' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function ProjectsOverlay() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects;
    }

    return projects.filter((project) => project.tracks.includes(activeFilter));
  }, [activeFilter]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-10"
    >
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
              activeFilter === filter.id
                ? ''
                : 'hover:opacity-100'
            }`}
            style={
              activeFilter === filter.id
                ? {
                    backgroundColor: 'var(--accent)',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent-contrast)',
                  }
                : {
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    opacity: 0.88,
                  }
            }
          >
            {filter.label}
          </button>
        ))}
      </motion.div>

      <div className="space-y-8">
        {filteredProjects.map((project) => (
          <motion.article
            key={project.id}
            variants={itemVariants}
            className="pb-8 last:pb-0"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3
                  className="text-2xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>
                <p
                  className="mt-3 max-w-3xl text-sm leading-7"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-contrast)',
                  }}
                >
                  Live
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Repo
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.12em]"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
