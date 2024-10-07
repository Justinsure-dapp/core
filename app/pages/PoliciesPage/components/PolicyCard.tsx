import moment from "moment";
import { Line } from "react-chartjs-2";
import { Policy } from "../../../types";
import { Link } from "react-router-dom";
import StarRating from "../../../common/StarRating";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import DocTitle from "../../../common/DocTitle";
import { twMerge } from "tailwind-merge";
import ClipboardWrapper from "../../../common/ClipboardWrapper";
import { formatEvmAddress } from "../../../utils";
import Icon from "../../../common/Icon";
import { useReadContract } from "wagmi";
import contractDefinitions from "../../../contracts";
import { isAddress } from "viem";

export default function PolicyCard(props: {
  policy: Policy;
  className?: string;
}) {
  const { policy } = props;

  const { data: user } = useApiResponse(api.user.get, policy.creator);

  const minimumDurationInDays = moment
    .duration(policy.minimumDuration, "milliseconds")
    .asDays();
  const maximumDurationInDays = moment
    .duration(policy.maximumDuration, "milliseconds")
    .asDays();

  if (!policy.address) return null;

  const { data: isPaused } = useReadContract({
    ...contractDefinitions.insuranceController,
    address: isAddress(policy.address) ? policy.address : undefined,
    functionName: "paused",
  });

  if (isPaused) return null;

  return (
    <Link
      to={`/policies/${policy.address}`}
      className={twMerge(
        "py-6 p-4 bg-mute/5 rounded-md relative group border border-border",
        props.className,
      )}
    >
      <figure
        role="figure"
        className="bg-gradient-to-br from-secondary to-front via-primary group-hover:scale-x-[100.7%] group-hover:scale-y-[101%] group-hover:opacity-100 opacity-20 duration-300 absolute-cover rounded-inherit"
      />
      <figure
        role="figure"
        className="bg-gradient-to-bl animate-pulse from-front to-secondary via-primary group-hover:scale-x-[100.7%] group-hover:scale-y-[101%] group-hover:opacity-100 opacity-20 duration-300 absolute-cover rounded-inherit"
      />
      <figure
        role="figure"
        className="bg-background/90 absolute-cover rounded-inherit"
      />

      <div className="flex flex-col items-start relative">
        {/* Title Section */}
        <div className="flex justify-between w-full">
          <div className="flex gap-3 items-center">
            <img
              src={policy.image}
              alt={policy.name}
              className="rounded-full object-cover w-12 h-12 border border-border p-[2px]"
            />

            <div className="flex flex-col justify-evenly">
              <h2 className="text-sm flex font-black items-center gap-x-2">
                {policy.name}
                <span className="text-xs text-secondary">
                  {policy.category}
                </span>
              </h2>

              <ClipboardWrapper
                textToBeCopied={policy.address}
                className="text-xs text-mute"
              >
                <p className="flex items-center gap-x-1 mt-1">
                  {formatEvmAddress(policy.address)}
                  <Icon icon="contentCopy" />
                </p>
              </ClipboardWrapper>

              <div className="flex  text-xs text-secondary/80  mt-2">
                Marketer:
                <div className="ml-1 text-mute">
                    <p className="flex items-center secondary/80 gap-x-1">
                      {user?.marketer?.name}
                      <Icon icon="contentCopy" />
                    </p>
                </div>
              </div>
            </div>
          </div>

          <span className="flex flex-col items-end text-xs text-mute saturate-150 brightness-150">
            <div className="flex flex-col text-end text-xs gap-y-2 items-end text-secondary">
              <p className="flex gap-x-1 items-center text-green-500">
                <Icon icon="check" /> Verified
              </p>
            </div>

            <div className="flex mt-1 gap-x-1">
              <p>{policy.rating}</p>
              <StarRating rating={policy?.rating || 0} />
            </div>
          </span>
        </div>
      </div>
      <div className="relative flex flex-col">
        {/* <div className="flex mobile:flex-col flex-row gap-2 mt-4">
          <span className="bg-mute/20 rounded-full w-max py-1 px-2 text-xs">
            Holding of Marketer : {"23%"}
          </span>
          <span className="bg-mute/20 rounded-full w-max py-1 px-2 text-xs">
            Total Stake : TBI
          </span>
        </div> */}

        <div className="flex flex-col mt-5">
          <div className="text-xs text-mute flex gap-2 justify-between items-center">
            <p className="">Min Claim : {policy.minimumClaim}</p>
            <p className="">Max Claim : {policy.maximumClaim}</p>
          </div>
          <div className="text-xs mt-2 text-mute flex gap-2 justify-between items-center">
            <p className="">Min Duration : {minimumDurationInDays} Days</p>
            <p className="">Max Duration : {maximumDurationInDays} Days</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

{
  /* <Link
to={`/policies/${props.policy.address}`}
className="w-[calc(33%_-_0.82rem)] mobile:w-full border-2 border-border hover:border-primary/60 px-4 py-4 rounded-xl flex flex-col gap-y-2 hover:bg-front/5 duration-200 ease-in cursor-pointer"
>
<div className="flex justify-between items-center">
  <div className="flex flex-col w-full">
    <h1 className="text-xl capitalize truncate w-3/4">
      {props.policy.name}
    </h1>
    <h2 className="text-mute truncate w-3/4">
      {marketerData.data?.marketer.name}
    </h2>
  </div>
  <img
    src={marketerData.data?.marketer.image}
    className="w-[4vw] rounded-full bg-foreground object-cover mobile:w-[15vw] aspect-square"
  />
</div>
<div className="flex gap-x-1">
  <p>{4}</p>
  <StarRating rating={4} />
</div>
<p className="text-sm text-opacity-80 text-front">
  {props.policy.description.length > 150
    ? `${props.policy.description.slice(0, 150)}...`
    : props.policy.description}
</p>
<figure role="separator" className="flex-1" />
<div className="flex gap-x-2 self-end">
  <button className="bg-primary/90 text-front font-bold py-1 px-3 rounded-md hover:-translate-y-1 duration-200 ease-in text-sm">
    Buy Now
  </button>
  <button className="bg-back/90 text-primary border-primary border font-bold py-1 px-3 rounded-md hover:-translate-y-1 duration-200 ease-in text-sm">
    Stake
  </button>
</div>
</Link> */
}
