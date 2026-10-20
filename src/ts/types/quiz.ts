export type QuizDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  options: QuizOption[];
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: QuizDifficulty;
  timeLimitSeconds: number;
  questions: QuizQuestion[];
  passingScorePercent: number;
  tags: string[];
}

export interface QuizAttempt {
  quizId: string;
  selectedAnswers: Record<string, string>; // questionId -> optionId
  score: number;
  totalQuestions: number;
  correctAnswersCount: number;
  passed: boolean;
  completedAt: string;
  timeSpentSeconds: number;
}
