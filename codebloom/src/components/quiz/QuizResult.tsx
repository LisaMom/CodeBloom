import React from "react";
import { Quiz, QuizAttempt } from "../../types/quiz";
import { Button } from "../common/Button";

export interface QuizResultProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onRetry: () => void;
  onBackToQuizzes: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  quiz,
  attempt,
  onRetry,
  onBackToQuizzes,
}) => {
  const isPassed = attempt.passed;

  return (
    <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
      {/* Icon Badge */}
      <div
        className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl ${
          isPassed
            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700"
            : "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-700"
        }`}
      >
        {isPassed ? "🏆" : "📚"}
      </div>

      <div>
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-bold mb-3 border shadow-xs"
          style={{
            backgroundColor: isPassed ? "#ecfdf5" : "#fffbeb",
            color: isPassed ? "#059669" : "#d97706",
            borderColor: isPassed ? "#a7f3d0" : "#fde68a",
          }}
        >
          <span>{isPassed ? "✓ Passed" : "⚠ Needs Review"}</span>
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {attempt.correctAnswersCount}/{attempt.totalQuestions} Correct —{" "}
          {attempt.score}%
        </h3>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          {isPassed
            ? `Passing threshold is ${quiz.passingScorePercent}%. Great job completing this assessment!`
            : `Passing threshold is ${quiz.passingScorePercent}%. Review the explanations below and try again to master these concepts.`}
        </p>
      </div>

      {/* Score Stats Grid */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
        <div>
          <span className="text-base text-slate-500 dark:text-slate-400">
            Score
          </span>
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            {attempt.score}%
          </p>
        </div>
        <div>
          <span className="text-base text-slate-500 dark:text-slate-400">
            Correct
          </span>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {attempt.correctAnswersCount} / {attempt.totalQuestions}
          </p>
        </div>
        <div>
          <span className="text-base text-slate-500 dark:text-slate-400">
            Time
          </span>
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            {Math.floor(attempt.timeSpentSeconds / 60)}m{" "}
            {attempt.timeSpentSeconds % 60}s
          </p>
        </div>
      </div>

      {/* Question-by-Question Review with Explanations */}
      <div className="text-left space-y-4 pt-2">
        <h4 className="text-lg font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
          Question Review & Explanations
        </h4>
        <div className="space-y-4">
          {quiz.questions.map((q, idx) => {
            const selectedOptId = attempt.selectedAnswers[q.id];
            const selectedOpt = q.options.find((o) => o.id === selectedOptId);
            const correctOpt = q.options.find((o) => o.isCorrect);
            const isCorrect = selectedOpt?.isCorrect ?? false;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border text-lg space-y-2 transition-all ${
                  isCorrect
                    ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/70 dark:border-emerald-800/40"
                    : "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/70 dark:border-rose-800/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {idx + 1}. {q.question}
                  </span>
                  <span
                    className={`text-base px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      isCorrect
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                        : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>

                <div className="text-base space-y-1 pt-1">
                  <div className="text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                      Your Answer:{" "}
                    </span>
                    <span
                      className={
                        isCorrect
                          ? "text-emerald-700 dark:text-emerald-400 font-medium"
                          : "text-rose-700 dark:text-rose-400 font-medium line-through"
                      }
                    >
                      {selectedOpt?.text || "Not answered"}
                    </span>
                  </div>
                  {!isCorrect && correctOpt && (
                    <div className="text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-500 dark:text-slate-400">
                        Correct Answer:{" "}
                      </span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                        {correctOpt.text}
                      </span>
                    </div>
                  )}
                </div>

                {q.explanation && (
                  <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 text-base text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Why:{" "}
                    </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <Button
          variant="outline"
          size="md"
          className="w-full sm:flex-1"
          onClick={onBackToQuizzes}
        >
          Back to Quizzes
        </Button>
        <Button
          variant="primary"
          size="md"
          className="w-full sm:flex-1"
          onClick={onRetry}
        >
          Retake Quiz
        </Button>
      </div>
    </div>
  );
};
