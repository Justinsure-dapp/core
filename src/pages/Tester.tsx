import React, { useEffect } from "react";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";

export default function Tester() {
  const { signMessage } = useWallet();

  return (
    <div className="p-page py-10">
      <button
        className="bg-teal-500 px-6 py-1 text-black rounded-md"
        onClick={async () => {
          const msg = "popcorn";

          const signed = await signMessage(msg);
          const r = signed.slice(0, 66);
          const s = "0x" + signed.slice(66, 130);
          const v = "0x" + signed.slice(130, 132);

          console.log({ r, s, v });
        }}
      >
        Sign
      </button>
    </div>
  );
}
