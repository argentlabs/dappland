import create from "zustand"

interface WalletState {
  connectedWallet: any
  setConnectedWallet: (wallet: any) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  connectedWallet: null,
  setConnectedWallet: (wallet) =>
    set(() => ({
      connectedWallet: wallet,
    })),
}))
