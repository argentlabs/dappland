import { useEffect, useState } from "react"
import {
  connect,
  ConnectedStarknetWindowObject,
  disconnect,
  DisconnectOptions,
} from "starknetkit"

export interface UseWalletConnectionProps {
  connectedWallet: ConnectedStarknetWindowObject | null
  connectWallet: () => Promise<void>
  disconnectWallet: (options?: DisconnectOptions) => Promise<void>
  provider: string
  address: string
}

export const useWalletConnection = (): UseWalletConnectionProps => {
  const [connectedWallet, setConnectedWallet] =
    useState<ConnectedStarknetWindowObject | null>(null)
  const [provider, setProvider] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    const connectToStarknet = async () => {
      try {
        const connection = await connect({
          modalMode: "neverAsk",
          webWalletUrl: "https://web.argent.xyz",
        })
        if (connection && connection.isConnected) {
          setConnectedWallet(connection)
          setProvider(connection.account)
          setAddress(connection.selectedAddress)
        }
      } catch (error) {
        console.error("Error connecting to starknet:", error)
      }
    }
    connectToStarknet()
  }, [])

  const connectWallet = async () => {
    try {
      const connection = await connect({
        webWalletUrl: "https://web.argent.xyz",
      })
      if (connection && connection.isConnected) {
        setConnectedWallet(connection)
        setProvider(connection.account)
        setAddress(connection.selectedAddress)
      }
    } catch (error) {
      console.error("Unable to connect to your wallet:", error)
    }
  }

  const disconnectWallet = async () => {
    try {
      await disconnect({ clearLastWallet: true })
      setConnectedWallet(null)
      setProvider("")
      setAddress("")
    } catch (error) {
      console.error("unable to disconnect wallet:", error)
    }
  }

  return { connectedWallet, provider, address, connectWallet, disconnectWallet }
}
