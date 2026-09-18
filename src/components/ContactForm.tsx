'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import CustomSelect from './CustomSelect';
import { useLocale } from 'next-intl';
import { trackEvent } from '@/lib/analytics';

const productOptions = (english: boolean) => [
  {
    value: 'tires',
    label: english ? 'Car tires (various sizes)' : 'إطارات سيارات (مختلف المقاسات)',
  },
  { value: 'batteries', label: english ? 'Heavy-duty batteries' : 'بطاريات عالية التحمل' },
  { value: 'oils', label: english ? 'Engine oils and greases' : 'زيوت المحركات والشحوم' },
  { value: 'filters', label: english ? 'Filters and consumables' : 'فلاتر وقطع استهلاكية' },
  {
    value: 'wholesale',
    label: english ? 'Wholesale supply / fleet contracts' : 'طلب توريد جملة / عقود أساطيل',
  },
];

export default function ContactForm() {
  const locale = useLocale();
  const english = locale === 'en';
  const [product, setProduct] = useState('tires');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleQuote = (event: Event) => {
      const selected = (event as CustomEvent<{ product?: string }>).detail?.product;
      if (selected) setProduct(selected);
    };
    document.addEventListener('mero:quote', handleQuote);
    return () => document.removeEventListener('mero:quote', handleQuote);
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setError('');
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message);
      form.reset();
      setProduct('tires');
      setStatus('success');
      trackEvent('generate_lead', { form_name: 'contact', page_language: locale });
    } catch (submissionError) {
      setStatus('error');
      setError(
        submissionError instanceof Error && submissionError.message
          ? submissionError.message
          : english
            ? 'We could not send your request. Please try again.'
            : 'تعذر إرسال طلبكم. يرجى المحاولة مرة أخرى.',
      );
    }
  }

  const options = productOptions(english);
  return (
    <form
      dir={english ? 'ltr' : 'rtl'}
      className={`mt-6 flex flex-col gap-4 ${english ? 'text-left' : 'text-right'}`}
      onSubmit={submit}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs text-muted">
          {english ? 'Full name' : 'الاسم الكامل'}
          <input
            className="field text-base"
            name="fullName"
            placeholder={english ? 'Your full name' : 'سعد المنصوري'}
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-xs text-muted">
          {english ? 'Mobile / WhatsApp number' : 'رقم الجوال / واتساب'}
          <input
            className="field text-left text-base"
            dir="ltr"
            name="phone"
            placeholder="011 220 4999"
            required
            type="tel"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs text-muted">
          {english ? 'Target country' : 'الدولة المستهدفة'}
          <CustomSelect
            name="country"
            defaultValue="sa"
            direction={english ? 'ltr' : 'rtl'}
            options={[
              {
                value: 'sa',
                label: english ? 'Kingdom of Saudi Arabia' : 'المملكة العربية السعودية',
              },
            ]}
          />
        </label>
        <label className="flex flex-col gap-2 text-xs text-muted">
          {english ? 'Product or area of interest' : 'نوع الاهتمام / المنتج'}
          <CustomSelect
            key={product}
            name="product"
            defaultValue={product}
            direction={english ? 'ltr' : 'rtl'}
            options={options}
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-xs text-muted">
        {english ? 'Message or order details' : 'الرسالة أو تفاصيل الطلب'}
        <textarea
          className="field min-h-32 text-base"
          name="message"
          placeholder={
            english
              ? 'Mention sizes, approximate quantities, or any special requirements...'
              : 'اذكر المقاسات المطلوبة، الكميات التقريبية، أو أي متطلبات خاصة...'
          }
          rows={4}
        />
      </label>
      <label className="flex items-start gap-2 text-xs leading-5 text-muted">
        <input className="mt-1 accent-gold" name="privacyConsent" required type="checkbox" />
        <span>
          {english
            ? 'I agree to the processing of my information for the purpose of responding to my request in accordance with the Privacy Policy.'
            : 'أوافق على معالجة بياناتي لغرض التواصل والرد على طلبي وفق سياسة الخصوصية.'}{' '}
          <Link className="text-gold underline" href="/privacy">
            {english ? 'Read the Privacy Policy' : 'اقرأ سياسة الخصوصية'}
          </Link>
        </span>
      </label>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="sr-only"
        name="website"
        tabIndex={-1}
      />
      <button
        className="btn btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-60"
        disabled={status === 'submitting'}
        type="submit"
      >
        {status === 'submitting'
          ? english
            ? 'Sending...'
            : 'جارٍ الإرسال...'
          : english
            ? 'Send quote request'
            : 'إرسال طلب التسعير'}
      </button>
      {status === 'success' && (
        <p className="text-sm text-gold" role="status">
          {english ? 'Your request was sent successfully.' : 'تم إرسال طلبكم بنجاح.'}
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
