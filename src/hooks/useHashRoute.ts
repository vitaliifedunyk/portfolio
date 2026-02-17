import { useState, useEffect, useCallback } from 'react';
import type { OverlayRoute } from '../types/overlay.types';

export function useHashRoute() {
  const getRouteFromHash = useCallback((): OverlayRoute => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'about' || hash === 'projects' || hash === 'contact') {
      return hash;
    }
    return null;
  }, []);

  const [activeOverlay, setActiveOverlay] = useState<OverlayRoute>(
    getRouteFromHash
  );

  useEffect(() => {
    const handleHashChange = () => {
      setActiveOverlay(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check initial hash on mount
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [getRouteFromHash]);

  const setRouteHash = useCallback((route: Exclude<OverlayRoute, null>) => {
    const nextHash = `#${route}`;
    if (window.location.hash === nextHash) {
      return;
    }

    history.pushState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, []);

  const openOverlay = useCallback((route: OverlayRoute) => {
    if (route) {
      setRouteHash(route);
    }
  }, [setRouteHash]);

  const closeOverlay = useCallback(() => {
    // Use history.back() to properly support browser back button
    if (window.location.hash) {
      if (window.history.length > 1) {
        history.back();
        return;
      }

      history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  }, []);

  return {
    activeOverlay,
    openOverlay,
    closeOverlay,
  };
}
