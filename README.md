# 🌸 CodeBloom

> **Interactive Developer Career Roadmaps, Bite-Sized Lessons, and Self-Assessment Quizzes.**

CodeBloom is an open-source web application designed to help developers level up their careers with structured, verified learning paths. Say goodbye to tutorial hell and hello to opinionated curriculum blueprints.

---

## ✨ Features

- 🗺️ **Interactive Roadmaps**: Step-by-step developer guides covering Frontend, Backend, DevOps & Cloud, and AI Application Engineering.
- 📖 **Bite-Sized Practical Lessons**: Deep-dive technical explanations with syntax-highlighted code snippets, pro tips, and key takeaways.
- 🧠 **Skill Quizzes**: Timed interactive assessments with instant explanations, scoring breakdown, and attempt tracking.
- 🌓 **Dark & Light Mode**: Seamless theme toggling with system preference detection and localStorage persistence.
- 📈 **Learning Progress Tracking**: Tracks completed milestones, lessons, and quiz scores locally with zero login friction.
- 🔖 **Bookmarks & Favorites**: Quick-save roadmaps and lessons for easy access later.
- 🔍 **Real-Time Search**: Instant filtering across titles, technologies, and skills.

---

## 📁 Project Structure

```text
CodeBloom/
├── public/
│   ├── images/
│   │   ├── hero-developer.png           # Hero illustration graphic
│   │   └── roadmap-illustration.svg     # Vector roadmap visual
│   ├── favicon.svg                      # Browser tab icon
│   └── robots.txt                       # Search engine crawler config
│
├── src/
│   ├── assets/
│   │   └── logo.svg                     # CodeBloom vector logo
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx               # Reusable button with variants & loading state
│   │   │   ├── Badge.tsx                # Status pills and difficulty indicators
│   │   │   ├── ProgressBar.tsx          # Progress bars with gradient fills
│   │   │   ├── SearchBar.tsx            # Live search input with keyboard shortcut
│   │   │   └── SectionHeading.tsx       # Standardized section headers
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx               # Sticky desktop/tablet navigation
│   │   │   ├── MobileMenu.tsx           # Slide-out drawer navigation for mobile
│   │   │   ├── Footer.tsx               # Community, newsletter & copyright footer
│   │   │   └── MainLayout.tsx           # Application layout shell
│   │   │
│   │   ├── roadmap/
│   │   │   ├── RoadmapCard.tsx          # Roadmap catalog preview card
│   │   │   └── RoadmapStep.tsx          # Milestone step with completion toggle
│   │   │
│   │   ├── lesson/
│   │   │   ├── LessonCard.tsx           # Lesson catalog card
│   │   │   ├── LessonSidebar.tsx        # Section table-of-contents & tracker
│   │   │   └── CodeBlock.tsx            # Syntax container with line numbers & copy
│   │   │
│   │   └── quiz/
│   │       ├── QuizCard.tsx             # Quiz summary card with past attempts
│   │       ├── QuizQuestion.tsx         # Interactive question renderer
│   │       └── QuizResult.tsx           # Score report & retry screen
│   │
│   ├── pages/
│   │   ├── Home.tsx                     # Landing page with stats & featured items
│   │   ├── Roadmaps.tsx                 # Roadmaps catalog & interactive timeline
│   │   ├── Lessons.tsx                  # Lessons library & deep-dive reader
│   │   ├── Quizzes.tsx                  # Quiz catalog & live quiz runner
│   │   └── About.tsx                    # Mission, philosophy & tech stack
│   │
│   ├── data/
│   │   ├── roadmaps.ts                  # Roadmap datasets
│   │   ├── lessons.ts                   # Lesson contents & code snippets
│   │   ├── quizzes.ts                   # Question banks & answer criteria
│   │   └── courses.ts                   # Specialization track configurations
│   │
│   ├── hooks/
│   │   ├── useTheme.ts                  # Theme toggle & dark mode sync
│   │   └── useProgress.ts               # LocalStorage progress state hook
│   │
│   ├── types/
│   │   ├── roadmap.ts                   # Roadmap, step & milestone types
│   │   ├── lesson.ts                    # Lesson & code snippet interfaces
│   │   └── quiz.ts                      # Quiz questions, options & attempt types
│   │
│   ├── utils/
│   │   ├── seo.ts                       # Dynamic document title & meta tags
│   │   └── storage.ts                   # Type-safe localStorage access
│   │
│   ├── App.tsx                          # Root orchestrator & hash router
│   ├── main.tsx                         # React 18 DOM mount point
│   └── index.css                        # Design system & Tailwind directives
│
├── index.html                           # HTML template
├── vite.config.ts                       # Vite bundler config
├── tsconfig.json                        # App TypeScript configuration
├── tsconfig.node.json                   # Node TypeScript configuration
├── tailwind.config.js                   # Tailwind CSS theme configuration
├── postcss.config.js                    # PostCSS plugins
├── package.json                         # Node dependencies & scripts
└── README.md                            # Documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or later recommended)
- **npm** or **yarn** or **pnpm**

### Installation

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production

To create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Tooling**: [Vite](https://vitejs.dev)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **State & Storage**: React Hooks + LocalStorage API

---

## 📄 License

MIT © [CodeBloom](https://github.com). Open-source educational content.
