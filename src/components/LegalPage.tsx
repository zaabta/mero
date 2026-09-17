import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '../lib/i18n';

type LegalSection = { title: string; paragraphs?: string[]; bullets?: string[] };

const privacySections: Record<Locale, LegalSection[]> = {
  ar: [
    {
      title: 'مقدمة',
      paragraphs: [
        'تحترم شركة إطار الثريا لخدمات السيارات – Mero خصوصية زوار موقعها الإلكتروني، وتلتزم بحماية البيانات الشخصية التي يتم جمعها واستخدامها عند تصفح الموقع أو التواصل معنا.',
      ],
    },
    {
      title: 'البيانات التي تقدمها لنا',
      paragraphs: ['قد نجمع البيانات التي تقدمها لنا طواعية، ومنها:'],
      bullets: [
        'الاسم.',
        'رقم الهاتف أو رقم واتساب.',
        'البريد الإلكتروني.',
        'المدينة أو الموقع التقريبي.',
        'تفاصيل السيارة أو المنتج المطلوب.',
        'محتوى الرسائل والاستفسارات المرسلة عبر نماذج التواصل.',
        'أي معلومات أخرى تزودنا بها عند طلب خدمة أو عرض سعر.',
      ],
    },
    {
      title: 'البيانات التقنية',
      paragraphs: ['وقد نجمع تلقائيًا بعض البيانات التقنية، مثل:'],
      bullets: [
        'عنوان بروتوكول الإنترنت IP.',
        'نوع الجهاز والمتصفح ونظام التشغيل.',
        'الصفحات التي تمت زيارتها ومدة التصفح.',
        'مصدر الزيارة والتفاعل مع الموقع.',
      ],
    },
    {
      title: 'كيف نستخدم البيانات',
      paragraphs: ['نستخدم البيانات للأغراض التالية:'],
      bullets: [
        'الرد على الاستفسارات وطلبات عروض الأسعار.',
        'تقديم معلومات عن الإطارات والبطاريات والزيوت وخدمات السيارات.',
        'التواصل مع العميل عبر الهاتف أو البريد الإلكتروني أو واتساب.',
        'تحسين الموقع وتجربة المستخدم وجودة خدماتنا.',
        'تحليل أداء الموقع وقياس الزيارات.',
        'حماية الموقع ومنع إساءة الاستخدام.',
        'الالتزام بالمتطلبات النظامية والقانونية السارية.',
      ],
    },
    {
      title: 'أساس المعالجة',
      paragraphs: [
        'نعالج البيانات عند وجود موافقة من المستخدم، أو لتنفيذ طلب أو خدمة، أو لتحقيق مصلحة مشروعة مثل تحسين الموقع وحمايته، أو للالتزام بمتطلب نظامي.',
      ],
    },
    {
      title: 'ملفات تعريف الارتباط',
      paragraphs: [
        'قد يستخدم الموقع ملفات تعريف الارتباط وتقنيات مشابهة لتحسين الأداء، وحفظ التفضيلات، وفهم طريقة استخدام الموقع.',
        'يمكن للمستخدم التحكم في ملفات تعريف الارتباط من إعدادات المتصفح. وقد يؤدي تعطيل بعضها إلى التأثير في بعض وظائف الموقع.',
      ],
    },
    {
      title: 'الخدمات الخارجية ومشاركة البيانات',
      paragraphs: ['قد يستخدم الموقع خدمات خارجية، مثل:'],
      bullets: [
        'Google Analytics أو أدوات تحليل مشابهة.',
        'Google Maps أو Mapbox لعرض المواقع والفروع.',
        'WhatsApp للتواصل.',
        'خدمات الاستضافة والحماية التقنية.',
      ],
    },
    {
      title: 'الإفصاح عن البيانات',
      paragraphs: [
        'تعالج هذه الجهات بعض البيانات وفق سياسات الخصوصية الخاصة بها. نحن لا نبيع بيانات العملاء الشخصية.',
        'قد نشارك البيانات عند الضرورة مع مزودي الخدمات الذين يساعدوننا في تشغيل الموقع أو تقديم الخدمة، بشرط استخدامها للغرض المحدد فقط.',
        'كما قد نفصح عن البيانات إذا طلبت ذلك جهة رسمية مختصة أو كان الإفصاح مطلوبًا بموجب الأنظمة المعمول بها.',
      ],
    },
    {
      title: 'حماية البيانات والاحتفاظ بها',
      paragraphs: [
        'نتخذ إجراءات تقنية وتنظيمية معقولة لحماية البيانات من الوصول غير المصرح به أو الفقد أو التعديل أو الإفصاح. ومع ذلك، لا توجد وسيلة نقل أو تخزين إلكتروني آمنة بصورة مطلقة.',
        'نحتفظ بالبيانات للمدة اللازمة لتحقيق الغرض الذي جُمعت من أجله، أو لتنفيذ الالتزامات النظامية والمحاسبية، ثم نحذفها أو نخفي هوية أصحابها متى لم تعد هناك حاجة إليها.',
      ],
    },
    {
      title: 'حقوق المستخدم',
      paragraphs: ['بحسب الأنظمة المطبقة، يحق للمستخدم طلب:'],
      bullets: [
        'معرفة البيانات التي نحتفظ بها عنه.',
        'تصحيح البيانات غير الدقيقة.',
        'حذف البيانات عندما يسمح النظام بذلك.',
        'سحب الموافقة على المعالجة.',
        'الاعتراض على بعض أوجه استخدام البيانات.',
        'الحصول على نسخة من بياناته، عند انطباق ذلك.',
      ],
    },
    {
      title: 'الأطفال والروابط الخارجية والتحديثات',
      paragraphs: [
        'الموقع غير مخصص لجمع بيانات الأطفال عمدًا. إذا علمنا بأن بيانات طفل جُمعت دون موافقة ولي الأمر، فسنتخذ الإجراءات المناسبة لحذفها.',
        'قد يحتوي الموقع على روابط لمواقع أو خدمات خارجية. لا نتحمل مسؤولية ممارسات الخصوصية أو محتوى تلك المواقع، وننصح بمراجعة سياساتها قبل استخدامها.',
        'يجوز تحديث هذه السياسة عند تغيير خدماتنا أو المتطلبات النظامية. سيظهر تاريخ آخر تحديث في أعلى الصفحة، ويعد استمرار استخدام الموقع بعد التحديث قبولًا للسياسة المعدلة.',
      ],
    },
    {
      title: 'التواصل بشأن الخصوصية',
      paragraphs: ['للاستفسارات المتعلقة بالخصوصية أو لممارسة حقوقك، يرجى التواصل معنا:'],
      bullets: [
        'الشركة: شركة إطار الثريا لخدمات السيارات – Mero',
        'البريد الإلكتروني: privacy@thurayatires.com',
        'الهاتف/واتساب: 0503598885',
        'العنوان: مجمع أوتو بارك، حي العمل، شارع الأمير فهد بن إبراهيم آل سعود، الملز، الرياض 12644، المملكة العربية السعودية',
      ],
    },
  ],
  en: [
    {
      title: 'Introduction',
      paragraphs: [
        'Al Thuraya Automotive Services – Mero respects your privacy and is committed to protecting the personal information collected when you visit our website or contact us.',
      ],
    },
    {
      title: 'Information you provide',
      paragraphs: ['We may collect information you voluntarily provide, including:'],
      bullets: [
        'Name.',
        'Telephone or WhatsApp number.',
        'Email address.',
        'City or approximate location.',
        'Vehicle or requested-product details.',
        'Messages submitted through contact forms.',
        'Other information you provide when requesting a service or quotation.',
      ],
    },
    {
      title: 'Technical information',
      paragraphs: ['We may also collect technical information automatically, including:'],
      bullets: [
        'IP address.',
        'Browser, device and operating-system information.',
        'Visited pages and browsing duration.',
        'Referral source and website interactions.',
      ],
    },
    {
      title: 'How we use information',
      paragraphs: ['We use this information to:'],
      bullets: [
        'Respond to enquiries and quotation requests.',
        'Provide information about tyres, batteries, oils and automotive services.',
        'Communicate through telephone, email or WhatsApp.',
        'Improve our website, services and customer experience.',
        'Analyse website traffic and performance.',
        'Protect the website and prevent misuse.',
        'Comply with applicable legal requirements.',
      ],
    },
    {
      title: 'Legal basis for processing',
      paragraphs: [
        'We process personal information with your consent, to respond to your request or provide a service, for legitimate business purposes such as improving and securing the website, or to meet applicable legal obligations.',
      ],
    },
    {
      title: 'Cookies',
      paragraphs: [
        'The website may use cookies and similar technologies to improve performance, remember preferences and understand how visitors use the website.',
        'You may control cookies through your browser settings. Disabling certain cookies may affect some website functions.',
      ],
    },
    {
      title: 'External services and sharing',
      paragraphs: ['The website may use external services, including:'],
      bullets: [
        'Google Analytics or similar analytics services.',
        'Google Maps or Mapbox.',
        'WhatsApp.',
        'Hosting and website-security providers.',
      ],
    },
    {
      title: 'Disclosure of information',
      paragraphs: [
        'These providers may process information according to their own privacy policies. We do not sell customers’ personal information.',
        'We may share necessary information with service providers that help us operate the website or fulfil customer requests. They may use the information only for the specified purpose.',
        'We may also disclose information when required by applicable law or a competent authority.',
      ],
    },
    {
      title: 'Security and retention',
      paragraphs: [
        'We use reasonable technical and organisational safeguards to protect information against unauthorised access, loss, alteration or disclosure. However, no electronic transmission or storage method can be guaranteed to be completely secure.',
        'We retain personal information only for as long as necessary to fulfil its original purpose or meet applicable legal and accounting requirements. It will then be deleted or anonymised where appropriate.',
      ],
    },
    {
      title: 'Your rights',
      paragraphs: ['Subject to applicable law, you may request to:'],
      bullets: [
        'Access the personal information we hold about you.',
        'Correct inaccurate information.',
        'Delete your information where legally permitted.',
        'Withdraw your consent.',
        'Object to certain processing activities.',
        'Receive a copy of your information where applicable.',
      ],
    },
    {
      title: 'Children, external links and updates',
      paragraphs: [
        'The website is not intended to knowingly collect personal information from children. If we discover that a child’s information has been collected without appropriate parental consent, we will take reasonable steps to delete it.',
        'Our website may contain links to external websites or services. We are not responsible for their content or privacy practices.',
        'We may update this Privacy Policy when our services or applicable requirements change. The latest revision date will appear at the top of this page.',
      ],
    },
    {
      title: 'Privacy contact',
      paragraphs: ['For privacy questions or to exercise your rights, please contact us:'],
      bullets: [
        'Company: Al Thuraya Automotive Services – Mero',
        'Email: privacy@thurayatires.com',
        'Telephone/WhatsApp: 0503598885',
        'Address: Auto Park Complex, Al Amal District, Prince Fahd bin Ibrahim Al Saud Street, Al Malaz, Riyadh 12644, Saudi Arabia.',
      ],
    },
  ],
};

const termsSections: Record<Locale, LegalSection[]> = {
  ar: [
    {
      title: 'مقدمة',
      paragraphs: [
        'مرحبًا بكم في الموقع الإلكتروني لشركة إطار الثريا لخدمات السيارات – Mero. باستخدامكم هذا الموقع، فإنكم توافقون على الشروط والأحكام الموضحة أدناه. إذا كنتم لا توافقون عليها، يرجى عدم استخدام الموقع.',
      ],
    },
    {
      title: 'التعريفات',
      paragraphs: ['يقصد بالمصطلحات التالية:'],
      bullets: [
        'الشركة: شركة إطار الثريا لخدمات السيارات – Mero.',
        'الموقع: الموقع الإلكتروني thurayatires.com وجميع صفحاته.',
        'المستخدم: كل شخص يزور الموقع أو يستخدم خدماته.',
        'المنتجات: الإطارات والبطاريات والزيوت وقطع ومستلزمات السيارات المعروضة.',
        'الخدمات: خدمات السيارات والاستفسارات وطلبات عروض الأسعار وأي خدمات أخرى تقدمها الشركة.',
      ],
    },
    {
      title: 'طبيعة الموقع والطلبات',
      paragraphs: [
        'يقدم الموقع معلومات عامة عن الشركة ومنتجاتها وخدماتها وفروعها ووسائل التواصل معها.',
        'ما لم تُفعّل خدمة شراء إلكتروني بصورة صريحة، فإن إرسال استفسار أو طلب عرض سعر من خلال الموقع لا يُعد عملية شراء نهائية أو عقد بيع ملزمًا.',
      ],
    },
    {
      title: 'المنتجات والأسعار والتوفر',
      paragraphs: ['نبذل جهدًا معقولًا لضمان دقة معلومات المنتجات والصور والمواصفات، ومع ذلك:'],
      bullets: [
        'قد تختلف بعض التفاصيل أو العبوات أو الصور عن المنتج المتوفر فعليًا.',
        'يعتمد توفر المنتجات على المخزون والموقع الجغرافي.',
        'قد تتغير المواصفات والأسعار والعروض دون إشعار مسبق.',
        'يجب التأكد من ملاءمة المنتج للسيارة قبل الشراء أو التركيب.',
        'تُعد الصور المعروضة لأغراض توضيحية ما لم يُذكر خلاف ذلك.',
        'قد لا تشمل الأسعار تكاليف التركيب أو الموازنة أو التوصيل أو الضرائب أو الخدمات الإضافية، ما لم يُذكر ذلك صراحةً.',
      ],
    },
    {
      title: 'عروض الأسعار والطلبات',
      paragraphs: [
        'يكون عرض السعر النهائي هو العرض المعتمد والصادر من الشركة عبر قنوات التواصل الرسمية، ويخضع لمدة الصلاحية والتوفر والشروط الموضحة فيه.',
        'عند إرسال نموذج أو التواصل عبر واتساب أو الهاتف، يلتزم المستخدم بتقديم معلومات صحيحة وكافية. ولا يضمن إرسال الطلب توفر المنتج أو قبول الخدمة.',
        'تتواصل الشركة مع المستخدم لتأكيد التفاصيل والسعر والموعد والتوفر. ويتحمل المستخدم مسؤولية تقديم بيانات صحيحة عن السيارة، بما فيها النوع والطراز وسنة الصنع والمقاس المطلوب.',
      ],
    },
    {
      title: 'ملاءمة المنتجات والسلامة',
      paragraphs: [
        'يجب اختيار الإطارات والبطاريات والزيوت وفق مواصفات الشركة المصنعة للمركبة. وقد ترفض الشركة تركيب منتج غير متوافق أو قد يؤثر في السلامة.',
        'لا ينبغي اعتبار محتوى الموقع بديلًا عن الفحص الفني أو توصية الشركة المصنعة للسيارة.',
      ],
    },
    {
      title: 'المواعيد وتنفيذ الخدمة',
      paragraphs: [
        'المواعيد المطلوبة عبر الموقع لا تصبح مؤكدة إلا بعد اعتمادها من الشركة. وقد يتغير وقت تنفيذ الخدمة بحسب حالة السيارة وتوفر المنتجات وضغط العمل، وسنبذل جهدًا معقولًا لإبلاغ العميل بأي تغيير جوهري.',
      ],
    },
    {
      title: 'الدفع والاستبدال والاسترجاع',
      paragraphs: [
        'تُحدد طرق الدفع المتاحة عند تأكيد الطلب أو داخل الفرع. ويلتزم العميل بسداد المبلغ النهائي المتفق عليه قبل استلام المنتج أو المركبة، ما لم يتم الاتفاق كتابيًا على خلاف ذلك.',
        'لا تطلب الشركة معلومات البطاقات البنكية عبر رسائل غير رسمية، وعلى العميل التأكد من التعامل مع قنوات الشركة المعتمدة.',
        'تخضع عمليات الاستبدال والاسترجاع للأنظمة المعمول بها وسياسة الشركة، مع مراعاة حالة المنتج وطبيعته. وقد لا يقبل إرجاع المنتج بعد تركيبه أو استخدامه، إلا عند وجود عيب أو حق نظامي يوجب ذلك.',
        'يجب الاحتفاظ بالفاتورة وإحضار المنتج وملحقاته عند تقديم الطلب. ولا يخل ذلك بأي حقوق مقررة للمستهلك بموجب الأنظمة السارية في المملكة العربية السعودية.',
      ],
    },
    {
      title: 'الضمان',
      paragraphs: [
        'تختلف مدة الضمان وشروطه بحسب المنتج والشركة المصنعة أو المورد. ويتطلب طلب الضمان عادةً تقديم الفاتورة وفحص المنتج.',
        'لا يشمل الضمان الأضرار الناتجة عن:',
      ],
      bullets: [
        'الاستخدام الخاطئ أو الحوادث.',
        'ضغط هواء غير مناسب.',
        'سوء التركيب لدى جهة أخرى.',
        'مشاكل الزوايا أو التعليق أو الجنوط.',
        'الحمولة الزائدة أو الاستخدام المخالف للمواصفات.',
        'التعديل أو الإصلاح غير المعتمد.',
        'التآكل الطبيعي الناتج عن الاستخدام.',
        'يخضع القرار النهائي لشروط الضمان والفحص الفني والأنظمة المعمول بها.',
      ],
    },
    {
      title: 'الاستخدامات المحظورة',
      paragraphs: ['يلتزم المستخدم بعدم:'],
      bullets: [
        'استخدام الموقع لأي غرض غير قانوني.',
        'محاولة اختراق الموقع أو تعطيله.',
        'إرسال برامج ضارة أو طلبات آلية مكثفة.',
        'انتحال هوية شخص أو جهة أخرى.',
        'نسخ المحتوى أو إعادة استخدامه تجاريًا دون تصريح.',
        'تقديم بيانات كاذبة أو مضللة.',
        'يجوز للشركة تقييد الوصول إلى الموقع عند إساءة استخدامه.',
      ],
    },
    {
      title: 'الملكية الفكرية والخدمات الخارجية',
      paragraphs: [
        'جميع النصوص والتصاميم والصور والرسومات والشعارات والعناصر البرمجية الخاصة بالموقع مملوكة للشركة أو مستخدمة بترخيص.',
        'علامات الشركات المصنعة المعروضة تعود إلى أصحابها، ولا يعني عرضها وجود شراكة أو وكالة حصرية ما لم يُذكر ذلك صراحةً. ولا يجوز نسخ محتوى الموقع أو تعديله أو توزيعه أو استخدامه تجاريًا دون موافقة كتابية مسبقة.',
        'قد يتضمن الموقع روابط أو خدمات مقدمة من أطراف أخرى، مثل واتساب أو الخرائط أو وسائل التواصل الاجتماعي. وتخضع هذه الخدمات لشروط وسياسات الجهات التي تقدمها، ولا تتحمل الشركة مسؤولية محتواها أو توفرها أو ممارساتها.',
      ],
    },
    {
      title: 'إخلاء المسؤولية والتحديثات',
      paragraphs: [
        'نبذل جهدًا معقولًا لتوفير موقع آمن ومعلومات دقيقة، لكننا لا نضمن أن يكون الموقع متاحًا دائمًا أو خاليًا تمامًا من الأخطاء.',
        'في الحدود التي تسمح بها الأنظمة، لا تتحمل الشركة المسؤولية عن خسائر غير مباشرة تنتج عن الاعتماد غير الصحيح على معلومات الموقع أو تعذر الوصول إليه. ولا يحد ذلك من أي مسؤولية لا يجوز استبعادها بموجب النظام.',
        'تخضع معالجة البيانات الشخصية لسياسة الخصوصية المنشورة على الموقع، والتي تُعد جزءًا من هذه الشروط.',
        'يجوز للشركة تحديث هذه الشروط عند الحاجة. تُنشر النسخة المحدثة على هذه الصفحة مع تعديل تاريخ آخر تحديث، ويُعد استمرار استخدام الموقع بعد نشر التحديث موافقةً على الشروط المعدلة.',
      ],
    },
    {
      title: 'القانون والاختصاص والتواصل',
      paragraphs: [
        'تخضع هذه الشروط لأنظمة المملكة العربية السعودية. وتختص الجهات القضائية المختصة في المملكة بالنظر في أي نزاع، مع عدم الإخلال بحقوق المستهلك النظامية.',
        'للاستفسارات المتعلقة بهذه الشروط، يرجى التواصل معنا عبر البيانات التالية:',
      ],
      bullets: [
        'الشركة: شركة إطار الثريا لخدمات السيارات – Mero',
        'الموقع: thurayatires.com',
        'البريد الإلكتروني: info@thurayatires.com',
        'الهاتف/واتساب: 0503598885',
        'العنوان: مجمع أوتو بارك، حي العمل، شارع الأمير فهد بن إبراهيم آل سعود، الملز، الرياض 12644، المملكة العربية السعودية',
      ],
    },
  ],
  en: [
    {
      title: 'Introduction',
      paragraphs: [
        'Welcome to the website of Al Thuraya Automotive Services – Mero. By using this website, you agree to these Terms and Conditions. If you do not agree, please do not use the website.',
        'The website provides general information about our company, automotive products, services, locations and contact channels.',
        'Unless online purchasing is expressly enabled, submitting an enquiry or quotation request does not constitute a completed purchase or binding sales agreement.',
      ],
    },
    {
      title: 'Products, prices and availability',
      paragraphs: ['We make reasonable efforts to provide accurate product information. However:'],
      bullets: [
        'Images, packaging and specifications may differ from available products.',
        'Availability depends on stock and location.',
        'Specifications, prices and promotions may change.',
        'Product compatibility must be confirmed before purchase or installation.',
        'Images are provided for illustrative purposes unless otherwise stated.',
        'Displayed prices may exclude installation, balancing, delivery, taxes or additional services unless expressly stated.',
      ],
    },
    {
      title: 'Quotations and requests',
      paragraphs: [
        'The final approved quotation is the one issued through our official communication channels and remains subject to its stated validity, availability and conditions.',
        'Users must provide accurate vehicle and contact information when submitting a request. An enquiry or appointment request is not confirmed until accepted by the company.',
      ],
    },
    {
      title: 'Compatibility, safety and service times',
      paragraphs: [
        'Products must comply with the vehicle manufacturer’s specifications. The company may refuse to install a product that is incompatible or may affect safety.',
        'Website content is general information and is not a substitute for technical inspection or the vehicle manufacturer’s instructions.',
        'Service times may vary according to product availability, vehicle condition and workload.',
      ],
    },
    {
      title: 'Payment, returns and exchanges',
      paragraphs: [
        'Available payment methods will be communicated when confirming the order or at the branch. Customers must pay the agreed amount before collecting the product or vehicle unless otherwise agreed in writing.',
        'The company will not request bank-card information through unofficial messages. Customers should use only approved company channels.',
        'Returns and exchanges are subject to applicable law and company policy. Installed or used products may not be returnable unless defective or otherwise required by law. Customers should retain the invoice and return the product with its accessories when submitting a request.',
      ],
    },
    {
      title: 'Warranty',
      paragraphs: [
        'Warranty periods and conditions vary according to the product, manufacturer or supplier. Warranty claims generally require proof of purchase and product inspection.',
        'The warranty may exclude damage caused by misuse, accidents, incorrect pressure, excessive load, alignment or suspension problems, unauthorised repair, improper installation or normal wear. The final decision is subject to the warranty terms, technical inspection and applicable law.',
      ],
    },
    {
      title: 'Prohibited use',
      paragraphs: ['Users must not:'],
      bullets: [
        'Use the website unlawfully.',
        'Attempt to access or disrupt protected systems.',
        'Upload malicious code or send excessive automated requests.',
        'Impersonate another person or organisation.',
        'Copy or commercially reuse content without permission.',
        'Submit false or misleading information.',
        'The company may restrict access where the website is misused.',
      ],
    },
    {
      title: 'Intellectual property and third-party services',
      paragraphs: [
        'Website content, design, graphics, software and Mero branding are owned by or licensed to the company.',
        'Third-party manufacturers’ trademarks remain the property of their respective owners. Their display does not imply an exclusive agency or partnership unless expressly stated.',
        'The website may contain links to services such as WhatsApp, maps and social media platforms. These services are governed by their providers’ own terms and policies.',
      ],
    },
    {
      title: 'Disclaimer and updates',
      paragraphs: [
        'We make reasonable efforts to maintain an accurate and secure website but do not guarantee uninterrupted availability or the complete absence of errors.',
        'To the extent permitted by law, the company is not responsible for indirect losses caused by improper reliance on website information or temporary website unavailability. Nothing in these terms excludes liability that cannot legally be excluded.',
        'Personal information is processed according to our published Privacy Policy, which forms part of these Terms and Conditions.',
        'We may update these terms when necessary. The updated version and revision date will be published on this page. Continued use after an update means acceptance of the revised terms.',
      ],
    },
    {
      title: 'Governing law and contact',
      paragraphs: [
        'These terms are governed by the laws and regulations of the Kingdom of Saudi Arabia. Disputes are subject to the jurisdiction of the competent Saudi authorities and courts, without prejudice to statutory consumer rights.',
        'For questions about these terms, please contact us:',
      ],
      bullets: [
        'Company: Al Thuraya Automotive Services – Mero',
        'Website: thurayatires.com',
        'Email: info@thurayatires.com',
        'Telephone/WhatsApp: 0503598885',
        'Address: Auto Park Complex, Al Amal District, Prince Fahd bin Ibrahim Al Saud Street, Al Malaz, Riyadh 12644, Saudi Arabia.',
      ],
    },
  ],
};

export default function LegalPage({ locale, type }: { locale: Locale; type: 'privacy' | 'terms' }) {
  const english = locale === 'en';
  const privacy = type === 'privacy';
  return (
    <main dir={english ? 'ltr' : 'rtl'} className="min-h-screen bg-void text-white">
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
          {english ? 'Last updated: September 18, 2026' : 'آخر تحديث: 18 سبتمبر 2026'}
        </p>
        <div className="mt-8 space-y-8 text-sm leading-8 text-muted">
          {(privacy ? privacySections[locale] : termsSections[locale]).map((section) => (
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
