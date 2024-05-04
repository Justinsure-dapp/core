import { twMerge } from "tailwind-merge";
import Heading from "../../NewPolicyPage/components/Heading";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";

export default function StakeModal() {
  const modal = useModal();
  return (
    <div className="relative flex flex-col gap-y-1 bg-background max-w-[40vw] mobile:max-w-[90vw] px-16 py-8 rounded-lg border border-primary/60 mobile:px-8">
      <button
        className="absolute top-3 right-3 text-red-500 rounded-full border border-red-500 p-1"
        onClick={() => (modal.hide())}
      >
        <Icon icon="close" className="text-[1.5rem] mobile:text-[1rem]" />
      </button>
      <h1 className="text-2xl font-bold">Stake in CarSure Policy</h1>
      <p className="text-sm text-front/80">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum,
        labore molestiae architecto praesentium deleniti id quia animi, laborum
        cumque similique facere. Harum quaerat nostrum eos rem iste fuga omnis
        temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Nostrum, labore molestiae architecto praesentium deleniti id quia animi,
        laborum cumque similique facere. Harum quaerat nostrum eos rem iste fuga
        omnis temporibus.
      </p>
      <div className="flex flex-col mt-3">
        <Heading>Enter amount to be Staked in policy</Heading>
        <input
          className="rounded-md p-2 bg-background border border-border shadow shadow-mute/30"
          placeholder="Enter Amount"
        />
      </div>
      <button className="mt-6 text-primary border-primary font-bold border duration-150 ease-in hover:-translate-y-1 w-max px-6 py-2 self-end rounded-lg">
        Stake
      </button>
    </div>
  );
}
