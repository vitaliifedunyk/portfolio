import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS } from '../../data/constants';
import {
  PREMIUM_EASE,
  PREMIUM_EXIT_EASE,
  PREMIUM_LAYOUT_TRANSITION,
} from '../../lib/motion';
import type {
  ProjectCategory,
  ProjectFilter as ProjectFilterId,
} from '../../types/content.types';

type ActiveProjectFilter = 'all' | ProjectFilterId;

const PROJECT_FILTERS: Array<{ id: ActiveProjectFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'applications', label: 'Applications' },
  { id: 'landing-pages', label: 'Landing Pages' },
  { id: 'team-project', label: 'Team Project' },
];

const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  personal: 'Personal Project',
  team: 'Team Project',
};

// Stagger child animations when the project list enters.
const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

// Keep per-item transitions aligned with the list layout animation.
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: PREMIUM_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: {
      duration: 0.18,
      ease: PREMIUM_EXIT_EASE,
    },
  },
};

function getProjectLabel(project: (typeof PROJECTS)[number]): string {
  return PROJECT_CATEGORY_LABELS[project.category];
}

export function ProjectsOverlay() {
  const [activeFilter, setActiveFilter] = useState<ActiveProjectFilter>('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return PROJECTS;
    return PROJECTS.filter((project) => project.filters.includes(activeFilter));
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
              className={`cursor-pointer disabled:cursor-default text-xs sm:text-sm font-mono px-3 py-1.5 border rounded-md transition-colors ${
                activeFilter === filter.id
                  ? 'text-accent border-accent'
                  : 'text-text-muted border-border/80 hover:text-accent-hover hover:border-accent'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
          transition={PREMIUM_LAYOUT_TRANSITION}
        >
          <AnimatePresence initial={false} mode="sync">
            {filteredProjects.length === 0 ? (
              <motion.p
                key="empty-projects"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14, ease: PREMIUM_EASE }}
                className="text-text-muted text-sm sm:text-base font-sans"
              >
                No projects in this category yet. More coming soon.
              </motion.p>
            ) : (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={PREMIUM_LAYOUT_TRANSITION}
                  className="group border-b border-border pb-12 last:border-b-0 last:pb-0 will-change-transform"
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[11px] sm:text-xs font-mono text-text-muted border border-border/80 rounded-md px-2.5 py-1">
                      {getProjectLabel(project)}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-4 md:mb-5">
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
                      >
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-mono text-accent border border-accent hover:text-accent-hover hover:border-accent-hover hover:bg-bg-secondary/50 rounded-md px-3 py-1.5 transition-colors"
                      >
                        Repo
                      </a>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm sm:text-[15px] font-sans mb-5 md:mb-6 leading-relaxed max-w-[48rem]">
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
                        className="select-none text-text-muted font-mono text-xs sm:text-sm px-3 py-1.5 border border-border rounded-sm transition-colors duration-300 hover:border-accent hover:text-accent-hover"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
