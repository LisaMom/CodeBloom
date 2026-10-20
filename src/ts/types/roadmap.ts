export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type RoadmapCategory = 
  | 'web'
  | 'frontend' 
  | 'backend' 
  | 'programming'
  | 'devops' 
  | 'ai' 
  | 'mobile';

export type StepStatus = 'completed' | 'in-progress' | 'next' | 'locked';

export interface RoadmapResource {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'video' | 'documentation' | 'interactive';
  duration?: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedHours: number;
  completed?: boolean;
  status?: StepStatus;
  order: number;
  keyTopics: string[];
  resources: RoadmapResource[];
  relatedLessonId?: string;
  badge?: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  order: number;
  steps: RoadmapStep[];
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: RoadmapCategory;
  difficulty: DifficultyLevel;
  estimatedWeeks: number;
  totalSteps: number;
  iconName: string;
  accentColor: string;
  featured?: boolean;
  milestones: RoadmapMilestone[];
  prerequisites: string[];
  learningOutcomes: string[];
  updatedAt: string;
}
