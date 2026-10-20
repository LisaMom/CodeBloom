import { login } from '../auth';
import { renderIcons } from '../utils/icons';

export function openAuthModal(onSuccess?: () => void): void {
  let modalEl = document.getElementById('codebloom-auth-modal');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'codebloom-auth-modal';
    document.body.appendChild(modalEl);
  }

  let showPassword = false;
  let loading = false;

  const render = () => {
    if (!modalEl) return;
    modalEl.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
        <div id="auth-modal-backdrop" class="fixed inset-0"></div>

        <div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl  border border-slate-100 dark:border-slate-800 p-8 sm:p-10 z-10">
          <!-- Close button -->
          <button id="auth-modal-close" class="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <!-- Logo & Header -->
          <div class="flex flex-col items-center mb-6 gap-2">
            <img src="/assets/logo.png" alt="CodeBloom Logo" class="h-16 w-auto object-contain dark:hidden" />
            <img src="/assets/logo-dark.png" alt="CodeBloom Logo" class="h-16 w-auto object-contain hidden dark:block" />
            <p class="text-slate-500 dark:text-slate-400 text-lg text-center">
              Sign in to continue your learning journey
            </p>
          </div>

          <!-- Alert Container -->
          <div id="auth-error-alert" class="hidden mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-lg text-red-600 dark:text-red-400 flex items-center gap-2">
            <span>⚠</span>
            <span id="auth-error-msg"></span>
          </div>

          <!-- Form -->
          <form id="auth-login-form" class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <label for="auth-email" class="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Email address
              </label>
              <input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="auth-password" class="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div class="relative">
                <input
                  id="auth-password"
                  type="${showPassword ? 'text' : 'password'}"
                  placeholder="••••••••"
                  required
                  minlength="8"
                  class="w-full px-4 py-2.5 pr-11 rounded-xl border border-slate-200 dark:border-slate-700 text-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
                <button
                  id="auth-toggle-password"
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  <i data-lucide="${showPassword ? 'eye-off' : 'eye'}" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              ${loading ? 'disabled' : ''}
              class="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition-all cursor-pointer   active:scale-[0.98]"
            >
              ${loading
        ? '<span class="inline-block animate-spin mr-2">⏳</span> Signing in…'
        : '<i data-lucide="log-in" class="w-4 h-4"></i> Sign in'
      }
            </button>
          </form>

          <!-- Demo hint -->
          <p class="mt-4 text-center text-base text-slate-400 dark:text-slate-500">
            Demo: enter any valid email & password ≥ 8 characters
          </p>

          <div class="mt-4 text-center">
            <button
              id="auth-skip-btn"
              type="button"
              class="text-base text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer"
            >
              ← Continue as guest
            </button>
          </div>
        </div>
      </div>
    `;

    renderIcons(modalEl);
    attachEvents();
  };

  const close = () => {
    if (modalEl) modalEl.innerHTML = '';
  };

  const attachEvents = () => {
    document.getElementById('auth-modal-close')?.addEventListener('click', close);
    document.getElementById('auth-modal-backdrop')?.addEventListener('click', close);
    document.getElementById('auth-skip-btn')?.addEventListener('click', close);

    document.getElementById('auth-toggle-password')?.addEventListener('click', () => {
      showPassword = !showPassword;
      render();
    });

    const form = document.getElementById('auth-login-form') as HTMLFormElement | null;
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('auth-email') as HTMLInputElement | null;
      const passInput = document.getElementById('auth-password') as HTMLInputElement | null;
      const errorAlert = document.getElementById('auth-error-alert');
      const errorMsg = document.getElementById('auth-error-msg');

      const email = emailInput?.value.trim() || '';
      const pass = passInput?.value || '';

      if (!email || !email.includes('@')) {
        if (errorAlert && errorMsg) {
          errorMsg.textContent = 'Please enter a valid email address.';
          errorAlert.classList.remove('hidden');
        }
        return;
      }

      if (pass.length < 8) {
        if (errorAlert && errorMsg) {
          errorMsg.textContent = 'Password must be at least 8 characters.';
          errorAlert.classList.remove('hidden');
        }
        return;
      }

      loading = true;
      render();

      try {
        await login(email, pass);
        close();
        if (onSuccess) onSuccess();
        else window.location.reload();
      } catch (err: any) {
        loading = false;
        render();
        if (errorAlert && errorMsg) {
          errorMsg.textContent = err.message || 'Login failed. Please check your credentials.';
          errorAlert.classList.remove('hidden');
        }
      }
    });
  };

  render();
}
