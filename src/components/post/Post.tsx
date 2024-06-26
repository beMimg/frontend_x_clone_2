import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
// import PostInterectionBar from "./PostInterectionBar";
import Avatar from "../layout/Avatar";
import { IUser } from "../../interfaces/User.interface";
import React from "react";
import PostInteractionBar from "./PostInteractionBar";

// setRerender is a Dashboard.jsx state, it will be used when,
// PostInterationBar like or deslike a post.
const Post = ({
  post,
  user,
  setRerender,
}: {
  post: any;
  user: IUser;
  setRerender: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const postFormattedDate = formatDate(post.timestamp);

  return (
    <article className="border-b border-gray-800 p-2 px-4 transition-all hover:bg-zinc-950">
      <div className="grid grid-cols-[15%,85%] gap-2 lg:grid-cols-[10%,90%]">
        <Link to={`/profile/${post.author._id}`}>
          <Avatar user={post.author} size="45px" />
        </Link>
        <div className="flex flex-col gap-4">
          <Link to={`/posts/${post._id}`} className="flex flex-col gap-1">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-2">
                <h6>{post.author.first_name}</h6>
                <p className="secondary-text text-sm">
                  @{post.author.username}
                </p>
              </div>
              <p className="secondary-text w-[100px] self-center text-end text-xs lg:w-[200px]">
                {postFormattedDate}
              </p>
            </div>
            <p className="break-words pt-4">{post.text}</p>
            {post.image_src && (
              <img
                className="flex max-h-[600px] w-auto rounded-2xl border border-gray-700 object-cover object-center"
                src={post.image_src}
              ></img>
            )}
          </Link>
          {user && post && (
            <PostInteractionBar
              user={user}
              post={post}
              setRerender={setRerender}
              borders={false}
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;
