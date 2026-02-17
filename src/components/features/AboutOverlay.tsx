import { motion } from 'framer-motion';
import {
  ABOUT_TEXT,
  CORE_SKILLS,
  LEARNING_SKILLS,
  TOOLS_SKILLS,
} from '../../data/constants';

export function AboutOverlay() {
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
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
          gap: '3rem',
        }}
        className="md:grid-cols-2 md:gap-16 items-start"
      >
        <div style={{ width: '100%' }} className="space-y-6">
          {ABOUT_TEXT.split('\n\n').map((paragraph, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              className="text-text-secondary leading-relaxed text-base font-sans"
              style={{ lineHeight: '1.7', width: '100%', hyphens: 'none' }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          style={{ width: '100%' }}
          className="space-y-10"
        >
          <div className="space-y-3">
            <h3 className="text-text-primary text-sm font-mono tracking-wide uppercase">
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-3" style={{ width: '100%' }}>
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
            <div className="flex flex-wrap gap-3" style={{ width: '100%' }}>
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
            <div className="flex flex-wrap gap-3" style={{ width: '100%' }}>
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
