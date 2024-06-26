import { IUser } from "../../interfaces/User.interface";
import NavLargeDevices from "../navegation/NavLargeDevices";
import NavSmallDevices from "../navegation/NavSmallDevices";

const Nav = ({ user }: { user: IUser }) => {
  return (
    <nav className="w-full lg:h-full">
      <div className="hidden h-full w-full lg:flex">
        <NavLargeDevices user={user} />
      </div>
      <div className="absolute bottom-0 left-0 flex h-[60px] w-full lg:hidden">
        <NavSmallDevices user={user} />
      </div>
    </nav>
  );
};

export default Nav;
