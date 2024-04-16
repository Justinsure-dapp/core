import React, { useEffect, useRef } from "react";

export default function useFormData(
  ref: React.MutableRefObject<HTMLFormElement>,
  callback: (data: Record<string, string>) => void
) {
  const flag = useRef(false);

  useEffect(() => {
    if (!flag.current) {
      flag.current = true;
      const formElement = ref.current;
      formElement.addEventListener("submit", (e) => {
        if ((document.activeElement as any).type == "submit") {
          e.preventDefault();
          if (e.target) {
            const res: Record<string, string> = {};
            const data = new FormData(e.target as any);
            [...data.entries()].forEach((d, i) => {
              res[d[0]] = d[1].toString();
            });
            callback(res);
          }
        }
      });
    }
  }, []);

  return;
}
