import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { app, database } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { CashIcon, UserIcon } from "@heroicons/react/solid";
export default function MyCircles() {
  let [circles, setCircles] = useState([]);
  let [selectedCircle, setSelectedCircle] = useState(null);

  const q = query(collection(database, "circles"));

  let getCircles = async () => {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };
  useEffect(() => {
    getCircles().then((data) => {
      setCircles(data);
    });
  }, []);

  let handleClick = (circle) => {
    setSelectedCircle(circle);
  };

  return (
    <Layout>
      <div className="flex">
        <div className="flex border mx-20 p-20 rounded-lg">
          <div className=" justify-left">
            <h1 className="text-2xl font-bold">My Circles</h1>
            <div className="flex flex-col">
              {circles.map(
                (circle) => {
                  return (
                    <div
                      key={circle.id}
                      value={JSON.stringify(circle)}
                      className="flex bg-gray-400 my-2 p-2 uppercase text-white rounded-lg hover:bg-black"
                      onClick={() => handleClick(circle)}
                    >
                      {circle.name}
                    </div>
                  );
                } // end of map
              )}
            </div>
          </div>
        </div>
        {selectedCircle && (
          <div className="flex mx-20 p-20 border rounded-xl">
            <div className=" justify-center">
              <h1 className="text-2xl font-bold uppercase bg-sky-500/20 px-2 py-1 rounded-lg text-sky-500">
                {selectedCircle.name}{" "}
              </h1>
              <p>{selectedCircle.description}</p>
              <div className="flex flex-col mt-2 bg-gray-500/10 py-2 px-1">
                Circle By
                <span className="font-bold">{selectedCircle.creatorName}</span>
              </div>
              <div className="flex flex-col my-5">
                <div>
                  <h2 className="text-md font-bold">Members</h2>
                  <div className="flex flex-col">
                    {selectedCircle.users.map(
                      (member) => {
                        return (
                          <div
                            key={member.id}
                            value={JSON.stringify(member)}
                            className="flex bg-gray-400/10 my-2 p-2 uppercase text-gray-700 rounded-lg hover:bg-black hover:text-white"
                          >
                            <UserIcon className="w-6 h-6 inline " />{" "}
                            {member.name}{" "}
                            <span
                              className={
                                member.status == "unpaid"
                                  ? "text-red-500"
                                  : "text-green-500"
                              }
                            >
                              ( {member.status} )
                            </span>
                            <span>
                              <CashIcon className="w-6 h-6 inline " />{" "}
                              {selectedCircle.amount /
                                selectedCircle.users.length}{" "}
                              AED
                            </span>
                          </div>
                        );
                      } // end of map
                    )}
                  </div>
                  <div
                    key={selectedCircle.id}
                    value={JSON.stringify(selectedCircle)}
                    className="flex bg-green-400 font-extrabold my-2 p-2 uppercase text-white rounded-lg hover:bg-black"
                    onClick={() => handleClick(selectedCircle)}
                  >
                    Make Payment of {selectedCircle.amount}{" "}
                    <CashIcon className="h-6 w-6 inline mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
