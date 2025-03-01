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

type BadgeMetadata = {
  name: string;
  description: string;
  image: string;
  type: string;
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

type FungibleToken = {
  id: string;
  name: string;
  symbol: string;
  totalSupply: string;
};

interface AppData {
  apps: App[];
}

type Web3AccountAddress = `0x${string}`;

// Analytics

interface AnalyticsEvent {
  event_name: string;
  event_meta?: Record<string, any>;
}

type TrackEventFunction = (event: AnalyticsEvent) => Promise<unknown>;
