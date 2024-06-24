import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/unauthenticated/Home";
import Login from "./pages/unauthenticated/Login";
import Register from "./pages/unauthenticated/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
