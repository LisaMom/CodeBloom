import React from "react";
import { Eye, Bookmark } from "lucide-react";
import { Lesson } from "../../types/lesson";
import { LessonBanner } from "./LessonBanner";

export interface LessonCardProps {
  lesson: Lesson;
  isCompleted?: boolean;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
  onSelect: (lesson: Lesson) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isBookmarked = false,
  onToggleBookmark,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(lesson)}
      className="group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div>
        {/* Banner with Technology Graphics */}
        <LessonBanner
          bannerType={lesson.bannerType || lesson.category}
          category={lesson.category}
          title={lesson.title}
        />

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mt-3 line-clamp-1">
          {lesson.title}
        </h3>

        {/* Subtitle / Description snippet */}
        <p className="mt-1 text-base sm:text-sm text-slate-400 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {lesson.subtitle}
        </p>
      </div>

      {/* Card Footer: Views on Left | Free Pill + Bookmark on Right */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between text-base text-slate-400 dark:text-slate-400">
        {/* Left: Eye icon + Views */}
        <div className="flex items-center gap-1.5 font-medium">
          <Eye className="w-4 h-4 text-slate-400" />
          <span>{lesson.viewsCount ?? 390} views</span>
        </div>

        {/* Right: Free badge + Bookmark button */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0f172a] dark:bg-slate-800 text-white tracking-wide">
            Free
          </span>

          {onToggleBookmark && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(lesson.id);
              }}
              className="p-1 rounded-md text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={isBookmarked ? "Remove bookmark" : "Bookmark lesson"}
              aria-label="Bookmark lesson"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isBookmarked
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-400"
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
