import { app, database } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function UserList({ onClick }) {
  // easily check the loading status

  const q = query(collection(database, "users"));
  const [users, setUsers] = useState([]);

  let getUsers = async () => {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  if (!users) {
    return <label>Loading...</label>;
  }

  return (
    <div className="flex flex-col">
      <label className="text-gray-700">Select Users</label>

      <label className="underline  bg-gray-500/10 font-bold">
        Select Users
      </label>
      {users.map(
        (user) => {
          return (
            <div
              key={user.id}
              value={JSON.stringify(user)}
              className="flex bg-gray-400 my-2 p-2 uppercase text-white rounded-lg hover:bg-black"
              onClick={() => onClick(JSON.stringify(user))}
            >
              {user.name}
            </div>
          );
        } // end of map
      )}
    </div>
  );
}
