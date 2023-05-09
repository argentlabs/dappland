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
      <div className="container p-16 lg:py-48 mx-auto max-w-screen-md">
        <h1 className="bg-black dark:bg-white text-white dark:text-black pl-4 pr-4 pt-1 pb-2 text-center text-[32px] font-bold leading-[38px] rounded-md mb-6">
          Dappland.com Terms of Use
        </h1>
        <h3 className="text-[24px] font-bold mt-[24px]">Terms of Use</h3>

        <p>These Terms of Use define the rights and obligations of the parties in connection with the use of the website accessible at www.dappland.com (hereinafter the “Site”).  These terms of use may be amended at our discretion.</p>

        <h3 className="text-[24px] font-bold mt-[24px]">Availability</h3>
        <p>The Site is provided on an “as is” and “as available” basis. Access to the Site may be suspended due to technical maintenance, migration or updates, or due to breakdowns or constraints in relation with the operation of the Internet. Argent gives no warranty regarding the Site and to the maximum extent permitted by law accepts no liability for any losses you suffer as a result of using the Site.</p>

        <h3 className="text-[24px] font-bold mt-[24px]">Intellectual Property Rights</h3>
        <p>Argent is the sole owner of all intellectual property rights related to the Site. Any content presently displayed or made available in the future, such as text, logos, images, music, digital downloads, and data compilations, is the property of Argent, its affiliates or its suppliers and is protected by English and international intellectual property law. Argent's names and logos are trademarks of Argent.  Accordingly, you agree not to reproduce, represent, extract and use in any way any or all of Argent's trademarks, logos, or other content on the Site.</p>

        <h3 className="text-[24px] font-bold mt-[24px]">Disclaimer</h3>
        <p>The dApps accessible via dappland.com are presented for informational purposes.  The information included on the Site does not constitute legal, financial or investment advice and is not intended as a recommendation for buying, trading or selling crypto assets. It is recommended to seek advice from legal and financial experts before starting buying, trading or selling crypto assets. Argent Labs Ltd, and all other companies mentioned on the Site will not be responsible for the consequences of reliance upon any opinion or statement contained herein or for any omission.</p>
        <p>Crypto assets are volatile. You should be fully aware of the level of risk involved before engaging in crypto-related activities. Any loss of data, crypto assets or profit is your sole responsibility.</p>

        <h3 className="text-[24px] font-bold mt-[24px]">Governing law and jurisdiction</h3>
        <p>This Agreement shall be governed by and interpreted in accordance with the laws of England and Wales and all disputes arising under this Agreement shall be subject to the exclusive jurisdiction of the English and Welsh courts.</p>
      </div>
    </Layout>
  )
}

export default Home
