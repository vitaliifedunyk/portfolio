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

export type ProjectCategory = 'personal' | 'team';
export type ProjectFilter = 'applications' | 'landing-pages' | 'team-project';

export interface Project {
  id: number;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: ProjectCategory;
  filters: ProjectFilter[];
}
