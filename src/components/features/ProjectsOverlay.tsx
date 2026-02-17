import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS } from '../../data/constants';

type ProjectFilter = 'all' | 'html-css' | 'javascript' | 'react' | 'fullstack';

const PROJECT_FILTERS: Array<{ id: ProjectFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'html-css', label: 'HTML/CSS' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'react', label: 'React' },
  { id: 'fullstack', label: 'Full-Stack' },
];

const getFilterByTechnology = (technology: string): ProjectFilter => {
  const tech = technology.toLowerCase();

  if (tech.includes('react') || tech.includes('next')) return 'react';
  if (
    tech.includes('node') ||
    tech.includes('express') ||
    tech.includes('api') ||
    tech.includes('mongodb') ||
    tech.includes('postgres')
  ) {
    return 'fullstack';
  }
  if (tech.includes('javascript') || tech === 'js') return 'javascript';
  return 'html-css';
};

const matchesProjectFilter = (
  technologies: string[],
  filter: ProjectFilter
): boolean => {
  if (filter === 'all') return true;
  return technologies.some((tech) => getFilterByTechnology(tech) === filter);
};

export function ProjectsOverlay() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
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
        ease: easing,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.24,
        ease: easing,
      },
    },
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return PROJECTS;
    return PROJECTS.filter((project) =>
      matchesProjectFilter(project.technologies, activeFilter)
    );
  }, [activeFilter]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '56rem',
        margin: '0 auto',
        paddingTop: '2rem',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-12"
        style={{ width: '100%' }}
      >
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 md:gap-3">
          {PROJECT_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`text-xs sm:text-sm font-mono px-3 py-1.5 border rounded-md transition-colors ${
                activeFilter === filter.id
                  ? 'text-accent border-accent'
                  : 'text-text-muted border-border/80 hover:text-accent-hover hover:border-accent'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 && (
            <motion.p
              key="empty-projects"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-text-muted text-sm sm:text-base font-sans"
            >
              No projects in this category yet. More coming soon.
            </motion.p>
          )}

          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="group border-b border-border pb-12 last:border-b-0 last:pb-0"
              style={{ width: '100%' }}
            >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[11px] sm:text-xs font-mono text-text-muted border border-border/80 rounded-md px-2.5 py-1">
                {project.type === 'course'
                  ? project.isRefactored
                    ? 'Course Project (Refactored)'
                    : 'Course Project'
                  : 'Personal Project'}
              </span>
            </div>

            <div
              className="flex items-start justify-between gap-4 mb-4 md:mb-5"
              style={{ width: '100%' }}
            >
              <h3
                className="text-2xl sm:text-3xl md:text-[2rem] font-serif font-light text-text-primary flex-1"
                style={{
                  fontFamily: 'var(--font-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                {project.title}
              </h3>
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-mono text-text-muted border border-border/80 hover:text-accent-hover hover:border-accent rounded-md px-3 py-1.5 transition-colors"
                  aria-label="View live project"
                  whileHover={{ y: -1 }}
                >
                  Live Demo
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-mono text-text-muted border border-border/80 hover:text-accent-hover hover:border-accent rounded-md px-3 py-1.5 transition-colors"
                  aria-label="View GitHub repository"
                  whileHover={{ y: -1 }}
                >
                  Code
                </motion.a>
              </div>
            </div>
            <p
              className="text-text-secondary text-sm sm:text-[15px] font-sans mb-5 md:mb-6 leading-relaxed"
              style={{ lineHeight: '1.68', width: '100%', maxWidth: '48rem', hyphens: 'none' }}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {project.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  className={`text-text-muted font-mono text-xs sm:text-sm px-3 py-1.5 border rounded-sm transition-colors duration-300 cursor-pointer ${
                    activeFilter === getFilterByTechnology(tech)
                      ? 'border-accent text-accent'
                      : 'border-border hover:border-accent hover:text-accent-hover'
                  }`}
                  style={{ letterSpacing: '0.02em' }}
                  onClick={() => setActiveFilter(getFilterByTechnology(tech))}
                  whileHover={{ y: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
