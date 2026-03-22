import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, PERSONAL_INFO } from '../../data/constants';
import type { OverlayRoute } from '../../types/overlay.types';
import { useHashRoute } from '../../hooks/useHashRoute';
import { ThemeToggle } from './ThemeToggle';

function getRouteFromHref(href: string): Exclude<OverlayRoute, null> {
  return href.replace('#', '') as Exclude<OverlayRoute, null>;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<OverlayRoute>(null);
  const lastSyncedSectionRef = useRef<string | null>(null);
  const { openOverlay } = useHashRoute();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const trackedSectionIds = ['hero', ...NAV_LINKS.map((link) => getRouteFromHref(link.href))];
    const sections = trackedSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    const visibilityBySection = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityBySection.set(entry.target.id, entry.intersectionRatio);
        });

        let highestRatio = 0;
        let currentTrackedSection: string | null = null;

        for (const id of trackedSectionIds) {
          const ratio = visibilityBySection.get(id) ?? 0;
          if (ratio > highestRatio) {
            highestRatio = ratio;
            currentTrackedSection = id;
          }
        }

        const nextActiveSection =
          currentTrackedSection && currentTrackedSection !== 'hero'
            ? (currentTrackedSection as Exclude<OverlayRoute, null>)
            : null;

        setActiveSection(highestRatio > 0 ? nextActiveSection : null);

        if (highestRatio <= 0 || currentTrackedSection === null) {
          return;
        }

        if (lastSyncedSectionRef.current === currentTrackedSection) {
          return;
        }

        lastSyncedSectionRef.current = currentTrackedSection;

        const currentHash = window.location.hash.replace('#', '');
        if (currentTrackedSection === 'hero') {
          if (currentHash) {
            history.replaceState(
              null,
              '',
              `${window.location.pathname}${window.location.search}`
            );
          }
          return;
        }

        if (currentHash !== currentTrackedSection) {
          history.replaceState(
            null,
            '',
            `${window.location.pathname}${window.location.search}#${currentTrackedSection}`
          );
        }
      },
      {
        rootMargin: '-42% 0px -42% 0px',
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    openOverlay(getRouteFromHref(href));
  };

  const isActive = (href: string) => activeSection === getRouteFromHref(href);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 backdrop-blur transition-shadow"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        boxShadow: isScrolled ? '0 10px 24px rgba(0, 0, 0, 0.18)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <button
          onClick={() => {
            if (window.location.hash) {
              history.pushState(
                null,
                '',
                `${window.location.pathname}${window.location.search}`
              );
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-mono text-sm tracking-[0.24em]"
          style={{ color: 'var(--text-primary)' }}
        >
          VF
        </button>
        <nav className="flex items-center gap-5 text-sm">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="transition-opacity hover:opacity-100"
              style={{
                color: isActive(link.href)
                  ? 'var(--text-primary)'
                  : 'var(--text-secondary)',
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
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
