import * as gariSdk from "gari";

export default async function handler(req, res) {
  const publicKey = req.body.publicKey;
  const gariClientId = req.body.gariClientId;
  const amount = req.body.amount;
  const token = req.headers.token;
  const encodeTransaction = req.headers.tran;

  gariSdk.sdkInitialize(gariClientId, gariSecretKey);
  
  const getDecode = await gariSdk.initiateTransaction(
    encodeTransaction,
    token,
    gariClientId
  );
  console.log("getDecode", getDecode);

  return getDecode;
}
