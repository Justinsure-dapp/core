import StarRating from "../../../common/StarRating";
import ClaimInfo from "./ClaimsInfo";

export default function Header() {
  return (
    <div className="flex w-full gap-x-4 justify-between border-b pt-4 pb-8 border-front/20">
      <div className="flex gap-x-4">
        <img
          src="https://i.pinimg.com/736x/26/7f/6c/267f6c91848164e2dd570d67fab5cb96.jpg"
          className="w-[4vw] rounded-full aspect-square h-max"
        />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <h1 className="text-2xl font-semibold">Car insurance Policy</h1> -
            <h2 className="text-2xl text-primary font-bold">SureCar</h2>
          </div>
          <div className="flex gap-x-1 items-center">
            <StarRating rating={2.7} />
            <p>2.7</p>
            <p className="text-xs">(5 reviews) {" "} (1 expert rating)</p>
          </div>
          <div className="text-front/80">
            Protect your vehicle and your peace of mind with our comprehensive
            car insurance. Whether you're driving around town or hitting the
            open road, our coverage offers financial protection against
            accidents, theft, and unexpected damages. With 24/7 support and
            flexible payment options, you can drive with confidence knowing
            you're covered.
          </div>
        </div>
      </div>
    </div>
  );
}
