import { Roadmap } from '../types/roadmap';

export const roadmapsData: Roadmap[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    subtitle: 'From structuring basic HTML pages to deploying full-stack responsive web applications.',
    description: 'Learn modern web foundations step-by-step. Master semantic markup, responsive CSS with Tailwind, interactive JavaScript logic, component-driven React & TypeScript, and assemble a complete portfolio capstone project.',
    category: 'web',
    difficulty: 'Beginner',
    estimatedWeeks: 10,
    totalSteps: 5,
    iconName: 'Globe',
    accentColor: '#059669', // Emerald 600
    featured: true,
    prerequisites: ['Basic computer literacy', 'Curiosity to build websites'],
    learningOutcomes: [
      'Structure accessible, semantic web pages with HTML5',
      'Design clean, mobile-first responsive layouts with Tailwind CSS',
      'Add dynamic DOM manipulation and asynchronous API fetching with JavaScript',
      'Build reusable, component-driven web interfaces with React and TypeScript',
      'Ship and deploy a full-featured capstone web project'
    ],
    updatedAt: '2026-03-12',
    milestones: [
      {
        id: 'web-m1',
        title: 'Core Web Development Track',
        description: 'The five sequential steps from beginner markup to finished web project',
        order: 1,
        steps: [
          {
            id: 'web-step-1',
            title: 'HTML Fundamentals',
            description: 'Structure a webpage with semantic HTML5 tags, accessibility standards, document outlines, and forms.',
            category: 'HTML',
            estimatedHours: 8,
            order: 1,
            status: 'completed',
            completed: true,
            keyTopics: ['Semantic tags (<header>, <main>, <footer>)', 'Accessible forms & inputs', 'Meta tags and SEO headers'],
            resources: [
              { id: 'wr1', title: 'MDN Web Docs: HTML Basics', url: 'https://developer.mozilla.org', type: 'documentation' }
            ]
          },
          {
            id: 'web-step-2',
            title: 'CSS & Tailwind CSS',
            description: 'Style responsive layouts using Flexbox, CSS Grid, utility-first classes, and modern color themes.',
            category: 'CSS',
            estimatedHours: 12,
            order: 2,
            status: 'completed',
            completed: true,
            keyTopics: ['Flexbox alignment', 'CSS Grid systems', 'Tailwind CSS v4 utility classes', 'Responsive breakpoints'],
            resources: [
              { id: 'wr2', title: 'Tailwind CSS Documentation', url: 'https://tailwindcss.com', type: 'documentation' }
            ],
            relatedLessonId: 'modern-css-grid-layouts'
          },
          {
            id: 'web-step-3',
            title: 'JavaScript',
            description: 'Add interactive behavior to web pages with variables, functions, events, array pipelines, and fetch APIs.',
            category: 'JavaScript',
            estimatedHours: 18,
            order: 3,
            status: 'in-progress',
            completed: false,
            keyTopics: ['Variables (let/const) & Data Types', 'DOM events & listeners', 'Fetch API & JSON handling', 'ES6 arrow functions'],
            resources: [
              { id: 'wr3', title: 'JavaScript.info Modern Guide', url: 'https://javascript.info', type: 'documentation' }
            ],
            relatedLessonId: 'javascript-variables-data-types'
          },
          {
            id: 'web-step-4',
            title: 'React & TypeScript',
            description: 'Build reusable, type-safe components, manage state with hooks, and architect modern web applications.',
            category: 'React',
            estimatedHours: 24,
            order: 4,
            status: 'next',
            completed: false,
            keyTopics: ['JSX & Component Props', 'useState & useEffect hooks', 'TypeScript interface typing', 'Custom hooks'],
            resources: [
              { id: 'wr4', title: 'React Official Docs', url: 'https://react.dev', type: 'documentation' }
            ],
            relatedLessonId: 'mastering-react-custom-hooks'
          },
          {
            id: 'web-step-5',
            title: 'Final Project',
            description: 'Create a complete, responsive, and deployed web application demonstrating all core skills.',
            category: 'Capstone',
            estimatedHours: 20,
            order: 5,
            status: 'locked',
            completed: false,
            keyTopics: ['Project scoping & wireframing', 'Component hierarchy architecture', 'Git version control', 'Vercel / Netlify deployment'],
            resources: [
              { id: 'wr5', title: 'Project Planning Guide', url: 'https://DevTech.dev', type: 'article' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'frontend-developer',
    slug: 'frontend-developer',
    title: 'Frontend Development',
    subtitle: 'From responsive UI components to modern React, TypeScript, and web performance optimization.',
    description: 'Master the visual and interactive layers of the modern web. Learn component-driven design systems, resilient CSS, React architecture, state management, and web vitals.',
    category: 'frontend',
    difficulty: 'Intermediate',
    estimatedWeeks: 12,
    totalSteps: 6,
    iconName: 'Layout',
    accentColor: '#4f46e5', // Indigo 600
    featured: true,
    prerequisites: ['HTML/CSS basics', 'Basic JavaScript knowledge'],
    learningOutcomes: [
      'Architect maintainable React applications with TypeScript',
      'Optimize web vitals (LCP, INP, CLS) for production speed',
      'Integrate RESTful and GraphQL APIs seamlessly'
    ],
    updatedAt: '2026-03-01',
    milestones: [
      {
        id: 'fe-m1',
        title: 'Modern Frontend Architecture',
        description: 'Scalable UI engineering and performance',
        order: 1,
        steps: [
          {
            id: 'fe-step-1',
            title: 'TypeScript Essentials for Frontend',
            description: 'Add static type safety, interfaces, union types, and generics to your JavaScript workflows.',
            category: 'TypeScript',
            estimatedHours: 16,
            order: 1,
            status: 'completed',
            completed: true,
            keyTopics: ['Type aliases & interfaces', 'Generics & utility types', 'Typing React props & events'],
            resources: [
              { id: 'fr1', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org', type: 'documentation' }
            ],
            relatedLessonId: 'typescript-generics-in-practice'
          },
          {
            id: 'fe-step-2',
            title: 'React Custom Hooks & State Flow',
            description: 'Master custom hooks, performance memoization with useCallback and useMemo, and clean component APIs.',
            category: 'React',
            estimatedHours: 18,
            order: 2,
            status: 'in-progress',
            completed: false,
            keyTopics: ['Custom hook encapsulation', 'State machines pattern', 'Ref optimization'],
            resources: [
              { id: 'fr2', title: 'React Hooks Deep Dive', url: 'https://react.dev', type: 'documentation' }
            ],
            relatedLessonId: 'mastering-react-custom-hooks'
          },
          {
            id: 'fe-step-3',
            title: 'Production Next.js & Server Components',
            description: 'Leverage the App Router, Server Components, Streaming, and Static Site Generation.',
            category: 'Next.js',
            estimatedHours: 20,
            order: 3,
            status: 'next',
            completed: false,
            keyTopics: ['App router layout architecture', 'Server Actions', 'Streaming with Suspense'],
            resources: [
              { id: 'fr3', title: 'Next.js Guide', url: 'https://nextjs.org', type: 'documentation' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'python-programming',
    slug: 'python-programming',
    title: 'Python Programming',
    subtitle: 'From syntax fundamentals to object-oriented programming, data structures, and backend APIs.',
    description: 'Learn one of the most versatile programming languages in the world. Master Python control flow, list comprehensions, OOP principles, file handling, and modern backend development with FastAPI.',
    category: 'programming',
    difficulty: 'Beginner',
    estimatedWeeks: 10,
    totalSteps: 5,
    iconName: 'Code',
    accentColor: '#10b981', // Emerald 500
    featured: true,
    prerequisites: ['Basic computer familiarity', 'Eagerness to solve logic problems'],
    learningOutcomes: [
      'Write clean, idiomatic Python code adhering to PEP 8 standards',
      'Understand classes, inheritance, and object-oriented architecture',
      'Process structured datasets with dictionaries and comprehensions',
      'Build lightweight RESTful APIs using FastAPI and Pydantic'
    ],
    updatedAt: '2026-03-08',
    milestones: [
      {
        id: 'py-m1',
        title: 'Python Foundations & APIs',
        description: 'Core syntax, data structures, and server programming',
        order: 1,
        steps: [
          {
            id: 'py-step-1',
            title: 'Python Syntax & Data Structures',
            description: 'Variables, loops, functions, lists, dictionaries, tuples, and sets.',
            category: 'Python',
            estimatedHours: 12,
            order: 1,
            status: 'completed',
            completed: true,
            keyTopics: ['Primitive types & casting', 'List and dictionary comprehensions', 'Function args and kwargs'],
            resources: [
              { id: 'pr1', title: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'documentation' }
            ]
          },
          {
            id: 'py-step-2',
            title: 'Object-Oriented Programming in Python',
            description: 'Classes, dunder methods (__init__, __str__), inheritance, encapsulation, and polymorphism.',
            category: 'OOP',
            estimatedHours: 14,
            order: 2,
            status: 'in-progress',
            completed: false,
            keyTopics: ['Class definitions & instances', 'Super() and inheritance', 'Property decorators'],
            resources: [
              { id: 'pr2', title: 'Real Python: OOP Guide', url: 'https://realpython.com', type: 'article' }
            ]
          },
          {
            id: 'py-step-3',
            title: 'FastAPI Backend Microservices',
            description: 'Build fast asynchronous REST APIs with automatic OpenAPI Swagger documentation.',
            category: 'Backend',
            estimatedHours: 16,
            order: 3,
            status: 'locked',
            completed: false,
            keyTopics: ['Route endpoints & HTTP methods', 'Pydantic request validation', 'Dependency injection'],
            resources: [
              { id: 'pr3', title: 'FastAPI Docs', url: 'https://fastapi.tiangolo.com', type: 'documentation' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'java-programming',
    slug: 'java-programming',
    title: 'Java Programming',
    subtitle: 'Enterprise-grade object-oriented programming, design patterns, and Spring Boot services.',
    description: 'Learn the powerhouse language behind major enterprise systems. Master strongly-typed Java syntax, JVM internals, collections framework, multi-threading, and Spring Boot REST microservices.',
    category: 'programming',
    difficulty: 'Intermediate',
    estimatedWeeks: 12,
    totalSteps: 5,
    iconName: 'Coffee',
    accentColor: '#eab308', // Amber 500
    featured: true,
    prerequisites: ['Basic understanding of programming logic'],
    learningOutcomes: [
      'Understand JVM memory management and object lifecycle',
      'Implement robust design patterns (Factory, Singleton, Repository)',
      'Manage complex collections with Java Streams and Lambdas',
      'Build and secure REST APIs using Spring Boot and Hibernate ORM'
    ],
    updatedAt: '2026-03-05',
    milestones: [
      {
        id: 'java-m1',
        title: 'Core Java to Spring Boot',
        description: 'Strong typing, collections, and enterprise APIs',
        order: 1,
        steps: [
          {
            id: 'java-step-1',
            title: 'Java Syntax & OOP Principles',
            description: 'Variables, primitive vs reference types, classes, interfaces, and exception handling.',
            category: 'Java Core',
            estimatedHours: 16,
            order: 1,
            status: 'completed',
            completed: true,
            keyTopics: ['Encapsulation & Interfaces', 'Checked vs Unchecked Exceptions', 'Garbage collection basics'],
            resources: [
              { id: 'jr1', title: 'Oracle Java Documentation', url: 'https://docs.oracle.com/en/java/', type: 'documentation' }
            ]
          },
          {
            id: 'java-step-2',
            title: 'Java Collections & Streams API',
            description: 'List, Set, Map collections, lambdas, stream filtering, and functional interfaces.',
            category: 'Collections',
            estimatedHours: 14,
            order: 2,
            status: 'in-progress',
            completed: false,
            keyTopics: ['ArrayList vs LinkedList', 'HashMap collision resolution', 'Stream map(), filter(), reduce()'],
            resources: [
              { id: 'jr2', title: 'Baeldung: Java Streams Guide', url: 'https://www.baeldung.com', type: 'article' }
            ]
          },
          {
            id: 'java-step-3',
            title: 'Spring Boot REST Microservices',
            description: 'Create production-ready microservices with Spring Data JPA and dependency injection.',
            category: 'Spring Boot',
            estimatedHours: 20,
            order: 3,
            status: 'locked',
            completed: false,
            keyTopics: ['@RestController and @Service', 'Spring Data JPA with PostgreSQL', 'DTOs and Bean Validation'],
            resources: [
              { id: 'jr3', title: 'Spring Boot Guides', url: 'https://spring.io/guides', type: 'documentation' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'backend-engineer',
    slug: 'backend-engineer',
    title: 'Backend Engineering',
    subtitle: 'Build robust, scalable APIs, microservices, databases, and secure distributed backends.',
    description: 'Learn system design, relational & NoSQL databases, RESTful and GraphQL architectures, caching layers, message queues, and bulletproof authentication.',
    category: 'backend',
    difficulty: 'Intermediate',
    estimatedWeeks: 14,
    totalSteps: 6,
    iconName: 'Server',
    accentColor: '#059669', // Emerald 600
    featured: false,
    prerequisites: ['Basic JavaScript or Python knowledge', 'Basic command line familiarity'],
    learningOutcomes: [
      'Design RESTful and event-driven API architectures',
      'Model relational databases with PostgreSQL and indexes',
      'Implement JWT, OAuth2, and RBAC authentication systems'
    ],
    updatedAt: '2026-03-05',
    milestones: [
      {
        id: 'be-m1',
        title: 'Runtime & Database Systems',
        description: 'Server-side programming and network protocols',
        order: 1,
        steps: [
          {
            id: 'be-step-1',
            title: 'Node.js Internals & REST API Design',
            description: 'Event loop, libuv, non-blocking I/O, middleware pipelines, and error handling.',
            category: 'Runtime',
            estimatedHours: 16,
            order: 1,
            status: 'completed',
            completed: true,
            keyTopics: ['Event loop phases', 'Express/Fastify routing', 'HTTP status code conventions'],
            resources: [
              { id: 'br1', title: 'Node.js Architecture Overview', url: 'https://nodejs.org', type: 'documentation' }
            ]
          },
          {
            id: 'be-step-2',
            title: 'PostgreSQL Relational Design & Indexing',
            description: 'Schema normalization, foreign keys, ACID transactions, and B-Tree indexing.',
            category: 'Databases',
            estimatedHours: 18,
            order: 2,
            status: 'in-progress',
            completed: false,
            keyTopics: ['ACID guarantees', 'Indexes & EXPLAIN queries', 'Prisma / Drizzle ORM migrations'],
            resources: [
              { id: 'br2', title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com', type: 'documentation' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ai-engineer',
    slug: 'ai-engineer',
    title: 'AI & LLM Application Engineer',
    subtitle: 'Build production software powered by Large Language Models, embeddings, and vector databases.',
    description: 'Transition from basic prompt engineering to production AI software. Learn retrieval-augmented generation (RAG), vector similarity search, agentic workflows, evaluation, and structured outputs.',
    category: 'ai',
    difficulty: 'Intermediate',
    estimatedWeeks: 8,
    totalSteps: 5,
    iconName: 'Cpu',
    accentColor: '#6366f1', // Indigo 500
    featured: false,
    prerequisites: ['JavaScript/TypeScript or Python proficiency', 'Basic API integration experience'],
    learningOutcomes: [
      'Design reliable RAG pipelines with semantic search and re-ranking',
      'Extract type-safe structured data using function calling and JSON schemas',
      'Implement multi-step agentic systems with tools and memory'
    ],
    updatedAt: '2026-03-10',
    milestones: [
      {
        id: 'ai-m1',
        title: 'LLM Foundations & RAG',
        description: 'Understand modern generative models and reliable schema outputs',
        order: 1,
        steps: [
          {
            id: 'ai-step-1',
            title: 'Prompt Engineering & Structured Outputs',
            description: 'System prompting, few-shot examples, JSON schema guarantees, and handling hallucinations.',
            category: 'Prompting',
            estimatedHours: 12,
            order: 1,
            status: 'completed',
            completed: true,
            keyTopics: ['System instructions', 'Function calling / Tool calling', 'Schema validation with Zod'],
            resources: [
              { id: 'ar1', title: 'Anthropic Prompt Engineering Guide', url: 'https://docs.anthropic.com', type: 'documentation' }
            ]
          },
          {
            id: 'ai-step-2',
            title: 'Vector Embeddings & RAG Architectures',
            description: 'Convert text to embeddings, perform cosine similarity searches, and implement context retrieval.',
            category: 'RAG',
            estimatedHours: 18,
            order: 2,
            status: 'next',
            completed: false,
            keyTopics: ['Chunking strategies', 'Vector databases (Pinecone, pgvector)', 'Hybrid search and re-ranking'],
            resources: [
              { id: 'ar2', title: 'Pinecone Learning Center', url: 'https://www.pinecone.io/learn/', type: 'article' }
            ]
          }
        ]
      }
    ]
  }
];
