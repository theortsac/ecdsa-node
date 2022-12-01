export default function Sign({
  address,
  recipient,
  setRecipient,
  amount,
  setAmount,
  onChange,
  getSignature,
  signature,
  recoveryBit,
  setPrivateKey,
  privateKey,
}) {
  const setValue = (setter) => async (evt) => {
    await setter(evt.target.value);
    getSignature();
  };

  return (
    <div className="container wallet">
      <h1>Sign Transaction</h1>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label>

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
        Private Key
        <input
          placeholder="Your private key"
          value={privateKey}
          type="password"
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <div className="balance">Signature: {signature}</div>
      <br />
      <div className="balance">Recovery Bit: {recoveryBit}</div>
    </div>
  );
}
