export interface KostItem {
  id: string;
  name: string;
  price: string;
  type: 'Putra' | 'Putri' | 'Campur';
  image: string;
  facilities: {
    wifi: boolean;
    ac: boolean;
    shower: boolean;
    toilet: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
