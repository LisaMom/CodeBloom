import { Lesson } from '../types/lesson';
import { getCompletedLessons } from '../progress';

export interface LessonProgressSummary {
  total: number;
  completed: number;
  remaining: number;
  percent: number;
  completedLessons: Lesson[];
  remainingLessons: Lesson[];
  nextLesson: Lesson | null;
  completedMinutes: number;
  remainingMinutes: number;
}

export function getLessonProgressSummary(lessons: Lesson[]): LessonProgressSummary {
  const completedIds = getCompletedLessons();
  const completedLessons = lessons.filter((l) => completedIds.includes(l.id));
  const remainingLessons = lessons.filter((l) => !completedIds.includes(l.id));

  const total = lessons.length;
  const completed = completedLessons.length;
  const remaining = remainingLessons.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const nextLesson = remainingLessons.length > 0 ? remainingLessons[0] : null;

  const completedMinutes = completedLessons.reduce((sum, l) => sum + (l.readTimeMinutes || 10), 0);
  const remainingMinutes = remainingLessons.reduce((sum, l) => sum + (l.readTimeMinutes || 10), 0);

  return {
    total,
    completed,
    remaining,
    percent,
    completedLessons,
    remainingLessons,
    nextLesson,
    completedMinutes,
    remainingMinutes,
  };
}

export type ProgressFilterTab = 'all' | 'completed' | 'remaining';

/**
 * Renders the prominent Learning Progress section with progress bar,
 * completed vs remaining metrics, and next lesson action.
 */
export function renderLearningProgressSection(
  lessons: Lesson[],
  activeTab: ProgressFilterTab = 'all'
): string {
  const summary = getLessonProgressSummary(lessons);

  return `
    <section id="learning-progress-section" class="w-full space-y-6">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div class="space-y-1.5">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80">
            <i data-lucide="trending-up" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"></i>
            <span>LEARNING PROGRESS</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Your Learning Progress
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Track your completed lessons and continue your next one to reach your learning goals.
          </p>
        </div>

        <!-- Filter Tabs for Progress -->
        <div class="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 text-base font-semibold">
          <button
            type="button"
            data-progress-tab="all"
            class="px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }"
          >
            All (${summary.total})
          </button>
          <button
            type="button"
            data-progress-tab="remaining"
            class="px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'remaining'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }"
          >
            To Continue (${summary.remaining})
          </button>
          <button
            type="button"
            data-progress-tab="completed"
            class="px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }"
          >
            Completed (${summary.completed})
          </button>
        </div>
      </div>

      <!-- Main Dashboard Card -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-6">
        <!-- Progress Bar and Percentage -->
        <div class="space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xl font-bold text-slate-900 dark:text-white">Overall Completion</span>
              <span class="px-2.5 py-0.5 rounded-full text-base font-bold ${
                summary.percent === 100
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
              }">
                ${summary.percent}% Completed
              </span>
            </div>
            <span class="text-base text-slate-500 dark:text-slate-400 font-medium">
              ${summary.completed} of ${summary.total} lessons finished (${summary.remaining} remaining)
            </span>
          </div>

          <!-- The Visual Progress Bar -->
          <div
            class="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700/60 p-0.5"
            role="progressbar"
            aria-valuenow="${summary.percent}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Learning progress: ${summary.percent}% completed"
          >
            <div
              class="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
              style="width: ${summary.percent}%"
            ></div>
          </div>
        </div>

        <!-- 4-Stat Metric Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <!-- Stat 1: Completed Lessons -->
          <div class="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/50 flex flex-col justify-between">
            <div class="flex items-center justify-between text-emerald-700 dark:text-emerald-400 mb-2">
              <span class="text-base font-bold uppercase tracking-wider">Completed</span>
              <i data-lucide="check-circle-2" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                ${summary.completed} <span class="text-lg font-medium text-slate-500 dark:text-slate-400">/ ${summary.total}</span>
              </p>
              <p class="text-base text-slate-500 dark:text-slate-400 mt-0.5">Lessons finished</p>
            </div>
          </div>

          <!-- Stat 2: Remaining Lessons -->
          <div class="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/70 dark:border-indigo-800/50 flex flex-col justify-between">
            <div class="flex items-center justify-between text-indigo-700 dark:text-indigo-400 mb-2">
              <span class="text-base font-bold uppercase tracking-wider">To Continue</span>
              <i data-lucide="compass" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                ${summary.remaining}
              </p>
              <p class="text-base text-slate-500 dark:text-slate-400 mt-0.5">Lessons remaining</p>
            </div>
          </div>

          <!-- Stat 3: Study Time Completed -->
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex flex-col justify-between">
            <div class="flex items-center justify-between text-slate-700 dark:text-slate-300 mb-2">
              <span class="text-base font-bold uppercase tracking-wider">Time Learned</span>
              <i data-lucide="clock" class="w-5 h-5 text-amber-500"></i>
            </div>
            <div>
              <p class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                ${summary.completedMinutes} <span class="text-lg font-medium text-slate-500">min</span>
              </p>
              <p class="text-base text-slate-500 dark:text-slate-400 mt-0.5">~${summary.remainingMinutes} min left</p>
            </div>
          </div>

          <!-- Stat 4: Motivation Level -->
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex flex-col justify-between">
            <div class="flex items-center justify-between text-slate-700 dark:text-slate-300 mb-2">
              <span class="text-base font-bold uppercase tracking-wider">Milestone</span>
              <i data-lucide="award" class="w-5 h-5 text-emerald-500"></i>
            </div>
            <div>
              <p class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                ${
                  summary.percent === 100
                    ? 'Master Level 🏆'
                    : summary.percent >= 50
                    ? 'Intermediate ⚡'
                    : summary.completed > 0
                    ? 'Explorer 🚀'
                    : 'Beginner 🌱'
                }
              </p>
              <p class="text-base text-slate-500 dark:text-slate-400 mt-0.5">
                ${
                  summary.percent === 100
                    ? 'All lessons conquered!'
                    : 'Keep going, you\'re doing great!'
                }
              </p>
            </div>
          </div>
        </div>

        <!-- Next Lesson Spotlight / Motivation Banner -->
        ${
          summary.nextLesson
            ? `
              <div class="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/30 dark:border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3.5">
                  <div class="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <i data-lucide="play" class="w-5 h-5 fill-white"></i>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-base font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Next Lesson
                      </span>
                      <span class="text-base text-slate-400">·</span>
                      <span class="text-base font-semibold text-slate-500 dark:text-slate-400">${summary.nextLesson.readTimeMinutes} min read</span>
                    </div>
                    <h4 class="text-lg font-bold text-slate-900 dark:text-white">
                      ${summary.nextLesson.title}
                    </h4>
                    <p class="text-base text-slate-600 dark:text-slate-400 line-clamp-1">
                      ${summary.nextLesson.subtitle}
                    </p>
                  </div>
                </div>

                <a
                  href="/pages/lessons.html?id=${summary.nextLesson.id}"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Continue Lesson</span>
                  <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
              </div>
            `
            : `
              <div class="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <div class="text-3xl">🎉</div>
                <h4 class="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                  Congratulations! All Lessons Completed!
                </h4>
                <p class="text-base text-emerald-700 dark:text-emerald-400 max-w-md mx-auto">
                  You have successfully completed all lessons! Head over to Quizzes or Roadmaps to validate your skills.
                </p>
                <div class="pt-2 flex items-center justify-center gap-3">
                  <a
                    href="/pages/quizzes.html"
                    class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold transition-all"
                  >
                    Take a Quiz Assessment
                  </a>
                  <a
                    href="/pages/certificates.html"
                    class="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-base font-bold transition-all"
                  >
                    View Certificates
                  </a>
                </div>
              </div>
            `
        }
      </div>
    </section>
  `;
}
