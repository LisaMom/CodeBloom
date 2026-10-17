import React, { useRef } from "react";
import { Search, X } from "lucide-react";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
  showKeyboardShortcut?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search roadmaps, lessons, quizzes...",
  className = "",
  onClear,
  showKeyboardShortcut = true,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    if (onClear) onClear();
    inputRef.current?.focus();
  };

  return (
    <div
      className={`relative flex items-center w-full group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus-within:border-emerald-500 dark:focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 shadow-sm transition-all duration-200 ${className}`}
    >
      {/* Search Icon */}
      <div className="pl-4 pr-2 text-slate-400 group-focus-within:text-emerald-500 transition-colors pointer-events-none">
        <Search className="h-5 w-5" />
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3 pr-10 text-base sm:text-lg bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
      />

      {/* Clear Button or Keyboard Shortcut */}
      <div className="absolute right-3 flex items-center gap-1.5">
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : showKeyboardShortcut ? (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
            ⌘K
          </kbd>
        ) : null}
      </div>
    </div>
  );
};
