import "./App.css";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { useEffect, useState } from "react";
import "./App.css";

type DisplayEncoding = "utf8" | "hex";

type WalletEvent = "disconnect" | "connect" | "accountChanged";
type WalletRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface WalletProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: WalletEvent, handler: (args: any) => void) => void;
  request: (method: WalletRequestMethod, params: any) => Promise<unknown>;
}

const getWalletProvider = (): WalletProvider | undefined => {
  if ("solana" in window) {
    const provider = window.solana as any;
    if (provider.isPhantom) return provider as WalletProvider;
  }
};

export default function App() {
  const [provider, setProvider] = useState<WalletProvider | undefined>(
    undefined
  );
  const [receiverPublicKey, setReceiverPublicKey] = useState<
    PublicKey | undefined
  >(undefined);
  const [senderKeypair, setSenderKeypair] = useState<Keypair | undefined>(
    undefined
  );
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  useEffect(() => {
    const provider = getWalletProvider();
    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);

  const createSender = async () => {
    const newKeypair = Keypair.generate();
    console.log("Sender account: ", newKeypair.publicKey.toString());
    console.log("Airdropping 1 SOL to Sender Wallet");
    setSenderKeypair(newKeypair);
    const airdropSignature = await connection.requestAirdrop(
      newKeypair.publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(airdropSignature);
    console.log(
      "Wallet Balance: " +
        (await connection.getBalance(newKeypair.publicKey)) / LAMPORTS_PER_SOL
    );
  };

  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    // checks if phantom wallet exists
    if (solana) {
      try {
        await solana.connect();
        const publicKey = await solana.publicKey.toString();
        setReceiverPublicKey(new PublicKey(publicKey));
        console.log(`connected wallet address ` + publicKey);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const disconnectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    // checks if phantom wallet exists
    if (solana) {
      try {
        await solana.disconnect();
        setReceiverPublicKey(undefined);
        console.log("Wallet disconnected");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const transferSol = async () => {
    console.log("Started transfer");
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    try {
      if (senderKeypair !== undefined && receiverPublicKey) {
        var phantomWalletKey = new PublicKey(receiverPublicKey);
        var transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey: phantomWalletKey,
            lamports: 2 * LAMPORTS_PER_SOL,
          })
        );

        // Sign transaction
        var signature = await sendAndConfirmTransaction(
          connection,
          transaction,
          [senderKeypair]
        );
        console.log(
          "Signature is "+signature
        );
      } else {
        alert("wallet not initialized");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Solana Wallet App</h2>
        <span className="buttons">
          <button onClick={createSender}>Create Sender Account</button>
          {provider && !receiverPublicKey && (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
          {provider && receiverPublicKey && (
            <button onClick={disconnectWallet}>Disconnect Wallet</button>
          )}
          {provider && receiverPublicKey && senderKeypair && (
            <button onClick={transferSol}>Transfer SOL</button>
          )}
        </span>
        {!provider && (
          <p>
            No provider found. Install{" "}
            <a href="https://phantom.app/">Phantom Browser extension</a>
          </p>
        )}
      </header>
    </div>
  );
}
