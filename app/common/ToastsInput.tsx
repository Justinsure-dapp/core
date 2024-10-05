import {
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

export default function ToastsInput(props: {
  className?: string;
  setter?: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [res, setRes] = useState<string[]>([]);

  useEffect(() => {
    props.setter && props.setter(res);
  }, [res]);

  const inpRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <div
      className={twMerge("flex flex-wrap gap-2 items-center", props.className)}
    >
      {res.map((item, key) => (
        <div
          key={key}
          className="py-1 px-4 rounded-full bg-foreground border text-sm border-mute truncate"
        >
          {item}
        </div>
      ))}

      <input
        type="text"
        className="flex-1 outline-none bg-transparent"
        ref={inpRef}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.stopPropagation();
            if (inpRef.current && inpRef.current.value) {
              const value = inpRef.current.value.trim();
              if (!res.includes(value)) {
                setRes((p) => [...p, value]);
              }
            }
            setTimeout(() => {
              inpRef.current.value = "";
            }, 10);
          } else if (e.key === "Backspace" && inpRef.current.value === "") {
            setRes((p) => p.slice(0, -1));
          }
        }}
      />
    </div>
  );
}