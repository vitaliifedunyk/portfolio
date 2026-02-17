import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/constants';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="space-section opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            variants={itemVariants}
            className="relative mb-8 md:mb-12"
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-text-primary"
              style={{
                fontFamily: 'var(--font-serif)',
                letterSpacing: '-0.02em',
              }}
            >
              Get in touch
            </motion.h2>
            {/* Gradient divider line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
          </motion.div>
          <motion.a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-text-secondary hover:text-accent-hover transition-colors text-base sm:text-lg md:text-xl font-sans hover-accent inline-block"
            style={{ letterSpacing: '0.01em' }}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {PERSONAL_INFO.email}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
