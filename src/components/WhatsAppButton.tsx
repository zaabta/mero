'use client';

import { MessageCircle } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';
import { BUSINESS } from '@/lib/business';

type Props = {
  locale: Locale;
  location: 'floating' | 'contact';
  whatsapp?: string;
};

export default function WhatsAppButton({ locale, location, whatsapp }: Props) {
  const english = locale === 'en';
  const message = english
    ? 'Hello, I would like to inquire about Mero products and services.'
    : 'مرحبًا، أريد الاستفسار عن منتجات وخدمات ميرو.';
  const href = `https://wa.me/${(whatsapp ?? BUSINESS.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={english ? 'Contact Mero on WhatsApp' : 'تواصل مع ميرو عبر واتساب'}
      onClick={() =>
        trackEvent('whatsapp_click', {
          link_location: location,
          page_language: locale,
        })
      }
      className={
        location === 'floating'
          ? 'fixed bottom-5 end-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-[#151719] text-gold shadow-xl transition hover:border-gold hover:bg-gold hover:text-void focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:bottom-6 sm:end-6'
          : 'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-gold/50 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-void focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'
      }
    >
      <MessageCircle size={location === 'floating' ? 23 : 18} aria-hidden="true" />
      {location === 'contact' ? <span>{english ? 'WhatsApp us' : 'تواصل عبر واتساب'}</span> : null}
    </a>
  );
}
