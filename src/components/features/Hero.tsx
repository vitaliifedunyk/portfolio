import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/constants';
import { useHashRoute } from '../../hooks/useHashRoute';
import type { OverlayRoute } from '../../types/overlay.types';

export function Hero() {
  const { openOverlay } = useHashRoute();

  const handleCtaClick = (href: string) => {
    sessionStorage.setItem('overlay-source', 'hero');
    const route = href.replace('#', '') as Exclude<OverlayRoute, null>;
    openOverlay(route);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-dvh flex items-center justify-center relative overflow-hidden py-12 sm:py-16 md:py-20"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary/50 pointer-events-none" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mx-auto px-6 text-center relative z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-text-primary mb-8 sm:mb-10 md:mb-12 tracking-tight leading-[1.1] whitespace-normal"
          style={{ fontFamily: 'var(--font-serif)', letterSpacing: '-0.03em' }}
        >
          {PERSONAL_INFO.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 font-sans whitespace-normal"
          style={{ letterSpacing: '0.01em' }}
        >
          {PERSONAL_INFO.role}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-text-muted text-sm sm:text-base md:text-lg mx-auto mb-10 sm:mb-12 md:mb-14 leading-relaxed font-sans"
          style={{ lineHeight: '1.75', maxWidth: '42rem', width: '100%', hyphens: 'none' }}
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={() => handleCtaClick('#projects')}
            className="w-40 px-5 py-2.5 text-sm font-mono text-bg-primary bg-accent hover:bg-accent-hover border border-accent hover:border-accent-hover rounded-sm transition-colors cursor-pointer"
          >
            View Projects
          </button>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="w-40 px-5 py-2.5 text-sm font-mono text-text-secondary hover:text-accent border border-border hover:border-accent rounded-sm transition-colors text-center"
          >
            Email Me
          </a>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-text-muted text-sm font-mono mt-5 break-all"
        >
          {PERSONAL_INFO.email}
        </motion.p>
      </motion.div>
    </section>
  );
}
