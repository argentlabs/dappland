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
          Built with ❤️ by{" "}
          <Link href="https://www.argent.xyz/?utm_source=dappland">Argent</Link>
        </p>
        <p className="text-center font-medium text-base leading-[16px] mb-4 md:mb-0">
          <Link href="/disclosure-statement" className="my-4">
            Disclosure statement
          </Link>
        </p>
      </footer>
    </section>
  )
}

export default Footer
