import { useUser } from "../../context/userContext";
import { IUser } from "../../interfaces/User.interface";
import ErrorText from "../feedback/ErrorText";
import LoadingSpinner from "../feedback/LoadingSpinner";
import NavLargeDevices from "../navegation/NavLargeDevices";

const Nav = ({ user }: IUser) => {
  return (
    <nav className="w-full lg:h-full">
      <div className="hidden h-full w-full lg:flex">
        <NavLargeDevices user={user} />
      </div>
      <div className="absolute bottom-0 left-0 flex h-[60px] w-full lg:hidden">
        {/* <NavSmallDevices user={user} /> */}
      </div>
    </nav>
  );
};

export default Nav;
