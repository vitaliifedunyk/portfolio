import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import {
  Navbar,
  Hero,
  Footer,
  AboutOverlay,
  ProjectsOverlay,
} from './components';

const MouseGlow = lazy(() =>
  import('./components/common/MouseGlow').then((module) => ({
    default: module.MouseGlow,
  }))
);

function App() {
  const [isMouseGlowEnabled, setIsMouseGlowEnabled] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsMouseGlowEnabled(true);
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col overflow-x-hidden">
      <Suspense fallback={null}>
        {isMouseGlowEnabled && <MouseGlow paused={false} />}
      </Suspense>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <ScrollRevealSection id="about" title="About">
          <AboutOverlay />
        </ScrollRevealSection>
        <ScrollRevealSection id="projects" title="Projects">
          <ProjectsOverlay />
        </ScrollRevealSection>
        <Footer />
      </main>
    </div>
  );
}

function ScrollRevealSection({
  id,
  title,
  children,
}: {
  id: 'about' | 'projects';
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-6 py-14 md:py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="relative pb-4 mb-8 md:mb-10">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
          <h2
            className="text-2xl md:text-3xl font-serif font-light text-text-primary"
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

export default App;
