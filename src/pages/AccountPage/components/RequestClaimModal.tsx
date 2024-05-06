import { twMerge } from "tailwind-merge";
import Heading from "../../NewPolicyPage/components/Heading";
import { twInputStyle } from "../../../utils";
import useModal from "../../../hooks/useModal";

export default function RequestClaimModal() {
    const modal = useModal()
  return (
    <div className="bg-background py-6 px-8 max-h-[50vh] overflow-y-scroll scrollbar-primary rounded-lg border border-primary/60 w-[40vw] flex flex-col gap-y-3">
      <h1 className="text-2xl font-bold self-center">Request Claim</h1>
      <div>
        <Heading>Duration Passed</Heading>
        <input
          type="text"
          className={twMerge(twInputStyle, "w-full")}
          placeholder="Policy Duration"
        />
      </div>
      <div>
        <Heading>Year bought</Heading>
        <input
          type="number"
          className={twMerge(twInputStyle, "w-full")}
          placeholder="Policy Duration"
        />
      </div>
      <div>
        <Heading>Exact Version</Heading>
        <input
          type="text"
          className={twMerge(twInputStyle, "w-full")}
          placeholder="Policy Duration"
        />
      </div>
      <div className="self-center flex flex-col mt-4 w-full gap-y-3">
        <p className="text-lg text-center">Are you sure you want to claim this policy?</p>
        <div className="flex justify-around">
            <button className="border-2 py-1 px-4 rounded-lg border-red-700/80 hover:bg-red-700/80 duration-300 ease-in" onClick={() => modal.hide()}>Cancel</button>
            <button className="border-2 py-1 px-5 rounded-lg border-primary/80 hover:bg-primary/80 duration-300 ease-in hover:text-back">Yes</button>
        </div>
      </div>
    </div>
  );
}
