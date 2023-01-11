import React, { useState } from "react"

type Option = {
  label: string
  value: string
}

type SelectProps = {
  options: Option[]
  placeholder: string
  onChange?: (s: string) => void
}

const Select = ({ options, placeholder, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (onChange) {
      onChange(option.value)
    }
  }

  return (
    <div className={"shadow-box-image-shadow rounded-lg"}>
      <div
        className={`p-4 bg-white rounded-lg mb-6 cursor-pointer relative ${
          isOpen ? "rounded-bl-none rounded-br-none" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center w-full h-full">
          <div className="text-[14px] color-black font-semibold">
            {selectedOption ? selectedOption.label : placeholder}
          </div>
          <svg
            className="w-[20px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute z-50 left-0 w-full mt-2 py-1 bg-white rounded-bl-lg rounded-br-lg">
            {options.map((option) => (
              <div
                key={option.value}
                className="cursor-pointer px-4 py-1.5 block hover:bg-gray-200 text-[14px] color-black font-semibold"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Select
