export type Branch = {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  address: {
    ar: string;
    en: string;
  };
  phone: string;
  latitude: number;
  longitude: number;
  isMain?: boolean;
};

export const branches: Branch[] = [
  {
    id: 'riyadh-main',
    name: {
      ar: 'الفرع الرئيسي – الرياض',
      en: 'Main Branch – Riyadh',
    },
    address: {
      ar: 'الرياض – حي الملز – مجمع كار بارك – شارع الأمير فهد بن إبراهيم آل سعود – الرمز البريدي: 12644',
      en: 'Riyadh – Al Malaz District – Car Park Complex – Prince Fahd bin Ibrahim Al Saud Street – Postal Code: 12644',
    },
    phone: '011 220 4999',
    latitude: 24.6488506,
    longitude: 46.7291548,
    isMain: true,
  },
];
