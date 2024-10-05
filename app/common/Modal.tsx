import useModal from "../hooks/useModal";
import { twMerge } from "tailwind-merge";

export default function Modal() {
  const modal = useModal();

  return (
    <article
      className={twMerge(
        "z-[1001] bg-black bg-opacity-80 flex justify-center items-center fixed top-0 left-0 w-full h-full duration-300",
        modal.element ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div
        className={twMerge(
          "duration-inherit ease-out",
        )}
      >
        {modal.element}
      </div>
    </article>
  );
}
