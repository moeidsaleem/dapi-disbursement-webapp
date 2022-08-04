// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const DapiApp = require("@dapi-co/dapi-node");

const dapi = new DapiApp.default({
  appSecret: "8e64915701ead9b1db405c5d2c316582366267cdebe6268985baba10c4e1aa81",
});

export default function handler(req, res) {
  if (req.method === "POST") {
    let body = req.body;
    let headers = req.headers;
    console.log("body", body);
    dapi.data
      .getIdentity()
      .then((identity) => {
        res.status(200).json({ identity });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })
      .finally(() => {
        dapi.close();
      });
  }
}
