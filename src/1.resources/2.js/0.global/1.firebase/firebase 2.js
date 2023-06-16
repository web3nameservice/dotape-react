// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBiPozIkw70NPIYXOy1Z2_GX1p_A3V48nc",
    authDomain: "dot-ape.firebaseapp.com",
    projectId: "dot-ape",
    storageBucket: "dot-ape.appspot.com",
    messagingSenderId: "157381839834",
    appId: "1:157381839834:web:b8e22f48fa408b208e8ee3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();