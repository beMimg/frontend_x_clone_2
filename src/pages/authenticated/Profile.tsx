import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import { IoMdCalendar } from "react-icons/io";
import { NavLink, Outlet, Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import LogoutModal from "../../components/modals/LogoutModal";
import Avatar from "../../components/layout/Avatar";
import { IUser } from "../../interfaces/User.interface";
import { useUser } from "../../context/userContext";
import EditProfileButton from "../../components/buttons/EditProfileButton";
import FollowButton from "../../components/buttons/FollowButton";
import ErrorText from "../../components/feedback/ErrorText";
const Profile = () => {
  const [visitedUser, setVisitedUser] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [errors, setErrors] = useState(false);
  const [rerender, setRerender] = useState(0);
  const { user } = useUser();

  const { visited_id } = useParams();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/users/${visited_id}`);
        setVisitedUser(response.data.user);
      } catch (err) {
        setErrors(true);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [visited_id, rerender]);

  const notActiveStyle = "text-gray-500 p-2";
  const activeStyle =
    "text-white border-b-[4px] border-sky-500 font-semibold p-2 ";

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <LoadingSpinner color="blue" size="60px" />
      </div>
    );
  }

  return (
    <main className="overflow-auto">
      {visitedUser && user ? (
        <>
          <div className="flex flex-row gap-10 p-2">
            <Link to="/" className="flex items-center">
              <IoMdArrowBack className="ml-4 text-2xl" />
            </Link>
            <h3>{visitedUser.first_name}</h3>
          </div>
          <div className="relative h-[150px] w-full bg-gray-600">
            <div className="absolute -bottom-[45px] left-[30px] z-20 min-h-[120px] min-w-[120px] rounded-full text-5xl">
              <Avatar user={visitedUser} size={"120px"} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {/* Conditional rendering based on whether the logged-in user is viewing their own profile or another user's profile. If it's the logged-in user's own profile, display the 'Edit Profile' button. Otherwise, display a button with functionality to follow or unfollow. */}
            {user._id === visitedUser._id ? (
              <EditProfileButton user={user} />
            ) : (
              <FollowButton
                visitedUser={visitedUser}
                user={user}
                setRerender={setRerender}
              />
            )}
            {/* Logout for smaller<lg devices */}
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="text-md mr-4 w-[100px] self-end rounded-full border border-gray-700 bg-black py-2 text-center text-sm font-semibold text-white transition-all hover:bg-gray-600 lg:hidden"
            >
              Logout
            </button>
            {isLogoutModalOpen && (
              <LogoutModal setIsLogoutModalOpen={setIsLogoutModalOpen} />
            )}
            {/* End logout */}
            <div className="flex flex-col py-2 pl-4">
              <h3 className="">{visitedUser.first_name}</h3>
              <p className="secondary-text">@{visitedUser.username}</p>
            </div>
            <p className="secondary-text flex flex-row items-center gap-2 py-2 pl-4">
              <IoMdCalendar /> Joined {visitedUser.utc_creation}
            </p>
            <div className="flex flex-row gap-2 py-2 pl-4">
              <NavLink
                to={`/profile/${visited_id}/following`}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-sky-500" : "hover:underline"
                }
              >
                {visitedUser.followings.length}{" "}
                <span className="text-gray-500">Following</span>
              </NavLink>
              <NavLink
                to={`/profile/${visitedUser._id}/followers`}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-sky-500" : "hover:underline"
                }
              >
                {visitedUser.followers.length}{" "}
                <span className="secondary-text">Followers</span>
              </NavLink>
            </div>
            <nav className="grid grid-cols-2 place-items-center justify-between border-b border-gray-600">
              <NavLink
                to={`/profile/${visited_id}`}
                className="w-full p-2 text-center transition-all hover:bg-neutral-900"
              >
                <NavLink
                  to={`/profile/${visited_id}`}
                  className={({ isActive }) =>
                    isActive ? activeStyle : notActiveStyle
                  }
                  end
                >
                  Posts
                </NavLink>
              </NavLink>
              <NavLink
                to={`/profile/${visited_id}/likes`}
                className="w-full p-2 text-center transition-all hover:bg-neutral-900"
              >
                {" "}
                <NavLink
                  to={`/profile/${visited_id}/likes`}
                  className={({ isActive }) =>
                    isActive ? activeStyle : notActiveStyle
                  }
                >
                  Likes
                </NavLink>
              </NavLink>
            </nav>
          </div>
          <Outlet />
        </>
      ) : (
        errors && (
          <div className="flex h-full w-full items-center justify-center">
            <ErrorText text="Something went wrong" />
          </div>
        )
      )}
    </main>
  );
};
// The rerender state will be useful for re-fetching the user data and the logged-in user data. Why?
// It ensures that the correct follow buttons are displayed. If the user.followings contains the user._id,
// the button will say "Unfollow". However, each time the button is clicked to follow or unfollow,
// we need to re-fetch this data because it may be outdated.

export default Profile;
