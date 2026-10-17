import { Lesson } from '../types/lesson';

export const lessonsData: Lesson[] = [
  {
    id: 'javascript-variables-data-types',
    slug: 'variables-data-types',
    courseName: 'JavaScript Fundamentals',
    title: 'Variables and Data Types',
    subtitle: 'Master variable declarations (let, const), primitive types, and dynamic typing in modern JavaScript.',
    category: 'javascript',
    difficulty: 'Beginner',
    readTimeMinutes: 5,
    featured: true,
    tags: ['JavaScript', 'Basics', 'Variables', 'Data Types'],
    relatedRoadmapId: 'web-development',
    relatedQuizId: 'javascript-basics-quiz',
    publishedAt: '2026-03-14',
    keyTakeaways: [
      'Prefer `const` by default for values that never get reassigned',
      'Use `let` only when you expect a variable to change over its lifecycle',
      'JavaScript primitives: string, number, boolean, null, undefined, symbol, bigint',
      '`typeof` helps inspect data types at runtime'
    ],
    sections: [
      {
        id: 'var-declarations',
        title: '1. Declaring Variables: let vs const',
        content: `In modern JavaScript (ES6+), we avoid the legacy \`var\` keyword because of unpredictable function scoping and hoisting bugs. Instead, we use block-scoped \`let\` and \`const\`.

Use \`const\` by default. If a variable must be reassigned later, use \`let\`.`,
        codeSnippets: [
          {
            language: 'javascript',
            filename: 'variables.js',
            code: `// Immutable binding with const
const platformName = "DevTech";
const foundingYear = 2026;

// Reassignable binding with let
let currentStreak = 5;
currentStreak = currentStreak + 1; // Valid!

console.log(\`Welcome to \${platformName}! Current streak: \${currentStreak}\`);`
          }
        ],
        proTip: '`const` prevents reassigning the variable name, but objects and arrays declared with `const` can still have their internal properties mutated.'
      },
      {
        id: 'primitives-overview',
        title: '2. The Core Primitive Data Types',
        content: `JavaScript features 7 primitive data types. The most common ones you will use every day are Strings, Numbers, and Booleans.`,
        codeSnippets: [
          {
            language: 'javascript',
            filename: 'dataTypes.js',
            code: `// String (text wrapped in quotes or backticks)
const greeting = "Hello, Developer";

// Number (both integers and floating-point decimals)
const score = 98.5;

// Boolean (true or false flags)
const isCompleted = true;

// Checking types at runtime with typeof:
console.log(typeof greeting);    // "string"
console.log(typeof score);       // "number"
console.log(typeof isCompleted); // "boolean"`
          }
        ],
        proTip: 'Be aware that `typeof null` returns `"object"` in JavaScript due to a historical legacy artifact from the language\'s first version in 1995.'
      }
    ],
    practiceQuestion: {
      question: 'What is the type of the value true?',
      options: [
        { id: 'p1', text: '"string"', isCorrect: false },
        { id: 'p2', text: '"boolean"', isCorrect: true },
        { id: 'p3', text: '"number"', isCorrect: false },
        { id: 'p4', text: '"truthy"', isCorrect: false }
      ],
      explanation: 'In JavaScript, the boolean primitive data type has only two literal values: true and false.'
    }
  },
  {
    id: 'mastering-react-custom-hooks',
    slug: 'mastering-react-custom-hooks',
    courseName: 'React & Component Architecture',
    title: 'Mastering Custom React Hooks for Scalable State',
    subtitle: 'Extract repetitive business logic into reusable, testable, and declarative custom hooks.',
    category: 'react',
    difficulty: 'Intermediate',
    readTimeMinutes: 8,
    featured: true,
    tags: ['React', 'TypeScript', 'Clean Code', 'Hooks'],
    relatedRoadmapId: 'frontend-developer',
    relatedQuizId: 'react-hooks-quiz',
    publishedAt: '2026-03-08',
    keyTakeaways: [
      'Custom hooks must start with "use" to enable React linter rules',
      'Encapsulate state transitions to keep UI components purely declarative',
      'Always return stable callbacks using useCallback or clean object APIs',
      'Avoid over-abstracting before identical logic is duplicated at least twice'
    ],
    sections: [
      {
        id: 'why-custom-hooks',
        title: '1. Why and When to Extract Custom Hooks',
        content: `In React applications, component files frequently become bloated when they combine rendering markup with side-effects, window listeners, data fetching, and timers. 

Custom hooks solve this by moving the imperative "how" outside the component, allowing the component to focus purely on the visual "what".`,
        codeSnippets: [
          {
            language: 'tsx',
            filename: 'useDebounce.ts',
            code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}`
          }
        ],
        proTip: 'Always write TypeScript generics `<T>` for hooks dealing with dynamic values so caller components receive full type inference.'
      }
    ]
  },
  {
    id: 'typescript-generics-in-practice',
    slug: 'typescript-generics-in-practice',
    courseName: 'TypeScript Mastery',
    title: 'TypeScript Generics in Practice: Beyond <T>',
    subtitle: 'Learn constraints, conditional types, and keyof operators to build robust APIs.',
    category: 'typescript',
    difficulty: 'Intermediate',
    readTimeMinutes: 10,
    featured: true,
    tags: ['TypeScript', 'Type Safety', 'Advanced'],
    relatedRoadmapId: 'frontend-developer',
    relatedQuizId: 'typescript-quiz',
    publishedAt: '2026-03-02',
    keyTakeaways: [
      'Generics act as type parameters for functions, interfaces, and classes',
      'Generic constraints (`extends`) prevent invalid types from being passed',
      'Use `keyof` to safely index object properties with compile-time checks'
    ],
    sections: [
      {
        id: 'generic-constraints',
        title: '1. Constraining Type Parameters with `extends`',
        content: `Unconstrained generics allow ANY type to be provided. But frequently, your function requires the input type to guarantee certain properties.`,
        codeSnippets: [
          {
            language: 'typescript',
            filename: 'entityUtils.ts',
            code: `interface Identifiable {
  id: string | number;
}

export function indexById<T extends Identifiable>(items: T[]): Record<string, T> {
  return items.reduce((acc, item) => {
    acc[String(item.id)] = item;
    return acc;
  }, {} as Record<string, T>);
}`
          }
        ],
        proTip: 'Never use `any` when you can use a generic type constrained with `extends object`.'
      }
    ]
  },
  {
    id: 'modern-css-grid-layouts',
    slug: 'modern-css-grid-layouts',
    courseName: 'Modern CSS & Tailwind',
    title: 'Architecting Responsive UI with Modern CSS Grid',
    subtitle: 'Harness minmax(), auto-fit, and grid-template-areas for modern layouts without media queries.',
    category: 'css',
    difficulty: 'Beginner',
    readTimeMinutes: 6,
    featured: true,
    tags: ['CSS', 'Responsive Design', 'Grid', 'UI'],
    relatedRoadmapId: 'web-development',
    publishedAt: '2026-02-25',
    keyTakeaways: [
      'CSS Grid is designed for two-dimensional layouts (rows AND columns)',
      'auto-fit with minmax() eliminates 90% of screen width media queries',
      'grid-template-areas provides a visual ASCII map of your layout in CSS'
    ],
    sections: [
      {
        id: 'the-holy-grail-grid',
        title: 'The Intrinsic Responsive Grid Pattern',
        content: `You can create a fully responsive card grid that adapts dynamically from 1 column on mobile to 4+ columns on ultra-wide screens using minimal CSS.`,
        codeSnippets: [
          {
            language: 'css',
            filename: 'grid.css',
            code: `.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}`
          }
        ],
        proTip: 'Use `auto-fill` when you want empty columns preserved on the right, and `auto-fit` when you want existing items to stretch across available space.'
      }
    ]
  }
];
