import React, { useState, useEffect } from "react";
import { updateSEO } from "../utils/seo";
import { roadmapsData } from "../data/roadmaps";
import { Roadmap, RoadmapCategory } from "../types/roadmap";
import { RoadmapCard } from "../components/roadmap/RoadmapCard";
import { RoadmapStep } from "../components/roadmap/RoadmapStep";
import { SearchBar } from "../components/common/SearchBar";
import { SectionHeading } from "../components/common/SectionHeading";
import { ProgressBar } from "../components/common/ProgressBar";
import { Button } from "../components/common/Button";

export interface RoadmapsPageProps {
  selectedRoadmap: Roadmap | null;
  onSelectRoadmap: (roadmap: Roadmap | null) => void;
  completedSteps: string[];
  onToggleStep: (stepId: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onOpenRelatedLesson?: (lessonId: string) => void;
}

export const Roadmaps: React.FC<RoadmapsPageProps> = ({
  selectedRoadmap,
  onSelectRoadmap,
  completedSteps,
  onToggleStep,
  bookmarks,
  onToggleBookmark,
  onOpenRelatedLesson,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    RoadmapCategory | "all"
  >("all");
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

  const categories: { id: RoadmapCategory | "all"; label: string }[] = [
    { id: "all", label: "All Roadmaps" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "devops", label: "DevOps & Cloud" },
    { id: "ai", label: "AI Engineering" },
  ];

  // Filter roadmaps
  const filteredRoadmaps = roadmapsData.filter((roadmap) => {
    const matchesCategory =
      selectedCategory === "all" || roadmap.category === selectedCategory;
    const matchesSearch =
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.milestones.some((m) =>
        m.steps.some(
          (s) =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.keyTopics.some((t) =>
              t.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
        ),
      );
    return matchesCategory && matchesSearch;
  });

  // If a specific roadmap is open in detail view:
  if (selectedRoadmap) {
    const allStepIds = selectedRoadmap.milestones.flatMap((m) =>
      m.steps.map((s) => s.id),
    );
    const completedCount = allStepIds.filter((id) =>
      completedSteps.includes(id),
    ).length;
    const progressPercent = allStepIds.length
      ? Math.round((completedCount / allStepIds.length) * 100)
      : 0;

    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelectRoadmap(null)}
            leftIcon={
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            }
          >
            Back to all roadmaps
          </Button>

          <button
            onClick={() => onToggleBookmark(selectedRoadmap.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-base font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          >
            <svg
              className={`w-4 h-4 ${
                bookmarks.includes(selectedRoadmap.id)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-none"
              }`}
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
            <span>
              {bookmarks.includes(selectedRoadmap.id)
                ? "Bookmarked"
                : "Bookmark"}
            </span>
          </button>
        </div>

        {/* Roadmap Detail Hero Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
              {selectedRoadmap.category.toUpperCase()}
            </span>
            <span className="text-base font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {selectedRoadmap.difficulty}
            </span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {selectedRoadmap.title}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {selectedRoadmap.description}
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between text-base font-medium text-slate-600 dark:text-slate-400">
              <span>Overall Path Progress</span>
              <span className="font-bold">
                {completedCount} of {allStepIds.length} steps completed (
                {progressPercent}%)
              </span>
            </div>
            <ProgressBar value={progressPercent} size="md" />
          </div>

          {/* Outcomes & Prerequisites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 space-y-2">
              <h4 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                What You Will Master
              </h4>
              <ul className="space-y-1 text-base text-slate-600 dark:text-slate-300">
                {selectedRoadmap.learningOutcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 space-y-2">
              <h4 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Prerequisites
              </h4>
              <ul className="space-y-1 text-base text-slate-600 dark:text-slate-300">
                {selectedRoadmap.prerequisites.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Milestones & Steps Timeline */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Curriculum Milestones
          </h2>

          <div className="space-y-10">
            {selectedRoadmap.milestones.map((milestone) => (
              <div key={milestone.id} className="space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-base flex items-center justify-center font-bold">
                      {milestone.order}
                    </span>
                    {milestone.title}
                  </h3>
                  <p className="text-base text-slate-500 dark:text-slate-400 mt-0.5">
                    {milestone.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {milestone.steps.map((step) => (
                    <RoadmapStep
                      key={step.id}
                      step={step}
                      isCompleted={completedSteps.includes(step.id)}
                      onToggleComplete={onToggleStep}
                      onOpenRelatedLesson={onOpenRelatedLesson}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Roadmaps catalog view:
  return (
    <div className="space-y-8">
      <SectionHeading
        badge="Career Roadmaps"
        title="Choose Your Developer Journey"
        subtitle="Step-by-step career blueprints curated by staff engineers and updated for the latest industry standards."
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Search */}
        <div className="w-full sm:flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search roadmaps by title, technology, or skills..."
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
      {filteredRoadmaps.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            No roadmaps found
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            return (
              <RoadmapCard
                key={roadmap.id}
                roadmap={roadmap}
                progressPercent={progress}
                isBookmarked={bookmarks.includes(roadmap.id)}
                onToggleBookmark={onToggleBookmark}
                onSelect={onSelectRoadmap}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
