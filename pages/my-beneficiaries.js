import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useBa } from "../context/BaContext";

export default function MyBeneficiaries() {
  const { ba, setBa } = useBa();
  const [data, setData] = useState(null);
  const [showAddBeneficiary, setShowAddBeneficiary] = useState(false);
  const [amount, setAmount] = useState(0);
  const [accounts, setAccounts] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [beneficiary, setBeneficiary] = useState({
    name: "Hassam Ali",
    nickname: "hassamali",
    iban: "DAPIBANKAEENBD1659565892130586687206",
    accountNumber: "1659565892130586687206",
    type: "local",
    swiftCode: "DAPIBANK_AE_ENBD",
    address: {
      line1: "Maryam Street",
      line2: "Abu Dhabi",
      line3: "United Arab Emirates",
    },
    country: "United Arab Emirates",
    branchAddress: "Dubai Mall",
    branchName: "Main Branch",
  });
  const [errMessage, setErrMessage] = useState("");
  const [createResponse, setCreateResponse] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (ba) {
      getBeneficiaries();
      getAccounts();
    } else {
      console.log("ba is not set");
      alert("dapi not set");
      router.push("/login");
    }
  }, [ba]);

  useEffect(() => {
    if (createResponse) {
      setErrMessage("");
      setBeneficiary({
        name: "",
        nickname: "",
        iban: "",
        accountNumber: "",
        type: "",
        swiftCode: "",
        address: {
          line1: "",
          line2: "",
          line3: "",
        },
        country: "",
        branchAddress: "",
        branchName: "",
      });
      setShowAddBeneficiary(false);
      getBeneficiaries();
    }
  }, [createResponse]);

  const getBeneficiaries = async () => {
    console.log("handleClick");
    if (ba) {
      const beneficiary = await ba.payment.getBeneficiaries();
      console.log("b", beneficiary);

      setData(beneficiary);
    } else {
      console.log("ba is not set");
      alert("dapi not set");
      // router.push("/login");
    }
  };

  const getAccounts = async () => {
    console.log("handleClick");
    if (ba) {
      let resp = await ba.data.getAccounts();
      console.log("resp", resp);
      setAccounts(resp.accounts);
    } else {
      console.log("ba is not set");
      alert("dapi not set");
      // router.push("/login");
    }
  };

  const handleCreateBeneficiary = async (e) => {
    e.preventDefault();
    console.log("data", beneficiary);
    let addressData = {
      line1: beneficiary.address,
      line2: "",
      line3: "",
    };
    beneficiary.address = addressData;

    if (ba) {
      const beneficiaryResponse = await ba.payment.createBeneficiary(
        beneficiary
      );

      if (beneficiaryResponse.status == "failed") {
        setErrMessage(beneficiaryResponse.msg);
        return;
      } else {
        console.log("response", beneficiaryResponse);
        setCreateResponse(beneficiaryResponse);
      }
    }
  };

  const sendMoneyToBeneficiary = async (e) => {};

  const handleSendMoney = async (e) => {
    console.log("sending money");

    if (!selectedAccount) {
      setSelectedAccount(accounts[0].id);
    }
    console.log("seleced-account", selectedAccount);
    console.log("selected-beneficiary", e);

    var transfer = {
      senderID: selectedAccount,
      receiverID: e.id,
      accountNumber: e.accountNumber,
      name: e.name,
      iban: e.iban,
      amount: Number(amount),
      remarks: "simple-transfer",
    };

    if (ba) {
      console.log("transfer", transfer);
      const autoTransferResponse = await ba.payment.createTransfer(transfer);

      if (autoTransferResponse.status == "done") {
        console.log("response", autoTransferResponse);
        alert("Transfer Successful");
      } else {
        setErrMessage(autoTransferResponse.msg);
        return;
      }
    }
  };
  return (
    <Layout>
      <div className=" bg-gray-100/50">
        <div className="mx-5 flex justify-between mb-20 space-y-4 ">
          <h1 className="text-3xl font-extrabold uppercase my-2">
            My Beneficiaries
          </h1>
          {errMessage && (
            <div className="text-red-500  bg-red-500/10  px-20  pt-2  rounded-2xl font-extrabold text-sm">
              ERROR: <span className="font-bold"> {errMessage}</span>
            </div>
          )}
          {showAddBeneficiary == false ? (
            <button
              className="bg-sky-500/20 text-sky-500 font-extrabold  px-10 "
              onClick={() => setShowAddBeneficiary(true)}
            >
              <span>Add Beneficiary</span>
            </button>
          ) : null}

          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
        {data && (
          <div className="flex justify-between">
            <ul className="w-full justify-center space-y-4 m-20">
              {data.beneficiaries &&
                data.beneficiaries.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className=" p-10 rounded-lg bg-sky-500 text-white font-bold"
                    >
                      <div className="flex flex-col">
                        <span className="text-xl mb-0.5"> {item.name}</span>
                        <span className="font-light text-md">
                          {item.iban || item.accountNumber}
                        </span>
                      </div>
                      <input
                        type="number"
                        className="mx-2 rounded-lg w-20 py-2 px-2 text-black text-sm"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      {accounts && (
                        <select
                          type="text"
                          className="mx-2 rounded-lg w-20 py-2 px-2 text-black text-sm"
                          placeholder="Selected Account"
                          value={selectedAccount}
                          onChange={(e) => setSelectedAccount(e.target.value)}
                        >
                          {accounts &&
                            accounts.map((item, index) => {
                              return (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                      )}
                      <button
                        className="mt-4 p-4 rounded-xl bg-green-500/40"
                        onClick={() => handleSendMoney(item)}
                      >
                        {" "}
                        Send Money
                      </button>
                    </li>
                  );
                })}
            </ul>
            {showAddBeneficiary == true ? (
              <div className="bg-gray-500/10  w-1/2">
                <div className="flex">
                  <div className=" justify-center p-4">
                    <h1 className="text-2xl font-bold">Create a Beneficiary</h1>

                    <form className="" onSubmit={handleCreateBeneficiary}>
                      <div className="flex flex-col">
                        <label className="text-gray-700">Full Name</label>
                        <input
                          name="name"
                          className="border border-gray-500 p-2 w-full"
                          type="text"
                          value={beneficiary.name}
                          onChange={(e) =>
                            setBeneficiary({
                              ...beneficiary,
                              name: e.target.value,
                            })
                          }
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-gray-700">Nick Name</label>
                        <input
                          name="nickname"
                          className="border border-gray-500 p-2 w-full"
                          type="text"
                          value={beneficiary.nickname}
                          onChange={(e) =>
                            setBeneficiary({
                              ...beneficiary,
                              nickname: e.target.value,
                            })
                          }
                          placeholder="Nick Name"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-gray-700">Account Number</label>
                        <input
                          name="accountNumber"
                          className="border border-gray-500 p-2 w-full"
                          type="text"
                          value={beneficiary.accountNumber}
                          onChange={(e) =>
                            setBeneficiary({
                              ...beneficiary,
                              accountNumber: e.target.value,
                            })
                          }
                          placeholder="Account Number"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-gray-700">Account Type</label>
                        <select
                          name="type"
                          className="border border-gray-500 p-2 w-full"
                          type="text"
                          value={beneficiary.type}
                          onChange={(e) =>
                            setBeneficiary({
                              ...beneficiary,
                              type: e.target.value,
                            })
                          }
                          placeholder="Account Number"
                        >
                          <option value="">Select Type</option>
                          <option value="same">Same Bank</option>
                          <option value="local">Local Bank</option>
                          <option value="intl">International Bank</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-gray-700">address</label>
                        <input
                          name="address"
                          className="border border-gray-500  p-2 w-full"
                          type="address"
                          value={beneficiary.address}
                          onChange={(e) =>
                            setBeneficiary({
                              ...beneficiary,
                              address: e.target.value,
                            })
                          }
                          placeholder="address"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-gray-700">Country</label>
                        <input
                          name="country"
                          className="border border-gray-500  p-2 w-full"
                          type="text"
                          value={beneficiary.country}
                          onChange={(e) =>
                            setBeneficiary({
                              ...beneficiary,
                              country: e.target.value,
                            })
                          }
                          placeholder="country"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-gray-700">branch Name</label>
                        <input
                          name="branchName"
                          className="border border-gray-500 p-2 w-full"
                          type="text"
                          value={beneficiary.branchName}
                          onChange={(e) =>
                            setBeneficiary({
                              ...beneficiary,
                              branchName: e.target.value,
                            })
                          }
                          placeholder="Branch Name"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-gray-700">branch Address</label>
                        <input
                          name="branchAddress"
                          className="border border-gray-500 p-2 w-full"
                          type="text"
                          value={beneficiary.branchAddress}
                          onChange={(e) =>
                            setBeneficiary({
                              ...beneficiary,
                              branchAddress: e.target.value,
                            })
                          }
                          placeholder="Branch Address"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-gray-700">Phone Number</label>
                        <input
                          name="phoneNumber"
                          className="border border-gray-500 p-2 w-full"
                          type="tel"
                          value={beneficiary.phoneNumber}
                          onChange={(e) =>
                            setBeneficiary({
                              ...beneficiary,
                              phoneNumber: e.target.value,
                            })
                          }
                          placeholder="Phone Number"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-gray-700">IBAN</label>
                        <input
                          name="iban"
                          className="border border-gray-500 p-2 w-full"
                          type="text"
                          value={beneficiary.iban}
                          onChange={(e) =>
                            setBeneficiary({
                              ...beneficiary,
                              iban: e.target.value,
                            })
                          }
                          placeholder="IBAN"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-gray-700">Swift Code</label>
                        <input
                          name="swiftCode"
                          className="border border-gray-500 p-2 w-full"
                          type="text"
                          value={beneficiary.swiftCode}
                          onChange={(e) =>
                            setBeneficiary({
                              ...beneficiary,
                              swiftCode: e.target.value,
                            })
                          }
                          placeholder="Swift Code"
                        />
                      </div>

                      <div className="flex mt-6">
                        <button
                          type="submit"
                          className="bg-sky-400 w-full hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Layout>
  );
}
