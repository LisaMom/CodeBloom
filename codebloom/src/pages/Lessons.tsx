import React, { useState, useEffect } from "react";
import { updateSEO } from "../utils/seo";
import { lessonsData } from "../data/lessons";
import { Lesson, LessonCategory } from "../types/lesson";
import { LessonCard } from "../components/lesson/LessonCard";
import { LessonSidebar } from "../components/lesson/LessonSidebar";
import { CodeBlock } from "../components/lesson/CodeBlock";
import { SearchBar } from "../components/common/SearchBar";
import { SectionHeading } from "../components/common/SectionHeading";
import { Button } from "../components/common/Button";

export interface LessonsPageProps {
  selectedLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson | null) => void;
  completedLessons: string[];
  onToggleLesson: (lessonId: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onTakeQuiz?: (quizId: string) => void;
}

export const Lessons: React.FC<LessonsPageProps> = ({
  selectedLesson,
  onSelectLesson,
  completedLessons,
  onToggleLesson,
  bookmarks,
  onToggleBookmark,
  onTakeQuiz,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    LessonCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [practiceSelectedOption, setPracticeSelectedOption] = useState<
    string | null
  >(null);
  const [practiceChecked, setPracticeChecked] = useState(false);

  useEffect(() => {
    updateSEO({
      title: selectedLesson
        ? `${selectedLesson.title} | Lesson`
        : "Developer Lessons",
      description:
        "Concise, practical lessons on React, TypeScript, Modern CSS, System Design, and Backend patterns.",
    });
    if (selectedLesson && selectedLesson.sections.length > 0) {
      setActiveSectionId(selectedLesson.sections[0].id);
      setPracticeSelectedOption(null);
      setPracticeChecked(false);
    }
  }, [selectedLesson]);

  const categories: { id: LessonCategory | "all"; label: string }[] = [
    { id: "all", label: "All Lessons" },
    { id: "javascript", label: "JavaScript" },
    { id: "typescript", label: "TypeScript" },
    { id: "react", label: "React" },
    { id: "css", label: "Modern CSS" },
  ];

  const filteredLessons = lessonsData.filter((lesson) => {
    const matchesCategory =
      selectedCategory === "all" || lesson.category === selectedCategory;
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  // If a lesson is being read:
  if (selectedLesson) {
    const isCompleted = completedLessons.includes(selectedLesson.id);

    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Layout with article content and sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Article Content */}
          <article className="flex-1 w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            {/* Header info */}
            <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
                  {selectedLesson.category.toUpperCase()}
                </span>
                <span className="text-base font-semibold text-slate-500 dark:text-slate-400">
                  {selectedLesson.readTimeMinutes} min read
                </span>
                <span className="text-base text-slate-400">
                  • Published {selectedLesson.publishedAt}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {selectedLesson.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedLesson.subtitle}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {selectedLesson.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {sec.title}
                  </h2>
                  <div className="text-lg sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {sec.content}
                  </div>

                  {/* Code snippets */}
                  {sec.codeSnippets &&
                    sec.codeSnippets.map((snippet, idx) => (
                      <div key={idx} className="space-y-2">
                        <CodeBlock
                          code={snippet.code}
                          language={snippet.language}
                          filename={snippet.filename}
                        />
                        {snippet.explanation && (
                          <p className="text-base text-slate-500 dark:text-slate-400 italic">
                            {snippet.explanation}
                          </p>
                        )}
                      </div>
                    ))}

                  {/* Pro Tip Box */}
                  {sec.proTip && (
                    <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-base sm:text-lg text-amber-900 dark:text-amber-200 flex gap-3">
                      <span className="text-lg">💡</span>
                      <div>
                        <strong className="block font-bold">Pro Tip:</strong>
                        <span>{sec.proTip}</span>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Interactive Practice Question */}
            {selectedLesson.practiceQuestion && (
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-base">✏️</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Interactive Practice Question
                  </h3>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
                  <p className="text-lg sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                    {selectedLesson.practiceQuestion.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedLesson.practiceQuestion.options.map((opt) => {
                      const isSelected = practiceSelectedOption === opt.id;
                      let btnStyle =
                        "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-emerald-500";

                      if (practiceChecked) {
                        if (opt.isCorrect) {
                          btnStyle =
                            "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold";
                        } else if (isSelected && !opt.isCorrect) {
                          btnStyle =
                            "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200";
                        }
                      } else if (isSelected) {
                        btnStyle =
                          "border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 font-semibold";
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            if (!practiceChecked) {
                              setPracticeSelectedOption(opt.id);
                            }
                          }}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-left text-lg transition-all cursor-pointer ${btnStyle}`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-base font-bold shrink-0 border transition-colors ${
                              isSelected
                                ? "bg-emerald-600 border-emerald-600 text-white"
                                : "border-slate-300 dark:border-slate-600 text-slate-400"
                            }`}
                          >
                            {isSelected ? "✓" : ""}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    {!practiceChecked ? (
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={!practiceSelectedOption}
                        onClick={() => setPracticeChecked(true)}
                      >
                        Check Answer
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPracticeChecked(false);
                          setPracticeSelectedOption(null);
                        }}
                      >
                        Reset / Try Again
                      </Button>
                    )}
                  </div>

                  {practiceChecked && (
                    <div
                      className={`p-4 rounded-xl text-base sm:text-lg border animate-fadeIn ${
                        selectedLesson.practiceQuestion.options.find(
                          (o) => o.id === practiceSelectedOption,
                        )?.isCorrect
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                          : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200"
                      }`}
                    >
                      <p className="font-bold mb-1">
                        {selectedLesson.practiceQuestion.options.find(
                          (o) => o.id === practiceSelectedOption,
                        )?.isCorrect
                          ? "✓ Correct!"
                          : "✗ Incorrect."}
                      </p>
                      <p>{selectedLesson.practiceQuestion.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Next step: Quiz or next lesson CTA */}
            {selectedLesson.relatedQuizId && onTakeQuiz && (
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Ready to validate what you learned?
                  </h4>
                  <p className="text-base text-slate-500 dark:text-slate-400 mt-0.5">
                    Test your understanding with a quick 4-question interactive
                    quiz.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onTakeQuiz(selectedLesson.relatedQuizId!)}
                >
                  Take Related Quiz
                </Button>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <LessonSidebar
            lesson={selectedLesson}
            activeSectionId={activeSectionId}
            onSelectSection={(id) => {
              setActiveSectionId(id);
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            isCompleted={isCompleted}
            onToggleComplete={() => onToggleLesson(selectedLesson.id)}
            onBackToLessons={() => onSelectLesson(null)}
          />
        </div>
      </div>
    );
  }

  // Catalog view
  return (
    <div className="space-y-8">
      <SectionHeading
        badge="Engineering Lessons"
        title="Bite-Sized Practical Lessons"
        subtitle="Master real-world design patterns, language subtleties, and optimization techniques."
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Search */}
        <div className="w-full sm:flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search lessons by topic, keyword, or concept..."
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-base font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filteredLessons.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            No lessons found
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-1">
            Try adjusting your search criteria or selecting a different
            category.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLessons.map((lesson) => (
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
  );
};
