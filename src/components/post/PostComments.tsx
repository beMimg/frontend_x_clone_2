import { useEffect, useState } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import formatDate from "../../utils/formatDate";
// import PostCommentInteractionBar from "./PostCommentInteractionBar";
import { Link } from "react-router-dom";
import Avatar from "../layout/Avatar";
import { IPostComments } from "../../interfaces/PostComments.interface";
import LoadingSpinner from "../feedback/LoadingSpinner";
import ErrorText from "../feedback/ErrorText";
import PostCommentInteractionBar from "./PostCommentInteractionBar";

const PostComments = ({
  post_id,
  rerenderOnlyComments,
  setRerenderOnlyComments,
  user,
}: IPostComments) => {
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/posts/${post_id}/comments`);
        setComments(response.data.allComments);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getComments();
  }, [rerenderOnlyComments]);

  if (error) {
    return (
      <div className="p-4">
        <ErrorText text="Something went wrong" />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <LoadingSpinner color="blue" size="30px" />
      </div>
    );
  }

  if ((comments && comments.length === 0) || !comments) {
    return <p className="secondary-text p-4">No comments yet.</p>;
  }

  return (
    <>
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <article key={comment._id} className="border-b border-gray-800 p-4">
            <div className="grid grid-cols-[15%,85%] gap-2 lg:grid-cols-[10%,90%]">
              <Link to={`/profile/${comment.author._id}`}>
                <Avatar user={comment.author} size={"40px"} />
              </Link>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center justify-between">
                    <Link
                      to={`/profile/${comment.author._id}`}
                      className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-2"
                    >
                      <h6>{comment.author.first_name}</h6>
                      <p className="secondary-text">
                        @{comment.author.username}
                      </p>
                    </Link>
                    <p className="secondary-text w-[100px] pr-3 text-end text-xs lg:w-[200px]">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="break-words">{comment.text}</p>
                <PostCommentInteractionBar
                  comment={comment}
                  user={user}
                  post_id={post_id}
                  setRerenderOnlyComments={setRerenderOnlyComments}
                />
              </div>
            </div>
          </article>
        ))}
    </>
  );
};

export default PostComments;
