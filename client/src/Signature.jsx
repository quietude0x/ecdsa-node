import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { sign } from "ethereum-cryptography/secp256k1";

function Signature({ address, setAddress, balance, setBalance, nonce, 
setNonce, privateKey, setPrivateKey, recipient, setRecipient, sendAmount, setSendAmount, 
signature, setSignature, recoveryBit, setRecoveryBit, messageHash, setMessageHash
}) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance, nonce },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
      setNonce(nonce);
    } else {
      setBalance(0);
    }
  }

  async function onChangeRecipient(evt) {
    const recipient = evt.target.value;
    setRecipient(recipient);
  }

  async function onChangeAmount(evt) {
    const sendAmount = evt.target.value;
    setSendAmount(sendAmount);
  }

  async function onChangePrivateKey(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
  }

  async function signing(pk, recipient, amount, nonce) {
    let msg = {
        recipient: recipient, 
        amount: amount,
        nonce: nonce,
    };   
    
    console.log("Message : ", msg);

    const stringifyMsg = JSON.stringify(msg);
    console.log("Strigified msg", stringifyMsg);

    const toBytes = utf8ToBytes(stringifyMsg);

    const messageHash = toHex(keccak256(toBytes));
    console.log("Hashed Message : ", messageHash);

    const [sig, recoveryBit]  = await sign(messageHash, pk, {recovered: true});
    console.log("Signature : ", toHex(sig));
    console.log("Recovery Bit : ", recoveryBit);

    setMessageHash(messageHash);
    setRecoveryBit(recoveryBit);
    setSignature(toHex(sig));
  };

  return (
    <div className="container wallet">
      <h1>Sign something</h1>
      
      <label>
        Sender 
        <input placeholder="Type ur address" value={address} onChange={onChange}></input>
      </label>


      <label>
        Recipient
        <input placeholder="Type the recipient address" value={recipient} onChange={onChangeRecipient}></input>
      </label>

      <label>
        Amount
        <input placeholder="Type your amount" value={sendAmount} onChange={onChangeAmount}></input>
      </label>

      <label>
        Wallet Private Key
        <input placeholder="Type your private key" value={privateKey} onChange={onChangePrivateKey}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      <div className="balance">Nonce: {nonce}</div>
      <div className="balance">Recovery Bit: {recoveryBit} </div>
      <div className="balance">Message hash: {messageHash} </div>
      <div className="balance">Signature: {signature} </div>
      
      <input type="submit" className="button" value="Sign" onClick={() => signing(privateKey, recipient, parseInt(sendAmount), nonce)} />
    </div>
  );
}

export default Signature;
