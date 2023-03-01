import React from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: Props) {
  return (
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[5] outline-none focus:outline-none">
            <div className="relative w-full mx-6 my-6 mx-auto max-w-[646px]">
              <div className="border-0 h-full rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <button
                    className="absolute top-0 right-0 p-2 rounded-full text-black"
                    onClick={onClose}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {children}
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-[3] bg-black"></div>
        </>
      ) : null}
    </>
  )
}
