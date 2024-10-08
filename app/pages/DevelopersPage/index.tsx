import React from "react";
import DocTitle from "../../common/DocTitle";

export default function () {
  return (
    <div>
      <DocTitle>Developer Documentation</DocTitle>

      <article>
        <div className="mx-auto p-6 max-w-3xl text-front rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Overview (JustInsure Mechanics)
          </h2>

          <p className=" mb-4">
            A decentralized insurance platform for trustless coverage and claims
            management.
          </p>

          <h3 className="text-xl font-semibold  mb-2">Summary</h3>
          <p className=" mb-4">
            <em>JustInsure</em> is a pioneering decentralized insurance platform
            designed to provide trustless coverage and efficient claims
            management. By utilizing smart contracts, <em>JustInsure</em>{" "}
            ensures transparency and security, allowing users to participate in
            a fair insurance ecosystem without intermediaries. The platform aims
            to leverage blockchain technology to enhance the accessibility and
            efficiency of insurance products.
          </p>

          <h3 className="text-xl font-semibold  mb-2">Key Features:</h3>
          <ul className="list-disc list-inside mb-4 ">
            <li>
              <strong>Smart Contracts:</strong> All insurance policies and
              claims are governed by automated smart contracts, ensuring
              transparency and reliability in operations.
            </li>
            <li>
              <strong>Decentralized Claims Management:</strong> Claims are
              processed through a community-driven approach, minimizing disputes
              and ensuring fair resolutions.
            </li>
            <li>
              <strong>Tokenomics:</strong> The platform utilizes its native
              token for governance, allowing users to participate in
              decision-making and share in the platform's success.
            </li>
            <li>
              <strong>Interoperability:</strong> Designed to integrate
              seamlessly with other blockchain projects and platforms, enabling
              users to leverage a wide range of services.
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}
