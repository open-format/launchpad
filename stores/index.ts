import { create } from "zustand";

interface AccountState {
  address: string;
  setAddress: (key: string) => void;
  encryptedAccountKey: string;
  setEncryptedAccountKey: (value: string) => void;
}

export const useAccountStore = create<AccountState>()((set) => ({
  address: "",
  encryptedAccountKey: "",
  setAddress: (key) => set({ address: key }),
  setEncryptedAccountKey: (key) => set({ encryptedAccountKey: key }),
}));
