import { useEffect, useState } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import Post from "../../components/post/Post";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import { useUser } from "../../context/userContext";
import ErrorText from "../../components/feedback/ErrorText";

export const ProfilePosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [rerender, setRerender] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { visited_id } = useParams();
  const { user } = useUser();

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/posts/user/${visited_id}`);
        if (response.status === 200) {
          setPosts(response.data.posts);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [axiosPrivate, rerender, visited_id]);

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

  if (posts && posts.length === 0) {
    return <p className="secondary-text p-4">No posts yet.</p>;
  }

  return (
    posts &&
    user &&
    posts.map((post) => (
      <Post post={post} user={user} key={post._id} setRerender={setRerender} />
    ))
  );
};
