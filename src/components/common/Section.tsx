import type { OverlayRoute } from '../../types/overlay.types';
import type { ReactNode } from 'react';

interface SectionProps {
  id: Exclude<OverlayRoute, null>;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="px-6 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <h2
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
