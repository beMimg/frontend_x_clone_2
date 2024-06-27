import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import { IUser } from "../../interfaces/User.interface";

const FollowButton = ({
  visitedUser,
  user,
  setRerender,
}: {
  visitedUser: IUser;
  user: IUser;
  setRerender: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(
    visitedUser.followers.includes(user._id),
  );

  const axiosPrivate = useAxiosPrivate();

  const handleFollow = async () => {
    try {
      setLoading(true);
      if (isFollowed) {
        await axiosPrivate.delete(`/users/follow/${visitedUser._id}`);
      } else {
        await axiosPrivate.post(`/users/follow/${visitedUser._id}`);
      }
      setRerender((prevRender) => prevRender + 1);
      setIsFollowed(!isFollowed);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`text-md mr-4 mt-4 w-[100px] self-end rounded-full py-2 text-sm font-semibold ${
        isFollowed
          ? "border border-black bg-white text-black hover:text-red-600"
          : "border border-gray-600 bg-black text-white"
      }`}
    >
      {loading
        ? "Loading..."
        : isFollowed
          ? hovered
            ? "Unfollow"
            : "Following"
          : "Follow"}
    </button>
  );
};

export default FollowButton;
