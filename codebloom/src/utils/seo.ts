export interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

const DEFAULT_TITLE = 'DevTech - Interactive Developer Roadmaps & Lessons';
const DEFAULT_DESCRIPTION =
  'Master modern software engineering with interactive roadmaps, deep-dive lessons, and practical quizzes. Level up your coding journey today.';

export const updateSEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = ['developer roadmap', 'learn coding', 'web development', 'typescript', 'react'],
  ogImage = '/images/roadmap-illustration.svg',
  canonicalUrl = window.location.href,
}: SEOProps): void => {
  // Update document title
  document.title = title ? `${title} | DevTech` : DEFAULT_TITLE;

  // Update meta tags
  const setMeta = (nameOrProperty: string, value: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, nameOrProperty);
      document.head.appendChild(element);
    }
    element.setAttribute('content', value);
  };

  setMeta('description', description);
  setMeta('keywords', keywords.join(', '));
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:image', ogImage, true);
  setMeta('og:url', canonicalUrl, true);
  setMeta('twitter:card', 'summary_large_image');
};
