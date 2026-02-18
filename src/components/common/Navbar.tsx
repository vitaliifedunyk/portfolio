import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS, PERSONAL_INFO } from '../../data/constants';
import { ThemeToggle } from './ThemeToggle';
import { useHashRoute } from '../../hooks/useHashRoute';
import type { OverlayRoute } from '../../types/overlay.types';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<OverlayRoute>(null);
  const lastSyncedSectionRef = useRef<string | null>(null);
  const { openOverlay } = useHashRoute();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(
      (link) => link.href.replace('#', '') as Exclude<OverlayRoute, null>
    );
    const trackedSectionIds = ['hero', ...sectionIds];
    const sections = trackedSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const visibilityBySection = new Map<string, number>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visibilityBySection.set(entry.target.id, entry.intersectionRatio);
      });

      let current: OverlayRoute = null;
      let highestRatio = 0;
      let currentTrackedSection: string | null = null;

      for (const id of trackedSectionIds) {
        const ratio = visibilityBySection.get(id) ?? 0;
        if (ratio > highestRatio) {
          highestRatio = ratio;
          currentTrackedSection = id;
        }
      }

      current =
        currentTrackedSection && currentTrackedSection !== 'hero'
          ? (currentTrackedSection as Exclude<OverlayRoute, null>)
          : null;
      setActiveSection(highestRatio > 0 ? current : null);

      if (highestRatio <= 0 || currentTrackedSection === null) return;
      if (lastSyncedSectionRef.current === currentTrackedSection) return;
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
    }, {
      rootMargin: '-42% 0px -42% 0px',
      threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
    });

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    sessionStorage.setItem('overlay-source', 'nav');
    const route = href.replace('#', '') as Exclude<OverlayRoute, null>;
    openOverlay(route);
    setIsMobileMenuOpen(false);
  };

  const hasResume = PERSONAL_INFO.resumeUrl && PERSONAL_INFO.resumeUrl !== '#';

  const handleResumeClick = () => {
    if (!hasResume) return;
    window.open(PERSONAL_INFO.resumeUrl, '_blank', 'noopener,noreferrer');
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    const route = href.replace('#', '') as Exclude<OverlayRoute, null>;
    return activeSection === route;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-bg-secondary/90 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-6 relative">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => {
              sessionStorage.setItem('overlay-source', 'direct');
              // Clear hash and scroll to top
              if (window.location.hash) {
                history.pushState(
                  null,
                  '',
                  `${window.location.pathname}${window.location.search}`
                );
                window.dispatchEvent(new HashChangeEvent('hashchange'));
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-text-primary hover:text-accent transition-colors font-mono text-sm cursor-pointer"
            aria-label="Go to homepage"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            VF
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-sans cursor-pointer relative group focus-visible:outline-none ${
                    active
                      ? 'text-accent transition-none'
                      : 'text-text-secondary hover:text-accent transition-colors'
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-accent to-accent-hover nav-underline" />
                  ) : (
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-accent-hover nav-underline group-hover:w-full transition-all" />
                  )}
                </button>
              );
            })}
            <button
              onClick={handleResumeClick}
              disabled={!hasResume}
              className={`text-xs font-mono px-3 py-2 border rounded-sm transition-all ${
                hasResume
                  ? 'text-text-secondary border-border hover:text-accent hover:border-accent cursor-pointer'
                  : 'text-text-muted border-border/60 cursor-not-allowed opacity-70'
              }`}
              title={hasResume ? 'Open resume' : 'Resume link will be added soon'}
            >
              Resume
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
            }}
            className="md:hidden absolute left-6 right-6 top-full mt-2 z-40"
          >
            <div className="bg-bg-secondary/96 backdrop-blur-xl border border-border rounded-xl shadow-[0_10px_24px_rgba(0,0,0,0.3)] p-4">
              <div className="flex flex-col items-center gap-3">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`text-base font-sans transition-colors cursor-pointer py-1.5 ${
                        active
                          ? 'text-accent'
                          : 'text-text-secondary hover:text-accent'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <button
                  onClick={handleResumeClick}
                  disabled={!hasResume}
                  className={`mt-1 text-sm font-mono px-4 py-2 border rounded-md transition-colors ${
                    hasResume
                      ? 'text-text-secondary border-border hover:text-accent hover:border-accent cursor-pointer'
                      : 'text-text-muted border-border/60 cursor-not-allowed opacity-70'
                  }`}
                  title={hasResume ? 'Open resume' : 'Resume link will be added soon'}
                >
                  Resume
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
