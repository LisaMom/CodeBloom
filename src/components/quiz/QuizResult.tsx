import React from "react";
import { ArrowLeft, RotateCcw, Check, X, Trophy, BookOpen } from "lucide-react";
import { Quiz, QuizAttempt } from "../../types/quiz";

export interface QuizResultProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onRetry: () => void;
  onBackToQuizzes: () => void;
  recentAttempts?: Array<{ quiz: Quiz; attempt: QuizAttempt }>;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  quiz,
  attempt,
  onRetry,
  onBackToQuizzes,
  recentAttempts = [],
}) => {
  const isPassed = attempt.passed;
  const score = attempt.score;
  const mins = Math.floor(attempt.timeSpentSeconds / 60);
  const secs = attempt.timeSpentSeconds % 60;

  /* ── SVG circular score ring ── */
  const radius = 52;
  const circumference = 2 * Math.PI * radius; // ≈ 326.7
  const offset = circumference * (1 - score / 100);
  const ringColour = isPassed ? "#059669" : "#f59e0b"; // emerald-600 / amber-500

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* ── Back nav ── */}
      <button
        onClick={onBackToQuizzes}
        className="inline-flex items-center gap-2 text-lg font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group"
      >
        <span className="w-7 h-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center group-hover:border-emerald-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </span>
        Back to Quizzes
      </button>

      {/* ── Score card ── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl overflow-hidden">
        {/* Top gradient band */}
        <div
          className={`h-2 w-full ${isPassed ? "bg-gradient-to-r from-emerald-400 to-emerald-600" : "bg-gradient-to-r from-amber-400 to-amber-600"}`}
        />

        <div className="p-8 sm:p-10 text-center space-y-6">
          {/* Pass/fail badge */}
          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-lg font-extrabold border ${
              isPassed
                ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                : "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
            }`}
          >
            {isPassed ? (
              <><Trophy className="w-4 h-4" /> Passed</>
            ) : (
              <><BookOpen className="w-4 h-4" /> Needs Review</>
            )}
          </span>

          {/* Circular score ring */}
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                {/* Background track */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-slate-100 dark:text-slate-800"
                />
                {/* Score arc */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke={ringColour}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-all duration-700"
                />
              </svg>
              {/* Score number in centre */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {score}%
                </span>
                <span className="text-base font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                  {attempt.correctAnswersCount}/{attempt.totalQuestions}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {quiz.title}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              {isPassed
                ? `Great work! You cleared the ${quiz.passingScorePercent}% passing threshold.`
                : `Passing threshold is ${quiz.passingScorePercent}%. Review the explanations and retake.`}
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              {
                label: "Score",
                value: `${score}%`,
                colour: isPassed
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400",
              },
              {
                label: "Correct",
                value: `${attempt.correctAnswersCount}/${attempt.totalQuestions}`,
                colour: "text-slate-900 dark:text-white",
              },
              {
                label: "Time",
                value: `${mins}m ${secs.toString().padStart(2, "0")}s`,
                colour: "text-slate-900 dark:text-white",
              },
            ].map(({ label, value, colour }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60"
              >
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {label}
                </span>
                <span
                  className={`text-xl font-extrabold tabular-nums ${colour}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onBackToQuizzes}
              className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-lg font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              Browse All Quizzes
            </button>
            <button
              onClick={onRetry}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Answer Review ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Answer Review
          </h3>
          <span className="text-base font-semibold text-slate-400 dark:text-slate-500">
            {attempt.correctAnswersCount} correct ·{" "}
            {attempt.totalQuestions - attempt.correctAnswersCount} incorrect
          </span>
        </div>

        <div className="space-y-4">
          {quiz.questions.map((q, idx) => {
            const selectedOptId = attempt.selectedAnswers[q.id];
            const selectedOpt = q.options.find((o) => o.id === selectedOptId);
            const correctOpt = q.options.find((o) => o.isCorrect);
            const isCorrect = selectedOpt?.isCorrect ?? false;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 space-y-3 ${
                  isCorrect
                    ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/70 dark:border-emerald-800/50"
                    : "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/70 dark:border-rose-800/50"
                }`}
              >
                {/* Question + badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-base font-extrabold mt-0.5 ${
                        isCorrect
                          ? "bg-emerald-500 text-white"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <p className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {q.question}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-base font-extrabold px-2.5 py-1 rounded-full ${
                      isCorrect
                        ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400"
                        : "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400"
                    }`}
                  >
                    {isCorrect ? (
                      <><Check className="w-3 h-3 stroke-[3]" /> Correct</>
                    ) : (
                      <><X className="w-3 h-3 stroke-[3]" /> Wrong</>
                    )}
                  </span>
                </div>

                {/* Answer details */}
                <div className="pl-8 space-y-1.5 text-base">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-500 dark:text-slate-400 w-24 shrink-0">
                      Your answer:
                    </span>
                    <span
                      className={
                        isCorrect
                          ? "font-semibold text-emerald-700 dark:text-emerald-400"
                          : "font-semibold text-rose-600 dark:text-rose-400 line-through"
                      }
                    >
                      {selectedOpt?.text ?? "Not answered"}
                    </span>
                  </div>
                  {!isCorrect && correctOpt && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-500 dark:text-slate-400 w-24 shrink-0">
                        Correct answer:
                      </span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {correctOpt.text}
                      </span>
                    </div>
                  )}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="pl-8">
                    <div className="flex gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/50 text-base text-amber-900 dark:text-amber-200">
                      <span className="shrink-0">💡</span>
                      <span>{q.explanation}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Recent Quiz Results ── */}
      {recentAttempts.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Recent Quiz Results
            </h3>
            <span className="text-base font-semibold text-slate-400 dark:text-slate-500">
              {recentAttempts.length} completed
            </span>
          </div>

          <div className="space-y-2.5">
            {recentAttempts.map(({ quiz: qz, attempt: att }, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg font-bold ${
                      att.passed
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                    }`}
                  >
                    {att.passed ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="w-2 h-2 rounded-full bg-current" />}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {qz.title}
                    </h4>
                    <p className="text-base text-slate-400 dark:text-slate-500">
                      {att.correctAnswersCount}/{att.totalQuestions} correct ·{" "}
                      {Math.round(att.timeSpentSeconds / 60)} min
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-lg font-extrabold ${att.passed ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}
                  >
                    {att.score}%
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      att.passed
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                        : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800"
                    }`}
                  >
                    {att.passed ? "Passed" : "Needs Review"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
