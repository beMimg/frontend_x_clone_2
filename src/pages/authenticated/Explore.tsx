import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import UserCard from "../../components/layout/UserCard";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import { IUser } from "../../interfaces/User.interface";
import ErrorText from "../../components/feedback/ErrorText";

const Explore = () => {
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { page } = useParams<{ page?: string }>();
  const axiosPrivate = useAxiosPrivate();

  const pageNumber = page ? parseInt(page.split("=")[1]) : 1;

  const nextPage = users && users.length === 10 && pageNumber + 1;
  const previousPage = users ** pageNumber !== 0 && pageNumber - 1;

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/users?${page}`);
        setUsers(response.data.users);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [page]);

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
    <div className="relative flex flex-col gap-3 overflow-auto p-4">
      <h4>Explore</h4>
      <div className="absolute right-6 flex flex-row items-center gap-1">
        {previousPage ? (
          <Link to={`/explore/page=${previousPage}`}>
            <IoMdArrowBack className="text-lg font-semibold text-sky-500" />
          </Link>
        ) : (
          ""
        )}
        <p>{pageNumber}</p>
        {nextPage && (
          <Link to={`/explore/page=${nextPage}`}>
            <IoMdArrowForward className="text-lg font-semibold text-sky-500" />
          </Link>
        )}
      </div>
      <div className="flex h-full flex-col justify-between gap-3">
        {users &&
          users.length > 0 &&
          users.map((user: IUser) => (
            <div key={user._id}>
              <UserCard user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Explore;
