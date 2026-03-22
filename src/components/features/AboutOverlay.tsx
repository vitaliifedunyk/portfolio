import { motion } from 'framer-motion';
import {
  ABOUT_PARAGRAPHS,
  CORE_SKILLS,
  LEARNING_SKILLS,
  TOOLS_SKILLS,
} from '../../data/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function SkillGroup({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-neutral-400">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full px-3 py-1.5 text-sm"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AboutOverlay() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="grid gap-10 md:grid-cols-2 md:gap-16"
    >
      <div className="space-y-5">
        {ABOUT_PARAGRAPHS.map((paragraph) => (
          <motion.p
            key={paragraph}
            variants={itemVariants}
            className="text-base leading-7"
            style={{ color: 'var(--text-secondary)' }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <motion.div variants={itemVariants} className="space-y-8">
        <SkillGroup title="Core Skills" items={CORE_SKILLS} />
        <SkillGroup title="Currently Learning" items={LEARNING_SKILLS} />
        <SkillGroup title="Tools" items={TOOLS_SKILLS} />
      </motion.div>
    </motion.div>
  );
}
