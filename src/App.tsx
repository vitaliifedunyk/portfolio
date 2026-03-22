import { lazy, Suspense, useEffect, useState } from 'react';
import {
  AboutOverlay,
  Footer,
  Hero,
  Navbar,
  ProjectsOverlay,
  Section,
} from './components';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useTheme } from './hooks/useTheme';

const MouseGlow = lazy(() =>
  import('./components/common/MouseGlow').then((module) => ({
    default: module.MouseGlow,
  }))
);

function App() {
  const [isMouseGlowEnabled, setIsMouseGlowEnabled] = useState(false);
  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldRenderMouseGlow = theme === 'dark' && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldRenderMouseGlow || isMouseGlowEnabled) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsMouseGlowEnabled(true);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [isMouseGlowEnabled, shouldRenderMouseGlow]);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
      data-theme={theme}
    >
      <Suspense fallback={null}>
        {shouldRenderMouseGlow && isMouseGlowEnabled && (
          <MouseGlow paused={false} />
        )}
      </Suspense>
      <Navbar />
      <main className="relative z-20 flex min-h-screen flex-col">
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
