import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-10 backdrop-blur"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        color: 'var(--text-secondary)',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span
          className="font-mono text-sm tracking-[0.24em]"
          style={{ color: 'var(--text-primary)' }}
        >
          VF
        </span>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#about" className="transition-opacity hover:opacity-100">
            About
          </a>
          <a href="#projects" className="transition-opacity hover:opacity-100">
            Projects
          </a>
          <a
            href="mailto:vitaliifedunyk.dev@gmail.com"
            className="transition-opacity hover:opacity-100"
          >
            Email
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
