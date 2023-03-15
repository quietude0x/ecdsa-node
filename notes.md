```javascript
Private Key :  c84b4c52b25b3bdf2637d63dcff8736477cf34f66d118a52edf9e43056c0ff15
Public Key :  042724e6e52cd730a38afbf7f795db64a13eecf6a7ce24609070407888ce926c474804ba6420b7ec028d0664abb314bdfbf26549b972ad4c70515ce82d5ece4ce5
Address :  7a1e3247979ecce8c4aab74901671477aae1f0f7d94617cda878cd9daf48d801
0x + Address :  0x7a1e3247979ecce8c4aab74901671477aae1f0f7d94617cda878cd9daf48d801

Message :  {
  from: '0x7a1e3247979ecce8c4aab74901671477aae1f0f7d94617cda878cd9daf48d801',
  to: '0x8e093e4fe9b96645f20707fe2e610b92043919db7dcda9c6fa56bb458119490b',
  amount: 10
}
Hashed Message :  a9556a962eff20c33f18e84289ac442113f4130dd025ace42c861c258bf4d659
Signature :  3044022036438a640d8c43a1944430fad75f53ff4b9d46f629c5cc3e1c4871b5d53fb6fa022020678226c9e508812773c25b1d9b2ee0f2a4f41463ce0abaae277c04d2e2b514
Recovery Bit :  0
```

# two ways to allowing user A to send money to user B : 

- User A give his private key to his website, website checks if it's the good private key. not the best way for obvious reasons.
- User A give a signature, the server verify it's the good signature. more secure way. 


Let's do option 2 
what do ? 

- Create the message to sign : contains : Nonce, Amount, Recipient
- 
