import { Footer, Hero, Navbar } from './components';

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <Footer />
      </main>
    </div>
  );
}

export default App;
