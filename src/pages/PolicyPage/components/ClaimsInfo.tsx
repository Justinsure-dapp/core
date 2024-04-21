export default function ClaimInfo() {
  function closestTimeUnit(milliseconds: number) {
    var seconds = milliseconds / 1000;

    var hours = seconds / 3600;
    if (hours < 1) {
      return milliseconds + " milliseconds";
    } else if (hours < 24) {
      return Math.floor(hours) + " hours";
    }

    var days = hours / 24;
    if (days < 30) {
      var remainingHours = hours % 24;
      if (remainingHours > 0) {
        return (
          Math.floor(days) +
          " days and " +
          Math.floor(remainingHours) +
          " hours"
        );
      } else {
        return Math.floor(days) + " days";
      }
    }

    var months = days / 30;
    if (months < 12) {
      return Math.floor(months) + " months";
    }

    var years = months / 12;
    return Math.floor(years) + " years";
  }

  return (
    <div className="flex w-full justify-around pt-12">
      {claimInfoData.map((data, i) => (
        <div
          className="w-[23%] text-center justify-center duration-200 ease-in-out bg-foreground/40 border-2 border-foreground px-4 py-6 rounded-xl flex flex-col items-center gap-y-2"
          key={i}
        >
          <h1 className="text-lg tracking-wide">{data.title}</h1>
          <p className="text-3xl font-mono">{data.value}</p>
        </div>
      ))}

      <div className="w-[25%] duration-200 ease-in-out bg-foreground/40 border-2 border-foreground px-4 py-6 rounded-xl flex flex-col">
        {" "}
        <h1 className="">Duration of the policy</h1>
        <div className="text-sm mt-2">
          Minimum:{" "}
          <span className="text-primary font-bold">
            {closestTimeUnit(34324349)}
          </span>
        </div>
        <div className="text-sm mt-1">
          Maximum:{" "}
          <span className="text-primary font-bold">
            {closestTimeUnit(734034329)}
          </span>
        </div>
      </div>
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
