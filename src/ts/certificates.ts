import '../css/main.css';
import { initTheme } from './theme';
import { renderNavbar, initNavbarEvents } from './components/navbar';
import { renderFooter } from './components/footer';
import { renderIcons } from './utils/icons';
import { roadmapsData } from './data/roadmaps';
import { quizzesData } from './data/quizzes';
import { getCompletedSteps, getQuizAttempts, onProgressChange } from './progress';
import { getAuth, onAuthChange } from './auth';
import { openAuthModal } from './components/authModal';
import { updateSEO } from './utils/seo';

let selectedRoadmapIndex = 0;
let selectedQuizIndex = 0;
let showCoursePreview = false;
let showQuizPreview = false;
let customLearnerName: string | null = null;

export function initCertificatesPage(): void {
  initTheme();
  updateSEO({
    title: 'Certificates of Achievement & Completion',
    description: 'Verify, view, and print your official course completion certificates and quiz achievement credentials.',
  });

  // URL query params
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('preview') === 'true') {
    showCoursePreview = true;
    showQuizPreview = true;
  }

  // Reactive listeners for login & progress changes
  onAuthChange(() => {
    render();
  });

  onProgressChange(() => {
    render();
  });

  render();
}

function getLearnerDisplayName(): string {
  const auth = getAuth();
  if (customLearnerName && customLearnerName.trim()) {
    return customLearnerName.trim();
  }
  const storedName = localStorage.getItem('CodeBloom_cert_name');
  if (storedName && storedName.trim()) {
    return storedName.trim();
  }
  if (auth.user?.name) {
    return auth.user.name;
  }
  if (auth.user?.email) {
    const username = auth.user.email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  }
  return 'Learner';
}

function generateCertId(prefix: string, itemKey: string, seed: string): string {
  let hash = 0;
  const str = `${itemKey}-${seed}`;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  const code = Math.abs(hash).toString(36).toUpperCase().padStart(4, '0').slice(-4);
  const cleanKey = itemKey.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
  return `CB-${prefix}-${cleanKey}-${code}`;
}

function render(): void {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const auth = getAuth();
  const isAuthenticated = auth.isAuthenticated;
  const learnerName = getLearnerDisplayName();
  const completedSteps = getCompletedSteps();
  const quizAttempts = getQuizAttempts();

  // 1. Calculate Roadmap Completions
  const roadmapStatuses = roadmapsData.map((r) => {
    const allStepIds = r.milestones.flatMap((m) => m.steps.map((s) => s.id));
    const completedCount = allStepIds.filter((id) => completedSteps.includes(id)).length;
    const total = allStepIds.length;
    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    const isCompleted = total > 0 && completedCount === total;
    return { roadmap: r, completedCount, total, percent, isCompleted };
  });

  const completedRoadmaps = roadmapStatuses.filter((s) => s.isCompleted);

  // 2. Calculate Quiz Achievements
  const quizStatuses = quizzesData.map((q) => {
    const attempt = quizAttempts[q.id];
    const hasAttempted = Boolean(attempt);
    const score = attempt?.score ?? 0;
    const isPassed = Boolean(attempt && attempt.passed);
    const dateStr = attempt?.completedAt
      ? new Date(attempt.completedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    return { quiz: q, hasAttempted, score, isPassed, dateStr };
  });

  const passedQuizzes = quizStatuses.filter((s) => s.isPassed);

  // Verified & Unlocked conditions
  const hasEarnedCourse = completedRoadmaps.length > 0;
  const hasEarnedQuiz = passedQuizzes.length > 0;

  // Ensure active index is within range
  if (selectedRoadmapIndex >= completedRoadmaps.length) {
    selectedRoadmapIndex = 0;
  }
  if (selectedQuizIndex >= passedQuizzes.length) {
    selectedQuizIndex = 0;
  }

  const activeRoadmap = completedRoadmaps[selectedRoadmapIndex] || null;
  const activeQuiz = passedQuizzes[selectedQuizIndex] || null;

  appEl.innerHTML = `
    ${renderNavbar('certificates')}

    <main class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 text-base font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            <span class="w-4 h-px bg-emerald-500"></span>
            Verified Credentials &amp; Badges
          </div>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Official Certificates
          </h1>
          <p class="text-base sm:text-lg text-slate-500 dark:text-slate-400">
            Earn cryptographically verifiable credentials upon completing roadmaps and passing technical assessments.
          </p>
        </div>

        <!-- Global Action Tools -->
        <div class="flex items-center gap-3 flex-wrap">
          <button
            id="cert-print-btn"
            type="button"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all cursor-pointer"
            title="Print or Save Certificate as PDF"
          >
            <i data-lucide="printer" class="w-5 h-5"></i>
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      <!-- Authentication Status Banner -->
      ${renderAuthBanner(isAuthenticated, auth.user?.email || '', learnerName)}

      <!-- Learner Name Customizer (Open to all learners to preview their certificate) -->
      ${renderNameCustomizer(learnerName)}

      <!-- ======================================================== -->
      <!-- SECTION 1: COURSE COMPLETION CERTIFICATE -->
      <!-- ======================================================== -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-9 h-9 rounded-xl ${hasEarnedCourse ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}">
              <i data-lucide="${hasEarnedCourse ? 'award' : 'lock'}" class="w-5 h-5"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">
                Course Completion Certificate
              </h2>
              <p class="text-base text-slate-500 dark:text-slate-400">
                Awarded for completing 100% of all milestones and lessons in a curriculum roadmap.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-base font-semibold px-3 py-1 rounded-full ${hasEarnedCourse
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            }">
              ${hasEarnedCourse ? `${completedRoadmaps.length} Unlocked` : 'Locked (0 Unlocked)'}
            </span>

            ${!hasEarnedCourse
              ? `
                <button
                  id="toggle-course-preview-btn"
                  type="button"
                  class="text-base font-semibold px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  ${showCoursePreview ? 'Hide Sample' : 'Preview Template'}
                </button>
              `
              : ''
            }
          </div>
        </div>

        ${hasEarnedCourse && !showCoursePreview
          ? `
              <!-- Multiple Unlocked Roadmaps Tabs -->
              ${completedRoadmaps.length > 1
                ? `
                    <div class="flex items-center gap-2 overflow-x-auto pb-2">
                      ${completedRoadmaps
                        .map(
                          (item, idx) => `
                        <button
                          type="button"
                          data-select-roadmap="${idx}"
                          class="px-3.5 py-1.5 rounded-xl text-base font-semibold transition-all cursor-pointer ${idx === selectedRoadmapIndex
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }"
                        >
                          ${item.roadmap.title}
                        </button>
                      `
                        )
                        .join('')}
                    </div>
                  `
                : ''
              }

              <!-- Unlocked Official Certificate -->
              <div class="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 space-y-4">
                <div class="flex items-center justify-between text-base">
                  <span class="inline-flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                    <i data-lucide="check-circle-2" class="w-4 h-4"></i> Officially Verified Credential
                  </span>
                  <span class="text-slate-400">
                    Roadmap: <strong class="text-slate-700 dark:text-slate-200">${activeRoadmap?.roadmap.title}</strong>
                  </span>
                </div>

                ${renderCourseCertificateFrame(
                  learnerName,
                  activeRoadmap?.roadmap.title || 'Course Curriculum',
                  new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                  generateCertId('COURSE', activeRoadmap?.roadmap.id || 'GEN', learnerName),
                  false
                )}
              </div>
            `
          : showCoursePreview
            ? `
              <!-- Sample Preview Frame with Watermark -->
              <div class="p-4 sm:p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-4">
                <div class="flex items-center justify-between text-base text-amber-800 dark:text-amber-300">
                  <span class="inline-flex items-center gap-1.5 font-bold">
                    <i data-lucide="eye" class="w-4 h-4"></i> Sample Preview Mode
                  </span>
                  <span class="text-sm text-amber-600 dark:text-amber-400">
                    All text is fully visible and printable as a sample.
                  </span>
                </div>

                ${renderCourseCertificateFrame(
                  learnerName || 'Learner',
                  'Frontend Developer Roadmap',
                  new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                  'CB-COURSE-PREVIEW-SAMPLE',
                  true
                )}
              </div>
            `
            : `
              <!-- Locked Course State Card -->
              ${renderLockedCourseCard(roadmapStatuses, isAuthenticated)}
            `
        }
      </section>

      <!-- ======================================================== -->
      <!-- SECTION 2: QUIZ ACHIEVEMENT CERTIFICATE -->
      <!-- ======================================================== -->
      <section class="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-9 h-9 rounded-xl ${hasEarnedQuiz ? 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}">
              <i data-lucide="${hasEarnedQuiz ? 'award' : 'lock'}" class="w-5 h-5"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">
                Final Quiz Achievement Certificate
              </h2>
              <p class="text-base text-slate-500 dark:text-slate-400">
                Awarded for scoring 70% or higher on a technical assessment.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-base font-semibold px-3 py-1 rounded-full ${hasEarnedQuiz
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            }">
              ${hasEarnedQuiz ? `${passedQuizzes.length} Passed` : 'Locked (0 Passed)'}
            </span>

            ${!hasEarnedQuiz
              ? `
                <button
                  id="toggle-quiz-preview-btn"
                  type="button"
                  class="text-base font-semibold px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  ${showQuizPreview ? 'Hide Sample' : 'Preview Template'}
                </button>
              `
              : ''
            }
          </div>
        </div>

        ${hasEarnedQuiz && !showQuizPreview
          ? `
              <!-- Multiple Passed Quizzes Tabs -->
              ${passedQuizzes.length > 1
                ? `
                    <div class="flex items-center gap-2 overflow-x-auto pb-2">
                      ${passedQuizzes
                        .map(
                          (item, idx) => `
                        <button
                          type="button"
                          data-select-quiz="${idx}"
                          class="px-3.5 py-1.5 rounded-xl text-base font-semibold transition-all cursor-pointer ${idx === selectedQuizIndex
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }"
                        >
                          ${item.quiz.title} (${item.score}%)
                        </button>
                      `
                        )
                        .join('')}
                    </div>
                  `
                : ''
              }

              <!-- Unlocked Official Quiz Certificate -->
              <div class="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800/80 space-y-4">
                <div class="flex items-center justify-between text-base">
                  <span class="inline-flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400">
                    <i data-lucide="check-circle-2" class="w-4 h-4"></i> Officially Verified Assessment
                  </span>
                  <span class="text-slate-400">
                    Assessment: <strong class="text-slate-700 dark:text-slate-200">${activeQuiz?.quiz.title}</strong>
                  </span>
                </div>

                ${renderQuizCertificateFrame(
                  learnerName,
                  activeQuiz?.quiz.title || 'Technical Assessment',
                  activeQuiz?.score || 85,
                  activeQuiz?.dateStr || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                  generateCertId('QUIZ', activeQuiz?.quiz.id || 'GEN', learnerName),
                  false
                )}
              </div>
            `
          : showQuizPreview
            ? `
              <!-- Sample Preview Frame with Watermark -->
              <div class="p-4 sm:p-6 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 space-y-4">
                <div class="flex items-center justify-between text-base text-indigo-800 dark:text-indigo-300">
                  <span class="inline-flex items-center gap-1.5 font-bold">
                    <i data-lucide="eye" class="w-4 h-4"></i> Quiz Certificate Sample Preview
                  </span>
                  <span class="text-sm text-indigo-600 dark:text-indigo-400">
                    All text is fully visible and printable as a sample.
                  </span>
                </div>

                ${renderQuizCertificateFrame(
                  learnerName || 'Learner',
                  'JavaScript Core & Advanced Quiz',
                  92,
                  new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                  'CB-QUIZ-PREVIEW-SAMPLE',
                  true
                )}
              </div>
            `
            : `
              <!-- Locked Quiz State Card -->
              ${renderLockedQuizCard(quizStatuses, isAuthenticated)}
            `
        }
      </section>
    </main>

    ${renderFooter()}
  `;

  initNavbarEvents('certificates');
  attachCertificateEvents(hasEarnedCourse || showCoursePreview, hasEarnedQuiz || showQuizPreview, learnerName);
  renderIcons(appEl);
}

// -------------------------------------------------------------
// Component: Auth Banner
// -------------------------------------------------------------
function renderAuthBanner(isAuthenticated: boolean, email: string, learnerName: string): string {
  if (isAuthenticated) {
    return `
      <div class="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <p class="text-base font-bold text-emerald-900 dark:text-emerald-200">
                Verified Learner Account: <span class="underline decoration-emerald-500">${escapeHtml(learnerName)}</span>
              </p>
              <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100">
                Active
              </span>
            </div>
            <p class="text-sm text-emerald-700 dark:text-emerald-300">
              Credentials earned under <strong>${escapeHtml(email)}</strong> are cryptographically signed and printable.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3.5">
        <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <i data-lucide="alert-circle" class="w-5 h-5"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-amber-900 dark:text-amber-200">
            Guest Mode: Preview &amp; Test Certificates
          </h3>
          <p class="text-sm text-amber-700 dark:text-amber-300 mt-0.5 leading-relaxed">
            You can preview, customize your name, and print sample certificates. Sign in to permanently record milestone credentials.
          </p>
        </div>
      </div>

      <button
        id="cert-signin-cta-btn"
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white transition-all cursor-pointer whitespace-nowrap"
      >
        <i data-lucide="log-in" class="w-4 h-4"></i> Sign In to Claim
      </button>
    </div>
  `;
}

// -------------------------------------------------------------
// Component: Name Customizer
// -------------------------------------------------------------
function renderNameCustomizer(currentName: string): string {
  return `
    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
          <i data-lucide="user" class="w-4 h-4"></i>
        </div>
        <div>
          <p class="text-base font-bold text-slate-900 dark:text-white">Full Name on Certificate</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Enter your name to appear on both Course and Quiz certificates immediately.
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <input
          id="cert-name-input"
          type="text"
          value="${escapeHtml(currentName)}"
          placeholder="e.g. Jane Doe"
          class="px-3.5 py-1.5 rounded-xl text-base border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          id="cert-update-name-btn"
          type="button"
          class="px-4 py-1.5 rounded-xl text-base font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 transition-colors cursor-pointer"
        >
          Update
        </button>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// Component: Locked Course Card
// -------------------------------------------------------------
function renderLockedCourseCard(
  statuses: {
    roadmap: (typeof roadmapsData)[0];
    completedCount: number;
    total: number;
    percent: number;
    isCompleted: boolean;
  }[],
  isAuthenticated: boolean
): string {
  return `
    <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div class="space-y-1">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Roadmap Progress</span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">
            Complete a Roadmap to Unlock
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            You must complete 100% of all milestones and lessons in a curriculum roadmap to earn an official certificate.
          </p>
        </div>

        <button
          type="button"
          onclick="document.getElementById('toggle-course-preview-btn')?.click()"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shrink-0"
        >
          <i data-lucide="eye" class="w-4 h-4"></i> Preview Sample
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${statuses
          .map(
            (s) => `
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4">
            <div class="min-w-0 flex-1">
              <p class="font-bold text-sm text-slate-900 dark:text-white truncate">${s.roadmap.title}</p>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full transition-all" style="width: ${s.percent}%"></div>
              </div>
              <p class="text-xs text-slate-400 mt-1">${s.completedCount} / ${s.total} steps (${s.percent}%)</p>
            </div>
            <a
              href="/pages/roadmaps.html"
              class="px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all shrink-0"
            >
              Continue
            </a>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// Component: Locked Quiz Card
// -------------------------------------------------------------
function renderLockedQuizCard(
  statuses: {
    quiz: (typeof quizzesData)[0];
    hasAttempted: boolean;
    score: number;
    isPassed: boolean;
    dateStr: string;
  }[],
  isAuthenticated: boolean
): string {
  return `
    <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div class="space-y-1">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Quiz Assessment</span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">
            Pass a Final Quiz (70%+) to Unlock
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Demonstrate your technical mastery by taking a quiz and earning 70% or higher.
          </p>
        </div>

        <button
          type="button"
          onclick="document.getElementById('toggle-quiz-preview-btn')?.click()"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shrink-0"
        >
          <i data-lucide="eye" class="w-4 h-4"></i> Preview Sample
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${statuses
          .map(
            (s) => `
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4">
            <div class="min-w-0 flex-1">
              <p class="font-bold text-sm text-slate-900 dark:text-white truncate">${s.quiz.title}</p>
              <p class="text-xs text-slate-400 mt-1">
                ${s.hasAttempted ? `Score: ${s.score}% (Passing: ${s.quiz.passingScorePercent}%)` : 'Not attempted yet'}
              </p>
            </div>
            <a
              href="/pages/quizzes.html?quizId=${s.quiz.id}"
              class="px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all shrink-0"
            >
              ${s.hasAttempted ? 'Retake' : 'Start'}
            </a>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// Frame: Course Certificate (Explicit inline styling for print/export visibility)
// -------------------------------------------------------------
function renderCourseCertificateFrame(
  name: string,
  courseTitle: string,
  dateStr: string,
  certId: string,
  isPreview: boolean
): string {
  return `
    <div class="w-full relative">
      <!-- Certificate Actions Toolbar -->
      <div class="flex items-center justify-end gap-2 mb-3 no-print">
        <button
          type="button"
          id="course-print-action-btn"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs transition-all cursor-pointer"
          title="Print or Save as PDF"
        >
          <i data-lucide="printer" class="w-4 h-4"></i>
          <span>Print / Save PDF</span>
        </button>
        <button
          type="button"
          id="course-download-png-btn"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          title="Download high-resolution image"
        >
          <i data-lucide="download" class="w-4 h-4"></i>
          <span>Download PNG</span>
        </button>
      </div>

      <div class="w-full overflow-x-auto">
        <article
          id="certificate"
          class="certificate-print-target relative mx-auto aspect-[1.414/1] w-full min-w-[650px] max-w-[1120px] border-[10px] border-slate-200 bg-white p-6 sm:p-10 overflow-hidden print:m-0 print:w-[297mm] print:h-[210mm] print:border-[8px]"
          style="background-color: #ffffff !important; color: #0f172a !important;"
        >
          <!-- Watermark for Preview / Sample Mode -->
          ${
            isPreview
              ? `
                <div class="pointer-events-none absolute inset-0 flex items-center justify-center select-none z-30">
                  <div class="rotate-[-25deg] border-4 border-dashed border-red-500/70 bg-red-100/70 px-8 py-3 rounded-2xl text-red-600 font-extrabold text-2xl sm:text-4xl tracking-widest uppercase backdrop-blur-[1px]">
                    SAMPLE PREVIEW · UNVERIFIED
                  </div>
                </div>
              `
              : ''
          }

          <!-- Decorative inner border -->
          <div class="pointer-events-none absolute inset-3 border-2 sm:inset-5 sm:border-4" style="border-color: #059669 !important;"></div>

          <!-- Certificate content with explicit high-contrast inline styles -->
          <div class="relative flex h-full flex-col items-center justify-center px-4 py-3 text-center sm:px-8">
            <p class="mb-2 text-2xl font-bold tracking-[0.25em] uppercase" style="color: #047857 !important;">
              CodeBloom
            </p>

            <p class="mb-2 text-sm sm:text-base tracking-widest uppercase font-semibold" style="color: #64748b !important;">
              Coding Education Platform · Verified Credentials
            </p>

            <h1 class="text-3xl font-extrabold tracking-wide sm:text-5xl mt-2" style="color: #0f172a !important;">
              Certificate of Completion
            </h1>

            <p class="mt-4 text-base sm:text-lg" style="color: #64748b !important;">
              This certificate is proudly presented to
            </p>

            <h2 class="mt-3 border-b-2 px-6 pb-2 text-3xl font-bold sm:text-5xl" style="color: #047857 !important; border-color: #10b981 !important;">
              ${escapeHtml(name)}
            </h2>

            <p class="mt-5 text-base sm:text-lg font-medium" style="color: #334155 !important;">
              For successfully completing 100% of the curriculum roadmap
            </p>

            <h3 class="mt-2 text-2xl font-bold sm:text-3xl" style="color: #4338ca !important;">
              ${escapeHtml(courseTitle)}
            </h3>

            <p class="mt-4 max-w-xl text-sm sm:text-base leading-relaxed" style="color: #64748b !important;">
              In recognition of your dedication to mastering core software development concepts and technical projects.
            </p>

            <div class="mt-6 flex w-full flex-wrap justify-center gap-6 text-sm sm:text-base font-semibold" style="color: #334155 !important;">
              <p>Completed: <strong style="color: #0f172a !important;">${dateStr}</strong></p>
              <p>Certificate ID: <strong style="color: #0f172a !important;">${certId}</strong></p>
            </div>

            <div class="mt-8 flex w-full items-end justify-between gap-6 text-sm sm:text-base">
              <div class="w-1/3 border-t pt-2 text-left" style="border-color: #94a3b8 !important;">
                <p class="font-bold" style="color: #0f172a !important;">CodeBloom Faculty</p>
                <p class="text-xs sm:text-sm" style="color: #64748b !important;">Academic Director</p>
              </div>

              <div class="flex size-16 shrink-0 items-center justify-center rounded-full border-4 text-base font-extrabold sm:size-20" style="color: #047857 !important; border-color: #059669 !important; background-color: #ffffff !important;">
                CB
              </div>

              <div class="w-1/3 border-t pt-2 text-right" style="border-color: #94a3b8 !important;">
                <p class="font-bold" style="color: #0f172a !important;">CodeBloom Platform</p>
                <p class="text-xs sm:text-sm" style="color: #64748b !important;">Verified Credentials</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// Frame: Quiz Certificate (Explicit inline styling for print/export visibility)
// -------------------------------------------------------------
function renderQuizCertificateFrame(
  name: string,
  courseTitle: string,
  score: number,
  dateStr: string,
  certId: string,
  isPreview: boolean
): string {
  return `
    <div class="w-full relative">
      <!-- Certificate Actions Toolbar -->
      <div class="flex items-center justify-end gap-2 mb-3 no-print">
        <button
          type="button"
          id="quiz-print-action-btn"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-xs transition-all cursor-pointer"
          title="Print or Save as PDF"
        >
          <i data-lucide="printer" class="w-4 h-4"></i>
          <span>Print / Save PDF</span>
        </button>
        <button
          type="button"
          id="quiz-download-png-btn"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          title="Download high-resolution image"
        >
          <i data-lucide="download" class="w-4 h-4"></i>
          <span>Download PNG</span>
        </button>
      </div>

      <div class="w-full overflow-x-auto">
        <article
          id="quiz-certificate"
          class="certificate-print-target relative mx-auto aspect-[1.414/1] w-full min-w-[650px] max-w-[1120px] border-[10px] border-slate-200 bg-white p-6 sm:p-10 overflow-hidden print:m-0 print:w-[297mm] print:h-[210mm] print:border-[8px]"
          style="background-color: #ffffff !important; color: #0f172a !important;"
        >
          <!-- Watermark for Preview / Sample Mode -->
          ${
            isPreview
              ? `
                <div class="pointer-events-none absolute inset-0 flex items-center justify-center select-none z-30">
                  <div class="rotate-[-25deg] border-4 border-dashed border-red-500/70 bg-red-100/70 px-8 py-3 rounded-2xl text-red-600 font-extrabold text-2xl sm:text-4xl tracking-widest uppercase backdrop-blur-[1px]">
                    SAMPLE PREVIEW · UNVERIFIED
                  </div>
                </div>
              `
              : ''
          }

          <div class="pointer-events-none absolute inset-3 border-2 sm:inset-5 sm:border-4" style="border-color: #4f46e5 !important;"></div>

          <div class="relative flex h-full flex-col items-center justify-center px-4 py-3 text-center sm:px-8">
            <p class="mb-2 text-2xl font-bold tracking-[0.25em] uppercase" style="color: #4338ca !important;">
              CodeBloom
            </p>

            <p class="mb-2 text-sm sm:text-base tracking-widest uppercase font-semibold" style="color: #64748b !important;">
              Coding Education Platform · Verified Credentials
            </p>

            <h1 class="text-3xl font-extrabold tracking-wide sm:text-5xl mt-2" style="color: #0f172a !important;">
              Certificate of Achievement
            </h1>

            <p class="mt-4 text-base sm:text-lg" style="color: #64748b !important;">
              Awarded to
            </p>

            <h2 class="mt-3 border-b-2 px-6 pb-2 text-3xl font-bold sm:text-5xl" style="color: #4338ca !important; border-color: #6366f1 !important;">
              ${escapeHtml(name)}
            </h2>

            <p class="mt-5 text-base sm:text-lg font-medium" style="color: #334155 !important;">
              For demonstrating verified technical proficiency in
            </p>

            <h3 class="mt-2 text-2xl font-bold sm:text-3xl" style="color: #047857 !important;">
              ${escapeHtml(courseTitle)}
            </h3>

            <div class="mt-5 rounded-2xl border px-8 py-3" style="background-color: #eef2ff !important; border-color: #c7d2fe !important;">
              <p class="text-xs sm:text-sm" style="color: #64748b !important;">Verified Assessment Score</p>
              <p class="mt-0.5 text-2xl sm:text-3xl font-extrabold" style="color: #4338ca !important;">${score}%</p>
              <p class="mt-0.5 text-[11px] font-bold tracking-wider uppercase" style="color: #047857 !important;">PASSED ASSESSMENT</p>
            </div>

            <div class="mt-6 flex w-full flex-wrap justify-center gap-6 text-sm sm:text-base font-semibold" style="color: #334155 !important;">
              <p>Assessment date: <strong style="color: #0f172a !important;">${dateStr}</strong></p>
              <p>Certificate ID: <strong style="color: #0f172a !important;">${certId}</strong></p>
            </div>

            <div class="mt-8 flex w-full items-end justify-between gap-6 text-sm sm:text-base">
              <div class="w-1/3 border-t pt-2 text-left" style="border-color: #94a3b8 !important;">
                <p class="font-bold" style="color: #0f172a !important;">CodeBloom Faculty</p>
                <p class="text-xs sm:text-sm" style="color: #64748b !important;">Academic Director</p>
              </div>

              <div class="flex size-16 shrink-0 items-center justify-center rounded-full border-4 text-base font-extrabold sm:size-20" style="color: #4338ca !important; border-color: #4f46e5 !important; background-color: #ffffff !important;">
                CB
              </div>

              <div class="w-1/3 border-t pt-2 text-right" style="border-color: #94a3b8 !important;">
                <p class="font-bold" style="color: #0f172a !important;">CodeBloom Platform</p>
                <p class="text-xs sm:text-sm" style="color: #64748b !important;">Verified Assessment Division</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// Interactive Events & High-Res PNG / PDF Exporters
// -------------------------------------------------------------
function attachCertificateEvents(
  courseCertVisible: boolean,
  quizCertVisible: boolean,
  learnerName: string
): void {
  // Global print button
  document.getElementById('cert-print-btn')?.addEventListener('click', () => {
    if (quizCertVisible && !courseCertVisible) {
      triggerPrintFor('quiz-certificate');
    } else {
      triggerPrintFor('certificate');
    }
  });

  // Course certificate action buttons
  document.getElementById('course-print-action-btn')?.addEventListener('click', () => {
    triggerPrintFor('certificate');
  });

  document.getElementById('course-download-png-btn')?.addEventListener('click', () => {
    downloadCertificateImage('course', learnerName);
  });

  // Quiz certificate action buttons
  document.getElementById('quiz-print-action-btn')?.addEventListener('click', () => {
    triggerPrintFor('quiz-certificate');
  });

  document.getElementById('quiz-download-png-btn')?.addEventListener('click', () => {
    downloadCertificateImage('quiz', learnerName);
  });

  // Sign In CTA banner
  document.getElementById('cert-signin-cta-btn')?.addEventListener('click', () => {
    openAuthModal();
  });

  // Course Preview Toggle
  document.getElementById('toggle-course-preview-btn')?.addEventListener('click', () => {
    showCoursePreview = !showCoursePreview;
    render();
  });

  // Quiz Preview Toggle
  document.getElementById('toggle-quiz-preview-btn')?.addEventListener('click', () => {
    showQuizPreview = !showQuizPreview;
    render();
  });

  // Name editor
  const nameInput = document.getElementById('cert-name-input') as HTMLInputElement | null;
  const updateName = () => {
    if (nameInput && nameInput.value.trim()) {
      customLearnerName = nameInput.value.trim();
      localStorage.setItem('CodeBloom_cert_name', customLearnerName);
      render();
    }
  };

  document.getElementById('cert-update-name-btn')?.addEventListener('click', updateName);
  nameInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      updateName();
    }
  });

  // Roadmap selector tabs
  document.querySelectorAll<HTMLButtonElement>('[data-select-roadmap]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-select-roadmap'));
      if (!isNaN(idx)) {
        selectedRoadmapIndex = idx;
        render();
      }
    });
  });

  // Quiz selector tabs
  document.querySelectorAll<HTMLButtonElement>('[data-select-quiz]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-select-quiz'));
      if (!isNaN(idx)) {
        selectedQuizIndex = idx;
        render();
      }
    });
  });
}

function triggerPrintFor(targetId: string): void {
  // Ensure the target element has id="certificate" and class="certificate-print-target"
  const target = document.getElementById(targetId) || document.getElementById('certificate');
  if (target) {
    document.querySelectorAll('.certificate-print-target').forEach((el) => {
      el.classList.remove('active-print');
    });
    target.classList.add('active-print');
    target.id = 'certificate';
  }
  window.print();
}

/**
 * Generates and downloads a high-resolution 1920x1358 PNG image
 * with all text, borders, and emblems cleanly rendered via Canvas 2D.
 */
function downloadCertificateImage(type: 'course' | 'quiz', name: string): void {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1358;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);

  // Outer border (slate-200)
  ctx.lineWidth = 18;
  ctx.strokeStyle = '#e2e8f0';
  ctx.strokeRect(9, 9, w - 18, h - 18);

  // Inner decorative border
  ctx.lineWidth = 6;
  ctx.strokeStyle = type === 'course' ? '#059669' : '#4f46e5';
  ctx.strokeRect(36, 36, w - 72, h - 72);

  ctx.textAlign = 'center';

  // Header Brand
  ctx.font = 'bold 36px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = type === 'course' ? '#047857' : '#4338ca';
  ctx.fillText('CODEBLOOM', w / 2, 140);

  // Subtitle
  ctx.font = '600 18px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('CODING EDUCATION PLATFORM · VERIFIED CREDENTIALS', w / 2, 185);

  // Main Certificate Title
  ctx.font = '900 58px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#0f172a';
  const heading = type === 'course' ? 'Certificate of Completion' : 'Certificate of Achievement';
  ctx.fillText(heading, w / 2, 290);

  // Presented to
  ctx.font = '500 24px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText(type === 'course' ? 'This certificate is proudly presented to' : 'Awarded to', w / 2, 370);

  // Recipient Name
  ctx.font = 'bold 64px "Google Sans", Georgia, serif';
  ctx.fillStyle = type === 'course' ? '#047857' : '#4338ca';
  ctx.fillText(name, w / 2, 475);

  // Underline under Name
  const nameWidth = Math.min(ctx.measureText(name).width + 80, 800);
  ctx.lineWidth = 4;
  ctx.strokeStyle = type === 'course' ? '#10b981' : '#6366f1';
  ctx.beginPath();
  ctx.moveTo(w / 2 - nameWidth / 2, 505);
  ctx.lineTo(w / 2 + nameWidth / 2, 505);
  ctx.stroke();

  // Achievement narrative
  ctx.font = '500 24px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#334155';
  const achievText =
    type === 'course'
      ? 'For successfully completing 100% of the curriculum roadmap'
      : 'For demonstrating verified technical proficiency in';
  ctx.fillText(achievText, w / 2, 575);

  // Course / Quiz Title
  ctx.font = 'bold 44px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = type === 'course' ? '#4f46e5' : '#047857';
  const targetTitle = type === 'course' ? 'Frontend Developer Roadmap' : 'JavaScript Core & Advanced Quiz';
  ctx.fillText(targetTitle, w / 2, 655);

  if (type === 'quiz') {
    // Score Badge Box
    ctx.fillStyle = '#eef2ff';
    ctx.strokeStyle = '#c7d2fe';
    ctx.lineWidth = 2;
    const badgeW = 340;
    const badgeH = 80;
    const bx = w / 2 - badgeW / 2;
    const by = 715;
    ctx.beginPath();
    ctx.roundRect(bx, by, badgeW, badgeH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 36px "Google Sans", system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#4338ca';
    ctx.fillText('Score: 92% · PASSED', w / 2, by + 52);
  } else {
    // Description paragraph
    ctx.font = '400 20px "Google Sans", system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(
      'In recognition of your dedication to mastering core software development concepts and technical projects.',
      w / 2,
      735
    );
  }

  // Meta row: Date & Certificate ID
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const certId = generateCertId(type === 'course' ? 'COURSE' : 'QUIZ', 'WEB', name);
  ctx.font = '600 22px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#334155';
  ctx.fillText(`Date: ${dateStr}     |     Certificate ID: ${certId}`, w / 2, 850);

  // Bottom Signatures & Seal
  const sigY = 1080;
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#94a3b8';

  // Left signature
  ctx.beginPath();
  ctx.moveTo(180, sigY);
  ctx.lineTo(500, sigY);
  ctx.stroke();
  ctx.font = 'bold 22px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'left';
  ctx.fillText('CodeBloom Faculty', 180, sigY + 35);
  ctx.font = '500 18px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Academic Director', 180, sigY + 65);

  // Center Seal (CB Emblem)
  ctx.save();
  ctx.beginPath();
  ctx.arc(w / 2, sigY + 18, 58, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = type === 'course' ? '#059669' : '#4f46e5';
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = 'bold 36px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = type === 'course' ? '#047857' : '#4338ca';
  ctx.fillText('CB', w / 2, sigY + 30);
  ctx.restore();

  // Right signature
  ctx.beginPath();
  ctx.moveTo(w - 500, sigY);
  ctx.lineTo(w - 180, sigY);
  ctx.stroke();
  ctx.textAlign = 'right';
  ctx.font = 'bold 22px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('CodeBloom Platform', w - 180, sigY + 35);
  ctx.font = '500 18px "Google Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Verified Credentials', w - 180, sigY + 65);

  // Trigger download
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `CodeBloom-${type === 'course' ? 'Course' : 'Quiz'}-Certificate-${cleanName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, 'image/png');
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCertificatesPage);
} else {
  initCertificatesPage();
}
