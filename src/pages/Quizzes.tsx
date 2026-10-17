import React, { useState, useEffect } from "react";
import { updateSEO } from "../utils/seo";
import { quizzesData } from "../data/quizzes";
import { Quiz, QuizAttempt } from "../types/quiz";
import { QuizQuestion } from "../components/quiz/QuizQuestion";
import { QuizResult } from "../components/quiz/QuizResult";

import {
  Code2,
  FileCode,
  Atom,
  Palette,
  HelpCircle,
  X,
  Search,
  Clock,
  Award,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Check,
  Activity,
  Crosshair,
} from "lucide-react";

/* ─── Difficulty colour map ─── */
const diffColour: Record<string, string> = {
  Beginner:
    "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60",
  Intermediate:
    "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60",
  Advanced:
    "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/60",
};

/* ─── Category accent ─── */
const catAccent: Record<string, string> = {
  JavaScript: "from-yellow-400 to-amber-500",
  TypeScript: "from-blue-500 to-indigo-600",
  React: "from-cyan-400 to-blue-500",
  CSS: "from-purple-500 to-pink-500",
  default: "from-emerald-500 to-indigo-500",
};

const catIcon: Record<string, React.ReactNode> = {
  JavaScript: <Code2 className="w-6 h-6" />,
  TypeScript: <FileCode className="w-6 h-6" />,
  React: <Atom className="w-6 h-6" />,
  CSS: <Palette className="w-6 h-6" />,
};

/* ─────────────────────────────────────────────────────────────────────────────
   Props
───────────────────────────────────────────────────────────────────────────── */
export interface QuizzesPageProps {
  quizAttempts: Record<string, QuizAttempt>;
  onSaveQuizAttempt: (attempt: QuizAttempt) => void;
  activeQuizId?: string | null;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────────────────── */
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
  const [checkedQuestions, setCheckedQuestions] = useState<
    Record<string, boolean>
  >({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [finishedAttempt, setFinishedAttempt] = useState<QuizAttempt | null>(
    null,
  );

  // Catalog filters (Section 1)
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    updateSEO({
      title: activeQuiz ? `Quiz: ${activeQuiz.title}` : "Skill Quizzes",
      description:
        "Test your knowledge on JavaScript, React, TypeScript, and CSS with instant feedback.",
    });
  }, [activeQuiz]);

  useEffect(() => {
    if (initialQuizId) {
      const found = quizzesData.find((q) => q.id === initialQuizId);
      if (found) startQuiz(found);
    }
  }, [initialQuizId]);

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activeQuiz && !finishedAttempt) {
      interval = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [activeQuiz, finishedAttempt]);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setCheckedQuestions({});
    setTimeSpent(0);
    setFinishedAttempt(null);
  };

  const handleSelectOption = (optionId: string) => {
    if (!activeQuiz) return;
    const currentQ = activeQuiz.questions[currentQuestionIndex];
    // Only allow changing answer before clicking "Check Answer"
    if (checkedQuestions[currentQ.id]) return;

    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionId }));
  };

  const handleCheckCurrentAnswer = () => {
    if (!activeQuiz) return;
    const currentQ = activeQuiz.questions[currentQuestionIndex];
    if (!selectedAnswers[currentQ.id]) return;

    setCheckedQuestions((prev) => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNextOrFinish = () => {
    if (!activeQuiz) return;
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate final score across all questions
      let correctCount = 0;
      activeQuiz.questions.forEach((q) => {
        const selectedId = selectedAnswers[q.id];
        const correctOpt = q.options.find((o) => o.isCorrect);
        if (selectedId && correctOpt && selectedId === correctOpt.id)
          correctCount++;
      });
      const scorePercent = Math.round(
        (correctCount / activeQuiz.questions.length) * 100,
      );
      const attempt: QuizAttempt = {
        quizId: activeQuiz.id,
        selectedAnswers,
        score: scorePercent,
        totalQuestions: activeQuiz.questions.length,
        correctAnswersCount: correctCount,
        passed: scorePercent >= activeQuiz.passingScorePercent,
        completedAt: new Date().toISOString(),
        timeSpentSeconds: timeSpent,
      };
      onSaveQuizAttempt(attempt);
      setFinishedAttempt(attempt);
    }
  };

  // Convert quizAttempts dictionary to list of past completed attempts with Quiz metadata
  const pastAttemptsList = Object.entries(quizAttempts).map(
    ([quizId, attempt]) => {
      const qz = quizzesData.find((q) => q.id === quizId) || {
        id: quizId,
        title: "Coding Quiz",
        category: "General",
      };
      return { quiz: qz as Quiz, attempt };
    },
  );

  /* ───────────────────────────────────────────────────────────────────────────
     Section 3: Results Screen
  ─────────────────────────────────────────────────────────────────────────── */
  if (activeQuiz && finishedAttempt) {
    return (
      <div className="py-4 max-w-2xl mx-auto">
        <QuizResult
          quiz={activeQuiz}
          attempt={finishedAttempt}
          onRetry={() => startQuiz(activeQuiz)}
          onBackToQuizzes={() => {
            setActiveQuiz(null);
            setFinishedAttempt(null);
          }}
          recentAttempts={pastAttemptsList}
        />
      </div>
    );
  }

  /* ───────────────────────────────────────────────────────────────────────────
     Section 2: Question Panel & Interactive UI
  ─────────────────────────────────────────────────────────────────────────── */
  if (activeQuiz) {
    const currentQ = activeQuiz.questions[currentQuestionIndex];
    const isAnswerSelected = Boolean(selectedAnswers[currentQ.id]);
    const isChecked = Boolean(checkedQuestions[currentQ.id]);
    const isLastQuestion =
      currentQuestionIndex === activeQuiz.questions.length - 1;
    const progressWidth =
      ((currentQuestionIndex + (isChecked ? 1 : 0.5)) /
        activeQuiz.questions.length) *
      100;
    const accent = catAccent[activeQuiz.category] ?? catAccent.default;

    return (
      <div className="max-w-2xl mx-auto space-y-5 animate-fadeIn">
        {/* ── Quiz header bar (Section 1 in runner) ── */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xs">
          {/* Progress bar across the top */}
          <div className="h-1.5 bg-slate-100 dark:bg-slate-800">
            <div
              className={`h-full bg-gradient-to-r ${accent} transition-all duration-300`}
              style={{
                width: `${Math.min(100, Math.max(10, progressWidth))}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between px-5 py-4 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveQuiz(null)}
                className="inline-flex items-center gap-1.5 text-base font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span className="w-6 h-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center group-hover:border-rose-400 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </span>
                Exit
              </button>

              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {activeQuiz.title}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${diffColour[activeQuiz.difficulty] ?? ""}`}
                >
                  {activeQuiz.difficulty}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Question dots indicator */}
              <div className="hidden sm:flex items-center gap-1">
                {activeQuiz.questions.map((q, i) => {
                  const answered = Boolean(checkedQuestions[q.id]);
                  const isCurrent = i === currentQuestionIndex;
                  return (
                    <span
                      key={q.id}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        answered
                          ? "bg-emerald-500"
                          : isCurrent
                            ? "bg-indigo-500 scale-125 ring-2 ring-indigo-500/30"
                            : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    />
                  );
                })}
              </div>

              <span className="text-base font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                Question {currentQuestionIndex + 1} of{" "}
                {activeQuiz.questions.length}
              </span>

              {/* Timer */}
              <span className="inline-flex items-center gap-1 text-base font-mono font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5" />
                {Math.floor(timeSpent / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(timeSpent % 60).toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* ── Question Panel (Section 2) ── */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md overflow-hidden">
          <div className={`h-1 bg-gradient-to-r ${accent}`} />

          <div className="p-6 sm:p-8">
            <QuizQuestion
              question={currentQ}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={activeQuiz.questions.length}
              selectedOptionId={selectedAnswers[currentQ.id]}
              onSelectOption={handleSelectOption}
              showFeedback={isChecked}
            />

            {/* Navigation & Check Answer Controls */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-lg font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-2">
                {!isChecked ? (
                  /* Check Answer Button (Immediate Feedback) */
                  <button
                    disabled={!isAnswerSelected}
                    onClick={handleCheckCurrentAnswer}
                    className="px-6 py-2.5 rounded-xl text-lg font-bold shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                  >
                    Check Answer
                  </button>
                ) : (
                  /* Next Question or Submit Quiz */
                  <button
                    onClick={handleNextOrFinish}
                    className="px-6 py-2.5 rounded-xl text-lg font-bold shadow-md transition-all cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
                  >
                    {isLastQuestion
                      ? "Submit Quiz & View Results →"
                      : "Next Question →"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ───────────────────────────────────────────────────────────────────────────
     Section 1: Quiz Catalog View (Title, Difficulty, Topic Filters, Stats)
  ─────────────────────────────────────────────────────────────────────────── */
  const topics = ["All", "JavaScript", "TypeScript", "React", "CSS"];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredQuizzes = quizzesData.filter((q) => {
    const matchesTopic =
      selectedCategory === "All" || q.category === selectedCategory;
    const matchesDiff =
      selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      q.title.toLowerCase().includes(query) ||
      q.description.toLowerCase().includes(query) ||
      q.category.toLowerCase().includes(query);
    return matchesTopic && matchesDiff && matchesSearch;
  });

  const totalAttempted = Object.keys(quizAttempts).length;
  const totalPassed = Object.values(quizAttempts).filter(
    (a) => a.passed,
  ).length;

  return (
    <div className="space-y-10">
      {/* ── Section 1 Header: Title, Intro & Filters ── */}
      <div className="space-y-6">
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-2 text-base font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            <span className="w-4 h-px bg-emerald-500" />
            Skill Assessment
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Developer
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500">
              {" "}
              Quizzes
            </span>
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Test your understanding with instant, helpful feedback. Challenge
            yourself on modern syntax, component lifecycles, and architecture
            patterns.
          </p>
        </div>

        {/* Stats bar */}
        {totalAttempted > 0 && (
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
              <Crosshair color="#10A36A" />
              <div>
                <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
                  Quizzes Taken
                </p>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {totalAttempted}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
             <Check color="#10A36A" />
              <div>
                <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
                  Passed
                </p>
                <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {totalPassed}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
              <Activity color="#10A36A" />
              <div>
                <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
                  Pass Rate
                </p>
                <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {totalAttempted
                    ? Math.round((totalPassed / totalAttempted) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Topic & Search filter row */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quizzes by title or keyword…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Topic filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedCategory(t)}
                  className={`px-3.5 py-2 rounded-xl text-base font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === t
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty row */}
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-slate-400 dark:text-slate-500">
              Difficulty:
            </span>
            <div className="flex items-center gap-1.5">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-2.5 py-1 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    selectedDifficulty === d
                      ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-base text-slate-400 dark:text-slate-500">
          Showing {filteredQuizzes.length} quiz
          {filteredQuizzes.length !== 1 ? "zes" : ""}
        </p>
      </div>

      {/* ── Section 1: Quiz Cards Grid ── */}
      {filteredQuizzes.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
         
          <p className="font-bold text-slate-900 dark:text-white text-lg">
            No quizzes match your filter
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-1">
            Try selecting another topic or difficulty.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedDifficulty("All");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 text-lg font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredQuizzes.map((quiz) => {
            const lastAttempt = quizAttempts[quiz.id];
            const hasPassed = lastAttempt?.passed;
            const accent = catAccent[quiz.category] ?? catAccent.default;
            const icon = catIcon[quiz.category];

            return (
              <div
                key={quiz.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-400/60 dark:hover:border-emerald-600/50 shadow-sm hover:shadow-xl hover:shadow-emerald-500/6 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient top strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent} transition-all duration-300 group-hover:h-1.5`}
                />

                <div>
                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${accent} text-white shadow-md`}
                    >
                      {icon ?? <HelpCircle className="w-6 h-6" />}
                    </div>

                    {lastAttempt && (
                      <span
                        className={`inline-flex items-center gap-1 text-base font-bold px-2.5 py-1 rounded-full border ${
                          hasPassed
                            ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                            : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {hasPassed ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Passed ·{" "}
                            {lastAttempt.score}%
                          </>
                        ) : (
                          <>
                            <RotateCcw className="w-3.5 h-3.5" /> Retake ·{" "}
                            {lastAttempt.score}%
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Title + description */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {quiz.category}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${diffColour[quiz.difficulty] ?? ""}`}
                      >
                        {quiz.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {quiz.title}
                    </h3>
                    <p className="text-lg text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {quiz.description}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Meta stats row: question count & estimated duration */}
                  <div className="flex items-center gap-4 text-base text-slate-500 dark:text-slate-400 mb-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      {quiz.questions.length} Questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      ~{Math.round(quiz.timeLimitSeconds / 60)} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Pass: {quiz.passingScorePercent}%
                    </span>
                  </div>

                  {/* Start button */}
                  <button
                    onClick={() => startQuiz(quiz)}
                    className={`w-full py-2.5 rounded-xl text-lg font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      lastAttempt
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
                        : `bg-gradient-to-r ${accent} text-white shadow-emerald-500/20 hover:opacity-90`
                    }`}
                  >
                    {lastAttempt ? (
                      <>
                        <RotateCcw className="w-4 h-4" /> Retake Quiz
                      </>
                    ) : (
                      <>
                        Start Quiz <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Section 3: Recent Quiz Results (if user has any past attempts) ── */}
      {pastAttemptsList.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Recent Quiz Results
            </h3>
            <span className="text-base font-semibold text-slate-400 dark:text-slate-500">
              {pastAttemptsList.length} completed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pastAttemptsList.map(({ quiz: qz, attempt: att }, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold ${
                      att.passed
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                    }`}
                  >
                    {att.passed ? "✓" : "•"}
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

                <div className="flex items-center gap-2">
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
                    {att.passed ? "Passed" : "Review"}
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
