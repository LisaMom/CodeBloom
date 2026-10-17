import React, { useEffect } from "react";
import { updateSEO } from "../utils/seo";
import {
  Sprout,
  Target,
  Lightbulb,
  TrendingUp,
  Code2,
  Users,
  BarChart2,
  BookOpen,
  Play,
  FileCode2,
  UserCheck,
  Star,
  Compass,
  Smartphone,
  Activity,
  MapPin,
  ArrowRight,
} from "lucide-react";

export interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  useEffect(() => {
    updateSEO({
      title: "About Us | DevTech",
      description:
        "DevTech is a modern coding education platform designed to help beginners learn, build, and grow their skills step by step.",
    });
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* ─────────────────────────────────────────────────────────────────────
          Section 1: Hero Section
      ───────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-block px-3.5 py-1 text-base font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              About Us
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Every Developer Starts{" "}
              <span className="text-emerald-500">Somewhere.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              DevTech is a modern coding education platform designed to help
              beginners learn, build, and grow their skills step by step. With
              simple lessons, hands-on practice, and supportive guidance, we
              turn your curiosity into real progress.
            </p>

            <div className="flex items-center gap-3 text-lg font-semibold text-slate-500 dark:text-slate-400 pt-2">
              <span>Learn</span>
              <span className="text-emerald-500">•</span>
              <span>Build</span>
              <span className="text-emerald-500">•</span>
              <span>Grow</span>
            </div>
          </div>

          {/* Right Hero Graphic: Laptop Illustration */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md">
              {/* Soft background pastel blob */}
              <div className="absolute inset-0 bg-sky-100 dark:bg-sky-950/40 rounded-full blur-2xl transform scale-90 -z-10" />

              {/* Floating Pill Left: </> */}
              <div className="absolute -top-3 left-4 z-20 flex items-center justify-center w-11 h-11 rounded-2xl bg-emerald-500 text-white font-mono font-bold text-lg shadow-lg shadow-emerald-500/30">
                &lt;/&gt;
              </div>

              {/* Floating Pill Right: Better Skills -> Brighter Future */}
              <div className="absolute -top-2 right-4 z-20 px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-base font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5">
                <span>Better Skills</span>
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Brighter Future</span>
              </div>

              {/* Laptop Screen Body */}
              <div className="relative mx-auto mt-6 p-4 rounded-3xl bg-slate-900 border-4 border-slate-800 shadow-2xl">
                {/* Screen bezel & top notch */}
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700 mx-auto mb-3" />

                {/* Code Editor Window */}
                <div className="rounded-2xl bg-slate-950 p-4 font-mono text-base space-y-2 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800/60">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  {/* Code Lines */}
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2 w-28 rounded bg-indigo-400/80" />
                    <div className="h-2 w-44 rounded bg-emerald-400/80 pl-4" />
                    <div className="h-2 w-36 rounded bg-purple-400/80 pl-4" />
                    <div className="h-2 w-20 rounded bg-cyan-400/80" />
                    <div className="h-2 w-40 rounded bg-indigo-400/70" />
                  </div>
                </div>

                {/* Laptop Base Stand */}
                <div className="h-3 w-48 mx-auto -mb-1 mt-3 rounded-b-xl bg-slate-800 shadow-sm" />
              </div>

              {/* Coffee Mug with Leaf Graphic */}
              <div className="absolute -bottom-2 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md text-emerald-500">
                <Sprout className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          Section 2: Our Mission Card
      ───────────────────────────────────────────────────────────────────── */}
      <section>
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="md:col-span-7 flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-2.5">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Our Mission
                </h2>
                <p className="text-lg sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our mission is to make coding accessible, structured, and
                  beginner-friendly for everyone. We believe that anyone can
                  learn to code with the right resources, clear guidance, and
                  consistent practice.
                </p>
              </div>
            </div>

            {/* Right Graphic Box: Mountain Illustration */}
            <div className="md:col-span-5">
              <div className="p-6 rounded-2xl bg-sky-50/80 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700/60 flex items-center gap-5">
                {/* Stylized SVG Mountain with Green Flag */}
                <div className="w-24 h-20 shrink-0 flex items-end justify-center">
                  <svg
                    viewBox="0 0 100 80"
                    className="w-full h-full"
                    fill="none"
                  >
                    {/* Left green peak */}
                    <polygon
                      points="10,80 35,40 55,80"
                      className="fill-emerald-600 dark:fill-emerald-500"
                    />
                    {/* Right blue/purple mountain */}
                    <polygon
                      points="30,80 65,15 100,80"
                      className="fill-indigo-600 dark:fill-indigo-500"
                    />
                    {/* White snow caps */}
                    <polygon
                      points="65,15 54,35 65,30 76,35"
                      className="fill-white"
                    />
                    <polygon
                      points="35,40 28,52 35,48 42,52"
                      className="fill-white"
                    />
                    {/* Flag on top */}
                    <line
                      x1="65"
                      y1="15"
                      x2="65"
                      y2="4"
                      stroke="#059669"
                      strokeWidth="2.5"
                    />
                    <polygon
                      points="65,4 77,9 65,14"
                      className="fill-emerald-500"
                    />
                  </svg>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                    Better Learners
                  </h4>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                    Build a Brighter Future
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          Section 3: Our Learning Principles
      ───────────────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Our Learning Principles
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              We follow a simple set of principles to make your learning journey
              effective, engaging, and rewarding.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 hover:border-emerald-400 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm shadow-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Step-by-Step Learning
              </h3>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Go from basics to advanced with a clear and structured path.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 hover:border-indigo-400 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-600/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Hands-on Practice
              </h3>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Build real projects and apply what you learn right away.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 hover:border-emerald-400 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-sm shadow-teal-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Supportive Guidance
              </h3>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Get help when you need it from your mentor and our community.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 hover:border-indigo-400 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-sm shadow-indigo-500/20">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Lifelong Growth
              </h3>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Keep learning, keep building, and grow your skills for the
                future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          Section 4: Platform Overview
      ───────────────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Platform Overview
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              A snapshot of what DevTech offers (example figures).
            </p>
          </div>
        </div>

        {/* Big Card with 4 Stats + Callout */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center">
            {/* Stat 1 */}
            <div className="text-center sm:text-left space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto sm:mx-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                12+
              </p>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-200">
                Learning Paths
              </h4>
              <p className="text-base text-slate-400 dark:text-slate-500">
                From beginner to advanced
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center sm:text-left space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto sm:mx-0">
                <Play className="w-4 h-4" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                150+
              </p>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-200">
                Lessons
              </h4>
              <p className="text-base text-slate-400 dark:text-slate-500">
                Short, focused &amp; clear
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center sm:text-left space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto sm:mx-0">
                <FileCode2 className="w-4 h-4" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                50+
              </p>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-200">
                Projects
              </h4>
              <p className="text-base text-slate-400 dark:text-slate-500">
                Build real world skills
              </p>
            </div>

            {/* Stat 4 */}
            <div className="text-center sm:text-left space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto sm:mx-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                10K+
              </p>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-200">
                Active Learners
              </h4>
              <p className="text-base text-slate-400 dark:text-slate-500">
                Growing every day
              </p>
            </div>

            {/* Typographic Tagline */}
            <div className="col-span-2 md:col-span-1 text-center md:text-right border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
              <div className="space-y-1">
                <span className="block text-emerald-600 dark:text-emerald-400 font-extrabold italic text-lg sm:text-xl tracking-tight">
                  Real Skills.
                </span>
                <span className="block text-emerald-600 dark:text-emerald-400 font-extrabold italic text-lg sm:text-xl tracking-tight">
                  Projects.
                </span>
                <span className="block text-emerald-600 dark:text-emerald-400 font-extrabold italic text-lg sm:text-xl tracking-tight">
                  Progress.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          Section 5: Key Features
      ───────────────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Key Features
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              Everything you need to learn, build, and succeed.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 hover:border-emerald-400 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm shadow-emerald-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Interactive Roadmaps
              </h3>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Follow structured paths that guide you from beginner to
                advanced.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 hover:border-indigo-400 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-600/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Practical Projects
              </h3>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Build real projects to apply your knowledge and build your
                portfolio.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 hover:border-indigo-400 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-sm shadow-indigo-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Responsive Design
              </h3>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Learn on any device, anytime, anywhere.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 hover:border-indigo-400 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-sm shadow-indigo-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Progress Tracking
              </h3>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                Monitor your progress and stay motivated with clear goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          Section 6: Creator & Mentor
      ───────────────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Creator &amp; Mentor
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              This platform is built with passion and guided by experience.
            </p>
          </div>
        </div>

        {/* Profiles Stack */}
        <div className="space-y-5">
          {/* Profile 1: Srorng SokCheat (Mentor) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Avatar */}
              <div className="md:col-span-3 flex justify-center md:justify-start rounded-md overflow-hidden">
                <img src="/src/asset/mentor/srorng-sokcheat.jpg" alt="Srorng SokCheat" />
              </div>

              {/* Middle Info */}
              <div className="md:col-span-5 space-y-2 text-center md:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  Mentor
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Srorng SokCheat
                </h3>
                <p className="text-base font-semibold text-slate-500 dark:text-slate-400">
                  Senior Software Engineer &amp; Instructor
                </p>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  With 8+ years of experience in web development, I'm passionate
                  about teaching and helping others turn their ideas into real
                  applications. My goal is to make coding simple, practical, and
                  enjoyable for everyone.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 pt-1 text-base text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-emerald-500" /> Instructor
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Cambodia
                  </span>
                </div>
              </div>

              {/* Right Quote Box */}
              <div className="md:col-span-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 relative">
                  <span className="text-emerald-500 font-serif font-black text-2xl leading-none">
                    “
                  </span>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 italic leading-relaxed mt-1">
                    Great developers aren't born, they're built with the right
                    guidance, practice, and support.
                  </p>
                  <p className="text-right text-base font-bold text-slate-500 dark:text-slate-400 mt-2">
                    — Srorng SokCheat
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile 2: Lisa Dev (Creator) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Avatar */}
              <div className="md:col-span-3 flex justify-center md:justify-start rounded-md overflow-hidden">
                <img src="/src/asset/creator/Lisa.JPG" alt="Lisa Dev" />
              </div>

              {/* Middle Info */}
              <div className="md:col-span-5 space-y-2 text-center md:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  Creator
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Mom Lisa
                </h3>
                <p className="text-base font-semibold text-slate-500 dark:text-slate-400">
                  Full Stack Developer &amp; Creator
                </p>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  I'm a full stack developer and the creator of DevTech. I
                  built this platform to make coding simple, practical, and
                  accessible for everyone who wants to learn.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 pt-1 text-base text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-emerald-500" /> Full Stack Developer
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Cambodia
                  </span>
                </div>
              </div>

              {/* Right Quote Box */}
              <div className="md:col-span-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 relative">
                  <span className="text-emerald-500 font-serif font-black text-2xl leading-none">
                    “
                  </span>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 italic leading-relaxed mt-1">
                    I believe in small steps, consistent practice, and a
                    supportive community. Let's grow together!
                  </p>
                  <p className="text-right text-base font-bold text-slate-500 dark:text-slate-400 mt-2">
                    — Lisa Dev
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          Section 7: Call to Action Banner
      ───────────────────────────────────────────────────────────────────── */}
      <section>
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white text-center space-y-6 shadow-xl">
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Start{" "}
              <span className="text-emerald-400">Your Journey?</span>
            </h2>
            <p className="text-lg sm:text-base text-emerald-100/90 leading-relaxed">
              Join DevTech today and take the first step toward your coding
              future.
            </p>
          </div>

          <div>
            <button
              onClick={() => onNavigate("roadmaps")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg shadow-lg shadow-emerald-500/25 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
