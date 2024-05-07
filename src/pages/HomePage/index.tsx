import React, { DetailedHTMLProps, useState } from "react";
import DocTitle from "../../common/DocTitle";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <DocTitle title="What's New" />

      <div className="p-page py-8">
        <div className="flex gap-6">
          <article className="flex flex-col w-1/4 bg-pink-200 rounded-lg h-[60vh] mobile:hidden overflow-hidden items-center py-2 text-violet-950 px-3 gap-y-4 text-center">
            <p className="font-bold text-lg">Soparu the Rabbit</p>
            <p>
              Has an interesting back story of how she went from being a farmer
              to working with Insurances on Web3 with Surity
            </p>

            <p className="font-medium mt-1 -mb-1">Did you know?</p>
            <p className="-my-1 text-xs">Soparu the Rabbit is a Robbot</p>
            <p className="-my-1 text-xs">Soparu the Rab(bit) is holding BTTC</p>

            <img
              className="aspect-square scale-[115%] translate-y-[10%]"
              src="/images/soparu-on-farm.jpg"
            />
          </article>
          <div className="flex flex-col w-3/4 gap-6 mobile:w-full ">
            <article className="bg-secondary rounded-lg overflow-b-hidden flex">
              <img
                src="/images/soparu.webp"
                alt="sopo mascot"
                className="w-1/4 scale-125 -translate-y-3 mobile:w-1/2"
              />
              <div className="py-4 flex flex-col gap-y-5 px-4">
                <p className="flex items-start font-medium text-3xl">
                  Surity Early Access
                  <span className="text-sm pl-1 font-normal">* testnet</span>
                </p>

                <p className="text-sm">
                  We would really appreciate if you could take out some time to
                  fill out a survey
                  <br />
                  We are bringing insurance to blockahin and we would love to
                  hear about it from you
                </p>

                <div className="flex">
                  <button
                    onClick={() =>
                      window.open("https://forms.gle/eKgCiw8u9R5haZK86")
                    }
                    className="bg-background px-6 py-2 rounded-md font-medium"
                  >
                    Take Survey
                  </button>
                </div>
              </div>
            </article>

            <article
              onClick={() => {
                window.open("https://bttc.bittorrent.com/");
              }}
              className="cursor-pointer bg-gradient-to-br relative from-violet-400 via-blue-800-200 to-green-600 flex-1 group w-full rounded-lg flex justify-center items-center"
            >
              <div className="absolute-cover z-1 bg-gradient-to-bl from-white/30 to-white/40 via-transparent" />

              <div className="relative z-10 bg-gray-800 rounded-full flex items-center gap-x-2 text-white px-5 py-3 duration-700 group-hover:scale-110">
                Powered By
                <img src="/icons/bttc.png" alt="bttc" className="h-[2em]" />
                BitTorrent Chain
              </div>

              <p className="absolute flex gap-x-1 z-10 text-xs items-center bottom-3 right-2 text-tron-red bg-red-100 px-3 rounded-full">
                Coming soon to the
                <img src="/icons/tron.svg" alt="tron" className="h-[2em]" />
                Tron Network
              </p>
            </article>
          </div>
        </div>
      </div>
    </>
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
          className="text-back"
          defaultValue={options[0].value || options[0].title}
          onChange={(e) => {
            options.forEach(
              (o, i) =>
                (o.value || o.title) === e.currentTarget.value && setSelected(i)
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
            <input key={key} {...inp} className="text-back px-2" />
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
      <select key="durationFormat" className="text-back">
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
//         <select className="text-back ml-2" onChange={handleOption1Change}>
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
//           <select className="text-back ml-2" onChange={handleOption2Change}>
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
//           <select className="text-back ml-2" onChange={handleOption3Change}>
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
