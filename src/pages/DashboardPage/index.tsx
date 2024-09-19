import { twMerge } from "tailwind-merge";
import DocTitle from "../../common/DocTitle";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import { Link } from "react-router-dom";
import Icon from "../../common/Icon";
import StakeDistribution from "./components/StakeDistribution";
import AutomatedInvestment from "./components/AutomatedInvestment";
import PolicyHolders from "./components/PolicyHolders";
import PolicyCard from "./components/PolicyCard";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";

export default function DashboardPage() {
  const modal = useModal();
  const response = useApiResponse(api.policy.fetchAllPolicies);

  return (
    <section className="p-page py-4">
      <DocTitle title="Dashboard" />
      <h1 className="text-2xl font-semibold">Your Policies</h1>
      <div className="mt-4 w-full flex gap-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-background border border-primary/50 px-4 py-2 rounded-lg focus-within:outline-none"
        />
        <button className="border border-primary/50 font-medium px-4 rounded-lg">
          Search
        </button>
      </div>
      <div className="mt-3 flex justify-between">
        <button className="border border-primary/50 rounded-lg px-4 py-2  flex items-center gap-x-6">
          Filter <Icon icon="expand_more" className="text-[1.5rem]" />{" "}
        </button>
        <Link
          to="/new-policy"
          className="bg-primary text-back px-6 rounded-lg py-2 font-medium"
        >
          Create New Policy
        </Link>
      </div>
      <div className="flex flex-col gap-y-8 mt-4">
        {/* {response.data?.map((policy, i) => (
          <PolicyCard key={i} policy={policy} />
        ))} */}

        {dummyPolicies.map((policy, i) => (
          <PolicyCard key={i} policy={policy} />
        ))}
      </div>
    </section>
  );
}

const dummyPolicies = [
  {
    name: "Life insurance",
    marketer: "MyInsure",
    logoUrl: "https://cdn-icons-png.freepik.com/512/8444/8444051.png",
    description:
      "Safeguard your loved ones' future with our reliable life insurance coverage. Our policies provide financial security and peace of mind, ensuring your family's well-being in the event of your untimely passing. From covering funeral expenses to replacing lost income, our customizable plans offer protection tailored to your needs. Invest in your family's future today",
    policyHolder: 6,
    stakeHolder: 8,
    MoneyInPool: 200000,
    data: {
      labels: ["Sol", "Link", "Avax", "Bnb"],
      values: [23, 19, 15, 3],
      bgColor: [
        "rgb(26, 201, 255, 0.8)",
        "rgb(26, 201, 255, 0.6)",
        "rgb(26, 201, 255, 0.4)",
        "rgb(26, 201, 255, 0.2)",
      ],
    },
  },
  {
    name: "Car Insurance",
    marketer: "Carify",
    logoUrl:
      "https://i.pinimg.com/736x/26/7f/6c/267f6c91848164e2dd570d67fab5cb96.jpg",
    description:
      "Protect your vehicle and your peace of mind with our comprehensive car insurance. Whether you're driving around town or hitting the open road, our coverage offers financial protection against accidents, theft, and unexpected damages. With 24/7 support and flexible payment options, you can drive with confidence knowing you're covered.",
    policyHolder: 4,
    stakeHolder: 7,
    MoneyInPool: 150000,
    data: {
      labels: ["Sol", "Link", "Avax", "Bnb"],
      values: [23, 19, 15, 3],
      bgColor: [
        "rgb(26, 201, 255, 0.8)",
        "rgb(26, 201, 255, 0.6)",
        "rgb(26, 201, 255, 0.4)",
        "rgb(26, 201, 255, 0.2)",
      ],
    },
  },
  {
    name: "Home Insurance",
    marketer: "Insure",
    logoUrl:
      "https://png.pngtree.com/element_our/png/20181214/real-estate-house-logo-graphic-design-template-vector-illustration-png_269514.jpg",
    description:
      "Protect your home sweet home with our comprehensive home insurance coverage. From fire and theft to natural disasters and liability protection, our policies offer peace of mind knowing that your biggest investment is safeguarded. With customizable coverage options and dedicated customer support, we're here to ensure that your home remains a safe haven for you and your family.",
    policyHolder: 8,
    stakeHolder: 5,
    MoneyInPool: 300000,
    data: {
      labels: ["Sol", "Link", "Avax", "Bnb"],
      values: [23, 19, 15, 3],
      bgColor: [
        "rgb(26, 201, 255, 0.8)",
        "rgb(26, 201, 255, 0.6)",
        "rgb(26, 201, 255, 0.4)",
        "rgb(26, 201, 255, 0.2)",
      ],
    },
  },
  {
    name: "Travel Insurance",
    marketer: "WanderGuard",
    logoUrl:
      "https://marketplace.canva.com/EAFvvrEdW20/1/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-TWAjs1N3SXo.jpg",
    description:
      "Embark on your adventures worry-free with our comprehensive travel insurance. Whether you're jet-setting across the globe or exploring local treasures, our coverage offers protection against trip cancellations, medical emergencies, and lost luggage. With 24/7 emergency assistance and hassle-free claims processing, you can focus on making memories while we take care of the rest.",
    policyHolder: 10,
    stakeHolder: 3,
    MoneyInPool: 250000,
    data: {
      labels: ["Sol", "Link", "Avax", "Bnb"],
      values: [23, 19, 15, 3],
      bgColor: [
        "rgb(26, 201, 255, 0.8)",
        "rgb(26, 201, 255, 0.6)",
        "rgb(26, 201, 255, 0.4)",
        "rgb(26, 201, 255, 0.2)",
      ],
    },
  },
  {
    name: "Pet Insurance",
    marketer: "PawsGuard",
    logoUrl:
      "https://img.freepik.com/free-vector/pet-logo-design-paw-vector-animal-shop-business_53876-136741.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712707200&semt=ais",
    description:
      "Keep your furry friends healthy and happy with our comprehensive pet insurance coverage. From routine check-ups to unexpected emergencies, our policies offer financial protection for veterinary care, medications, and surgeries. With flexible coverage options and fast claims processing, you can give your pets the care they deserve without breaking the bank.",
    policyHolder: 5,
    stakeHolder: 6,
    MoneyInPool: 180000,
    data: {
      labels: ["Sol", "Link", "Avax", "Bnb"],
      values: [23, 19, 15, 3],
      bgColor: [
        "rgb(26, 201, 255, 0.8)",
        "rgb(26, 201, 255, 0.6)",
        "rgb(26, 201, 255, 0.4)",
        "rgb(26, 201, 255, 0.2)",
      ],
    },
  },
  {
    name: "Health Insurance",
    marketer: "HealthGuard",
    logoUrl:
      "https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/00236_Design_Free_health_Logo_Template_online-02.png",
    description:
      "Prioritize your well-being with our comprehensive health insurance coverage. Whether you're seeking routine check-ups or specialized treatments, our policies offer financial protection for medical expenses, hospitalization, and prescription medications. With access to a network of healthcare providers and wellness programs, you can take control of your health journey with confidence.",
    policyHolder: 12,
    stakeHolder: 10,
    MoneyInPool: 350000,
    data: {
      labels: ["Sol", "Link", "Avax", "Bnb"],
      values: [23, 19, 15, 3],
      bgColor: [
        "rgb(26, 201, 255, 0.8)",
        "rgb(26, 201, 255, 0.6)",
        "rgb(26, 201, 255, 0.4)",
        "rgb(26, 201, 255, 0.2)",
      ],
    },
  },
];
