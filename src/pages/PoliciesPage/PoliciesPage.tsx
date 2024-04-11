import React from "react";
import Icon from "../../common/Icon";
export default function PoliciesPage() {
  const policies = [
    {
      name: "Life insurance",
      marketer: "MyInsure",
      logoUrl: "https://cdn-icons-png.freepik.com/512/8444/8444051.png",
      description:
        "Health Insurance is a type of insurance that covers the medical expenses of the insured due to an illness or accident in exchange for a premium amount. It enables the insurance company to provide medical coverage for hospitalization expenses, day care procedures, critical illnesses, etc. A health plan also offers multiple benefits, including cashless hospitalization and free medical check-ups.",
      tags: ["Best in price", "Highest Rated", "Long term"],
      rating: 4.5,
    },
    {
      name: "Life insurance",
      marketer: "MyInsure",
      logoUrl: "https://cdn-icons-png.freepik.com/512/8444/8444051.png",
      description:
        "Health Insurance is a type of insurance that covers the medical expenses of the insured due to an illness or accident in exchange for a premium amount. It enables the insurance company to provide medical coverage for hospitalization expenses, day care procedures, critical illnesses, etc. A health plan also offers multiple benefits, including cashless hospitalization and free medical check-ups.",
      tags: ["Best in price", "Highest Rated", "Long term"],
      rating: 4.5,
    },
    {
      name: "Life insurance",
      marketer: "MyInsure",
      logoUrl: "https://cdn-icons-png.freepik.com/512/8444/8444051.png",
      description:
        "Health Insurance is a type of insurance that covers the medical expenses of the insured due to an illness or accident in exchange for a premium amount. It enables the insurance company to provide medical coverage for hospitalization expenses, day care procedures, critical illnesses, etc. A health plan also offers multiple benefits, including cashless hospitalization and free medical check-ups.",
      tags: ["Best in price", "Highest Rated", "Long term"],
      rating: 4.5,
    },
    {
      name: "Life insurance",
      marketer: "MyInsure",
      logoUrl: "https://cdn-icons-png.freepik.com/512/8444/8444051.png",
      description:
        "Health Insurance is a type of insurance that covers the medical expenses of the insured due to an illness or accident in exchange for a premium amount. It enables the insurance company to provide medical coverage for hospitalization expenses, day care procedures, critical illnesses, etc. A health plan also offers multiple benefits, including cashless hospitalization and free medical check-ups.",
      tags: ["Best in price", "Highest Rated", "Long term"],
      rating: 4.5,
    },
    {
      name: "Life insurance",
      marketer: "MyInsure",
      logoUrl: "https://cdn-icons-png.freepik.com/512/8444/8444051.png",
      description:
        "Health Insurance is a type of insurance that covers the medical expenses of the insured due to an illness or accident in exchange for a premium amount. It enables the insurance company to provide medical coverage for hospitalization expenses, day care procedures, critical illnesses, etc. A health plan also offers multiple benefits, including cashless hospitalization and free medical check-ups.",
      tags: ["Best in price", "Highest Rated", "Long term"],
      rating: 4.5,
    },
    {
      name: "Life insurance",
      marketer: "MyInsure",
      logoUrl: "https://cdn-icons-png.freepik.com/512/8444/8444051.png",
      description:
        "Health Insurance is a type of insurance that covers the medical expenses of the insured due to an illness or accident in exchange for a premium amount. It enables the insurance company to provide medical coverage for hospitalization expenses, day care procedures, critical illnesses, etc. A health plan also offers multiple benefits, including cashless hospitalization and free medical check-ups.",
      tags: ["Best in price", "Highest Rated", "Long term"],
      rating: 4.5,
    },
  ];

  return (
    <article>
      <div className="flex p-page py-6 gap-x-4 items-center">
        <input
          className="bg-foreground p-4 rounded-xl w-full focus-within:outline-none focus-within:bg-background border-2 border-primary focus-within:border-opacity-80 border-opacity-0 duration-300 ease-in-out"
          placeholder="Search..."
        />
        <div className="flex items-center gap-x-2 border-2 p-4 border-foreground rounded-xl">
          <Icon icon="filter" className="text-2xl" />
          <span className="">Filter</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-y-12">
        {policies.map((policy, i) => (
          <div
            key={i}
            className="w-[31%] border-2 border-border hover:border-primary/60 px-4 py-4 rounded-xl flex flex-col gap-y-2 hover:bg-front/5 duration-200 ease-in cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-xl capitalize">{policy.name}</h1>
                <h2>{policy.marketer}</h2>
              </div>
              <img
                src={policy.logoUrl}
                className="w-[4vw] border rounded-full p-2 bg-background"
              />
            </div>
            <div className="flex gap-x-1">
              <p>{policy.rating}</p>
              <span>★★★★★</span>
            </div>
            <p className="text-sm">
              {policy.description.length > 150
                ? `${policy.description.slice(0, 150)}...`
                : policy.description}
            </p>
            <div className="text-sm flex flex-wrap gap-2">
              {policy.tags.map((tag, i) => (
                <span
                  className="border-primary border whitespace-nowrap px-2 py-1 rounded-xl bg-background"
                  key={i}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="self-end bg-primary text-back font-bold p-2 rounded-lg hover:-translate-y-1 duration-200 ease-in">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}
