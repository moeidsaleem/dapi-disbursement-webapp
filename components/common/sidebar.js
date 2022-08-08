import Link from "next/link";
import { useRouter } from "next/router";
import {
  BeakerIcon,
  DocumentReportIcon,
  HomeIcon,
  PlusCircleIcon,
  ViewGridAddIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { useBa } from "../../context/BaContext";
import { useEffect, useState } from "react";

let menu = [
  {
    name: "Dashboard",
    href: "/",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    name: "Create Circle",
    href: "/create-circle-new",
    icon: <ViewGridAddIcon className="h-5 w-5" />,
  },
  {
    name: " My Benenficiaries",
    href: "/my-beneficiaries",
    icon: <ViewGridIcon className="h-5 w-5" />,
  },
  {
    name: " My Circles",
    href: "/my-circles-new",
    icon: <ViewGridIcon className="h-5 w-5" />,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: <DocumentReportIcon className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const { ba, setBa } = useBa();
  const [data, setData] = useState(null);
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    getIdentity();
    getAccounts();
  }, []);

  const getIdentity = async () => {
    console.log("handleClick");
    if (ba) {
      const identity = await ba.data.getIdentity();
      setData(identity.identity);
      console.log(identity);
    } else {
      console.log("ba is not set");
      router.push("/login");
    }
  };

  const getAccounts = async () => {
    console.log("handleClick");
    if (ba) {
      const accounts = await ba.data.getAccounts();
      setAccounts(accounts);
    } else {
      console.log("ba is not set");
      alert("dapi not set");
      // router.push("/login");
    }
  };

  const router = useRouter();

  let activeClass = "bg-gradient-to-r from-sky-600 to-cyan-400 text-white";

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <a href="#" title="home">
            <img
              src="https://pennysent.app/wp-content/uploads/2022/06/pennysent-logo.svg"
              className="w-32"
              alt="tailus logo"
            />
          </a>
        </div>

        <div className="mt-8 text-center">
          <img
            src="https://pyxis.nymag.com/v1/imgs/cb8/b28/3695d66a5194ffd83ca7c54982af8f81f1-20-trevor-noah.rsquare.w700.jpg"
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {data && data.name}
          </h5>
          <h2 className="hidden mt-4 text-sm font-extrabold text-gray-600 lg:block">
            {accounts && String(accounts.accounts[0].balance.amount)} AED
          </h2>
          <p className="hidden text-md text-gray-600 lg:block">
            {data && data.emailAddress}
          </p>
          <p className="hidden mt-1  font-bold text-md text-sky-600 lg:block">
            +{data && data.numbers[0].value}
          </p>
          <p className="hidden text-md text-gray-600 lg:block">
            {data && `${data.address.city}, ${data.address.country}`}
          </p>

          <span className="hidden text-gray-400 lg:block">
            {typeof window !== "undefined" && localStorage.getItem("accountId")}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menu.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.href}>
                  <a
                    className={`px-4 py-3 flex items-center space-x-4 rounded-md  group ${
                      router.asPath === item.href
                        ? activeClass
                        : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                    <span className="group-hover:text-gray-700">
                      {item.name}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
}

/* 

  <li>
            <a
              href="#"
              aria-label="dashboard"
              className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white "
            >
              <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                  className="fill-current text-cyan-400 dark:fill-slate-600"
                ></path>
                <path
                  d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                  className="fill-current text-cyan-200 group-hover:text-cyan-300"
                ></path>
                <path
                  d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                  className="fill-current group-hover:text-sky-300"
                ></path>
              </svg>
              <span className="-mr-1 font-medium">Dashboard</span>
            </a>
          </li>
*/
