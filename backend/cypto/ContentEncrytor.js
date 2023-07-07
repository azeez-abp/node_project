//const crypto  = require("crypto");
import * as crypto from "crypto";
////////////////////////data encrytion
function publicEncrypt(publicKey,message){
  const bufferMessage = Buffer.from(message,'utf-8');
 // console.log(bufferMessage)

  return {encrypted:crypto.publicEncrypt(publicKey,bufferMessage),bufferMessage:bufferMessage } 
}

function decryptWithPrivateKey(privateKey,encryptedMessage){
    const decryptor  = crypto.privateDecrypt(privateKey,encryptedMessage);
    return {decryptor:decryptor}
    
}


///////////////////////////Identity

function decryptWithPublicKey(publicKey,message){
  const bufferMessage  = Buffer.from(message,'utf-8');
 // console.log(bufferMessage)
  return {encrypted:crypto.publicDecrypt(publicKey,bufferMessage),bufferMessage:bufferMessage } 
}

function encryptWithPrivateKey(privateKey,encryptedMessage){
    const decryptor  = crypto.privateEncrypt(privateKey,encryptedMessage);
    return {decryptor:decryptor}
    
}
export const cryptoFunction = {
  enccryptWithPublicKey:publicEncrypt,
  decryptWithPrivateKey:decryptWithPrivateKey, 
  decryptWithPublicKey: decryptWithPublicKey,
  encryptWithPrivateKey:encryptWithPrivateKey
};