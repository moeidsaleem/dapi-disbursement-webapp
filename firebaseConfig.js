// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNkNLyf4JTzlVE4lT3m9XNbxJwBZNEkxQ",
  authDomain: "seesy-9b09c.firebaseapp.com",
  projectId: "seesy-9b09c",
  storageBucket: "seesy-9b09c.appspot.com",
  messagingSenderId: "872794002343",
  appId: "1:872794002343:web:7393ce1d88601cdb09dc82",
  measurementId: "G-B3202GGWJY",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
