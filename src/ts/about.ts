import '../css/main.css';
import { initTheme } from './theme';
import { renderNavbar, initNavbarEvents } from './components/navbar';
import { renderFooter } from './components/footer';
import { renderIcons } from './utils/icons';
import { updateSEO } from './utils/seo';

export function initAboutPage(): void {
  initTheme();
  updateSEO({
    title: 'About Us',
    description: 'CodeBloom is a modern coding education platform designed to help beginners learn, build, and grow their skills step by step.',
  });

  const appEl = document.getElementById('app');
  if (!appEl) return;

  appEl.innerHTML = `
    ${renderNavbar('about')}

    <main class="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24 animate-fadeIn">
      <!-- Section 1: Hero Section -->
      <section class="relative overflow-hidden pt-4 sm:pt-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div class="lg:col-span-7 space-y-6 text-left">
            <span class="inline-block px-3.5 py-1 text-lg font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              About Us
            </span>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Every Developer Starts <span class="text-emerald-500">Somewhere.</span>
            </h1>

            <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              CodeBloom is a modern coding education platform designed to help beginners learn, build, and grow their skills step by step. With simple lessons, hands-on practice, and supportive guidance, we turn your curiosity into real progress.
            </p>

            <div class="flex items-center gap-3 text-lg font-semibold text-slate-500 dark:text-slate-400 pt-2">
              <span>Learn</span>
              <span class="text-emerald-500">•</span>
              <span>Build</span>
              <span class="text-emerald-500">•</span>
              <span>Grow</span>
            </div>
          </div>

          <div class="lg:col-span-5 flex justify-center relative">
            <div class="relative w-full max-w-md">
              <div class="absolute inset-0 bg-sky-100 dark:bg-sky-950/40 rounded-full blur-2xl transform scale-90 -z-10"></div>

              <div class="absolute -top-3 left-4 z-20 flex items-center justify-center w-11 h-11 rounded-2xl bg-emerald-500 text-white font-mono font-bold text-lg">
                &lt;/&gt;
              </div>

              <div class="absolute -top-2 right-4 z-20 px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-base font-bold flex items-center gap-1.5">
                <span>Better Skills</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                <span>Brighter Future</span>
              </div>

              <div class="relative mx-auto mt-6 p-4 rounded-3xl bg-slate-900 border-4 border-slate-800">
                <div class="w-2.5 h-2.5 rounded-full bg-slate-700 mx-auto mb-3"></div>
                <div class="rounded-2xl bg-slate-950 p-4 font-mono text-base space-y-2 border border-slate-800/80">
                  <div class="flex items-center gap-1.5 pb-2 border-b border-slate-800/60">
                    <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <div class="space-y-1.5 pt-1">
                    <div class="h-2 w-28 rounded bg-indigo-400/80"></div>
                    <div class="h-2 w-44 rounded bg-emerald-400/80 pl-4"></div>
                    <div class="h-2 w-36 rounded bg-purple-400/80 pl-4"></div>
                    <div class="h-2 w-20 rounded bg-cyan-400/80"></div>
                    <div class="h-2 w-40 rounded bg-indigo-400/70"></div>
                  </div>
                </div>
                <div class="h-3 w-48 mx-auto -mb-1 mt-3 rounded-b-xl bg-slate-800 "></div>
              </div>

              <div class="absolute -bottom-2 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700  text-emerald-500">
                <i data-lucide="sprout" class="w-5 h-5"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Mission Card -->
      <section>
        <div class="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 ">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div class="md:col-span-7 flex items-start gap-4 sm:gap-5">
              <div class="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <i data-lucide="target" class="w-6 h-6"></i>
              </div>
              <div class="space-y-2.5">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
                <p class="text-lg sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our mission is to make coding accessible, structured, and beginner-friendly for everyone. We believe that anyone can learn to code with the right resources, clear guidance, and consistent practice.
                </p>
              </div>
            </div>

            <div class="md:col-span-5">
              <div class="p-6 rounded-2xl bg-sky-50/80 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700/60 flex items-center gap-5">
                <div class="w-24 h-20 shrink-0 flex items-end justify-center">
                  <svg viewBox="0 0 100 80" class="w-full h-full" fill="none">
                    <polygon points="10,80 35,40 55,80" class="fill-emerald-600 dark:fill-emerald-500"></polygon>
                    <polygon points="30,80 65,15 100,80" class="fill-indigo-600 dark:fill-indigo-500"></polygon>
                    <polygon points="65,15 54,35 65,30 76,35" class="fill-white"></polygon>
                    <polygon points="35,40 28,52 35,48 42,52" class="fill-white"></polygon>
                    <line x1="65" y1="15" x2="65" y2="4" stroke="#059669" stroke-width="2.5"></line>
                    <polygon points="65,4 77,9 65,14" class="fill-emerald-500"></polygon>
                  </svg>
                </div>
                <div>
                  <h4 class="text-base font-extrabold text-slate-900 dark:text-white leading-snug">Better Learners</h4>
                  <p class="text-lg font-semibold text-slate-700 dark:text-slate-300">Build a Brighter Future</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Learning Principles -->
      <section class="space-y-8">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <i data-lucide="lightbulb" class="w-5 h-5"></i>
          </div>
          <div class="space-y-1">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Our Learning Principles</h2>
            <p class="text-lg text-slate-500 dark:text-slate-400">
              We follow a simple set of principles to make your learning journey effective, engaging, and rewarding.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80  space-y-4 hover:border-emerald-400 transition-colors">
            <div class="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center ">
              <i data-lucide="trending-up" class="w-5 h-5"></i>
            </div>
            <div class="space-y-1.5">
              <h3 class="text-base font-bold text-slate-900 dark:text-white">Step-by-Step Learning</h3>
              <p class="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                Go from basics to advanced with a clear and structured path.
              </p>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80  space-y-4 hover:border-indigo-400 transition-colors">
            <div class="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center ">
              <i data-lucide="code-2" class="w-5 h-5"></i>
            </div>
            <div class="space-y-1.5">
              <h3 class="text-base font-bold text-slate-900 dark:text-white">Hands-on Practice</h3>
              <p class="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                Build real projects and apply what you learn right away.
              </p>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80  space-y-4 hover:border-emerald-400 transition-colors">
            <div class="w-11 h-11 rounded-xl bg-teal-500 text-white flex items-center justify-center ">
              <i data-lucide="users" class="w-5 h-5"></i>
            </div>
            <div class="space-y-1.5">
              <h3 class="text-base font-bold text-slate-900 dark:text-white">Supportive Guidance</h3>
              <p class="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                Get help when you need it from your mentor and our community.
              </p>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80  space-y-4 hover:border-indigo-400 transition-colors">
            <div class="w-11 h-11 rounded-xl bg-indigo-500 text-white flex items-center justify-center ">
              <i data-lucide="bar-chart-2" class="w-5 h-5"></i>
            </div>
            <div class="space-y-1.5">
              <h3 class="text-base font-bold text-slate-900 dark:text-white">Lifelong Growth</h3>
              <p class="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                Keep learning, keep building, and grow your skills for the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Platform Overview -->
      <section class="space-y-6">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <i data-lucide="bar-chart-2" class="w-5 h-5"></i>
          </div>
          <div class="space-y-1">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Platform Overview</h2>
            <p class="text-lg text-slate-500 dark:text-slate-400">A snapshot of what CodeBloom offers.</p>
          </div>
        </div>

        <div class="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 ">
          <div class="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center">
            <div class="text-center sm:text-left space-y-1.5">
              <div class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto sm:mx-0">
                <i data-lucide="book-open" class="w-4 h-4"></i>
              </div>
              <p class="text-3xl font-extrabold text-slate-900 dark:text-white">12+</p>
              <h4 class="text-lg font-bold text-slate-900 dark:text-slate-200">Learning Paths</h4>
              <p class="text-base text-slate-400">From beginner to advanced</p>
            </div>

            <div class="text-center sm:text-left space-y-1.5">
              <div class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto sm:mx-0">
                <i data-lucide="play" class="w-4 h-4"></i>
              </div>
              <p class="text-3xl font-extrabold text-slate-900 dark:text-white">150+</p>
              <h4 class="text-lg font-bold text-slate-900 dark:text-slate-200">Lessons</h4>
              <p class="text-base text-slate-400">Short, focused &amp; clear</p>
            </div>

            <div class="text-center sm:text-left space-y-1.5">
              <div class="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto sm:mx-0">
                <i data-lucide="file-code-2" class="w-4 h-4"></i>
              </div>
              <p class="text-3xl font-extrabold text-slate-900 dark:text-white">50+</p>
              <h4 class="text-lg font-bold text-slate-900 dark:text-slate-200">Projects</h4>
              <p class="text-base text-slate-400">Build real world skills</p>
            </div>

            <div class="text-center sm:text-left space-y-1.5">
              <div class="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto sm:mx-0">
                <i data-lucide="user-check" class="w-4 h-4"></i>
              </div>
              <p class="text-3xl font-extrabold text-slate-900 dark:text-white">10K+</p>
              <h4 class="text-lg font-bold text-slate-900 dark:text-slate-200">Active Learners</h4>
              <p class="text-base text-slate-400">Growing every day</p>
            </div>

            <div class="col-span-2 md:col-span-1 text-center md:text-right border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
              <div class="space-y-1">
                <span class="block text-emerald-600 dark:text-emerald-400 font-extrabold italic text-lg tracking-tight">Real Skills.</span>
                <span class="block text-emerald-600 dark:text-emerald-400 font-extrabold italic text-lg tracking-tight">Projects.</span>
                <span class="block text-emerald-600 dark:text-emerald-400 font-extrabold italic text-lg tracking-tight">Progress.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Creator & Mentor -->
      <section class="space-y-8">
        <div class="flex items-start gap-3">
          <div class="space-y-1">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Creator &amp; Mentor</h2>
            <p class="text-lg text-slate-500 dark:text-slate-400">This platform is built with passion and guided by experience.</p>
          </div>
        </div>

        <div class="space-y-5">
          <!-- Mentor -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 ">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div class="md:col-span-3 flex justify-center md:justify-start rounded-2xl overflow-hidden  max-w-[200px] mx-auto md:mx-0">
                <img
                  src="/assets/mentor/srorng-sokcheat.jpg"
                  alt="Srorng SokCheat"
                  class="w-full h-auto object-cover"
                  onerror="this.src='/assets/hero-developer.png'"
                />
              </div>

              <div class="md:col-span-5 space-y-2 text-center md:text-left">
                <span class="inline-block px-2.5 py-0.5 rounded-full text-[14px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  Mentor
                </span>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">Srorng SokCheat</h3>
                <p class="text-lg font-semibold text-slate-500 dark:text-slate-400">Senior Software Engineer &amp; Instructor</p>
                <p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  With 8+ years of experience in web development, I'm passionate about teaching and helping others turn their ideas into real applications.
                </p>
                <div class="flex items-center justify-center md:justify-start gap-4 pt-1 text-base text-slate-500 dark:text-slate-400">
                  <span class="flex items-center gap-1.5"><i data-lucide="code-2" class="w-3.5 h-3.5 text-emerald-500"></i> Instructor</span>
                  <span class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-500"></i> Cambodia</span>
                </div>
              </div>

              <div class="md:col-span-4">
                <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 relative">
                  <span class="text-emerald-500 font-serif font-black text-2xl leading-none">“</span>
                  <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 italic leading-relaxed mt-1">
                    Great developers aren't born, they're built with the right guidance, practice, and support.
                  </p>
                  <p class="text-right text-base font-bold text-slate-500 dark:text-slate-400 mt-2">— Srorng SokCheat</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Creator -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 ">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div class="md:col-span-3 flex justify-center md:justify-start rounded-2xl overflow-hidden  max-w-[200px] mx-auto md:mx-0">
                <img
                  src="/assets/creator/Lisa.JPG"
                  alt="Mom Lisa"
                  class="w-full h-auto object-cover"
                  onerror="this.src='/assets/hero-developer.png'"
                />
              </div>

              <div class="md:col-span-5 space-y-2 text-center md:text-left">
                <span class="inline-block px-2.5 py-0.5 rounded-full text-[14px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  Creator
                </span>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">Mom Lisa</h3>
                <p class="text-lg font-semibold text-slate-500 dark:text-slate-400">Full Stack Developer &amp; Creator</p>
                <p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  I'm a full stack developer and the creator of CodeBloom. I built this platform to make coding simple, practical, and accessible for everyone.
                </p>
                <div class="flex items-center justify-center md:justify-start gap-4 pt-1 text-base text-slate-500 dark:text-slate-400">
                  <span class="flex items-center gap-1.5"><i data-lucide="code-2" class="w-3.5 h-3.5 text-emerald-500"></i> Full Stack Developer</span>
                  <span class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-500"></i> Cambodia</span>
                </div>
              </div>

              <div class="md:col-span-4">
                <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 relative">
                  <span class="text-emerald-500 font-serif font-black text-2xl leading-none">“</span>
                  <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 italic leading-relaxed mt-1">
                    I believe in small steps, consistent practice, and a supportive community. Let's grow together!
                  </p>
                  <p class="text-right text-base font-bold text-slate-500 dark:text-slate-400 mt-2">— Mom Lisa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 6: CTA Banner -->
      <section>
        <div class="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white text-center space-y-6 ">
          <div class="space-y-2 max-w-xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Start <span class="text-emerald-400">Your Journey?</span>
            </h2>
            <p class="text-lg sm:text-base text-emerald-100/90 leading-relaxed">
              Join CodeBloom today and take the first step toward your coding future.
            </p>
          </div>

          <div>
            <a
              href="/pages/roadmaps.html"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            >
              <span>Start Learning</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>
        </div>
      </section>
    </main>

    ${renderFooter()}
  `;

  initNavbarEvents('about');
  renderIcons(appEl);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAboutPage);
} else {
  initAboutPage();
}
