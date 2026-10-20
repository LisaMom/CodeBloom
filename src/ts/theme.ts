export type Theme = 'light' | 'dark';

const THEME_KEY = 'CodeBloom_theme';

export function getTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {}
  return 'dark';
}

export function isDark(): boolean {
  return getTheme() === 'dark';
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  if (theme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    metaThemeColor?.setAttribute('content', '#020617');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    metaThemeColor?.setAttribute('content', '#f5f5f5');
  }

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}

  window.dispatchEvent(new CustomEvent('codebloom:theme-change', { detail: { theme } }));
}

export function toggleTheme(): Theme {
  const current = getTheme();
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

export function initTheme(): void {
  applyTheme(getTheme());
}
