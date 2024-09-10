// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5V4GBzukMbxRwSmz-i6IhF4RZhITJX6g",
  authDomain: "expense-tracker-5949b.firebaseapp.com",
  projectId: "expense-tracker-5949b",
  storageBucket: "expense-tracker-5949b.appspot.com",
  messagingSenderId: "1062481941681",
  appId: "1:1062481941681:web:b40a1efb0b5ae882ae3e90",
  measurementId: "G-715C5MJ7ZF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, onAuthStateChanged, signOut };
