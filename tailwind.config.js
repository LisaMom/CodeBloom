/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Google Sans"'],
      },
      colors: {
        whitesmoke: "#f5f5f5",
        // Figma Slate tokens
        slate: {
          0: "#ffffff",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // Figma Emerald tokens (CodeBloom primary)
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Figma Indigo tokens (CodeBloom accent)
        indigo: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        success: {
          100: "#dcfce7",
          500: "#22c55e",
          700: "#15803d",
        },
        warning: {
          100: "#fef9c3",
          500: "#eab308",
          700: "#a16207",
        },
        error: {
          100: "#fee2e2",
          500: "#ef4444",
          700: "#b91c1c",
        },
        info: {
          100: "#e0f2fe",
          500: "#0ea5e9",
          700: "#0369a1",
        },
        brand: {
          primary: "var(--primary)",
          primaryHover: "var(--primary-hover)",
          accent: "var(--accent)",
          bg: "var(--bg)",
          surface: "var(--surface)",
          surfaceSubtle: "var(--surface-subtle)",
          textPrimary: "var(--text-primary)",
          textSecondary: "var(--text-secondary)",
          border: "var(--border)",
        },
      },
    },
  },
  plugins: [],
};
