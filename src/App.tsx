import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Navbar,
  Hero,
  Footer,
  OverlayPage,
  AboutOverlay,
  ProjectsOverlay,
  ContactOverlay,
} from './components';
import { useHashRoute } from './hooks/useHashRoute';

const MouseGlow = lazy(() =>
  import('./components/common/MouseGlow').then((module) => ({
    default: module.MouseGlow,
  }))
);

function App() {
  const { activeOverlay, closeOverlay } = useHashRoute();

  const overlayConfig = {
    about: {
      title: 'About',
      component: <AboutOverlay />,
    },
    projects: {
      title: 'Projects',
      component: <ProjectsOverlay />,
    },
    contact: {
      title: 'Contact',
      component: <ContactOverlay />,
    },
  };

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col overflow-x-hidden">
      <Suspense fallback={null}>
        <MouseGlow paused={Boolean(activeOverlay)} />
      </Suspense>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Footer />
      </main>

      <AnimatePresence mode="wait">
        {activeOverlay && (
          <OverlayPage
            key={activeOverlay}
            title={overlayConfig[activeOverlay].title}
            onClose={closeOverlay}
          >
            {overlayConfig[activeOverlay].component}
          </OverlayPage>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
