import { app, database } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const getUsersQuery = () => {
  // easily check the loading status

  const q = query(collection(database, "users"));

  let getUsers = async () => {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };
};
