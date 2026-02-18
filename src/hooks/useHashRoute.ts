import { useCallback } from 'react';
import type { OverlayRoute } from '../types/overlay.types';

export function useHashRoute() {
  const scrollToSection = useCallback((route: Exclude<OverlayRoute, null>) => {
    const section = document.getElementById(route);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const setRouteHash = useCallback((route: Exclude<OverlayRoute, null>) => {
    const nextHash = `#${route}`;
    if (window.location.hash === nextHash) {
      scrollToSection(route);
      return;
    }

    window.location.hash = route;
  }, [scrollToSection]);

  const openOverlay = useCallback((route: OverlayRoute) => {
    if (route) {
      setRouteHash(route);
    }
  }, [setRouteHash]);

  return {
    openOverlay,
  };
}
