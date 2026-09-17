import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '../lib/i18n';

export default function LegalPage({ locale, type }: { locale: Locale; type: 'privacy' | 'terms' }) {
  const english = locale === 'en';
  const privacy = type === 'privacy';
  return (
    <main dir={english ? 'ltr' : 'rtl'} className="min-h-screen bg-void text-white">
      <header className="border-b border-white/10 bg-carbon">
        <div className="container flex min-h-[72px] items-center justify-between gap-4">
          <Link href={`/${locale}`} aria-label="Mero">
            <Image
              src="/mero-logo-white-gold.svg"
              alt="Mero"
              width={82}
              height={44}
              style={{ width: 'auto' }}
              className="h-11 w-[82px] object-contain"
            />
          </Link>
          <Link href={`/${locale}`} className="text-sm text-muted hover:text-gold">
            {english ? 'Back to home' : 'العودة للرئيسية'}
          </Link>
        </div>
      </header>
      <article className="container max-w-3xl py-16 lg:py-24">
        <p className="label text-gold">MERO</p>
        <h1 className="mt-3 font-arabic text-3xl font-bold lg:text-5xl">
          {privacy
            ? english
              ? 'Privacy policy'
              : 'سياسة الخصوصية'
            : english
              ? 'Terms and conditions'
              : 'الشروط والأحكام'}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {english ? 'Last updated: 17 September 2026' : 'آخر تحديث: 17 سبتمبر 2026'}
        </p>
        <div className="mt-8 space-y-8 text-sm leading-8 text-muted">
          {privacy ? (
            english ? (
              <>
                <section>
                  <h2 className="mb-2 text-lg font-bold text-white">Information we collect</h2>
                  <p>
                    We collect the name, phone number, target country, selected product, and any
                    optional message you submit through the quotation form.
                  </p>
                </section>
                <section>
                  <h2 className="mb-2 text-lg font-bold text-white">How we use information</h2>
                  <p>
                    We use submitted details only to respond to inquiries, prepare quotations,
                    coordinate supply requests, and provide customer support.
                  </p>
                </section>
                <section>
                  <h2 className="mb-2 text-lg font-bold text-white">Sharing and retention</h2>
                  <p>
                    We do not sell personal information. Information may be shared only with service
                    providers needed to deliver your requested communication, and is retained only
                    as long as reasonably necessary.
                  </p>
                </section>
                <section>
                  <h2 className="mb-2 text-lg font-bold text-white">Contact</h2>
                  <p>
                    For privacy questions, contact us at{' '}
                    <a className="text-gold" href="mailto:Thrya.tire@gmail.com">
                      Thrya.tire@gmail.com
                    </a>
                    .
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="mb-2 text-lg font-bold text-white">المعلومات التي نجمعها</h2>
                  <p>
                    نجمع الاسم ورقم الجوال والدولة المستهدفة والمنتج المختار وأي رسالة اختيارية
                    ترسلونها عبر نموذج طلب التسعير.
                  </p>
                </section>
                <section>
                  <h2 className="mb-2 text-lg font-bold text-white">كيفية استخدام المعلومات</h2>
                  <p>
                    نستخدم البيانات المرسلة فقط للرد على الاستفسارات وإعداد عروض الأسعار وتنسيق
                    طلبات التوريد وتقديم الدعم.
                  </p>
                </section>
                <section>
                  <h2 className="mb-2 text-lg font-bold text-white">
                    المشاركة والاحتفاظ بالبيانات
                  </h2>
                  <p>
                    لا نبيع المعلومات الشخصية. وقد تتم مشاركتها فقط مع مزودي الخدمات اللازمين لإتمام
                    التواصل المطلوب، ونحتفظ بها للمدة اللازمة بشكل معقول.
                  </p>
                </section>
                <section>
                  <h2 className="mb-2 text-lg font-bold text-white">التواصل</h2>
                  <p>
                    للاستفسارات المتعلقة بالخصوصية، تواصلوا معنا عبر{' '}
                    <a className="text-gold" href="mailto:Thrya.tire@gmail.com">
                      Thrya.tire@gmail.com
                    </a>
                    .
                  </p>
                </section>
              </>
            )
          ) : english ? (
            <>
              <p>Website information is provided for general product and supply inquiries.</p>
              <p>
                Quotations, availability, specifications, and delivery terms are confirmed by our
                sales team before any order is accepted.
              </p>
              <p>
                Use of this website means you agree to communicate accurate information and use the
                site lawfully.
              </p>
            </>
          ) : (
            <>
              <p>تقدم معلومات الموقع لأغراض التعريف بالمنتجات والاستفسارات التجارية العامة.</p>
              <p>يؤكد فريق المبيعات الأسعار والتوافر والمواصفات وشروط التسليم قبل قبول أي طلب.</p>
              <p>باستخدام الموقع، توافقون على تقديم معلومات صحيحة واستخدام الموقع بطريقة نظامية.</p>
            </>
          )}
        </div>
      </article>
    </main>
  );
}
