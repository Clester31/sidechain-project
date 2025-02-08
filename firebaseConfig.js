// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCChGXbeeg4kHkn_tOeE_b00bhdhyWbG5I",
  authDomain: "sidechain-project.firebaseapp.com",
  projectId: "sidechain-project",
  storageBucket: "sidechain-project.firebasestorage.app",
  messagingSenderId: "786607720275",
  appId: "1:786607720275:web:8fb79ce06d3896b2c903a6",
  measurementId: "G-0LP499YSSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);