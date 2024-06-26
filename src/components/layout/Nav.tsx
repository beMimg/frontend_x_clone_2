import React from "react";
import { useUser } from "../../context/userContext";
import NavLargeDevices from "../navegation/NavLargeDevices";

const Nav = () => {
  const { user, loading, error } = useUser();

  return (
    user && (
      <nav className="w-full lg:h-full">
        <div className="hidden h-full w-full lg:flex">
          <NavLargeDevices user={user} />
        </div>
        <div className="absolute bottom-0 left-0 flex h-[60px] w-full lg:hidden">
          <p>lol</p>
          {/* <NavSmallDevices user={user} /> */}
        </div>
      </nav>
    )
  );
};

export default Nav;
