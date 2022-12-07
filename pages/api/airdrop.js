import * as gariSdk from "gari";

const gariClientId = "0319a8fc-b289-4a28-92f9-22ae141bd477";
const gariSecretKey = "d41c1ac7-7671-41fa-94a8-ea79b67d01ea";
const fromWalletPrivateKey =
  "03f6cac889d362c37589868ed67f068783fb433c7d0a0b907db24afd3a843e27d8c6f04cf5c6f33f2b83ba3e0e83e827bb305157105442c72a544c4e70c568b1";

const fromWalletPublicKey=`FbD1J7ptwgSD8eCsyEm2TDVLnFwVhYRWkc2ingf6mn1n`

export default async function handler(req, res) {
  const publicKey = req.body.headers.publicKey;
  const token = req.body.headers.token;
  const airdropAmount = req.body.headers.airdropAmount;

  gariSdk.sdkInitialize(gariClientId, gariSecretKey)
  
  const signature = await gariSdk.airDrop(
    publicKey,
    airdropAmount,
    token,
    fromWalletPrivateKey
  );

  return signature;
}