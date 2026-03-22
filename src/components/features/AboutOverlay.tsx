import { motion } from 'framer-motion';

const aboutParagraphs = [
  'I started with HTML and CSS, then moved into JavaScript, React, and TypeScript by building interfaces that had to feel solid on real screens.',
  'Most of my progress came from shipping small but complete projects, then revisiting them to improve structure, responsiveness, and overall polish.',
];

const coreSkills = [
  'HTML5 & CSS3',
  'JavaScript',
  'TypeScript',
  'React',
  'Tailwind CSS',
  'Vite',
];

const learningSkills = ['Next.js', 'Node.js', 'Express', 'Docker'];
const tools = ['Git & GitHub', 'VS Code', 'Figma', 'Postman'];

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
            className="rounded-full border border-white/12 px-3 py-1.5 text-sm text-neutral-300"
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
        {aboutParagraphs.map((paragraph) => (
          <motion.p
            key={paragraph}
            variants={itemVariants}
            className="text-base leading-7 text-neutral-300"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <motion.div variants={itemVariants} className="space-y-8">
        <SkillGroup title="Core Skills" items={coreSkills} />
        <SkillGroup title="Currently Learning" items={learningSkills} />
        <SkillGroup title="Tools" items={tools} />
      </motion.div>
    </motion.div>
  );
}
