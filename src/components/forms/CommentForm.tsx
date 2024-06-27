import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import Avatar from "../layout/Avatar";
import { IUser } from "../../interfaces/User.interface";

const CommentForm = ({
  user,
  post_id,
  setRerenderOnlyComments,
}: {
  user: IUser;
  post_id: string | undefined;
  setRerenderOnlyComments: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [charactersLeft, setCharactersLeft] = useState(200);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [text, setText] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setCharactersLeft(200 - text.length);
  }, [text]);

  const disabledButton = charactersLeft < 0;

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosPrivate.post(`posts/${post_id}/comments`, {
        text: text,
      });
      if ((response.status = 200)) {
        setText("");
        setRerenderOnlyComments((prevRender) => prevRender + 1);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-2 flex flex-row gap-3 border-b border-gray-700 px-3 pb-3">
      <Avatar user={user} size={"45px"} />
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full flex-row gap-3"
      >
        <textarea
          placeholder="Post your reply"
          className="placeholder:secondary-text w-full resize-none rounded-lg bg-transparent p-2 pr-8 placeholder:text-base focus:border focus:border-neutral-900 focus:outline-none lg:pr-12"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={300}
        />
        <p
          className={`secondary-text absolute right-[90px] text-sm lg:right-[105px] ${
            disabledButton && "text-red-500"
          }`}
        >
          {charactersLeft}
        </p>
        <button
          type="submit"
          disabled={disabledButton || text.length === 0}
          className="h-[40px] self-center rounded-full bg-sky-500 px-3 font-semibold disabled:cursor-not-allowed disabled:bg-sky-700"
        >
          Reply
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
