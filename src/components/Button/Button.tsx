import React, { ForwardedRef } from "react"

interface ButtonProps {
  variant: "primary" | "secondary" | "white"
  disabled?: boolean
  withoutMobile?: boolean
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
  className?: string
  style?: React.CSSProperties
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

const Button = React.forwardRef(
  (
    {
      variant,
      children,
      disabled,
      type,
      className,
      withoutMobile,
      style,
      href,
      onClick,
      target,
      rel,
    }: ButtonProps,
    ref,
  ) => {
    const handleClassName = () => {
      switch (variant) {
        case "primary":
          return `flex items-center justify-center bg-pink hover:bg-primary-dark text-button text-white font-semibold rounded-full ${
            withoutMobile
              ? "px-6 py-[14.5px]"
              : "px-8 py-[7.25px] lg:px-6 lg:py-[14.5px]"
          }`
        case "secondary":
          return `flex items-center justify-center bg-black hover:bg-primary-dark text-button text-white font-semibold rounded-full ${
            withoutMobile
              ? "px-6 py-[14.5px]"
              : "px-8 py-[7.25px] lg:px-6 lg:py-[14.5px]"
          }`
        case "white":
          return `flex items-center justify-center bg-white text-button text-black font-semibold rounded-full ${
            withoutMobile
              ? "px-6 py-[14.5px]"
              : "px-8 py-[7.25px] lg:px-6 lg:py-[14.5px]"
          }`
        default:
          return ""
      }
    }

    if (href) {
      return (
        <a
          href={href}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          onClick={onClick}
          className={[handleClassName(), className ? className : ""].join(" ")}
          style={style}
          target={target}
          rel={rel}
        >
          {children}
        </a>
      )
    }

    return (
      <button
        type={type || "button"}
        onClick={onClick}
        disabled={disabled}
        className={[handleClassName(), className ? className : ""].join(" ")}
        style={style}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
