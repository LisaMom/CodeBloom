import React, { useState, useEffect } from "react";
import { updateSEO } from "../utils/seo";
import { lessonsData } from "../data/lessons";
import { Lesson, LessonCategory } from "../types/lesson";
import { LessonSidebar } from "../components/lesson/LessonSidebar";
import { CodeBlock } from "../components/lesson/CodeBlock";
import { LessonCard } from "../components/lesson/LessonCard";
import { LessonHeroIllustration } from "../components/lesson/LessonHeroIllustration";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  X,
  CheckCircle2,
  Check,
  RotateCcw,
  Target,
  Lightbulb,
  Sparkles,
  AlertCircle,
} from "lucide-react";

/* ─── Category colour map ─── */
const catColour: Record<string, { bg: string; text: string; dot: string }> = {
  javascript: {
    bg: "bg-yellow-100 dark:bg-yellow-950/50",
    text: "text-yellow-800 dark:text-yellow-300",
    dot: "bg-yellow-500",
  },
  typescript: {
    bg: "bg-blue-100 dark:bg-blue-950/50",
    text: "text-blue-800 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  react: {
    bg: "bg-cyan-100 dark:bg-cyan-950/50",
    text: "text-cyan-800 dark:text-cyan-300",
    dot: "bg-cyan-500",
  },
  css: {
    bg: "bg-teal-100 dark:bg-teal-950/50",
    text: "text-teal-800 dark:text-teal-300",
    dot: "bg-teal-500",
  },
  c: {
    bg: "bg-sky-100 dark:bg-sky-950/50",
    text: "text-sky-800 dark:text-sky-300",
    dot: "bg-sky-500",
  },
  laravel: {
    bg: "bg-rose-100 dark:bg-rose-950/50",
    text: "text-rose-800 dark:text-rose-300",
    dot: "bg-rose-500",
  },
  php: {
    bg: "bg-indigo-100 dark:bg-indigo-950/50",
    text: "text-indigo-800 dark:text-indigo-300",
    dot: "bg-indigo-500",
  },
  cpp: {
    bg: "bg-blue-100 dark:bg-blue-950/50",
    text: "text-blue-800 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  java: {
    bg: "bg-amber-100 dark:bg-amber-950/50",
    text: "text-amber-800 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  html: {
    bg: "bg-rose-100 dark:bg-rose-950/50",
    text: "text-rose-800 dark:text-rose-300",
    dot: "bg-rose-500",
  },
};

const diffColour: Record<string, string> = {
  Beginner:
    "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60",
  Intermediate:
    "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60",
  Advanced:
    "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/60",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Props
───────────────────────────────────────────────────────────────────────────── */
export interface LessonsPageProps {
  selectedLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson | null) => void;
  completedLessons: string[];
  onToggleLesson: (lessonId: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onTakeQuiz?: (quizId: string) => void;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────────────────── */
export const Lessons: React.FC<LessonsPageProps> = ({
  selectedLesson,
  onSelectLesson,
  completedLessons,
  onToggleLesson,
  bookmarks,
  onToggleBookmark,
  onTakeQuiz,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    LessonCategory | "all"
  >("all");
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [practiceSelectedOption, setPracticeSelectedOption] = useState<
    string | null
  >(null);
  const [practiceChecked, setPracticeChecked] = useState(false);

  useEffect(() => {
    updateSEO({
      title: selectedLesson
        ? `${selectedLesson.title} | Lesson`
        : "Interactive Coding Lessons | DevTech",
      description:
        "Master modern programming through hands-on lessons, structured roadmaps, and instant-feedback quizzes.",
    });
    if (selectedLesson && selectedLesson.sections.length > 0) {
      setActiveSectionId(selectedLesson.sections[0].id);
      setPracticeSelectedOption(null);
      setPracticeChecked(false);
    }
  }, [selectedLesson]);

  // Lessons segmented by section
  const latestLessons = lessonsData.filter((l) => l.sectionGroup === "latest");
  const recommendedLessons = lessonsData.filter(
    (l) => l.sectionGroup === "recommended",
  );
  const popularLessons = lessonsData.filter(
    (l) => l.sectionGroup === "popular",
  );

  // Search filter
  const isSearching =
    searchQuery.trim().length > 0 || selectedCategory !== "all";
  const searchedLessons = lessonsData.filter((lesson) => {
    const matchesCategory =
      selectedCategory === "all" || lesson.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lesson.title.toLowerCase().includes(q) ||
      lesson.subtitle.toLowerCase().includes(q) ||
      lesson.category.toLowerCase().includes(q) ||
      lesson.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  /* ───────────────────────────────────────────────────────────────────────────
     1. Detailed Lesson Reading View
  ─────────────────────────────────────────────────────────────────────────── */
  if (selectedLesson) {
    const cc = catColour[selectedLesson.category] ?? catColour.javascript;
    const isCompleted = completedLessons.includes(selectedLesson.id);

    return (
      <div className="flex flex-col lg:flex-row gap-8 items-start animate-fadeIn">
        {/* Main Article Container */}
        <article className="flex-1 w-full min-w-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-sm overflow-hidden">
          {/* Header Strip */}
          <div className="px-6 sm:px-8 pt-7 pb-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
            <button
              onClick={() => onSelectLesson(null)}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors group cursor-pointer"
            >
              <span className="w-6 h-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center group-hover:border-emerald-400 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
              Back to all lessons
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-base font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${cc.bg} ${cc.text}`}
                >
                  {selectedLesson.category}
                </span>
                <span
                  className={`text-base font-bold px-2.5 py-1 rounded-full border ${diffColour[selectedLesson.difficulty] ?? ""}`}
                >
                  {selectedLesson.difficulty}
                </span>
                <span className="text-base text-slate-400 font-medium">
                  {selectedLesson.readTimeMinutes} min read
                </span>
                {isCompleted && (
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {selectedLesson.title}
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedLesson.subtitle}
              </p>
            </div>
          </div>

          {/* Lesson Body */}
          <div className="p-6 sm:p-8 space-y-10">
            {/* Key Takeaways */}
            {selectedLesson.keyTakeaways &&
              selectedLesson.keyTakeaways.length > 0 && (
                <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 space-y-3">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Key Takeaways
                  </h3>
                  <ul className="space-y-2">
                    {selectedLesson.keyTakeaways.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-emerald-950 dark:text-emerald-100 font-medium"
                      >
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Sections */}
            {selectedLesson.sections.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="space-y-4 scroll-mt-24"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {sec.title}
                </h2>
                <div className="text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </div>

                {/* Code Snippets */}
                {sec.codeSnippets?.map((snip, idx) => (
                  <div key={idx} className="space-y-2 my-4">
                    {snip.filename && (
                      <span className="text-base font-mono text-slate-400">
                        📄 {snip.filename}
                      </span>
                    )}
                    <CodeBlock code={snip.code} language={snip.language} />
                  </div>
                ))}

                {/* Pro Tip */}
                {sec.proTip && (
                  <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Pro Tip: </span>
                      {sec.proTip}
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* Practice Question */}
            {selectedLesson.practiceQuestion && (
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-500" /> Check Your
                  Knowledge
                </h3>

                <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
                    {selectedLesson.practiceQuestion.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedLesson.practiceQuestion.options.map((opt) => {
                      const isSelected = practiceSelectedOption === opt.id;
                      let cls =
                        "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-emerald-500";
                      if (practiceChecked) {
                        if (opt.isCorrect)
                          cls =
                            "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold";
                        else if (isSelected)
                          cls =
                            "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200";
                      } else if (isSelected) {
                        cls =
                          "border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 font-semibold";
                      }
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={practiceChecked}
                          onClick={() => setPracticeSelectedOption(opt.id)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm sm:text-base transition-all cursor-pointer disabled:cursor-default ${cls}`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 border transition-colors ${
                              isSelected
                                ? "bg-emerald-600 border-emerald-600 text-white"
                                : "border-slate-300 dark:border-slate-600 text-transparent"
                            }`}
                          >
                            {isSelected ? (
                              <Check className="w-3 h-3 text-white" />
                            ) : (
                              ""
                            )}
                          </span>
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    {!practiceChecked ? (
                      <button
                        disabled={!practiceSelectedOption}
                        onClick={() => setPracticeChecked(true)}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setPracticeChecked(false);
                          setPracticeSelectedOption(null);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" /> Try Again
                      </button>
                    )}
                  </div>

                  {practiceChecked && (
                    <div
                      className={`p-4 rounded-xl text-sm border flex items-start gap-3 ${
                        selectedLesson.practiceQuestion.options.find(
                          (o) => o.id === practiceSelectedOption,
                        )?.isCorrect
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                          : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200"
                      }`}
                    >
                      {selectedLesson.practiceQuestion.options.find(
                        (o) => o.id === practiceSelectedOption,
                      )?.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-bold mb-0.5">
                          {selectedLesson.practiceQuestion.options.find(
                            (o) => o.id === practiceSelectedOption,
                          )?.isCorrect
                            ? "Correct!"
                            : "Not quite."}
                        </p>
                        <p>{selectedLesson.practiceQuestion.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mark complete & Quiz action */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <button
                onClick={() => onToggleLesson(selectedLesson.id)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isCompleted
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />{" "}
                    Completed — Undo
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" /> Mark as Complete
                  </>
                )}
              </button>

              {selectedLesson.relatedQuizId && onTakeQuiz && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 flex-1">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Ready to test your knowledge?
                    </p>
                    <p className="text-base text-slate-500 dark:text-slate-400 mt-0.5">
                      Take a quick quiz based on this lesson.
                    </p>
                  </div>
                  <button
                    onClick={() => onTakeQuiz(selectedLesson.relatedQuizId!)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-base sm:text-sm font-bold shadow-sm shadow-indigo-600/20 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Take Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <LessonSidebar
          lesson={selectedLesson}
          activeSectionId={activeSectionId}
          onSelectSection={(id) => {
            setActiveSectionId(id);
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }}
          isCompleted={isCompleted}
          onToggleComplete={() => onToggleLesson(selectedLesson.id)}
          onBackToLessons={() => onSelectLesson(null)}
        />
      </div>
    );
  }

  /* ───────────────────────────────────────────────────────────────────────────
     2. Catalog View — Pixel-Perfect to Design Image
  ─────────────────────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-12 sm:space-y-16 animate-fadeIn pb-12">
      {/* ── Top Hero Section ── */}
      <section className="relative overflow-hidden pt-2 sm:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Interactive Coding Lessons
              <span className="block text-[#75869C] dark:text-slate-400 font-bold mt-1.5 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl">
                to Build Real-World Skills
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Master modern programming through hands-on lessons, structured
              roadmaps, and instant-feedback quizzes — from web development and
              databases to AI and problem solving.
            </p>

            {/* Quick search input */}
            <div className="pt-2 max-w-md">
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lessons (e.g. JavaScript, C, React, PHP)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Isometric 3D Laptop Illustration */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <LessonHeroIllustration />
          </div>
        </div>
      </section>

      {/* ── If Searching: Filtered Search Results ── */}
      {isSearching ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Search Results ({searchedLessons.length})
            </h2>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>

          {searchedLessons.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="font-bold text-slate-900 dark:text-white text-lg">
                No lessons found
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Try searching for another keyword like JavaScript, C, Laravel,
                or HTML.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isCompleted={completedLessons.includes(lesson.id)}
                  isBookmarked={bookmarks.includes(lesson.id)}
                  onToggleBookmark={onToggleBookmark}
                  onSelect={onSelectLesson}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ── Standard 3 Sections Matching User Image ── */
        <div className="space-y-12 sm:space-y-16">
          {/* Section 1: Latest Lessons */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Latest Lessons
              </h2>
              <button
                onClick={() => setSearchQuery(" ")}
                className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer group"
              >
                <span>See All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isCompleted={completedLessons.includes(lesson.id)}
                  isBookmarked={bookmarks.includes(lesson.id)}
                  onToggleBookmark={onToggleBookmark}
                  onSelect={onSelectLesson}
                />
              ))}
            </div>
          </section>

          {/* Section 2: Recommended Lessons */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Recommended Lessons
              </h2>
              <button
                onClick={() => setSearchQuery(" ")}
                className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer group"
              >
                <span>See All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isCompleted={completedLessons.includes(lesson.id)}
                  isBookmarked={bookmarks.includes(lesson.id)}
                  onToggleBookmark={onToggleBookmark}
                  onSelect={onSelectLesson}
                />
              ))}
            </div>
          </section>

          {/* Section 3: Popular Lessons */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Popular Lessons
              </h2>
              <button
                onClick={() => setSearchQuery(" ")}
                className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer group"
              >
                <span>See All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isCompleted={completedLessons.includes(lesson.id)}
                  isBookmarked={bookmarks.includes(lesson.id)}
                  onToggleBookmark={onToggleBookmark}
                  onSelect={onSelectLesson}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
