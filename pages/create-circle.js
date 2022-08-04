import { useEffect, useState } from "react";
import Layout from "../components/layout";
import UserList from "../components/user-list";
import { collection, addDoc, arrayUnion } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { useBa } from "../context/BaContext";
import { useRouter } from "next/router";

export default function CreateCircle(props) {
  let [data, SetData] = useState({
    name: "",
    description: "",
    amount: 0,
    users: [],
  });
  const { ba, setBa } = useBa();
  const router = useRouter();
  const [beneficiaries, setBeneficiaries] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [identity, setIdentity] = useState(null);

  const getBeneficiaries = async () => {
    console.log("handleClick");
    if (ba) {
      const beneficiaries = await ba.payment.getBeneficiaries();
      setBeneficiaries(beneficiaries.beneficiaries);
    } else {
      console.log("ba is not set");
      alert("dapi not set");
      // router.push("/login");
    }
  };
  const getAccounts = async () => {
    console.log("handleClick");
    if (ba) {
      const accounts = await ba.data.getAccounts();
      console.log("accounts", accounts);
      setAccounts(accounts.accounts[0]);
    } else {
      console.log("ba is not set");
      alert("dapi not set");
      // router.push("/login");
    }
  };

  const getIdentity = async () => {
    console.log("handleClick");
    if (ba) {
      const identity = await ba.data.getIdentity();
      setIdentity(identity.identity);
    } else {
      console.log("ba is not set");
      router.push("/login");
    }
  };

  useEffect(() => {
    getBeneficiaries();
    getAccounts();
    getIdentity();
  }, []);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const addCircleToDatabase = (request) => {
    addDoc(collection(database, "circles"), {
      ...request,
    });

    // data.creatorId = "mrH1xA5holchguH9rknc";
    // data.creatorName = "Moeid Saleem";

    // let test = {
    //   name: "test",
    //   description: "test",
    //   image: "test",
    // };

    // await setDoc(docRef, test);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log("accounts", accounts);
    console.log("identity", identity);

    SetData({
      ...data,
      users: selectedUsers,
      creatorId: accounts.id,
      creatorIban: accounts.iban,
      creatorAccountNumber: accounts.number,
      creatorName: identity.name,
      creatorEmail: identity.emailAddress,
    });

    // need to add creator details to the circle

    // Add a new document with a generated id.
    data.users.map((user) => {
      user.status = "unpaid";
      return user;
    });
    console.log("request", data);

    addCircleToDatabase(Object.assign({}, data));
  };
  return (
    <Layout>
      <div className="flex">
        <div className=" justify-center">
          <h1 className="text-2xl font-bold">Create a Circle</h1>
          <form className="" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-gray-700">Circle Name</label>
              <input
                name="name"
                className="border border-gray-500 p-2 w-full"
                type="text"
                value={data.name}
                onChange={(e) => SetData({ ...data, name: e.target.value })}
                placeholder="Circle Name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Circle Description</label>
              <input
                name="description"
                className="border border-gray-500  p-2 w-full"
                type="text"
                value={data.description}
                onChange={(e) =>
                  SetData({ ...data, description: e.target.value })
                }
                placeholder="Circle Description"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700">Total Amount</label>
              <input
                name="number"
                className="border border-gray-500 p-2 w-full"
                type="text"
                value={data.amount}
                onChange={(e) => SetData({ ...data, amount: e.target.value })}
                placeholder="Circle total Amount"
              />
            </div>
            <div className="flex flex-col">
              {/* <UserList
                onClick={(e) => {
                  selectedUsers.push(JSON.parse(e));
                  setSelectedUsers(selectedUsers);
                }}
              /> */}
            </div>
            <div className="flex flex-row">
              {beneficiaries && beneficiaries.length > 0
                ? beneficiaries.map(
                    (user) => {
                      return (
                        <button
                          onClick={(e) => {
                            if (selectedUsers.find((u) => u.id === user.id)) {
                              alert("user already selected");
                              return;
                            }

                            setSelectedUsers(selectedUsers.concat(user));
                          }}
                          key={user.id}
                          className={
                            "flex  my-2 p-2 uppercase text-white rounded-lg hover:bg-black" +
                            (selectedUsers.find((u) => u.id === user.id)
                              ? " bg-red-400 "
                              : " bg-blue-500")
                          }
                        >
                          {user.name}
                        </button>
                      );
                    } // end of map
                  ) // end of return
                : null}
            </div>
            <div className="flex mt-6">
              <button className="bg-sky-400 w-full hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
