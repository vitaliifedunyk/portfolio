import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ABOUT_TEXT, SKILLS } from '../../data/constants';

export function About() {
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // Flatten all skills into a single array
  const allSkills = SKILLS.flatMap((group) => group.items);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="space-section opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-12 md:gap-20 lg:gap-24 items-start"
        >
          {/* Left: About text */}
          <div className="space-y-6 md:space-y-8">
            {ABOUT_TEXT.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={index}
                variants={itemVariants}
                className="text-text-secondary leading-relaxed text-sm sm:text-base font-sans"
                style={{ lineHeight: '1.75' }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Right: Skills */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {allSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  custom={index}
                  className="text-text-muted font-mono text-xs sm:text-sm px-3 py-1.5 border border-border rounded-sm hover:border-accent hover:text-accent-hover transition-colors hover-accent"
                  style={{ letterSpacing: '0.02em' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
