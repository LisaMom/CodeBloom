import React from "react";
import {
  X,
  Sun,
  Moon,
  Home,
  Compass,
  BookOpen,
  HelpCircle,
  Info,
} from "lucide-react";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  isDark,
  onToggleTheme,
}) => {
  if (!isOpen) return null;

  const links = [
    {
      id: "home",
      label: "Home",
      desc: "Overview & learning paths",
      icon: Home,
    },
    {
      id: "roadmaps",
      label: "Roadmaps",
      desc: "Step-by-step developer guides",
      icon: Compass,
    },
    {
      id: "lessons",
      label: "Lessons",
      desc: "Interactive deep-dives",
      icon: BookOpen,
    },
    {
      id: "quizzes",
      label: "Quizzes",
      desc: "Test and validate skills",
      icon: HelpCircle,
    },
    {
      id: "about",
      label: "About",
      desc: "Our mission and open source",
      icon: Info,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-2xl transition-transform">
        <div>
          {/* Header with Dev Tech Logo */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Dev Tech Logo"
                className="h-11 w-auto object-contain dark:hidden"
              />
              <img
                src="/images/logo-dark.png"
                alt="Dev Tech Logo"
                className="h-11 w-auto object-contain hidden dark:block"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 flex flex-col gap-2">
            {links.map((link) => {
              const isActive = currentPage === link.id;
              const IconComponent = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    onClose();
                  }}
                  className={`flex items-center gap-3.5 text-left p-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-base">
                      {link.label}
                    </span>
                    <span className="text-base text-slate-500 dark:text-slate-400">
                      {link.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Theme Switcher */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <span className="text-base font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Appearance
          </span>
          <div className="flex gap-2">
            {/* Light mode button */}
            <button
              onClick={() => {
                if (isDark) {
                  onToggleTheme();
                }
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                !isDark
                  ? "bg-amber-50 border-amber-300 text-amber-700 shadow-sm"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              Light
            </button>
            {/* Dark mode button */}
            <button
              onClick={() => {
                if (!isDark) {
                  onToggleTheme();
                }
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                isDark
                  ? "bg-indigo-950/60 border-indigo-700 text-indigo-300 shadow-sm"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
