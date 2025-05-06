import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase';

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
  createdAt: string;
  updatedAt: string;
}

type KostContextType = {
  kosts: KostItem[];
  addKost: (kost: Omit<KostItem, 'id'>) => Promise<boolean>;
  updateKost: (id: string, kost: Partial<KostItem>) => void;
  deleteKost: (id: string) => void;
  loading: boolean;
};

export const KostContext = createContext<KostContextType | undefined>(
  undefined
);

export const KostProvider = ({ children }: { children: React.ReactNode }) => {
  const [kosts, setKosts] = useState<KostItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch kosts on mount
  useEffect(() => {
    const fetchKosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'kosts'));
        const kostsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as KostItem[];
        setKosts(kostsData);
      } catch (error) {
        console.error('Error fetching kosts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKosts();
  }, []);

  const addKost = async (kost: Omit<KostItem, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'kosts'), kost);
      const newKost = { ...kost, id: docRef.id } as KostItem;
      setKosts((prev) => [...prev, newKost]);
      return true;
    } catch (error) {
      console.error('Error adding kost:', error);
      throw error;
    }
  };

  const updateKost = async (id: string, updatedKost: Partial<KostItem>) => {
    try {
      const kostRef = doc(db, 'kosts', id);
      await updateDoc(kostRef, updatedKost);
      setKosts((prev) =>
        prev.map((kost) =>
          kost.id === id ? { ...kost, ...updatedKost } : kost
        )
      );
    } catch (error) {
      console.error('Error updating kost:', error);
      throw error;
    }
  };

  const deleteKost = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'kosts', id));
      setKosts((prev) => prev.filter((kost) => kost.id !== id));
    } catch (error) {
      console.error('Error deleting kost:', error);
      throw error;
    }
  };

  return (
    <KostContext.Provider
      value={{ kosts, addKost, updateKost, deleteKost, loading }}>
      {children}
    </KostContext.Provider>
  );
};

export const useKost = () => {
  const context = useContext(KostContext);
  if (undefined === context) {
    throw new Error('useKost must be used within a KostProvider');
  }
  return context;
};
