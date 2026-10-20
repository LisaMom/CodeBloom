import '../css/main.css';
import { initTheme } from './theme';
import { renderNavbar, initNavbarEvents } from './components/navbar';
import { renderFooter } from './components/footer';
import { renderIcons } from './utils/icons';
import { quizzesData } from './data/quizzes';
import { Quiz, QuizAttempt } from './types/quiz';
import { getQuizAttempts, recordQuizAttempt } from './progress';
import { updateSEO } from './utils/seo';

const diffColour: Record<string, string> = {
  Beginner: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
  Intermediate: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60',
  Advanced: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/60',
};

const catAccent: Record<string, string> = {
  JavaScript: 'from-yellow-400 to-amber-500',
  TypeScript: 'from-blue-500 to-indigo-600',
  React: 'from-cyan-400 to-blue-500',
  CSS: 'from-purple-500 to-pink-500',
  default: 'from-emerald-500 to-indigo-500',
};

const catIcon: Record<string, string> = {
  JavaScript: 'code-2',
  TypeScript: 'file-code',
  React: 'atom',
  CSS: 'palette',
};

let selectedCategory = 'All';
let selectedDifficulty = 'All';
let searchQuery = '';

let activeQuiz: Quiz | null = null;
let currentQuestionIndex = 0;
let selectedAnswers: Record<string, string> = {};
let checkedQuestions: Record<string, boolean> = {};
let timeSpent = 0;
let timerInterval: number | null = null;
let finishedAttempt: QuizAttempt | null = null;

export function initQuizzesPage(): void {
  initTheme();

  const urlParams = new URLSearchParams(window.location.search);
  const quizIdParam = urlParams.get('quizId');
  if (quizIdParam) {
    const found = quizzesData.find((q) => q.id === quizIdParam);
    if (found) startQuiz(found);
  }

  render();
}

function startQuiz(quiz: Quiz): void {
  activeQuiz = quiz;
  currentQuestionIndex = 0;
  selectedAnswers = {};
  checkedQuestions = {};
  timeSpent = 0;
  finishedAttempt = null;

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = window.setInterval(() => {
    timeSpent++;
    const timerEl = document.getElementById('quiz-timer');
    if (timerEl) {
      const mins = Math.floor(timeSpent / 60).toString().padStart(2, '0');
      const secs = (timeSpent % 60).toString().padStart(2, '0');
      timerEl.textContent = `${mins}:${secs}`;
    }
  }, 1000);
}

function stopQuizTimer(): void {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function render(): void {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  if (activeQuiz && finishedAttempt) {
    updateSEO({
      title: `Results: ${activeQuiz.title} | CodeBloom`,
      description: `Quiz results for ${activeQuiz.title}`,
    });
    appEl.innerHTML = `
      ${renderNavbar('quizzes')}
      <main class="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        ${renderResultsView(activeQuiz, finishedAttempt)}
      </main>
      ${renderFooter()}
    `;
    initNavbarEvents('quizzes');
    attachResultsEvents();
  } else if (activeQuiz) {
    updateSEO({
      title: `Quiz: ${activeQuiz.title} | CodeBloom`,
      description: activeQuiz.description,
    });
    appEl.innerHTML = `
      ${renderNavbar('quizzes')}
      <main class="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-5 animate-fadeIn">
        ${renderRunnerView(activeQuiz)}
      </main>
      ${renderFooter()}
    `;
    initNavbarEvents('quizzes');
    attachRunnerEvents(activeQuiz);
  } else {
    updateSEO({
      title: 'Quizzes',
      description: 'Test your understanding with instant feedback on JavaScript, React, TypeScript, and CSS.',
    });
    appEl.innerHTML = `
      ${renderNavbar('quizzes')}
      <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        ${renderCatalogView()}
      </main>
      ${renderFooter()}
    `;
    initNavbarEvents('quizzes');
    attachCatalogEvents();
  }

  renderIcons(appEl);
}

function renderCatalogView(): string {
  const quizAttempts = getQuizAttempts();
  const topics = ['All', 'JavaScript', 'TypeScript', 'React', 'CSS'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filtered = quizzesData.filter((q) => {
    const matchesTopic = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      q.title.toLowerCase().includes(query) ||
      q.description.toLowerCase().includes(query) ||
      q.category.toLowerCase().includes(query);
    return matchesTopic && matchesDiff && matchesSearch;
  });

  const totalAttempted = Object.keys(quizAttempts).length;
  const totalPassed = Object.values(quizAttempts).filter((a) => a.passed).length;

  return `
    <div class="space-y-6">
      <div class="max-w-2xl space-y-3">
        <span class="inline-flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          <span class="w-4 h-px bg-emerald-500"></span>
          Skill Assessment
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Developer
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500">
            Quizzes
          </span>
        </h1>
        <p class="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Test your understanding with instant, helpful feedback. Challenge yourself on modern syntax, component lifecycles, and architecture patterns.
        </p>
      </div>

      <!-- Stats Bar -->
      ${totalAttempted > 0
      ? `
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 ">
                <i data-lucide="crosshair" class="w-6 h-6 text-emerald-500"></i>
                <div>
                  <p class="text-base text-slate-500 dark:text-slate-400 font-medium">Quizzes Taken</p>
                  <p class="text-xl font-extrabold text-slate-900 dark:text-white">${totalAttempted}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 ">
                <i data-lucide="check" class="w-6 h-6 text-emerald-500"></i>
                <div>
                  <p class="text-base text-slate-500 dark:text-slate-400 font-medium">Passed</p>
                  <p class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">${totalPassed}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 ">
                <i data-lucide="activity" class="w-6 h-6 text-indigo-500"></i>
                <div>
                  <p class="text-base text-slate-500 dark:text-slate-400 font-medium">Pass Rate</p>
                  <p class="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    ${totalAttempted ? Math.round((totalPassed / totalAttempted) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          `
      : ''
    }

      <!-- Topic & Search Row -->
      <div class="space-y-3">
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="relative flex-1 max-w-md">
            <span class="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
              <i data-lucide="search" class="w-4 h-4"></i>
            </span>
            <input
              id="quizzes-search-input"
              type="text"
              value="${searchQuery}"
              placeholder="Search quizzes by title or keyword…"
              class="w-full pl-10 pr-9 py-2.5 rounded-xl text-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
            />
            ${searchQuery
      ? `<button id="quizzes-clear-search" class="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>`
      : ''
    }
          </div>

          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            ${topics
      .map(
        (t) => `
                  <button
                    data-topic="${t}"
                    class="topic-btn px-3.5 py-2 rounded-xl text-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === t
            ? 'bg-emerald-600 text-white  '
            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600'
          }"
                  >
                    ${t}
                  </button>
                `
      )
      .join('')}
          </div>
        </div>

        <!-- Difficulty Row -->
        <div class="flex items-center gap-2">
          <span class="text-base font-semibold text-slate-400 dark:text-slate-500">Difficulty:</span>
          <div class="flex items-center gap-1.5">
            ${difficulties
      .map(
        (d) => `
                  <button
                    data-diff="${d}"
                    class="diff-btn px-2.5 py-1 rounded-lg text-base font-medium transition-colors cursor-pointer ${selectedDifficulty === d
            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }"
                  >
                    ${d}
                  </button>
                `
      )
      .join('')}
          </div>
        </div>
      </div>

      <p class="text-base text-slate-400 dark:text-slate-500">
        Showing ${filtered.length} quiz${filtered.length !== 1 ? 'zes' : ''}
      </p>
    </div>

    <!-- Cards Grid -->
    ${filtered.length === 0
      ? `
          <div class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p class="font-bold text-slate-900 dark:text-white text-lg">No quizzes match your filter</p>
            <p class="text-lg text-slate-500 dark:text-slate-400 mt-1">Try selecting another topic or difficulty.</p>
            <button id="quizzes-reset-btn" class="mt-4 px-4 py-2 text-lg font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors">
              Reset Filters
            </button>
          </div>
        `
      : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${filtered
        .map((quiz) => {
          const lastAttempt = quizAttempts[quiz.id];
          const hasPassed = lastAttempt?.passed;
          const accent = catAccent[quiz.category] || catAccent.default;
          const iconName = catIcon[quiz.category] || 'help-circle';

          return `
                  <div class="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-400/60 dark:hover:border-emerald-600/50 transition-all duration-300 overflow-hidden">
                    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent} transition-all duration-300 group-hover:h-1.5"></div>

                    <div>
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${accent} text-white ">
                          <i data-lucide="${iconName}" class="w-6 h-6"></i>
                        </div>

                        ${lastAttempt
              ? `
                              <span class="inline-flex items-center gap-1 text-base font-bold px-2.5 py-1 rounded-full border ${hasPassed
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
              }">
                                ${hasPassed
                ? `<i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Passed · ${lastAttempt.score}%`
                : `<i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Retake · ${lastAttempt.score}%`
              }
                              </span>
                            `
              : ''
            }
                      </div>

                      <div class="space-y-1.5 mb-4">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-[14px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            ${quiz.category}
                          </span>
                          <span class="text-[14px] font-bold px-2 py-0.5 rounded-full border ${diffColour[quiz.difficulty] || ''}">
                            ${quiz.difficulty}
                          </span>
                        </div>
                        <h3 class="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                          ${quiz.title}
                        </h3>
                        <p class="text-lg text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          ${quiz.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div class="flex items-center gap-4 text-base text-slate-500 dark:text-slate-400 mb-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        <span class="flex items-center gap-1">
                          <i data-lucide="help-circle" class="w-3.5 h-3.5"></i>
                          ${quiz.questions.length} Questions
                        </span>
                        <span class="flex items-center gap-1">
                          <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                          ~${Math.round(quiz.timeLimitSeconds / 60)} min
                        </span>
                        <span class="flex items-center gap-1">
                          <i data-lucide="award" class="w-3.5 h-3.5"></i>
                          Pass: ${quiz.passingScorePercent}%
                        </span>
                      </div>

                      <button
                        type="button"
                        data-start-quiz="${quiz.id}"
                        class="w-full py-2.5 rounded-xl text-lg font-bold  transition-all cursor-pointer flex items-center justify-center gap-2 ${lastAttempt
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              : `bg-gradient-to-r ${accent} text-white hover:opacity-90`
            }"
                      >
                        ${lastAttempt
              ? '<i data-lucide="rotate-ccw" class="w-4 h-4"></i> Retake Quiz'
              : 'Start Quiz <i data-lucide="arrow-right" class="w-4 h-4"></i>'
            }
                      </button>
                    </div>
                  </div>
                `;
        })
        .join('')}
          </div>
        `
    }
  `;
}

function attachCatalogEvents(): void {
  const searchInput = document.getElementById('quizzes-search-input') as HTMLInputElement | null;
  searchInput?.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    render();
  });

  document.getElementById('quizzes-clear-search')?.addEventListener('click', () => {
    searchQuery = '';
    render();
  });

  document.getElementById('quizzes-reset-btn')?.addEventListener('click', () => {
    searchQuery = '';
    selectedCategory = 'All';
    selectedDifficulty = 'All';
    render();
  });

  document.querySelectorAll<HTMLButtonElement>('.topic-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.topic || 'All';
      render();
    });
  });

  document.querySelectorAll<HTMLButtonElement>('.diff-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedDifficulty = btn.dataset.diff || 'All';
      render();
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-start-quiz]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const qid = btn.dataset.startQuiz;
      const q = quizzesData.find((item) => item.id === qid);
      if (q) {
        startQuiz(q);
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

function renderRunnerView(quiz: Quiz): string {
  const currentQ = quiz.questions[currentQuestionIndex];
  const isAnswerSelected = Boolean(selectedAnswers[currentQ.id]);
  const isChecked = Boolean(checkedQuestions[currentQ.id]);
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const progressWidth = ((currentQuestionIndex + (isChecked ? 1 : 0.5)) / quiz.questions.length) * 100;
  const accent = catAccent[quiz.category] || catAccent.default;

  return `
    <!-- Quiz Top Header -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden ">
      <div class="h-1.5 bg-slate-100 dark:bg-slate-800">
        <div class="h-full bg-gradient-to-r ${accent} transition-all duration-300" style="width: ${progressWidth}%"></div>
      </div>

      <div class="flex items-center justify-between px-5 py-4 flex-wrap gap-2">
        <div class="flex items-center gap-3">
          <button
            id="runner-exit-btn"
            type="button"
            class="inline-flex items-center gap-1.5 text-base font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group"
          >
            <span class="w-6 h-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center group-hover:border-rose-400 transition-colors">
              <i data-lucide="x" class="w-3.5 h-3.5"></i>
            </span>
            Exit
          </button>

          <div class="flex items-center gap-2">
            <span class="text-lg font-extrabold text-slate-900 dark:text-white">${quiz.title}</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${diffColour[quiz.difficulty] || ''}">
              ${quiz.difficulty}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-base font-bold text-slate-700 dark:text-slate-300 tabular-nums">
            Question ${currentQuestionIndex + 1} of ${quiz.questions.length}
          </span>
          <span class="inline-flex items-center gap-1 text-base font-mono font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
            <i data-lucide="clock" class="w-3.5 h-3.5"></i>
            <span id="quiz-timer">00:00</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Question Panel -->
    <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80  overflow-hidden">
      <div class="h-1 bg-gradient-to-r ${accent}"></div>
      <div class="p-6 sm:p-8 space-y-6">
        <div class="space-y-3">
          <span class="text-base font-bold uppercase tracking-wider text-slate-400">Question ${currentQuestionIndex + 1}</span>
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
            ${currentQ.question}
          </h2>
          ${currentQ.codeSnippet
      ? `
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-base font-mono text-emerald-400 overflow-x-auto">
                  <code>${currentQ.codeSnippet}</code>
                </div>
              `
      : ''
    }
        </div>

        <!-- Options -->
        <div class="space-y-3">
          ${currentQ.options
      .map((opt) => {
        const isSelected = selectedAnswers[currentQ.id] === opt.id;
        let styleCls = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-emerald-500';
        if (isChecked) {
          if (opt.isCorrect) {
            styleCls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold';
          } else if (isSelected) {
            styleCls = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
          }
        } else if (isSelected) {
          styleCls = 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 font-semibold';
        }

        return `
                <button
                  type="button"
                  data-quiz-opt="${opt.id}"
                  ${isChecked ? 'disabled' : ''}
                  class="w-full flex items-center gap-3.5 p-4 rounded-xl border text-left text-lg transition-all cursor-pointer disabled:cursor-default ${styleCls}"
                >
                  <span class="w-6 h-6 rounded-full flex items-center justify-center text-base font-extrabold shrink-0 border ${isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600 text-slate-400'
          }">
                    ${opt.id.toUpperCase().slice(-1)}
                  </span>
                  <span class="flex-1">${opt.text}</span>
                </button>
              `;
      })
      .join('')}
        </div>

        <!-- Feedback callout if checked -->
        ${isChecked
      ? `
              <div class="p-4 rounded-xl text-lg border flex items-start gap-3 ${currentQ.options.find((o) => o.id === selectedAnswers[currentQ.id])?.isCorrect
        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
      }">
                <div>
                  <p class="font-bold mb-0.5">
                    ${currentQ.options.find((o) => o.id === selectedAnswers[currentQ.id])?.isCorrect
        ? '✓ Correct!'
        : '✗ Not quite.'
      }
                  </p>
                  <p class="text-base leading-relaxed">${currentQ.explanation}</p>
                </div>
              </div>
            `
      : ''
    }

        <!-- Controls -->
        <div class="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            id="runner-prev-btn"
            type="button"
            ${currentQuestionIndex === 0 ? 'disabled' : ''}
            class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-lg font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            ← Previous
          </button>

          <div>
            ${!isChecked
      ? `
                  <button
                    id="runner-check-btn"
                    type="button"
                    ${!isAnswerSelected ? 'disabled' : ''}
                    class="px-6 py-2.5 rounded-xl text-lg font-bold  transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-700 text-white "
                  >
                    Check Answer
                  </button>
                `
      : `
                  <button
                    id="runner-next-btn"
                    type="button"
                    class="px-6 py-2.5 rounded-xl text-lg font-bold  transition-all cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    ${isLastQuestion ? 'Submit Quiz & View Results →' : 'Next Question →'}
                  </button>
                `
    }
          </div>
        </div>
      </div>
    </div>
  `;
}

function attachRunnerEvents(quiz: Quiz): void {
  document.getElementById('runner-exit-btn')?.addEventListener('click', () => {
    stopQuizTimer();
    activeQuiz = null;
    render();
  });

  document.querySelectorAll<HTMLButtonElement>('[data-quiz-opt]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const q = quiz.questions[currentQuestionIndex];
      if (checkedQuestions[q.id]) return;
      selectedAnswers[q.id] = btn.dataset.quizOpt || '';
      render();
    });
  });

  document.getElementById('runner-check-btn')?.addEventListener('click', () => {
    const q = quiz.questions[currentQuestionIndex];
    if (selectedAnswers[q.id]) {
      checkedQuestions[q.id] = true;
      render();
    }
  });

  document.getElementById('runner-prev-btn')?.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      render();
    }
  });

  document.getElementById('runner-next-btn')?.addEventListener('click', () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      currentQuestionIndex++;
      render();
    } else {
      // Calculate score
      stopQuizTimer();
      let correct = 0;
      quiz.questions.forEach((q) => {
        const correctOpt = q.options.find((o) => o.isCorrect);
        if (selectedAnswers[q.id] && correctOpt && selectedAnswers[q.id] === correctOpt.id) {
          correct++;
        }
      });
      const score = Math.round((correct / quiz.questions.length) * 100);
      const attempt: QuizAttempt = {
        quizId: quiz.id,
        selectedAnswers,
        score,
        totalQuestions: quiz.questions.length,
        correctAnswersCount: correct,
        passed: score >= quiz.passingScorePercent,
        completedAt: new Date().toISOString(),
        timeSpentSeconds: timeSpent,
      };

      recordQuizAttempt(attempt);
      finishedAttempt = attempt;
      render();
    }
  });
}

function renderResultsView(quiz: Quiz, attempt: QuizAttempt): string {
  return `
    <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-10  text-center space-y-6 animate-fadeIn">
      <div class="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-extrabold ${attempt.passed
      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-4 border-emerald-500'
      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-4 border-amber-500'
    }">
        ${attempt.passed ? '✓' : '!'}
      </div>

      <div class="space-y-2">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          ${attempt.passed ? 'Congratulations! You Passed!' : 'Good Effort! Keep Practicing'}
        </h2>
        <p class="text-lg text-slate-500 dark:text-slate-400">
          ${attempt.passed
      ? `You demonstrated solid mastery of ${quiz.title}.`
      : `You scored ${attempt.score}%. The passing threshold is ${quiz.passingScorePercent}%. Review and try again!`
    }
        </p>
      </div>

      <!-- Score block -->
      <div class="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
        <div>
          <p class="text-2xl sm:text-3xl font-extrabold ${attempt.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}">
            ${attempt.score}%
          </p>
          <p class="text-base text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Final Score</p>
        </div>
        <div>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            ${attempt.correctAnswersCount}/${attempt.totalQuestions}
          </p>
          <p class="text-base text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Correct</p>
        </div>
        <div>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            ${Math.floor(attempt.timeSpentSeconds / 60)}m ${attempt.timeSpentSeconds % 60}s
          </p>
          <p class="text-base text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Time Spent</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          id="results-retry-btn"
          type="button"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-lg text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
        >
          <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Retake Quiz
        </button>

        ${attempt.passed
      ? `
              <a
                href="/pages/certificates.html?quizId=${quiz.id}"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg  transition-all cursor-pointer"
              >
                <i data-lucide="award" class="w-4 h-4"></i> View Achievement Certificate →
              </a>
            `
      : ''
    }

        <button
          id="results-back-btn"
          type="button"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
        >
          Back to All Quizzes
        </button>
      </div>
    </div>
  `;
}

function attachResultsEvents(): void {
  document.getElementById('results-retry-btn')?.addEventListener('click', () => {
    if (activeQuiz) {
      startQuiz(activeQuiz);
      render();
    }
  });

  document.getElementById('results-back-btn')?.addEventListener('click', () => {
    stopQuizTimer();
    activeQuiz = null;
    finishedAttempt = null;
    render();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQuizzesPage);
} else {
  initQuizzesPage();
}
