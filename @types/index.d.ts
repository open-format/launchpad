type KeyState = {
  address: string;
  privateKey: string;
  encryptedAccountKey: string;
  recoveryPhrase: string;
};

interface ErrorResponse {
  status: number;
  message: string;
}

interface AccountKeyResponse {
  accountKey: string;
}

interface ActionResponse<T> {
  data?: T;
  error?: string;
}

interface AddressResponse {
  address: string;
}
