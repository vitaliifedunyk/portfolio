import type React from 'react';

export type OverlayRoute = 'about' | 'projects' | 'contact' | null;

export interface IOverlayPageProps {
  children: React.ReactNode;
  onClose: () => void;
  layoutId?: string;
  title: string;
}
