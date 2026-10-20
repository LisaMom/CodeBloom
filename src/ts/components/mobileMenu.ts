import { isDark, applyTheme } from '../theme';
import { renderIcons } from '../utils/icons';
import type { NavPageId } from './navbar';

export function openMobileMenu(activePage: NavPageId): void {
  let menuEl = document.getElementById('codebloom-mobile-menu');
  if (!menuEl) {
    menuEl = document.createElement('div');
    menuEl.id = 'codebloom-mobile-menu';
    document.body.appendChild(menuEl);
  }

  const isLearningActive =
    activePage === 'lessons' ||
    activePage === 'quizzes' ||
    activePage === 'Progress' ||
    activePage === 'progress' ||
    activePage === 'learning';

  const learningItems = [
    {
      id: 'lessons',
      label: 'Lessons',
      href: '/pages/lessons.html',
      desc: 'Interactive deep-dives',
      icon: 'book-open',
      isActive: activePage === 'lessons',
    },
    {
      id: 'Progress',
      label: 'Progress',
      href: '/pages/progress.html',
      desc: 'Track completed courses',
      icon: 'trending-up',
      isActive: activePage === 'Progress' || activePage === 'progress',
    },
    {
      id: 'quizzes',
      label: 'Quizzes',
      href: '/pages/quizzes.html',
      desc: 'Test and validate skills',
      icon: 'help-circle',
      isActive: activePage === 'quizzes',
    },
  ];

  const dark = isDark();

  menuEl.innerHTML = `
    <div class="fixed inset-0 z-50 md:hidden animate-fadeIn">
      <!-- Backdrop -->
      <div id="mobile-menu-backdrop" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>

      <!-- Menu Panel -->
      <div class="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between transition-transform overflow-y-auto">
        <div>
          <!-- Header with Logo -->
          <div class="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center">
              <img src="/assets/logo.png" alt="CodeBloom Logo" class="h-10 w-auto object-contain dark:hidden" />
              <img src="/assets/logo-dark.png" alt="CodeBloom Logo" class="h-10 w-auto object-contain hidden dark:block" />
            </div>
            <button id="mobile-menu-close" class="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer" aria-label="Close menu">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Navigation Links -->
          <div class="mt-6 flex flex-col gap-2">
            <!-- Home -->
            <a
              href="/index.html"
              class="flex items-center gap-3.5 text-left p-3 rounded-xl transition-all ${
                activePage === 'home'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                activePage === 'home'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }">
                <i data-lucide="home" class="w-5 h-5"></i>
              </div>
              <div class="flex flex-col">
                <span class="font-semibold text-base">Home</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">Overview & learning paths</span>
              </div>
            </a>

            <!-- Roadmaps -->
            <a
              href="/pages/roadmaps.html"
              class="flex items-center gap-3.5 text-left p-3 rounded-xl transition-all ${
                activePage === 'roadmaps'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                activePage === 'roadmaps'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }">
                <i data-lucide="compass" class="w-5 h-5"></i>
              </div>
              <div class="flex flex-col">
                <span class="font-semibold text-base">Roadmaps</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">Step-by-step developer guides</span>
              </div>
            </a>

            <!-- Learning Collapsible Accordion -->
            <div class="rounded-xl border ${
              isLearningActive
                ? 'border-emerald-200/70 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                : 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/30'
            } overflow-hidden transition-all">
              <button
                id="mobile-learning-toggle"
                type="button"
                aria-expanded="${isLearningActive ? 'true' : 'false'}"
                class="w-full flex items-center justify-between p-3 text-left cursor-pointer transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
              >
                <div class="flex items-center gap-3.5">
                  <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isLearningActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }">
                    <i data-lucide="graduation-cap" class="w-5 h-5"></i>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-semibold text-base ${isLearningActive ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}">Learning</span>
                    <span class="text-xs text-slate-500 dark:text-slate-400">Lessons, Progress & Quizzes</span>
                  </div>
                </div>
                <i
                  id="mobile-learning-chevron"
                  data-lucide="chevron-down"
                  class="w-5 h-5 text-slate-400 transition-transform duration-200 ${isLearningActive ? 'rotate-180' : ''}"
                ></i>
              </button>

              <!-- Submenu Items -->
              <div
                id="mobile-learning-submenu"
                class="px-3 pb-3 pt-1 flex flex-col gap-1 border-t border-slate-200/50 dark:border-slate-800/50 ${isLearningActive ? '' : 'hidden'}"
              >
                ${learningItems
                  .map((item) => `
                    <a
                      href="${item.href}"
                      class="flex items-center gap-3 p-2.5 rounded-lg text-left transition-all ${
                        item.isActive
                          ? 'bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }"
                    >
                      <i data-lucide="${item.icon}" class="w-4 h-4 ${item.isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}"></i>
                      <div class="flex flex-col">
                        <span class="text-sm font-semibold">${item.label}</span>
                        <span class="text-[11px] text-slate-500 dark:text-slate-400">${item.desc}</span>
                      </div>
                    </a>
                  `)
                  .join('')}
              </div>
            </div>

            <!-- Certificates -->
            <a
              href="/pages/certificates.html"
              class="flex items-center gap-3.5 text-left p-3 rounded-xl transition-all ${
                activePage === 'certificates'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                activePage === 'certificates'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }">
                <i data-lucide="award" class="w-5 h-5"></i>
              </div>
              <div class="flex flex-col">
                <span class="font-semibold text-base">Certificates</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">View achievements & preview credentials</span>
              </div>
            </a>

            <!-- About -->
            <a
              href="/pages/about.html"
              class="flex items-center gap-3.5 text-left p-3 rounded-xl transition-all ${
                activePage === 'about'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                activePage === 'about'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }">
                <i data-lucide="info" class="w-5 h-5"></i>
              </div>
              <div class="flex flex-col">
                <span class="font-semibold text-base">About</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">Our mission and mentors</span>
              </div>
            </a>
          </div>
        </div>

        <!-- Bottom Theme Switcher -->
        <div class="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Appearance</span>
          <div class="flex gap-2">
            <button
              id="mobile-theme-light"
              type="button"
              class="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-lg font-semibold transition-all cursor-pointer ${
                !dark
                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
              }"
            >
              <i data-lucide="sun" class="w-4 h-4 text-amber-500"></i>
              Light
            </button>
            <button
              id="mobile-theme-dark"
              type="button"
              class="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-lg font-semibold transition-all cursor-pointer ${
                dark
                  ? 'bg-indigo-950/60 border-indigo-700 text-indigo-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
              }"
            >
              <i data-lucide="moon" class="w-4 h-4 text-indigo-400"></i>
              Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  renderIcons(menuEl);

  const close = () => {
    if (menuEl) menuEl.innerHTML = '';
  };

  document.getElementById('mobile-menu-close')?.addEventListener('click', close);
  document.getElementById('mobile-menu-backdrop')?.addEventListener('click', close);
  menuEl.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  // Accordion click/tap handler for Learning
  const learningToggle = document.getElementById('mobile-learning-toggle');
  const learningSubmenu = document.getElementById('mobile-learning-submenu');
  const learningChevron = document.getElementById('mobile-learning-chevron');

  learningToggle?.addEventListener('click', () => {
    const isHidden = learningSubmenu?.classList.contains('hidden');
    if (isHidden) {
      learningSubmenu?.classList.remove('hidden');
      learningChevron?.classList.add('rotate-180');
      learningToggle?.setAttribute('aria-expanded', 'true');
    } else {
      learningSubmenu?.classList.add('hidden');
      learningChevron?.classList.remove('rotate-180');
      learningToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  document.getElementById('mobile-theme-light')?.addEventListener('click', () => {
    applyTheme('light');
    openMobileMenu(activePage);
  });

  document.getElementById('mobile-theme-dark')?.addEventListener('click', () => {
    applyTheme('dark');
    openMobileMenu(activePage);
  });
}
