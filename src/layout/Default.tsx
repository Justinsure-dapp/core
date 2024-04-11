import { Outlet } from "react-router-dom";
import SideNav from "../common/SideNav";
import Modal from "../common/Modal";
import { useRef } from "react";
import useIdleScrollbar from "../hooks/useIdleScrollbar";
import StatisticsSidebar from "../common/StatisticsSidebar";

export default function Default() {
  const mainSectionRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useIdleScrollbar(mainSectionRef, { idleType: "hidden" });

  return (
    <>
      <Modal />

      <main className="flex h-screen">
        <SideNav />
        <section
          ref={mainSectionRef}
          className="h-screen overflow-y-hidden flex-1"
        >
          <Outlet />
        </section>
        <StatisticsSidebar />
      </main>
    </>
  );
}
