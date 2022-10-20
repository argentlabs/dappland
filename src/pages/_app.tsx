import "../styles/globals.css"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Script from "next/script"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Script
        strategy="afterInteractive"
        defer
        data-domain="dappland.com"
        data-api="/x/api/event"
        src="/x/js/script.js"
      />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
