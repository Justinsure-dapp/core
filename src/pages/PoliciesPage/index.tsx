import React, { useEffect, useState } from "react";
import Icon from "../../common/Icon";
import StarRating from "../../common/StarRating";
import { Link } from "react-router-dom";
import DocTitle from "../../common/DocTitle";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import PolicyCard from "./components/PolicyCard";

export default function PoliciesPage() {
  // const policies = [
  //   {
  //     name: "Life insurance",
  //     marketer: "MyInsure",
  //     logoUrl: "https://cdn-icons-png.freepik.com/512/8444/8444051.png",
  //     description:
  //       "Safeguard your loved ones' future with our reliable life insurance coverage. Our policies provide financial security and peace of mind, ensuring your family's well-being in the event of your untimely passing. From covering funeral expenses to replacing lost income, our customizable plans offer protection tailored to your needs. Invest in your family's future today",
  //     tags: ["Best in price", "Highest Rated", "Long term"],
  //     minDuration: 6556649,
  //     maxDuration: 7899898,
  //     rating: 2.5,
  //   },
  //   {
  //     name: "Car Insurance",
  //     marketer: "Carify",
  //     logoUrl:
  //       "https://i.pinimg.com/736x/26/7f/6c/267f6c91848164e2dd570d67fab5cb96.jpg",
  //     description:
  //       "Protect your vehicle and your peace of mind with our comprehensive car insurance. Whether you're driving around town or hitting the open road, our coverage offers financial protection against accidents, theft, and unexpected damages. With 24/7 support and flexible payment options, you can drive with confidence knowing you're covered.",
  //     tags: ["Cheapest", "Highest Rated in cars"],
  //     minDuration: 244556649,
  //     maxDuration: 789989868,
  //     rating: 4.2,
  //   },
  //   {
  //     name: "Home Insurance",
  //     marketer: "Insure",
  //     logoUrl:
  //       "https://png.pngtree.com/element_our/png/20181214/real-estate-house-logo-graphic-design-template-vector-illustration-png_269514.jpg",
  //     description:
  //       "Protect your home sweet home with our comprehensive home insurance coverage. From fire and theft to natural disasters and liability protection, our policies offer peace of mind knowing that your biggest investment is safeguarded. With customizable coverage options and dedicated customer support, we're here to ensure that your home remains a safe haven for you and your family.",
  //     tags: ["Family planning", "Long term"],
  //     minDuration: 344556649,
  //     maxDuration: 589989868,
  //     rating: 3.7,
  //   },
  //   {
  //     name: "Travel Insurance",
  //     marketer: "WanderGuard",
  //     logoUrl:
  //       "https://marketplace.canva.com/EAFvvrEdW20/1/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-TWAjs1N3SXo.jpg",
  //     description:
  //       "Embark on your adventures worry-free with our comprehensive travel insurance. Whether you're jet-setting across the globe or exploring local treasures, our coverage offers protection against trip cancellations, medical emergencies, and lost luggage. With 24/7 emergency assistance and hassle-free claims processing, you can focus on making memories while we take care of the rest.",
  //     tags: ["Worldwide coverage", "Adventure seekers"],
  //     minDuration: 144556649,
  //     maxDuration: 489989868,
  //     rating: 4.8,
  //   },
  //   {
  //     name: "Pet Insurance",
  //     marketer: "PawsGuard",
  //     logoUrl:
  //       "https://img.freepik.com/free-vector/pet-logo-design-paw-vector-animal-shop-business_53876-136741.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712707200&semt=ais",
  //     description:
  //       "Keep your furry friends healthy and happy with our comprehensive pet insurance coverage. From routine check-ups to unexpected emergencies, our policies offer financial protection for veterinary care, medications, and surgeries. With flexible coverage options and fast claims processing, you can give your pets the care they deserve without breaking the bank.",
  //     tags: ["Pet lovers", "Emergency care"],
  //     minDuration: 644556649,
  //     maxDuration: 889989868,
  //     rating: 4.6,
  //   },
  //   {
  //     name: "Health Insurance",
  //     marketer: "HealthGuard",
  //     logoUrl:
  //       "https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/00236_Design_Free_health_Logo_Template_online-02.png",
  //     description:
  //       "Prioritize your well-being with our comprehensive health insurance coverage. Whether you're seeking routine check-ups or specialized treatments, our policies offer financial protection for medical expenses, hospitalization, and prescription medications. With access to a network of healthcare providers and wellness programs, you can take control of your health journey with confidence.",
  //     tags: ["Wellness", "Medical coverage"],
  //     rating: 4.9,
  //     minDuration: 4445566490,
  //     maxDuration: 21600000,
  //   },
  // ];

  const policies = useApiResponse(api.policy.fetchAllPolicies);

  return (
    <>
      <DocTitle title="Policies on Surity" />
      <article className="p-page">
        <div className="flex py-6 gap-x-4 items-center">
          <input
            className="bg-foreground p-4 rounded-xl w-full focus-within:outline-none focus-within:bg-background border-2 border-primary focus-within:border-opacity-80 border-opacity-0 duration-300 ease-in-out"
            placeholder="Search..."
          />
          <div className="flex items-center gap-x-2 border-2 p-4 border-foreground rounded-xl">
            <Icon icon="filter" className="text-2xl" />
            <span className="">Filter</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-6">
          {!policies.loading &&
            policies.data &&
            policies.data.map((policy, key) => <PolicyCard policy={policy} />)}
        </div>
      </article>
    </>
  );
}
