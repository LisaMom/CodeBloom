import React from "react";

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  colorClass?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = false,
  colorClass = "from-emerald-500 to-indigo-600",
  size = "md",
  className = "",
}) => {
  const percentage = Math.min(
    100,
    Math.max(0, Math.round((value / max) * 100)),
  );

  const heightStyles = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-base font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && (
            <span className="tabular-nums font-semibold">{percentage}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${heightStyles[size]} border border-slate-200/50 dark:border-slate-700/50`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
