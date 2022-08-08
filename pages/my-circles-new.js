import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { app, database } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { useBa } from "../context/BaContext";

import { useRouter } from "next/router";
import { CashIcon, UserIcon } from "@heroicons/react/solid";
export default function MyCirclesNew() {
  let [circles, setCircles] = useState([]);
  let [selectedCircle, setSelectedCircle] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const { ba, setBa } = useBa();
  const [selectedAccount, setSelectedAccount] = useState(null);

  const q = query(collection(database, "circles"));

  let getCircles = async () => {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };
  useEffect(() => {
    getAccounts();

    getCircles().then((data) => {
      setCircles(data);
    });
  }, []);

  let handleClick = (circle, amount) => {
    setSelectedCircle(circle);
  };

  const getAccounts = async () => {
    console.log("handleClick");
    if (ba) {
      const accounts = await ba.data.getAccounts();
      setAccounts(accounts.accounts);
      setSelectedAccount(accounts.accounts[0].id);
      console.log(accounts);
    } else {
      console.log("ba is not set");
      alert("dapi not set");
      // router.push("/login");
    }
  };

  const updateCircleToDatabase = async (request) => {
    const circleRef = doc(database, "circles", request.id);

    await updateDoc(circleRef, {
      users: selectedCircle.users,
    });
  };

  const handleSendMoney = async (e, amount) => {
    console.log("sending money", amount);
    console.log("sending circle", e);
    console.log("selected account", selectedAccount);

    /*     var transfer = {
      senderID: selectedAccount,
      receiverID: e.creatorId,
      accountNumber: e.creatorAccountNumber,
      name: e.creatorName,
      iban: e.creatorIban,
      amount: Number(amount),
      remarks: "simple-transfer",
      beneificiary: e
    }; */

    var transfer = {
      senderID: selectedAccount,
      amount: Number(amount),
      remarks: "new-payment",
      beneficiary: e.creator,
    };
    console.log("transfer", transfer);

    if (ba) {
      console.log("transfer", transfer);
      const autoTransferResponse = await ba.payment.transferAutoflow(transfer);

      if (autoTransferResponse.status == "done") {
        console.log("response", autoTransferResponse);
        let index = selectedCircle.users.findIndex(
          (item) => item.iban == accounts[0].iban
        );
        console.log("index", index);
        selectedCircle.users[index].status = "paid";
        updateCircleToDatabase(selectedCircle);
        // selectedCircle.users[index].status = "paid";
        // await updateDoc(collection(database, "circles"), selectedCircle.id, {
        //   users: selectedCircle.users,
        // });

        alert("Transfer Successful");
      } else {
        alert(autoTransferResponse.msg);
        return;
      }
    }
  };

  return (
    <Layout>
      <div className="flex">
        <div className="flex border mx-20 p-20 rounded-lg">
          <div className=" justify-left">
            <h1 className="text-2xl font-bold">My Circles New</h1>
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
                {selectedAccount === selectedCircle.creatorId && (
                  <span className="text-red-500 text-sm">
                    ( You are the Admin )
                  </span>
                )}
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
                            <span className="capitalize">
                              {String(member.id)}
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
                  {String(selectedAccount)}
                  <br />
                  {String(selectedCircle.creatorId)}
                  {selectedAccount === selectedCircle.creatorId ? (
                    <>
                      <button className="flex bg-green-400 font-extrabold my-2 p-2 uppercase text-white rounded-lg hover:bg-black">
                        Close Circle
                      </button>
                    </>
                  ) : selectedCircle.users.find(
                      (item) => item.status == "unpaid"
                    ) ? (
                    <div
                      key={selectedCircle.id}
                      value={JSON.stringify(selectedCircle)}
                      className="flex bg-green-400 font-extrabold my-2 p-2 uppercase text-white rounded-lg hover:bg-black"
                      onClick={() =>
                        handleSendMoney(
                          selectedCircle,
                          selectedCircle.amount / selectedCircle.users.length
                        )
                      }
                    >
                      Make Payment of{" "}
                      {selectedCircle.amount / selectedCircle.users.length}{" "}
                      <CashIcon className="h-6 w-6 inline mx-auto" />
                    </div>
                  ) : (
                    <button className="flex bg-blue-400 font-extrabold my-2 p-2 uppercase text-white rounded-lg hover:bg-black">
                      Already Paid
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
