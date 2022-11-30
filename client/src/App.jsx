import Wallet from "./Wallet";
import Transactions from "./Transactions";
import Transfer from "./Transfer";
import Sign from "./Sign";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState(0);
  const [recipient, setRecipient] = useState("");
const [amount, setAmount] = useState(0);


  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        setTransactions={setTransactions}
      />
      <Transactions
        transactions={transactions}
        setTransactions={setTransactions}
        address={address}
        setAddress={setAddress}
        setBalance={setBalance}
      />
      <Sign
        address={address}
        setAddress={setAddress}
        recipient={recipient}
        setRecipient={setRecipient}
                amount={amount}
        setAmount={setAmount}
        transactions={transactions}
      />
      <Transfer setBalance={setBalance} address={address} recipient={recipient} setRecipient={setRecipient}         amount={amount}
        setAmount={setAmount} setTransactions={setTransactions}/>
    </div>

  );
}

export default App;
