import React from "react";
import ConnectWallet from "./ConnectWallet";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="border-border border-b p-page py-3 flex justify-between items-center sticky top-0 bg-background z-[101]">
      <div className="flex justify-center items-center gap-x-2">
        <button className="group" onClick={() => navigate(-1)}>
          <Icon
            icon="back_ios_new"
            className="text-mute group-hover:text-front"
          />
        </button>
        <h1 className="text-xl font-black text-mute">Home</h1>
      </div>

      <ConnectWallet className="text-sm max-h-10 py-2 px-6 w-max h-max" />
    </header>
  );
}
