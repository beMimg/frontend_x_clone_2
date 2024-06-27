import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/unauthenticated/Home";
import Login from "./pages/unauthenticated/Login";
import Register from "./pages/unauthenticated/Register";
import { useAuth } from "./context/authContext";
import { Layout } from "./pages/authenticated/Layout";
import Dashboard from "./pages/authenticated/Dashboard";
import Profile from "./pages/authenticated/Profile";
import { ProfilePosts } from "./pages/authenticated/ProfilePosts";
import ProfileLikes from "./pages/authenticated/ProfileLikes";
import ProfileFollowings from "./pages/authenticated/ProfileFollowings";
import ProfileFollowers from "./pages/authenticated/ProfileFollowers";
import PostPage from "./pages/authenticated/PostPage";
import Explore from "./pages/authenticated/Explore";
import OAuth from "./pages/unauthenticated/OAuth";

function App() {
  const { accessToken } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {!accessToken ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/oauth" element={<OAuth />} />
          </>
        ) : (
          <>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile/:visited_id" element={<Profile />}>
                <Route index element={<ProfilePosts />} />
                <Route path="likes" element={<ProfileLikes />} />
                <Route path="following" element={<ProfileFollowings />} />
                <Route path="followers" element={<ProfileFollowers />} />
              </Route>
              <Route path="/posts/:post_id" element={<PostPage />} />
              <Route path="/explore/:page" element={<Explore />} />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
