import React, { useState } from "react";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { loginSchema, type LoginFormData } from "../schemas/auth";

interface LoginProps {
  onLogin: (email: string) => void;
  onSkip?: () => void;
}

type FieldErrors = Partial<Record<keyof LoginFormData, string>>;

export const Login: React.FC<LoginProps> = ({ onLogin, onSkip }) => {
  const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on edit
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate with Zod
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LoginFormData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      // Simulate network delay — replace with real API call
      await new Promise((res) => setTimeout(res, 800));
      onLogin(result.data.email);
    } catch {
      setSubmitError(
        "Login failed. Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-200/60 dark:shadow-slate-950/60 border border-slate-100 dark:border-slate-800 p-8 sm:p-10">
          {/* Logo / Brand */}
          <div className="flex flex-col items-center mb-8 gap-3">
           
            <a href="/src/App.tsx" className="inline-block">
             <img     
              src="/images/logo.png"
              alt="Dev Tech Logo"
              className="h-22 w-auto object-contain dark:hidden"
            />
              <img
                src="/images/logo-dark.png"
                alt="Dev Tech Logo"
                className="h-22 w-auto object-contain hidden dark:block"
              />
            </a>
            <p className="text-slate-500 dark:text-slate-400 text-lg text-center">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Global submit error */}
          {submitError && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2 text-lg text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-xl px-4 py-3"
            >
              <span>⚠</span>
              <span>{submitError}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-lg font-medium text-slate-700 dark:text-slate-300"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-2.5 rounded-xl border text-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all
                  focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                  ${
                    errors.email
                      ? "border-red-400 dark:border-red-600 bg-red-50/50 dark:bg-red-950/20"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
              />
              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-base text-red-600 dark:text-red-400 mt-0.5"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-lg font-medium text-slate-700 dark:text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={`w-full px-4 py-2.5 pr-11 rounded-xl border text-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all
                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                    ${
                      errors.password
                        ? "border-red-400 dark:border-red-600 bg-red-50/50 dark:bg-red-950/20"
                        : "border-slate-200 dark:border-slate-700"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="text-base text-red-600 dark:text-red-400 mt-0.5"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot password link */}
            <div className="flex justify-end -mt-2">
              <button
                type="button"
                className="text-base text-emerald-600 dark:text-emerald-400 hover:underline focus:outline-none"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 dark:disabled:bg-emerald-800 shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <p className="mt-6 text-center text-base text-slate-400 dark:text-slate-600">
            Demo: enter any valid email &amp; a password ≥ 8 characters
          </p>

          {/* Guest / back-to-home link */}
          {onSkip && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={onSkip}
                className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors focus:outline-none"
              >
                ← Continue as guest &amp; go to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
