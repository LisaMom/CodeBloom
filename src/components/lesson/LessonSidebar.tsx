import React from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Lesson } from "../../types/lesson";
import { Button } from "../common/Button";

export interface LessonSidebarProps {
  lesson: Lesson;
  activeSectionId?: string;
  onSelectSection: (sectionId: string) => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onBackToLessons: () => void;
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({
  lesson,
  activeSectionId,
  onSelectSection,
  isCompleted,
  onToggleComplete,
  onBackToLessons,
}) => {
  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      {/* Back Button */}
      <button
        onClick={onBackToLessons}
        className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all lessons
      </button>

      {/* Completion status widget */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <span className="text-base font-bold uppercase tracking-wider text-slate-400">
          Lesson Status
        </span>
        <Button
          variant={isCompleted ? "secondary" : "primary"}
          size="sm"
          className="w-full"
          onClick={onToggleComplete}
          leftIcon={
            isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : undefined
          }
        >
          {isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
        </Button>
      </div>

      {/* Table of contents */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <h4 className="text-base font-bold uppercase tracking-wider text-slate-400">
          On this page
        </h4>
        <nav className="flex flex-col space-y-1">
          {lesson.sections.map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? "font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                {sec.title}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Related Quiz or Roadmap */}
      {lesson.tags && lesson.tags.length > 0 && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <span className="text-base font-bold uppercase tracking-wider text-slate-400">
            Tags
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {lesson.tags.map((t, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
