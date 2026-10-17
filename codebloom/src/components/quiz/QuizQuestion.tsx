import React from "react";
import { QuizQuestion as QuizQuestionType } from "../../types/quiz";
import { CodeBlock } from "../lesson/CodeBlock";

export interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  showFeedback?: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
  showFeedback = false,
}) => {
  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="flex items-center justify-between text-base text-slate-500 dark:text-slate-400">
        <span className="font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="font-semibold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
          {question.points} pts
        </span>
      </div>

      {/* Question Text */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
        {question.question}
      </h3>

      {/* Code Snippet if present */}
      {question.codeSnippet && (
        <CodeBlock
          code={question.codeSnippet.code}
          language={question.codeSnippet.language}
          showLineNumbers={false}
        />
      )}

      {/* Options List */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          let borderClass =
            "border-slate-200 dark:border-slate-800 hover:border-emerald-400";
          let bgClass = "bg-white dark:bg-slate-900";

          if (showFeedback) {
            if (option.isCorrect) {
              borderClass = "border-emerald-500";
              bgClass =
                "bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200";
            } else if (isSelected && !option.isCorrect) {
              borderClass = "border-rose-500";
              bgClass =
                "bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
            }
          } else if (isSelected) {
            borderClass = "border-emerald-500 ring-2 ring-emerald-500/20";
            bgClass = "bg-emerald-50/50 dark:bg-emerald-950/40";
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectOption(option.id)}
              disabled={showFeedback}
              className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer ${borderClass} ${bgClass}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border text-base font-bold transition-colors ${
                  isSelected
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-slate-300 dark:border-slate-700 text-slate-400"
                }`}
              >
                {String.fromCharCode(65 + idx)}
              </div>
              <div className="flex-1">
                <span className="text-lg font-medium text-slate-900 dark:text-slate-100">
                  {option.text}
                </span>
                {showFeedback && option.explanation && (
                  <p className="mt-1 text-base text-slate-500 dark:text-slate-400">
                    {option.explanation}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Question level explanation */}
      {(showFeedback || Boolean(selectedOptionId)) && question.explanation && (
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-base text-slate-700 dark:text-slate-300 animate-fadeIn">
          <strong className="text-slate-900 dark:text-white block mb-1">
            Explanation:
          </strong>
          {question.explanation}
        </div>
      )}
    </div>
  );
};
