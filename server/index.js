const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
  "0x16bb6031cbf3a12b899ab99d96b64b7bbd719705": 20,
};

const transactions = {
  "0x1": 4,
  "0x2": 2,
  "0x3": 3,
  "0x16bb6031cbf3a12b899ab99d96b64b7bbd719705": 1,
};

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

function setInitialBalance(address) {
  if (!balances[address.toLowerCase()]) {
    balances[address.toLowerCase()] = 0;
  }
  if (!transactions[address.toLowerCase()]) {
    transactions[address.toLowerCase()] = 0;
  }
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/transactions/:address", (req, res) => {
  const { address } = req.params;
  const transaction = transactions[address] || 0;
  res.send({ transaction });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit } = req.body;

  setInitialBalance(sender.toLowerCase());
  setInitialBalance(recipient.toLowerCase());

  const document = {
    sender: sender.toLowerCase(),
    amount: parseInt(amount),
    id: parseInt(transactions[sender.toLowerCase()] + 1),
    recipient: recipient.toLowerCase(),
  };
  const pkey = secp.recoverPublicKey(
    hashMessage(JSON.stringify(document)),
    Uint8Array.from(signature.split(",")),
    parseInt(recoveryBit)
  );
  let address = keccak256(pkey.slice(1));
  address = `0x${toHex(address.slice(-20))}`;
  if (sender.toLowerCase() != address.toLowerCase()) {
    res.status(400).send({ message: "Wrong signature!" });
    return;
  }

  if (balances[sender.toLowerCase()] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
    return;
  } else {
    balances[sender.toLowerCase()] -= amount;
    balances[recipient.toLowerCase()] += amount;
    transactions[sender.toLowerCase()]++;
    res.send({
      balance: balances[sender.toLowerCase()],
      transactions: transactions[sender.toLowerCase()],
    });
    return;
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// Test Keys
// Sender: 0x16bb6031cbf3a12b899ab99d96b64b7bbd719705
// Private Key: 6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e
