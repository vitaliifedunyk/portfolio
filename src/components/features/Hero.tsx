import { motion } from 'framer-motion';

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
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
      >
        <motion.p
          variants={itemVariants}
          className="mb-6 font-mono text-sm uppercase tracking-[0.24em] text-neutral-500"
        >
          Fullstack Developer
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="mb-8 text-5xl font-semibold tracking-tight text-white sm:text-7xl"
        >
          Vitalii Fedunyk
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg"
        >
          I build fast, clean web products from polished interfaces to reliable
          application logic.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="mailto:vitaliifedunyk.dev@gmail.com"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
          >
            Get in touch
          </a>
          <a
            href="https://github.com/vitaliifedunyk"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-white/40 hover:text-white"
          >
            View GitHub
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
