import { useState } from "react";
import server from "./server";

function Transfer({
  address,
  setBalance,
  recipient,
  setRecipient,
  amount,
  setAmount,
  setTransactions,
  getSignature,
}) {
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  const setValue = (setter) => (evt) => {
    setter(evt.target.value);
    getSignature();
    getSignature();
  };

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance, transactions },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(amount),
        recipient: recipient,
        signature: String(signature),
        recoveryBit: String(recoveryBit),
      });
      setBalance(balance);
      setTransactions(transactions);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container wallet" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={amount}
          onChange={setValue(setAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Signature
        <input
          placeholder="Type the transaction signature"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>

      <label>
        Recovery Bit
        <input
          placeholder="Type the signature recovery bit"
          value={recoveryBit}
          onChange={setValue(setRecoveryBit)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
