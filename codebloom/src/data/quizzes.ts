import { Quiz } from '../types/quiz';

export const quizzesData: Quiz[] = [
  {
    id: 'javascript-basics-quiz',
    slug: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Test your foundational knowledge on variable bindings, primitive types, comparisons, and basic function declarations.',
    category: 'JavaScript',
    difficulty: 'Beginner',
    timeLimitSeconds: 240,
    passingScorePercent: 70,
    tags: ['JavaScript', 'Variables', 'Basics', 'ES6'],
    questions: [
      {
        id: 'js-q1',
        question: 'Which keyword declares a variable that cannot be reassigned?',
        options: [
          { id: 'ja', text: 'var', isCorrect: false },
          { id: 'jb', text: 'let', isCorrect: false },
          { id: 'jc', text: 'const', isCorrect: true, explanation: 'The `const` keyword creates a block-scoped immutable binding that cannot be reassigned through reassignment or re-declaration.' },
          { id: 'jd', text: 'static', isCorrect: false }
        ],
        explanation: '`const` prevents re-assigning a value to that identifier name. If the value is an object or array, its contents can still be mutated, but the reference itself cannot be changed.',
        points: 25
      },
      {
        id: 'js-q2',
        question: 'What is the evaluated result of `typeof "DevTech"` in JavaScript?',
        options: [
          { id: 'j2a', text: '"string"', isCorrect: true, explanation: 'Values enclosed in single, double, or backtick quotes evaluate to the primitive "string" type.' },
          { id: 'j2b', text: '"text"', isCorrect: false },
          { id: 'j2c', text: '"char"', isCorrect: false },
          { id: 'j2d', text: '"object"', isCorrect: false }
        ],
        explanation: 'In JavaScript, strings are primitive values represented by the type "string".',
        points: 25
      },
      {
        id: 'js-q3',
        question: 'Which operator checks both value AND data type for equality without coercion?',
        options: [
          { id: 'j3a', text: '==', isCorrect: false },
          { id: 'j3b', text: '===', isCorrect: true, explanation: 'The strict equality operator (===) compares both value and type without converting types.' },
          { id: 'j3c', text: '=', isCorrect: false },
          { id: 'j3d', text: '!=', isCorrect: false }
        ],
        explanation: 'Always prefer `===` over `==` in modern JavaScript to avoid implicit coercion surprises (e.g. `0 == ""` is true, but `0 === ""` is false).',
        points: 25
      },
      {
        id: 'js-q4',
        question: 'What is the boolean evaluation of the number `0` in a conditional statement?',
        options: [
          { id: 'j4a', text: 'true', isCorrect: false },
          { id: 'j4b', text: 'false', isCorrect: true, explanation: '0 is one of JavaScript\'s falsy values (along with "", null, undefined, NaN, and false).' },
          { id: 'j4c', text: 'undefined', isCorrect: false },
          { id: 'j4d', text: 'null', isCorrect: false }
        ],
        explanation: 'In JavaScript, `0`, `""`, `null`, `undefined`, `NaN`, and `false` are all inherently falsy.',
        points: 25
      }
    ]
  },
  {
    id: 'react-hooks-quiz',
    slug: 'react-hooks-quiz',
    title: 'React Hooks & State Architecture',
    description: 'Test your understanding of React component lifecycle, hook rules, performance optimizations, and state management.',
    category: 'React',
    difficulty: 'Intermediate',
    timeLimitSeconds: 300,
    passingScorePercent: 70,
    tags: ['React', 'Hooks', 'Web Development'],
    questions: [
      {
        id: 'q1',
        question: 'Which of the following is an INVALID rule when writing React hooks?',
        options: [
          { id: 'o1', text: 'Call hooks only at the top level of your component', isCorrect: false },
          { id: 'o2', text: 'Call hooks only from React function components or custom hooks', isCorrect: false },
          { id: 'o3', text: 'You can call hooks conditionally inside an if statement if the condition is constant', isCorrect: true, explanation: 'Hooks must NEVER be called conditionally or inside loops/nested functions, as React relies on the exact order of hook calls on every render.' },
          { id: 'o4', text: 'Custom hook function names must start with the prefix "use"', isCorrect: false }
        ],
        explanation: 'React relies on call order to pair hooks with their persistent state between renders.',
        points: 25
      },
      {
        id: 'q2',
        question: 'What is the primary purpose of the useCallback hook?',
        codeSnippet: {
          language: 'tsx',
          code: 'const handleClick = useCallback(() => doSomething(id), [id]);'
        },
        options: [
          { id: 'o5', text: 'To run a side-effect after the component mounts', isCorrect: false },
          { id: 'o6', text: 'To cache and return a memoized callback function reference across re-renders', isCorrect: true, explanation: 'useCallback preserves the function instance between renders unless one of its dependency values changes.' },
          { id: 'o7', text: 'To memoize expensive calculation return values', isCorrect: false },
          { id: 'o8', text: 'To persist a mutable ref that does not trigger re-renders', isCorrect: false }
        ],
        explanation: 'useCallback returns a memoized version of the callback function that only changes if dependencies change.',
        points: 25
      },
      {
        id: 'q3',
        question: 'What happens if you omit the dependency array in useEffect(() => { ... })?',
        options: [
          { id: 'o9', text: 'The effect runs only once when the component mounts', isCorrect: false },
          { id: 'o10', text: 'The effect never runs', isCorrect: false },
          { id: 'o11', text: 'The effect runs on every single render cycle', isCorrect: true, explanation: 'Without a dependency array, useEffect executes after every initial render and subsequent update.' },
          { id: 'o12', text: 'React throws a compilation error', isCorrect: false }
        ],
        explanation: 'Omitting the array causes the effect callback to run after every commit. Providing an empty array [] makes it run only on mount.',
        points: 25
      },
      {
        id: 'q4',
        question: 'How does updating a useRef object value differ from useState?',
        options: [
          { id: 'o13', text: 'Updating a ref triggers a re-render; state does not', isCorrect: false },
          { id: 'o14', text: 'Updating ref.current does NOT trigger a component re-render', isCorrect: true, explanation: 'useRef creates a mutable container object. Mutating .current will not schedule a re-render.' },
          { id: 'o15', text: 'Refs can only store DOM elements, not arbitrary data', isCorrect: false },
          { id: 'o16', text: 'Refs are reset to default on every re-render', isCorrect: false }
        ],
        explanation: 'useRef is ideal for storing mutable data that should persist across renders without causing UI re-rendering.',
        points: 25
      }
    ]
  },
  {
    id: 'typescript-quiz',
    slug: 'typescript-quiz',
    title: 'TypeScript Mastery & Type Safety',
    description: 'Challenge your knowledge of TypeScript unions, narrowing, generics, and compile-time guarantees.',
    category: 'TypeScript',
    difficulty: 'Intermediate',
    timeLimitSeconds: 240,
    passingScorePercent: 75,
    tags: ['TypeScript', 'Static Typing', 'JavaScript'],
    questions: [
      {
        id: 'ts1',
        question: 'What is the keyword used to constrain a generic type parameter to a specific shape?',
        options: [
          { id: 'to1', text: 'implements', isCorrect: false },
          { id: 'to2', text: 'extends', isCorrect: true, explanation: 'For generic constraints, TypeScript uses the syntax <T extends Type>.' },
          { id: 'to3', text: 'with', isCorrect: false },
          { id: 'to4', text: 'instanceof', isCorrect: false }
        ],
        explanation: 'The `extends` keyword limits what types can be passed as a generic parameter.',
        points: 25
      },
      {
        id: 'ts2',
        question: 'What is the return type of `keyof { id: number; title: string }`?',
        options: [
          { id: 'to5', text: '"id" | "title"', isCorrect: true, explanation: 'The keyof operator produces a string or numeric literal union of an object type keys.' },
          { id: 'to6', text: 'string[]', isCorrect: false },
          { id: 'to7', text: 'Array<string | number>', isCorrect: false },
          { id: 'to8', text: 'Record<string, unknown>', isCorrect: false }
        ],
        explanation: 'keyof creates a union literal containing the exact property names of the type.',
        points: 25
      },
      {
        id: 'ts3',
        question: 'Which type is safer to use for values of unknown shape: `any` or `unknown`?',
        options: [
          { id: 'to9', text: 'any, because it disables all checks', isCorrect: false },
          { id: 'to10', text: 'unknown, because it forces type checking or narrowing before operations are allowed', isCorrect: true, explanation: 'Unlike any, unknown requires you to perform a type check before calling methods.' },
          { id: 'to11', text: 'Both are identical in modern TypeScript', isCorrect: false },
          { id: 'to12', text: 'never is preferred over both', isCorrect: false }
        ],
        explanation: '`unknown` is the type-safe counterpart of `any`.',
        points: 25
      },
      {
        id: 'ts4',
        question: 'What does the `Partial<T>` utility type do?',
        options: [
          { id: 'to13', text: 'Makes all properties of T required', isCorrect: false },
          { id: 'to14', text: 'Makes all properties of T optional (?.)', isCorrect: true, explanation: 'Partial<T> constructs a type with all properties of T set to optional.' },
          { id: 'to15', text: 'Picks a subset of keys from T', isCorrect: false },
          { id: 'to16', text: 'Makes all properties of T readonly', isCorrect: false }
        ],
        explanation: 'Partial<T> maps each property `K in keyof T` to `T[K] | undefined`.',
        points: 25
      }
    ]
  },
  {
    id: 'css-layouts-quiz',
    slug: 'css-layouts',
    title: 'CSS Layouts & Responsive Design',
    description: 'Test your mastery of CSS Grid, Flexbox alignment, Tailwind CSS utilities, and mobile-first responsive breakpoints.',
    category: 'CSS',
    difficulty: 'Beginner',
    timeLimitSeconds: 240,
    passingScorePercent: 70,
    tags: ['CSS', 'Flexbox', 'Grid', 'Tailwind', 'Responsive'],
    questions: [
      {
        id: 'css-q1',
        question: 'Which CSS property defines a two-dimensional layout system dealing with both columns and rows simultaneously?',
        options: [
          { id: 'ca', text: 'display: flex', isCorrect: false },
          { id: 'cb', text: 'display: grid', isCorrect: true, explanation: 'CSS Grid is designed specifically for two-dimensional layouts (rows and columns), whereas Flexbox is largely one-dimensional.' },
          { id: 'cc', text: 'display: inline-block', isCorrect: false },
          { id: 'cd', text: 'position: absolute', isCorrect: false }
        ],
        explanation: 'CSS Grid provides full 2D layout capabilities with grid-template-columns and grid-template-rows.',
        points: 25
      },
      {
        id: 'css-q2',
        question: 'In Flexbox, which property aligns items along the cross-axis?',
        options: [
          { id: 'c2a', text: 'justify-content', isCorrect: false },
          { id: 'c2b', text: 'align-items', isCorrect: true, explanation: '`align-items` governs alignment perpendicular to the main axis (the cross axis).' },
          { id: 'c2c', text: 'flex-direction', isCorrect: false },
          { id: 'c2d', text: 'align-content', isCorrect: false }
        ],
        explanation: '`justify-content` controls the main axis, while `align-items` controls alignment on the cross axis.',
        points: 25
      },
      {
        id: 'css-q3',
        question: 'In Tailwind CSS, which class sets the container display to CSS Grid?',
        options: [
          { id: 'c3a', text: 'display-grid', isCorrect: false },
          { id: 'c3b', text: 'grid', isCorrect: true, explanation: 'The `grid` utility sets `display: grid;`.' },
          { id: 'c3c', text: 'flex-grid', isCorrect: false },
          { id: 'c3d', text: 'css-grid', isCorrect: false }
        ],
        explanation: 'Tailwind provides intuitive concise utilities like `grid`, `flex`, `hidden`, and `block`.',
        points: 25
      },
      {
        id: 'css-q4',
        question: 'What is the default flex-direction of a flex container if not specified?',
        options: [
          { id: 'c4a', text: 'column', isCorrect: false },
          { id: 'c4b', text: 'row', isCorrect: true, explanation: 'The initial value for `flex-direction` in standard CSS is `row`.' },
          { id: 'c4c', text: 'row-reverse', isCorrect: false },
          { id: 'c4d', text: 'column-reverse', isCorrect: false }
        ],
        explanation: 'By default, flex items are laid out horizontally from left-to-right (in LTR writing systems) along the row axis.',
        points: 25
      }
    ]
  }
];
