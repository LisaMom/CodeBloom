import '../css/main.css';
import { initTheme } from './theme';
import { renderNavbar, initNavbarEvents } from './components/navbar';
import { renderFooter } from './components/footer';
import { renderIcons } from './utils/icons';
import { featuredRoadmapPaths, popularCoursesData, PopularCourse, FeaturedRoadmapPath } from './data/courses';
import { getCompletedSteps, getCompletedLessons } from './progress';
import { lessonsData } from './data/lessons';
import { updateSEO } from './utils/seo';

function renderRoadmapIcon(type: FeaturedRoadmapPath['iconType']): string {
  switch (type) {
    case 'globe':
      return `
        <div class="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 ">
          <i data-lucide="globe" class="w-6 h-6"></i>
        </div>
      `;
    case 'java':
      return `
        <div class="w-12 h-12 rounded-full bg-[#6366F1] text-white flex items-center justify-center shrink-0 ">
          <i data-lucide="coffee" class="w-6 h-6"></i>
        </div>
      `;
    case 'python':
      return `
        <div class="w-12 h-12 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0 ">
          <i data-lucide="terminal" class="w-6 h-6"></i>
        </div>
      `;
    case 'react':
      return `
        <div class="w-12 h-12 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center shrink-0 ">
          <i data-lucide="atom" class="w-7 h-7 text-white"></i>
        </div>
      `;
  }
}

function renderCourseIcon(type: PopularCourse['iconType']): string {
  switch (type) {
    case 'javascript':
      return `
        <div class="w-11 h-11 rounded-md flex items-center justify-center font-black text-black text-lg  select-none">
          <img class="rounded-md w-full h-full object-contain" src="/assets/logo-lesson/JavaScript-logo.png" alt="JavaScript Logo" onerror="this.src='/assets/logo-icon.png'" />
        </div>
      `;
    case 'html-css':
      return `
        <div class="w-11 h-11 rounded-xl bg-[#E44D26] flex items-center justify-center text-white font-black text-xl  select-none">
          5
        </div>
      `;
    case 'react':
      return `
        <div class="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/70 dark:border-cyan-800/60 flex items-center justify-center text-[#00D8FE] ">
          <i data-lucide="atom" class="w-6 h-6"></i>
        </div>
      `;
    case 'python':
      return `
        <div class="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center text-blue-500 ">
          <i data-lucide="terminal" class="w-6 h-6"></i>
        </div>
      `;
    case 'git':
      return `
        <div class="w-11 h-11 rounded-xl bg-[#6366F1] flex items-center justify-center text-white ">
          <i data-lucide="git-branch" class="w-6 h-6"></i>
        </div>
      `;
  }
}

export function initHomePage(): void {
  initTheme();
  updateSEO({
    title: 'CodeBloom - Developer Roadmaps & Interactive Learning',
    description: 'Master modern tech careers with interactive roadmaps, hands-on lessons, and skill validation.',
  });

  const appEl = document.getElementById('app');
  if (!appEl) return;

  const completedSteps = getCompletedSteps();
  const completedLessons = getCompletedLessons();
  const totalLessons = lessonsData.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
  const remainingLessons = lessonsData.filter((l) => !completedLessons.includes(l.id));
  const nextLesson = remainingLessons.length > 0 ? remainingLessons[0] : null;

  appEl.innerHTML = `
    ${renderNavbar('home')}

    <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
      <!-- Hero Section -->
      <section class="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left Text -->
          <div class="lg:col-span-7 space-y-6 text-left">


            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Learn to Code. <br />
              <span class="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">
                Build Your Future.
              </span>
            </h1>

            <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Follow clear roadmaps, practice with hands-on lessons, and test your skills one step at a time.
            </p>

            <!-- CTAs -->
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/pages/roadmaps.html"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700   active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Start Learning</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
              <a
                href="/pages/roadmaps.html"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                Explore Roadmaps
              </a>
            </div>

            <!-- Metric counters -->
            <div class="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">50K+</p>
                <p class="text-lg text-slate-500 dark:text-slate-400 mt-0.5">Active Learners</p>
              </div>
              <div>
                <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">100%</p>
                <p class="text-lg text-slate-500 dark:text-slate-400 mt-0.5">Free & Open Source</p>
              </div>
              <div>
                <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">4.9/5</p>
                <p class="text-lg text-slate-500 dark:text-slate-400 mt-0.5">Learner Satisfaction</p>
              </div>
            </div>
          </div>

          <!-- Right Visual Image -->
          <div class="lg:col-span-5 relative">
            <div class="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800  bg-gradient-to-tr from-slate-900 to-indigo-950 p-2">
              <img
                src="/assets/roadmap-illustration.svg"
                alt="CodeBloom Interactive Learning Path"
                class="w-full h-auto rounded-2xl object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Roadmaps Section -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div class="space-y-1.5">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"></i>
              <span>FEATURED ROADMAPS</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Choose Your Learning Path
            </h2>
            <p class="text-lg sm:text-base text-slate-500 dark:text-slate-400">
              Follow structured roadmaps to build your skills from beginner to advanced.
            </p>
          </div>
          <a
            href="/pages/roadmaps.html"
            class="text-lg font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap group"
          >
            <span>View All Roadmaps</span>
            <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${featuredRoadmapPaths
      .map((path) => `
              <a
                href="/pages/roadmaps.html?id=${path.roadmapId}"
                class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5  hover:border-slate-300 dark:hover:border-slate-700 hover: transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div class="flex items-center gap-3.5">
                    ${renderRoadmapIcon(path.iconType)}
                    <div>
                      <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        ${path.title}
                      </h3>
                      <div class="flex items-center gap-2 mt-1">
                        <span class="px-2.5 py-0.5 rounded-full text-base font-semibold ${path.level === 'Beginner'
          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60'
          : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60'
        }">
                          ${path.level}
                        </span>
                        <span class="text-base text-slate-400 dark:text-slate-500 font-medium">${path.lessonsCount}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Progress Bar -->
                  <div class="mt-5 space-y-2">
                    <div class="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-500 ${path.progressColor === 'emerald' ? 'bg-emerald-500' : 'bg-indigo-600'
        }"
                        style="width: ${path.progressPercent}%"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between pt-0.5">
                      <span class="text-base font-medium text-slate-500 dark:text-slate-400">${path.progressPercent}% completed</span>
                      <div class="w-7 h-7 rounded-full bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all text-lg font-bold">
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            `)
      .join('')}
        </div>
      </section>

      <!-- Popular Courses Section -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div class="space-y-1.5">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/80">
              <i data-lucide="book-open" class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400"></i>
              <span>POPULAR COURSES</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Learn Something New Today
            </h2>
            <p class="text-lg sm:text-base text-slate-500 dark:text-slate-400">
              Short, focused lessons to help you build real skills, step by step.
            </p>
          </div>
          <a
            href="/pages/lessons.html"
            class="text-lg font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap group"
          >
            <span>View All Courses</span>
            <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          ${popularCoursesData
      .map((course) => {
        const targetUrl = course.targetLessonId
          ? `/pages/lessons.html?id=${course.targetLessonId}`
          : course.targetRoadmapId
            ? `/pages/roadmaps.html?id=${course.targetRoadmapId}`
            : '/pages/lessons.html';

        return `
                <div class="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4.5  hover:border-slate-300 dark:hover:border-slate-700 hover: transition-all flex flex-col justify-between text-left">
                  <div>
                    ${renderCourseIcon(course.iconType)}
                    <h3 class="text-[15px] font-bold text-slate-900 dark:text-white mt-3 leading-snug line-clamp-1">
                      ${course.title}
                    </h3>
                    <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span class="flex items-center gap-1 text-base text-slate-500 dark:text-slate-400">
                        <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400"></i>
                        ${course.duration}
                      </span>
                      <span class="px-2 py-0.5 rounded-full text-[14px] font-semibold ${course.level === 'Beginner'
            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60'
            : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60'
          }">
                        ${course.level}
                      </span>
                    </div>
                    <p class="text-base text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed line-clamp-3 min-h-[50px]">
                      ${course.description}
                    </p>
                  </div>

                  <a
                    href="${targetUrl}"
                    class="w-full mt-4 py-2 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer  active:scale-[0.98] group text-center"
                  >
                    <span>View Lesson</span>
                    <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-0.5 transition-transform"></i>
                  </a>
                </div>
              `;
      })
      .join('')}
        </div>
      </section>

      <!-- Learning Progress and Streak -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div class="space-y-1.5">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80">
              <i data-lucide="trending-up" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"></i>
              <span>LEARNING PROGRESS</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Track Your Growth Every Day
            </h2>
            <p class="text-lg sm:text-base text-slate-500 dark:text-slate-400">
              Track your completed lessons and roadmap milestones to stay on track.
            </p>
          </div>
          <a
            href="/pages/lessons.html"
            class="text-lg font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap group"
          >
            <span>View All Lessons</span>
            <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-6">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center shrink-0">
                <i data-lucide="flame" class="w-7 h-7 text-emerald-600 dark:text-emerald-400"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-base font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Daily Learning Streak
                  </span>
                  <span class="text-base px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                    ${progressPercent === 100 ? 'Level 5 Master 🏆' : progressPercent >= 50 ? 'Level 2 Achiever ⚡' : 'Level 1 Explorer 🚀'}
                  </span>
                </div>
                <h4 class="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  ${completedLessons.length > 0 || completedSteps.length > 0
                    ? `${completedLessons.length} Lessons Finished · ${completedSteps.length} Milestones Conquered`
                    : 'Start your learning journey today'}
                </h4>
                <p class="text-base text-slate-500 dark:text-slate-400 mt-1">
                  Consistent 20-minute daily practice yields 10x faster progress than weekend cramming.
                </p>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              ${nextLesson
                ? `
                  <a
                    href="/pages/lessons.html?id=${nextLesson.id}"
                    class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold transition-all text-center cursor-pointer"
                  >
                    <span>Continue Next Lesson</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </a>
                `
                : `
                  <a
                    href="/pages/roadmaps.html"
                    class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold transition-all text-center cursor-pointer"
                  >
                    <span>Explore Roadmaps</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </a>
                `
              }
            </div>
          </div>

          <!-- Progress Bar & Breakdown -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-base font-semibold">
              <span class="text-slate-700 dark:text-slate-300">
                Overall Course Curriculum Completion: <strong>${completedLessons.length} of ${totalLessons}</strong> lessons
              </span>
              <span class="text-emerald-600 dark:text-emerald-400 font-bold">${progressPercent}%</span>
            </div>
            <div
              class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-200/60 dark:border-slate-700/60 p-0.5"
              role="progressbar"
              aria-valuenow="${progressPercent}"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                class="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
                style="width: ${progressPercent}%"
              ></div>
            </div>
          </div>

          <!-- Quick Metrics -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div class="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/50 flex items-center justify-between">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Completed Lessons</span>
                <p class="text-2xl font-black text-slate-900 dark:text-white mt-1">${completedLessons.length} finished</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Completed</p>
              </div>
              <i data-lucide="check-circle-2" class="w-6 h-6 text-emerald-600"></i>
            </div>

            <div class="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/70 dark:border-indigo-800/50 flex items-center justify-between">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">To Continue</span>
                <p class="text-2xl font-black text-slate-900 dark:text-white mt-1">${remainingLessons.length} remaining</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Lessons remaining</p>
              </div>
              <i data-lucide="compass" class="w-6 h-6 text-indigo-600"></i>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Roadmap Milestones</span>
                <p class="text-2xl font-black text-slate-900 dark:text-white mt-1">${completedSteps.length} milestones</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Milestones completed</p>
              </div>
              <i data-lucide="target" class="w-6 h-6 text-amber-500"></i>
            </div>
          </div>
        </div>
      </section>

        <!-- Final CTA Banner -->
        <div class="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div class="max-w-xl space-y-2">
            <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to grow your skills?
            </h3>
            <p class="text-emerald-100 text-lg sm:text-base leading-relaxed">
              Join thousands of developers leveling up with clear roadmaps, interactive code lessons, and skill validation.
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a
              href="/pages/roadmaps.html"
              class="px-6 py-3 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 border-none  inline-flex items-center gap-2 font-bold transition-all"
            >
              <span>Start Learning</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>
        </div>
      </section>
    </main>

    ${renderFooter()}
  `;

  initNavbarEvents('home');
  renderIcons(appEl);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePage);
} else {
  initHomePage();
}
