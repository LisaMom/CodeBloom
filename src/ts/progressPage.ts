import '../css/main.css';
import { initTheme } from './theme';
import { renderNavbar, initNavbarEvents } from './components/navbar';
import { renderFooter } from './components/footer';
import { renderIcons } from './utils/icons';
import { lessonsData } from './data/lessons';
import { quizzesData } from './data/quizzes';
import { roadmapsData } from './data/roadmaps';
import { Lesson } from './types/lesson';
import {
  getCompletedLessons,
  getCompletedSteps,
  getBookmarks,
  getQuizAttempts,
  toggleLesson,
  toggleBookmark,
} from './progress';
import { updateSEO } from './utils/seo';
import {
  renderLearningProgressSection,
  getLessonProgressSummary,
  ProgressFilterTab,
} from './components/learningProgress';

const bannerImageMap: Record<string, string> = {
  javascript: '/assets/lesson-images/js-lesson.jpg',
  c: '/assets/lesson-images/c-programming-language.avif',
  laravel: '/assets/lesson-images/laravel-lesson.jpg',
  react: '/assets/lesson-images/React_Fundamentals.png',
  php: '/assets/lesson-images/php-lesson.jpg',
  cpp: '/assets/lesson-images/basic-cpp-programs.webp',
  java: '/assets/lesson-images/java+springboot.png',
  'java-spring': '/assets/lesson-images/java+springboot.png',
  html: '/assets/lesson-images/html-lesson.webp',
  css: '/assets/lesson-images/hero-css.png',
};

const catColour: Record<string, { bg: string; text: string }> = {
  javascript: { bg: 'bg-yellow-100 dark:bg-yellow-950/50', text: 'text-yellow-800 dark:text-yellow-300' },
  typescript: { bg: 'bg-blue-100 dark:bg-blue-950/50', text: 'text-blue-800 dark:text-blue-300' },
  react: { bg: 'bg-cyan-100 dark:bg-cyan-950/50', text: 'text-cyan-800 dark:text-cyan-300' },
  css: { bg: 'bg-teal-100 dark:bg-teal-950/50', text: 'text-teal-800 dark:text-teal-300' },
  c: { bg: 'bg-sky-100 dark:bg-sky-950/50', text: 'text-sky-800 dark:text-sky-300' },
  laravel: { bg: 'bg-rose-100 dark:bg-rose-950/50', text: 'text-rose-800 dark:text-rose-300' },
  php: { bg: 'bg-indigo-100 dark:bg-indigo-950/50', text: 'text-indigo-800 dark:text-indigo-300' },
  cpp: { bg: 'bg-blue-100 dark:bg-blue-950/50', text: 'text-blue-800 dark:text-blue-300' },
  java: { bg: 'bg-amber-100 dark:bg-amber-950/50', text: 'text-amber-800 dark:text-amber-300' },
  html: { bg: 'bg-rose-100 dark:bg-rose-950/50', text: 'text-rose-800 dark:text-rose-300' },
};

let activeProgressTab: ProgressFilterTab = 'all';
let activeSecondaryTab: 'overview' | 'bookmarks' | 'quizzes' = 'overview';

export function initProgressPage(): void {
  initTheme();
  updateSEO({
    title: 'My Progress | CodeBloom',
    description: 'Track your completed lessons, roadmap milestones, quiz scores, and bookmarks.',
  });
  render();
}

function render(): void {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  appEl.innerHTML = `
    ${renderNavbar('Progress')}
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      ${renderProgressPage()}
    </main>
    ${renderFooter()}
  `;

  initNavbarEvents('Progress');
  attachEvents();
  renderIcons(appEl);
}

function renderProgressPage(): string {
  const completedSteps = getCompletedSteps();
  const bookmarks = getBookmarks();
  const quizAttempts = getQuizAttempts();
  const summary = getLessonProgressSummary(lessonsData);

  const totalQuizAttempts = Object.keys(quizAttempts).length;
  const passedQuizzes = Object.values(quizAttempts).filter((a) => {
    const quiz = quizzesData.find((q) => q.id === a.quizId);
    return quiz && a.score >= quiz.passingScorePercent;
  }).length;

  return `
    <!-- Prominent Learning Progress Section (Moved from Lessons Page) -->
    ${renderLearningProgressSection(lessonsData, activeProgressTab)}

    ${
      activeProgressTab === 'completed'
        ? renderCompletedLessonsSection(summary.completedLessons)
        : activeProgressTab === 'remaining'
        ? renderRemainingLessonsSection(summary.remainingLessons)
        : `
            <!-- Overview & Additional Learning Milestones -->
            <div class="space-y-8 pt-2">
              <!-- Quick Stat Cards -->
              <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <!-- Roadmap Milestones -->
                <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between space-y-3">
                  <div class="flex items-center justify-between text-indigo-700 dark:text-indigo-400">
                    <span class="text-xs font-bold uppercase tracking-wider">Roadmap Milestones</span>
                    <i data-lucide="map" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <p class="text-3xl font-black text-slate-900 dark:text-white">${completedSteps.length}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Roadmap steps completed</p>
                  </div>
                </div>

                <!-- Quizzes Taken -->
                <button
                  type="button"
                  data-secondary-tab="quizzes"
                  class="text-left p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-400 dark:hover:border-amber-600 transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div class="flex items-center justify-between text-amber-600 dark:text-amber-400">
                    <span class="text-xs font-bold uppercase tracking-wider">Quizzes Taken</span>
                    <i data-lucide="award" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <p class="text-3xl font-black text-slate-900 dark:text-white">
                      ${passedQuizzes} <span class="text-lg font-medium text-slate-400">/ ${totalQuizAttempts}</span>
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${passedQuizzes} passed · View results →</p>
                  </div>
                </button>

                <!-- Bookmarks -->
                <button
                  type="button"
                  data-secondary-tab="bookmarks"
                  class="text-left p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-rose-400 dark:hover:border-rose-600 transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div class="flex items-center justify-between text-rose-600 dark:text-rose-400">
                    <span class="text-xs font-bold uppercase tracking-wider">Saved Bookmarks</span>
                    <i data-lucide="bookmark" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <p class="text-3xl font-black text-slate-900 dark:text-white">${bookmarks.length}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Lessons saved · View list →</p>
                  </div>
                </button>
              </section>

              <!-- Secondary Navigation Tabs -->
              <div class="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 w-full sm:w-auto overflow-x-auto">
                <button
                  type="button"
                  data-secondary-tab="overview"
                  class="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeSecondaryTab === 'overview'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }"
                >
                  Overview & Milestones
                </button>
                <button
                  type="button"
                  data-secondary-tab="bookmarks"
                  class="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeSecondaryTab === 'bookmarks'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }"
                >
                  Bookmarks (${bookmarks.length})
                </button>
                <button
                  type="button"
                  data-secondary-tab="quizzes"
                  class="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeSecondaryTab === 'quizzes'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }"
                >
                  Quiz Scores (${totalQuizAttempts})
                </button>
              </div>

              <!-- Secondary Tab Content -->
              <div class="pb-10">
                ${
                  activeSecondaryTab === 'overview'
                    ? renderOverviewTab(summary, quizAttempts)
                    : activeSecondaryTab === 'bookmarks'
                    ? renderBookmarksTab(bookmarks)
                    : renderQuizzesTab(quizAttempts)
                }
              </div>
            </div>
          `
    }
  `;
}

function renderCompletedLessonsSection(completedLessons: Lesson[]): string {
  if (completedLessons.length === 0) {
    return `
      <div class="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div class="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <i data-lucide="book-open" class="w-7 h-7"></i>
        </div>
        <h4 class="text-lg font-bold text-slate-900 dark:text-white">No completed lessons yet</h4>
        <p class="text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Start reading any lesson and click "Mark as Complete" to track your progress here!
        </p>
        <div class="pt-2">
          <a
            href="/pages/lessons.html"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all cursor-pointer"
          >
            <span>Browse Lessons</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    `;
  }

  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Completed Lessons (${completedLessons.length})
          </h3>
          <p class="text-base text-slate-500 dark:text-slate-400 mt-0.5">
            Review the topics and code examples you have mastered so far.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${completedLessons.map(renderCompletedLessonCard).join('')}
      </div>
    </div>
  `;
}

function renderRemainingLessonsSection(remainingLessons: Lesson[]): string {
  if (remainingLessons.length === 0) {
    return `
      <div class="text-center py-16 px-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl border border-emerald-200 dark:border-emerald-800 space-y-3">
        <div class="text-4xl">🎉</div>
        <h4 class="text-lg font-bold text-emerald-900 dark:text-emerald-200">All Lessons Completed!</h4>
        <p class="text-base text-emerald-700 dark:text-emerald-400 max-w-md mx-auto">
          Congratulations! You have completed every lesson in the curriculum. Test your knowledge in Quizzes!
        </p>
        <div class="pt-2 flex justify-center gap-3">
          <a
            href="/pages/quizzes.html"
            class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all"
          >
            Take a Quiz Assessment
          </a>
        </div>
      </div>
    `;
  }

  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            Lessons To Continue (${remainingLessons.length})
          </h3>
          <p class="text-base text-slate-500 dark:text-slate-400 mt-0.5">
            Keep up the momentum! Pick any remaining lesson to continue learning.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${remainingLessons.map(renderRemainingLessonCard).join('')}
      </div>
    </div>
  `;
}

function renderCompletedLessonCard(lesson: Lesson): string {
  const cc = catColour[lesson.category] || catColour['javascript'];
  const imageSrc = bannerImageMap[lesson.bannerType || lesson.category] || '/assets/hero-developer.png';

  return `
    <div class="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-400 dark:hover:border-emerald-600 transition-all">
      <div class="relative w-full h-36 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img src="${imageSrc}" alt="${lesson.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='/assets/hero-developer.png'" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
        <div class="absolute top-2 left-2">
          <span class="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${cc.bg} ${cc.text}">${lesson.category}</span>
        </div>
        <div class="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
          <i data-lucide="check-circle-2" class="w-3 h-3"></i> Completed
        </div>
        <div class="absolute bottom-2 right-2 text-xs font-semibold text-slate-200 flex items-center gap-1">
          <i data-lucide="clock" class="w-3 h-3"></i> ${lesson.readTimeMinutes} min
        </div>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <h4 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">${lesson.title}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">${lesson.subtitle}</p>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <a href="/pages/lessons.html?id=${lesson.id}" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">Review Lesson →</a>
          <button
            type="button"
            data-uncomplete-lesson="${lesson.id}"
            class="text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
            title="Mark as incomplete"
          >
            Undo
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderRemainingLessonCard(lesson: Lesson): string {
  const cc = catColour[lesson.category] || catColour['javascript'];
  const imageSrc = bannerImageMap[lesson.bannerType || lesson.category] || '/assets/hero-developer.png';

  return `
    <div class="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-400 dark:hover:border-indigo-600 transition-all">
      <div class="relative w-full h-36 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img src="${imageSrc}" alt="${lesson.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='/assets/hero-developer.png'" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
        <div class="absolute top-2 left-2">
          <span class="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${cc.bg} ${cc.text}">${lesson.category}</span>
        </div>
        <div class="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white">
          <i data-lucide="compass" class="w-3 h-3"></i> To Continue
        </div>
        <div class="absolute bottom-2 right-2 text-xs font-semibold text-slate-200 flex items-center gap-1">
          <i data-lucide="clock" class="w-3 h-3"></i> ${lesson.readTimeMinutes} min
        </div>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <h4 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">${lesson.title}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">${lesson.subtitle}</p>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <a href="/pages/lessons.html?id=${lesson.id}" class="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
            <span>Continue Lesson</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderOverviewTab(
  summary: ReturnType<typeof getLessonProgressSummary>,
  quizAttempts: ReturnType<typeof getQuizAttempts>
): string {
  const completedSteps = getCompletedSteps();

  // Roadmap progress
  const roadmapRows = roadmapsData.map((rm) => {
    const stepIds = rm.milestones.flatMap((m) => m.steps.map((s) => s.id));
    const done = stepIds.filter((id) => completedSteps.includes(id)).length;
    const pct = stepIds.length > 0 ? Math.round((done / stepIds.length) * 100) : 0;
    return { title: rm.title, done, total: stepIds.length, pct };
  });

  // Quiz results
  const quizRows = Object.values(quizAttempts).map((attempt) => {
    const quiz = quizzesData.find((q) => q.id === attempt.quizId);
    const passed = quiz ? attempt.score >= quiz.passingScorePercent : false;
    return { title: quiz?.title ?? attempt.quizId, score: attempt.score, passed, passing: quiz?.passingScorePercent ?? 70 };
  });

  return `
    <div class="space-y-8">
      <!-- Recent Completed Lessons -->
      <div class="space-y-4">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="book-open" class="w-5 h-5 text-emerald-500"></i>
          Recently Completed Lessons
        </h3>
        ${
          summary.completedLessons.length === 0
            ? `<div class="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <i data-lucide="book-open" class="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-3"></i>
                <p class="font-bold text-slate-900 dark:text-white">No completed lessons yet</p>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Start any lesson and mark it complete to see it here.</p>
                <a href="/pages/lessons.html" class="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all">
                  Browse Lessons <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </a>
              </div>`
            : `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                ${summary.completedLessons.slice(0, 6).map(renderLessonMiniCard).join('')}
              </div>
              ${summary.completedLessons.length > 6 ? `
                <div class="text-center">
                  <button type="button" data-progress-tab="completed" class="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
                    View all ${summary.completedLessons.length} completed lessons →
                  </button>
                </div>` : ''}`
        }
      </div>

      <!-- Roadmap Progress -->
      <div class="space-y-4">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="map" class="w-5 h-5 text-indigo-500"></i>
          Roadmap Progress
        </h3>
        <div class="space-y-3">
          ${
            roadmapRows.length === 0
              ? `<p class="text-sm text-slate-500 dark:text-slate-400">No roadmaps available.</p>`
              : roadmapRows
                  .map(
                    (rm) => `
                <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-slate-900 dark:text-white text-sm">${rm.title}</span>
                    <span class="text-xs font-bold text-slate-500 dark:text-slate-400">${rm.done} / ${rm.total} steps · ${rm.pct}%</span>
                  </div>
                  <div class="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500" style="width: ${rm.pct}%"></div>
                  </div>
                </div>
              `
                  )
                  .join('')
          }
        </div>
      </div>

      <!-- Quiz Performance -->
      ${
        quizRows.length > 0
          ? `
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="award" class="w-5 h-5 text-amber-500"></i>
            Quiz Performance
          </h3>
          <div class="space-y-3">
            ${quizRows
              .map(
                (q) => `
              <div class="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
                <div>
                  <p class="font-semibold text-slate-900 dark:text-white text-sm">${q.title}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Passing score: ${q.passing}%</p>
                </div>
                <div class="text-right">
                  <span class="text-xl font-black ${q.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">${q.score}%</span>
                  <p class="text-xs font-bold ${q.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'} mt-0.5">
                    ${q.passed ? '✓ Passed' : '✗ Not passed'}
                  </p>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `
          : ''
      }
    </div>
  `;
}

function renderLessonMiniCard(lesson: Lesson): string {
  const cc = catColour[lesson.category] || catColour['javascript'];
  const imageSrc = bannerImageMap[lesson.bannerType || lesson.category] || '/assets/hero-developer.png';
  return `
    <a
      href="/pages/lessons.html?id=${lesson.id}"
      class="group flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer"
    >
      <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
        <img src="${imageSrc}" alt="${lesson.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/assets/hero-developer.png'" />
      </div>
      <div class="min-w-0 flex-1">
        <p class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">${lesson.title}</p>
        <span class="text-xs font-semibold px-1.5 py-0.5 rounded-full ${cc.bg} ${cc.text} mt-0.5 inline-block">${lesson.category}</span>
      </div>
      <div class="shrink-0 text-emerald-500">
        <i data-lucide="check-circle-2" class="w-4 h-4"></i>
      </div>
    </a>
  `;
}

function renderBookmarksTab(bookmarks: string[]): string {
  const bookmarkedLessons = lessonsData.filter((l) => bookmarks.includes(l.id));

  if (bookmarkedLessons.length === 0) {
    return `
      <div class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div class="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <i data-lucide="bookmark" class="w-7 h-7"></i>
        </div>
        <h4 class="text-lg font-bold text-slate-900 dark:text-white">No bookmarks yet</h4>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Click the bookmark icon on any lesson card to save it here for later.
        </p>
        <a href="/pages/lessons.html" class="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all">
          Browse Lessons <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    `;
  }

  return `
    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
        Saved Lessons (${bookmarkedLessons.length})
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${bookmarkedLessons.map((lesson) => renderBookmarkCard(lesson)).join('')}
      </div>
    </div>
  `;
}

function renderBookmarkCard(lesson: Lesson): string {
  const cc = catColour[lesson.category] || catColour['javascript'];
  const imageSrc = bannerImageMap[lesson.bannerType || lesson.category] || '/assets/hero-developer.png';
  const isCompleted = getCompletedLessons().includes(lesson.id);

  return `
    <div class="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-amber-400 dark:hover:border-amber-600 transition-all">
      <div class="relative w-full h-36 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img src="${imageSrc}" alt="${lesson.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='/assets/hero-developer.png'" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
        <div class="absolute top-2 left-2">
          <span class="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${cc.bg} ${cc.text}">${lesson.category}</span>
        </div>
        <button
          type="button"
          data-unbookmark-lesson="${lesson.id}"
          class="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 hover:bg-red-600/80 text-amber-400 hover:text-white transition-all cursor-pointer"
          title="Remove bookmark"
        >
          <i data-lucide="bookmark" class="w-3.5 h-3.5 fill-amber-400"></i>
        </button>
        ${isCompleted ? `<div class="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white"><i data-lucide="check-circle-2" class="w-3 h-3"></i> Completed</div>` : ''}
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <h4 class="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">${lesson.title}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">${lesson.subtitle}</p>
        </div>
        <a href="/pages/lessons.html?id=${lesson.id}" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800 block">
          Read Lesson →
        </a>
      </div>
    </div>
  `;
}

function renderQuizzesTab(quizAttempts: ReturnType<typeof getQuizAttempts>): string {
  const attempts = Object.values(quizAttempts);

  if (attempts.length === 0) {
    return `
      <div class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div class="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <i data-lucide="help-circle" class="w-7 h-7"></i>
        </div>
        <h4 class="text-lg font-bold text-slate-900 dark:text-white">No quiz attempts yet</h4>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Complete a lesson and take the quiz to see your results here.
        </p>
        <a href="/pages/quizzes.html" class="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all">
          Browse Quizzes <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    `;
  }

  return `
    <div class="space-y-4">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
        Quiz Results (${attempts.length})
      </h3>
      <div class="space-y-3">
        ${attempts
          .map((attempt) => {
            const quiz = quizzesData.find((q) => q.id === attempt.quizId);
            const passed = quiz ? attempt.score >= quiz.passingScorePercent : false;
            const date = attempt.completedAt
              ? new Date(attempt.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : '';
            return `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${passed ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400'}">
                  <i data-lucide="${passed ? 'check-circle-2' : 'x-circle'}" class="w-6 h-6"></i>
                </div>
                <div>
                  <p class="font-bold text-slate-900 dark:text-white text-sm">${quiz?.title ?? attempt.quizId}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${quiz?.category ?? ''} · ${date}</p>
                </div>
              </div>
              <div class="flex items-center gap-4 sm:text-right">
                <div>
                  <p class="text-2xl font-black ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">${attempt.score}%</p>
                  <p class="text-xs font-semibold ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}">
                    ${passed ? 'Passed ✓' : 'Not passed'} · Needed ${quiz?.passingScorePercent ?? 70}%
                  </p>
                </div>
                <a href="/pages/quizzes.html?quizId=${attempt.quizId}" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all whitespace-nowrap">
                  Retake
                </a>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>
    </div>
  `;
}

function attachEvents(): void {
  // Filter tabs for Learning Progress section (All, To Continue, Completed)
  document.querySelectorAll<HTMLButtonElement>('[data-progress-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.progressTab as ProgressFilterTab;
      if (tab === 'all' || tab === 'remaining' || tab === 'completed') {
        activeProgressTab = tab;
        render();
      }
    });
  });

  // Secondary tabs
  document.querySelectorAll<HTMLButtonElement>('[data-secondary-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.secondaryTab as 'overview' | 'bookmarks' | 'quizzes';
      if (tab) {
        activeProgressTab = 'all';
        activeSecondaryTab = tab;
        render();
      }
    });
  });

  // Undo completed lesson
  document.querySelectorAll<HTMLButtonElement>('[data-uncomplete-lesson]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.uncompleteLesson;
      if (id) {
        toggleLesson(id);
        render();
      }
    });
  });

  // Remove bookmark
  document.querySelectorAll<HTMLButtonElement>('[data-unbookmark-lesson]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.unbookmarkLesson;
      if (id) {
        toggleBookmark(id);
        render();
      }
    });
  });
}

// Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProgressPage);
} else {
  initProgressPage();
}
