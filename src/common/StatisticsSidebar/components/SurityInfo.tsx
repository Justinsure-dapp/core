import React, { useEffect, useState } from "react";
import Icon, { IconType } from "../../Icon";
import { Link } from "react-router-dom";

export default function SurityInfo() {
  const [seed, setSeed] = useState(Date.now());

  useEffect(() => {
    setInterval(() => {
      setSeed(Date.now());
    }, 500);
  }, []);

  return (
    <div className="border-t border-border px-6 py-4 flex flex-col gap-y-1 text-sm font-semibold">
      <div className="bg-primary p-2 rounded-lg mb-3 relative overflow-hidden">
        <div className="absolute-cover bg-gradient-to-r from-transparent to-front/50" />

        <div className="flex relative z-10">
          <div className="w-1/4 flex flex-col items-centers">
            <img src="/logo.png" alt="logo" className="brightness-0 invert" />
            <p className="font-black text-lg">JustInsure</p>
          </div>

          <figure role="separator" className="flex-1" />

          <div className="flex flex-col text-red-500 text-end font-bold">
            <figure role="separator" className="flex-1" />

            <p className="pl-2 text-xs">Powered by</p>
            <div className="flex items-center">
              <img
                src="/icons/tron.svg"
                alt="tron"
                className="aspect-square w-[1.5em]"
              />
              <p className="text-sm">TRON Network</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex text-xs gap-x-2" key={seed}>
        <p>{new Date(Date.now()).toLocaleTimeString()}</p>
        <p>{new Date(Date.now()).toDateString()}</p>
      </div>

      <div className="flex items-center gap-x-2 mt-1">
        Socials
        {socialLinks.map((social, key) => (
          <Link to={social.link} key={key}>
            <div className="rounded-full overflow-hidden flex items-center justify-center object-cover">
              <img
                src={social.imgUrl}
                className="rounded-full w-[1.5vw] object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const socialLinks: Array<{ link: string; imgUrl: string }> = [
  {
    link: "",
    imgUrl:
      "https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png",
  },
  {
    link: "",
    imgUrl:
      "https://res.cloudinary.com/dqjkucbjn/image/upload/v1726786874/logo_ipjrnu.png",
  },
  {
    link: "",
    imgUrl:
      "https://cdn.iconscout.com/icon/premium/png-256-thumb/tron-4441424-3679719.png?f=webp",
  },
  {
    link: "",
    imgUrl:
      "https://seeklogo.com/images/D/devpost-logo-95FF685C5D-seeklogo.com.png",
  },
  {
    link: "",
    imgUrl:
      "https://m.media-amazon.com/images/I/61w1Q5OxE2L.jpg",
  },
];
