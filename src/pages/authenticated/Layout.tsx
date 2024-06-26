import { Outlet } from "react-router-dom";
import Nav from "../../components/layout/Nav";

export const Layout = () => {
  return (
    <div className="h-screen bg-black text-white lg:flex lg:justify-center">
      <div className="flex h-full flex-col text-white lg:grid lg:w-[70%] lg:grid-cols-[25%,50%,25%]">
        <div className="w-full lg:h-full">
          <Nav />
        </div>
        <div className="overflow-auto pb-[60px] lg:pb-0">
          <Outlet />
        </div>
        <div className="hidden lg:flex">
          <p>lol</p>
        </div>
      </div>
    </div>
  );
};
