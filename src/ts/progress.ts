import { storage } from './utils/storage';
import { QuizAttempt } from './types/quiz';

export function getCompletedSteps(): string[] {
  return storage.getCompletedSteps();
}

export function getCompletedLessons(): string[] {
  return storage.getCompletedLessons();
}

export function getBookmarks(): string[] {
  return storage.getBookmarks();
}

export function getQuizAttempts(): Record<string, QuizAttempt> {
  return storage.getQuizAttempts();
}

export function toggleStep(stepId: string): string[] {
  const next = storage.toggleCompletedStep(stepId);
  dispatchProgressChange();
  return next;
}

export function toggleLesson(lessonId: string): string[] {
  const next = storage.toggleCompletedLesson(lessonId);
  dispatchProgressChange();
  return next;
}

export function toggleBookmark(itemId: string): string[] {
  const next = storage.toggleBookmark(itemId);
  dispatchProgressChange();
  return next;
}

export function recordQuizAttempt(attempt: QuizAttempt): void {
  storage.saveQuizAttempt(attempt);
  dispatchProgressChange();
}

export function isStepCompleted(stepId: string): boolean {
  return getCompletedSteps().includes(stepId);
}

export function isLessonCompleted(lessonId: string): boolean {
  return getCompletedLessons().includes(lessonId);
}

export function isBookmarked(itemId: string): boolean {
  return getBookmarks().includes(itemId);
}

export function calculateRoadmapProgress(stepIds: string[]): number {
  if (!stepIds.length) return 0;
  const completed = getCompletedSteps();
  const count = stepIds.filter((id) => completed.includes(id)).length;
  return Math.round((count / stepIds.length) * 100);
}

export function getTotalCompletedCount(): number {
  return getCompletedSteps().length + getCompletedLessons().length;
}

function dispatchProgressChange(): void {
  window.dispatchEvent(
    new CustomEvent('codebloom:progress-change', {
      detail: {
        completedSteps: getCompletedSteps(),
        completedLessons: getCompletedLessons(),
        totalCount: getTotalCompletedCount(),
      },
    })
  );
}

export function onProgressChange(callback: () => void): () => void {
  window.addEventListener('codebloom:progress-change', callback);
  return () => window.removeEventListener('codebloom:progress-change', callback);
}
