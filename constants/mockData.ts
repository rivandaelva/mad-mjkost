import { KostItem } from '../types';

export const mockData: KostItem[] = [
  {
    id: '1',
    name: 'Kost A',
    image: 'https://via.placeholder.com/50',
    facilities: { wifi: true, ac: true, shower: true, toilet: true }
  },
  {
    id: '2',
    name: 'Kost B',
    image: 'https://via.placeholder.com/50',
    facilities: { wifi: true, ac: false, shower: true, toilet: true }
  },
  {
    id: '3',
    name: 'Kost C',
    image: 'https://via.placeholder.com/50',
    facilities: { wifi: true, ac: true, shower: false, toilet: true }
  }
];
