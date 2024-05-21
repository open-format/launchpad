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

type ErrorMessages = {
  [key: string]: string;
};

// Subgraph Data
type Badge = {
  id: string;
  name: string;
  metadataURI: string;
  createdAt: string;
};

type App = {
  id: string;
  name: string;
  createdAt: string;
  xpToken: {
    id: string;
  };
  badges: Badge[];
};

interface AppData {
  apps: App[];
}
