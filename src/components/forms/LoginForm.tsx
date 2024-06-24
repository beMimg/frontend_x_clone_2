import { useState } from "react";
import Input from "../inputs/Input";
import axios from "../../api/axios";
import ErrorText from "../feedback/ErrorText";

const login = async (username: string, password: string) => {
  const response = await axios.post("/auth", { username, password });
  return response.data;
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const data = await login(username, password);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
      <Input value={username} setter={setUsername} placeholder="Username" />
      <Input value={password} setter={setPassword} placeholder="Password" />
      <div className="h-[40px]">
        {error && (
          <ErrorText text="Please make sure you've placed the correct credentials." />
        )}
      </div>
      <button
        disabled={!username || !password}
        className="button disabled:cursor-not-allowed"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
