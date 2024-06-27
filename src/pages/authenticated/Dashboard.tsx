import { useEffect, useState } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
// import DashboardHeader from "../../components/common/DashboardHeader";
import { IoMdCreate } from "react-icons/io";
import { useUser } from "../../context/userContext";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Post from "../../components/post/Post";

export default function Dashboard() {
  const { user, loading, error } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [rerender, setRerender] = useState(0);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get("/posts");
        setPosts(response.data.posts);
      } catch (err) {
        setErrors(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [axiosPrivate, rerender]);

  return (
    <main className="h-full overflow-auto">
      {user && <DashboardHeader user={user} setRerender={setRerender} />}
      {posts &&
        user &&
        posts.map((post: { _id: string }) => (
          <Post
            user={user}
            post={post}
            key={post._id}
            setRerender={setRerender}
          />
        ))}
      <button
        onClick={() => setIsCreatePostOpen(true)}
        className="fixed bottom-24 right-10 h-[40px] w-[40px] rounded-full bg-sky-500 lg:hidden"
      >
        <div className="relative font-bold">
          <p className="absolute -top-5 left-2">+</p>
          <IoMdCreate className="absolute -bottom-3 left-[12px] text-2xl" />
        </div>
      </button>
      {/* This only works for small devices since this button is small device only.
       */}
      {/* {isCreatePostOpen && (
        <CreatePostModal
          setIsCreatePostOpen={setIsCreatePostOpen}
          user={user}
          setRerender={setRerender}
        />
      )} */}
    </main>
  );
}
