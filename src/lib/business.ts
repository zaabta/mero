import {branches} from '@/data/branches';
import {SITE_URL} from '@/lib/site';

const mainBranch = branches.find((branch) => branch.isMain) ?? branches[0];

export const BUSINESS = {
  brandName: 'Mero',
  legalNameAr: 'شركة إطار الثريا لخدمات السيارات',
  legalNameEn: 'Al Thuraya Automotive Services',
  countryCode: 'SA',
  countryAr: 'المملكة العربية السعودية',
  countryEn: 'Saudi Arabia',
  cityAr: 'الرياض',
  cityEn: 'Riyadh',
  postalCode: '12644',
  phone: '+966112204999',
  phoneLocal: mainBranch.phone,
  whatsapp: '+966503598885',
  email: 'Thrya.tire@gmail.com',
  infoEmail: 'info@thurayatires.com',
  addressAr:
    'مجمع أوتو بارك، شارع الأمير فهد بن إبراهيم آل سعود، حي الملز، الرياض 12644، المملكة العربية السعودية',
  addressEn:
    'Auto Park Complex, Prince Fahd bin Ibrahim Al Saud Street, Al Malaz, Riyadh 12644, Saudi Arabia',
  streetAddressAr: 'شارع الأمير فهد بن إبراهيم آل سعود، حي الملز',
  streetAddressEn: 'Prince Fahd bin Ibrahim Al Saud Street, Al Malaz',
  latitude: mainBranch.latitude,
  longitude: mainBranch.longitude,
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Prince+Fahd+bin+Ibrahim+Al+Saud+Street+Riyadh+Saudi+Arabia',
  url: SITE_URL,
  logoUrl: `${SITE_URL}/mero-logo-white-gold.svg`,
  serviceArea: 'Saudi Arabia',
  languages: ['ar', 'en'] as const,
} as const;
