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
          <div className="w-1/4 flex flex-col items-center">
            <img src="/logo.png" alt="logo" className="brightness-0 invert" />
            <p className="font-black text-lg">Surity</p>
          </div>

          <figure role="separator" className="flex-1" />

          <div className="flex flex-col text-red-500 font-black">
            <figure role="separator" className="flex-1" />

            {/* <p className="pl-2 text-sm">Powered by</p>
            <div className="flex items-center text-base">
              <img
                src="/icons/tron.svg"
                alt="tron"
                className="aspect-square w-[2em]"
              />
              <p>TRON Network</p>
            </div> */}
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
      "https://scontent.fdel29-1.fna.fbcdn.net/v/t39.30808-1/277519684_10158675188522823_7436488509713286219_n.jpg?stp=dst-jpg_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=F_DHgHf32okQ7kNvgFoDMRJ&_nc_oc=AdjrUmHCntXRL9eOPCBtHPxVVuPVWDCHqb0ZTzb2L4NkUqsC8hp-eIRmI_AGQVweuOU&_nc_ht=scontent.fdel29-1.fna&oh=00_AfCaEPtKb2uNPNySl52-Yn_nRg5gjnl7HyWLs2gokqC7Ww&oe=6640025B",
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
