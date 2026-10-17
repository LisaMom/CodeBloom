import React from "react";

export interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 p-1 flex items-center justify-center text-white">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                >
                  <path
                    d="M50 18 C58 32, 68 42, 82 50 C68 58, 58 68, 50 82 C42 68, 32 58, 18 50 C32 42, 42 32, 50 18 Z"
                    fill="currentColor"
                    fillOpacity="0.25"
                  />
                  <path
                    d="M42 38 C38 38, 36 40, 36 45 C36 48, 33 50, 29 50 C33 50, 36 52, 36 55 C36 60, 38 62, 42 62"
                    strokeLinecap="round"
                  />
                  <path
                    d="M58 38 C62 38, 64 40, 64 45 C64 48, 67 50, 71 50 C67 50, 64 52, 64 55 C64 60, 62 62, 58 62"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-extrabold text-xl text-slate-900 dark:text-white">
                Code<span className="text-emerald-500">Bloom</span>
              </span>
            </div>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering engineers around the world with open, structured, and
              modern learning paths to thrive in their tech careers.
            </p>
            <div className="pt-2 text-base text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} DevTech. Open source education.
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-3">
            <h4 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Learning Paths
            </h4>
            <ul className="space-y-2 text-lg text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("roadmaps")}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Frontend Mastery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("roadmaps")}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Backend &amp; Distributed Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("roadmaps")}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  DevOps &amp; Cloud Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("roadmaps")}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  AI &amp; LLM Engineering
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-3">
            <h4 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Resources
            </h4>
            <ul className="space-y-2 text-lg text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("lessons")}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Interactive Lessons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("quizzes")}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Knowledge Quizzes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate("about")}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  About &amp; Community
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="space-y-3">
            <h4 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Stay in the Loop
            </h4>
            <p className="text-base text-slate-500 dark:text-slate-400">
              Get notified when new interactive roadmaps and deep-dive lessons
              drop.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="developer@DevTech.dev"
                className="w-full text-base px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                className="px-3 py-2 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
