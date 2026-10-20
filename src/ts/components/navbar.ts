import { isDark, toggleTheme } from '../theme';
import { getAuth, logout } from '../auth';
import { getTotalCompletedCount, onProgressChange } from '../progress';
import { openMobileMenu } from './mobileMenu';
import { openAuthModal } from './authModal';
import { renderIcons } from '../utils/icons';

export type NavPageId =
  | 'home'
  | 'roadmaps'
  | 'lessons'
  | 'quizzes'
  | 'about'
  | 'certificates'
  | 'Progress'
  | 'progress'
  | 'learning';

export function renderNavbar(activePage: NavPageId): string {
  const auth = getAuth();
  const completedCount = getTotalCompletedCount();
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
      desc: 'Interactive tutorials & guided exercises',
      href: '/pages/lessons.html',
      icon: 'book-open',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60',
      isActive: activePage === 'lessons',
    },
    {
      id: 'Progress',
      label: 'Progress',
      desc: 'Track completed courses & streak',
      href: '/pages/progress.html',
      icon: 'trending-up',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60',
      isActive: activePage === 'Progress' || activePage === 'progress',
    },
    {
      id: 'quizzes',
      label: 'Quizzes',
      desc: 'Skill assessments & challenges',
      href: '/pages/quizzes.html',
      icon: 'help-circle',
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/60',
      isActive: activePage === 'quizzes',
    },
  ];

  return `
    <header class="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        <!-- Brand Logo -->
        <a href="/index.html" class="flex items-center group focus:outline-none cursor-pointer py-1 select-none" aria-label="CodeBloom Home">
          <img src="/images/codebloom-logo-dark.png" alt="CodeBloom Logo" class="h-13 w-auto object-contain hidden dark:block group-hover:scale-105 transition-transform" />
          <img src="/images/codebloom-logo-light.png" alt="CodeBloom Logo" class="h-13 w-auto object-contain dark:hidden group-hover:scale-105 transition-transform" />
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60" aria-label="Main Navigation">
          <!-- Home Link -->
          <a
            href="/index.html"
            class="px-3.5 py-1.5 rounded-xl text-lg font-medium transition-all duration-150 cursor-pointer ${
              activePage === 'home'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-slate-900/5 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }"
          >
            Home
          </a>

          <!-- Roadmaps Link -->
          <a
            href="/pages/roadmaps.html"
            class="px-3.5 py-1.5 rounded-xl text-lg font-medium transition-all duration-150 cursor-pointer ${
              activePage === 'roadmaps'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-slate-900/5 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }"
          >
            Roadmaps
          </a>

          <!-- Learning Dropdown Navigation Item -->
          <div class="relative group" id="nav-learning-group">
            <button
              id="nav-learning-btn"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-controls="nav-learning-menu"
              class="nav-dropdown-btn px-3.5 py-1.5 rounded-xl text-lg font-medium transition-all duration-150 cursor-pointer inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 select-none ${
                isLearningActive
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-slate-900/5 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }"
            >
              <span>Learning</span>
              <i data-lucide="chevron-down" class="nav-dropdown-chevron w-4 h-4"></i>
            </button>

            <!-- Dropdown Menu Container (Hover & Focus & Tap) -->
            <div
              id="nav-learning-menu"
              role="menu"
              aria-labelledby="nav-learning-btn"
              class="nav-dropdown-menu absolute left-1/2 -translate-x-1/2 top-full pt-2 w-72 sm:w-80 z-50"
            >
              <div class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-slate-950/40 p-2 overflow-hidden flex flex-col gap-1">
                <div class="px-3 pt-2 pb-1.5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 mb-1">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Learning Center</span>
                  <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/40">3 Pages</span>
                </div>

                ${learningItems
                  .map(
                    (item) => `
                  <a
                    href="${item.href}"
                    role="menuitem"
                    data-nav-item="${item.id}"
                    class="group/item flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150 cursor-pointer ${
                      item.isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                    }"
                  >
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/item:scale-105 ${item.iconBg}">
                      <i data-lucide="${item.icon}" class="w-5 h-5 ${item.iconColor}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-base font-semibold truncate ${
                          item.isActive
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : 'text-slate-800 dark:text-slate-200 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400'
                        }">
                          ${item.label}
                        </span>
                        ${item.isActive ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>' : ''}
                      </div>
                      <p class="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">${item.desc}</p>
                    </div>
                    <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400 dark:text-slate-500 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0"></i>
                  </a>
                `
                  )
                  .join('')}
              </div>
            </div>
          </div>

          <!-- About Link -->
          <a
            href="/pages/about.html"
            class="px-3.5 py-1.5 rounded-xl text-lg font-medium transition-all duration-150 cursor-pointer ${
              activePage === 'about'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-slate-900/5 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }"
          >
            About
          </a>

          <!-- Certificates Link -->
          <a
            href="/pages/certificates.html"
            class="px-3.5 py-1.5 rounded-xl text-lg font-medium transition-all duration-150 cursor-pointer ${
              activePage === 'certificates'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-slate-900/5 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }"
          >
            Certificates
          </a>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Progress Pill -->
          <div id="nav-progress-pill" class="${completedCount > 0 ? 'inline-flex' : 'hidden'} sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-lg font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
            <span id="nav-completed-count">${completedCount}</span> Completed
          </div>

          <!-- Theme Toggle -->
          <button
            id="nav-theme-toggle"
            type="button"
            aria-label="Toggle theme"
            title="Toggle color theme"
            class="relative flex items-center gap-1.5 px-2 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
              bg-slate-100 hover:bg-slate-200 border-slate-200
              dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700"
          >
            <span class="sun-icon flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200">
              <i data-lucide="sun" class="w-3.5 h-3.5"></i>
            </span>
            <span class="moon-icon flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200">
              <i data-lucide="moon" class="w-3.5 h-3.5"></i>
            </span>
          </button>

          <!-- Auth Button (Sign In / Sign Out) -->
          <div id="nav-auth-container" class="hidden sm:flex items-center gap-2">
            ${auth.isAuthenticated
              ? `
                  <button
                    id="nav-logout-btn"
                    type="button"
                    class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-lg font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-red-600 dark:hover:text-red-400 transition-all cursor-pointer"
                    title="Signed in as ${auth.user?.email}"
                  >
                    <i data-lucide="log-out" class="w-4 h-4"></i>
                    <span>Sign out</span>
                  </button>
                `
              : `
                  <button
                    id="nav-login-btn"
                    type="button"
                    class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-lg font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-all cursor-pointer"
                  >
                    <i data-lucide="log-in" class="w-4 h-4"></i>
                    <span>Get Started</span>
                  </button>
                `
            }
          </div>

          <!-- Mobile Hamburger Button -->
          <button
            id="nav-mobile-btn"
            type="button"
            class="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Open mobile navigation"
          >
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
        </div>
      </div>
    </header>
  `;
}

export function initNavbarEvents(activePage: NavPageId): void {
  // Update theme pill appearance
  const updateThemeButton = () => {
    const dark = isDark();
    const btn = document.getElementById('nav-theme-toggle');
    if (!btn) return;
    const sun = btn.querySelector('.sun-icon');
    const moon = btn.querySelector('.moon-icon');

    if (!dark) {
      sun?.classList.remove('text-slate-400', 'scale-90', 'opacity-60');
      sun?.classList.add('bg-amber-400', 'text-white', 'scale-100');
      moon?.classList.remove('bg-indigo-500', 'text-white', 'scale-100');
      moon?.classList.add('text-slate-400', 'scale-90', 'opacity-60');
    } else {
      moon?.classList.remove('text-slate-400', 'scale-90', 'opacity-60');
      moon?.classList.add('bg-indigo-500', 'text-white', 'scale-100');
      sun?.classList.remove('bg-amber-400', 'text-white', 'scale-100');
      sun?.classList.add('text-slate-400', 'scale-90', 'opacity-60');
    }
  };

  updateThemeButton();

  document.getElementById('nav-theme-toggle')?.addEventListener('click', () => {
    toggleTheme();
    updateThemeButton();
  });

  window.addEventListener('codebloom:theme-change', updateThemeButton);

  // Learning dropdown interactive & accessible behavior
  const learningGroup = document.getElementById('nav-learning-group');
  const learningBtn = document.getElementById('nav-learning-btn') as HTMLButtonElement | null;
  const learningMenu = document.getElementById('nav-learning-menu');
  const menuItems = learningMenu
    ? Array.from(learningMenu.querySelectorAll<HTMLAnchorElement>('a[role="menuitem"]'))
    : [];

  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  const openDropdown = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    learningGroup?.classList.add('is-open');
    learningMenu?.classList.add('is-open');
    learningBtn?.setAttribute('aria-expanded', 'true');
  };

  const closeDropdown = () => {
    learningGroup?.classList.remove('is-open');
    learningMenu?.classList.remove('is-open');
    learningBtn?.setAttribute('aria-expanded', 'false');
  };

  const scheduleClose = () => {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      closeDropdown();
    }, 150);
  };

  if (learningGroup && learningBtn && learningMenu) {
    // Mouse hover interactions with tolerance buffer
    learningGroup.addEventListener('mouseenter', openDropdown);
    learningGroup.addEventListener('mouseleave', scheduleClose);

    // Click/tap toggle (for touchscreens, tablet views, or click users)
    learningBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = learningMenu.classList.contains('is-open');
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!learningGroup.contains(e.target as Node)) {
        closeDropdown();
      }
    });

    // Keyboard navigation on button
    learningBtn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDropdown();
        menuItems[0]?.focus();
      } else if (e.key === 'Escape') {
        closeDropdown();
      }
    });

    // Keyboard navigation inside dropdown menu items
    menuItems.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (index + 1) % menuItems.length;
          menuItems[nextIndex]?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (index === 0) {
            learningBtn.focus();
            closeDropdown();
          } else {
            menuItems[index - 1]?.focus();
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeDropdown();
          learningBtn.focus();
        } else if (e.key === 'Tab' && !e.shiftKey && index === menuItems.length - 1) {
          closeDropdown();
        } else if (e.key === 'Tab' && e.shiftKey && index === 0) {
          closeDropdown();
        }
      });
    });

    // Close when focus completely leaves the group
    learningGroup.addEventListener('focusout', (e) => {
      const nextTarget = e.relatedTarget as Node | null;
      if (!nextTarget || !learningGroup.contains(nextTarget)) {
        closeDropdown();
      }
    });
  }

  // Ensure header icons are properly rendered
  const headerEl = document.querySelector('header');
  if (headerEl) {
    renderIcons(headerEl);
  }

  // Mobile menu button
  document.getElementById('nav-mobile-btn')?.addEventListener('click', () => {
    openMobileMenu(activePage);
  });

  // Login / Logout buttons
  document.getElementById('nav-logout-btn')?.addEventListener('click', () => {
    logout();
    window.location.reload();
  });

  document.getElementById('nav-login-btn')?.addEventListener('click', () => {
    openAuthModal();
  });

  // Progress change updates completed pill
  onProgressChange(() => {
    const count = getTotalCompletedCount();
    const pill = document.getElementById('nav-progress-pill');
    const countEl = document.getElementById('nav-completed-count');
    if (pill && countEl) {
      countEl.textContent = count.toString();
      if (count > 0) pill.classList.remove('hidden');
    }
  });
}
