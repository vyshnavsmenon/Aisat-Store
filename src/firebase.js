// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV797d5eB8ByM1VFtduaULQjMe3QetHk0",
  authDomain: "aisat-store-bff3e.firebaseapp.com",
  projectId: "aisat-store-bff3e",
  storageBucket: "aisat-store-bff3e.appspot.com",
  messagingSenderId: "720487515837",
  appId: "1:720487515837:web:18d03fcb444c8f5bd259d4",
  measurementId: "G-XLSX57L9VH"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
