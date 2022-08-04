// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const DapiApp = require("@dapi-co/dapi-node");

// const {
//   getFirestore,
//   Timestamp,
//   FieldValue,
// } = require("firebase-admin/firestore");

const dapi = new DapiApp.default({
  appSecret: "8e64915701ead9b1db405c5d2c316582366267cdebe6268985baba10c4e1aa81",
});

// const serviceAccount = require("./serviceAccountKey.json");

// const app = initializeApp(firebaseConfig);
// const db = getFirestore();

export default async function handler(req, res) {
  try {
    const dapiResponse = await dapi.handleSDKDapiRequests(
      req.body,
      req.headers
    );
    console.log("dapi-response", dapiResponse);
    let accessToken = dapiResponse.accessToken;
    let userId = dapiResponse.userID;
    let tokenID = dapiResponse.tokenID;

    console.log("dapi-response", dapiResponse);
    //now create a firebase user with accessToken
    // try {
    //   const docRef = await db.collection("users").doc(userId).set({
    //     name: "",
    //     email: "",
    //     userId: userId,
    //     accessToken: accessToken,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
    res.json(dapiResponse);
  } catch (error) {
    //Handle Network Errors
    console.dir(error);
  }
}
