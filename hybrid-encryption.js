// const main = async () => {
//   // Import the required modules
//   var RSA = require("hybrid-crypto-js").RSA;
//   var Crypt = require("hybrid-crypto-js").Crypt;

//   // Initialize Crypt and RSA with user-entered entropy
//   var userEntropy = "Random string, integer or float";
//   var crypt = new Crypt({ entropy: userEntropy });
//   var rsa = new RSA({ entropy: userEntropy });

//   let publicKey;
//   let privateKey;

//   // User-generated keys (publicKey and privateKey)
//   await rsa.generateKeyPairAsync().then((keyPair) => {
//     publicKey = keyPair.publicKey;
//     privateKey = keyPair.privateKey;
//   });

//   console.log("public key", publicKey)
//   console.log("private key", privateKey)
//   // Message to be encrypted
//   var message = "Hello, world!";

//   // Encryption with the user's public RSA key
//   var encryptedMessage = crypt.encrypt(publicKey, message);

//   // Decryption with the user's private RSA key
//   var decryptedMessage = crypt.decrypt(privateKey, encryptedMessage);

// };

// main();

var RSA = require("hybrid-crypto-js").RSA;
var Crypt = require("hybrid-crypto-js").Crypt;

// Initialize Crypt and RSA with user-entered entropy
var userEntropy = "Random string, integer or float";
var crypt = new Crypt({ entropy: userEntropy });
var rsa = new RSA({ entropy: userEntropy });

// Exported function for encryption
exports.encrypt = async (buffer, publicKey) => {
  // Message to be encrypted
  var message = buffer;
  // Encryption with the user's public RSA key
  var encryptedMessage = crypt.encrypt(publicKey, message);
  return encryptedMessage;
};

// Exported function for decryption
exports.decrypt = (encryptedBuffer, privateKey) => {
  // Decryption with the user's private RSA key
  var decryptedMessage = crypt.decrypt(privateKey, encryptedBuffer);
  return decryptedMessage.message;
};
