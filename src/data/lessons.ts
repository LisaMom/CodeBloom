import { Lesson } from '../types/lesson';

export const lessonsData: Lesson[] = [
  /* ─────────────────────────────────────────────────────────────────────────────
     Section 1: Latest Lessons
  ───────────────────────────────────────────────────────────────────────────── */
  {
    id: 'javascript-lesson',
    slug: 'javascript-lesson',
    courseName: 'JavaScript Fundamentals',
    title: 'JavaScript lesson',
    subtitle: 'JavaScript is the primary language used to make websites interactive.',
    category: 'javascript',
    bannerType: 'javascript',
    sectionGroup: 'latest',
    difficulty: 'Beginner',
    readTimeMinutes: 5,
    viewsCount: 390,
    isFree: true,
    featured: true,
    tags: ['JavaScript', 'Basics', 'DOM', 'Interactivity'],
    relatedRoadmapId: 'web-development',
    relatedQuizId: 'javascript-basics-quiz',
    publishedAt: '2026-03-14',
    keyTakeaways: [
      'JavaScript runs in all modern web browsers to power client-side dynamic interactivity',
      'Prefer `const` for immutable bindings and `let` for reassignable variables',
      'Event listeners connect user actions (clicks, inputs) to reactive JavaScript functions',
      'Modern ES6+ syntax provides cleaner, safer abstractions for asynchronous code'
    ],
    sections: [
      {
        id: 'js-interactivity',
        title: '1. What Makes JavaScript Essential for Modern Web Pages?',
        content: `HTML creates the structure of a web page, and CSS defines how it looks. But JavaScript is what makes it alive — allowing pages to respond instantly to button clicks, fetch live server data without reloading, and build dynamic interactive web applications.`,
        codeSnippets: [
          {
            language: 'javascript',
            filename: 'main.js',
            code: `// Select interactive element and listen to user clicks
const actionBtn = document.querySelector('#enroll-button');
const statusBadge = document.querySelector('#status-pill');

actionBtn.addEventListener('click', () => {
  statusBadge.textContent = 'Enrolled Successfully!';
  statusBadge.classList.add('bg-emerald-500', 'text-white');
  console.log('User joined CodeBloom course!');
});`
          }
        ],
        proTip: 'Always place script tags just before `</body>` or use the `defer` attribute to avoid blocking HTML parsing during page load.'
      },
      {
        id: 'js-variables',
        title: '2. Variables and Functions',
        content: `In modern JavaScript (ES6+), we use block-scoped variables and arrow functions to keep code concise and maintainable.`,
        codeSnippets: [
          {
            language: 'javascript',
            filename: 'utils.js',
            code: `// Arrow function calculation
const calculateDiscount = (price, percentage = 10) => {
  const discountAmount = (price * percentage) / 100;
  return price - discountAmount;
};

const finalPrice = calculateDiscount(100, 20); // 80
console.log(\`Final lesson price: $\${finalPrice}\`);`
          }
        ],
        proTip: 'Always write pure functions that do not mutate external state whenever possible.'
      }
    ],
    practiceQuestion: {
      question: 'Which keyword should you use by default when declaring a variable that will not be reassigned?',
      options: [
        { id: 'p1', text: 'var', isCorrect: false },
        { id: 'p2', text: 'const', isCorrect: true },
        { id: 'p3', text: 'let', isCorrect: false },
        { id: 'p4', text: 'static', isCorrect: false }
      ],
      explanation: 'Use `const` by default for all variables whose identifier will never be reassigned. Use `let` only when you explicitly intend to reassign the variable.'
    }
  },

  {
    id: 'c-programming',
    slug: 'c-programming',
    courseName: 'C Systems Programming',
    title: 'C Programming',
    subtitle: 'Learn about basic syntax, variables declaration, control flow (if/else, loops), and functions in the C language for beginners.',
    category: 'c',
    bannerType: 'c',
    sectionGroup: 'latest',
    difficulty: 'Beginner',
    readTimeMinutes: 7,
    viewsCount: 390,
    isFree: true,
    featured: true,
    tags: ['C', 'Low-Level', 'Pointers', 'Memory'],
    relatedRoadmapId: 'computer-science',
    publishedAt: '2026-03-12',
    keyTakeaways: [
      'C is a statically typed compiled language that gives direct access to computer memory',
      'Every executable C program begins execution in the `main()` function',
      'Variables require explicit data type declarations (int, float, char, double)',
      'Understanding pointers and manual memory allocation builds fundamental systems knowledge'
    ],
    sections: [
      {
        id: 'c-syntax',
        title: '1. Hello World and Basic Program Structure',
        content: `C is known as the foundation of modern computer programming. Major operating systems like Linux, macOS, and Windows are built largely with C and C++.`,
        codeSnippets: [
          {
            language: 'c',
            filename: 'main.c',
            code: `#include <stdio.h>

int main(void) {
    int studentCount = 390;
    float courseRating = 4.95;

    printf("Welcome to C Programming!\\n");
    printf("Total Learners: %d | Rating: %.2f\\n", studentCount, courseRating);

    return 0;
}`
          }
        ],
        proTip: 'Always return `0` from `main()` to signify successful execution to the operating system shell.'
      },
      {
        id: 'c-control-flow',
        title: '2. Control Flow & Functions',
        content: `C uses standard conditional branching (\`if/else\`) and iteration loops (\`for\`, \`while\`) to express logical workflows.`,
        codeSnippets: [
          {
            language: 'c',
            filename: 'math_ops.c',
            code: `// Function prototype
int computeSum(int a, int b) {
    return a + b;
}

int main(void) {
    for (int i = 1; i <= 3; i++) {
        printf("Iteration %d: result = %d\\n", i, computeSum(i, 10));
    }
    return 0;
}`
          }
        ],
        proTip: 'In C, memory declared inside functions lives on the call stack and is automatically reclaimed when the function returns.'
      }
    ],
    practiceQuestion: {
      question: 'What format specifier does `printf` use to print a standard integer in C?',
      options: [
        { id: 'p1', text: '%s', isCorrect: false },
        { id: 'p2', text: '%d', isCorrect: true },
        { id: 'p3', text: '%f', isCorrect: false },
        { id: 'p4', text: '%c', isCorrect: false }
      ],
      explanation: '`%d` (or `%i`) is used to print signed decimal integers in C format strings.'
    }
  },

  {
    id: 'laravel-framework-beginners',
    slug: 'laravel-framework-beginners',
    courseName: 'Laravel Web Mastery',
    title: 'Laravel Framework for Beginners',
    subtitle: 'Study and understand the fundamentals of using the Laravel PHP Framework, starting from installation...',
    category: 'laravel',
    bannerType: 'laravel',
    sectionGroup: 'latest',
    difficulty: 'Beginner',
    readTimeMinutes: 8,
    viewsCount: 390,
    isFree: true,
    featured: true,
    tags: ['Laravel', 'PHP', 'Backend', 'MVC', 'Eloquent'],
    relatedRoadmapId: 'backend-engineer',
    publishedAt: '2026-03-10',
    keyTakeaways: [
      'Laravel is the most popular modern PHP web framework, celebrated for developer elegance',
      'The MVC pattern cleanly separates routes, controllers, models, and views',
      'Artisan CLI automates scaffolding migrations, models, and seeders',
      'Eloquent ORM lets you query databases using expressive object-oriented methods'
    ],
    sections: [
      {
        id: 'laravel-routing',
        title: '1. Routing & Controllers in Laravel',
        content: `Laravel simplifies backend development with expressive routing and powerful dependency injection in controller actions.`,
        codeSnippets: [
          {
            language: 'php',
            filename: 'routes/web.php',
            code: `use App\\Http\\Controllers\\LessonController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/lessons', [LessonController::class, 'index']);
Route::get('/lessons/{id}', [LessonController::class, 'show']);`
          }
        ],
        proTip: 'Use resourceful routes with `Route::resource(\'courses\', CourseController::class)` to scaffold full CRUD routes in a single line.'
      },
      {
        id: 'laravel-eloquent',
        title: '2. Querying Databases with Eloquent ORM',
        content: `Eloquent maps SQL tables directly into PHP classes with relationships and built-in pagination.`,
        codeSnippets: [
          {
            language: 'php',
            filename: 'app/Models/Lesson.php',
            code: `// Fetch published lessons with views count
$featuredLessons = Lesson::where('is_free', true)
    ->orderByDesc('views_count')
    ->limit(6)
    ->get();`
          }
        ],
        proTip: 'Always use eager loading `with(\'author\')` to avoid notorious N+1 database query performance bottlenecks.'
      }
    ],
    practiceQuestion: {
      question: 'What is the command-line interface bundled with Laravel called?',
      options: [
        { id: 'p1', text: 'Composer', isCorrect: false },
        { id: 'p2', text: 'Artisan', isCorrect: true },
        { id: 'p3', text: 'Blade', isCorrect: false },
        { id: 'p4', text: 'Laravel CLI', isCorrect: false }
      ],
      explanation: 'Artisan is Laravel’s built-in command-line tool, used to generate controllers, execute database migrations, and clear cache.'
    }
  },

  /* ─────────────────────────────────────────────────────────────────────────────
     Section 2: Recommended Lessons
  ───────────────────────────────────────────────────────────────────────────── */
  {
    id: 'learning-react-from-scratch',
    slug: 'learning-react-from-scratch',
    courseName: 'React & Component Architecture',
    title: 'Learning React.js from Scratch',
    subtitle: 'Learn the foundational principles of using React.js starting from the very beginning. This course will share insights about...',
    category: 'react',
    bannerType: 'react',
    sectionGroup: 'recommended',
    difficulty: 'Beginner',
    readTimeMinutes: 8,
    viewsCount: 390,
    isFree: true,
    featured: true,
    tags: ['React', 'JavaScript', 'Frontend', 'Components', 'Hooks'],
    relatedRoadmapId: 'frontend-developer',
    relatedQuizId: 'react-hooks-quiz',
    publishedAt: '2026-03-08',
    keyTakeaways: [
      'React is a declarative component-driven library for building reactive user interfaces',
      'JSX allows writing HTML-like markup inside modern JavaScript and TypeScript',
      'Component state (`useState`) triggers smooth, targeted DOM updates via the Virtual DOM',
      'Props pass data downwards from parent components to child components'
    ],
    sections: [
      {
        id: 'react-components',
        title: '1. Building Your First Reactive Component',
        content: `In React, user interfaces are divided into small, reusable components. Each component manages its own state and renders declaratively.`,
        codeSnippets: [
          {
            language: 'tsx',
            filename: 'Counter.tsx',
            code: `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 rounded-xl border bg-white dark:bg-slate-900">
      <p className="font-bold text-lg">Current Count: {count}</p>
      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg"
      >
        Increment +1
      </button>
    </div>
  );
}`
          }
        ],
        proTip: 'Never mutate state directly (`count = count + 1`). Always use the setter function provided by `useState`.'
      }
    ],
    practiceQuestion: {
      question: 'Which hook is used in React to declare reactive local state inside a functional component?',
      options: [
        { id: 'p1', text: 'useEffect', isCorrect: false },
        { id: 'p2', text: 'useState', isCorrect: true },
        { id: 'p3', text: 'useContext', isCorrect: false },
        { id: 'p4', text: 'useRef', isCorrect: false }
      ],
      explanation: '`useState` is the core React hook that preserves state between renders and schedules re-renders when updated.'
    }
  },

  {
    id: 'php-language-advanced',
    slug: 'php-language-advanced',
    courseName: 'Advanced PHP 8.2+',
    title: 'PHP Language Advanced Level',
    subtitle: 'PHP is a popular open-source server-side scripting language that was developed...',
    category: 'php',
    bannerType: 'php',
    sectionGroup: 'recommended',
    difficulty: 'Advanced',
    readTimeMinutes: 9,
    viewsCount: 390,
    isFree: true,
    featured: true,
    tags: ['PHP', 'OOP', 'Type Safety', 'Backend', 'Security'],
    relatedRoadmapId: 'backend-engineer',
    publishedAt: '2026-03-05',
    keyTakeaways: [
      'PHP 8.2+ brings strict static typing, union types, intersection types, and typed properties',
      'Attributes and enums provide first-class metaprogramming and domain modeling',
      'PDO with prepared statements eliminates SQL injection vulnerabilities',
      'JIT compiler in modern PHP delivers high runtime performance for web APIs'
    ],
    sections: [
      {
        id: 'php-enums-types',
        title: '1. Modern Enums and Strict Types in PHP 8',
        content: `Modern PHP is radically different from legacy versions, offering strict type checking and expressive typed enums.`,
        codeSnippets: [
          {
            language: 'php',
            filename: 'LessonStatus.php',
            code: `<?php
declare(strict_types=1);

namespace App\\Enums;

enum LessonStatus: string {
    case Draft = 'draft';
    case Published = 'published';
    case Archived = 'archived';

    public function isAvailable(): bool {
        return $this === self::Published;
    }
}`
          }
        ],
        proTip: 'Always include `declare(strict_types=1);` at the top of every PHP file to catch type mismatches at compile time.'
      }
    ],
    practiceQuestion: {
      question: 'What is the safest way to execute SQL queries with user inputs in PHP?',
      options: [
        { id: 'p1', text: 'String concatenation', isCorrect: false },
        { id: 'p2', text: 'PDO prepared statements with parameter binding', isCorrect: true },
        { id: 'p3', text: 'mysql_query()', isCorrect: false },
        { id: 'p4', text: 'Regular expressions', isCorrect: false }
      ],
      explanation: 'PDO prepared statements separate query structure from user parameters, completely neutralizing SQL injection risks.'
    }
  },

  {
    id: 'cpp-language-beginners',
    slug: 'cpp-language-beginners',
    courseName: 'Modern C++ Foundations',
    title: 'C++ Language for Beginners',
    subtitle: 'C++ is a powerful, high-performance programming language designed to build...',
    category: 'cpp',
    bannerType: 'cpp',
    sectionGroup: 'recommended',
    difficulty: 'Beginner',
    readTimeMinutes: 7,
    viewsCount: 390,
    isFree: true,
    featured: true,
    tags: ['C++', 'High Performance', 'OOP', 'STL'],
    relatedRoadmapId: 'computer-science',
    publishedAt: '2026-03-03',
    keyTakeaways: [
      'C++ blends low-level memory control with high-level object-oriented abstractions',
      'The Standard Template Library (STL) provides rich data structures like vectors, maps, and sets',
      'RAII (Resource Acquisition Is Initialization) automates resource cleanup without a garbage collector',
      'C++ powers game engines, operating systems, financial high-frequency trading, and browsers'
    ],
    sections: [
      {
        id: 'cpp-basics',
        title: '1. Classes and Vectors in Modern C++',
        content: `C++ gives you predictable execution latency and zero-cost abstractions, making it the premier choice for performance-critical systems.`,
        codeSnippets: [
          {
            language: 'cpp',
            filename: 'solution.cpp',
            code: `#include <iostream>
#include <vector>
#include <string>

int main() {
    std::vector<std::string> skills = {"Variables", "OOP", "STL"};
    skills.push_back("Templates");

    std::cout << "Learning C++ Steps:" << std::endl;
    for (const auto& skill : skills) {
        std::cout << " - " << skill << std::endl;
    }
    return 0;
}`
          }
        ],
        proTip: 'Use `const auto&` in range-based for loops to avoid expensive object copying during iteration.'
      }
    ],
    practiceQuestion: {
      question: 'Which C++ STL container represents a dynamic, automatically resizing array stored in contiguous memory?',
      options: [
        { id: 'p1', text: 'std::list', isCorrect: false },
        { id: 'p2', text: 'std::vector', isCorrect: true },
        { id: 'p3', text: 'std::map', isCorrect: false },
        { id: 'p4', text: 'std::set', isCorrect: false }
      ],
      explanation: '`std::vector` is a sequence container that encapsulates dynamic arrays with cache-friendly contiguous memory storage.'
    }
  },

  /* ─────────────────────────────────────────────────────────────────────────────
     Section 3: Popular Lessons
  ───────────────────────────────────────────────────────────────────────────── */
  {
    id: 'java-and-spring-boot',
    slug: 'java-and-spring-boot',
    courseName: 'Java Enterprise Architecture',
    title: 'Java and Spring Boot',
    subtitle: 'Java is an object-oriented programming language that is widely used... across corporate enterprises.',
    category: 'java',
    bannerType: 'java-spring',
    sectionGroup: 'popular',
    difficulty: 'Intermediate',
    readTimeMinutes: 8,
    viewsCount: 390,
    isFree: true,
    featured: true,
    tags: ['Java', 'Spring Boot', 'REST API', 'Backend', 'Enterprise'],
    relatedRoadmapId: 'backend-engineer',
    publishedAt: '2026-03-01',
    keyTakeaways: [
      'Java provides robust object-oriented typing with the high-performance JVM runtime',
      'Spring Boot drastically simplifies configuration with convention-over-configuration',
      'Dependency Injection (`@Autowired`) decouples service layers from controllers',
      'Built-in Spring Data JPA automates database operations with zero boilerplate SQL'
    ],
    sections: [
      {
        id: 'spring-rest-controller',
        title: '1. Building a REST Controller with Spring Boot',
        content: `Spring Boot lets you create production-ready microservices with embedded Tomcat servers in minutes.`,
        codeSnippets: [
          {
            language: 'java',
            filename: 'LessonController.java',
            code: `package com.CodeBloom.api;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    @GetMapping
    public List<String> getAvailableLessons() {
        return List.of("Java & Spring Boot", "HTML Basics", "CSS Design");
    }
}`
          }
        ],
        proTip: 'Use `@RestController` instead of `@Controller` to automatically serialize method return objects into JSON.'
      }
    ],
    practiceQuestion: {
      question: 'Which Spring Boot annotation marks a class as a RESTful web controller that returns serialized JSON responses?',
      options: [
        { id: 'p1', text: '@Service', isCorrect: false },
        { id: 'p2', text: '@RestController', isCorrect: true },
        { id: 'p3', text: '@Component', isCorrect: false },
        { id: 'p4', text: '@Repository', isCorrect: false }
      ],
      explanation: '`@RestController` is a convenience annotation combining `@Controller` and `@ResponseBody`.'
    }
  },

  {
    id: 'introduction-to-html',
    slug: 'introduction-to-html',
    courseName: 'HTML5 Semantic Web',
    title: 'Introduction to HTML',
    subtitle: 'HTML (HyperText Markup Language) is the standard markup language used to create web pages... It provides the structure for web content.',
    category: 'html',
    bannerType: 'html',
    sectionGroup: 'popular',
    difficulty: 'Beginner',
    readTimeMinutes: 5,
    viewsCount: 390,
    isFree: true,
    featured: true,
    tags: ['HTML', 'HTML5', 'Semantic Web', 'Frontend', 'SEO'],
    relatedRoadmapId: 'web-development',
    publishedAt: '2026-02-28',
    keyTakeaways: [
      'HTML defines the essential skeleton, structure, and text content of all web pages',
      'Semantic tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) improve accessibility and SEO',
      'Proper nesting of elements prevents rendering bugs across different browsers',
      'Forms and input attributes (`type="email"`, `required`) handle validation natively'
    ],
    sections: [
      {
        id: 'semantic-html',
        title: '1. Semantic Web Page Structure',
        content: `Always prefer meaningful semantic tags over generic \`<div>\` containers to ensure screen readers and search engines properly parse your page.`,
        codeSnippets: [
          {
            language: 'html',
            filename: 'index.html',
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CodeBloom Learning</title>
</head>
<body>
  <header>
    <h1>CodeBloom Academy</h1>
  </header>
  <main>
    <article>
      <h2>HTML Fundamentals</h2>
      <p>Semantic tags structure web content meaningfully.</p>
    </article>
  </main>
</body>
</html>`
          }
        ],
        proTip: 'Every page should contain exactly one `<h1>` tag representing the main topic for maximum SEO authority.'
      }
    ],
    practiceQuestion: {
      question: 'Which HTML5 element represents the primary, central content area of a document, excluding headers and footers?',
      options: [
        { id: 'p1', text: '<section>', isCorrect: false },
        { id: 'p2', text: '<main>', isCorrect: true },
        { id: 'p3', text: '<article>', isCorrect: false },
        { id: 'p4', text: '<aside>', isCorrect: false }
      ],
      explanation: 'The `<main>` tag specifies the main content of a document and must be unique to the document.'
    }
  },

  {
    id: 'css-designing-web-pages',
    slug: 'css-designing-web-pages',
    courseName: 'CSS & Modern Responsive Layouts',
    title: 'CSS: Designing Web Pages',
    subtitle: 'Learn the core building blocks of CSS starting from scratch, including Selectors, Box Model, Flexbox, CSS...',
    category: 'css',
    bannerType: 'css',
    sectionGroup: 'popular',
    difficulty: 'Beginner',
    readTimeMinutes: 6,
    viewsCount: 390,
    isFree: true,
    featured: true,
    tags: ['CSS', 'Flexbox', 'Box Model', 'Responsive', 'Web Design'],
    relatedRoadmapId: 'web-development',
    publishedAt: '2026-02-25',
    keyTakeaways: [
      'CSS controls layout, typography, colors, animations, and responsive breakpoints',
      'The CSS Box Model consists of content, padding, border, and margin',
      '`box-sizing: border-box` makes width and height calculations intuitive and reliable',
      'Flexbox and Grid provide modern, fluid alignment without float hacks'
    ],
    sections: [
      {
        id: 'box-model-flex',
        title: '1. Mastering the Box Model & Flexbox Alignment',
        content: `Flexbox is built for one-dimensional layouts where items dynamically align and distribute space along a primary axis.`,
        codeSnippets: [
          {
            language: 'css',
            filename: 'styles.css',
            code: `/* Reset to intuitive border-box model */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Responsive flex card container */
.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
}`
          }
        ],
        proTip: 'Use `gap` instead of margin hacks to create consistent spacing between Flexbox items.'
      }
    ],
    practiceQuestion: {
      question: 'Which CSS property ensures that padding and borders are included inside the total specified width and height?',
      options: [
        { id: 'p1', text: 'display: block', isCorrect: false },
        { id: 'p2', text: 'box-sizing: border-box', isCorrect: true },
        { id: 'p3', text: 'overflow: hidden', isCorrect: false },
        { id: 'p4', text: 'margin: 0 auto', isCorrect: false }
      ],
      explanation: '`box-sizing: border-box` includes padding and border within the element’s total width and height.'
    }
  },

  /* ─────────────────────────────────────────────────────────────────────────────
     Backward-Compatible Lessons
  ───────────────────────────────────────────────────────────────────────────── */
  {
    id: 'javascript-variables-data-types',
    slug: 'variables-data-types',
    courseName: 'JavaScript Fundamentals',
    title: 'Variables and Data Types',
    subtitle: 'Master variable declarations (let, const), primitive types, and dynamic typing in modern JavaScript.',
    category: 'javascript',
    bannerType: 'javascript',
    difficulty: 'Beginner',
    readTimeMinutes: 5,
    viewsCount: 390,
    isFree: true,
    featured: false,
    tags: ['JavaScript', 'Basics', 'Variables', 'Data Types'],
    relatedRoadmapId: 'web-development',
    relatedQuizId: 'javascript-basics-quiz',
    publishedAt: '2026-03-14',
    keyTakeaways: [
      'Prefer `const` by default for values that never get reassigned',
      'Use `let` only when you expect a variable to change over its lifecycle',
      'JavaScript primitives: string, number, boolean, null, undefined, symbol, bigint'
    ],
    sections: [
      {
        id: 'var-declarations',
        title: '1. Declaring Variables: let vs const',
        content: `In modern JavaScript (ES6+), we use block-scoped let and const.`,
        codeSnippets: [
          {
            language: 'javascript',
            filename: 'variables.js',
            code: `const platform = "CodeBloom";\nlet streak = 5;\nconsole.log(platform, streak);`
          }
        ]
      }
    ]
  },
  {
    id: 'mastering-react-custom-hooks',
    slug: 'mastering-react-custom-hooks',
    courseName: 'React & Component Architecture',
    title: 'Mastering Custom React Hooks for Scalable State',
    subtitle: 'Extract repetitive business logic into reusable, testable, and declarative custom hooks.',
    category: 'react',
    bannerType: 'react',
    difficulty: 'Intermediate',
    readTimeMinutes: 8,
    viewsCount: 420,
    isFree: true,
    featured: false,
    tags: ['React', 'TypeScript', 'Clean Code', 'Hooks'],
    relatedRoadmapId: 'frontend-developer',
    relatedQuizId: 'react-hooks-quiz',
    publishedAt: '2026-03-08',
    keyTakeaways: [
      'Custom hooks must start with "use" to enable React linter rules',
      'Encapsulate state transitions to keep UI components purely declarative'
    ],
    sections: [
      {
        id: 'why-custom-hooks',
        title: '1. Why and When to Extract Custom Hooks',
        content: `Custom hooks separate business logic from rendering components.`,
        codeSnippets: [
          {
            language: 'tsx',
            filename: 'useCounter.ts',
            code: `import { useState } from 'react';\nexport function useCounter() {\n  const [count, setCount] = useState(0);\n  return { count, inc: () => setCount(c => c + 1) };\n}`
          }
        ]
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
    bannerType: 'react',
    difficulty: 'Intermediate',
    readTimeMinutes: 10,
    viewsCount: 390,
    isFree: true,
    featured: false,
    tags: ['TypeScript', 'Type Safety', 'Advanced'],
    relatedRoadmapId: 'frontend-developer',
    relatedQuizId: 'typescript-quiz',
    publishedAt: '2026-03-02',
    keyTakeaways: [
      'Generics act as type parameters for functions, interfaces, and classes',
      'Generic constraints (`extends`) prevent invalid types from being passed'
    ],
    sections: [
      {
        id: 'generic-constraints',
        title: '1. Constraining Type Parameters with `extends`',
        content: `Constraining generics ensures safety when operating on properties.`,
        codeSnippets: [
          {
            language: 'typescript',
            filename: 'generics.ts',
            code: `interface Item { id: string; }\nfunction getById<T extends Item>(items: T[], id: string) {\n  return items.find(i => i.id === id);\n}`
          }
        ]
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
    bannerType: 'css',
    difficulty: 'Beginner',
    readTimeMinutes: 6,
    viewsCount: 390,
    isFree: true,
    featured: false,
    tags: ['CSS', 'Responsive Design', 'Grid', 'UI'],
    relatedRoadmapId: 'web-development',
    publishedAt: '2026-02-25',
    keyTakeaways: [
      'CSS Grid is designed for two-dimensional layouts',
      'auto-fit with minmax() eliminates 90% of screen width media queries'
    ],
    sections: [
      {
        id: 'grid-pattern',
        title: 'Intrinsic Responsive Grid',
        content: `Create auto-fitting responsive grids without explicit breakpoints.`,
        codeSnippets: [
          {
            language: 'css',
            filename: 'grid.css',
            code: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}`
          }
        ]
      }
    ]
  }
];
