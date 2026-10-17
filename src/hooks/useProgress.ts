import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';
import { QuizAttempt } from '../types/quiz';

export function useProgress() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<Record<string, QuizAttempt>>({});

  useEffect(() => {
    setCompletedSteps(storage.getCompletedSteps());
    setCompletedLessons(storage.getCompletedLessons());
    setBookmarks(storage.getBookmarks());
    setQuizAttempts(storage.getQuizAttempts());
  }, []);

  const toggleStep = useCallback((stepId: string) => {
    const next = storage.toggleCompletedStep(stepId);
    setCompletedSteps([...next]);
  }, []);

  const toggleLesson = useCallback((lessonId: string) => {
    const next = storage.toggleCompletedLesson(lessonId);
    setCompletedLessons([...next]);
  }, []);

  const toggleBookmark = useCallback((itemId: string) => {
    const next = storage.toggleBookmark(itemId);
    setBookmarks([...next]);
  }, []);

  const recordQuizAttempt = useCallback((attempt: QuizAttempt) => {
    storage.saveQuizAttempt(attempt);
    setQuizAttempts((prev) => ({
      ...prev,
      [attempt.quizId]: attempt,
    }));
  }, []);

  const isStepCompleted = useCallback(
    (stepId: string) => completedSteps.includes(stepId),
    [completedSteps]
  );

  const isLessonCompleted = useCallback(
    (lessonId: string) => completedLessons.includes(lessonId),
    [completedLessons]
  );

  const isBookmarked = useCallback(
    (itemId: string) => bookmarks.includes(itemId),
    [bookmarks]
  );

  const calculateRoadmapProgress = useCallback(
    (stepIds: string[]) => {
      if (!stepIds.length) return 0;
      const completed = stepIds.filter((id) => completedSteps.includes(id)).length;
      return Math.round((completed / stepIds.length) * 100);
    },
    [completedSteps]
  );

  return {
    completedSteps,
    completedLessons,
    bookmarks,
    quizAttempts,
    toggleStep,
    toggleLesson,
    toggleBookmark,
    recordQuizAttempt,
    isStepCompleted,
    isLessonCompleted,
    isBookmarked,
    calculateRoadmapProgress,
  };
}
