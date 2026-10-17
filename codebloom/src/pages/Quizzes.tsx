import React, { useState, useEffect } from "react";
import { updateSEO } from "../utils/seo";
import { quizzesData } from "../data/quizzes";
import { Quiz, QuizAttempt } from "../../src/types/quiz";
import { QuizCard } from "../components/quiz/QuizCard";
import { QuizQuestion } from "../components/quiz/QuizQuestion";
import { QuizResult } from "../components/quiz/QuizResult";
import { SectionHeading } from "../components/common/SectionHeading";
import { Button } from "../components/common/Button";

export interface QuizzesPageProps {
  quizAttempts: Record<string, QuizAttempt>;
  onSaveQuizAttempt: (attempt: QuizAttempt) => void;
  activeQuizId?: string | null;
}

export const Quizzes: React.FC<QuizzesPageProps> = ({
  quizAttempts,
  onSaveQuizAttempt,
  activeQuizId: initialQuizId,
}) => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [finishedAttempt, setFinishedAttempt] = useState<QuizAttempt | null>(
    null,
  );
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    updateSEO({
      title: activeQuiz ? `Quiz: ${activeQuiz.title}` : "Skill Quizzes",
      description:
        "Test your knowledge on modern JavaScript, React hooks, TypeScript, and system architecture with instant feedback.",
    });
  }, [activeQuiz]);

  useEffect(() => {
    if (initialQuizId) {
      const found = quizzesData.find((q) => q.id === initialQuizId);
      if (found) {
        startQuiz(found);
      }
    }
  }, [initialQuizId]);

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activeQuiz && !finishedAttempt) {
      interval = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeQuiz, finishedAttempt]);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeSpent(0);
    setFinishedAttempt(null);
    setShowFeedback(false);
  };

  const handleSelectOption = (optionId: string) => {
    if (!activeQuiz) return;
    const currentQ = activeQuiz.questions[currentQuestionIndex];
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNextOrFinish = () => {
    if (!activeQuiz) return;

    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      activeQuiz.questions.forEach((q) => {
        const selectedId = selectedAnswers[q.id];
        const correctOpt = q.options.find((o) => o.isCorrect);
        if (selectedId && correctOpt && selectedId === correctOpt.id) {
          correctCount += 1;
        }
      });

      const scorePercent = Math.round(
        (correctCount / activeQuiz.questions.length) * 100,
      );
      const passed = scorePercent >= activeQuiz.passingScorePercent;

      const attempt: QuizAttempt = {
        quizId: activeQuiz.id,
        selectedAnswers,
        score: scorePercent,
        totalQuestions: activeQuiz.questions.length,
        correctAnswersCount: correctCount,
        passed,
        completedAt: new Date().toISOString(),
        timeSpentSeconds: timeSpent,
      };

      onSaveQuizAttempt(attempt);
      setFinishedAttempt(attempt);
    }
  };

  // If results screen:
  if (activeQuiz && finishedAttempt) {
    return (
      <div className="py-8 animate-fadeIn">
        <QuizResult
          quiz={activeQuiz}
          attempt={finishedAttempt}
          onRetry={() => startQuiz(activeQuiz)}
          onBackToQuizzes={() => {
            setActiveQuiz(null);
            setFinishedAttempt(null);
          }}
        />
      </div>
    );
  }

  // If live question running:
  if (activeQuiz) {
    const currentQ = activeQuiz.questions[currentQuestionIndex];
    const isAnswered = Boolean(selectedAnswers[currentQ.id]);
    const isLastQuestion =
      currentQuestionIndex === activeQuiz.questions.length - 1;

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
        {/* Quiz Progress & Exit Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveQuiz(null)}
            className="text-base font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            ← Exit Quiz
          </button>
          <div className="flex items-center gap-2 text-base font-mono font-medium text-slate-600 dark:text-slate-300">
            <span>
              ⏱ {Math.floor(timeSpent / 60)}:
              {(timeSpent % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Question Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md">
          <QuizQuestion
            question={currentQ}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={activeQuiz.questions.length}
            selectedOptionId={selectedAnswers[currentQ.id]}
            onSelectOption={handleSelectOption}
            showFeedback={showFeedback}
          />

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="md"
                disabled={!isAnswered}
                onClick={handleNextOrFinish}
              >
                {isLastQuestion ? "Submit Quiz" : "Next Question →"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Catalog view:
  return (
    <div className="space-y-8">
      <SectionHeading
        badge="Self-Assessment"
        title="Interactive Developer Quizzes"
        subtitle="Validate your mastery across frontend paradigms, type safety, and architectural patterns."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzesData.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            lastAttempt={quizAttempts[quiz.id]}
            onStartQuiz={startQuiz}
          />
        ))}
      </div>
    </div>
  );
};
