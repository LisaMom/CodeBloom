import React from 'react';

import jsImg        from '../../asset/lesson-images/js-lesson.jpg';
import cImg         from '../../asset/lesson-images/c-programming-language.avif';
import laravelImg   from '../../asset/lesson-images/laravel-lesson.jpg';
import reactImg     from '../../asset/lesson-images/React_Fundamentals.png';
import phpImg       from '../../asset/lesson-images/php-lesson.jpg';
import cppImg       from '../../asset/lesson-images/basic-cpp-programs.webp';
import javaImg      from '../../asset/lesson-images/java+springboot.png';
import htmlImg      from '../../asset/lesson-images/html-lesson.webp';
import cssImg       from '../../asset/lesson-images/hero-css.png';

const bannerImageMap: Record<string, string> = {
  javascript:  jsImg,
  c:           cImg,
  laravel:     laravelImg,
  react:       reactImg,
  php:         phpImg,
  cpp:         cppImg,
  java:        javaImg,
  'java-spring': javaImg,
  html:        htmlImg,
  css:         cssImg,
};

export interface LessonBannerProps {
  bannerType?: string;
  category?: string;
  title: string;
}

export const LessonBanner: React.FC<LessonBannerProps> = ({
  bannerType,
  category,
  title,
}) => {
  const type = bannerType || category || 'javascript';
  const src  = bannerImageMap[type];

  if (src) {
    return (
      <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 group-hover:scale-[1.02] transition-transform duration-300">
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback for unrecognised types
  return (
    <div className="w-full aspect-[16/10] bg-gradient-to-br from-slate-800 to-slate-950 rounded-xl overflow-hidden relative flex items-center justify-center p-6 select-none group-hover:scale-[1.02] transition-transform duration-300">
      <span className="text-2xl font-bold text-white tracking-tight">
        {title}
      </span>
    </div>
  );
};
