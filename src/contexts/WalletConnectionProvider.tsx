import {
  UseWalletConnectionProps,
  useWalletConnection,
} from "../hooks/useWalletConnection"
import React, { ReactNode, createContext, useContext } from "react"

const WalletConnectionContext = createContext<UseWalletConnectionProps | null>(
  null,
)

export const useWalletConnectionContext = () => {
  return useContext(WalletConnectionContext)
}

export const WalletConnectionProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const walletConnection = useWalletConnection()

  return (
    <WalletConnectionContext.Provider value={walletConnection}>
      {children}
    </WalletConnectionContext.Provider>
  )
}
