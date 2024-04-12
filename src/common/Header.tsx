import React from "react";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  return (
    <header className="border-border border-b p-page py-3 flex justify-between items-center">
      <h1 className="text-xl font-black text-mute">Home</h1>

      <ConnectWallet className="text-sm max-h-10 py-2 px-6 w-max h-max" />
    </header>
  );
}
