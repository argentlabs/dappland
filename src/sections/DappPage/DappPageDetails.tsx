import expand from "../../assets/icons/expand.svg"
import Image from "next/image"
import styled from "styled-components"

const DetailsContainer = styled.div`
  .details-box:not(:last-child) {
    margin-bottom: 48px;

    @media (min-width: 1024px) {
      margin-bottom: 0;
    }
  }

  .details-box:last-child p:last-child {
    margin-bottom: 0;
  }
`

const DappPageDetails = ({ dappInfo }: { dappInfo: DappInfo }) => {
  return (
    <DetailsContainer
      className={`bg-white dark:bg-dark-charcoal rounded-2xl shadow-box-image-shadow px-8 py-10 mt-16 lg:grid ${
        dappInfo.tokens.length > 0 && dappInfo.teamInfo.tokenType
          ? "lg:grid-cols-3"
          : "lg:grid-cols-2"
      } xl:px-16 xl:py-16`}
    >
      <div className="details-box border-b border-clay lg:border-b-0 lg:mb-0 lg:border-r lg:mr-8 lg:pr-8">
        <h3 className="font-bold text-[22px] leading-normal">Team</h3>
        <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 mt-8 lg:mt-10">
          Founded
        </p>
        <p className="font-bold text-xl leading-6 mt-2">
          {dappInfo.teamInfo.founded
            ? new Date(dappInfo.teamInfo.founded).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "Unknown"}
        </p>
        <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 mt-8 lg:mt-10">
          Team
        </p>
        <p className="font-bold text-xl leading-6 mt-2 pb-12 lg:pb-0">
          {dappInfo.teamInfo.anonymous
            ? "Anonymous"
            : dappInfo.teamInfo.name || "Public"}
        </p>
      </div>
      <div className="details-box lg:mb-0 lg:mr-8 lg:pr-0">
        <h3 className="font-bold text-[22px] leading-normal">Safety checks</h3>
        <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 mt-8 lg:mt-10">
          Audits
        </p>
        <p className="font-bold text-xl leading-6 mt-2">
          {dappInfo.audits.length > 0 ? "Yes" : "Not evidenced"}
          {dappInfo.audits.length > 0 && dappInfo.audits[0].url && (
            <a
              className="inline-block text-pink leading-6 text-base font-semibold ml-2"
              href={dappInfo.audits[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              view{" "}
              <sup>
                <Image src={expand} alt="expand icon" />
              </sup>
            </a>
          )}
        </p>
        <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 mt-8 lg:mt-10">
          Dapp contract/s
        </p>
        {dappInfo.contracts?.length ? (
          dappInfo.contracts.map((item) => (
            <p key={item.name} className="mt-2">
              <a
                href={`https://starkscan.co/contract/${item.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-pink text-base truncate max-w-[200px] leading-6 font-semibold"
              >
                {item.name}
              </a>
            </p>
          ))
        ) : dappInfo.goerliContracts?.length ? (
          dappInfo.goerliContracts.map((item) => (
            <p key={item.name} className="mt-2">
              <a
                href={`https://testnet.starkscan.co/contract/${item.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-pink text-base truncate max-w-[200px] leading-6 font-semibold"
              >
                {item.name}
              </a>
            </p>
          ))
        ) : (
          <p className="font-bold text-xl leading-6 mt-2">N/A</p>
        )}
      </div>
      {dappInfo.tokens.length > 0 && dappInfo.teamInfo.tokenType && (
        <div className="details-box lg:border-l border-t border-clay lg:border-t-0 lg:pl-8">
          <h3 className="font-bold text-[22px] leading-normal">Token</h3>
          <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 mt-8">
            Token
          </p>
          <p className="font-bold text-xl leading-6 mt-2">
            {dappInfo.teamInfo.tokenType || "N/A"}
          </p>
          <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 mt-8 lg:mt-10">
            Token address
          </p>
          {dappInfo.tokens.map((token) => (
            <p
              key={token.address}
              className="mt-2 text-pink text-base truncate leading-none font-semibold max-w-[200px]"
            >
              {token.address}
            </p>
          ))}
        </div>
      )}
    </DetailsContainer>
  )
}

export default DappPageDetails
