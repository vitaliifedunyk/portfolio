import {
  AboutOverlay,
  Footer,
  Hero,
  Navbar,
  ProjectsOverlay,
  Section,
} from './components';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
      data-theme={theme}
    >
      <Navbar />
      <main className="flex min-h-screen flex-col">
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
