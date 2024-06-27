import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import formatDate from "../../utils/formatDate";
import Avatar from "../../components/layout/Avatar";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import { useUser } from "../../context/userContext";
import PostInteractionBar from "../../components/post/PostInteractionBar";
import CommentForm from "../../components/forms/CommentForm";
import { IPost } from "../../interfaces/Post.interface";
import PostComments from "../../components/post/PostComments";
import ErrorText from "../../components/feedback/ErrorText";

const PostPage = () => {
  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [rerender, setRerender] = useState(0);
  const [rerenderOnlyComments, setRerenderOnlyComments] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { post_id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useUser();

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axiosPrivate.get(`/posts/${post_id}`);
        if ((response.status = 200)) {
          setPost(response.data.post);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [axiosPrivate, post_id, rerender]);

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

  return (
    <main className="flex flex-col overflow-auto">
      {post && user && (
        <>
          <div className="flex flex-col gap-4 px-4 pt-4">
            <Link
              to={`/profile/${post.author._id}`}
              className="flex flex-col gap-4 pb-4"
            >
              <div className="flex flex-row gap-2">
                <Avatar user={post.author} size={"45px"} />
                <div className="flex flex-col justify-center">
                  <h6>{post.author.first_name}</h6>
                  <p className="secondary-text">@{post.author.username}</p>
                </div>
              </div>
              <p className="break-words">{post.text}</p>
              {post.image_src && (
                <img
                  className="flex max-h-[600px] w-auto rounded-2xl border border-gray-700 object-cover object-center"
                  src={post.image_src}
                  alt="post"
                ></img>
              )}
              <p className="secondary-text">{formatDate(post.timestamp)}</p>
            </Link>
            <PostInteractionBar
              post={post}
              user={user}
              setRerender={setRerender}
              borders={true}
            />
          </div>
          <CommentForm
            user={user}
            post_id={post_id}
            setRerenderOnlyComments={setRerenderOnlyComments}
          />

          <PostComments
            post_id={post_id}
            rerenderOnlyComments={rerenderOnlyComments}
            user={user}
            setRerenderOnlyComments={setRerenderOnlyComments}
          />
        </>
      )}
    </main>
  );
};

export default PostPage;
