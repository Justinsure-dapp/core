import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Icon, { IconType } from "./Icon";
import useWeb3 from "../contexts/web3context";

export default function Navbar() {
  const navItems: Array<{
    title: string;
    link: string;
    icon: IconType;
    marketersOnly?: boolean;
  }> = [
    { title: "Home", link: "/", icon: "home" },
    { title: "Account", link: "/account", icon: "person" },
    { title: "Dashboard", link: "/dashboard", icon: "analytics" },
    { title: "Policies", link: "/policies", icon: "description" },
    { title: "Applications", link: "/applications", icon: "grid" },
    { title: "Providers", link: "/providers", icon: "key" },
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

  console.log(user);

  return (
    <nav className="flex flex-col p-6 border-r border-border">
      <div
        className="flex items-center gap-x-2 cursor-pointer"
        role="button"
        onClick={() => null}
      >
        <img src="/logo.png" alt="logo" className="aspect-square w-10" />
        <div className="flex flex-col gap-y-1">
          <h1 className="font-black text-2xl tracking-wider">Surity</h1>
          <p className="text-primary text-xs font-semibold">
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
                isActive && "bg-primary text-back pointer-events-none",
                !isActive && "hover:outline hover:outline-[1.5px]",
                isPending && "animate-pulse pointer-events-none",
                item.marketersOnly && (user?.marketer ? "" : "hidden")
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
  );
}
