import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import * as secp from '@noble/secp256k1';
import { useState } from "react";

function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
}


export default function Sign({address, setAddress, recipient, setRecipient, amount, setAmount, transactions}) {
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");
    const setValue = (setter) => (evt) => {setter(evt.target.value); getSignature()}

    function document() {
        console.log({sender: address.toLowerCase(), amount: parseInt(amount),  id: parseInt(transactions) + 1, recipient: recipient.toLowerCase()})
        return hashMessage(JSON.stringify({sender: address.toLowerCase(), amount: parseInt(amount),  id: parseInt(transactions) + 1, recipient: recipient.toLowerCase()}))
    }

    async function getSignature() {
        if (address && privateKey && amount && transactions && recipient) {
            const sig = await secp.sign(document(), privateKey, {recovered: true});
            setSignature(sig[0].toString());
            setRecoveryBit(sig[1].toString());
        }
    }

  return(
       <div className="container wallet" >
      <h1>Sign Transaction</h1>

    <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={setValue(setAddress)}></input>
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
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

        <div className="balance">Signature: {signature}</div>
        <br />
        <div className="balance">Recovery Bit: {recoveryBit}</div>


    </div>
  )
}
