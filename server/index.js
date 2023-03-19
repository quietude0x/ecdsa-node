const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

async function recoverKey(message, signature, recoveryBit) {
  return secp.recoverPublicKey(message, signature, recoveryBit);
}

function getAddress(publicKey) {
  return "0x" + toHex(keccak256(publicKey.slice(1)).slice(-20));
}

const balances = {
  "0x3517adcb707526f6cbfe58fd49d3268071a9e1dc": 1000,
  "0x63ad79723ec0d465d352388143f31e97772fd4eb": 500,
  "0xd971f1edfd4b3449d0c90c94cfd8ad78fe591054": 750,
};

const nonces = {
  "0x3517adcb707526f6cbfe58fd49d3268071a9e1dc": 0,
  "0x63ad79723ec0d465d352388143f31e97772fd4eb": 0,
  "0xd971f1edfd4b3449d0c90c94cfd8ad78fe591054": 0,
};

const signatures = new Set();

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  const nonce = nonces[address] || 0;
  res.send({ balance, nonce });
});

app.post("/send", async (req, res) => {
  const { recipient, amount, message, signature, recoveryBit } = req.body;

  if (signatures.has(signature)) {
    return res.status(403).send({message: "Signature already processed"});
  }

  const publicKey = await recoverKey(message, signature, parseInt(recoveryBit));
  const isValid = secp.verify(signature, message, publicKey);

  if (!isValid) {
    return res.status(401).send({message: "Invalid signature"});
  }
  const sender = getAddress(publicKey);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    signatures.add(signature);
    nonces[sender]++;
    balances[sender] -= amount;
    balances[recipient] += amount;
    return res.send({ balance: balances[sender], nonce: nonces[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
