import React from "react";
import { Check, Lock, ExternalLink } from "lucide-react";
import { RoadmapStep as RoadmapStepType } from "../../types/roadmap";

export interface RoadmapStepProps {
  step: RoadmapStepType;
  isCompleted: boolean;
  onToggleComplete: (stepId: string) => void;
  onOpenRelatedLesson?: (lessonId: string) => void;
}

export const RoadmapStep: React.FC<RoadmapStepProps> = ({
  step,
  isCompleted,
  onToggleComplete,
  onOpenRelatedLesson,
}) => {
  const currentStatus = isCompleted ? "completed" : step.status || "next";
  const isLocked = currentStatus === "locked";

  return (
    <div
      className={`relative flex gap-4 p-5 rounded-2xl border transition-all ${
        isCompleted
          ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40"
          : isLocked
            ? "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-85"
            : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
      }`}
    >
      {/* Checkbox / Step Number / Lock */}
      <button
        type="button"
        disabled={isLocked && !isCompleted}
        onClick={() => onToggleComplete(step.id)}
        className={`w-7 h-7 mt-0.5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
          isLocked && !isCompleted
            ? "border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            : isCompleted
              ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/25 cursor-pointer"
              : "border-slate-300 dark:border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-500 cursor-pointer"
        }`}
        title={
          isLocked && !isCompleted
            ? "Complete previous milestones to unlock"
            : isCompleted
              ? "Mark as incomplete"
              : "Mark as complete"
        }
      >
        {isCompleted ? (
          <Check className="w-4 h-4 stroke-[3]" />
        ) : isLocked ? (
          <Lock className="w-3.5 h-3.5" />
        ) : (
          <span className="text-base font-bold">{step.order}</span>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 space-y-2.5">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {step.category}
              </span>
              <span className="text-base text-slate-400">
                • ~{step.estimatedHours} hrs
              </span>

              {/* Explicit Milestone Status Badge */}
              {currentStatus === "completed" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
                  <Check className="w-3 h-3 stroke-[3]" /> Completed
                </span>
              )}
              {currentStatus === "in-progress" && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-300/60 dark:border-indigo-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                  In progress
                </span>
              )}
              {currentStatus === "next" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                  Next
                </span>
              )}
              {currentStatus === "locked" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              )}
            </div>
            <h4
              className={`text-base font-bold mt-1 ${
                isCompleted
                  ? "text-slate-500 dark:text-slate-400 line-through"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              {step.title}
            </h4>
          </div>
        </div>

        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {step.description}
        </p>

        {/* Key topics list */}
        {step.keyTopics && step.keyTopics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {step.keyTopics.map((topic, i) => (
              <span
                key={i}
                className="text-base px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 font-mono"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Resources & jump button */}
        <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-base">
          {step.resources && step.resources.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                Resources:
              </span>
              {step.resources.map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  {res.title}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}

          {step.relatedLessonId && onOpenRelatedLesson && (
            <button
              type="button"
              onClick={() => onOpenRelatedLesson(step.relatedLessonId!)}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer ml-auto"
            >
              Open Lesson →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
