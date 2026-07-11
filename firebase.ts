
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD3ubJkCcXmxl8qsYwsQrA2PDQaxHjEur4",
  authDomain: "ai-notion-27e5c.firebaseapp.com",
  projectId: "ai-notion-27e5c",
  storageBucket: "ai-notion-27e5c.firebasestorage.app",
  messagingSenderId: "650545211402",
  appId: "1:650545211402:web:f13bde877ab9dd8fca17f3",
  measurementId: "G-JXENLG537X",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig): getApp();
export const db = getFirestore(app);


