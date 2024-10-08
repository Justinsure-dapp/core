import DocTitle from "../../common/DocTitle";

export default function () {
  return (
    <div>
      <DocTitle>Developer Documentation</DocTitle>

      <article>
        <div className="mt-4 mx-auto p-6 text-front rounded-lg shadow-md tracking-wide font-light">
          <H1>Overview (JustInsure Mechanics)</H1>
          <p className="text-mute">
            A decentralized insurance platform for trustless coverage and claims
            management.
          </p>
          <H2>Summary</H2>
          JustInsure is a pioneering decentralized insurance platform designed
          to provide trustless coverage and efficient claims management. By
          utilizing smart contracts, JustInsure ensures transparency and
          security, allowing users to participate in a fair insurance ecosystem
          without intermediaries. <BR /> The platform aims to leverage
          blockchain technology to enhance the accessibility and efficiency of
          insurance products.
          <H3>Key Features:</H3>
          <div className="pl-4 opacity-80">
            <p className="mb-2">
              <B>Smart Contracts:</B> All insurance policies and claims are
              governed by automated smart contracts, ensuring transparency and
              reliability in operations.
            </p>
            <p className="mb-2">
              <B>Decentralized Claims Management:</B> Claims are processed
              through a community-driven approach, minimizing disputes and
              ensuring fair resolutions.
            </p>
            <p className="mb-2">
              <B>Tokenomics:</B> The platform utilizes its native token SureCoin
              for governance, allowing users to participate in decision-making
              and share in the platform's success. This
            </p>
            <p className="mb-2">
              <B>Interoperability:</B> Designed to integrate seamlessly with
              other blockchain projects and platforms, enabling users to
              leverage a wide range of services.
            </p>
          </div>
          <H2>Ideal Use Cases for Integration with JustInsure</H2>
          <p className="text-mute pb-2">
            By integrating with the JustInsure platform, developers, policy
            issuers, and other protocols can leverage a robust and flexible
            decentralized insurance ecosystem. Here are some of the key use
            cases and benefits:
          </p>
          <div className="pl-4 opacity-80">
            <p className="mb-2">
              <B>Policy Issuance and Management:</B> Developers can create
              custom insurance policies using our createInsurancePolicy
              function. This allows them to tailor coverage to specific user
              needs, ensuring flexibility and responsiveness to market demands.
            </p>
            <p className="mb-2">
              <B>Automated Premium Collection:</B> Using the issuePolicyInstance
              function, developers can automate premium collection when users
              purchase policies. This reduces administrative overhead and
              provides a seamless experience for policyholders.
            </p>
            <p className="mb-2">
              <B>Streamlined Claim Processing:</B> With access to the
              issueClaimForPolicyInstance function, developers can efficiently
              manage claims for policyholders. This simplifies the claims
              process, making it faster and more transparent for users.
            </p>
            <p className="mb-2">
              <B>Tokenized Staking Mechanism:</B> Developers can facilitate
              staking through the registerStake and unregisterStake functions.
              This enables users to earn rewards while providing liquidity to
              the insurance ecosystem, enhancing user engagement and retention.
            </p>
            <p className="mb-2">
              <B>Fee Structure and Revenue Sharing:</B> Integrating with
              JustInsure allows developers to benefit from a transparent fee
              structure, including revenue sharing with the native token,
              SureCoin. This incentivizes collaboration and participation in the
              insurance ecosystem.
            </p>
            <p className="mb-2">
              <B>Secure Payment Processing:</B> Through the receivePayment
              function, developers can ensure secure and compliant handling of
              premium payments in USD. This creates a trustless environment for
              transactions, fostering confidence among users.
            </p>
            <p className="mb-2">
              <B>Governance Participation:</B> By interacting with the
              JustInsure platform, developers and policy issuers can participate
              in the governance of the insurance ecosystem, influencing
              decisions that shape the future of decentralized insurance.
            </p>
            <p className="mb-2">
              <B>Enhanced User Experience:</B> With the ability to provide
              tailored insurance solutions and efficient management processes,
              developers can significantly enhance the user experience,
              attracting more users to their platforms.
            </p>
          </div>
          <div className="pl-4">
            <H3>Why Integrate with JustInsure?</H3>
            Integrating with JustInsure provides a unique opportunity to tap
            into a decentralized insurance model that prioritizes transparency,
            efficiency, and user empowerment. By leveraging our smart contract
            capabilities, developers can create innovative insurance solutions
            that cater to the evolving needs of their users while participating
            in a thriving ecosystem that rewards collaboration and engagement.
          </div>
        </div>
      </article>
    </div>
  );
}

const H1 = ({ children }: any) => (
  <h1 className="text-4xl font-bold my-2">{children}</h1>
);
const H2 = ({ children }: any) => (
  <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
);
const H3 = ({ children }: any) => (
  <h3 className="my-4 text-xl font-medium">{children}</h3>
);
const BR = ({ children }: any) => (
  <>
    <br />
    <br />
  </>
);
const B = ({ children }: any) => <b className="font-bold">{children}</b>;
const PRE = ({ children }: any) => (
  <pre className="bg-foreground px-1 rounded-md">{children}</pre>
);
