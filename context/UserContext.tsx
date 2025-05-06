import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { createContext, useContext, useState } from 'react';
import { db } from '../config/firebase';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  image?: string;
}

type UserContextType = {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const q = query(
        collection(db, 'users'),
        where('username', '==', username),
        where('password', '==', password)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data() as User;
        setCurrentUser({ ...userData, id: userDoc.id });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      // Check if username already exists
      const q = query(
        collection(db, 'users'),
        where('username', '==', data.username)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return false;
      }

      // Create new user
      const newUser = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'users'), newUser);
      setCurrentUser({ ...newUser, id: docRef.id });
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
