import React from "react";
import { Check, X, Star } from "lucide-react";
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
  const correctOpt = question.options.find((o) => o.isCorrect);

  return (
    <div className="space-y-6">
      {/* ── Header: question label + points ── */}
      <div className="flex items-center justify-between">
        <span className="text-base font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="inline-flex items-center gap-1 text-base font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {question.points} pts
        </span>
      </div>

      {/* ── Question Text ── */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
        {question.question}
      </h3>

      {/* ── Code Snippet ── */}
      {question.codeSnippet && (
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
          <CodeBlock
            code={question.codeSnippet.code}
            language={question.codeSnippet.language}
            showLineNumbers={false}
          />
        </div>
      )}

      {/* ── Options ── */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          /* Determine visual state */
          let cardCls =
            "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20";
          let circleCls =
            "border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 bg-transparent";
          let rightIcon: React.ReactNode = null;

          if (showFeedback) {
            if (option.isCorrect) {
              cardCls =
                "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30";
              circleCls = "border-emerald-500 bg-emerald-500 text-white";
              rightIcon = (
                <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              );
            } else if (isSelected && !option.isCorrect) {
              cardCls = "border-rose-500 bg-rose-50/70 dark:bg-rose-950/30";
              circleCls = "border-rose-500 bg-rose-500 text-white";
              rightIcon = (
                <span className="shrink-0 w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              );
            } else {
              cardCls =
                "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 opacity-60";
            }
          } else if (isSelected) {
            cardCls =
              "border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20 shadow-sm shadow-indigo-500/10";
            circleCls =
              "border-indigo-500 bg-indigo-500 text-white shadow-sm shadow-indigo-500/30";
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={showFeedback}
              onClick={() => onSelectOption(option.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer disabled:cursor-default ${cardCls}`}
            >
              {/* Letter circle */}
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 text-lg font-extrabold transition-all ${circleCls}`}
              >
                {letter}
              </span>

              {/* Option text */}
              <span
                className={`flex-1 text-lg sm:text-base font-medium leading-snug ${
                  showFeedback && !option.isCorrect && !isSelected
                    ? "text-slate-400 dark:text-slate-500"
                    : "text-slate-800 dark:text-slate-100"
                }`}
              >
                {option.text}
              </span>

              {/* Right status icon */}
              {rightIcon}
            </button>
          );
        })}
      </div>

      {/* ── Post-feedback explanation box ── */}
      {showFeedback && (
        <div className="flex gap-3 p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 animate-fadeIn">
          <span className="text-xl shrink-0 mt-0.5">💡</span>
          <div className="space-y-1">
            <p className="text-lg font-extrabold text-amber-900 dark:text-amber-300">
              {selectedOptionId === correctOpt?.id
                ? "Correct!"
                : `Correct answer: ${correctOpt?.text}`}
            </p>
            <p className="text-lg text-amber-800 dark:text-amber-200 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
