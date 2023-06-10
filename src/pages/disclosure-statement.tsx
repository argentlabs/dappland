import Layout from "../components/Layout"
import styled from "styled-components"

const StyledSection = styled.section`
  grid-template-areas:
    "list header"
    "list cards";
  grid-template-columns: minmax(300px, 340px) 1fr;
  grid-column-gap: 64px;

  .featured {
    grid-area: header;
  }

  .categories {
    grid-area: list;
  }
`

const Home = () => {
  return (
    <Layout>
      <div className="container p-16 lg:py-64 mx-auto max-w-screen-md">
        <h1 className="bg-black dark:bg-white text-white dark:text-black pl-4 pr-4 pt-1 pb-2 text-center text-[32px] font-bold leading-[38px] rounded-md mb-6">
          Disclosure statement
        </h1>
        <p>
          The dapps accessible via dappland.com are presented for informational
          purposes only and their inclusion does not constitute an endorsement
          or validation by Argent. Argent has not audited the dapps and bears no
          responsibility for their legality, security, reliability or otherwise.
          Your use of any dapps and dappland.com is at your own risk and Argent
          will not be responsible to you for any losses you suffer as a result
          of your use.
        </p>
      </div>
    </Layout>
  )
}

export default Home
