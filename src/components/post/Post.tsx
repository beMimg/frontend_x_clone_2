import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  // Why did I use a function here instead of a Link?
  // 1. Can't have nested links, there's one already that goes to the post author profile.
  const handlePostClick = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <article
      onClick={handlePostClick}
      className="flex cursor-pointer flex-col gap-6 border-b border-gray-800 p-2 px-4 transition-all hover:bg-zinc-950"
    >
      <div className="flex flex-row justify-between">
        <Link
          className="flex flex-row gap-4"
          to={`/profile/${post.author._id}`}
          onClick={(e) => e.stopPropagation()} // prevents navigation to post when clicking the author link
        >
          <Avatar user={post.author} size="45px" />
          <div className="flex flex-row justify-between hover:underline">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-center xl:gap-2">
              <h6>{post.author.first_name}</h6>
              <p className="secondary-text text-sm">@{post.author.username}</p>
            </div>
          </div>
        </Link>
        <p className="secondary-text w-[100px] self-center text-end text-xs lg:w-[200px]">
          {postFormattedDate}
        </p>
      </div>
      <p className="break-words">{post.text}</p>
      {post.image_src && (
        <img
          className="flex max-h-[600px] w-auto rounded-2xl border border-gray-700 object-cover object-center"
          src={post.image_src}
          alt="post"
        ></img>
      )}
      {user && post && (
        <PostInteractionBar
          user={user}
          post={post}
          setRerender={setRerender}
          borders={false}
        />
      )}
    </article>
  );
};

export default Post;
