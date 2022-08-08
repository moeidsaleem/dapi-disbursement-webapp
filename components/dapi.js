import { Component } from "react";

let handler;
class LinkDapi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDapiReady: false,
      className: "",
      data: "",
    };
  }

  linkBankAccount = () => {
    if (this.state.isDapiReady) {
      handler.open();
    } else {
      console.log("Dapi not ready, try again");
    }
  };

  componentDidMount = () => {
    handler = window.Dapi.create({
      environment: window.Dapi.environments.sandbox, //or .production
      appKey:
        "c280ebcaee96bcab7df6089393ff226b822d1e850d859aad3dba31afd4d8e011",
      countries: ["AE"],
      bundleID: "pennysent",
      clientUserID: "CLIENT_USER_ID",
      isCachedEnabled: true,
      isExperimental: false,
      clientHeaders: {},
      clientBody: {},
      onSuccessfulLogin: (bankAccount) => {
        console.log("bankAccount", bankAccount);
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
      },
      onFailedLogin: (err) => {
        if (err != null) {
          console.log("Error");
          console.log(err);
        } else {
          console.log("No error");
        }
      },
      onReady: () => {
        this.setState({
          isDapiReady: true,
        });
      },
      onExit: () => {
        console.log("User exited the flow");
      },
    });
  };

  render() {
    return (
      <>
        <button
          onClick={this.linkBankAccount}
          className={
            "bg-gray-900 text-white font-bold px-2 py-3 rounded-xl hover:bg-sky-500 uppercase  transition-all duration-300  " +
            this.props.className
          }
        >
          {this.props.title || "Link a Bank Account"}
        </button>
      </>
    );
  }
}

export default LinkDapi;
