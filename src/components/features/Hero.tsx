import { motion } from 'framer-motion';
import { useHashRoute } from '../../hooks/useHashRoute';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Hero() {
  const { openOverlay } = useHashRoute();

  return (
    <section
      id="hero"
      className="flex min-h-screen items-center justify-center px-6 py-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
      >
        <motion.p
          variants={itemVariants}
          className="mb-6 font-mono text-sm uppercase tracking-[0.24em]"
          style={{ color: 'var(--text-muted)' }}
        >
          Fullstack Developer
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="mb-8 text-5xl font-semibold tracking-tight sm:text-7xl"
          style={{ color: 'var(--text-primary)' }}
        >
          Vitalii Fedunyk
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-2xl text-base leading-7 sm:text-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          I build fast, clean web products from polished interfaces to reliable
          application logic.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <button
            onClick={() => openOverlay('projects')}
            className="rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-contrast)',
            }}
          >
            View Projects
          </button>
          <a
            href="mailto:vitaliifedunyk.dev@gmail.com"
            className="rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-100"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            Email Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
