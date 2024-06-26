import { useState } from "react";
import { GoHome, GoPeople, GoPerson } from "react-icons/go";
import { SlLogout } from "react-icons/sl";
import { Link, NavLink } from "react-router-dom";
import LogoutModal from "../modals/LogoutModal";
import Avatar from "../layout/Avatar";
import { IUser } from "../../interfaces/User.interface";

const NavLargeDevices = ({ user }: { user: IUser }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const inactiveStyle =
    "text-neutral-300 text-xl flex flex-row items-center gap-5 font-light  hover:bg-neutral-900 px-4 py-2 rounded-full transition-all ";
  const activeStyle =
    "translate-x-5  text-white font-semibold text-xl flex flex-row items-center gap-5  hover:bg-neutral-900 px-4 py-2 rounded-full transition-all";

  return (
    <div className="hidden h-full w-full flex-col border-r border-gray-800 p-4 lg:flex">
      <div className="flex flex-col items-start justify-center gap-7">
        <h1>X</h1>
        <div className="flex flex-col gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <GoHome /> Home
          </NavLink>
          <NavLink
            to="/explore/page=1"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <GoPeople /> People
          </NavLink>
          <NavLink
            to={`/profile/${user._id}`}
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <GoPerson /> Profile
          </NavLink>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className={inactiveStyle}
          >
            <SlLogout />
            Logout
          </button>
        </div>
        {isLogoutModalOpen && (
          <LogoutModal setIsLogoutModalOpen={setIsLogoutModalOpen} />
        )}
      </div>
      <Link
        to={`/profile/${user._id}`}
        className="mt-auto flex flex-row items-center gap-2 rounded-full px-4 py-2 transition-all hover:bg-neutral-900"
      >
        <Avatar user={user} size="50px" />
        <div className="flex flex-col items-start">
          <p className="font-bold">{user.first_name}</p>
          <p className="max-w-[100px] break-words text-zinc-500">
            @{user.username}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default NavLargeDevices;
