export type Brand = {
  id: string;
  name: string;
  logo: string;
  alt: string;
};

const brandNames = [
  ['michelin', 'Michelin'],
  ['bfgoodrich', 'BFGoodrich'],
  ['pirelli', 'Pirelli'],
  ['continental', 'Continental'],
  ['dunlop', 'Dunlop'],
  ['bridgestone', 'Bridgestone'],
  ['yokohama', 'Yokohama'],
  ['firestone', 'Firestone'],
  ['hankook', 'Hankook'],
  ['kumho', 'Kumho Tires'],
  ['nexen', 'Nexen Tire'],
  ['roadstone', 'Roadstone'],
  ['goodyear', 'Goodyear'],
  ['landspider', 'Landspider'],
  ['roadboss', 'ROADBOSS'],
  ['toyo-tires', 'Toyo Tires'],
  ['cooper', 'Cooper Tires'],
  ['wideway', 'Wideway Tires'],
  ['sailun', 'Sailun'],
  ['sumitomo', 'Sumitomo'],
  ['marshal', 'Marshal Tire'],
  ['tesche', 'Tesche'],
  ['sonar', 'Sonar Tires'],
] as const;

export const brands: Brand[] = brandNames.map(([id, name]) => ({
  id,
  name,
  logo: `/images/brands/${id}.png`,
  alt: name,
}));
