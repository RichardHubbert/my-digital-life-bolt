import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyARPPFyqwW6XWVuQfEQujJhUhRHwE2hr1s",
  authDomain: "my-digital-life-b4a40.firebaseapp.com",
  projectId: "my-digital-life-b4a40",
  storageBucket: "my-digital-life-b4a40.firebasestorage.app",
  messagingSenderId: "876838003078",
  appId: "1:876838003078:web:fd87c172bd010de5d74c07"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser doesn\'t support persistence.');
  }
});