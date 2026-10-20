import { createIcons, icons } from 'lucide';

/**
 * Scans the DOM (or a specific container) for `<i data-lucide="icon-name"></i>`
 * and replaces them with SVG icons.
 */
export function renderIcons(container?: HTMLElement | null): void {
  try {
    createIcons({
      icons,
      nameAttr: 'data-lucide',
      root: container || document,
    });
  } catch (err) {
    console.error('Error rendering icons:', err);
  }
}
