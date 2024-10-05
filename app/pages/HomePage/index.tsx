import React, { DetailedHTMLProps, useState } from "react";
import DocTitle from "../../common/DocTitle";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";
import useWeb3 from "../../contexts/web3context";
import { AuroraBackground } from "../../components/ui/aurora-background";
import { TextHoverEffect } from "../../components/ui/text-hover-effect";

export default function HomePage() {
  const { user } = useWeb3();
  return (
    <div>
      <DocTitle title="What's New" />

      {/* Mobile */}
      <div className="p-page py-8">
        {/* Logo on Mobile */}
        <div className="hidden mobile:flex w-full items-center justify-center border p-4 mb-4 rounded-md sm:pr-12 border-border dark:bg-background bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
          <div className="absolute rounded-xl pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

          <img src="/logo.png" alt="logo" className="w-12 sm:w-32" />

          <div className="flex flex-col items-start gap-y-1 sm:pb-4">
            <div className="relative">
              <h1 className="font-black text-2xl sm:text-4xl tracking-wider">
                JustInsure
              </h1>
              {user?.marketer && (
                <div className="group">
                  <p className="absolute top-0 left-full translate-x-1 -translate-y-1/4 text-[10px] bg-primary px-1 rounded-full text-white font-bold">
                    Pro
                  </p>

                  <p className="absolute -top-2 -right-7 whitespace-nowrap text-xs opacity-0 duration-300 translate-y-full group-hover:translate-y-1/2 group-hover:opacity-100 bg-background border border-border p-2 rounded-lg pointer-events-none z-20">
                    "Pro" indicates that you are a marketer and you can list
                    <br />
                    policies on our platform
                  </p>
                </div>
              )}
            </div>
            <p className="text-primary text-xs font-semibold">
              Rest assured on Web3
            </p>
          </div>
        </div>

        <div className="flex gap-6 mobile:flex-col-reverse">
          <article className="flex flex-col w-1/4 mobile:w-full border border-zinc-700 rounded-lg h-[60vh] overflow-hidden items-center py-4 text-zinc-100 px-3 gap-y-4 mobile:gap-y-2 text-center  bg-mute/20  bg-dot-white/[0.1] relative">
            <div className="absolute rounded-xl  pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            <p className="font-bold text-lg z-10">Soparu the Rabbit</p>
            <p className="z-10">
              Has an interesting backstory of how she went from being a farmer
              to working with Insurances on Web3 with JustInsure...
            </p>

            <p className="font-medium mt-1 -mb-1 z-10">Did you know?</p>
            <p className="-my-1 text-xs z-10">Soparu the Rabbit is a Robbot</p>
            <p className="-my-1 text-xs z-10">
              Soparu the Rab(bit) is holding BTTC
            </p>

            <img
              className="aspect-square scale-[115%] translate-y-[10%]"
              src="/images/soparu-on-farm.jpg"
            />
          </article>
          <div className="flex flex-col w-3/4 gap-6 mobile:w-full">
            <article className="border border-border rounded-xl">
              <AuroraBackground className="rounded-xl ">
                <div className="flex overflow-b-hidden">
                  <img
                    src="/images/soparu.webp"
                    alt="sopo mascot"
                    className="w-1/4 scale-125 -translate-y-3 mobile:w-1/2 mobile:hidden"
                  />
                  <div className="py-4 flex flex-col gap-y-5 px-4 text-zinc-100/90">
                    <p className="flex  items-start font-medium text-3xl">
                      JustInsure Early Access
                      <span className="text-sm pl-1 font-normal">
                        * testnet
                      </span>
                    </p>

                    <p className="text-sm">
                      We would really appreciate if you could take out some time
                      to fill out a survey. We are bringing insurance to
                      blockahin and we would love to hear about it from you!
                    </p>

                    <div className="flex">
                      <button
                        onClick={() =>
                          window.open("https://forms.gle/eKgCiw8u9R5haZK86")
                        }
                        className="bg-background hover:bg-zinc-800 transition-all border border-border px-6 py-2 rounded-md font-medium"
                      >
                        Take Survey
                      </button>
                    </div>
                  </div>
                </div>
              </AuroraBackground>
            </article>

            <article
              onClick={() => {
                window.open("https://bttc.bittorrent.com/");
              }}
              className="cursor-pointer relative mobile:py-16 flex-1 group w-full rounded-lg h-[50rem] dark:bg-background bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] border border-border flex items-center justify-center"
            >
              <div className="absolute rounded-xl pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

              <div className="relative z-10 bg-zinc-900/80 rounded-full flex items-center gap-x-2 text-white px-5 py-3 duration-200 hover:bg-zinc-800/80 border border-border">
                Powered By
                <img src="/icons/bttc.png" alt="bttc" className="h-[2em]" />
                BitTorrent Chain
              </div>

              <p className="absolute flex gap-x-1 z-10 text-xs items-center bottom-3 right-2 text-accent2 bg-red-100 px-3 rounded-full">
                Coming soon to the
                <img src="/icons/tron.svg" alt="tron" className="h-[2em]" />
                Tron Network
              </p>
            </article>
          </div>
        </div>
        <Link
          to="https://t.me/surity_bot"
          target={`_newABC`}
          className="flex items-start justify-center mt-8 w-full"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-100 group-hover:duration-200 animate-tilt"></div>
            <button className="relative px-7 py-4 bg-background rounded-lg leading-none flex items-center widescreen:divide-x widescreen:divide-zinc-600 mobile:flex-col mobile:gap-y-2 border border-primary">
              <span className="flex items-center space-x-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-secondary"
                >
                  <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z" />
                </svg>

                <span className="pr-6 text-gray-100 whitespace-nowrap">
                  We are live on Telegram
                </span>
              </span>
              <span className="pl-6 text-secondary group-hover:text-gray-100 transition duration-200 whitespace-nowrap">
                Click here to try it &rarr;
              </span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

function MappedOptions(props: { options: Array<Option> }) {
  const { options } = props;

  const [selected, setSelected] = useState(0);

  const furtherOptions = options[selected].options;

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-2">
        <select
          className="text-front"
          defaultValue={options[0].value || options[0].title}
          onChange={(e) => {
            options.forEach(
              (o, i) =>
                (o.value || o.title) === e.currentTarget.value &&
                setSelected(i),
            );
          }}
        >
          {options.map((option, key) => (
            <option key={key} value={option.value || option.title}>
              {option.title}
            </option>
          ))}
        </select>

        <div className="flex gap-x-2">
          {options[selected].customElements?.map((ele, key) => (
            <div key={key}>{ele}</div>
          ))}
        </div>

        <div className="flex gap-x-2">
          {options[selected].additionalInputs?.map((inp, key) => (
            <input key={key} {...inp} className="text-front px-2" />
          ))}
        </div>
      </div>

      {options[selected].info && <p>{options[selected].info}</p>}

      <div className="">
        {furtherOptions?.length && <MappedOptions options={furtherOptions} />}
      </div>
    </div>
  );
}

interface Option {
  title: string;
  value?: string;
  info?: string;
  additionalInputs?: Array<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;
  options?: Array<Option>;
  customElements?: JSX.Element[];
}

const options: Array<Option> = [
  {
    title: "Time Duration Passed",
    info: "Triggers when any amount is received in the pool, whether from Staking or by recieving premium.",
    options: [
      {
        title: "Recieved amout greater than",
        additionalInputs: [{ type: "number" }],
      },
    ],
    additionalInputs: [{ type: "date" }],
    customElements: [
      <select key="durationFormat" className="text-front">
        <option value="">Select duration format</option>
        {["Days", "Weeks", "Months", "Years"].map((format, index) => (
          <option key={index} value={format}>
            {format}
          </option>
        ))}
      </select>,
    ],
  },
  {
    title: "Received Deposit In Pool through Staking",
    info: "Triggers when any amount is received in the pool, whether from Staking or by recieving premium.",
    options: [
      {
        title: "Recieved amout greater than",
        additionalInputs: [{ type: "number" }],
      },
      {
        title: "Recieved amout in range of",
        additionalInputs: [{ type: "number" }, { type: "number" }],
      },
    ],
  },
  {
    title: "Received Deposit In Pool through premium",
    info: "Triggers when any amount is received in the pool, whether from Staking or by recieving premium.",
    options: [
      {
        title: "Recieved amout greater than",
        additionalInputs: [{ type: "number" }],
      },
      {
        title: "Recieved amout in range of",
        additionalInputs: [{ type: "number" }, { type: "number" }],
      },
    ],
  },
  {
    title: "Received general deposit In Pool",
    info: "Triggers when any amount is received in the pool, whether from Staking or by recieving premium.",
    options: [
      {
        title: "Recieved amout greater than",
        additionalInputs: [{ type: "number" }],
      },
      {
        title: "Recieved amout in range of",
        additionalInputs: [{ type: "number" }, { type: "number" }],
      },
    ],
  },
];

// {
//   (
//     <div className="flex flex-col gap-y-4 mt-4 p-page w-max">
//       <div className="flex gap-x-2">
//         <span>When should this be run</span>
//         <select className="text-front ml-2" onChange={handleOption1Change}>
//           <option value="">Select an option</option>
//           {Object.keys(options).map((option, i) => (
//             <option key={i} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedOption1 && (
//         <div className="flex gap-x-2">
//           <span>Additional Condition</span>
//           <select className="text-front ml-2" onChange={handleOption2Change}>
//             <option value="">Select an option</option>
//             {options[selectedOption1] &&
//               Object.keys(options[selectedOption1]).map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//           </select>
//         </div>
//       )}

//       {selectedOption2 && (
//         <div className="flex gap-x-2">
//           <span>invest in</span>
//           <select className="text-front ml-2" onChange={handleOption3Change}>
//             <option value="" className="px-2">
//               Select an option
//             </option>
//             {options[selectedOption1] &&
//               options[selectedOption1][selectedOption2] &&
//               options[selectedOption1][selectedOption2].map((option, i) => (
//                 <option key={i} value={option}>
//                   {option}
//                 </option>
//               ))}
//           </select>
//         </div>
//       )}
//     </div>
//   );
// }
