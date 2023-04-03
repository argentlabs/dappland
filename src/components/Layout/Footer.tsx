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

      <footer className="w-full py-6 px-4 border-t border-border-grey dark:border-white/10">
        <p className="text-center font-medium text-base leading-[16px]">
          Built with ❤️ by{" "}
          <a href="https://www.argent.xyz/?utm_source=dappland">Argent</a>
        </p>
      </footer>
    </section>
  )
}

export default Footer
