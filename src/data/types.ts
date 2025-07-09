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

// Types for 3D Portfolio
export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Keys {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
}

export interface InteractiveContent {
  title: string;
  content: string;
}

export interface InteractiveObject {
  id: string;
  position: [number, number, number];
  label: string;
  content: InteractiveContent;
} 