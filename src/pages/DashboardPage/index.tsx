import { twMerge } from "tailwind-merge";
import DocTitle from "../../common/DocTitle";
import PieChart from "../../common/PieChart";
import { useState } from "react";

export default function DashboardPage() {
  const [expanded, setExpanded] = useState(Array(policies.length).fill(false));
  const toggleExpanded = (index: number) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };
  return (
    <section className="p-page py-4">
      <DocTitle title="Dashboard" />
      <h1 className="text-xl font-bold">Your Policies</h1>
      <div className="flex flex-col gap-y-8 mt-4">
        {policies.map((policy, i) => (
          <div className="flex flex-col gap-y-4 bg-primary/5 p-4 rounded-lg border border-secondary/20 relative">
            <div className="flex flex-col gap-y-1">
              <h1 className="text-xl font-semibold">{policy.name}</h1>
              <div className="text-front/80 text-sm">{policy.description}</div>
            </div>
            <div className="flex gap-x-4 flex-wrap gap-y-4">
              <div className="bg-background hover:bg-front hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold font-mono">1242</h1>
                  <p className="text-front/80 flex items-center text-sm">
                    Policy Holders &#160;{" "}
                    <span className="text-green-500">+21.4%</span>
                  </p>
                </div>
                <div className="p-2 bg-green-500/20 rounded-xl">
                  <img src="https://img.icons8.com/ios-filled/32/40C057/bullish.png" />
                </div>
              </div>
              <div className="bg-background hover:bg-slate-400 hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold font-mono">345</h1>
                  <p className="text-front/80 text-sm">
                    Stake Holders &#160;{" "}
                    <span className="text-red-500">-12.43%</span>
                  </p>
                </div>
                <div className="p-2 bg-red-500/20 rounded-xl">
                  <img src="https://img.icons8.com/ios-filled/32/FA5252/bearish.png" />
                </div>
              </div>
              <div className="bg-background hover:bg-slate-400 hover:bg-opacity-[1%] duration-300 ease-in-out border border-front/20 w-max flex px-4 py-3 rounded-xl gap-x-8 justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold font-mono">345</h1>
                  <p className="text-front/80 text-sm">Money in Pool &#160; </p>
                </div>
                <div className="p-2 bg-front/20 rounded-xl">
                  <img src="https://img.icons8.com/pulsar-color/32/money-bag.png" />
                </div>
              </div>
            </div>
            <button
              className="absolute bottom-2 right-4 underline"
              onClick={() => toggleExpanded(i)}
            >
              {expanded[i] ? "View Less" : "View More"}
            </button>
            {expanded[i] && (
              <div className="flex flex-col">
                <button className="bg-front/20 w-max py-2 px-3 rounded-lg">
                  Recent Activity
                </button>
                <div className="flex flex-col gap-x-8 bg-background rounded-xl py-6 px-8 my-5">
                  <div className="flex justify-between">
                    <h1 className="text-xl">
                      Total money & distribution of pool
                    </h1>
                    <p className="bg-primary/20 border border-primary/30 px-4 rounded-xl">
                      Total Staked : <span className="font-mono">890.32</span>
                    </p>
                  </div>
                  <div className="flex pt-6 justify-around">
                    <PieChart data={data} className="w-[20vw]" />
                    <div className="basis-1/2 flex flex-col gap-y-3">
                      {data.labels.map((label, i) => (
                        <div className="flex w-full items-center gap-x-4">
                          <span className="">{i + 1}</span>
                          <div
                            className={twMerge(
                              "bg-front/5 border border-front/10 w-full py-2 px-4 rounded-xl flex justify-between items-center",
                              `hover:cursor-pointer hover:scale-[102%] duration-150 ease-in`
                            )}
                          >
                            <h1 className="">{label}</h1>
                            <p className="font-mono">{data.values[i]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="self-end bg-primary w-max font-bold text-back px-3 py-2 rounded-lg">Edit Automated Investing</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const data = {
    labels: ["Sol", "Link", "Avax", "Bnb"],
    values: [23, 19, 15, 3],
    bgColor: [
      "rgb(220, 31, 255, 0.4)",
      "rgb(55, 91, 210, 0.4)",
      "rgb(232, 65, 66, 0.4)",
      "rgb(243, 186, 47, 0.4)",
    ],
  };

const policies = [
  {
    name: "Life insurance",
    marketer: "MyInsure",
    logoUrl: "https://cdn-icons-png.freepik.com/512/8444/8444051.png",
    description:
      "Safeguard your loved ones' future with our reliable life insurance coverage. Our policies provide financial security and peace of mind, ensuring your family's well-being in the event of your untimely passing. From covering funeral expenses to replacing lost income, our customizable plans offer protection tailored to your needs. Invest in your family's future today",
    tags: ["Best in price", "Highest Rated", "Long term"],
    minDuration: 6556649,
    maxDuration: 7899898,
    rating: 2.5,
  },
  {
    name: "Car Insurance",
    marketer: "Carify",
    logoUrl:
      "https://i.pinimg.com/736x/26/7f/6c/267f6c91848164e2dd570d67fab5cb96.jpg",
    description:
      "Protect your vehicle and your peace of mind with our comprehensive car insurance. Whether you're driving around town or hitting the open road, our coverage offers financial protection against accidents, theft, and unexpected damages. With 24/7 support and flexible payment options, you can drive with confidence knowing you're covered.",
    tags: ["Cheapest", "Highest Rated in cars"],
    minDuration: 244556649,
    maxDuration: 789989868,
    rating: 4.2,
  },
  {
    name: "Home Insurance",
    marketer: "Insure",
    logoUrl:
      "https://png.pngtree.com/element_our/png/20181214/real-estate-house-logo-graphic-design-template-vector-illustration-png_269514.jpg",
    description:
      "Protect your home sweet home with our comprehensive home insurance coverage. From fire and theft to natural disasters and liability protection, our policies offer peace of mind knowing that your biggest investment is safeguarded. With customizable coverage options and dedicated customer support, we're here to ensure that your home remains a safe haven for you and your family.",
    tags: ["Family planning", "Long term"],
    minDuration: 344556649,
    maxDuration: 589989868,
    rating: 3.7,
  },
  {
    name: "Travel Insurance",
    marketer: "WanderGuard",
    logoUrl:
      "https://marketplace.canva.com/EAFvvrEdW20/1/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-TWAjs1N3SXo.jpg",
    description:
      "Embark on your adventures worry-free with our comprehensive travel insurance. Whether you're jet-setting across the globe or exploring local treasures, our coverage offers protection against trip cancellations, medical emergencies, and lost luggage. With 24/7 emergency assistance and hassle-free claims processing, you can focus on making memories while we take care of the rest.",
    tags: ["Worldwide coverage", "Adventure seekers"],
    minDuration: 144556649,
    maxDuration: 489989868,
    rating: 4.8,
  },
  {
    name: "Pet Insurance",
    marketer: "PawsGuard",
    logoUrl:
      "https://img.freepik.com/free-vector/pet-logo-design-paw-vector-animal-shop-business_53876-136741.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712707200&semt=ais",
    description:
      "Keep your furry friends healthy and happy with our comprehensive pet insurance coverage. From routine check-ups to unexpected emergencies, our policies offer financial protection for veterinary care, medications, and surgeries. With flexible coverage options and fast claims processing, you can give your pets the care they deserve without breaking the bank.",
    tags: ["Pet lovers", "Emergency care"],
    minDuration: 644556649,
    maxDuration: 889989868,
    rating: 4.6,
  },
  {
    name: "Health Insurance",
    marketer: "HealthGuard",
    logoUrl:
      "https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/00236_Design_Free_health_Logo_Template_online-02.png",
    description:
      "Prioritize your well-being with our comprehensive health insurance coverage. Whether you're seeking routine check-ups or specialized treatments, our policies offer financial protection for medical expenses, hospitalization, and prescription medications. With access to a network of healthcare providers and wellness programs, you can take control of your health journey with confidence.",
    tags: ["Wellness", "Medical coverage"],
    rating: 4.9,
    minDuration: 4445566490,
    maxDuration: 21600000,
  },
];
