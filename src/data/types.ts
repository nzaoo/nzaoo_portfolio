export interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
  link?: string;
  tags?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level?: string;
  icon?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  icon?: string;
} 