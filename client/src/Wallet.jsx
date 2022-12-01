import server from "./server";

function Wallet({ address, balance, onChange }) {
  return (
    <div className="container wallet">
      <h1>Your Balance</h1>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
