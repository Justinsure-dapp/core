import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Icon, { IconType } from "./Icon";

export default function Navbar() {
  const navItems: Array<{ title: string; link: string; icon: IconType }> = [
    { title: "Home", link: "/", icon: "open_in_new" },
    { title: "Account", link: "/account", icon: "github" },
    { title: "Dashboard", link: "/dashboard", icon: "analytics" },
    { title: "Policies", link: "/policies", icon: "expand_more" },
    { title: "Applications", link: "/applications", icon: "bookmark" },
    { title: "Providers", link: "/providers", icon: "key" },
    { title: "Developers", link: "/developers", icon: "logout" },
  ];

  return (
    <nav className="flex flex-col p-6 border-r border-r-border">
      <div className="flex items-center gap-x-2">
        <img src="/logo.png" alt="logo" className="aspect-square w-10" />
        <div className="flex flex-col gap-y-1">
          <h1 className="font-black text-2xl">Xurity</h1>
          <p className="text-primary text-xs font-semibold">
            Rest assured on Web3
          </p>
        </div>
      </div>

      <div role="list" className="flex flex-col gap-y-2 py-4">
        {navItems.map((item, key) => (
          <NavLink
            to={item.link}
            role="listitem"
            className={({ isActive, isPending }) =>
              twMerge(
                "p-2 rounded-lg",
                isActive &&
                  "bg-gradient-to-l from-primary to-secondary pointer-events-none",
                !isActive && "hover:bg-secondary/30",
                isPending && "animate-pulse pointer-events-none"
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
