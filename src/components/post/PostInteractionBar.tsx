import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/User.interface";
import ErrorText from "../feedback/ErrorText";

// if borders === true render borders. conditianal styiling depending on
// rendering in Post or PostContent
const PostInteractionBar = ({
  post,
  user,
  setRerender,
  borders,
}: {
  post: any;
  user: IUser;
  setRerender: React.Dispatch<React.SetStateAction<number>>;
  borders: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  // First, let's check if the post likes include the user's _id.
  // This check will be useful for conditional HTTP requests, determining whether to like or dislike a post,
  // as well as for determining the color of the heart icon representing the like status.

  const isLiked = post.likes.includes(user._id);

  const handlePostLike = async () => {
    try {
      setLoading(true);
      setError(false);
      if (!isLiked) {
        const response = await axiosPrivate.post(`/posts/${post._id}/like`);
        if (response.status === 200) {
          setRerender((prevRender) => prevRender + 1);
        }
      } else {
        const response = await axiosPrivate.delete(`/posts/${post._id}/like`);
        if (response.status === 200) {
          setRerender((prevRender) => prevRender + 1);
        }
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <ErrorText text="Something went wrong." />;
  }

  return (
    <div
      className={`secondary-text flex w-full flex-row items-center justify-around py-1 lg:justify-between ${
        borders && "border-y border-gray-700 px-4 py-[8px]"
      }`}
    >
      <Link
        to={`/posts/${post._id}`}
        className="flex flex-row items-center gap-1"
      >
        <FaRegComment />
        <p>{post.numberOfComments === 0 ? "" : post.numberOfComments}</p>
      </Link>
      <div className="flex flex-row items-center gap-1">
        <button
          onClick={handlePostLike}
          disabled={loading}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <FaHeart className={isLiked ? "text-red-500" : ""} />
        </button>
        <p>{post.likes.length === 0 ? "" : post.likes.length}</p>
      </div>
      <FaRegBookmark className="hidden lg:flex lg:cursor-not-allowed" />
    </div>
  );
};

export default PostInteractionBar;
