export type LessonDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type LessonCategory = 
  | 'javascript' 
  | 'typescript' 
  | 'react' 
  | 'css' 
  | 'backend' 
  | 'architecture' 
  | 'database'
  | 'c'
  | 'laravel'
  | 'php'
  | 'cpp'
  | 'java'
  | 'html';

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
  explanation?: string;
}

export interface PracticeQuestion {
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  codeSnippets?: CodeSnippet[];
  proTip?: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  courseName?: string;
  category: LessonCategory;
  difficulty: LessonDifficulty;
  readTimeMinutes: number;
  featured?: boolean;
  sections: LessonSection[];
  keyTakeaways: string[];
  tags: string[];
  practiceQuestion?: PracticeQuestion;
  relatedRoadmapId?: string;
  relatedQuizId?: string;
  publishedAt: string;
  viewsCount?: number;
  isFree?: boolean;
  bannerType?: string;
  sectionGroup?: 'latest' | 'recommended' | 'popular';
}
