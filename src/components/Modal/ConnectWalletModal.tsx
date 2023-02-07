import argentLogo from "../../assets/argentLogo.svg"
import alert from "../../assets/icons/alert.svg"
import Button from "../Button/Button"
import Modal from "./Modal"
import Image from "next/image"
import React from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  error: any
}

const ConnectWalletModal = ({ isOpen, onClose, onConfirm, error }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="flex flex-col items-center justify-center mt-10">
      <Image src={argentLogo} alt="argent-logo" />
      <div className="text-[40px] leading-[40px] font-bold mt-8 text-black text-center">
        Connect and rate
      </div>
      <div className="text-[20px] leading-[28px] text-center font-light text-black mt-8 mb-10 max-w-[75%]">
        To rate this dapp, you need to have used StarkNet. Please connect your
        StarkNet wallet and allow Dappland to check your on-chain history.
      </div>
      <div className="pb-14">
        <Button variant="primary" onClick={onConfirm}>
          Connect and rate
        </Button>
      </div>
      {error && (
        <div className="bg-black flex gap-3 items-center color-white font-[14px] p-4 rounded-lg mb-14">
          <Image src={alert} alt="alert" />
          <div>{error}</div>
        </div>
      )}
    </div>
  </Modal>
)

export default ConnectWalletModal
