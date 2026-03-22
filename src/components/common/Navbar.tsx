export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="font-mono text-sm tracking-[0.24em] text-neutral-300">
          VF
        </span>
        <a
          href="mailto:vitaliifedunyk.dev@gmail.com"
          className="text-sm text-neutral-300 transition-colors hover:text-white"
        >
          Email
        </a>
      </div>
    </header>
  );
}
