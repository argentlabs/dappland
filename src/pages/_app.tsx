import "../styles/globals.css"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Script from "next/script"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Script
        id="plausible"
        strategy="afterInteractive"
        defer
        data-domain="dappland.com"
        src="https://plausible.io/js/plausible.js"
      />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
