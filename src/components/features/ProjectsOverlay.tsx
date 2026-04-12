import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ARCHIVED_PROJECTS, PROJECTS } from '../../data/constants';
import {
  PREMIUM_EASE,
  PREMIUM_EXIT_EASE,
  PREMIUM_LAYOUT_TRANSITION,
} from '../../lib/motion';
import type { ProjectTrack } from '../../types/content.types';

type ProjectFilter = 'all' | ProjectTrack;

const PROJECT_FILTERS: Array<{ id: ProjectFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'web-apps', label: 'Web Apps' },
  { id: 'landing-pages', label: 'Landing Pages' },
  { id: 'team-projects', label: 'Team Projects' },
  { id: 'typescript', label: 'TypeScript' },
];

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

function getProjectLabel(
  project: (typeof PROJECTS)[number]
): 'Personal Project' | 'Course Project' | 'Team Course Project' | 'Refactored Course Project' {
  if (project.type === 'personal') return 'Personal Project';
  if (project.isTeamProject) return 'Team Course Project';
  if (project.isRefactored) return 'Refactored Course Project';
  return 'Course Project';
}

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
                        className="text-text-muted font-mono text-xs sm:text-sm px-3 py-1.5 border border-border rounded-sm"
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

        {ARCHIVED_PROJECTS.length > 0 ? (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="rounded-md border border-border/70 bg-bg-secondary/30 p-4 sm:p-5"
          >
            <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.08em] text-accent sm:text-xs">
              Earlier Course Projects
            </p>
            <p className="mb-4 max-w-[42rem] text-sm font-sans leading-relaxed text-text-secondary sm:text-[15px]">
              Older work with less emphasis in the main showcase, kept here for context.
            </p>

            <div className="space-y-4">
              {ARCHIVED_PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col gap-3 border-t border-border/60 pt-4 first:border-t-0 first:pt-0 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-serif font-light text-text-primary sm:text-lg">
                      {project.title}
                    </h3>
                    <p className="max-w-[36rem] text-sm font-sans leading-relaxed text-text-muted">
                      {project.note}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-border/80 px-3 py-1.5 text-xs font-mono text-text-muted transition-colors hover:border-accent hover:text-accent-hover sm:text-sm"
                      >
                        Live
                      </a>
                    ) : null}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-border/80 px-3 py-1.5 text-xs font-mono text-text-muted transition-colors hover:border-accent hover:text-accent-hover sm:text-sm"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  );
}
