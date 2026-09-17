import Logo from './MeroLogo';
import { Mail, MapPin, Phone } from 'lucide-react';
import { BadgeCheck } from 'lucide-react';

export default function Footer({ english = false, locale = 'ar' }: { english?: boolean; locale?: string }) {
    return (
        <footer
            dir={english ? 'ltr' : 'rtl'}
            className="w-full border-t border-white/10 bg-[#08090a] pt-16 text-white lg:pt-20"
        >
            <div className="container">
                <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 lg:grid-cols-12 lg:gap-8">
                    <div
                        dir={english ? 'ltr' : 'rtl'}
                        className={`flex flex-col items-start gap-4 lg:col-span-4 ${english ? 'text-left' : 'text-right'}`}
                    >
                        <Logo english={english} large />
                        <span className="text-[11px] text-muted">
                            {english
                                ? 'AL THURAYA TIRES AUTO SERVICES CO. • Wholesale & Retail Tires Trading'
                                : 'شركة إطار الثريا لخدمات السيارات • تجارة الكفرات بالجملة والتجزئة'}
                        </span>
                        <div className="grid gap-1 text-xs text-muted">
                            <span>
                                {english ? 'VAT No.: 314664394700003' : 'الرقم الضريبي: 314664394700003'}
                            </span>
                            <span>{english ? 'CR No.: 7053792292' : 'السجل التجاري: 7053792292'}</span>
                        </div>
                        <p
                            dir={english ? 'ltr' : 'rtl'}
                            className={`w-full max-w-md text-sm leading-7 text-muted ${english ? 'text-left' : 'text-right'}`}
                        >
                            {english
                                ? 'A trusted reference for tire solutions and premium automotive engineering services across Saudi Arabia.'
                                : 'المرجع الرائد في حلول الإطارات وخدمات هندسة السيارات الفاخرة في المملكة العربية السعودية.'}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-semibold text-gold">
                            <BadgeCheck size={18} />
                            <span>
                                {english
                                    ? 'Certified to SASO & GSO standards'
                                    : 'معتمد ومطابق للمقاييس الخليجية SASO و GSO'}
                            </span>
                        </div>
                    </div>

                    <div
                        className={`flex flex-col gap-3 lg:col-span-2 ${english ? 'text-left' : 'text-right'}`}
                    >
                        <h3 className="font-arabic text-sm font-bold text-gold">
                            {english ? 'Quick links' : 'روابط سريعة'}
                        </h3>
                        <nav className="flex flex-col gap-2 text-xs text-muted">
                            <a className="transition-colors hover:text-gold" href="#top">
                                {english ? 'Home' : 'الرئيسية'}
                            </a>
                            <a className="transition-colors hover:text-gold" href="#about">
                                {english ? 'About us' : 'من نحن'}
                            </a>
                            <a className="transition-colors hover:text-gold" href="#products">
                                {english ? 'Products and tires' : 'المنتجات وتشكيلة الإطارات'}
                            </a>
                            <a className="transition-colors hover:text-gold" href="#brands">
                                {english ? 'Partner brands' : 'العلامات التجارية الشريكة'}
                            </a>
                            <a className="transition-colors hover:text-gold" href={`/${locale}/blog`}>
                                {english ? 'Technical blog' : 'المدونة الفنية'}
                            </a>
                            <a className="transition-colors hover:text-gold" href="#contact">
                                {english ? 'Service and contact' : 'مراكز الخدمة والصيانة'}
                            </a>
                        </nav>
                    </div>

                    <div
                        className={`flex flex-col gap-3 lg:col-span-3 ${english ? 'text-left' : 'text-right'}`}
                    >
                        <h3 className="font-arabic text-sm font-bold text-gold">
                            {english ? 'Main branch' : 'الفرع الرئيسي'}
                        </h3>
                        <div className="flex flex-col gap-3 text-xs leading-6 text-muted">
                            <div className="flex items-start gap-2">
                                <MapPin className="mt-1 shrink-0 text-gold" size={16} />
                                <span>
                                    {english
                                        ? 'Riyadh – Al Malaz District – Car Park Complex – Prince Fahd bin Ibrahim Al Saud Street'
                                        : 'الرياض - حي الملز - مجمع كار بارك - شارع الأمير فهد بن إبراهيم آل سعود'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="shrink-0 text-gold" size={16} />
                                <a href="tel:0112204999" dir="ltr">
                                    011 220 4999
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="shrink-0 text-gold">〒</span>
                                <span>{english ? 'Postal Code: 12644' : 'الرمز البريدي: 12644'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="shrink-0 text-gold" size={16} />
                                <a href="mailto:Thrya.tire@gmail.com" dir="ltr">
                                    Thrya.tire@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`flex flex-col gap-3 lg:col-span-3 ${english ? 'text-left' : 'text-right'}`}
                    >
                        <h3 className="font-arabic text-sm font-bold text-gold">
                            {english ? 'Business activity' : 'النشاط التجاري'}
                        </h3>
                        <div className="flex flex-col gap-3 text-xs leading-6 text-muted">
                            <div className="flex items-start gap-2">
                                <MapPin className="mt-1 shrink-0 text-gold" size={16} />
                                <span>
                                    {english
                                        ? 'Wholesale and retail tire trading'
                                        : 'تجارة الكفرات بالجملة والتجزئة'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="shrink-0 text-gold" size={16} />
                                <a href="mailto:Thrya.tire@gmail.com" dir="ltr">
                                    Thrya.tire@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted sm:flex-row">
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                        <span>{english ? 'All rights reserved © 2026' : 'جميع الحقوق محفوظة © 2026'}</span>
                        <span className="font-semibold text-gold">
                            {english
                                ? 'Al Thuraya Automotive Services (MERO)'
                                : 'شركة إطار الثريا لخدمات السيارات (MERO)'}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-5">
                        <a className="transition-colors hover:text-gold" href={`/${locale}/privacy`}>
                            {english ? 'Privacy policy' : 'سياسة الخصوصية'}
                        </a>
                        <a className="transition-colors hover:text-gold" href={`/${locale}/terms`}>
                            {english ? 'Terms and conditions' : 'الشروط والأحكام'}
                        </a>
                        <a className="transition-colors hover:text-gold" href="#certifications">
                            {english ? 'Quality standards' : 'شهادة الجودة والمقاييس'}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}