import React from "react";
import { Lesson } from "../../types/lesson";
import { Badge } from "../common/Badge";

export interface LessonCardProps {
  lesson: Lesson;
  isCompleted?: boolean;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
  onSelect: (lesson: Lesson) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted = false,
  isBookmarked = false,
  onToggleBookmark,
  onSelect,
}) => {
  const difficultyVariant = {
    Beginner: "success" as const,
    Intermediate: "info" as const,
    Advanced: "purple" as const,
  }[lesson.difficulty];

  return (
    <div
      onClick={() => onSelect(lesson)}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div>
        {/* Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="default" size="sm">
              {lesson.category.toUpperCase()}
            </Badge>
            <Badge variant={difficultyVariant} size="sm">
              {lesson.difficulty}
            </Badge>
            {isCompleted && (
              <Badge variant="success" size="sm">
                Completed
              </Badge>
            )}
          </div>

          {onToggleBookmark && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(lesson.id);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isBookmarked ? "Remove bookmark" : "Bookmark lesson"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 ${isBookmarked ? "fill-amber-400 text-amber-400" : "fill-none"}`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
          {lesson.title}
        </h3>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {lesson.subtitle}
        </p>

        {/* Tags */}
        {lesson.tags && lesson.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {lesson.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Meta */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-base text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          {lesson.readTimeMinutes} min read
        </span>

        <span className="font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
          Read Lesson →
        </span>
      </div>
    </div>
  );
};
