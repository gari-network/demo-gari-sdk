import * as gariSdk from "gari";
import BigNumber from 'bignumber.js';

const gariClientId = "d8817deb-dceb-40a4-a890-21f0286c8fba";
const secretKey = "964f2bdd-18b6-4e45-be21-636ce81efd6f";

// this wallet is clients wallet, below demo wallet has some garis of devnet 
const senderWalletPrivateKey =
  "03f6cac889d362c37589868ed67f068783fb433c7d0a0b907db24afd3a843e27d8c6f04cf5c6f33f2b83ba3e0e83e827bb305157105442c72a544c4e70c568b1";
const senderWalletPublicKey=`FbD1J7ptwgSD8eCsyEm2TDVLnFwVhYRWkc2ingf6mn1n` 
const feepayerWalletPublicKey = senderWalletPublicKey; // can provide ludos any other secondary wallet 
const feepayerWalletPrivateKey = senderWalletPrivateKey;
const airdropTokenName = 'gari';

export default async function handler(req, res) {
  const receiverWalletPublicKey = req.body.publicKey;
  // airdrop amount should be decided by ludo backend (e.g 1 gari)
  const airdropAmount = new BigNumber(0.2).multipliedBy(1000000000).toFixed(); 
  const jwtToken = req.headers.token;

  // pass configdetails to initialize sdk 
  let configDetails = {
    gariClientId,
    secretKey,
    web3authClientId: "",
    verifierName: "",
    verifierDomain: "",
    environment : "devnet"
  };
  gariSdk.sdkInitialize(configDetails);

  const airdropData = {
    senderWalletPublicKey, // ludos wallet  
    feepayerWalletPublicKey,  // wallet for paying fee for airdrop  
    receiverWalletPublicKey,  // wallet of ludos user 
    airdropAmount,
    airdropTokenName         // e.g gari 
  }
  const airdropResponse = await gariSdk.airDrop(
    airdropData,
    senderWalletPrivateKey,   
    feepayerWalletPrivateKey, 
    jwtToken,
  );

  // airdropResponse contains airdrop signature and transactionId
  res.json(airdropResponse.signature);
}
