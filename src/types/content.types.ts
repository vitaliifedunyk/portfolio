export type NavHref = '#about' | '#projects';

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  email: string;
  resumeUrl: string;
}

export interface NavLink {
  label: string;
  href: NavHref;
}

export type SocialIcon = 'github' | 'linkedin' | 'telegram';

export interface SocialLink {
  name: string;
  url: string;
  icon: SocialIcon;
}

export type ProjectTrack = 'html-css' | 'javascript' | 'tailwindcss';
export type ProjectType = 'course' | 'personal';

export interface Project {
  id: number;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  type: ProjectType;
  isRefactored?: boolean;
  tracks: ProjectTrack[];
}
