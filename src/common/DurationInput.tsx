import { useEffect, useState } from "react";

export default function DurationInput(props: {
  className: string;
  name: string;
  defaultValue: string;
}) {
  const [millis, setMillis] = useState(0);
  const [multiplier, setMultiplier] = useState(1000 * 60 * 60);
  const [inp, setInp] = useState(0);

  useEffect(() => {
    setMillis(inp * multiplier);
  }, [inp, multiplier]);

  return (
    <div className="flex gap-x-2">
      <input
        onChange={(e) => {
          setInp(Number(e.currentTarget.value));
        }}
        className={props.className}
        type="number"
        placeholder="Number of"
      />
      <select
        className={props.className}
        onChange={(e) => setMultiplier(Number(e.currentTarget.value))}
      >
        <option value={1000 * 60 * 60}>Hours</option>
        <option value={1000 * 60 * 60 * 24}>Days</option>
        <option value={1000 * 60 * 60 * 24 * 30}>Months</option>
        <option value={1000 * 60 * 60 * 24 * 365}>Years</option>
      </select>

      <input
        className="hidden"
        type="number"
        name={props.name}
        value={millis}
        readOnly
      />
    </div>
  );
}
