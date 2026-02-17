import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { IOverlayPageProps } from '../../types/overlay.types';

const overlayEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function OverlayPage({
  children,
  onClose,
  layoutId,
  title,
}: IOverlayPageProps) {
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');

    const updatePointerType = () => {
      setIsCoarsePointer(mediaQuery.matches);
    };

    updatePointerType();
    mediaQuery.addEventListener('change', updatePointerType);

    return () => mediaQuery.removeEventListener('change', updatePointerType);
  }, []);

  // Block body scroll when overlay is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: overlayEase }}
        className="fixed inset-0 z-[100] bg-bg-primary"
        onClick={onClose}
      />

      <motion.div
        layoutId={layoutId}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 14 }}
        transition={{ duration: 0.42, ease: overlayEase }}
        className="fixed inset-0 z-[101] overflow-y-auto scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="min-h-full flex flex-col">
          <div className="sticky top-0 z-10 bg-bg-primary relative">
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
            <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: 0.08, duration: 0.35, ease: overlayEase }}
                className="text-2xl md:text-3xl font-serif font-light text-text-primary"
                style={{
                  fontFamily: 'var(--font-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </motion.h1>

              <motion.button
                initial={
                  isCoarsePointer
                    ? { opacity: 0, scale: 0.92 }
                    : { opacity: 0, scale: 0.85, rotate: -90 }
                }
                animate={
                  isCoarsePointer
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 1, scale: 1, rotate: 0 }
                }
                exit={
                  isCoarsePointer
                    ? { opacity: 0, scale: 0.95 }
                    : { opacity: 0, scale: 0.9, rotate: 45 }
                }
                transition={{ delay: 0.1, duration: 0.3, ease: overlayEase }}
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-accent-hover hover:bg-bg-secondary rounded-sm transition-all duration-300 cursor-pointer group"
                aria-label="Close (Press Escape)"
                whileHover={isCoarsePointer ? undefined : { scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.12, duration: 0.42, ease: overlayEase }}
            className="flex-1 w-full px-6 pb-16 pt-8 overlay-main-content"
          >
            <div className="w-full overlay-children-wrapper">{children}</div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
