import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { MobileMenu } from './MobileMenu';
import { Footer } from './Footer';

export interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  completedCount?: number;
  onLogout?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  currentPage,
  onNavigate,
  isDark,
  onToggleTheme,
  completedCount = 0,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-whitesmoke dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={onNavigate}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        completedCount={completedCount}
        onLogout={onLogout}
      />

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={onNavigate}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

