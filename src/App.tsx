import { lazy, Suspense, useEffect, useState } from 'react';
import {
  Navbar,
  Hero,
  Footer,
  Section,
  AboutOverlay,
  ProjectsOverlay,
} from './components';
import { useTheme } from './hooks/useTheme';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

// Lazy-load the decorative glow effect so it does not compete with the first paint
const MouseGlow = lazy(() =>
  import('./components/common/MouseGlow').then((module) => ({
    default: module.MouseGlow,
  })),
);

function App() {
  const [isMouseGlowEnabled, setIsMouseGlowEnabled] = useState(false);
  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldRenderMouseGlow = theme === 'dark' && !prefersReducedMotion;

  // Delay MouseGlow initialization by 250ms to avoid blocking initial render
  // and prevent layout shift on page load
  useEffect(() => {
    if (!shouldRenderMouseGlow || isMouseGlowEnabled) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsMouseGlowEnabled(true);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [isMouseGlowEnabled, shouldRenderMouseGlow]);

  // Keep the sun accent outside <main> so it stays behind every section
  return (
    <div className="relative min-h-dvh bg-bg-primary flex flex-col overflow-x-hidden">
      <div
        className={`sun ${theme === 'light' ? 'sun-visible' : ''}`}
        aria-hidden="true"
      />
      <Suspense fallback={null}>
        {shouldRenderMouseGlow && isMouseGlowEnabled && (
          <MouseGlow paused={false} />
        )}
      </Suspense>
      <Navbar />
      <main className="relative z-20 flex-1 flex flex-col">
        <Hero />
        <Section id="about" title="About">
          <AboutOverlay />
        </Section>
        <Section id="projects" title="Projects">
          <ProjectsOverlay />
        </Section>
        <Footer />
      </main>
    </div>
  );
}

export default App;
