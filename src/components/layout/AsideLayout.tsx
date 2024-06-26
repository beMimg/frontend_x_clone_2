import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import LoadingSpinner from "../feedback/LoadingSpinner";
import ErrorText from "../feedback/ErrorText";

const AsideLayout = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getTopUsers = async () => {
      try {
        setIsLoading(true);
        // Return the top 5 most followed users
        const response = await axiosPrivate.get("/users/top");
        setUsers(response.data.users);
      } catch (err) {
        setErrors(true);
      } finally {
        setIsLoading(false);
      }
    };
    getTopUsers();
  }, []);

  return (
    <aside className="flex flex-col gap-6 border-l border-gray-700 p-4">
      <div className="flex cursor-not-allowed flex-row items-center gap-2 rounded-full bg-zinc-900 pl-4">
        <IoMdSearch className="text-2xl" />
        <p className="p-2 text-neutral-500">Search</p>
      </div>
      <div className="flex flex-col gap-4 rounded-xl bg-zinc-900 p-4">
        <h6 className="">Subscribe to Premium</h6>
        <p className="">
          Subscribe to unlock new features and if eligible, recieve a share of
          ads revenue.
        </p>
        <button className="cursor-not-allowed rounded-lg bg-sky-500 p-2 font-bold text-white">
          Subscribe
        </button>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-zinc-900 p-4">
        <div className="group flex flex-col justify-between transition-all">
          <h6 className="font-bold">Who to follow</h6>
          <span className="text-xs text-neutral-500 opacity-0 transition-all group-hover:opacity-100">
            Ordered by most followed
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {users ? (
            users.map((user) => (
              <Link key={user._id} to={`/profile/${user._id}`}>
                <Avatar user={user} size={"45px"} />
              </Link>
            ))
          ) : isLoading ? (
            <div className="flex w-full items-center justify-center">
              <LoadingSpinner size={"30px"} color="blue" />
            </div>
          ) : (
            errors && (
              <div className="flex w-full items-center justify-center">
                <ErrorText text="Something went wrong" />
              </div>
            )
          )}
        </div>
      </div>
    </aside>
  );
};

export default AsideLayout;
