import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../AuthContext";
import ReactLoading from "react-loading";
import * as gariSdk from "gari";

export default function SignIn() {
  const [{ token }, dispatch] = useAuthContext();
  const [wallet, setWallet] = useState(null);
  const [userId, setUserid] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [amount, setAmount] = useState(null);
  const [sig, setSig] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const gariClientId = "0319a8fc-b289-4a28-92f9-22ae141bd477";

  async function getToken(userId) {
    const response = await axios.get(
       `https://demo-gari-sdk.vercel.app/api/login?userId=${userId}`
      // `/api/login?userId=${userId}`
    );
    console.log("response", response.data);
    return response.data;
  }

  async function handleLogin(event) {
    event.preventDefault();
    const token = await getToken(userId);
    dispatch({ type: "login", token });
  }

  async function handleTransaction(event) {
    try {
      event.preventDefault();
      setLoading(true);
      const encodedTransaction = await gariSdk.transferGariToken(
        token,
        publicKey,
        amount,
        gariClientId
      );
      console.log(
        "encodedTransaction before main decode function ------> ",
        encodedTransaction.encodedTransaction
      );
      const tran = encodedTransaction.encodedTransaction;

      // send encoded transaction to ludo backend
      const transactionResponse = await axios.post(
        `/api/transaction`,
        {
          gariClientId,
        },
        {
          headers: {
            token,
            tran,
          },
        }
      );

      setSig(transactionResponse?.data?.signature);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }

  async function handleAirdrop() {
    try {
      setLoading(true);
      console.log(`getAirdrop called`);
      // gariSdk.sdkInitialize(gariClientId, gariSecretKey)
      // const receivedAirdrop = await gariSdk.airDrop(wallet.publicKey, airdropAmount, token, fromWalletPrivateKey)
      const publicKey = wallet.publicKey;
      const airdropAmount = 1;

      const airdropResponse = await axios.post(
        `/api/airdrop`,
        {
          publicKey,
          airdropAmount,
        },
        {
          headers: {
            token,
          },
        }
      );
      console.log("airdropResponse ", airdropResponse);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error in airdrop function sdk ui", error);
      return error;
    }
  }

  async function getWalletDetails() {
    try {
      setLoading(true);
      const walletRes = await gariSdk.createWalletOrGetWallet(token);
      // const walletRes = await getWalletDetailsApi(gariClientId, token);
      setWallet(walletRes);
      console.log("wallet", wallet);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }

  useEffect(() => {
    console.log(`gariSdk version ${gariSdk.packageVersion()}`);
    gariSdk.sdkInitialize(gariClientId);
  }, []);

  return token ? (
    <Container
      component="form"
      onSubmit={handleTransaction}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          zIndex: 1,
        }}
      >
        {isLoading && (
          <ReactLoading type={"spin"} color={"black"} height={667} />
        )}
      </div>
      <h4 style={{ color: "black" }}>
        PublicKey:{" "}
        <span style={{ color: "green" }}>
          {wallet == null ? "" : wallet.publicKey}
        </span>
      </h4>
      <h4 style={{ color: "black" }}>
        balance:{" "}
        <span style={{ color: "green" }}>
          {wallet == null ? "" : wallet.balance}
        </span>
      </h4>
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        onClick={getWalletDetails}
      >
        Get Wallet Details
      </Button>
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        onClick={handleAirdrop}
      >
        Get airdrop
      </Button>
      <TextField
        label="To Public Key"
        variant="outlined"
        name="publicKey"
        margin="dense"
        required
        fullWidth
        onChange={(e) => setPublicKey(e.target.value)}
      />
      <TextField
        label="Amount"
        variant="outlined"
        name="amount"
        margin="dense"
        required
        fullWidth
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Make Transaction
      </Button>
      <h6 style={{ color: "black" }}>
        Signature:{" "}
        <span style={{ color: "red" }}>{sig == null ? "" : sig}</span>
      </h6>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() =>
          dispatch({ type: "logout", message: "Logged Out Successfully" })
        }
      >
        Log Out
      </Button>
    </Container>
  ) : (
    <Container
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
      }}
    >
      <TextField
        label="UserId"
        variant="outlined"
        name="userId"
        margin="dense"
        required
        fullWidth
        type="number"
        onChange={(e) => setUserid(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Login
      </Button>
    </Container>
  );
}
