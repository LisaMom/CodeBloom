import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info" | "purple" | "danger";
  size?: "sm" | "md";
  hasDot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  hasDot = false,
  className = "",
}) => {
  const variantStyles = {
    default:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    info: "bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd] dark:bg-slate-900 dark:text-[#38bdf8] dark:border-sky-900/60",
    success:
      "bg-[#dcfce7] text-[#15803d] border-[#bbf7d0] dark:bg-slate-900 dark:text-[#4ade80] dark:border-emerald-900/60",
    warning:
      "bg-[#fef9c3] text-[#a16207] border-[#fef08a] dark:bg-slate-900 dark:text-[#facc15] dark:border-amber-900/60",
    purple:
      "bg-[#eef2ff] text-[#4338ca] border-[#c7d2fe] dark:bg-slate-900 dark:text-[#a5b4fc] dark:border-indigo-900/60",
    danger:
      "bg-[#fee2e2] text-[#b91c1c] border-[#fecaca] dark:bg-slate-900 dark:text-[#f87171] dark:border-red-900/60",
  };

  const dotColors = {
    default: "bg-slate-400",
    info: "bg-[#0ea5e9]",
    success: "bg-[#22c55e]",
    warning: "bg-[#eab308]",
    purple: "bg-[#6366f1]",
    danger: "bg-[#ef4444]",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium",
    md: "text-base px-2.5 py-1 font-semibold",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {hasDot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]} animate-pulse`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
