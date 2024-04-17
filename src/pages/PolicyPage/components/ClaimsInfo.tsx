export default function ClaimInfo() {
  return (
    <div className="flex w-full justify-around pt-12">
      {claimInfoData.map((data, i) => (
        <div
          className="w-[28%] duration-200 ease-in-out bg-foreground/40 border-2 border-foreground px-4 py-6 rounded-xl flex flex-col items-center gap-y-2"
          key={i}
        >
          <h1 className="text-lg tracking-wide">{data.title}</h1>
          <p className="text-3xl font-mono">{data.value}</p>
        </div>
      ))}
    </div>
  );
}

const claimInfoData = [
  {
    title: "Claims settled",
    value: 20,
  },
  {
    title: "Claims requested",
    value: 25,
  },
  {
    title: "Claim Ratio",
    value: 0.8,
  },
];
