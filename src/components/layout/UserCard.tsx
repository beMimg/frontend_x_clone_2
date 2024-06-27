import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { IUser } from "../../interfaces/User.interface";

const UserCard = ({ user }: { user: IUser }) => {
  return (
    <Link
      to={`/profile/${user._id}`}
      className="flex h-full flex-row items-center gap-4"
    >
      <Avatar user={user} size={"60px"} />
      <div className="flex flex-col">
        <h6>{user.first_name}</h6>
        <p className="secondary-text">@{user.username}</p>
      </div>
    </Link>
  );
};

export default UserCard;
