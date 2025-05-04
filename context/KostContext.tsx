import React, { createContext, useContext, useState } from 'react';
import { KostItem } from '../types';

type KostContextType = {
  kosts: KostItem[];
  addKost: (kost: Omit<KostItem, 'id'>) => void;
  updateKost: (id: string, kost: Partial<KostItem>) => void;
  deleteKost: (id: string) => void;
};

export const KostContext = createContext<KostContextType | undefined>(
  undefined
);

export const KostProvider = ({ children }: { children: React.ReactNode }) => {
  const [kosts, setKosts] = useState<KostItem[]>([]);

  const addKost = (kost: Omit<KostItem, 'id'>) => {
    const newKost = {
      ...kost,
      id: Date.now().toString() // Generate unique ID
    };
    setKosts((prev) => [...prev, newKost]);
  };

  const updateKost = (id: string, updatedKost: Partial<KostItem>) => {
    setKosts((prev) =>
      prev.map((kost) => (kost.id === id ? { ...kost, ...updatedKost } : kost))
    );
  };

  const deleteKost = (id: string) => {
    setKosts((prev) => prev.filter((kost) => kost.id !== id));
  };

  return (
    <KostContext.Provider value={{ kosts, addKost, updateKost, deleteKost }}>
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
