export function Footer() {
  return (
    <footer className="px-6 py-8" style={{ borderTop: '1px solid var(--border)' }}>
      <div
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 text-sm"
        style={{ color: 'var(--text-muted)' }}
      >
        <p>© 2026 Vitalii Fedunyk</p>
        <p>Built with React, TypeScript, and Vite</p>
      </div>
    </footer>
  );
}
