import { Outlet } from "react-router-dom";
import SideNav from "../common/SideNav";
import Modal from "../common/Modal";
import { useRef } from "react";
import useIdleScrollbar from "../hooks/useIdleScrollbar";
import StatisticsSidebar from "../common/StatisticsSidebar";
import Header from "../common/Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Toasts from "../common/Toasts";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Default() {
  const mainSectionRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [parent] = useAutoAnimate();

  useIdleScrollbar(mainSectionRef);

  return (
    <>
      <Modal />
      <Toasts />
      
      <ToastContainer
          position="top-center"
          autoClose={2000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          limit={3}
        />

      <main ref={parent} className="flex h-screen overflow-x-clip">
        <SideNav />
        <section
          ref={mainSectionRef}
          className="h-screen overflow-y-scroll scrollbar-primary flex-1"
        >
          <Header />
          <Outlet />
        </section>
        <StatisticsSidebar />
      </main>
    </>
  );
}
