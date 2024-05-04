import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Heading from "../../NewPolicyPage/components/Heading";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";

const twInputStyle =
  "text-lg rounded-md p-2 bg-background border border-border shadow shadow-mute/30";

export default function AutomatedInvestingModal() {
  const modal = useModal();
  return (
    <div className="bg-background p-8 border border-front/60 rounded-xl flex flex-col gap-y-4 relative">
      <button
        className="absolute right-4 top-4 border p-1 rounded-full text-red-500 border-red-500"
        onClick={() => modal.hide()}
      >
        <Icon icon="close" className="text-[1.5rem]" />
      </button>
      <h1 className="text-xl font-bold">Automate Investing</h1>
      <MappedOptions options={options} />
      <button className="self-end bg-primary text-lg font-bold text-back py-1 px-3 rounded-lg">
        Submit
      </button>
    </div>
  );
}

function MappedOptions(props: { options: Array<Option> }) {
  const { options } = props;
  const [selected, setSelected] = useState(0);
  const furtherOptions = options[selected].options;

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex gap-x-2 items-end">
        <div>
          <select
            className={twMerge("", twInputStyle)}
            defaultValue={options[0].value || options[0].title}
            onChange={(e) => {
              options.forEach(
                (o, i) =>
                  (o.value || o.title) === e.currentTarget.value &&
                  setSelected(i)
              );
            }}
          >
            {options.map((option, key) => (
              <option key={key} value={option.value || option.title}>
                {option.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-x-2">
          {options[selected].customElements?.map((ele, key) => (
            <div key={key}>{ele}</div>
          ))}
        </div>

        <div className="flex gap-x-2">
          {options[selected].additionalInputs?.map((inp, key) => (
            <input key={key} {...inp} className={twMerge("", twInputStyle)} />
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
      <select key="durationFormat" className={twMerge("", twInputStyle)}>
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
