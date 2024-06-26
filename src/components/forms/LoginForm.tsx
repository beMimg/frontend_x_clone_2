import { useState } from "react";
import Input from "../inputs/Input";
import axios from "../../api/axios";
import ErrorText from "../feedback/ErrorText";
import LoadingSpinner from "../feedback/LoadingSpinner";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const login = async (username: string, password: string) => {
  const response = await axios.post("/auth", { username, password });
  return response;
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAccessToken } = useAuth();

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await login(username, password);
      if (response.status === 200 && response.data.accessToken) {
        const accessToken = response.data.accessToken;
        setAccessToken(accessToken);
      }
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
      <Input
        value={username}
        setter={setUsername}
        placeholder="Username"
        type="text"
      />
      <Input
        value={password}
        setter={setPassword}
        placeholder="Password"
        type="password"
      />
      <div className="h-[40px]">
        {error && (
          <ErrorText text="Please make sure you've placed the correct credentials." />
        )}
      </div>
      <button
        disabled={!username || !password}
        className="white-button disabled:cursor-not-allowed"
      >
        {loading ? <LoadingSpinner size="30px" /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
