import React, { useState, useEffect, useCallback } from "react";
import { updateSEO } from "../utils/seo";
import { roadmapsData } from "../data/roadmaps";
import { Roadmap } from "../types/roadmap";
import { ProgressBar } from "../components/common/ProgressBar";

import {
  Globe,
  Layout,
  Code,
  Coffee,
  Server,
  Cpu,
  Search,
  X,
  Bookmark,
  FileText,
  Clock,
  ArrowLeft,
  ArrowRight,
  Play,
  Check,
  Lock,
  ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   Icon Components from Lucide
───────────────────────────────────────────────────────────────────────────── */
const icons: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-7 h-7" />,
  Layout: <Layout className="w-7 h-7" />,
  Code: <Code className="w-7 h-7" />,
  Coffee: <Coffee className="w-7 h-7" />,
  Server: <Server className="w-7 h-7" />,
  Cpu: <Cpu className="w-7 h-7" />,
};

/* ─────────────────────────────────────────────────────────────────────────────
   Difficulty colour system
───────────────────────────────────────────────────────────────────────────── */
const difficultyConfig = {
  Beginner: {
    pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60",
    dot: "bg-emerald-500",
  },
  Intermediate: {
    pill: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60",
    dot: "bg-indigo-500",
  },
  Advanced: {
    pill: "bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-400 border-rose-200 dark:border-rose-800/60",
    dot: "bg-rose-500",
  },
} as const;

/* ─────────────────────────────────────────────────────────────────────────────
   Step status config
───────────────────────────────────────────────────────────────────────────── */
const stepStatusConfig = {
  completed: {
    ring: "bg-emerald-500 border-emerald-500 shadow-emerald-500/30 shadow-md",
    card: "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/70 dark:border-emerald-800/50",
    badge:
      "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300/60 dark:border-emerald-800",
    badgeText: "✓ Completed",
    connector: "bg-emerald-400 dark:bg-emerald-600",
  },
  "in-progress": {
    ring: "bg-indigo-500 border-indigo-500 shadow-indigo-500/30 shadow-md",
    card: "bg-white dark:bg-slate-900 border-indigo-300/70 dark:border-indigo-700/60 shadow-lg shadow-indigo-500/5",
    badge:
      "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-300/60 dark:border-indigo-800",
    badgeText: "In Progress",
    connector: "bg-slate-200 dark:bg-slate-700",
  },
  next: {
    ring: "bg-white dark:bg-slate-800 border-amber-400 dark:border-amber-500 shadow-amber-400/20 shadow-md",
    card: "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80",
    badge:
      "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60",
    badgeText: "Next Up",
    connector: "bg-slate-200 dark:bg-slate-700",
  },
  locked: {
    ring: "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 opacity-70",
    card: "bg-slate-50/60 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800/60 opacity-70",
    badge:
      "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700",
    badgeText: "🔒 Locked",
    connector: "bg-slate-200 dark:bg-slate-700",
  },
} as const;

/* ─────────────────────────────────────────────────────────────────────────────
   Props
───────────────────────────────────────────────────────────────────────────── */
export interface RoadmapsPageProps {
  selectedRoadmap: Roadmap | null;
  onSelectRoadmap: (roadmap: Roadmap | null) => void;
  completedSteps: string[];
  onToggleStep: (stepId: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onOpenRelatedLesson?: (lessonId: string) => void;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────────────────── */
export const Roadmaps: React.FC<RoadmapsPageProps> = ({
  selectedRoadmap,
  onSelectRoadmap,
  completedSteps,
  onToggleStep,
  bookmarks,
  onToggleBookmark,
  onOpenRelatedLesson,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    updateSEO({
      title: selectedRoadmap
        ? `${selectedRoadmap.title} Roadmap`
        : "Developer Roadmaps",
      description:
        "Step-by-step developer roadmaps covering Frontend, Backend, DevOps, AI, and Fullstack systems.",
    });
  }, [selectedRoadmap]);

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredRoadmaps = roadmapsData.filter((r) => {
    const matchesDiff =
      selectedDifficulty === "All" || r.difficulty === selectedDifficulty;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q);
    return matchesDiff && matchesSearch;
  });

  /* ─── Detail View ─────────────────────────────────────────────────────── */
  if (selectedRoadmap) {
    return (
      <RoadmapDetail
        roadmap={selectedRoadmap}
        completedSteps={completedSteps}
        onToggleStep={onToggleStep}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark}
        onBack={() => onSelectRoadmap(null)}
        onOpenRelatedLesson={onOpenRelatedLesson}
      />
    );
  }

  /* ─── Catalog View ────────────────────────────────────────────────────── */
  return (
    <div className="space-y-10">
      {/* ── Section 1: Header + Search + Filters ── */}
      <div className="space-y-6">
        {/* Page title block */}
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-2 text-base font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            <span className="w-4 h-px bg-emerald-500" />
            Learning Paths
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500">
              {" "}
              Learning Path
            </span>
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Curated developer roadmaps — from your first line of HTML to
            shipping production software. Follow clear milestones, track your
            progress, and grow at your own pace.
          </p>
        </div>

        {/* Search + filter row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roadmaps…"
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

          {/* Difficulty filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3.5 py-2 rounded-xl text-base font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDifficulty === d
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-base text-slate-400 dark:text-slate-500">
          {filteredRoadmaps.length === roadmapsData.length
            ? `${roadmapsData.length} roadmaps available`
            : `${filteredRoadmaps.length} of ${roadmapsData.length} roadmaps`}
        </p>
      </div>

      {/* ── Section 2: Roadmap Cards ── */}
      {filteredRoadmaps.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-bold text-slate-900 dark:text-white text-lg">
            No roadmaps found
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-1">
            Try a different keyword or filter
          </p>
          <button
            onClick={() => {
              setSelectedDifficulty("All");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 text-lg font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRoadmaps.map((roadmap) => {
            const allStepIds = roadmap.milestones.flatMap((m) =>
              m.steps.map((s) => s.id),
            );
            const completedCount = allStepIds.filter((id) =>
              completedSteps.includes(id),
            ).length;
            const progress = allStepIds.length
              ? Math.round((completedCount / allStepIds.length) * 100)
              : 0;
            const dc =
              difficultyConfig[
                roadmap.difficulty as keyof typeof difficultyConfig
              ];
            const icon = icons[roadmap.iconName] ?? icons.Globe;
            const isBookmarked = bookmarks.includes(roadmap.id);

            return (
              <div
                key={roadmap.id}
                onClick={() => onSelectRoadmap(roadmap)}
                className="group relative flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-400/60 dark:hover:border-emerald-600/50 shadow-sm hover:shadow-xl hover:shadow-emerald-500/6 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Accent top line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 group-hover:h-1"
                  style={{ backgroundColor: roadmap.accentColor }}
                />

                {/* Icon + bookmark row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-2xl text-white shadow-md"
                    style={{ backgroundColor: roadmap.accentColor }}
                  >
                    {icon}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(roadmap.id);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title={isBookmarked ? "Remove bookmark" : "Bookmark"}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isBookmarked ? "fill-amber-400 text-amber-400" : ""}`}
                    />
                  </button>
                </div>

                {/* Title + description */}
                <div className="flex-1 space-y-1.5 mb-4">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                    {roadmap.title}
                  </h3>
                  <p className="text-lg text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {roadmap.subtitle}
                  </p>
                </div>

                {/* Difficulty + lesson count row */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${dc.pill}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${dc.dot}`} />
                    {roadmap.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                    <FileText className="w-3 h-3" />
                    {roadmap.totalSteps} lessons
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    ~{roadmap.estimatedWeeks}w
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span>
                      {completedCount} / {allStepIds.length} completed
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {progress}%
                    </span>
                  </div>
                  <ProgressBar
                    value={progress}
                    size="sm"
                    colorClass="from-emerald-500 to-indigo-500"
                  />
                </div>

                {/* Hover CTA arrow */}
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Section 3 — Roadmap Detail with Connected Milestone Timeline
───────────────────────────────────────────────────────────────────────────── */
interface RoadmapDetailProps {
  roadmap: Roadmap;
  completedSteps: string[];
  onToggleStep: (stepId: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onBack: () => void;
  onOpenRelatedLesson?: (lessonId: string) => void;
}

const RoadmapDetail: React.FC<RoadmapDetailProps> = ({
  roadmap,
  completedSteps,
  onToggleStep,
  bookmarks,
  onToggleBookmark,
  onBack,
  onOpenRelatedLesson,
}) => {
  const allSteps = roadmap.milestones.flatMap((m) => m.steps);
  const allStepIds = allSteps.map((s) => s.id);
  const completedCount = allStepIds.filter((id) =>
    completedSteps.includes(id),
  ).length;
  const progressPercent = allStepIds.length
    ? Math.round((completedCount / allStepIds.length) * 100)
    : 0;

  const icon = icons[roadmap.iconName] ?? icons.Globe;
  const isBookmarked = bookmarks.includes(roadmap.id);
  const dc =
    difficultyConfig[roadmap.difficulty as keyof typeof difficultyConfig];

  // Find the first non-completed step as "Continue Learning" target
  const nextStep = allSteps.find(
    (s) => !completedSteps.includes(s.id) && s.status !== "locked",
  );

  const handleContinue = useCallback(() => {
    if (nextStep) onToggleStep(nextStep.id);
  }, [nextStep, onToggleStep]);

  // Flatten all steps for the linear timeline (ignoring milestone grouping for visual flow)
  const timelineSteps = allSteps;

  return (
    <div className="space-y-8">
      {/* ── Back nav ── */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-lg font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group"
      >
        <span className="w-7 h-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center group-hover:border-emerald-400 dark:group-hover:border-emerald-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </span>
        Back to all roadmaps
      </button>

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-7 sm:p-10 shadow-md">
        {/* Decorative blobs */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ backgroundColor: roadmap.accentColor }}
        />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-8 blur-2xl pointer-events-none bg-indigo-500" />

        <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Icon */}
          <div
            className="flex items-center justify-center w-16 h-16 rounded-2xl text-white shadow-xl shrink-0"
            style={{ backgroundColor: roadmap.accentColor }}
          >
            <span className="scale-125">{icon}</span>
          </div>

          <div className="flex-1 space-y-4">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 text-base font-bold px-2.5 py-1 rounded-full border ${dc.pill}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dc.dot}`} />
                {roadmap.difficulty}
              </span>
              <span className="text-base font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {roadmap.category}
              </span>
              <span className="text-base font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                ~{roadmap.estimatedWeeks} weeks
              </span>
            </div>

            {/* Title + description */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {roadmap.title}
              </h1>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {roadmap.description}
              </p>
            </div>

            {/* Progress tracker */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2 max-w-md">
              <div className="flex items-center justify-between text-base font-semibold">
                <span className="text-slate-600 dark:text-slate-300">
                  Overall Progress
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {completedCount}/{allStepIds.length} steps · {progressPercent}
                  %
                </span>
              </div>
              <ProgressBar
                value={progressPercent}
                size="md"
                colorClass="from-emerald-500 to-indigo-500"
              />
            </div>

            {/* Action row */}
            <div className="flex items-center gap-3 flex-wrap pt-1">
              {nextStep && (
                <button
                  onClick={handleContinue}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Continue Learning
                </button>
              )}
              {progressPercent === 100 && (
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-lg font-bold border border-emerald-200 dark:border-emerald-800">
                  <Check className="w-4 h-4" /> Roadmap Completed!
                </span>
              )}
              <button
                onClick={() => onToggleBookmark(roadmap.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-lg font-semibold transition-all cursor-pointer ${
                  isBookmarked
                    ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-400"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? "fill-amber-400 text-amber-400" : ""}`}
                />
                {isBookmarked ? "Bookmarked" : "Save Roadmap"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Outcomes + Prerequisites ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <h3 className="text-lg font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-base">
              ✓
            </span>
            What You'll Master
          </h3>
          <ul className="space-y-2">
            {roadmap.learningOutcomes.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-lg text-slate-600 dark:text-slate-300"
              >
                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <h3 className="text-lg font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-base">
              →
            </span>
            Prerequisites
          </h3>
          <ul className="space-y-2">
            {roadmap.prerequisites.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-lg text-slate-600 dark:text-slate-300"
              >
                <span className="mt-0.5 shrink-0 text-indigo-500 font-bold">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Section 3: Connected Learning Timeline ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Learning Milestones
          </h2>
          <span className="text-base font-semibold text-slate-500 dark:text-slate-400">
            {completedCount} of {allStepIds.length} completed
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {timelineSteps.map((step, idx) => {
            const isCompleted = completedSteps.includes(step.id);
            const effectiveStatus = isCompleted
              ? "completed"
              : (step.status ?? "locked");
            const cfg =
              stepStatusConfig[
                effectiveStatus as keyof typeof stepStatusConfig
              ] ?? stepStatusConfig.locked;
            const isLast = idx === timelineSteps.length - 1;
            const isLocked = effectiveStatus === "locked" && !isCompleted;
            const isInProgress = effectiveStatus === "in-progress";

            return (
              <div key={step.id} className="relative flex gap-5">
                {/* ── Left gutter: circle + connector line ── */}
                <div className="flex flex-col items-center">
                  {/* Step circle */}
                  <button
                    type="button"
                    disabled={isLocked}
                    onClick={() => !isLocked && onToggleStep(step.id)}
                    className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${cfg.ring} ${isLocked ? "cursor-not-allowed" : "cursor-pointer hover:scale-110"}`}
                    title={
                      isLocked
                        ? "Complete previous steps to unlock"
                        : isCompleted
                          ? "Mark as incomplete"
                          : "Mark as complete"
                    }
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white stroke-[3]" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4 text-slate-400" />
                    ) : isInProgress ? (
                      <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
                    ) : (
                      <span className="text-lg font-extrabold text-slate-500 dark:text-slate-400">
                        {step.order}
                      </span>
                    )}
                  </button>

                  {/* Connector line */}
                  {!isLast && (
                    <div
                      className={`w-0.5 flex-1 min-h-[2rem] mt-1 rounded-full ${cfg.connector}`}
                    />
                  )}
                </div>

                {/* ── Right: step card ── */}
                <div
                  className={`flex-1 mb-5 p-5 rounded-2xl border transition-all ${cfg.card}`}
                >
                  {/* Step header */}
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          {step.category}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600 text-base">
                          ·
                        </span>
                        <span className="text-[11px] text-slate-400">
                          ~{step.estimatedHours} hrs
                        </span>

                        {/* Status badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full border ${cfg.badge}`}
                        >
                          {isInProgress && (
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                          )}
                          {cfg.badgeText}
                        </span>
                      </div>
                      <h3
                        className={`text-base font-extrabold leading-snug ${
                          isCompleted
                            ? "line-through text-slate-400 dark:text-slate-500"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {step.description}
                  </p>

                  {/* Key topics */}
                  {step.keyTopics && step.keyTopics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {step.keyTopics.map((topic, i) => (
                        <span
                          key={i}
                          className="text-base px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 font-mono"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Resources + lesson CTA */}
                  <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-3 flex-wrap">
                      {step.resources?.map((res) => (
                        <a
                          key={res.id}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-base text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                        >
                          {res.title}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {!isLocked && (
                        <button
                          type="button"
                          onClick={() => onToggleStep(step.id)}
                          className={`text-base font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            isCompleted
                              ? "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
                              : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20"
                          }`}
                        >
                          {isCompleted ? "Undo ✓" : "Mark Done ✓"}
                        </button>
                      )}
                      {step.relatedLessonId && onOpenRelatedLesson && (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenRelatedLesson(step.relatedLessonId!)
                          }
                          className="text-base font-bold px-3 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all cursor-pointer"
                        >
                          Open Lesson →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Completion Banner ── */}
        {progressPercent === 100 && (
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-indigo-50 dark:from-emerald-950/30 dark:to-indigo-950/30 border border-emerald-200 dark:border-emerald-800/60">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Roadmap Complete!
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
              Excellent work! You've completed the entire{" "}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {roadmap.title}
              </span>{" "}
              roadmap. Explore another path or take a quiz to test your skills.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
