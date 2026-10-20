import { QuizAttempt } from '../types/quiz';

const PREFIX = 'CodeBloom_';

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch (e) {
      console.warn('Failed to remove from localStorage:', e);
    }
  },

  // Progress specific helpers
  getCompletedSteps(): string[] {
    return this.get<string[]>('completed_steps', []);
  },

  toggleCompletedStep(stepId: string): string[] {
    const steps = this.getCompletedSteps();
    const next = steps.includes(stepId)
      ? steps.filter((id) => id !== stepId)
      : [...steps, stepId];
    this.set('completed_steps', next);
    return next;
  },

  getCompletedLessons(): string[] {
    return this.get<string[]>('completed_lessons', []);
  },

  toggleCompletedLesson(lessonId: string): string[] {
    const lessons = this.getCompletedLessons();
    const next = lessons.includes(lessonId)
      ? lessons.filter((id) => id !== lessonId)
      : [...lessons, lessonId];
    this.set('completed_lessons', next);
    return next;
  },

  getBookmarks(): string[] {
    return this.get<string[]>('bookmarks', []);
  },

  toggleBookmark(itemId: string): string[] {
    const bookmarks = this.getBookmarks();
    const next = bookmarks.includes(itemId)
      ? bookmarks.filter((id) => id !== itemId)
      : [...bookmarks, itemId];
    this.set('bookmarks', next);
    return next;
  },

  getQuizAttempts(): Record<string, QuizAttempt> {
    return this.get<Record<string, QuizAttempt>>('quiz_attempts', {});
  },

  saveQuizAttempt(attempt: QuizAttempt): void {
    const attempts = this.getQuizAttempts();
    attempts[attempt.quizId] = attempt;
    this.set('quiz_attempts', attempts);
  },
};
