import React from "react";
import { HelpCircle, Clock, Award } from "lucide-react";
import { Quiz, QuizAttempt } from "../../types/quiz";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

export interface QuizCardProps {
  quiz: Quiz;
  lastAttempt?: QuizAttempt;
  onStartQuiz: (quiz: Quiz) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  lastAttempt,
  onStartQuiz,
}) => {
  const difficultyVariant = {
    Beginner: "success" as const,
    Intermediate: "info" as const,
    Advanced: "purple" as const,
  }[quiz.difficulty];

  const hasPassed = lastAttempt?.passed;

  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
      <div>
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm">
              {quiz.category}
            </Badge>
            <Badge variant={difficultyVariant} size="sm">
              {quiz.difficulty}
            </Badge>
          </div>
          {lastAttempt && (
            <Badge variant={hasPassed ? "success" : "warning"} size="sm">
              {hasPassed
                ? `Passed (${lastAttempt.score}%)`
                : `Retake (${lastAttempt.score}%)`}
            </Badge>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
          {quiz.title}
        </h3>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {quiz.description}
        </p>

        {/* Meta Stats */}
        <div className="mt-4 flex items-center gap-4 text-base text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            {quiz.questions.length} Questions
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {Math.round(quiz.timeLimitSeconds / 60)} mins
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Pass: {quiz.passingScorePercent}%
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <Button
          variant={lastAttempt ? "secondary" : "primary"}
          size="md"
          className="w-full"
          onClick={() => onStartQuiz(quiz)}
        >
          {lastAttempt ? "Retake Quiz" : "Start Quiz"}
        </Button>
      </div>
    </div>
  );
};
