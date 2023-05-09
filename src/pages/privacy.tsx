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
          Dappland.com Privacy Policy
        </h1>

        <p className="my-4">This is the privacy policy (“Privacy Policy”) for dappland.com (“Dappland”) operated by ARGENT LABS LIMITED, company registration number 11093638, with its registered office address at 5 New Street Square, London, England, EC4A 3TW (“our”, “we”, or “Argent”). Argent is the controller of your personal data collected through Dappland and we are committed to protecting and respecting your privacy.</p>

        <h3 className="text-[24px] font-bold mt-[32px]">1. Introduction</h3>

        <p className="my-4">This Privacy Policy explains who we are, why and how we process personal data collected through your use of Dappland and, if you are the subject of any of the personal data concerned, what rights you have and how to get in touch with us if you need to.</p>

        <p className="my-4">When you supply any personal data to us we have legal obligations towards you in the way we use that data. We must collect the information fairly and explain to you how we will use it. For ease of reading, we have divided this Privacy Policy into several sections:</p>

        <ol className="list-decimal pl-8 my-8">
          <li className="mb-2">Introduction</li>
          <li className="mb-2">What information we collect</li>
          <li className="mb-2">How and why we use/share your information</li>
          <li className="mb-2">How long we keep your information</li>
          <li className="mb-2">Security</li>
          <li className="mb-2">International data transfers</li>
          <li className="mb-2">Your rights</li>
          <li className="mb-2">Contact details</li>
        </ol>

        <p className="my-4">It is important that you read this Privacy Policy together with any other privacy notice or fair processing notice that we may provide at or around the time that we collect or process personal data about you so that you are fully aware of how and why we are using that data.</p>
        <p className="my-4">This Privacy Policy supplements other notices and legal documents and is not intended to override or replace them.</p>
        <p className="my-4">If, for any reason, you do not agree to the terms of this Privacy Policy, please stop using Dappland.</p>
        <p className="my-4">We reserve the right to revise or amend this Privacy Policy at any time to reflect changes to our business or changes in the law. Where these changes are significant we will endeavour to contact all of our registered users to make sure that they are informed of such changes.</p>
        <p className="my-4">Please note that Dappland is not intended for use by nor directed at anyone under the age of 18 and we do not knowingly collect data relating to children. If you believe we have collected personal information about your child, you may contact us at <a href="mailto:legal@argent.xyz" className="text-pink">legal@argent.xyz</a> and request that we remove information about them.</p>

        <h3 className="text-[24px] font-bold mt-[32px]">2. What information we collect</h3>
        <h4 className="text-[20px] font-bold mt-[20px]">What is personal data?</h4>

        <p className="my-4">Where this Privacy Policy refers to ‘personal data’ it is referring to data about you from which you could be identified – such as your name, your date of birth, or your contact details.</p>
        <p className="my-4">By law all organisations who process your personal data in the UK and Europe are obliged to process your personal data in certain ways and to ensure that you are given an appropriate amount of information about how they use it. You also have various rights to seek information from those organisations about how they are using your data, and to prevent them from processing it unlawfully. For more information about these rights, please see the ‘Your Rights’ section of this Privacy Policy.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">How and what types of data we collect from you when you use Dappland?</h4>

        <p className="my-4">When you use Dappland we may collect, store and use certain personal information that you disclose to us.</p>
        <p className="my-4">The information we collect from you may include (but is not limited to): your IP address, email address and feedback.</p>
        <p className="my-4">We shall also collect information about you when you visit and interact with Dappland through the use of technologies such as cookies. The following are examples of information we may collect:</p>

        <ul className="list-disc pl-8 my-8">
          <li className="mb-2">information about your device, browser or operating system;</li>
          <li className="mb-2">time zone setting;</li>
          <li className="mb-2">your IP address;</li>
          <li className="mb-2">information about interactions you have with Dappland (such as scrolling and clicks);</li>
          <li className="mb-2">information about the way you use and the actions you take within Dappland;</li>
          <li className="mb-2">length of time on Dappland and time spent within certain sections;</li>
          <li className="mb-2">response times; and</li>
          <li className="mb-2">download errors.</li>
        </ul>

        <p className="my-4">Please refer to your device’s help material to learn what controls you can use to remove cookies, block cookies, or disable IDFA tracking. If you do this, it may affect your use of Dappland.</p>
        <p className="my-4">We may also partner with third parties who may collect anonymous usage or statistical data through your use of Dappland (including, for example, sub-contractors in technical services, business partners, advertising networks, analytics providers).</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Updating your information</h4>

        <p className="my-4">If you want to update the information you have previously given to us, you can contact us at <a href="mailto:legal@argent.xyz" className="text-pink">legal@argent.xyz</a>.</p>


        <h3 className="text-[24px] font-bold mt-[32px]">3. How and why we use/share your information</h3>

        <h4 className="text-[20px] font-bold mt-[20px]">Lawful basis for processing your information</h4>

        <p className="my-4">We will only use your personal data when the law allows us to. Most commonly we will use your personal data in the following circumstances:</p>

        <ul className="list-disc pl-8 my-8">
          <li className="mb-2">Where you have asked us to do so, or consented to us doing so;</li>
          <li className="mb-2">Where we need to do so in order to perform a contract we have entered into with you;</li>
          <li className="mb-2">Where it is necessary for our legitimate interests (or those of a third party) and your fundamental rights do not override those interests; and</li>
          <li className="mb-2">Where we need to comply with a legal or regulatory obligation.</li>
        </ul>

        <h4 className="text-[20px] font-bold mt-[20px]">Marketing</h4>

        <p className="my-4">You will receive marketing messages from us if you have given us your consent to do so or if you have provided feedback and have not opted out of receiving marketing messages (and it is within our legal rights, when balanced against your rights and freedoms as an individual, to serve you with marketing).</p>
        <p className="my-4">To unsubscribe from marketing emails at any time, please click on the unsubscribe link at the bottom of any marketing email and update your account preferences. You may also contact us to inform us if you do not wish to receive any marketing materials from us.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Sharing your information</h4>

        <p className="my-4">Depending on how and why you provide us with your personal data, we may share it in the following ways:</p>

        <ul className="list-disc pl-8 my-8">
          <li className="mb-2">we may share your personal information with any member of our group where there is a valid and lawful reason to do so, which means our subsidiaries, our ultimate holding company and its subsidiaries, as defined in section 1159 of the UK Companies Act 2006;</li>
          <li className="mb-2">with selected third parties including business partners, suppliers and subcontractors for the performance of any contract we enter into with them or you (see “Service Providers” below); or</li>
          <li className="mb-2">with analytics that assist us in the improvement and optimisation of Dappland.</li>
        </ul>

        <p className="my-4">We may also disclose your personal information to third parties in the following events:</p>

        <ul className="list-disc pl-8 my-8">
          <li className="mb-2">if we were to sell or buy any business or assets, in which case we might disclose your personal information to the prospective seller or buyer of such business or assets;</li>
          <li className="mb-2">if Argent or substantially all of its assets are acquired by a third party, in which case personal information held by us about our customers will be one of the transferred assets; or</li>
          <li className="mb-2">if we are under a duty to disclose or share your personal information in order to comply with any legal obligation, or in order to enforce or apply our terms of service; or to protect the rights, property, or safety of our company, our customers, or others. This includes exchanging information with other companies and organisations for the purposes of fraud protection and credit risk reduction.</li>
        </ul>

        <h4 className="text-[20px] font-bold mt-[20px]">Service Providers</h4>

        <p className="my-4">Our service providers provide us with a variety of administrative, statistical, and technical services. We will only provide service providers with the minimum amount of personal data they need to fulfil the services we request, and we stipulate that they protect this information and do not use it for any other purpose. We take these relationships seriously and oblige all of our data processors to sign contracts with us that clearly set out their commitment to respecting individual rights, and their commitments to assisting us to help you exercise your rights as a data subject. The following is a non-exhaustive list of trusted third party service providers: Amazon Web Services, Google Analytics, Amplitude, Branch, SendGrid, Twilio, Mezmo, Datadog, Snowflake and Segment.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Other Disclosures</h4>
        <p className="my-4">During your use of Dappland, your mobile network operator may also collect personal information about you regarding your use of Dappland such as your identity, your usage and location.</p>
        <p className="my-4">These third parties shall act as separate and independent controllers of that personal data and shall process it in accordance with their own privacy policy.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Links to third party sites</h4>
        <p className="my-4">The Platform contains links to and from third party websites. Third party websites are out of our control and are not covered by this Privacy Policy. If you access third party sites using the links provided, the operators of these sites may collect information from you that could be used by them, in accordance with their own privacy policies. Please check these policies before you submit any personal data to those websites.</p>

        <h3 className="text-[24px] font-bold mt-[32px]">How long we keep your information</h3>
        <p className="my-4">We will hold your personal information on our systems only for as long as required to provide you with the products and services you have requested, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.</p>
        <p className="my-4">In some circumstances you can ask us to delete your data: see ‘Your Rights’ below for further information.</p>
        <p className="my-4">In some circumstances we may anonymise your personal data (so that it can no longer be associated with you) for research or statistical purposes in which case we may use this information indefinitely without further notice to you.</p>


        <h3 className="text-[24px] font-bold mt-[32px]">5. Security</h3>
        <p className="my-4">Argent takes the protection of your information very seriously. We have put in place appropriate physical, electronic and managerial security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed, including use of secure servers, passwords and industry standard encryption for data both in transit and at rest (for data in transit we use up-to-date versions of SSL and for data at rest we use AES-256).</p>
        <p className="my-4">In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.</p>
        <p className="my-4">We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.</p>


        <h3 className="text-[24px] font-bold mt-[32px]">6. International Data Transfers</h3>
        <p className="my-4">Please note that some of our service providers may be based outside of the United Kingdom ("UK") and the European Economic Area (the “EEA”).</p>
        <p className="my-4">Where we transfer your data to a service provider that is outside of the UK and/or the EEA we seek to ensure that appropriate safeguards are in place to make sure that your personal data is held securely and that your rights as a data subject are upheld. Transfers of personal data are either made:</p>

        <ul className="list-disc pl-8 my-8">
          <li className="mb-2">to a country recognised by the European Commission and/or the UK Secretary of State as providing an adequate level of protection; or</li>
          <li className="mb-2">to a country which does not offer adequate protection but whose transfer has been governed by the standard contractual clauses of the European Commission, the UK International Data Transfer clauses or by implementing other appropriate cross-border transfer solutions to provide adequate protection.</li>
        </ul>
        <p className="my-4">By submitting your personal information, you agree to this transfer, storing or processing. If you would like more information about the mechanism via which your personal data is transferred please contact <a href="mailto:legal@argent.xyz" className="text-pink">legal@argent.xyz</a>.</p>



        <h3 className="text-[24px] font-bold mt-[32px]">7. Your Rights</h3>
        <p className="my-4">As a data subject you have a number of rights in relation to your personal data. Below, we have described the various rights that you have as well as how you can exercise them.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Right of Access</h4>
        <p className="my-4">You may, at any time, request access to the personal data that we hold which relates to you (you may have heard of this right being described as a “subject access request”).</p>
        <p className="my-4">Please note that this right entitles you to receive a copy of the personal data that we hold about you in order to enable you to check that it is correct and to ensure that we are processing that personal data lawfully. It is not a right that allows you to request personal data about other people, or a right to request specific documents from us that do not relate to your personal data.</p>
        <p className="my-4">You can exercise this right at any time by writing to us using the contact details set out here and telling us that you are making a subject access request. You do not have to fill in a specific form to make this kind of request.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Your Right to Rectification and Erasure</h4>
        <p className="my-4">You may, at any time, request that we correct personal data that we hold about you which you believe is incorrect or inaccurate. Please note that we may ask you to verify any new data that you provide to us and may take our own steps to check that the new data you have supplied us with is right.</p>
        <p className="my-4">You may also ask us to erase personal data that we control if you do not believe that we need to continue retaining it (you may have heard of this right described as the “right to be forgotten”). Although we will do everything to respect your request and personal data it may not always be possible to erase all of your personal data as there may be legal requirements to keep certain personal data or technical limitations to the data we can delete; for example, we are not able to satisfy requests to erase records and information recorded on the blockchain, including, but not limited to, your chosen user name, your transaction history and your account balance.</p>
        <p className="my-4">There may also be legitimate interests in keeping certain data. If this is the case we will continue to process this data.</p>
        <p className="my-4">If erasure is not technically possible or we believe that we have a good legal reason to continue processing personal data that you ask us to erase we will tell you this and our reasoning at the time we respond to your request.</p>
        <p className="my-4">You can exercise this right at any time by writing to us using the contact details set out here and telling us that you are making a request to have your personal data rectified or erased and on what basis you are making that request. If you want us to replace inaccurate data with new data, you should tell us what that new data is. You do not have to fill in a specific form to make this kind of request.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Your Right to Restrict Processing</h4>
        <p className="my-4">Where we process your personal data on the basis of a legitimate interest you are entitled to ask us to stop processing it in that way if you feel that our continuing to do so impacts on your fundamental rights and freedoms or if you feel that those legitimate interests are not valid.</p>
        <p className="my-4">You may also ask us to stop processing your personal data (a) if you dispute the accuracy of that personal data and want us verify that data’s accuracy; (b) where it has been established that our use of the data is unlawful but you do not want us to erase it; (c) where we no longer need to process your personal data (and would otherwise dispose of it) but you wish for us to continue storing it in order to enable you to establish, exercise or defend legal claims.</p>
        <p className="my-4">Please note that if for any reason we believe that we have a good legal reason to continue processing personal data that you ask us to stop processing, we will tell you what that reason is, either at the time we first respond to your request or after we have had the opportunity to consider and investigate it.</p>
        <p className="my-4">You can exercise this right at any time by writing to us using the contact details set out here and telling us that you are making a request to have us stop processing the relevant aspect of your personal data and describing which of the above conditions you believe is relevant to that request. You do not have to fill in a specific form to make this kind of request.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Your Right to Portability</h4>
        <p className="my-4">Where you wish to transfer certain personal data that we hold about you, which is processed by automated means, to a third party you may write to us and ask us to provide it to you in a commonly used machine-readable format.</p>
        <p className="my-4">Because of the kind of work that we do and the systems that we use, we do not envisage this right being particularly relevant to the majority of individuals with whom we interact. However, if you wish to transfer your data from us to a third party we are happy to consider such requests.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Your Right to object to processing</h4>
        <p className="my-4">You may object to processing of your personal data where we rely on legitimate interest for processing that personal data. We will comply with your request unless we have a compelling overriding legitimate interest for processing or we need to continue processing your personal data to establish, exercise or defend a legal claim.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Your Right to stop receiving communications</h4>
        <p className="my-4">For details on your rights to ask us to stop sending you various kinds of communications, please contact us.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Your Right to object to automated decision making and profiling</h4>
        <p className="my-4">You have the right to be informed about the existence of any automated decision making and profiling of your personal data, and where appropriate, be provided with meaningful information about the logic involved, as well as the significance and the envisaged consequences of such processing that affects you.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Withdrawal of consent</h4>
        <p className="my-4">Where we are relying on consent to process your personal data you may withdraw consent at any time. However, this will not affect the lawfulness of any processing carried out before you withdraw your consent. If you withdraw your consent, we may not be able to provide certain products or services to you. We will advise you if this is the case at the time you withdraw your consent.</p>

        <h4 className="text-[20px] font-bold mt-[20px]">Exercising your rights</h4>
        <p className="my-4">When you write to us making a request to exercise your rights we are entitled to ask you to prove that you are who you say you are. We may ask you to provide copies of relevant ID documents to help us to verify your identity.</p>
        <p className="my-4">It will help us to process your request if you clearly state which right you wish to exercise and, where relevant, why it is that you are exercising it. The clearer and more specific you can be, the faster and more efficiently we can deal with your request. If you do not provide us with sufficient information then we may delay actioning your request until you have provided us with additional information (and where this is the case we will tell you).</p>



        <h3 className="text-[24px] font-bold mt-[32px]">7. Contact Details</h3>
        <p className="my-4">If you have any queries regarding this Privacy Policy, if you wish to exercise any of your rights set out above or if you think that the Privacy Policy has not been followed, please contact us by emailing at <a href="mailto:legal@argent.xyz" className="text-pink">legal@argent.xyz</a>.</p>
        <p className="my-4">You also have the right to lodge a complaint to the Information Commissioner’s Office (ICO), the UK supervisory authority for data protection issues (<a href="https://www.ico.org.uk" className="text-pink">www.ico.org.uk</a>). We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us in the first instance.</p>

      </div>
    </Layout>
  )
}

export default Home
