import '../css/main.css';
import { initTheme } from './theme';
import { renderNavbar, initNavbarEvents } from './components/navbar';
import { renderFooter } from './components/footer';
import { renderIcons } from './utils/icons';
import { lessonsData } from './data/lessons';
import { Lesson, LessonCategory } from './types/lesson';
import {
  getCompletedLessons,
  toggleLesson,
  getBookmarks,
  toggleBookmark,
} from './progress';
import { updateSEO } from './utils/seo';
import { getLessonProgressSummary } from './components/learningProgress';

const catColour: Record<string, { bg: string; text: string; dot: string }> = {
  javascript: { bg: 'bg-yellow-100 dark:bg-yellow-950/50', text: 'text-yellow-800 dark:text-yellow-300', dot: 'bg-yellow-500' },
  typescript: { bg: 'bg-blue-100 dark:bg-blue-950/50', text: 'text-blue-800 dark:text-blue-300', dot: 'bg-blue-500' },
  react: { bg: 'bg-cyan-100 dark:bg-cyan-950/50', text: 'text-cyan-800 dark:text-cyan-300', dot: 'bg-cyan-500' },
  css: { bg: 'bg-teal-100 dark:bg-teal-950/50', text: 'text-teal-800 dark:text-teal-300', dot: 'bg-teal-500' },
  c: { bg: 'bg-sky-100 dark:bg-sky-950/50', text: 'text-sky-800 dark:text-sky-300', dot: 'bg-sky-500' },
  laravel: { bg: 'bg-rose-100 dark:bg-rose-950/50', text: 'text-rose-800 dark:text-rose-300', dot: 'bg-rose-500' },
  php: { bg: 'bg-indigo-100 dark:bg-indigo-950/50', text: 'text-indigo-800 dark:text-indigo-300', dot: 'bg-indigo-500' },
  cpp: { bg: 'bg-blue-100 dark:bg-blue-950/50', text: 'text-blue-800 dark:text-blue-300', dot: 'bg-blue-500' },
  java: { bg: 'bg-amber-100 dark:bg-amber-950/50', text: 'text-amber-800 dark:text-amber-300', dot: 'bg-amber-500' },
  html: { bg: 'bg-rose-100 dark:bg-rose-950/50', text: 'text-rose-800 dark:text-rose-300', dot: 'bg-rose-500' },
};

const diffColour: Record<string, string> = {
  Beginner: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
  Intermediate: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60',
  Advanced: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/60',
};

let searchQuery = '';
let selectedCategory: LessonCategory | 'all' = 'all';
let currentLessonId: string | null = null;
let activePracticeOption: string | null = null;
let practiceChecked = false;

export function initLessonsPage(): void {
  initTheme();

  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get('id');
  if (paramId && lessonsData.some((l) => l.id === paramId)) {
    currentLessonId = paramId;
  }

  render();
}

function render(): void {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const currentLesson = currentLessonId
    ? lessonsData.find((l) => l.id === currentLessonId) || null
    : null;

  if (currentLesson) {
    updateSEO({
      title: `${currentLesson.title} | Lesson`,
      description: currentLesson.subtitle,
    });
    appEl.innerHTML = `
      ${renderNavbar('lessons')}
      <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        ${renderLessonDetail(currentLesson)}
      </main>
      ${renderFooter()}
    `;
    initNavbarEvents('lessons');
    attachDetailEvents(currentLesson);
  } else {
    updateSEO({
      title: 'Lessons',
      description: 'Master modern programming through hands-on lessons, structured roadmaps, and instant-feedback quizzes.',
    });
    appEl.innerHTML = `
      ${renderNavbar('lessons')}
      <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        ${renderCatalogView()}
      </main>
      ${renderFooter()}
    `;
    initNavbarEvents('lessons');
    attachCatalogEvents();
  }

  renderIcons(appEl);
}

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

function renderLessonCard(lesson: Lesson): string {
  const isCompleted = getCompletedLessons().includes(lesson.id);
  const isBookmarked = getBookmarks().includes(lesson.id);
  const cc = catColour[lesson.category] || catColour.javascript;

  const type = lesson.bannerType || lesson.category || 'javascript';
  const imageSrc = bannerImageMap[type] || '/assets/hero-developer.png';

  return `
    <div
      data-lesson-card="${lesson.id}"
      class="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden  hover:border-slate-300 dark:hover:border-slate-700 hover: transition-all cursor-pointer"
    >
      <!-- Hero Image Thumbnail -->
      <div class="relative w-full h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src="${imageSrc}"
          alt="${lesson.title}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onerror="this.src='/assets/hero-developer.png'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

        <!-- Badges on image -->
        <div class="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span class="text-[14px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${cc.bg} ${cc.text} ">
            ${lesson.category}
          </span>
          <span class="text-[14px] font-bold px-2 py-0.5 rounded-full border bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 ${diffColour[lesson.difficulty] || ''
    }">
            ${lesson.difficulty}
          </span>
        </div>

        <button
          type="button"
          data-bookmark-lesson="${lesson.id}"
          class="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors cursor-pointer"
          title="${isBookmarked ? 'Remove bookmark' : 'Bookmark'}"
        >
          <i data-lucide="bookmark" class="w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}"></i>
        </button>

        ${isCompleted
      ? `
              <div class="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-base font-bold bg-emerald-600 text-white">
                <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Completed
              </div>
            `
      : `
              <div class="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-base font-semibold bg-slate-900/80 text-slate-200 backdrop-blur-xs">
                To Continue
              </div>
            `
    }

        <div class="absolute bottom-3 right-3 text-base font-semibold text-slate-200 flex items-center gap-1">
          <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${lesson.readTimeMinutes} min
        </div>
      </div>

      <!-- Card Content -->
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div class="space-y-2">
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
            ${lesson.title}
          </h3>
          <p class="text-base text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            ${lesson.subtitle}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <span class="text-base font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
            Read Lesson →
          </span>
          <span class="text-[14px] text-slate-400">${lesson.sections.length} topics</span>
        </div>
      </div>
    </div>
  `;
}

function renderCatalogView(): string {
  const isSearching = searchQuery.trim().length > 0 || selectedCategory !== 'all';
  const searchedLessons = lessonsData.filter((lesson) => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lesson.title.toLowerCase().includes(q) ||
      lesson.subtitle.toLowerCase().includes(q) ||
      lesson.category.toLowerCase().includes(q) ||
      lesson.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const latestLessons = lessonsData.filter((l) => l.sectionGroup === 'latest');
  const recommendedLessons = lessonsData.filter((l) => l.sectionGroup === 'recommended');
  const popularLessons = lessonsData.filter((l) => l.sectionGroup === 'popular');

  return `
    <!-- Top Hero Section -->
    <section class="relative overflow-hidden pt-2 sm:pt-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div class="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            Interactive Coding Lessons
            <span class="block text-[#75869C] dark:text-slate-400 font-bold mt-1.5 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl">
              to Build Real-World Skills
            </span>
          </h1>

          <p class="text-xl sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Master modern programming through hands-on lessons, structured roadmaps, and instant-feedback quizzes — from web development and databases to AI and problem solving.
          </p>

          <div class="pt-2 max-w-md">
            <div class="relative">
              <span class="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                <i data-lucide="search" class="w-4 h-4 text-slate-400"></i>
              </span>
              <input
                id="lessons-search-input"
                type="text"
                value="${searchQuery}"
                placeholder="Search lessons (e.g. JavaScript, C, React, PHP)..."
                class="w-full pl-10 pr-9 py-2.5 rounded-xl text-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all "
              />
              ${searchQuery
      ? `<button id="lessons-clear-search" class="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
                      <i data-lucide="x" class="w-4 h-4"></i>
                    </button>`
      : ''
    }
            </div>
          </div>
        </div>

        <!-- Right Illustration -->
        <div class="lg:col-span-5 flex items-center justify-center">
          <div class="relative w-full max-w-md rounded-3xl bg-gradient-to-tr from-slate-900 to-indigo-950 p-6 border border-slate-800  text-center space-y-4">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500 text-white ">
              <i data-lucide="book-open" class="w-7 h-7"></i>
            </div>
            <h3 class="text-xl font-extrabold text-white">Hands-on Lessons</h3>
            <p class="text-xl text-slate-300">
              Interactive guides with syntax-highlighted code snippets, pro tips, and knowledge verification.
            </p>
          </div>
        </div>
      </div>
    </section>

    ${isSearching
      ? `
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Search Results (${searchedLessons.length})
              </h2>
              <button id="lessons-reset-btn" class="text-xl font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
                Clear Search
              </button>
            </div>

            ${searchedLessons.length === 0
        ? `
                  <div class="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <p class="font-bold text-slate-900 dark:text-white text-xl">No lessons found</p>
                    <p class="text-xl text-slate-500 dark:text-slate-400 mt-1">
                      Try searching for another keyword like JavaScript, C, Laravel, or HTML.
                    </p>
                  </div>
                `
        : `
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${searchedLessons.map(renderLessonCard).join('')}
                  </div>
                `
      }
          </div>
        `
      : `
          <!-- 3 Standard Sections -->
          <div class="space-y-12 sm:space-y-16">
            <!-- Section 1: Latest Lessons -->
            <section class="space-y-5">
              <div class="flex items-center justify-between">
                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Latest Lessons
                </h2>
                <a href="#all" class="all-lessons-trigger inline-flex items-center gap-1.5 text-xl sm:text-base font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer group">
                  <span>See All</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${latestLessons.map(renderLessonCard).join('')}
              </div>
            </section>

            <!-- Section 2: Recommended Lessons -->
            <section class="space-y-5">
              <div class="flex items-center justify-between">
                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Recommended Lessons
                </h2>
                <a href="#all" class="all-lessons-trigger inline-flex items-center gap-1.5 text-xl sm:text-base font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer group">
                  <span>See All</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${recommendedLessons.map(renderLessonCard).join('')}
              </div>
            </section>

            <!-- Section 3: Popular Lessons -->
            <section class="space-y-5">
              <div class="flex items-center justify-between">
                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Popular Lessons
                </h2>
                <a href="#all" class="all-lessons-trigger inline-flex items-center gap-1.5 text-xl sm:text-base font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer group">
                  <span>See All</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${popularLessons.map(renderLessonCard).join('')}
              </div>
            </section>
          </div>
        `
    }
  `;
}

function attachCatalogEvents(): void {
  const searchInput = document.getElementById('lessons-search-input') as HTMLInputElement | null;
  searchInput?.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    render();
  });

  document.getElementById('lessons-clear-search')?.addEventListener('click', () => {
    searchQuery = '';
    render();
  });

  document.getElementById('lessons-reset-btn')?.addEventListener('click', () => {
    searchQuery = '';
    selectedCategory = 'all';
    render();
  });

  document.querySelectorAll<HTMLElement>('.all-lessons-trigger').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      searchQuery = ' ';
      render();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-lesson-card]').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.lessonCard;
      if (id) {
        currentLessonId = id;
        window.history.pushState({}, '', `?id=${id}`);
        activePracticeOption = null;
        practiceChecked = false;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-bookmark-lesson]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.bookmarkLesson;
      if (id) {
        toggleBookmark(id);
        render();
      }
    });
  });
}

function renderLessonDetail(lesson: Lesson): string {
  const cc = catColour[lesson.category] || catColour.javascript;
  const isCompleted = getCompletedLessons().includes(lesson.id);
  const summary = getLessonProgressSummary(lessonsData);
  const currentIndex = lessonsData.findIndex((l) => l.id === lesson.id);
  const nextLesson =
    currentIndex >= 0 && currentIndex < lessonsData.length - 1
      ? lessonsData[currentIndex + 1]
      : null;

  return `
    <div class="flex flex-col lg:flex-row gap-8 items-start animate-fadeIn">
      <!-- Main Article -->
      <article class="flex-1 w-full min-w-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl  overflow-hidden">
        <!-- Header Strip -->
        <div class="px-6 sm:px-8 pt-7 pb-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
          <button
            id="lesson-back-btn"
            type="button"
            class="inline-flex items-center gap-2 text-xl font-bold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors group cursor-pointer"
          >
            <span class="w-6 h-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center group-hover:border-emerald-400 transition-colors">
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            </span>
            Back to all lessons
          </button>

          <!-- Learning Progress Tracker Inside Lesson -->
          <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <div class="flex items-center justify-between text-base font-semibold">
              <span class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <i data-lucide="trending-up" class="w-4 h-4 text-emerald-500"></i>
                <span>Learning Progress: <strong>${summary.completed} of ${summary.total}</strong> lessons finished</span>
              </span>
              <span class="text-emerald-600 dark:text-emerald-400 font-bold">${summary.percent}%</span>
            </div>
            <div
              class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden"
              role="progressbar"
              aria-valuenow="${summary.percent}"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                class="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 rounded-full transition-all duration-500"
                style="width: ${summary.percent}%"
              ></div>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-base font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${cc.bg} ${cc.text}">
                ${lesson.category}
              </span>
              <span class="text-base font-bold px-2.5 py-1 rounded-full border ${diffColour[lesson.difficulty] || ''}">
                ${lesson.difficulty}
              </span>
              <span class="text-base text-slate-400 font-medium">
                ${lesson.readTimeMinutes} min read
              </span>
              ${isCompleted
      ? `
                    <span class="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Completed
                    </span>
                  `
      : ''
    }
            </div>

            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              ${lesson.title}
            </h1>
            <p class="text-xl sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              ${lesson.subtitle}
            </p>
          </div>
        </div>

        <!-- Body -->
        <div class="p-6 sm:p-8 space-y-10">
          ${lesson.keyTakeaways && lesson.keyTakeaways.length > 0
      ? `
                <div class="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 space-y-3">
                  <h3 class="text-xl font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <i data-lucide="sparkles" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                    Key Takeaways
                  </h3>
                  <ul class="space-y-2">
                    ${lesson.keyTakeaways
        .map(
          (point) => `
                          <li class="flex items-start gap-2.5 text-xl sm:text-base text-emerald-950 dark:text-emerald-100 font-medium">
                            <i data-lucide="check" class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"></i>
                            <span>${point}</span>
                          </li>
                        `
        )
        .join('')}
                  </ul>
                </div>
              `
      : ''
    }

          <!-- Sections -->
          ${lesson.sections
      .map(
        (sec) => `
                <section id="${sec.id}" class="space-y-4 scroll-mt-24">
                  <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    ${sec.title}
                  </h2>
                  <div class="text-xl sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    ${sec.content}
                  </div>

                  ${(sec.codeSnippets || [])
            .map(
              (snip) => `
                        <div class="space-y-2 my-4">
                          ${snip.filename ? `<span class="text-base font-mono text-slate-400">📄 ${snip.filename}</span>` : ''}
                          <div class="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden text-xl">
                            <div class="flex items-center justify-between px-4 py-2 border-b border-slate-800 text-base text-slate-400">
                              <span>${snip.language || 'code'}</span>
                              <button
                                type="button"
                                data-copy-code="${encodeURIComponent(snip.code)}"
                                class="copy-code-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                              >
                                Copy
                              </button>
                            </div>
                            <pre class="p-4 overflow-x-auto text-emerald-400 font-mono text-base leading-relaxed"><code>${escapeHtml(snip.code)}</code></pre>
                          </div>
                        </div>
                      `
            )
            .join('')}

                  ${sec.proTip
            ? `
                        <div class="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-xl text-amber-900 dark:text-amber-200 flex items-start gap-3">
                          <i data-lucide="lightbulb" class="w-5 h-5 text-amber-500 shrink-0 mt-0.5"></i>
                          <div>
                            <span class="font-bold">Pro Tip: </span>${sec.proTip}
                          </div>
                        </div>
                      `
            : ''
          }
                </section>
              `
      )
      .join('')}

          <!-- Practice Question -->
          ${lesson.practiceQuestion
      ? `
                <div class="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <i data-lucide="target" class="w-5 h-5 text-emerald-500"></i> Check Your Knowledge
                  </h3>

                  <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
                    <p class="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-xl">
                      ${lesson.practiceQuestion.question}
                    </p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      ${lesson.practiceQuestion.options
        .map((opt) => {
          const isSelected = activePracticeOption === opt.id;
          let cls = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-emerald-500';
          if (practiceChecked) {
            if (opt.isCorrect) {
              cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold';
            } else if (isSelected) {
              cls = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
            }
          } else if (isSelected) {
            cls = 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 font-semibold';
          }

          return `
                            <button
                              type="button"
                              data-practice-opt="${opt.id}"
                              ${practiceChecked ? 'disabled' : ''}
                              class="flex items-center gap-3 p-3.5 rounded-xl border text-left text-xl sm:text-base transition-all cursor-pointer disabled:cursor-default ${cls}"
                            >
                              <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 border ${isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600 text-transparent'
            }">
                                ${isSelected ? '✓' : ''}
                              </span>
                              <span>${opt.text}</span>
                            </button>
                          `;
        })
        .join('')}
                    </div>

                    <div class="flex items-center gap-3 pt-2">
                      ${!practiceChecked
        ? `
                            <button
                              id="check-practice-btn"
                              ${!activePracticeOption ? 'disabled' : ''}
                              class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xl font-bold transition-all cursor-pointer"
                            >
                              Check Answer
                            </button>
                          `
        : `
                            <button
                              id="retry-practice-btn"
                              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                            >
                              <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Try Again
                            </button>
                          `
      }
                    </div>

                    ${practiceChecked
        ? `
                          <div class="p-4 rounded-xl text-xl border flex items-start gap-3 ${lesson.practiceQuestion.options.find((o) => o.id === activePracticeOption)?.isCorrect
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
        }">
                            <div>
                              <p class="font-bold mb-0.5">
                                ${lesson.practiceQuestion.options.find((o) => o.id === activePracticeOption)?.isCorrect
          ? '✓ Correct!'
          : '✗ Not quite.'
        }
                              </p>
                              <p>${lesson.practiceQuestion.explanation}</p>
                            </div>
                          </div>
                        `
        : ''
      }
                  </div>
                </div>
              `
      : ''
    }

          <!-- Completion and Quiz Buttons -->
          <div class="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <button
              id="lesson-toggle-complete-btn"
              type="button"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xl font-bold transition-all cursor-pointer ${isCompleted
      ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
      : 'bg-emerald-600 hover:bg-emerald-700 text-white  '
    }"
            >
              ${isCompleted
      ? '<i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500"></i> Completed — Undo'
      : '<i data-lucide="check" class="w-4 h-4"></i> Mark as Complete'
    }
            </button>

            ${lesson.relatedQuizId
      ? `
                  <div class="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 flex-1">
                    <div class="flex-1">
                      <p class="text-xl font-bold text-slate-900 dark:text-white">Ready to test your knowledge?</p>
                      <p class="text-base text-slate-500 dark:text-slate-400 mt-0.5">Take a quick quiz based on this lesson.</p>
                    </div>
                    <a
                      href="/pages/quizzes.html?quizId=${lesson.relatedQuizId}"
                      class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span>Take Quiz</span>
                      <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                  </div>
                `
      : ''
    }
          </div>

          <!-- Next Lesson Recommendation to Continue -->
          ${
            nextLesson
              ? `
                <div class="mt-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/30 dark:border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Next Lesson
                      </span>
                      <span class="text-xs text-slate-400">·</span>
                      <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">${nextLesson.readTimeMinutes} min read</span>
                    </div>
                    <h4 class="text-lg font-bold text-slate-900 dark:text-white">
                      ${nextLesson.title}
                    </h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                      ${nextLesson.subtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    data-next-lesson-btn="${nextLesson.id}"
                    class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Continue Next Lesson</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </button>
                </div>
              `
              : ''
          }
        </div>
      </article>

      <!-- Sidebar -->
      <aside class="w-full lg:w-72 shrink-0 space-y-5 lg:sticky lg:top-24">
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80  space-y-4">
          <h4 class="text-base font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Table of Contents
          </h4>
          <nav class="space-y-1">
            ${lesson.sections
      .map(
        (sec) => `
                  <a
                    href="#${sec.id}"
                    class="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    ${sec.title}
                  </a>
                `
      )
      .join('')}
          </nav>
        </div>
      </aside>
    </div>
  `;
}

function attachDetailEvents(lesson: Lesson): void {
  document.getElementById('lesson-back-btn')?.addEventListener('click', () => {
    currentLessonId = null;
    window.history.pushState({}, '', '/pages/lessons.html');
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('lesson-toggle-complete-btn')?.addEventListener('click', () => {
    toggleLesson(lesson.id);
    render();
  });

  document.querySelectorAll<HTMLButtonElement>('[data-practice-opt]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activePracticeOption = btn.dataset.practiceOpt || null;
      render();
    });
  });

  document.getElementById('check-practice-btn')?.addEventListener('click', () => {
    if (activePracticeOption) {
      practiceChecked = true;
      render();
    }
  });

  document.getElementById('retry-practice-btn')?.addEventListener('click', () => {
    activePracticeOption = null;
    practiceChecked = false;
    render();
  });

  document.querySelectorAll<HTMLButtonElement>('[data-next-lesson-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextId = btn.dataset.nextLessonBtn;
      if (nextId) {
        currentLessonId = nextId;
        window.history.pushState({}, '', `?id=${nextId}`);
        activePracticeOption = null;
        practiceChecked = false;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll<HTMLButtonElement>('.copy-code-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = decodeURIComponent(btn.dataset.copyCode || '');
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = 'Copy'), 2000);
      });
    });
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLessonsPage);
} else {
  initLessonsPage();
}
