import { useEffect, useState } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import { useParams } from "react-router-dom";
import UserCard from "../../components/layout/UserCard";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import ErrorText from "../../components/feedback/ErrorText";

const ProfileFollowers = () => {
  const { visited_id } = useParams();
  const [followers, setFollowers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getFollowers = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(
          `/users/${visited_id}/followers`,
        );
        setFollowers(response.data.users);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getFollowers();
  }, [axiosPrivate, visited_id]);

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

  if (followers && followers.length === 0) {
    return <p className="secondary-text p-4">No followings yet.</p>;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <h6>Followers</h6>
      {followers &&
        followers.length > 0 &&
        followers.map((user) => <UserCard user={user} key={user._id} />)}
    </div>
  );
};

export default ProfileFollowers;
