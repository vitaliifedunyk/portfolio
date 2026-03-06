import { motion } from 'framer-motion';
import {
  ABOUT_PARAGRAPHS,
  CORE_SKILLS,
  LEARNING_SKILLS,
  TOOLS_SKILLS,
} from '../../data/constants';
import { PREMIUM_EASE } from '../../lib/motion';

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
      ease: PREMIUM_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.24,
      ease: PREMIUM_EASE,
    },
  },
};

export function AboutOverlay() {
  return (
    <div className="mx-auto w-full max-w-[56rem] pt-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="grid items-start gap-12 md:grid-cols-2 md:gap-16"
      >
        <div className="w-full space-y-6">
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <motion.p
              key={paragraph}
              variants={itemVariants}
              className="w-full text-base font-sans leading-[1.7] text-text-secondary"
              style={{ hyphens: 'none' }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div variants={itemVariants} className="w-full space-y-10">
          <div className="space-y-3">
            <h3 className="text-text-primary text-sm font-mono tracking-wide uppercase">
              Core Skills
            </h3>
            <div className="flex w-full flex-wrap gap-3">
              {CORE_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="text-text-muted font-mono text-xs sm:text-sm px-3 py-1.5 border border-border/80 rounded-md hover:border-accent hover:text-accent-hover transition-colors duration-300"
                  style={{ letterSpacing: '0.02em' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-text-primary text-sm font-mono tracking-wide uppercase">
              Currently Learning
            </h3>
            <div className="flex w-full flex-wrap gap-3">
              {LEARNING_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="text-text-muted font-mono text-xs sm:text-sm px-3 py-1.5 border border-border/80 rounded-md hover:border-accent hover:text-accent-hover transition-colors duration-300"
                  style={{ letterSpacing: '0.02em' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-text-primary text-sm font-mono tracking-wide uppercase">
              Tools
            </h3>
            <div className="flex w-full flex-wrap gap-3">
              {TOOLS_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="text-text-muted font-mono text-xs sm:text-sm px-3 py-1.5 border border-border/80 rounded-md hover:border-accent hover:text-accent-hover transition-colors duration-300"
                  style={{ letterSpacing: '0.02em' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
