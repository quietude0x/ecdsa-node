import { toHex } from "ethereum-cryptography/utils";
import server from "./server";
import { hashMessage } from "./utils";

function Transfer({ address, setBalance, nonce, setNonce, recipient, setRecipient, sendAmount, setSendAmount, signature, setSignature, recoveryBit, setRecoveryBit}) {

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const message = toHex(
      hashMessage(
        JSON.stringify({
          recipient,
          amount: parseInt(sendAmount),
          nonce: parseInt(nonce),
        })
      )
    )

    try {
      const {
        data: { balance, nonce },
      } = await server.post(`send`, {
        sender: address,
        signature,
        recoveryBit,
        message,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
      setNonce(nonce);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address "
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Nonce
        <input
          placeholder="Type the nonce"
          value={nonce}
          onChange={setValue(setNonce)}
        ></input>
      </label>

      <label>
       Recovery Bit 
        <input
        type="number"
          placeholder="Type the recovery bit"
          value={recoveryBit}
          onChange={setValue(setRecoveryBit)}
        ></input>
      </label>

      <label>
        Signature 
        <input
          placeholder="Type the signature hash"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
