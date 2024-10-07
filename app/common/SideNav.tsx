import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Icon, { IconType } from "./Icon";
import useWeb3 from "../contexts/web3context";
import { useState } from "react";
import Header from "./Header";

export default function Navbar() {
  const navItems: Array<{
    title: string;
    link: string;
    icon: IconType;
    marketersOnly?: boolean;
  }> = [
    { title: "Home", link: "/", icon: "home" },
    { title: "Account", link: "/account", icon: "person" },
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: "analytics",
      marketersOnly: true,
    },
    {
    title: "Swap",
    link: "/swap",
    icon: "swap",
    }
    ,
    { title: "Policies", link: "/policies", icon: "description" },
    { title: "Applications", link: "/applications", icon: "grid" },
    {
      title: "Marketing",
      link: "/new-policy",
      icon: "filter",
      marketersOnly: true,
    },
    { title: "Settings", link: "/settings", icon: "settings" },
    {
      title: "Developers",
      link: "/developers",
      icon: "code",
      marketersOnly: true,
    },
    { title: "Accessibility", link: "/accessibility", icon: "accessibility" },
  ];

  const { user } = useWeb3();
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <nav className="flex flex-col w-[16rem] p-6 border-r border-border mobile:hidden">
        <div
          className="flex items-center gap-x-2 cursor-pointer relative"
          role="button"
          onClick={() => null}
        >
          <img src="/logo.png" alt="logo" className="aspect-square w-10" />
          <div className="flex flex-col items-start gap-y-1">
            <div className="relative">
              <h1 className="font-black text-2xl tracking-wider">JustInsure</h1>
              {user?.marketer && (
                <div className="group">
                  <p className="absolute top-0 left-full translate-x-1 -translate-y-1/4 text-[10px] bg-primary px-1 rounded-full text-zinc-100 font-bold">
                    Pro
                  </p>

                  <p className="absolute left-10 whitespace-nowrap text-xs opacity-0 duration-300 translate-y-full group-hover:translate-y-1/2 group-hover:opacity-100 bg-background border border-border p-2 rounded-lg pointer-events-none z-20">
                    "Pro" indicates that you are a marketer and you can list
                    <br />
                    policies on our platform
                  </p>
                </div>
              )}
            </div>
            <p className="text-secondary text-xs font-semibold">
              Rest assured on Web3
            </p>
          </div>
        </div>

        <div role="list" className="flex flex-col gap-y-2 py-4">
          {navItems.map((item, key) => (
            <NavLink
              to={item.link}
              key={key}
              role="listitem"
              className={({ isActive, isPending }) =>
                twMerge(
                  "p-2 rounded-lg",
                  isActive && "bg-primary text-zinc-100 pointer-events-none",
                  !isActive && "hover:outline hover:outline-[1.5px]",
                  isPending && "animate-pulse pointer-events-none",
                  item.marketersOnly && (user?.marketer ? "" : "hidden"),
                )
              }
            >
              <span className="flex items-center gap-x-2 text-base font-semibold">
                <Icon icon={item.icon} className="text-lg" />
                {item.title}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>

      <button
        className="absolute top-[12px] right-4 z-[102] text-2xl bg-foreground border border-border text-front p-[6px] rounded-lg widescreen:hidden"
        onClick={() => setShowNav(!showNav)}
      >
        <Icon icon="menu" />
      </button>

      {showNav && (
        <nav className="flex flex-col p-6 w-[16rem] border-l border-border widescreen:hidden absolute top-0 right-0 bg-background z-30 h-full mt-12 ">
          <div
            className="flex items-center gap-x-2 cursor-pointer relative"
            role="button"
            onClick={() => null}
          >
            <img src="/logo.png" alt="logo" className="aspect-square w-10" />
            <div className="flex flex-col items-start gap-y-1">
              <div className="relative">
                <h1 className="font-black text-2xl tracking-wider">
                  JustInsure
                </h1>
                {user?.marketer && (
                  <div className="group">
                    <p className="absolute top-0 left-full translate-x-1 -translate-y-1/4 text-[10px] bg-primary px-1 rounded-full text-zinc-100 font-bold">
                      Pro
                    </p>

                    <p className="absolute -top-2 -right-7 whitespace-nowrap text-xs opacity-0 duration-300 translate-y-full group-hover:translate-y-1/2 group-hover:opacity-100 bg-background border border-border p-2 rounded-lg pointer-events-none z-20">
                      "Pro" indicates that you are a marketer and you can list
                      <br />
                      policies on our platform
                    </p>
                  </div>
                )}
              </div>
              <p className="text-secondary text-xs font-semibold">
                Rest assured on Web3
              </p>
            </div>
          </div>

          <div role="list" className="flex flex-col gap-y-2 py-4">
            {navItems.map((item, key) => (
              <NavLink
                onClick={() => setShowNav(false)}
                to={item.link}
                key={key}
                role="listitem"
                className={({ isActive, isPending }) =>
                  twMerge(
                    "p-2 rounded-lg transition-all hover:bg-zinc-800",
                    isActive && "bg-primary text-zinc-100 pointer-events-none",
                    !isActive &&
                      "hover:outline hover:outline-[1px] outline-zinc-500",
                    isPending && "animate-pulse pointer-events-none",
                    item.marketersOnly && (user?.marketer ? "" : "hidden"),
                  )
                }
              >
                <span className="flex items-center gap-x-2 text-base font-semibold">
                  <Icon icon={item.icon} className="text-lg" />
                  {item.title}
                </span>
              </NavLink>
            ))}
          </div>

          <button
            className="self-start flex items-center gap-1 mt-4 ml-2 font-semibold border-zinc-700 border rounded-md py-2 px-3 hover:outline hover:outline-[1px] outline-zinc-500 hover:bg-zinc-800 transition-all"
            onClick={() => setShowNav(false)}
          >
            <Icon icon="close" className="text-lg" />
            Close
          </button>
        </nav>
      )}
    </>
  );
}
