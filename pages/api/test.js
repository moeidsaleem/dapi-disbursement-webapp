// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

var admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: "AIzaSyDNkNLyf4JTzlVE4lT3m9XNbxJwBZNEkxQ",
  authDomain: "seesy-9b09c.firebaseapp.com",
  projectId: "seesy-9b09c",
  storageBucket: "seesy-9b09c.appspot.com",
  messagingSenderId: "872794002343",
  appId: "1:872794002343:web:7393ce1d88601cdb09dc82",
  measurementId: "G-B3202GGWJY",
};

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccountKey.json");

const db = getFirestore();

export default async function handler(req, res) {
  try {
    db.collection("users").doc("test").set({
      name: "",
      email: "",
      accessToken: "",
    });
    res.json({ name: "John Doe" });
  } catch (error) {
    //Handle Network Errors
    console.dir(error);
  }
}
