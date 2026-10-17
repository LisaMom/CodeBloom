import React from "react";
import { Sun, Moon, Menu, ArrowRight, LogOut } from "lucide-react";

export interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  completedCount?: number;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenMobileMenu,
  completedCount = 0,
  onLogout,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo (Consistent in Light and Dark Mode) */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center group focus:outline-none cursor-pointer py-1 select-none"
          aria-label="Dev Tech Home"
        >
          <img
            src="/images/logo.png"
            alt="Dev Tech Logo"
            className="h-13 w-auto object-contain dark:hidden group-hover:scale-105 transition-transform"
          />
          <img
            src="/images/logo-dark.png"
            alt="Dev Tech Logo"
            className="h-13 w-auto object-contain hidden dark:block group-hover:scale-105 transition-transform drop-shadow-[0_2px_8px_rgba(255,255,255,0.08)]"
          />
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

          {/* Theme Toggle — Animated Pill */}
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative flex items-center gap-1.5 px-2 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
              bg-slate-100 hover:bg-slate-200 border-slate-200
              dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700"
          >
            {/* Sun icon */}
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200 ${
                !isDark
                  ? "bg-amber-400 text-white shadow-sm shadow-amber-400/40 scale-100"
                  : "text-slate-400 scale-90 opacity-60"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </span>
            {/* Moon icon */}
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200 ${
                isDark
                  ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/40 scale-100"
                  : "text-slate-400 scale-90 opacity-60"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Start Learning CTA Button */}
          <button
            onClick={() => onNavigate("roadmaps")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              aria-label="Sign out"
              title="Sign out"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-red-600 dark:hover:text-red-400 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
