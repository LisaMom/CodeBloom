export function renderFooter(): string {
  return `
    <footer class="w-full bg-indigo-700 dark:bg-slate-900 text-white border-t border-blue-500/40 dark:border-slate-800 transition-colors mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10">
          <!-- Column 1: Brand & Tagline -->
          <div class="space-y-4 sm:col-span-2 md:col-span-1">
            <div class="flex items-center">
              <img
                src="/images/codebloom-logo-dark.png" 
                alt="CodeBloom Logo"
                class="h-28 w-auto object-contain"
              />
            </div>
            <p class="text-base text-blue-100/90 leading-relaxed">
              We are a leading education platform dedicated to products and services to cater to your needs.
            </p>
          </div>

          <!-- Column 2: Quick Links 1 -->
          <div class="space-y-3">
            <h4 class="text-base font-extrabold uppercase tracking-widest text-white">
              QUICK LINK
            </h4>
            <ul class="space-y-2 text-base text-blue-100">
              <li><a href="/index.html" class="hover:text-white hover:underline transition-colors">Home</a></li>
              <li><a href="/pages/roadmaps.html" class="hover:text-white hover:underline transition-colors">Roadmaps</a></li>
              <li><a href="/pages/lessons.html" class="hover:text-white hover:underline transition-colors">Lessons</a></li>
              <li><a href="/pages/quizzes.html" class="hover:text-white hover:underline transition-colors">Quizzes</a></li>
              <li><a href="/pages/certificates.html" class="hover:text-white hover:underline transition-colors">Certificates</a></li>
              <li><a href="/pages/about.html" class="hover:text-white hover:underline transition-colors">About Us</a></li>
            </ul>
          </div>

          <!-- Column 3: Legal & Policies -->
          <div class="space-y-3">
            <h4 class="text-base font-extrabold uppercase tracking-widest text-white">
              LEGAL & POLICIES
            </h4>
            <ul class="space-y-2 text-base text-blue-100">
              <li><a href="/pages/about.html" class="hover:text-white hover:underline transition-colors">Privacy Policy</a></li>
              <li><a href="/pages/about.html" class="hover:text-white hover:underline transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          <!-- Column 4: Address & Contact -->
          <div class="space-y-3 sm:col-span-2 md:col-span-1">
            <h4 class="text-base font-extrabold uppercase tracking-widest text-white">
              ADDRESS & CONTACT
            </h4>
            <div class="space-y-2.5 text-base text-blue-100 leading-relaxed">
              <div class="flex items-start gap-2.5">
                <i data-lucide="map-pin" class="w-4 h-4 text-blue-300 shrink-0 mt-1"></i>
                <span>#40, St 273, Sangkat Boeung Kak II, Khan Toul Kork, Phnom Penh, Cambodia</span>
              </div>
              <div class="flex items-center gap-2.5">
                <i data-lucide="phone" class="w-4 h-4 text-blue-300 shrink-0"></i>
                <span>(+855) 95-990-910</span>
              </div>
              <div class="flex items-center gap-2.5">
                <i data-lucide="mail" class="w-4 h-4 text-blue-300 shrink-0"></i>
                <span>info.istad@gmail.com</span>
              </div>
            </div>
          </div>

          <!-- Column 5: Our Sponsors -->
          <div class="space-y-3">
            <h4 class="text-base font-extrabold uppercase tracking-widest text-white">
              OUR SPONSORS
            </h4>
            <div class="pt-1">
              <a
                href="https://www.istad.co/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block group transition-transform hover:scale-105"
                title="Institute of Science and Technology Advanced Development"
              >
                <img
                  src="/assets/istad-logo.png"
                  alt="ISTAD Institute of Science and Technology Advanced Development"
                  class="h-28 w-auto object-contain drop-"
                />
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom Copyright -->
        <div class="mt-12 pt-6 border-t border-blue-500/40 dark:border-slate-800 text-center text-lg text-blue-200 dark:text-slate-400">
          © 2026 CodeBloom. In partnership with ISTAD. All rights reserved.
        </div>
      </div>
    </footer>
  `;
}
