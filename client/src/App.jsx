import Wallet from "./Wallet";
import Transactions from "./Transactions";
import Transfer from "./Transfer";
import Sign from "./Sign";
import "./App.scss";
import { useState } from "react";
import server from "./server";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import * as secp from "@noble/secp256k1";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
  }

  function document() {
    return hashMessage(
      JSON.stringify({
        sender: address.toLowerCase(),
        amount: parseInt(amount),
        // id: parseInt(transactions) + 1,
        recipient: recipient.toLowerCase(),
      })
    );
  }

  async function getSignature() {
    if (address && privateKey && amount && transactions && recipient) {
      const sig = await secp.sign(document(), privateKey, { recovered: true });
      setSignature(sig[0].toString());
      setRecoveryBit(sig[1].toString());
    }
    getSignature();
  }

  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { transaction },
      } = await server.get(`transactions/${address}`);
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setTransactions(transaction);
      setBalance(balance);
    } else {
      setTransactions(0);
      setBalance(0);
    }
    getSignature();
  }

  return (
    <div className="app">
      <Wallet balance={balance} address={address} onChange={onChange} />
      <Transactions
        transactions={transactions}
        address={address}
        onChange={onChange}
      />
      <Sign
        address={address}
        recipient={recipient}
        setRecipient={setRecipient}
        amount={amount}
        setAmount={setAmount}
        onChange={onChange}
        getSignature={getSignature}
        recoveryBit={recoveryBit}
        setPrivateKey={setPrivateKey}
        signature={signature}
        privateKey={privateKey}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        recipient={recipient}
        setRecipient={setRecipient}
        amount={amount}
        setAmount={setAmount}
        setTransactions={setTransactions}
        getSignature={getSignature}
      />
    </div>
  );
}

export default App;
