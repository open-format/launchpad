import CryptoJS from "crypto-js";

export function encrypt(value: string, secret: string): string {
  const encrypted = CryptoJS.AES.encrypt(value, secret);
  return encrypted.toString();
}

export function decrypt(
  encryptedValue: string,
  secret: string
): string {
  const decrypted = CryptoJS.AES.decrypt(encryptedValue, secret);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
