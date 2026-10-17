import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
  filename,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy code to clipboard", err);
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div className="my-4 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-lg text-slate-100 font-mono text-base sm:text-lg">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/80 text-base">
        <div className="flex items-center gap-2">
          {/* macOS window controls style */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {filename && (
            <span className="font-semibold text-slate-300 font-mono">
              {filename}
            </span>
          )}
          {!filename && (
            <span className="font-medium uppercase tracking-wider text-slate-400">
              {language}
            </span>
          )}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-base font-sans text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 transition-colors cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto p-4 leading-relaxed">
        <pre className="flex">
          {showLineNumbers && (
            <div
              className="select-none pr-4 text-slate-600 text-right font-mono"
              aria-hidden="true"
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code className="text-slate-200 font-mono flex-1">{code}</code>
        </pre>
      </div>
    </div>
  );
};
