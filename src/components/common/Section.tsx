import type { ReactNode } from 'react';
import type { OverlayRoute } from '../../types/overlay.types';

interface SectionProps {
  id: Exclude<OverlayRoute, null>;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-28 px-6 py-14 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative mb-8 pb-4 md:mb-10">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
          <h2
            className="text-2xl font-serif font-light text-text-primary md:text-3xl"
            style={{
              fontFamily: 'var(--font-serif)',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
