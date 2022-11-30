import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, setTransactions}) {
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
      <h1>Your Balance</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
