const firebaseConfig = {
  apiKey: "AIzaSyDNkNLyf4JTzlVE4lT3m9XNbxJwBZNEkxQ",
  authDomain: "seesy-9b09c.firebaseapp.com",
  projectId: "seesy-9b09c",
  storageBucket: "seesy-9b09c.appspot.com",
  messagingSenderId: "872794002343",
  appId: "1:872794002343:web:7393ce1d88601cdb09dc82",
  measurementId: "G-B3202GGWJY",
};

// File: lib/firebase.js

import admin from "firebase-admin";
// import { fireConfig } from './fireConfig'

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
  console.log("Initialized.");
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export default admin;
