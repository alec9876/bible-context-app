// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD5Y3Qtbd60Dm4ZqvvDaxtQiFnA_DAC3s",
  authDomain: "biblecontext-18aff.firebaseapp.com",
  projectId: "biblecontext-18aff",
  storageBucket: "biblecontext-18aff.appspot.com",
  messagingSenderId: "887947274747",
  appId: "1:887947274747:web:ba09fb2161ffe2f3d6835e",
  measurementId: "G-JF3N9QP1BW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
