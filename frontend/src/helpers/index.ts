import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_REACT_APP_SECRET_KEY as string;

export function encryptMessage(message: string) {
  const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
  return ciphertext;
}

export function decryptMessage(encryptedMessage: string) {
  if (encryptedMessage) {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  } else {
    console.log('encryptedMessage', encryptedMessage);
  }
}
