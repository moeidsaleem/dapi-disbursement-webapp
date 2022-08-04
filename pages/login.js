import { LibraryIcon, LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import DAPI from "../lib/dapi";
import { useBa } from "../context/BaContext";

export default function Login() {
  let [isDapiReady, setIsDapiReady] = useState(false);
  const { ba, setBa } = useBa();

  const router = useRouter();

  let dapiHandler = DAPI({
    onSuccessfulLogin: (bankAccount) => {
      const ba = bankAccount;
      setBa(ba);
      console.log("onSuccessfulLogin", bankAccount);
      ba.data.getIdentity().then((identityResponse) => {
        if (identityResponse.status === "done") {
          console.log("identity", identityResponse.identity);

          router.push("/");
        } else {
          console.error("API Responded with an error");
          console.dir(identityResponse);
        }
      });
    },
    onFailedLogin: (err) => {
      console.log("onFailedLogin", err);
    },
    onReady: () => {
      console.log("onReady");
      setIsDapiReady(true);
    },

    onExit: () => {
      console.log("User exited the flow");
    },
  });

  let loginWithBank = async () => {
    if (isDapiReady) {
      let d = await dapiHandler.open();
      console.log("d", d);
    }
  };
  return (
    <>
      <div className="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200">
        <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
          <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="rounded-xl bg-white shadow-xl">
              <div className="p-6 sm:p-16">
                <div className="space-y-4">
                  <img
                    src="https://pennysent.app/wp-content/uploads/2022/06/pennysent-logo.svg"
                    loading="lazy"
                    className="w-40"
                    alt="tailus logo"
                  />
                  <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                    Sign in to unlock the <br /> best of Penny Sent.
                  </h2>
                </div>
                <div className="mt-16 grid space-y-4">
                  <button
                    onClick={() => {
                      loginWithBank();
                    }}
                    className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                  >
                    <div className="relative flex items-center space-x-4 justify-center">
                      <LibraryIcon className="absolute left-0 w-5" />
                      <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Login with Bank Account
                      </span>
                    </div>
                  </button>
                </div>

                <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
                  <p className="text-xs">
                    By proceeding, you agree to our{" "}
                    <a href="#" className="underline">
                      Terms of Use
                    </a>{" "}
                    and confirm you have read our{" "}
                    <a href="#" className="underline">
                      Privacy and Cookie Statement
                    </a>
                    .
                  </p>
                  <p className="text-xs">
                    This site is protected by reCAPTCHA and the{" "}
                    <a href="#" className="underline">
                      Google Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline">
                      Terms of Service
                    </a>{" "}
                    apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
