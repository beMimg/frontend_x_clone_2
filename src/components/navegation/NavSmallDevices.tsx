import { GoHome, GoPeople, GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/User.interface";

const NavSmallDevices = ({ user }: { user: IUser }) => {
  const LinkStyle =
    "w-full flex items-center justify-center border-r  border-gray-900 h-full";

  return (
    <div className="grid w-full grid-cols-3 items-center justify-items-center border-t border-gray-900 bg-black text-2xl text-white">
      <Link to="/" className={LinkStyle}>
        <GoHome />
      </Link>
      <Link to={"/explore/page=1"} className={LinkStyle}>
        <GoPeople />
      </Link>
      <Link to={`/profile/${user._id}`} className={LinkStyle}>
        <GoPerson />
      </Link>
    </div>
  );
};

export default NavSmallDevices;
