import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/unauthenticated/Home";
import Login from "./pages/unauthenticated/Login";
import Register from "./pages/unauthenticated/Register";
import { useAuth } from "./context/authContext";
import { Layout } from "./pages/authenticated/Layout";
import Dashboard from "./pages/authenticated/Dashboard";

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
            <Route element={<Layout />} />
            <Route path="/" element={<Dashboard />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
