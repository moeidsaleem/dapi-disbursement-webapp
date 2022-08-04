import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useBa } from "../context/BaContext";

export default function Page({ Component, pageProps }) {
  const { ba, setBa } = useBa();
  const [identity, setIdentity] = useState(null);
  const [beneficiary, setBeneficiary] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect((e) => {
    setData(e);
  }, []);

  const getIdentity = async () => {
    console.log("handleClick");
    if (ba) {
      const identity = await ba.data.getIdentity();
      setData(identity);
    } else {
      console.log("ba is not set");
      router.push("/login");
    }
  };

  const getBeneficiaries = async () => {
    console.log("handleClick");
    if (ba) {
      const beneficiary = await ba.payment.getBeneficiaries();
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
      const accounts = await ba.data.getAccounts();
      setData(accounts);
    } else {
      console.log("ba is not set");
      alert("dapi not set");
      // router.push("/login");
    }
  };

  return (
    <Layout>
      {data && <h1 className="bg-gray-500/10 p-2">PennySent Dashboard </h1>}
      {data && (
        <div>
          <h1>Data</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      <div className="flex space-x-4">
        <button
          onClick={getIdentity}
          className="bg-sky-500 px-2 py-1 rounded-lg text-white font-extrabold"
        >
          Get Identity
        </button>
        <button
          onClick={getBeneficiaries}
          className="bg-violet-500 px-2 py-1 rounded-lg text-white font-extrabold"
        >
          Get beneficiaries
        </button>
        <button
          onClick={getAccounts}
          className="bg-green-500 px-2 py-1 rounded-lg text-white font-extrabold"
        >
          Get Accounts
        </button>
      </div>
    </Layout>
  );
}

// Page.getLayout = function getLayout(page) {
//   return page;
// };
