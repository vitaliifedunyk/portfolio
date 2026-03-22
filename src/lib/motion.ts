export const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;
export const PREMIUM_EXIT_EASE = [0.4, 0, 1, 1] as const;

export const PREMIUM_LAYOUT_TRANSITION = {
  layout: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 28,
    mass: 0.9,
  },
};
