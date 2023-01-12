import { useOnClickOutside } from "../../hooks/useClickOutside"
import React, { useEffect, useRef, useState } from "react"

type Option = {
  label: string
  value: string
}

type SelectProps = {
  options: Option[]
  placeholder: string
  onChange?: (s: string) => void
  defaultValue?: string | null
}

const Select = ({
  options,
  placeholder,
  onChange,
  defaultValue,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find((option) => option.value === defaultValue) || null,
  )

  useEffect(() => {
    const foundOption = options.find((option) => option.value === defaultValue)
    if (foundOption) {
      setSelectedOption(foundOption)
    }
  }, [defaultValue])

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, (event) => {
    setIsOpen(false)
  })

  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (onChange) {
      onChange(option.value)
    }
  }

  return (
    <div className="relative h-[38px] mb-8">
      <div
        className={
          "shadow-box-image-shadow rounded-lg absolute w-full z-50 select-none"
        }
        ref={ref}
      >
        <div
          className={`pl-4 pr-3 bg-white dark:bg-[#333] rounded-lg cursor-pointer relative shadow-outline-blue ${
            !isOpen ? "py-2.5" : "pt-2.5 pb-2"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-col">
            <div
              className={`flex items-center justify-between ${
                isOpen ? "pb-1.5" : "pb-0"
              }`}
            >
              <div className="text-[14px] leading-[14px] color-black dark:color-white font-semibold">
                {selectedOption ? selectedOption.label : placeholder}
              </div>
              <svg
                className="w-[20px] fill-black dark:fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
            {isOpen && (
              <div className="select-none w-full">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="cursor-pointer py-1.5 block hover:bg-gray-200 text-[14px] color-black font-semibold"
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Select
