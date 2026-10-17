import { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Roadmaps } from './pages/Roadmaps';
import { Lessons } from './pages/Lessons';
import { Quizzes } from './pages/Quizzes';
import { About } from './pages/About';
import { useTheme } from './hooks/useTheme';
import { useProgress } from './hooks/useProgress';
import { lessonsData } from './data/lessons';
import { Roadmap } from './types/roadmap';
import { Lesson } from './types/lesson';

export function App() {
  const { isDark, toggleTheme } = useTheme();
  const {
    completedSteps,
    completedLessons,
    bookmarks,
    quizAttempts,
    toggleStep,
    toggleLesson,
    toggleBookmark,
    recordQuizAttempt,
  } = useProgress();

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  // Synchronize hash with current page if user uses back/forward or deep links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (['home', 'roadmaps', 'lessons', 'quizzes', 'about'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset drill-downs when switching main tabs
    if (page !== 'roadmaps') setSelectedRoadmap(null);
    if (page !== 'lessons') setSelectedLesson(null);
    if (page !== 'quizzes') setActiveQuizId(null);
  };

  const handleSelectRoadmap = (roadmap: Roadmap | null) => {
    setSelectedRoadmap(roadmap);
    if (roadmap && currentPage !== 'roadmaps') {
      setCurrentPage('roadmaps');
      window.location.hash = 'roadmaps';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lesson: Lesson | null) => {
    setSelectedLesson(lesson);
    if (lesson && currentPage !== 'lessons') {
      setCurrentPage('lessons');
      window.location.hash = 'lessons';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRelatedLesson = (lessonId: string) => {
    const found = lessonsData.find((l) => l.id === lessonId);
    if (found) {
      setSelectedLesson(found);
      setCurrentPage('lessons');
      window.location.hash = 'lessons';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTakeQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
    setCurrentPage('quizzes');
    window.location.hash = 'quizzes';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCompleted = completedSteps.length + completedLessons.length;

  return (
    <MainLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      isDark={isDark}
      onToggleTheme={toggleTheme}
      completedCount={totalCompleted}
    >
      {currentPage === 'home' && (
        <Home
          onNavigate={handleNavigate}
          onSelectRoadmap={handleSelectRoadmap}
          onSelectLesson={handleSelectLesson}
          completedSteps={completedSteps}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {currentPage === 'roadmaps' && (
        <Roadmaps
          selectedRoadmap={selectedRoadmap}
          onSelectRoadmap={handleSelectRoadmap}
          completedSteps={completedSteps}
          onToggleStep={toggleStep}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onOpenRelatedLesson={handleOpenRelatedLesson}
        />
      )}

      {currentPage === 'lessons' && (
        <Lessons
          selectedLesson={selectedLesson}
          onSelectLesson={handleSelectLesson}
          completedLessons={completedLessons}
          onToggleLesson={toggleLesson}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onTakeQuiz={handleTakeQuiz}
        />
      )}

      {currentPage === 'quizzes' && (
        <Quizzes
          quizAttempts={quizAttempts}
          onSaveQuizAttempt={recordQuizAttempt}
          activeQuizId={activeQuizId}
        />
      )}

      {currentPage === 'about' && <About onNavigate={handleNavigate} />}
    </MainLayout>
  );
}

export default App;
