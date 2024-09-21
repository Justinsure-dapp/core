import { Link } from "react-router-dom";
import StarRating from "../../../common/StarRating";
import ClaimInfo from "./ClaimsInfo";
import useModal from "../../../hooks/useModal";
import StakeModal from "./StakeModal";
import { Policy } from "../../../types";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";

export default function Header(props: { policy: Policy }) {
  const modal = useModal();

  const { policy } = props;
  const marketerData = useApiResponse(api.marketer.get, policy.owner);

  return (
    <div className="flex w-full gap-x-4 justify-between border-b pt-4 pb-8 border-front/20 ">
      <div className="flex gap-x-4 w-full">
        <img
          src={marketerData.data?.marketer.image}
          className="w-[4vw] rounded-full aspect-square h-max mobile:w-[15vw]"
        />
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex justify-between gap-y-2 mobile:flex-col w-full">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2 mobile:items-end">
                <h1 className="text-2xl font-semibold">{policy.name}</h1> -
                <h2 className="text-2xl font-bold">
                  {marketerData.data?.marketer.name || "Marketer"}
                </h2>
              </div>
              <div className="flex gap-x-1 items-center">
                <StarRating rating={policy.rating} />
                <p>{policy.rating}</p>
              </div>
            </div>
            <div className="flex gap-x-4">
              <Link
                to={`/buy-policy/${policy.address}`}
                className="bg-primary border border-border h-max px-4 py-2 rounded-lg text-back font-semibold hover:bg-primary/80 transition-all"
              >
                Buy Policy
              </Link>
              <button
                onClick={() => modal.show(<StakeModal policy={policy} />)}
                className="border-border hover:bg-hoverbg border h-max px-6 py-2 rounded-lg font-semibold ease-out transition-all"
              >
                Stake
              </button>
            </div>
          </div>
          <div className="text-front/80"><span className="font-semibold">Description:</span> {policy.description}</div>
        </div>
      </div>
    </div>
  );
}
