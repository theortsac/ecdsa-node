import server from "./server";

function Transactions({ address, transactions, onChange }) {
  return (
    <div className="container wallet">
      <h1>Your Transactions</h1>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Transactions: {transactions}</div>
      <br />
      <div className="balance">Next ID: {parseInt(transactions) + 1}</div>
    </div>
  );
}

export default Transactions;
