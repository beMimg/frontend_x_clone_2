import { FaHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import { IPostCommentInteractionBar } from "../../interfaces/PostCommentInteractionBar.interface";
import { useState } from "react";
import ErrorText from "../feedback/ErrorText";

const PostCommentInteractionBar = ({
  user,
  comment,
  post_id,
  setRerenderOnlyComments,
}: IPostCommentInteractionBar) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const isLiked = comment.likes.includes(user._id);

  async function handleCommentLike() {
    try {
      setLoading(true);
      if (!isLiked) {
        const response = await axiosPrivate.post(
          `/posts/${post_id}/comments/${comment._id}/like`,
        );
        if ((response.status = 200)) {
          setRerenderOnlyComments((prevRender) => prevRender + 1);
        }
      } else {
        const response = await axiosPrivate.delete(
          `/posts/${post_id}/comments/${comment._id}/like`,
        );
        if ((response.status = 200)) {
          setRerenderOnlyComments((prevRender) => prevRender + 1);
        }
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return <ErrorText text="Something went wrong..." />;
  }

  return (
    <div className="flex w-full flex-row items-center justify-end gap-7 pr-5 text-sm text-neutral-600">
      <div className="flex flex-row items-center gap-1">
        <button
          onClick={handleCommentLike}
          disabled={loading}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <FaHeart className={isLiked ? "text-red-500" : ""} />
        </button>
        <p>{comment.likes.length}</p>
      </div>
      <FaRegBookmark className="hidden lg:block lg:cursor-not-allowed" />
    </div>
  );
};

export default PostCommentInteractionBar;
