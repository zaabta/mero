'use client';

import { useEffect } from 'react';

const properties = [
  'fontFamily',
  'fontStyle',
  'fontVariationSettings',
  'transform',
  'rotate',
  'writingMode',
  'direction',
  'letterSpacing',
] as const;

function readStyles(element: Element) {
  const styles = getComputedStyle(element);
  return properties.reduce<Record<string, string>>((result, property) => {
    result[property] = styles[property];
    return result;
  }, {});
}

export default function IosFontDebug() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('iosFontDebug') !== '1') return;

    const target = document.querySelector<HTMLElement>('[data-ios-font-target]');
    if (!target) return;

    target.classList.add('ios-font-debug');
    const ancestors: Array<{ element: string; styles: Record<string, string> }> = [];
    let current: Element | null = target;
    while (current) {
      ancestors.push({
        element: current.tagName.toLowerCase() + (current.id ? `#${current.id}` : ''),
        styles: readStyles(current),
      });
      current = current.parentElement;
    }

    console.group('iOS font debug');
    console.table(readStyles(target));
    console.table(ancestors);
    console.info(
      'Font loading:',
      document.fonts
        ? [...document.fonts].map((font) => ({
            family: font.family,
            style: font.style,
            weight: font.weight,
            status: font.status,
          }))
        : 'FontFaceSet unavailable',
    );
    console.groupEnd();
  }, []);

  return null;
}
