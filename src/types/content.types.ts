export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  email: string;
  resumeUrl: string;
}

export interface NavLink {
  label: string;
  href: '#about' | '#projects';
}

export type SocialIcon = 'github' | 'linkedin' | 'telegram';

export interface SocialLink {
  name: string;
  url: string;
  icon: SocialIcon;
}

export type ProjectTrack =
  | 'web-apps'
  | 'landing-pages'
  | 'team-projects'
  | 'typescript';
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
  isTeamProject?: boolean;
  isRefactored?: boolean;
  tracks: ProjectTrack[];
}

export interface ArchivedProject {
  id: number;
  title: string;
  note: string;
  liveUrl?: string;
  githubUrl: string;
}
