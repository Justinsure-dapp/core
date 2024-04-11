import React from "react";
import { wallet } from "../config";

export default function Header() {
  return (
    <header className="border-border border-b p-page py-2 flex">
      <h1 className="text-xl font-black text-mute">Home</h1>

      <button className="" onClick={wallet.connect}>
        Connect
      </button>
    </header>
  );
}
