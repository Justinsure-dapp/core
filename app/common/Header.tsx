import { useEffect, useRef, useState } from "react";
import ConnectWallet from "./ConnectWallet";
import Icon from "./Icon";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import useUsdjHook from "../hooks/useUsdj";
import { useAccount } from "wagmi";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { address } = useAccount();
  const usdj = useUsdjHook();

  const [title, setTitle] = useState("");

  const history = useRef<string[]>([]);

  useEffect(() => {
    history.current.push(location.pathname);

    if (location.pathname == "/") history.current = [];

    setTimeout(() => {
      const titleArr = document.title.split("|");
      setTitle(titleArr.at(titleArr.length - 1) || "Home");
    }, 10);
  }, [location]);

  return (
    <header className="border-border border-b p-page py-3 flex justify-between items-center sticky top-0 bg-background z-[101]">
      <div className="flex justify-center items-center">
        <button
          className={twMerge(
            "group duration-300 pr-2",
            history.current.length == 0 && "w-0 scale-0 pr-0",
          )}
          onClick={() => {
            history.current.pop();
            navigate(history.current.pop() || "");
          }}
        >
          <Icon
            icon="back_ios_new"
            className="text-mute group-hover:text-front"
          />
        </button>

        <h1 className="text-xl font-black text-mute mobile:text-base">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-x-4 mobile:gap-x-2 mobile:mr-10 mobile:scale-90">
        <div className="flex items-center gap-x-4">
          <ConnectWallet />
        </div>

        <div className="border mobile:hidden border-mute py-1 px-2 rounded-lg hover:border-zinc-300 hover:text-zinc-300 group duration-150 ease-in">
          <p className="font-sans font-bold">
            USDJ: {usdj.getUserBalance().toFixed(2)}
          </p>
        </div>

        <Link
          to="/faucet"
          className="border border-mute py-1 px-2 rounded-lg hover:border-zinc-300 hover:text-zinc-300 group duration-150 ease-in"
        >
          <Icon
            icon="money"
            className="text-2xl text-mute group-hover:text-zinc-300 duration-150 ease-in"
          />
        </Link>
      </div>
    </header>
  );
}
