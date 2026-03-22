import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS } from '../../data/constants';
import {
  PREMIUM_EASE,
  PREMIUM_EXIT_EASE,
  PREMIUM_LAYOUT_TRANSITION,
} from '../../lib/motion';
import type { ProjectTrack } from '../../types/content.types';

type ProjectFilter = 'all' | ProjectTrack;

const PROJECT_FILTERS: Array<{ id: ProjectFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'html-css', label: 'HTML/CSS' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'tailwindcss', label: 'Tailwind CSS' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.045,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 18,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.46,
      ease: PREMIUM_EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 10,
    filter: 'blur(8px)',
    transition: {
      duration: 0.28,
      ease: PREMIUM_EXIT_EASE,
    },
  },
};

export function ProjectsOverlay() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return PROJECTS;
    return PROJECTS.filter((project) => project.tracks.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="mx-auto w-full max-w-[56rem] pt-8">
      <motion.div className="w-full space-y-12">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {PROJECT_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              disabled={activeFilter === filter.id}
              className={`text-xs sm:text-sm font-mono px-3 py-1.5 border rounded-md transition-colors ${
                activeFilter === filter.id
                  ? 'text-accent border-accent'
                  : 'text-text-muted border-border/80 hover:text-accent-hover hover:border-accent'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <AnimatePresence initial={false} mode="popLayout">
          {filteredProjects.length === 0 && (
            <motion.p
              key="empty-projects"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.28, ease: PREMIUM_EASE }}
              className="text-text-muted text-sm sm:text-base font-sans"
            >
              No projects in this category yet. More coming soon.
            </motion.p>
          )}

          {filteredProjects.length > 0 && (
            <motion.div
              key={activeFilter}
              layout
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-12"
              transition={PREMIUM_LAYOUT_TRANSITION}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  transition={PREMIUM_LAYOUT_TRANSITION}
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
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-mono text-bg-primary bg-accent border border-accent hover:bg-accent-hover hover:border-accent-hover rounded-md px-3 py-1.5 transition-colors"
                        aria-label="View live project"
                      >
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-mono text-accent border border-accent hover:text-accent-hover hover:border-accent-hover hover:bg-bg-secondary/50 rounded-md px-3 py-1.5 transition-colors"
                        aria-label="View GitHub repository"
                      >
                        Repo
                      </a>
                    </div>
                  </div>
                  <p
                    className="text-text-secondary text-sm sm:text-[15px] font-sans mb-5 md:mb-6 leading-relaxed"
                    style={{
                      lineHeight: '1.68',
                      width: '100%',
                      maxWidth: '48rem',
                      hyphens: 'none',
                    }}
                  >
                    {project.description}
                  </p>
                  <div className="mb-5 md:mb-6 rounded-md border border-border/70 bg-bg-secondary/40 p-3 sm:p-4 text-left">
                    <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.08em] text-accent mb-2">
                      Challenge
                    </p>
                    <p className="text-text-secondary text-sm sm:text-[15px] font-sans leading-relaxed mb-3">
                      {project.challenge}
                    </p>
                    <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.08em] text-accent mb-2">
                      Fix
                    </p>
                    <p className="text-text-secondary text-sm sm:text-[15px] font-sans leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-text-muted font-mono text-xs sm:text-sm px-3 py-1.5 border border-border rounded-sm"
                        style={{ letterSpacing: '0.02em' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
