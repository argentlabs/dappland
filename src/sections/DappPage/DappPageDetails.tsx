import expand from "../../assets/icons/expand.svg"
import Image from "next/image"
import styled from "styled-components"

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    padding: 4rem 2rem;
  }

  .details-box {
    @media (min-width: 1024px) {
      flex-grow: 1;
      padding: 0 2rem;
    }
  }

  .divider {
    height: 1px;
    margin: 2.5rem 0;
    background: #c2c0be;

    @media (min-width: 1024px) {
      width: 1px;
      height: auto;
      flex-grow: 0;
      margin: 0 2rem;
    }
  }
`

const DappPageDetails = ({ dappInfo }: { dappInfo: DappInfo }) => {
  return (
    <DetailsContainer
      className={`bg-white dark:bg-dark-charcoal rounded-2xl shadow-box-image-shadow mt-16`}
    >
      <div className="details-box">
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
        <p className="font-bold text-xl leading-6 mt-2 lg:pb-0">
          {dappInfo.teamInfo.anonymous
            ? "Anonymous"
            : dappInfo.teamInfo.name || "Public"}
        </p>
      </div>

      <div className="divider"></div>

      <div className="details-box">
        <h3 className="font-bold text-[22px] leading-normal">Safety checks</h3>
        <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 mt-8 lg:mt-10">
          Audits
        </p>
        <p className="font-bold text-xl leading-6 mt-2">
          {dappInfo.audits.length > 0 ? "Yes" : "No"}
          {dappInfo.audits.length > 0 && dappInfo.audits[0].url && (
            <a
              className="inline-block text-pink leading-6 text-base font-semibold ml-2"
              href={dappInfo.audits[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              view{" "}
              <sup>
                <Image src={expand} alt="expand icon" width={24} height={24} />
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

      <div className="divider"></div>

      <div className="details-box">
        <h3 className="font-bold text-[22px] leading-normal">Token info</h3>
        <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 mt-8 lg:mt-10">
          Has a token?
        </p>

        <p className="font-bold text-xl leading-6 mt-2">
          {dappInfo.tokens.length > 0 ? "Yes" : "Not yet"}
        </p>
        <p className="text-light-charcoal dark:text-clay font-medium text-xl leading-6 mt-8 lg:mt-10">
          Tokens
        </p>

        {dappInfo.tokens?.length ? (
          dappInfo.tokens.map((item) => (
            <p key={item.address} className="mt-2">
              <a
                href={`https://starkscan.co/contract/${item.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-pink text-base truncate max-w-[200px] leading-6 font-semibold"
              >
                {item.symbol}
              </a>
            </p>
          ))
        ) : (
          <p className="font-bold text-xl leading-6 mt-2">N/A</p>
        )}
      </div>
    </DetailsContainer>
  )
}

export default DappPageDetails
