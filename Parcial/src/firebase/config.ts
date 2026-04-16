import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAQFVGOjhQ586rfW_x2JL5SIUcCFCDuN90",
  authDomain: "parcial2-cc1fe.firebaseapp.com",
  databaseURL: "https://parcial2-cc1fe-default-rtdb.firebaseio.com/",
  projectId: "parcial2-cc1fe",
  storageBucket: "parcial2-cc1fe.firebasestorage.app",
  messagingSenderId: "1008903589917",
  appId: "1:1008903589917:web:8da2868f3f8ab2b0c0f6f4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);