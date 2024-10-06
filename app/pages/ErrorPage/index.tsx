import { Link } from "react-router-dom";
import DocTitle from "../../common/DocTitle";

export default function ErrorPage() {
  return (
    <article className="h-screen flex justify-center items-center">
      <DocTitle title="404 Not Found.." />

      <div className="bg-background rounded-2xl shadow-lg border border-front border-opacity-20 p-6 flex flex-col items-center gap-y-2 w-[30vw] mobile:w-[80vw] relative">
        <div
          className="-z-10 absolute-cover scale-90 bg-primary blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <img
          src="/images/soparu_disappointed_head.png"
          alt="soparu sad"
          className="w-1/3"
        />

        <h1 className="text-primary text-7xl font-black">404</h1>
        <div className="-z-1 absolute-cover scale-90 bg-secondary animate-pulse blur-3xl" />
        <p className="text-center text-sm mb-3 text-front text-opacity-70">
          Soparu thinks you are lost. This magical button can help you get back
          though
        </p>
        <Link
          to="/"
          className="bg-secondary/50 hover:bg-secondary/60 transition-all p-2 rounded-md"
        >
          Back to Safety
        </Link>
      </div>
    </article>
  );
}
