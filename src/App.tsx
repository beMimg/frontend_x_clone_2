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
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
