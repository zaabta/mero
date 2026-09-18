'use client';

import { useLayoutEffect } from 'react';

export default function SanityDirection() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousHtmlDir = html.getAttribute('dir');
    const previousHtmlLang = html.getAttribute('lang');
    const previousBodyDir = body.getAttribute('dir');

    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    body.setAttribute('dir', 'ltr');
    body.classList.add('sanity-studio-active');

    return () => {
      if (previousHtmlDir) html.setAttribute('dir', previousHtmlDir);
      else html.removeAttribute('dir');

      if (previousHtmlLang) html.setAttribute('lang', previousHtmlLang);
      else html.removeAttribute('lang');

      if (previousBodyDir) body.setAttribute('dir', previousBodyDir);
      else body.removeAttribute('dir');

      body.classList.remove('sanity-studio-active');
    };
  }, []);

  return null;
}
