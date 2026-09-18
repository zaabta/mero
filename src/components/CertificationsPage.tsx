import type { Locale } from '../lib/i18n';
import { useLocale } from 'next-intl';

type Section = { title: string; paragraphs?: string[]; bullets?: string[] };

const sections: Record<Locale, Section[]> = {
  ar: [
    {
      title: 'الجودة التي يمكنك الوثوق بها',
      paragraphs: [
        'في شركة إطار الثريا لخدمات السيارات – Mero نحرص على توفير منتجات موثوقة من مصادر واضحة، مع الالتزام بمتطلبات الجودة والسلامة والمطابقة المعمول بها في المملكة العربية السعودية.',
      ],
    },
    {
      title: 'معايير اختيار المنتجات',
      paragraphs: ['نعتمد في اختيار المنتجات على مجموعة من المعايير، تشمل:'],
      bullets: [
        'الحصول على المنتجات من موردين وقنوات توريد موثوقة.',
        'التحقق من بيانات المنتج ومواصفاته قبل عرضه.',
        'مراجعة المقاس ومؤشر الحمولة ورمز السرعة للإطارات.',
        'فحص تاريخ الإنتاج والحالة الظاهرية وظروف التخزين.',
        'التأكد من مطابقة البطاريات والزيوت لمتطلبات المركبة.',
        'الاحتفاظ بالفواتير وبيانات المورد والمنتج لدعم التتبع.',
        'عدم تركيب أي منتج غير مناسب لمواصفات السيارة.',
      ],
    },
    {
      title: 'وثائق المطابقة والجودة',
      paragraphs: [
        'تخضع المنتجات، بحسب نوعها وبلد المنشأ والمتطلبات النظامية المطبقة، لوثائق وشهادات مطابقة قد تشمل:',
      ],
      bullets: [
        'شهادات مطابقة المنتجات.',
        'تقارير الاختبار والجودة.',
        'بيانات بلد المنشأ والمصنع.',
        'وثائق الاستيراد والتوريد.',
        'شهادات أو تسجيلات المطابقة المطلوبة للمنتج.',
        'ضمانات الشركة المصنعة أو المورد.',
      ],
    },
    {
      title: 'فحص الإطارات',
      paragraphs: [
        'يختلف نوع المستند المتوفر بحسب العلامة التجارية والمنتج والمورد. ويمكن للعميل طلب التحقق من مستندات المنتج المتاحة قبل الشراء.',
        'نتحقق قدر الإمكان من البيانات الأساسية الموضحة على الإطار، ومنها:',
      ],
      bullets: [
        'المقاس المعتمد.',
        'مؤشر الحمولة.',
        'رمز السرعة.',
        'تاريخ الإنتاج.',
        'اتجاه التركيب إن وجد.',
        'العلامات والمعلومات التنظيمية الموجودة على الجدار الجانبي.',
        'سلامة الإطار من التشققات أو الانتفاخات أو التشوهات الظاهرة.',
      ],
    },
    {
      title: 'فحص البطاريات',
      paragraphs: ['عند اختيار البطارية، نتحقق من:'],
      bullets: [
        'توافق المقاس مع مكان التركيب.',
        'موقع واتجاه الأقطاب.',
        'السعة وقدرة التشغيل المطلوبة.',
        'توافق تقنية البطارية مع نظام السيارة.',
        'سلامة جسم البطارية والأقطاب.',
        'شروط الضمان المتوفرة.',
      ],
    },
    {
      title: 'فحص الزيوت والفلاتر',
      paragraphs: [
        'نحرص على اختيار الزيوت والفلاتر ومواد الصيانة وفق المواصفات المطلوبة للمركبة، مع التأكد من:',
      ],
      bullets: [
        'درجة اللزوجة.',
        'مواصفات واعتمادات الزيت الموضحة على العبوة.',
        'رقم القطعة وتوافقها مع المحرك.',
        'سلامة العبوة ووضوح بيانات المنتج.',
        'المصدر والفاتورة وشروط الضمان، إن وجدت.',
      ],
    },
    {
      title: 'التخزين والمناولة',
      paragraphs: ['تُحفظ المنتجات بطريقة تساعد على حمايتها من:'],
      bullets: [
        'التعرض المباشر لأشعة الشمس.',
        'الحرارة أو الرطوبة المفرطة.',
        'الزيوت والمواد الكيميائية الضارة.',
        'الضغط أو التخزين الذي قد يسبب التشوه.',
        'التلف أثناء النقل والمناولة.',
      ],
    },
    {
      title: 'الشفافية في الشهادات والعلامات التجارية',
      paragraphs: [
        'نلتزم بعدم عرض أي شهادة أو اعتماد باسم الشركة إلا بعد التحقق من صلاحيته ونطاقه. كما لا يعني عرض شعارات العلامات التجارية أن Mero وكيل حصري لها، إلا إذا كان ذلك موثقًا ومعلنًا بصورة صريحة.',
      ],
    },
    {
      title: 'تواصل معنا',
      paragraphs: [
        'يمكنك التواصل معنا للاستفسار عن مواصفات المنتج أو وثائق المطابقة والضمان المتاحة:',
      ],
      bullets: [
        'الشركة: شركة إطار الثريا لخدمات السيارات – Mero',
        'البريد الإلكتروني: info@thurayatires.com',
        'الهاتف/واتساب: 0503598885',
        'العنوان: مجمع أوتو بارك، حي العمل، شارع الأمير فهد بن إبراهيم آل سعود، الملز، الرياض 12644، المملكة العربية السعودية',
      ],
    },
  ],
  en: [
    {
      title: 'Quality you can trust',
      paragraphs: [
        'At Al Thuraya Automotive Services – Mero, we aim to provide reliable automotive products from traceable sources while observing the quality, safety and conformity requirements applicable in Saudi Arabia.',
      ],
    },
    {
      title: 'Product selection standards',
      paragraphs: ['Our product-selection process includes:'],
      bullets: [
        'Sourcing products through trusted suppliers and distribution channels.',
        'Reviewing product information and specifications.',
        'Checking tyre size, load index and speed rating.',
        'Inspecting production information, physical condition and storage quality.',
        'Confirming that batteries and oils match vehicle requirements.',
        'Retaining available invoices and supplier information for traceability.',
        'Refusing to install products that do not match the vehicle’s specifications.',
      ],
    },
    {
      title: 'Conformity and quality documents',
      paragraphs: [
        'Depending on the product, origin and applicable requirements, available documentation may include:',
      ],
      bullets: [
        'Product conformity documentation.',
        'Quality or test reports.',
        'Manufacturer and country-of-origin information.',
        'Import and supply documentation.',
        'Required product conformity registrations.',
        'Manufacturer or supplier warranties.',
      ],
    },
    {
      title: 'Tyre checks',
      paragraphs: [
        'The documents available vary by product, brand and supplier. Customers may ask us about the documentation available for a particular product before purchasing.',
        'Where applicable, we check:',
      ],
      bullets: [
        'Tyre size.',
        'Load index.',
        'Speed rating.',
        'Production date.',
        'Installation direction.',
        'Regulatory information displayed on the sidewall.',
        'Visible cracks, bulges or deformation.',
      ],
    },
    {
      title: 'Battery checks',
      paragraphs: ['Battery selection includes checking:'],
      bullets: [
        'Physical dimensions.',
        'Terminal position and polarity.',
        'Required capacity and starting power.',
        'Compatibility with the vehicle’s electrical system.',
        'Battery casing and terminal condition.',
        'Available warranty terms.',
      ],
    },
    {
      title: 'Oil and filter checks',
      paragraphs: [
        'We select oils, filters and maintenance products according to vehicle requirements, including:',
      ],
      bullets: [
        'Viscosity grade.',
        'Specifications displayed on the packaging.',
        'Part-number and engine compatibility.',
        'Package condition and product identification.',
        'Source, invoice and available warranty.',
      ],
    },
    {
      title: 'Storage and handling',
      paragraphs: ['Products are stored and handled to help protect them from:'],
      bullets: [
        'Direct sunlight.',
        'Excessive heat or moisture.',
        'Harmful oils and chemicals.',
        'Pressure that could cause deformation.',
        'Damage during transportation or handling.',
      ],
    },
    {
      title: 'Transparency about certifications and brands',
      paragraphs: [
        'We do not claim a corporate certification or accreditation unless its validity and scope have been verified. Displaying third-party brand logos does not mean that Mero is an exclusive authorised distributor unless expressly documented and stated.',
      ],
    },
    {
      title: 'Contact us',
      paragraphs: [
        'Contact us to ask about product specifications or available conformity and warranty documents:',
      ],
      bullets: [
        'Company: Al Thuraya Automotive Services – Mero',
        'Email: info@thurayatires.com',
        'Telephone/WhatsApp: 0503598885',
        'Address: Auto Park Complex, Al Amal District, Prince Fahd bin Ibrahim Al Saud Street, Al Malaz, Riyadh 12644, Saudi Arabia.',
      ],
    },
  ],
};

export default function CertificationsPage() {
  const locale = useLocale() as Locale;
  const english = locale === 'en';

  return (
    <main dir={english ? 'ltr' : 'rtl'} className="min-h-screen bg-void pt-[72px] text-white">
      <article className="container max-w-3xl py-16 lg:py-24">
        <p className="label text-gold">MERO</p>
        <h1 className="mt-3 font-arabic text-3xl font-bold lg:text-5xl">
          {english ? 'Quality and standards' : 'شهادة الجودة والمقاييس'}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {english
            ? 'Verified product quality and conformity practices'
            : 'ممارسات موثوقة لجودة المنتجات ومطابقتها'}
        </p>
        <div className="mt-8 space-y-8 text-sm leading-8 text-muted">
          {sections[locale].map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-lg font-bold text-white">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul className="mt-2 list-disc space-y-1 ps-5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
