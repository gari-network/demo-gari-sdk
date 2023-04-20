import * as gariSdk from "gari";

const gariClientId = "d8817deb-dceb-40a4-a890-21f0286c8fba";
const secretKey = "964f2bdd-18b6-4e45-be21-636ce81efd6f";
const feepayerWalletPrivateKey =
  "03f6cac889d362c37589868ed67f068783fb433c7d0a0b907db24afd3a843e27d8c6f04cf5c6f33f2b83ba3e0e83e827bb305157105442c72a544c4e70c568b1";
const feepayerWalletPublicKey = "FbD1J7ptwgSD8eCsyEm2TDVLnFwVhYRWkc2ingf6mn1n"; // ludos wallet

export default async function handler(req, res) {
  const partialSignedEncodedTransaction =
    req.body.partialSignedEncodedTransaction;
  const transactionData = req.body.transactionData;
  const jwtToken = req.headers.token;

  // pass configdetails to initialize sdk
  let configDetails = {
    gariClientId,
    secretKey,
    web3authClientId: "",
    verifierName: "",
    verifierDomain: "",
    environment: "devnet",
  };
  gariSdk.sdkInitialize(configDetails);

  // again decode
  const partialSignedTransaction = await gariSdk.getDecodedTransction(
    partialSignedEncodedTransaction
  );

  // partial sign with feepayers wallet
  const completeSignedEncodedTransaction = await gariSdk.partialSign(
    partialSignedTransaction,
    undefined,
    feepayerWalletPrivateKey
  );

  const transactionResponse = await gariSdk.initiateTransactionExternal(
    completeSignedEncodedTransaction,
    transactionData,
    jwtToken
  ); // transactionResponse contains signature as well as transactionId

  res.json(transactionResponse.signature);
}
