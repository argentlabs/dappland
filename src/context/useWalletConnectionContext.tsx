import { useWalletConnection } from "../hooks/useWalletConnection"
import React, { ReactNode, createContext, useContext } from "react"

// TODO: pass default value to context
const WalletConnectionContext = createContext()

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
