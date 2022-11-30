import server from "./server";

function Transactions({ address, setAddress, transactions, setTransactions, setBalance }) {
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
  }

  return (
    <div className="container wallet">
      <h1>Your Transactions</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Transactions: {transactions}</div>
      <div className="balance">Next ID: {parseInt(transactions) + 1}</div>
    </div>
  );
}

export default Transactions;
