import React, { DetailedHTMLProps, useState } from "react";
import { Helmet } from "react-helmet";
import DocTitle from "../../common/DocTitle";

export default function HomePage() {
  return (
    <>
      <MappedOptions options={options} />
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
    additionalInputs: [{ type: "number" }],
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
