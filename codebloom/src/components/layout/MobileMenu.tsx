import React from "react";

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
    { id: "home", label: "Home", desc: "Overview & learning paths" },
    {
      id: "roadmaps",
      label: "Roadmaps",
      desc: "Step-by-step developer guides",
    },
    { id: "lessons", label: "Lessons", desc: "Interactive deep-dives" },
    { id: "quizzes", label: "Quizzes", desc: "Test and validate skills" },
    { id: "about", label: "About", desc: "Our mission and open source" },
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
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
            <span className="font-extrabold text-lg text-slate-900 dark:text-white">
              Code<span className="text-emerald-500">Bloom</span>
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 flex flex-col gap-2">
            {links.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    onClose();
                  }}
                  className={`flex flex-col text-left p-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="font-semibold text-base">{link.label}</span>
                  <span className="text-base text-slate-500 dark:text-slate-400">
                    {link.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Theme Switcher & Info */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-lg font-medium text-slate-600 dark:text-slate-400">
            Appearance
          </span>
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-base font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
    </div>
  );
};
