import React from "react";
import { Bookmark, Clock, FileText } from "lucide-react";
import { Roadmap } from "../../types/roadmap";
import { Badge } from "../common/Badge";
import { ProgressBar } from "../common/ProgressBar";

export interface RoadmapCardProps {
  roadmap: Roadmap;
  progressPercent?: number;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
  onSelect: (roadmap: Roadmap) => void;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({
  roadmap,
  progressPercent = 0,
  isBookmarked = false,
  onToggleBookmark,
  onSelect,
}) => {
  const difficultyBadgeVariant = {
    Beginner: "success" as const,
    Intermediate: "info" as const,
    Advanced: "purple" as const,
  }[roadmap.difficulty];

  return (
    <div
      onClick={() => onSelect(roadmap)}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: roadmap.accentColor }}
      />

      <div>
        {/* Header Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="default" size="sm">
              {roadmap.category.toUpperCase()}
            </Badge>
            <Badge variant={difficultyBadgeVariant} size="sm">
              {roadmap.difficulty}
            </Badge>
          </div>

          {onToggleBookmark && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(roadmap.id);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isBookmarked ? "Remove bookmark" : "Bookmark roadmap"}
            >
              <Bookmark
                className={`w-4 h-4 transition-colors ${isBookmarked ? "fill-amber-400 text-amber-400" : "fill-none"}`}
              />
            </button>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
          {roadmap.title}
        </h3>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {roadmap.subtitle}
        </p>
      </div>

      {/* Meta & Progress */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-base text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            ~{roadmap.estimatedWeeks} weeks
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            {roadmap.totalSteps} learning steps
          </span>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          value={progressPercent}
          showPercentage={true}
          size="sm"
          colorClass="from-emerald-500 to-indigo-600"
        />
      </div>
    </div>
  );
};
