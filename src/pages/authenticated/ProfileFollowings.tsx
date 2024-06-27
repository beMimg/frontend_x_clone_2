import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import UserCard from "../../components/layout/UserCard";
import ErrorText from "../../components/feedback/ErrorText";

const ProfileFollowings = () => {
  const [followings, setFollowings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { visited_id } = useParams();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getFollowings = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(
          `/users/${visited_id}/following`,
        );
        setFollowings(response.data.users);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getFollowings();
  }, []);
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

  if (followings && followings.length === 0) {
    return <p className="secondary-text p-4">No followings yet.</p>;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <h6 className="font-semibold">Following</h6>
      {followings &&
        followings.length > 0 &&
        followings.map((user) => <UserCard user={user} key={user._id} />)}
    </div>
  );
};

export default ProfileFollowings;
