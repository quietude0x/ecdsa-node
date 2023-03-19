import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Signature from "./Signature"
import "./App.scss";
import { useState } from "react";

function App() {

  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [nonce, setNonce] = useState(0);
  const [sendAmount, setSendAmount] = useState("");
  const [recoveryBit, setRecoveryBit] = useState(0);
  const [messageHash, setMessageHash] = useState("");
  const [signature, setSignature] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        address={address}
        setAddress={setAddress}
        nonce={nonce}
        setNonce={setNonce}
      />
      <Transfer 
        setBalance={setBalance} 
        address={address} 
        setAddress={setAddress}
        nonce={nonce}
        setNonce={setNonce}
        recipient={recipient}
        setRecipient={setRecipient}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
        messageHash={messageHash}
        setMessageHash={setMessageHash}
        recoveryBit={recoveryBit}
        setRecoveryBit={setRecoveryBit}
        signature={signature}
        setSignature={setSignature}
      />

      <Signature 
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        address={address}
        setAddress={setAddress}
        nonce={nonce}
        setNonce={setNonce}
        recipient={recipient}
        setRecipient={setRecipient}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
        recoveryBit={recoveryBit}
        setRecoveryBit={setRecoveryBit}
        messageHash={messageHash}
        setMessageHash={setMessageHash}
        signature={signature}
        setSignature={setSignature}
      />

    </div>
  );
}

export default App;
