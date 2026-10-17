export interface CourseTrack {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: string;
  level: string;
  totalModules: number;
  totalHours: number;
  rating: number;
  studentsEnrolled: number;
  roadmapId: string;
  featuredLessonIds: string[];
  bannerGradient: string;
}

export const coursesData: CourseTrack[] = [
  {
    id: 'course-modern-frontend',
    title: 'Modern Frontend Engineering Specialization',
    slug: 'modern-frontend',
    tagline: 'From semantic design systems to production Next.js and high-performance Web Vitals.',
    category: 'Frontend',
    level: 'Beginner to Advanced',
    totalModules: 12,
    totalHours: 48,
    rating: 4.9,
    studentsEnrolled: 18450,
    roadmapId: 'frontend-developer',
    featuredLessonIds: ['mastering-react-custom-hooks', 'modern-css-grid-layouts'],
    bannerGradient: 'from-blue-600 via-indigo-600 to-violet-600',
  },
  {
    id: 'course-fullstack-ts',
    title: 'Fullstack TypeScript & Cloud Architecture',
    slug: 'fullstack-typescript',
    tagline: 'End-to-end type safety from React UI down to PostgreSQL schemas, Redis caches, and Docker.',
    category: 'Fullstack',
    level: 'Intermediate',
    totalModules: 10,
    totalHours: 42,
    rating: 4.95,
    studentsEnrolled: 14200,
    roadmapId: 'backend-engineer',
    featuredLessonIds: ['typescript-generics-in-practice', 'rest-vs-graphql-system-design'],
    bannerGradient: 'from-emerald-600 via-teal-600 to-cyan-600',
  },
  {
    id: 'course-ai-systems',
    title: 'Production AI & LLM Systems',
    slug: 'production-ai-systems',
    tagline: 'Build real-world RAG applications, vector search indexes, and multi-agent workflows.',
    category: 'AI Engineering',
    level: 'Intermediate to Advanced',
    totalModules: 8,
    totalHours: 36,
    rating: 4.88,
    studentsEnrolled: 9800,
    roadmapId: 'ai-engineer',
    featuredLessonIds: ['typescript-generics-in-practice'],
    bannerGradient: 'from-pink-600 via-purple-600 to-indigo-600',
  }
];

export interface PopularCourse {
  id: string;
  title: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  iconType: 'javascript' | 'html-css' | 'react' | 'python' | 'git' | 'database';
  targetLessonId?: string;
  targetRoadmapId?: string;
}

export const popularCoursesData: PopularCourse[] = [
  {
    id: 'javascript-basics-course',
    title: 'JavaScript Basics',
    duration: '25 min',
    level: 'Beginner',
    description: 'Learn the fundamentals of JavaScript and start building interactive websites.',
    iconType: 'javascript',
    targetLessonId: 'javascript-variables-data-types',
    targetRoadmapId: 'web-development',
  },
  {
    id: 'html-css-course',
    title: 'HTML & CSS',
    duration: '30 min',
    level: 'Beginner',
    description: 'Build beautiful and responsive web pages with HTML and CSS.',
    iconType: 'html-css',
    targetLessonId: 'modern-css-grid-layouts',
    targetRoadmapId: 'web-development',
  },
  {
    id: 'react-fundamentals-course',
    title: 'React Fundamentals',
    duration: '45 min',
    level: 'Intermediate',
    description: 'Learn React components, state management, and hooks.',
    iconType: 'react',
    targetLessonId: 'mastering-react-custom-hooks',
    targetRoadmapId: 'frontend-developer',
  },
  {
    id: 'python-for-beginners-course',
    title: 'Python for Beginners',
    duration: '40 min',
    level: 'Beginner',
    description: 'Understand Python syntax and solve real-world problems.',
    iconType: 'python',
    targetRoadmapId: 'python-programming',
  },
  {
    id: 'git-github-course',
    title: 'Git & GitHub',
    duration: '35 min',
    level: 'Intermediate',
    description: 'Version control your code and collaborate like a pro.',
    iconType: 'git',
    targetLessonId: 'typescript-generics-in-practice',
    targetRoadmapId: 'web-development',
  },
  {
    id: 'database-basics-course',
    title: 'Database Basics',
    duration: '30 min',
    level: 'Intermediate',
    description: 'Work with databases and manage your data.',
    iconType: 'database',
    targetRoadmapId: 'backend-engineer',
  },
];

export interface FeaturedRoadmapPath {
  id: string;
  roadmapId: string;
  title: string;
  level: 'Beginner' | 'Intermediate';
  lessonsCount: string;
  progressPercent: number;
  progressColor: 'emerald' | 'indigo';
  iconType: 'globe' | 'java' | 'python' | 'react';
}

export const featuredRoadmapPaths: FeaturedRoadmapPath[] = [
  {
    id: 'web-dev-path',
    roadmapId: 'web-development',
    title: 'Web Development',
    level: 'Beginner',
    lessonsCount: '12 lessons',
    progressPercent: 75,
    progressColor: 'emerald',
    iconType: 'globe',
  },
  {
    id: 'java-path',
    roadmapId: 'java-programming',
    title: 'Java Programming',
    level: 'Intermediate',
    lessonsCount: '15 lessons',
    progressPercent: 45,
    progressColor: 'indigo',
    iconType: 'java',
  },
  {
    id: 'python-path',
    roadmapId: 'python-programming',
    title: 'Python',
    level: 'Beginner',
    lessonsCount: '10 lessons',
    progressPercent: 20,
    progressColor: 'emerald',
    iconType: 'python',
  },
  {
    id: 'frontend-path',
    roadmapId: 'frontend-developer',
    title: 'Frontend Development',
    level: 'Intermediate',
    lessonsCount: '14 lessons',
    progressPercent: 60,
    progressColor: 'indigo',
    iconType: 'react',
  },
];

