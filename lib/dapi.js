let dapi_config = {
  appKey: "c280ebcaee96bcab7df6089393ff226b822d1e850d859aad3dba31afd4d8e011",
  countries: ["AE"],
  bundleID: "pennysent",
  apiURL: "http://localhost:3000/api/dapi",
  clientUserID: "CLIENT_USER_ID",
  isCachedEnabled: true,
  isExperimental: true,
  clientHeaders: {},
  clientBody: {},
};

export default function DAPI({
  onSuccessfulLogin,
  onFailedLogin,
  onReady,
  onExit,
}) {
  let demoAccountLogin = (bankAccount) => {
    let ba = bankAccount;

    ba.data.getAccounts().then((payload) => {
      ba.showAccountsModal(
        "Your message to the user",
        payload.accounts,
        (account) => {
          console.dir(account);
          ba.data
            .getIdentity()
            .then((response) => {
              console.log("getIdentity", response);
              console.log("geAccounts", account);
              localStorage.getItem("accountId", account.id);
              this.props.setData(response.identity);
              this.props.setAccount(account);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        () => {
          console.dir("User Cancelled");
        }
      );
    });
  };

  let demoLoginFailed = (err) => {
    if (err != null) {
      console.log("Error");
      console.log(err);
    } else {
      console.log("No error");
    }
  };

  let demoOnReady = () => {
    this.setState({
      isDapiReady: true,
    });
  };

  if (typeof window !== "undefined") {
    // Client-side-only code
    return window.Dapi.create({
      ...dapi_config,
      environment: window.Dapi.environments.sandbox,
      onSuccessfulLogin: onSuccessfulLogin,
      onFailedLogin: demoLoginFailed,
      onReady: onReady,
      onExit: onExit,
      onResponse: (response) => {
        console.log("Response", response);
      },
    });
  }
}
