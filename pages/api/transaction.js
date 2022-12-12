import * as gariSdk from "gari";

const gariClientId = "0319a8fc-b289-4a28-92f9-22ae141bd477";
const gariSecretKey = "d41c1ac7-7671-41fa-94a8-ea79b67d01ea";

export default async function handler(req, res) {
  const partialSignedEncodedTransaction =
    req.body.partialSignedEncodedTransaction;
  const token = req.headers.token;
  
  gariSdk.sdkInitialize(gariClientId, gariSecretKey);
  const transactionResponse = await gariSdk.initiateTransaction(
    partialSignedEncodedTransaction,
    token,
    gariClientId
  );

  res.json(transactionResponse);
}
