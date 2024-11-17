import { getApps, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBWoi0498RpkA7yTCegyZzyDfbj_46rsmI',
  authDomain: 'tirinhas-5e921.firebaseapp.com',
  databaseURL: 'https://tirinhas-5e921-default-rtdb.firebaseio.com',
  projectId: 'tirinhas-5e921',
  storageBucket: 'tirinhas-5e921.firebasestorage.app',
  messagingSenderId: '733066800550',
  appId: '1:733066800550:web:4574c4a85810773699f367',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

export { database };
