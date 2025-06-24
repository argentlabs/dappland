import Link from "next/link"

const Footer = () => {
  return (
    <section>
      <iframe
        src="https://newsletter.dappland.com/embed"
        width="100%"
        height="320"
        className="no-border"
        frameBorder="0"
        scrolling="no"
      >
        &nbsp;
      </iframe>

      <footer className="w-full py-6 px-4 border-t border-border-grey dark:border-white/10 flex flex-col md:flex-row justify-between">
        <p className="text-center font-medium text-base leading-[16px] mx-4 mb-4 md:mb-0">
          Built with ❤️ by <Link href="https://www.ready.co/">Ready</Link>
        </p>
        <p className="text-center font-medium text-base leading-[16px] mb-4 md:mb-0">
          <Link href="/disclosure-statement">
            <a className="inline-block mx-2">Disclosure statement</a>
          </Link>
          <Link href="/terms" className="inline-block my-4 mx-4">
            <a className="inline-block mx-2">Terms of use</a>
          </Link>
          <Link href="/privacy" className="inline-block my-4 mx-4">
            <a className="inline-block mx-2">Privacy policy</a>
          </Link>
        </p>
      </footer>
    </section>
  )
}

export default Footer
