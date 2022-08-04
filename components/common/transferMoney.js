import { Component } from "react";

let handler;
class TransferMoney extends Component {
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
      clientUserID:
        "hsjxOUkn60PmJqIe+gcbHiwuA4lHBa+Um301PMokzanhOj79vjnkIkjLDjOJsAFz7T4xj6IlggZAm0HAPXZ/Sw==",
      isCachedEnabled: true,
      isExperimental: false,
      clientHeaders: {},
      clientBody: {},
      onSuccessfulLogin: (bankAccount) => {
        let ba = bankAccount;

        var transfer = {
          remarks: "pennysent-transaction-30494",
        };
        var beneficiary = {
          name: "Devon Sealy",
          nickname: "devon",
          iban: "DAPIBANKAEMSHRQ1658412789537604456811",
          accountNumber: "1658412789537604456811",
          type: "local",
          swiftCode: "DAPIBANKAEMSHRQ",
          address: {
            line1: "Maryam Street",
            line2: "Abu Dhabi",
            line3: "United Arab Emirates",
          },
          country: "AE",
          branchAddress: "Dubai Mall",
          branchName: "Main Branch",
        };
        var transfer = {
          senderID:
            "hsjxOUkn60PmJqIe+gcbHiwuA4lHBa+Um301PMokzanhOj79vjnkIkjLDjOJsAFz7T4xj6IlggZAm0HAPXZ/Sw==",
          accountNumber: "1658412789537604456811",
          name: "current",
          iban: "DAPIBANKAEMSHRQ1658412789537604456811",
          amount: 10000,
          beneficiary: beneficiary,
        };

        ba.payment
          .transferAutoflow(transfer)
          .then((transferResponse) => {
            if (transferResponse.status === "done") {
              console.dir(transferResponse);
            } else {
              console.error("API Responded with an error");
              console.dir(transferResponse);
            }
          })
          .catch((error) => {
            console.dir(error);
          });

        // ba.payment
        //   .createBeneficiary(beneficiary)
        //   .then((benefResponse) => {
        //     if (benefResponse.status === "done") {
        //       console.dir(benefResponse);
        //     } else {
        //       console.error("API Responded with an error");
        //       console.dir(benefResponse);
        //     }
        //   })
        //   .catch((error) => {
        //     console.dir(error);
        //   });
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
            "bg-blue-500 text-white font-bold px-2 py-3 rounded-xl hover:bg-sky-500 uppercase  transition-all duration-300  " +
            this.props.className
          }
        >
          Transfer Money
        </button>
      </>
    );
  }
}

export default TransferMoney;
