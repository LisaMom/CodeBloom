import '../css/main.css';
import { initTheme } from './theme';
import { renderNavbar, initNavbarEvents } from './components/navbar';
import { renderFooter } from './components/footer';
import { renderIcons } from './utils/icons';
import { roadmapsData } from './data/roadmaps';
import { Roadmap } from './types/roadmap';
import {
  getCompletedSteps,
  toggleStep,
  getBookmarks,
  toggleBookmark,
} from './progress';
import { updateSEO } from './utils/seo';

const icons: Record<string, string> = {
  Globe: 'globe',
  Layout: 'layout',
  Code: 'code',
  Coffee: 'coffee',
  Server: 'server',
  Cpu: 'cpu',
};

const difficultyConfig = {
  Beginner: {
    pill: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
    dot: 'bg-emerald-500',
  },
  Intermediate: {
    pill: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60',
    dot: 'bg-indigo-500',
  },
  Advanced: {
    pill: 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-400 border-rose-200 dark:border-rose-800/60',
    dot: 'bg-rose-500',
  },
} as const;

let selectedDifficulty = 'All';
let searchQuery = '';
let currentRoadmapId: string | null = null;

export function initRoadmapsPage(): void {
  initTheme();

  // Read URL query param e.g. ?id=web-development
  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get('id');
  if (paramId && roadmapsData.some((r) => r.id === paramId)) {
    currentRoadmapId = paramId;
  }

  render();
}

function render(): void {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const currentRoadmap = currentRoadmapId
    ? roadmapsData.find((r) => r.id === currentRoadmapId) || null
    : null;

  if (currentRoadmap) {
    updateSEO({
      title: `${currentRoadmap.title} Roadmap | CodeBloom`,
      description: currentRoadmap.description,
    });
    appEl.innerHTML = `
      ${renderNavbar('roadmaps')}
      <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        ${renderDetailView(currentRoadmap)}
      </main>
      ${renderFooter()}
    `;
    initNavbarEvents('roadmaps');
    attachDetailEvents(currentRoadmap);
  } else {
    updateSEO({
      title: 'Roadmaps',
      description: 'Step-by-step developer roadmaps covering Frontend, Backend, DevOps, AI, and Fullstack systems.',
    });
    appEl.innerHTML = `
      ${renderNavbar('roadmaps')}
      <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        ${renderCatalogView()}
      </main>
      ${renderFooter()}
    `;
    initNavbarEvents('roadmaps');
    attachCatalogEvents();
  }

  renderIcons(appEl);
}

function renderCatalogView(): string {
  const completedSteps = getCompletedSteps();
  const bookmarks = getBookmarks();
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filtered = roadmapsData.filter((r) => {
    const matchesDiff = selectedDifficulty === 'All' || r.difficulty === selectedDifficulty;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q);
    return matchesDiff && matchesSearch;
  });

  return `
    <div class="space-y-6">
      <div class="max-w-2xl space-y-3">
        <span class="inline-flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          <span class="w-4 h-px bg-emerald-500"></span>
          Learning Paths
        </span>
        <h1 class="text-5xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Choose Your
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-700">
            Learning Path
          </span>
        </h1>
        <p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          Curated developer roadmaps — from your first line of HTML to shipping production software. Follow clear milestones, track your progress, and grow at your own pace.
        </p>
      </div>

      <!-- Search + Filter Row -->
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1 max-w-md">
          <span class="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
            <i data-lucide="search" class="w-4 h-4"></i>
          </span>
          <input
            id="roadmap-search-input"
            type="text"
            value="${searchQuery}"
            placeholder="Search roadmaps…"
            class="w-full pl-10 pr-9 py-2.5 rounded-xl text-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
          />
          ${searchQuery
      ? `<button id="clear-search-btn" class="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>`
      : ''
    }
        </div>

        <div class="flex items-center gap-1.5 flex-wrap">
          ${difficulties
      .map(
        (d) => `
                <button
                  data-diff="${d}"
                  class="diff-filter-btn px-3.5 py-2 rounded-xl text-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${selectedDifficulty === d
            ? 'bg-emerald-600 text-white  '
            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600'
          }"
                >
                  ${d}
                </button>
              `
      )
      .join('')}
        </div>
      </div>

      <p class="text-base text-slate-400 dark:text-slate-500">
        ${filtered.length === roadmapsData.length
      ? `${roadmapsData.length} roadmaps available`
      : `${filtered.length} of ${roadmapsData.length} roadmaps`
    }
      </p>
    </div>

    ${filtered.length === 0
      ? `
          <div class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <SearchCode color="#10A36A" />
            <p class="font-bold text-slate-900 dark:text-white text-lg">No roadmaps found</p>
            <p class="text-lg text-slate-500 dark:text-slate-400 mt-1">Try a different keyword or filter</p>
            <button id="reset-filter-btn" class="mt-4 px-4 py-2 text-lg font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors">
              Clear filters
            </button>
          </div>
        `
      : `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${filtered
        .map((roadmap) => {
          const allStepIds = roadmap.milestones.flatMap((m) => m.steps.map((s) => s.id));
          const completedCount = allStepIds.filter((id) => completedSteps.includes(id)).length;
          const progress = allStepIds.length ? Math.round((completedCount / allStepIds.length) * 100) : 0;
          const dc = difficultyConfig[roadmap.difficulty as keyof typeof difficultyConfig] || difficultyConfig.Beginner;
          const iconName = icons[roadmap.iconName] || 'globe';
          const isBookmarked = bookmarks.includes(roadmap.id);

          return `
                  <div
                    data-roadmap-card="${roadmap.id}"
                    class="group relative flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-400/60 dark:hover:border-emerald-600/50  hover: transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <div class="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 group-hover:h-1" style="background-color: ${roadmap.accentColor};"></div>

                    <div class="flex items-start justify-between mb-4">
                      <div class="flex items-center justify-center w-12 h-12 rounded-2xl text-white " style="background-color: ${roadmap.accentColor};">
                        <i data-lucide="${iconName}" class="w-6 h-6"></i>
                      </div>
                      <button
                        type="button"
                        data-bookmark-roadmap="${roadmap.id}"
                        class="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="${isBookmarked ? 'Remove bookmark' : 'Bookmark'}"
                      >
                        <i data-lucide="bookmark" class="w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}"></i>
                      </button>
                    </div>

                    <div class="flex-1 space-y-1.5 mb-4">
                      <h3 class="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        ${roadmap.title}
                      </h3>
                      <p class="text-lg text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        ${roadmap.subtitle}
                      </p>
                    </div>

                    <div class="flex items-center gap-2 mb-4 flex-wrap">
                      <span class="inline-flex items-center gap-1.5 text-[14px] font-bold px-2.5 py-1 rounded-full border ${dc.pill}">
                        <span class="w-1.5 h-1.5 rounded-full ${dc.dot}"></span>
                        ${roadmap.difficulty}
                      </span>
                      <span class="inline-flex items-center gap-1 text-[14px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                        <i data-lucide="file-text" class="w-3 h-3"></i>
                        ${roadmap.totalSteps} lessons
                      </span>
                      <span class="inline-flex items-center gap-1 text-[14px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                        <i data-lucide="clock" class="w-3 h-3"></i>
                        ~${roadmap.estimatedWeeks}w
                      </span>
                    </div>

                    <div class="space-y-1.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                      <div class="flex items-center justify-between text-[14px] font-semibold text-slate-500 dark:text-slate-400">
                        <span>${completedCount} / ${allStepIds.length} completed</span>
                        <span class="text-emerald-600 dark:text-emerald-400 font-bold">${progress}%</span>
                      </div>
                      <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden h-1.5 border border-slate-200/50 dark:border-slate-700/50">
                        <div class="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
                      </div>
                    </div>

                    <div class="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
                      <div class="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                      </div>
                    </div>
                  </div>
                `;
        })
        .join('')}
          </div>
        `
    }
  `;
}

function attachCatalogEvents(): void {
  const searchInput = document.getElementById('roadmap-search-input') as HTMLInputElement | null;
  searchInput?.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    render();
  });

  document.getElementById('clear-search-btn')?.addEventListener('click', () => {
    searchQuery = '';
    render();
  });

  document.getElementById('reset-filter-btn')?.addEventListener('click', () => {
    searchQuery = '';
    selectedDifficulty = 'All';
    render();
  });

  document.querySelectorAll<HTMLButtonElement>('.diff-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedDifficulty = btn.dataset.diff || 'All';
      render();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-roadmap-card]').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.roadmapCard;
      if (id) {
        currentRoadmapId = id;
        window.history.pushState({}, '', `?id=${id}`);
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-bookmark-roadmap]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.bookmarkRoadmap;
      if (id) {
        toggleBookmark(id);
        render();
      }
    });
  });
}

function renderDetailView(roadmap: Roadmap): string {
  const completedSteps = getCompletedSteps();
  const bookmarks = getBookmarks();
  const allSteps = roadmap.milestones.flatMap((m) => m.steps);
  const allStepIds = allSteps.map((s) => s.id);
  const completedCount = allStepIds.filter((id) => completedSteps.includes(id)).length;
  const progressPercent = allStepIds.length ? Math.round((completedCount / allStepIds.length) * 100) : 0;
  const isBookmarked = bookmarks.includes(roadmap.id);
  const dc = difficultyConfig[roadmap.difficulty as keyof typeof difficultyConfig] || difficultyConfig.Beginner;
  const iconName = icons[roadmap.iconName] || 'globe';

  const nextStep = allSteps.find((s) => !completedSteps.includes(s.id) && s.status !== 'locked');

  return `
    <div class="space-y-8 animate-fadeIn">
      <!-- Back Nav -->
      <button
        id="detail-back-btn"
        type="button"
        class="inline-flex items-center gap-2 text-lg font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group"
      >
        <span class="w-7 h-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center group-hover:border-emerald-400 dark:group-hover:border-emerald-600 transition-colors">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
        </span>
        Back to all roadmaps
      </button>

      <!-- Hero Banner -->
      <div class="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-7 sm:p-10 ">
        <div class="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style="background-color: ${roadmap.accentColor};"></div>
        <div class="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-8 blur-2xl pointer-events-none bg-indigo-500"></div>

        <div class="relative flex flex-col sm:flex-row sm:items-start gap-6">
          <div class="flex items-center justify-center w-16 h-16 rounded-2xl text-white  shrink-0" style="background-color: ${roadmap.accentColor};">
            <i data-lucide="${iconName}" class="w-8 h-8"></i>
          </div>

          <div class="flex-1 space-y-4">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="inline-flex items-center gap-1.5 text-base font-bold px-2.5 py-1 rounded-full border ${dc.pill}">
                <span class="w-1.5 h-1.5 rounded-full ${dc.dot}"></span>
                ${roadmap.difficulty}
              </span>
              <span class="text-base font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                ${roadmap.category}
              </span>
              <span class="text-base font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                ~${roadmap.estimatedWeeks} weeks
              </span>
            </div>

            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                ${roadmap.title}
              </h1>
              <p class="mt-2 text-lg sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                ${roadmap.description}
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2 max-w-md">
              <div class="flex items-center justify-between text-base font-semibold">
                <span class="text-slate-600 dark:text-slate-300">Overall Progress</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">${completedCount}/${allStepIds.length} steps · ${progressPercent}%</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-500" style="width: ${progressPercent}%"></div>
              </div>
            </div>

            <div class="flex items-center gap-3 flex-wrap pt-1">
              ${nextStep
      ? `
                    <button
                      id="detail-continue-btn"
                      data-next-id="${nextStep.id}"
                      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold transition-all cursor-pointer"
                    >
                      <i data-lucide="play" class="w-4 h-4 fill-white"></i>
                      Continue Learning
                    </button>
                  `
      : ''
    }
              ${progressPercent === 100
      ? `
                    <a
                      href="/pages/certificates.html?roadmap=${roadmap.id}"
                      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-lg font-bold border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-all cursor-pointer"
                    >
                      <i data-lucide="award" class="w-4 h-4"></i> View Certificate!
                    </a>
                  `
      : ''
    }
              <button
                id="detail-bookmark-btn"
                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-lg font-semibold transition-all cursor-pointer ${isBookmarked
      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-400'
    }"
              >
                <i data-lucide="bookmark" class="w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}"></i>
                ${isBookmarked ? 'Bookmarked' : 'Save Roadmap'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Outcomes + Prerequisites -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <h3 class="text-lg font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <span class="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-base">✓</span>
            What You'll Master
          </h3>
          <ul class="space-y-2">
            ${roadmap.learningOutcomes
      .map(
        (item) => `
                  <li class="flex items-start gap-2 text-lg text-slate-600 dark:text-slate-300">
                    <span class="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
                    ${item}
                  </li>
                `
      )
      .join('')}
          </ul>
        </div>

        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <h3 class="text-lg font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <span class="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-base">→</span>
            Prerequisites
          </h3>
          <ul class="space-y-2">
            ${roadmap.prerequisites
      .map(
        (item) => `
                  <li class="flex items-start gap-2 text-lg text-slate-600 dark:text-slate-300">
                    <span class="mt-0.5 shrink-0 text-indigo-500 font-bold">•</span>
                    ${item}
                  </li>
                `
      )
      .join('')}
          </ul>
        </div>
      </div>

      <!-- Timeline -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">Learning Milestones</h2>
          <span class="text-lg font-semibold text-slate-500 dark:text-slate-400">${completedCount} of ${allStepIds.length} completed</span>
        </div>

        <div class="relative">
          ${allSteps
      .map((step, idx) => {
        const isCompleted = completedSteps.includes(step.id);
        const isLast = idx === allSteps.length - 1;
        const isLocked = step.status === 'locked' && !isCompleted;
        const isInProgress = step.status === 'in-progress' && !isCompleted;

        return `
                <div class="relative flex gap-5">
                  <!-- Left gutter: circle + connector -->
                  <div class="flex flex-col items-center">
                    <button
                      type="button"
                      data-toggle-step="${step.id}"
                      ${isLocked ? 'disabled' : ''}
                      class="relative w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isCompleted
            ? 'bg-emerald-500 border-emerald-500 text-white cursor-pointer hover:scale-110'
            : isInProgress
              ? 'bg-indigo-500 border-indigo-500 text-white cursor-pointer hover:scale-110'
              : isLocked
                ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 opacity-70 cursor-not-allowed'
                : 'bg-white dark:bg-slate-800 border-amber-400 dark:border-amber-500 text-slate-600 dark:text-slate-300 cursor-pointer hover:scale-110'
          }"
                      title="${isCompleted ? 'Mark incomplete' : isLocked ? 'Locked step' : 'Mark completed'}"
                    >
                      ${isCompleted
            ? '<i data-lucide="check" class="w-5 h-5 text-white stroke-[3]"></i>'
            : isLocked
              ? '<i data-lucide="lock" class="w-4 h-4 text-slate-400"></i>'
              : isInProgress
                ? '<span class="w-3 h-3 rounded-full bg-white animate-pulse"></span>'
                : `<span class="text-lg font-extrabold">${step.order}</span>`
          }
                    </button>
                    ${!isLast
            ? `<div class="w-0.5 flex-1 min-h-[2rem] mt-1 rounded-full ${isCompleted ? 'bg-emerald-400 dark:bg-emerald-600' : 'bg-slate-200 dark:bg-slate-700'
            }"></div>`
            : ''
          }
                  </div>

                  <!-- Right step card -->
                  <div class="flex-1 mb-5 p-5 rounded-2xl border transition-all ${isCompleted
            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/70 dark:border-emerald-800/50'
            : isInProgress
              ? 'bg-white dark:bg-slate-900 border-indigo-300/70 dark:border-indigo-700/60'
              : isLocked
                ? 'bg-slate-50/60 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800/60 opacity-70'
                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80'
          }">
                    <div class="flex items-start justify-between gap-3 flex-wrap mb-3">
                      <div class="space-y-1">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-[14px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                            ${step.category}
                          </span>
                          <span class="text-slate-300 dark:text-slate-600 text-base">·</span>
                          <span class="text-[14px] text-slate-400">~${step.estimatedHours} hrs</span>
                          <span class="inline-flex items-center gap-1.5 text-[14px] font-bold px-2 py-0.5 rounded-full border ${isCompleted
            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300/60'
            : isInProgress
              ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-300/60'
              : isLocked
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 border-amber-200'
          }">
                            ${isCompleted
            ? '✓ Completed'
            : isInProgress
              ? 'In Progress'
              : isLocked
                ? '🔒 Locked'
                : 'Next Up'
          }
                          </span>
                        </div>
                        <h3 class="text-base font-extrabold leading-snug ${isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
          }">
                          ${step.title}
                        </h3>
                      </div>
                    </div>

                    <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      ${step.description}
                    </p>

                    ${step.keyTopics && step.keyTopics.length > 0
            ? `
                          <div class="flex flex-wrap gap-1.5 mb-3">
                            ${step.keyTopics
              .map(
                (topic) => `
                                  <span class="text-base px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 font-mono">
                                    ${topic}
                                  </span>
                                `
              )
              .join('')}
                          </div>
                        `
            : ''
          }

                    <div class="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <div class="flex items-center gap-3 flex-wrap">
                        ${(step.resources || [])
            .map(
              (res) => `
                              <a
                                href="${res.url}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center gap-1 text-base text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                              >
                                ${res.title}
                                <i data-lucide="external-link" class="w-3 h-3"></i>
                              </a>
                            `
            )
            .join('')}
                      </div>

                      <div class="flex items-center gap-2">
                        ${!isLocked
            ? `
                              <button
                                type="button"
                                data-toggle-step="${step.id}"
                                class="text-base font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${isCompleted
              ? 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white  '
            }"
                              >
                                ${isCompleted ? 'Undo ✓' : 'Mark Done ✓'}
                              </button>
                            `
            : ''
          }
                        ${step.relatedLessonId
            ? `
                              <a
                                href="/pages/lessons.html?id=${step.relatedLessonId}"
                                class="text-base font-bold px-3 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all cursor-pointer"
                              >
                                Open Lesson →
                              </a>
                            `
            : ''
          }
                      </div>
                    </div>
                  </div>
                </div>
              `;
      })
      .join('')}
        </div>

        ${progressPercent === 100
      ? `
              <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-indigo-50 dark:from-emerald-950/30 dark:to-indigo-950/30 border border-emerald-200 dark:border-emerald-800/60 mt-6">
                <div class="text-5xl mb-3">🎉</div>
                <h3 class="text-xl font-extrabold text-slate-900 dark:text-white">Roadmap Complete!</h3>
                <p class="text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
                  Excellent work! You've completed the entire <span class="font-semibold text-emerald-600 dark:text-emerald-400">${roadmap.title}</span> roadmap. Claim your official verified certificate!
                </p>
                <a
                  href="/pages/certificates.html?roadmap=${roadmap.id}"
                  class="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg  transition-all"
                >
                  <i data-lucide="award" class="w-4 h-4"></i> Claim Certificate
                </a>
              </div>
            `
      : ''
    }
      </div>
    </div>
  `;
}

function attachDetailEvents(roadmap: Roadmap): void {
  document.getElementById('detail-back-btn')?.addEventListener('click', () => {
    currentRoadmapId = null;
    window.history.pushState({}, '', '/pages/roadmaps.html');
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('detail-bookmark-btn')?.addEventListener('click', () => {
    toggleBookmark(roadmap.id);
    render();
  });

  const continueBtn = document.getElementById('detail-continue-btn');
  continueBtn?.addEventListener('click', () => {
    const nextId = continueBtn.getAttribute('data-next-id');
    if (nextId) {
      toggleStep(nextId);
      render();
    }
  });

  document.querySelectorAll<HTMLButtonElement>('[data-toggle-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const stepId = btn.getAttribute('data-toggle-step');
      if (stepId) {
        toggleStep(stepId);
        render();
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRoadmapsPage);
} else {
  initRoadmapsPage();
}
