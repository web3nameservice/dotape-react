const EthCrypto = require('eth-crypto');
var CryptoJS = require("crypto-js");

export async function encryptWithPublicKeys(message, publicKey) {
    console.log(message, publicKey)
    const encrypted = await EthCrypto.encryptWithPublicKey(
        publicKey, // publicKey
        JSON.stringify(message)
    );
    return JSON.stringify(encrypted);
}

export async function decryptWithPrivateKeys(message, privateKey) {
    const decrypted = await EthCrypto.decryptWithPrivateKey(
        privateKey, // publicKey
        JSON.parse(message)
    );
    return JSON.parse(decrypted)
}

export async function encryptWithPassword(message, password) {
    var ciphertext = CryptoJS.AES.encrypt(message, password).toString();
    return ciphertext;
}

export async function decryptWithPassword(encrypted, password) {
    var bytes = CryptoJS.AES.decrypt(encrypted, password);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}
