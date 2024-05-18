import { Line } from "react-chartjs-2";
import { Policy } from "../../../types";
import { Link } from "react-router-dom";
import StarRating from "../../../common/StarRating";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import DocTitle from "../../../common/DocTitle";

export default function PolicyCard(props: { policy: Policy }) {
  const marketerData = useApiResponse(api.marketer.get, props.policy.owner);
  console.log(marketerData.data?.marketer.image);
  return (
      <Link
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
          <p>{2}</p>
          <StarRating rating={2} />
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
      </Link>
  );
}
