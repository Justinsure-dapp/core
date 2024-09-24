import moment from 'moment';
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

export default function PolicyCard(props: {
  policy: Policy;
  className: string;
}) {
  const marketerData = useApiResponse(api.marketer.get, props.policy.creator);
  const { policy } = props;

  console.log(marketerData.data);

  const dummy = {
    "_id": "66eee2ac9ab10cbb3c6e2077",
    "address": "0x12345779999",
    "cid": "bafkreidpx7e3bzcvdqdvqgfzqsk3huwisjc44lvt7jvwfoqcxpb3kfwggy",
    "rating": 0,
    "tags": [
      "aaa"
    ],
    "name": "1111",
    "description": "1",
    "category": "ATV",
    "minimumClaim": "1",
    "maximumClaim": "2",
    "premiumFunc": "def function_name(arg1, arg2):\n    return arg1 + arg2",
    "premiumFuncDescription": "2",
    "claimFunc": "def function_name(arg1, arg2):\n    return arg1 + arg2",
    "claimFuncDescription": "2",
    "minimumDuration": "86400000",
    "maximumDuration": "432000000",
    "creator": "0xAA1bfB4D4eCDbc78A6f929D829fded3710D070D0",
    "__v": 0
  }

  const minimumDurationInDays = moment.duration(policy.minimumDuration, 'milliseconds').asDays();
  const maximumDurationInDays = moment.duration(policy.maximumDuration, 'milliseconds').asDays();

  return (
    <Link
      to={`/policies/${props.policy.address}`}
      className={twMerge(
        "py-6 p-4 bg-mute/5 rounded-md relative group border border-border",
        props.className
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
        <div className="flex gap-x-4">
          <img
            src={marketerData.data?.marketer.image}
            alt={policy.name}
            className="w-[3vw] rounded-full"
          />
          <div className="flex flex-col justify-evenly">
            <h2 className="text-sm flex items-center gap-x-2">
              {policy.name}
              <span className="text-xs text-secondary">
                {"("}
                Car Insurance
                {")"}
              </span>
            </h2>
            <ClipboardWrapper
              textToBeCopied="0xc0ffee254729296a45a3885639AC7E10F9d54979"
              className="text-xs text-mute"
            >
              <p className="flex items-center gap-x-1">
                {formatEvmAddress("0xc0ffee254729296a45a3885639AC7E10F9d54979")}
                <Icon icon="contentCopy" />
              </p>
            </ClipboardWrapper>
          </div>
        </div>
        <div className="flex  text-xs mt-3  text-front/80">
          Marketer :
          <div className="ml-1 text-secondary/60">
            {marketerData.data?.marketer.name}
          </div>
        </div>
        <span className="text-xs text-mute absolute right-0 top-0 cursor-default saturate-150 brightness-150">
          <div className="flex gap-x-1">
            <p>{policy.rating}</p>
            <StarRating rating={policy.rating} />
          </div>
        </span>
      </div>
      <div className="relative flex flex-col">
        <div className="flex gap-x-4 mt-4">
          <span className="bg-mute/20 rounded-full w-max py-1 px-2 text-xs">
            Holding of Marketer : {"23%"}
          </span>
          <span className="bg-mute/20 rounded-full w-max py-1 px-2 text-xs">
            Total Stake : TBI
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col mt-5">
            <div className="text-xs text-mute flex gap-x-3">
              <p className="">Min Claim : {policy.minimumClaim}</p> <span>|</span>
              <p className="">Max Claim : {policy.maximumClaim}</p>
            </div>
            <div className="text-xs mt-2 text-mute flex gap-x-3">
              <p className="">Min Duration : {minimumDurationInDays} Days</p> <span>|</span>
              <p className="">Max Duration : {maximumDurationInDays} Days</p>
            </div>
          </div>

          <div className="flex flex-col text-end text-xs gap-y-2 items-end mt-5 text-secondary">
            <p className="flex gap-x-1 items-center text-green-500">
              <Icon icon="check" /> Verified
            </p>

            <p className="flex gap-x-1 items-center text-red-500 whitespace-nowrap text-xs">
              <Icon icon="close" /> Claimable
            </p>
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
  <button className="bg-primary/90 text-back font-bold py-1 px-3 rounded-md hover:-translate-y-1 duration-200 ease-in text-sm">
    Buy Now
  </button>
  <button className="bg-back/90 text-primary border-primary border font-bold py-1 px-3 rounded-md hover:-translate-y-1 duration-200 ease-in text-sm">
    Stake
  </button>
</div>
</Link> */
}