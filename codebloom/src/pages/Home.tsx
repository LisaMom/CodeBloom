import React, { useEffect } from "react";
import { updateSEO } from "../utils/seo";
import { roadmapsData } from "../data/roadmaps";
import { lessonsData } from "../data/lessons";
import {
  popularCoursesData,
  featuredRoadmapPaths,
  PopularCourse,
  FeaturedRoadmapPath,
} from "../data/courses";
import { Button } from "../components/common/Button";
import { Roadmap } from "../types/roadmap";
import { Lesson } from "../types/lesson";

export interface HomeProps {
  onNavigate: (page: string) => void;
  onSelectRoadmap: (roadmap: Roadmap) => void;
  onSelectLesson: (lesson: Lesson) => void;
  completedSteps: string[];
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onSelectRoadmap,
  onSelectLesson,
  completedSteps,
}) => {
  useEffect(() => {
    updateSEO({
      title: "Master Modern Tech Careers with Interactive Roadmaps",
      description:
        "Step-by-step developer roadmaps, interactive coding lessons, and self-assessment quizzes for modern software engineers.",
    });
  }, []);

  const handleRoadmapClick = (path: FeaturedRoadmapPath) => {
    const roadmap = roadmapsData.find((r) => r.id === path.roadmapId);
    if (roadmap) {
      onSelectRoadmap(roadmap);
    } else {
      onNavigate("roadmaps");
    }
  };

  const handleCourseClick = (course: PopularCourse) => {
    if (course.targetLessonId) {
      const lesson = lessonsData.find((l) => l.id === course.targetLessonId);
      if (lesson) {
        onSelectLesson(lesson);
        return;
      }
    }
    if (course.targetRoadmapId) {
      const roadmap = roadmapsData.find((r) => r.id === course.targetRoadmapId);
      if (roadmap) {
        onSelectRoadmap(roadmap);
        return;
      }
    }
    onNavigate("lessons");
  };

  const renderRoadmapIcon = (type: FeaturedRoadmapPath["iconType"]) => {
    switch (type) {
      case "globe":
        return (
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
              <path strokeWidth="1.8" d="M3.6 9h16.8M3.6 15h16.8" />
              <ellipse cx="12" cy="12" rx="4.5" ry="9" strokeWidth="1.8" />
            </svg>
          </div>
        );
      case "java":
        return (
          <div className="w-12 h-12 rounded-full bg-[#6366F1] text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 2v2M10 2v2M14 2v2"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case "python":
        return (
          <div className="w-12 h-12 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg className="w-7 h-7" viewBox="0 0 110 110" fill="none">
              <path
                d="M54.5 10c-14.8 0-23.7 6.4-23.7 18.7h23.7v3.5H20.7C8.5 32.2 0 40.5 0 55.4c0 14.2 9.5 22.4 22.4 22.4h7.1v-10.3c0-8.2 6.9-14.9 15.3-14.9h23.7c6.7 0 12.1-5.5 12.1-12.1V18.7C80.6 6.3 69.3 10 54.5 10zm-12.9 7.4a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2z"
                fill="#387EB8"
              />
              <path
                d="M55.5 100c14.8 0 23.7-6.4 23.7-18.7h-23.7v-3.5h33.8c12.2 0 20.7-8.3 20.7-23.2 0-14.2-9.5-22.4-22.4-22.4h-7.1v10.3c0 8.2-6.9 14.9-15.3 14.9H41.5c-6.7 0-12.1 5.5-12.1 12.1v21.8c0 12.4 11.3 8.7 26.1 8.7zm12.9-7.4a4.1 4.1 0 1 1 0-8.2 4.1 4.1 0 0 1 0 8.2z"
                fill="#FFE052"
              />
            </svg>
          </div>
        );
      case "react":
        return (
          <div className="w-12 h-12 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none">
              <ellipse
                cx="12"
                cy="12"
                rx="10"
                ry="4.2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <ellipse
                cx="12"
                cy="12"
                rx="10"
                ry="4.2"
                transform="rotate(60 12 12)"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <ellipse
                cx="12"
                cy="12"
                rx="10"
                ry="4.2"
                transform="rotate(120 12 12)"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
        );
    }
  };

  const renderCourseIcon = (type: PopularCourse["iconType"]) => {
    switch (type) {
      case "javascript":
        return (
          <div className="w-11 h-11 rounded-xl bg-[#F7DF1E] flex items-center justify-center font-black text-black text-lg shadow-xs select-none">
            JS
          </div>
        );
      case "html-css":
        return (
          <div className="w-11 h-11 rounded-xl bg-[#E44D26] flex items-center justify-center text-white font-black text-xl shadow-xs select-none">
            5
          </div>
        );
      case "react":
        return (
          <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/70 dark:border-cyan-800/60 flex items-center justify-center text-[#00D8FE] shadow-xs">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
              <ellipse
                cx="12"
                cy="12"
                rx="9.5"
                ry="3.8"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <ellipse
                cx="12"
                cy="12"
                rx="9.5"
                ry="3.8"
                transform="rotate(60 12 12)"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <ellipse
                cx="12"
                cy="12"
                rx="9.5"
                ry="3.8"
                transform="rotate(120 12 12)"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="12" r="1.8" fill="currentColor" />
            </svg>
          </div>
        );
      case "python":
        return (
          <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shadow-xs">
            <svg className="w-6 h-6" viewBox="0 0 110 110" fill="none">
              <path
                d="M54.5 10c-14.8 0-23.7 6.4-23.7 18.7h23.7v3.5H20.7C8.5 32.2 0 40.5 0 55.4c0 14.2 9.5 22.4 22.4 22.4h7.1v-10.3c0-8.2 6.9-14.9 15.3-14.9h23.7c6.7 0 12.1-5.5 12.1-12.1V18.7C80.6 6.3 69.3 10 54.5 10zm-12.9 7.4a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2z"
                fill="#387EB8"
              />
              <path
                d="M55.5 100c14.8 0 23.7-6.4 23.7-18.7h-23.7v-3.5h33.8c12.2 0 20.7-8.3 20.7-23.2 0-14.2-9.5-22.4-22.4-22.4h-7.1v10.3c0 8.2-6.9 14.9-15.3 14.9H41.5c-6.7 0-12.1 5.5-12.1 12.1v21.8c0 12.4 11.3 8.7 26.1 8.7zm12.9-7.4a4.1 4.1 0 1 1 0-8.2 4.1 4.1 0 0 1 0 8.2z"
                fill="#FFE052"
              />
            </svg>
          </div>
        );
      case "git":
        return (
          <div className="w-11 h-11 rounded-xl bg-[#6366F1] flex items-center justify-center text-white shadow-xs">
            <svg
              className="w-6 h-6 stroke-[2.2]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 9l-4 3 4 3m8-6l4 3-4 3m-5-9v12"
              />
            </svg>
          </div>
        );
      case "database":
        return (
          <div className="w-11 h-11 rounded-xl bg-[#0D9488] flex items-center justify-center text-white shadow-xs">
            <svg
              className="w-6 h-6 stroke-[2]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <ellipse cx="12" cy="5" rx="8" ry="3" />
              <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
              <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-base font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Learn · Practice · Grow</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Learn to Code. <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">
                Build Your Future.
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Follow clear roadmaps, practice with hands-on lessons, and test
              your skills one step at a time.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate("roadmaps")}
                rightIcon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                }
              >
                Start Learning
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate("roadmaps")}
              >
                Explore Roadmaps
              </Button>
            </div>

            {/* Metric counters */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  50K+
                </p>
                <p className="text-base text-slate-500 dark:text-slate-400 mt-0.5">
                  Active Learners
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  100%
                </p>
                <p className="text-base text-slate-500 dark:text-slate-400 mt-0.5">
                  Free &amp; Open Source
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  4.9/5
                </p>
                <p className="text-base text-slate-500 dark:text-slate-400 mt-0.5">
                  Learner Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl bg-gradient-to-tr from-slate-900 to-indigo-950 p-2">
              <img
                src="/images/roadmap-illustration.svg"
                alt="DevTech Interactive Learning Path"
                className="w-full h-auto rounded-2xl object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 1. Featured Roadmaps Section: Choose Your Learning Path */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80 shadow-2xs">
              <span className="text-emerald-600 dark:text-emerald-400">✨</span>
              <span>FEATURED ROADMAPS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Choose Your Learning Path
            </h2>
            <p className="text-lg sm:text-base text-slate-500 dark:text-slate-400">
              Follow structured roadmaps to build your skills from beginner to
              advanced.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("roadmaps")}
            className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>View All Roadmaps</span>
            <span className="text-base font-bold">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredRoadmapPaths.map((path) => (
            <div
              key={path.id}
              onClick={() => handleRoadmapClick(path)}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center gap-3.5">
                  {renderRoadmapIcon(path.iconType)}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {path.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {path.level === "Beginner" ? (
                        <span className="px-2.5 py-0.5 rounded-full text-base font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                          Beginner
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-base font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                          Intermediate
                        </span>
                      )}
                      <span className="text-base text-slate-400 dark:text-slate-500 font-medium">
                        {path.lessonsCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5 space-y-2">
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        path.progressColor === "emerald"
                          ? "bg-emerald-500"
                          : "bg-indigo-600"
                      }`}
                      style={{ width: `${path.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-base font-medium text-slate-500 dark:text-slate-400">
                      {path.progressPercent}% completed
                    </span>
                    <div className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all text-lg font-bold shadow-2xs">
                      →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Popular Courses Section: Learn Something New Today */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/80 shadow-2xs">
              <span className="text-indigo-600 dark:text-indigo-400">📚</span>
              <span>POPULAR COURSES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Learn Something New Today
            </h2>
            <p className="text-lg sm:text-base text-slate-500 dark:text-slate-400">
              Short, focused lessons to help you build real skills, step by
              step.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("lessons")}
            className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>View All Courses</span>
            <span className="text-base font-bold">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularCoursesData.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4.5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col justify-between text-left"
            >
              <div>
                {renderCourseIcon(course.iconType)}
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mt-3 leading-snug line-clamp-1">
                  {course.title}
                </h3>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1 text-base text-slate-500 dark:text-slate-400">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="9" strokeWidth="2" />
                      <path strokeWidth="2" d="M12 7v5l3 2" />
                    </svg>
                    {course.duration}
                  </span>
                  {course.level === "Beginner" ? (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                      Beginner
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                      Intermediate
                    </span>
                  )}
                </div>
                <p className="text-base text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed line-clamp-3 min-h-[50px]">
                  {course.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCourseClick(course)}
                className="w-full mt-4 py-2 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <span>View Lesson</span>
                <span className="font-bold">→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Learning progress and CTA (from design spec) */}
      <section className="space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-2xl shrink-0">
              🔥
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Daily Learning Streak
                </span>
                <span className="text-base px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                  Level 1 Explorer
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {completedSteps.length > 0
                  ? `${completedSteps.length} Milestones Conquered`
                  : "Start your first milestone today"}
              </h4>
              <p className="text-base text-slate-500 dark:text-slate-400 mt-1">
                Consistent 20-minute daily practice yields 10x faster progress
                than weekend cramming.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="md"
              className="w-full md:w-auto"
              onClick={() => onNavigate("roadmaps")}
            >
              Continue Learning
            </Button>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl shadow-emerald-500/10">
          <div className="max-w-xl space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to grow your skills?
            </h3>
            <p className="text-emerald-100 text-lg sm:text-base leading-relaxed">
              Join thousands of developers leveling up with clear roadmaps,
              interactive code lessons, and skill validation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate("roadmaps")}
              className="bg-white text-emerald-950 hover:bg-emerald-50 border-none shadow-lg"
            >
              Start Learning →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
