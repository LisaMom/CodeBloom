import React from "react";

export interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  completedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenMobileMenu,
  completedCount = 0,
}) => {
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "roadmaps", label: "Roadmaps" },
    { id: "lessons", label: "Lessons" },
    { id: "quizzes", label: "Quizzes" },
    { id: "about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 p-1.5 shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
            >
              <path
                d="M50 18 C58 32, 68 42, 82 50 C68 58, 58 68, 50 82 C42 68, 32 58, 18 50 C32 42, 42 32, 50 18 Z"
                fill="currentColor"
                fillOpacity="0.25"
              />
              <path
                d="M42 38 C38 38, 36 40, 36 45 C36 48, 33 50, 29 50 C33 50, 36 52, 36 55 C36 60, 38 62, 42 62"
                strokeLinecap="round"
                strokeWidth="8"
              />
              <path
                d="M58 38 C62 38, 64 40, 64 45 C64 48, 67 50, 71 50 C67 50, 64 52, 64 55 C64 60, 62 62, 58 62"
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              Code<span className="text-emerald-500">Bloom</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 dark:text-slate-400 -mt-1">
              Dev Academy
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-1.5 rounded-xl text-lg font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm shadow-slate-900/5 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Progress Pill */}
          {completedCount > 0 && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {completedCount} Completed
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
          >
            {isDark ? (
              // Sun icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // Moon icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Start Learning CTA Button (from design spec) */}
          <button
            onClick={() => onNavigate("roadmaps")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Learning</span>
            <span aria-hidden="true">→</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Open mobile navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
