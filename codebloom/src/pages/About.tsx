import React, { useEffect } from "react";
import { updateSEO } from "../utils/seo";
import { SectionHeading } from "../components/common/SectionHeading";
import { Button } from "../components/common/Button";

export interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  useEffect(() => {
    updateSEO({
      title: "About DevTech | Mission & Platform",
      description:
        "Empowering self-taught and growing developers with structured roadmaps, bite-sized lessons, interactive quizzes, and lifelong growth.",
    });
  }, []);

  const coreValues = [
    {
      title: "Clarity",
      description:
        "Cutting through internet noise and tutorial fatigue with direct, curated, and battle-tested guidance.",
      icon: "🎯",
    },
    {
      title: "Practical Projects",
      description:
        "Prioritizing real codebases and production capstones over artificial toy examples.",
      icon: "🛠️",
    },
    {
      title: "Community Support",
      description:
        "Fostering peer feedback, open collaboration, and an environment where asking questions is celebrated.",
      icon: "🤝",
    },
    {
      title: "Lifelong Growth",
      description:
        "Equipping engineers to continuously adapt, build intuition, and evolve alongside emerging technologies.",
      icon: "🌱",
    },
  ];

  const platformFeatures = [
    {
      title: "Structured Roadmaps",
      description:
        "Sequenced milestones guiding learners from fundamental syntax to deployment.",
      icon: "🗺️",
      badge: "Curriculum",
    },
    {
      title: "Bite-Sized Lessons",
      description:
        "Focused tutorials explaining one key concept with clear code blocks and live practice questions.",
      icon: "📖",
      badge: "Tutorials",
    },
    {
      title: "Interactive Quizzes",
      description:
        "Instant scoring, immediate feedback, and detailed answer explanations to test retention.",
      icon: "⚡",
      badge: "Assessments",
    },
    {
      title: "Progress Tracking",
      description:
        "Local persistence, streaks, and milestone completion flags to celebrate your momentum.",
      icon: "📊",
      badge: "Motivation",
    },
  ];

  return (
    <div className="space-y-16 max-w-4xl mx-auto animate-fadeIn">
      {/* Section 1 — Mission statement */}
      <section className="text-center space-y-6">
        <SectionHeading
          badge="Mission Statement"
          title="Empowering Self-Taught and Growing Developers"
          subtitle="DevTech was created to turn developer ambitions into confident engineering careers through structured, accessible, and community-driven roadmaps."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 text-left">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2.5 transition-all hover:border-emerald-300 dark:hover:border-emerald-800"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{val.icon}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {val.title}
                </h3>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 — Platform features */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-base font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Platform Features
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Designed for Serious Technical Growth
          </h2>
          <p className="text-lg sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Everything you need to move from passive tutorial consumer to
            proactive builder.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {platformFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{feat.icon}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {feat.badge}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {feat.title}
              </h4>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Creator / Team Note & School Project Concept */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-base font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/60">
            🎓 Academic Showcase & ISTAD Concept
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            A Note From the Creator
          </h3>
          <p className="text-lg sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            DevTech was designed and developed as an individual school project
            concept for{" "}
            <strong>
              ISTAD (Institute of Science and Technology Advanced Development)
            </strong>
            . The goal was to engineer a clean, accessible learning platform
            adhering strictly to high-standard UI/UX tokens, modular React
            component architecture, and the newly released Tailwind CSS v4.
          </p>
        </div>

        {/* Illustrative Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
          <div>
            <span className="block text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              6
            </span>
            <span className="text-base text-slate-500 dark:text-slate-400 font-medium">
              Career Tracks
            </span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              20+
            </span>
            <span className="text-base text-slate-500 dark:text-slate-400 font-medium">
              Milestones
            </span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
              100%
            </span>
            <span className="text-base text-slate-500 dark:text-slate-400 font-medium">
              Free & Open
            </span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
              v4.3
            </span>
            <span className="text-base text-slate-500 dark:text-slate-400 font-medium">
              Tailwind CSS
            </span>
          </div>
        </div>

        {/* Author Bio & Social Links */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-md">
            VS
          </div>
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Vannak Seng
            </h4>
            <p className="text-base text-emerald-700 dark:text-emerald-400 font-semibold">
              Frontend Engineer & ISTAD Student
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              Dedicated to designing fast, accessible, and intuitive digital
              experiences for learners across Cambodia and around the world.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-base font-semibold">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <a
                href="https://portfolio.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <span>Portfolio</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Open source CTA */}
      <section className="text-center space-y-4 p-8 sm:p-10 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
        <span className="text-base font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Open Source & Community
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Help Us Cultivate Developer Growth
        </h3>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          DevTech is open source. Suggest new curriculum paths, improve
          explanation clarity, submit quiz questions, or report an issue on
          GitHub.
        </p>
        <div className="pt-3 flex flex-wrap justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate("roadmaps")}
          >
            Start Learning Now
          </Button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-medium rounded-xl text-lg px-4 py-2.5 gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
          >
            Contribute on GitHub ↗
          </a>
        </div>
      </section>
    </div>
  );
};
