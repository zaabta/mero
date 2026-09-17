'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function QuoteButton({
  english,
  product,
  label,
}: {
  english: boolean;
  product: string;
  label: string;
}) {
  const requestQuote = () => {
    document.dispatchEvent(new CustomEvent('mero:quote', { detail: { product } }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(
      () => document.querySelector<HTMLInputElement>('[name="fullName"]')?.focus(),
      500,
    );
  };

  return (
    <button
      type="button"
      onClick={requestQuote}
      className="inline-flex items-center gap-1 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      {label}
      {english ? (
        <ArrowRight size={14} aria-hidden="true" />
      ) : (
        <ArrowLeft size={14} aria-hidden="true" />
      )}
    </button>
  );
}
