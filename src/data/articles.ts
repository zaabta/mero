export type Article = {
  id: string;
  category: 'tires' | 'batteries' | 'oils' | 'standards';
  image: string;
  title: { ar: string; en: string };
  excerpt: { ar: string; en: string };
  date: string;
  readingTime: number;
};

export const articles: Article[] = [
  {
    id: 'summer-tire-selection',
    category: 'tires',
    image: '/images/hero-tire-ar.png',
    title: {
      ar: 'دليل اختيار الإطارات لتحمل حرارة صيف الخليج',
      en: 'Choosing tires for Gulf summer heat',
    },
    excerpt: {
      ar: 'كيف تحافظ على التماسك والثبات ومسافة الفرملة في درجات حرارة الإسفلت المرتفعة.',
      en: 'How to maintain grip, stability, and braking performance in high road temperatures.',
    },
    date: '15 سبتمبر 2026',
    readingTime: 6,
  },
  {
    id: 'synthetic-engine-oils',
    category: 'oils',
    image: '/images/hero-oils-premium.png',
    title: {
      ar: 'الفرق بين الزيوت التخليقية وحماية المحرك',
      en: 'Synthetic oils and engine protection',
    },
    excerpt: {
      ar: 'فهم اللزوجة واختيار الزيت المناسب للمحركات الحديثة والتوربو.',
      en: 'Understand viscosity and choose the right oil for modern turbocharged engines.',
    },
    date: '12 سبتمبر 2026',
    readingTime: 4,
  },
  {
    id: 'battery-hot-climate',
    category: 'batteries',
    image: '/images/hero-battery-premium.png',
    title: {
      ar: 'كيف تطيل عمر بطارية سيارتك في الأجواء الحارة؟',
      en: 'How to extend battery life in hot climates',
    },
    excerpt: {
      ar: 'نصائح عملية لفحص البطارية وتجنب التفريغ والتآكل في الصيف.',
      en: 'Practical battery checks to help prevent discharge and corrosion in summer.',
    },
    date: '08 سبتمبر 2026',
    readingTime: 5,
  },
  {
    id: 'tire-cornering',
    category: 'tires',
    image: '/images/engineering-tire.png',
    title: {
      ar: 'أسرار الثبات على المنعطفات وصلابة الجدار الجانبي',
      en: 'Cornering stability and sidewall strength',
    },
    excerpt: {
      ar: 'لماذا تؤثر بنية الإطار وضغطه في التحكم أثناء القيادة الديناميكية؟',
      en: 'How tire construction and pressure affect control during dynamic driving.',
    },
    date: '01 سبتمبر 2026',
    readingTime: 7,
  },
  {
    id: 'saso-gso-standards',
    category: 'standards',
    image: '/images/team.jpeg',
    title: {
      ar: 'ماذا تعني معايير SASO وGSO لسلامة مركبتك؟',
      en: 'What SASO and GSO standards mean for vehicle safety',
    },
    excerpt: {
      ar: 'نظرة مبسطة على المطابقة وفحص المنتجات قبل التوريد.',
      en: 'A clear look at compliance and product checks before supply.',
    },
    date: '28 أغسطس 2026',
    readingTime: 5,
  },
  {
    id: 'tread-wear',
    category: 'tires',
    image: '/images/hero-tire-mobile.png',
    title: {
      ar: 'مؤشرات تآكل الإطارات ومتى يجب استبدالها',
      en: 'Tire wear indicators and when to replace tires',
    },
    excerpt: {
      ar: 'علامات مهمة لفحص المداس والشروخ قبل الرحلات الطويلة.',
      en: 'Important signs to check before long highway and desert journeys.',
    },
    date: '20 أغسطس 2026',
    readingTime: 4,
  },
];
