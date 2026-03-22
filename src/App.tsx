import {
  AboutOverlay,
  Footer,
  Hero,
  Navbar,
  ProjectsOverlay,
  Section,
} from './components';

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
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
