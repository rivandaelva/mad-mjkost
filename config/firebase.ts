import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCIl-86_yYA56kjGBuSjSm6CAHR5lQhsHo',
  authDomain: 'mj-kost.firebaseapp.com',
  projectId: 'mj-kost',
  storageBucket: 'mj-kost.firebasestorage.app',
  messagingSenderId: '885825939786',
  appId: '1:885825939786:web:adbb7911ea9c2c865bf9b3',
  databaseURL: 'https://mj-kost-default-rtdb.firebaseio.com/',
  measurementId: 'G-3JX0K2F5Z9'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
