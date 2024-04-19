export default function DurationInput(props: {
  className: string;
  name: string;
  defaultValue: string;
}) {
  return (
    <div className="flex gap-x-2">
      <input className={props.className} type="number" placeholder="Number of" />
      <select
        className={props.className}
        name={props.name}
        defaultValue={props.defaultValue}
      >
        <option value="Days">Days</option>
        <option value="Months">Months</option>
        <option value="Years">Years</option>
      </select>
    </div>
  );
}
