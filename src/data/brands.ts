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
] as const;

export const brands: Brand[] = brandNames.map(([id, name]) => ({
  id,
  name,
  logo: `/images/brands/${id}.png`,
  alt: name,
}));
