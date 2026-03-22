import { AboutOverlay, Footer, Hero, Navbar, Section } from './components';

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <Section id="about" title="About">
          <AboutOverlay />
        </Section>
        <Footer />
      </main>
    </div>
  );
}

export default App;
